import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import emailjs from '@emailjs/browser';
import { supabase } from '@/integrations/supabase/client';
import { captureAuth0CallbackError, reportAuth0Error } from '@/lib/diagnostics';

export default function AfterLoginSync() {
  const {
    isAuthenticated,
    getIdTokenClaims,
    getAccessTokenSilently,
    loginWithRedirect,
    isLoading,
    error: auth0Error,
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
    } catch (error) {
      reportAuth0Error(error, 'token');
    }

    const claims = await getIdTokenClaims();
    const token = claims ? (claims.__raw as string | undefined) : undefined;

    if (isFreshIdToken(token)) return token ?? null;

    reportAuth0Error(
      new Error('ID token is expired after refresh. Starting a new Auth0 login.'),
      'token',
    );
    await loginWithRedirect({
      appState: { returnTo: window.location.pathname + window.location.search },
      authorizationParams: { scope: 'openid email profile offline_access' },
    });
    return null;
  }

  // Surface Auth0 callback failures (?error=...) and SDK errors immediately.
  useEffect(() => {
    if (!captureAuth0CallbackError() && auth0Error) {
      reportAuth0Error(auth0Error, 'callback');
    }
  }, [auth0Error]);


  console.log('AfterLoginSync RENDERED - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

  // Expose an id-token getter so non-React modules (e.g. edge function callers)
  // can attach the caller's Auth0 identity to their requests.
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
    console.log('AfterLoginSync useEffect triggered - isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

    
    (async () => {
      if (isLoading) {
        console.log('AfterLoginSync: Still loading...');
        return;
      }

      if (!isAuthenticated) {
        console.log('AfterLoginSync: User not authenticated');
        return;
      }

      console.log('AfterLoginSync: User authenticated, fetching claims...');
      const token = await getFreshIdToken();
      if (!token) return;

      const claims = await getIdTokenClaims();
      console.log('AfterLoginSync: Claims received:', claims ? 'YES' : 'NO');
      
      if (!claims?.email) {
        console.error('AfterLoginSync: No email found in claims');
        return;
      }

      try {
        const { error } = await supabase.functions.invoke('upsert-profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (error) {
          console.error('AfterLoginSync: Profile sync error', error.message);
        }
      } catch (error) {
        console.error('AfterLoginSync: Profile sync failed', error);
      }

      const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      console.log('AfterLoginSync: Sending email to EmailJS...');
      
      try {
        const result = await emailjs.send(
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

        console.log('AfterLoginSync: Email sent successfully', result);
      } catch (error) {
        console.error('AfterLoginSync: EmailJS error', error);
        // Silent fail - this is a background sync operation
      }
    })();
  }, [isAuthenticated, isLoading, getIdTokenClaims, getAccessTokenSilently, loginWithRedirect]);

  return null;
}
