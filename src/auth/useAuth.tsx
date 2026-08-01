// src/auth/useAuth.tsx
import { useAuth0 } from '@auth0/auth0-react';
import { useMemo } from 'react';
import { reportAuth0Error } from '@/lib/diagnostics';


export interface AppUser {
  sub: string;
  email: string | null;
  email_verified: boolean;
  name: string | null;
  avatar_url: string | null;
}


export default function AccountSwitcher() {
  const { loginSelectAccount } = useAuth();
  return <button onClick={loginSelectAccount}>Switch Google Account</button>;
}
export function useAuth() {
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout,
    getIdTokenClaims,
    getAccessTokenSilently,
  } = useAuth0();

  // Normalize into our app shape
  const appUser: AppUser | null = useMemo(() => {
    if (!user) return null;
    return {
      sub: user.sub || '',
      email: user.email || null,
      email_verified: Boolean(user.email_verified),
      name: user.name || null,
      avatar_url: (user.picture as string) || null,
    };
  }, [user]);

  // Useful when calling your server/edge function
  async function getIdToken(): Promise<string | null> {
    const isFresh = (jwt: string | null | undefined) => {
      if (!jwt) return false;
      try {
        const [, body] = jwt.split('.');
        const { exp } = JSON.parse(atob(body.replace(/-/g, '+').replace(/_/g, '/')));
        // require at least 5 minutes of remaining life (guards against device clock skew)
        return typeof exp === 'number' && exp * 1000 - Date.now() > 300_000;
      } catch {
        return false;
      }
    };

    try {
      // Always force a silent refresh first: the cached ID token from
      // getIdTokenClaims() is frequently stale even when it looks valid.
      try {
        await getAccessTokenSilently({ cacheMode: 'off' } as any);
      } catch (e) {
        reportAuth0Error(e, 'token');
      }

      let raw = (await getIdTokenClaims())?.__raw as string | undefined;

      if (!isFresh(raw)) {
        // Silent refresh couldn't produce a valid ID token — re-authenticate.
        reportAuth0Error(
          new Error(
            'ID token expired and silent refresh failed. Re-authentication required (check Auth0 ID Token Expiration + refresh token lifetimes and Allowed Web Origins).',
          ),
          'token',
        );
        await loginWithRedirect({
          appState: { returnTo: window.location.pathname + window.location.search },
          authorizationParams: { scope: 'openid email profile offline_access' },
        });
        return null;
      }

      return raw ?? null;
    } catch (e) {
      reportAuth0Error(e, 'token');
      return null;
    }
  }




  async function getAccessToken(audience?: string, scope?: string) {
    return getAccessTokenSilently({
      ...(audience ? { authorizationParams: { audience, scope } } : {}),
    });
  }
 const loginSelectAccount = () =>
    loginWithRedirect({
      authorizationParams: {
        prompt: 'select_account',           // 👈 this is the line you asked about
        scope: 'openid email profile offline_access',
      },
    });
  const signUp = () => loginWithRedirect({
    authorizationParams: {
      screen_hint: 'signup',
      scope: 'openid email profile offline_access',
    },
  });

  const logOut = () =>
    logout({
      logoutParams: { returnTo: window.location.origin },
    });

  const getToken = getIdToken;

  return {
    isAuthenticated,
    isLoading,
    user: appUser,
    login: () => loginWithRedirect(),
    logout: logOut,
    signUp,
    logOut,
    getIdToken,
    getAccessToken,
    getToken,
    loginSelectAccount,
  };
}
