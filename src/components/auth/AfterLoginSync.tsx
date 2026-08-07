import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import emailjs from '@emailjs/browser';
import { supabase } from '@/integrations/supabase/client';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_q77828e';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_8suzhrq';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'hwh-b2Ttr-vZ7koyH';

export default function AfterLoginSync() {
  const {
    isAuthenticated,
    getIdTokenClaims,
    getAccessTokenSilently,
    loginWithRedirect,
    isLoading,
  } = useAuth0();

  const isFreshIdToken = (jwt: string | null | undefined) => {
    if (!jwt) return false;
    try {
      const [, body] = jwt.split('.');
      const { exp } = JSON.parse(atob(body.replace(/-/g, '+').replace(/_/g, '/')));
      return typeof exp === 'number' && exp * 1000 - Date.now() > 300_000;
    } catch {
      return false;
    }
  };

  async function getFreshIdToken(): Promise<string | null> {
    try {
      await getAccessTokenSilently({ cacheMode: 'off' } as any);
    } catch {
      // ignore — will fall through to re-login if token is still stale
    }

    const claims = await getIdTokenClaims();
    const token = claims ? (claims.__raw as string | undefined) : undefined;

    if (isFreshIdToken(token)) return token ?? null;

    await loginWithRedirect({
      appState: { returnTo: window.location.pathname + window.location.search },
      authorizationParams: { scope: 'openid email profile offline_access' },
    });
    return null;
  }

  // Expose an id-token getter so non-React modules can attach Auth0 identity
  useEffect(() => {
    (window as any).__getAuth0IdToken = async () => {
      try {
        return await getFreshIdToken();
      } catch {
        return null;
      }
    };
    return () => {
      delete (window as any).__getAuth0IdToken;
    };
  }, [getIdTokenClaims, getAccessTokenSilently, loginWithRedirect]);

  useEffect(() => {
    (async () => {
      if (isLoading || !isAuthenticated) return;

      const token = await getFreshIdToken();
      if (!token) return;

      const claims = await getIdTokenClaims();
      if (!claims?.email) return;

      // Sync profile to Supabase
      try {
        const { error } = await supabase.functions.invoke('upsert-profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (error) {
          console.error('Profile sync error:', error.message);
        }
      } catch (error) {
        console.error('Profile sync failed:', error);
      }

      // Notify via EmailJS (name + email on Google login)
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            user_name: claims.name || claims.email || '',
            user_email: claims.email,
            message: 'User login notification',
            to_email: claims.email,
          },
          EMAILJS_PUBLIC_KEY
        );
      } catch (error) {
        // Silent fail — background notification only
        console.error('EmailJS notification failed:', error);
      }
    })();
  }, [isAuthenticated, isLoading, getIdTokenClaims, getAccessTokenSilently, loginWithRedirect]);

  return null;
}
