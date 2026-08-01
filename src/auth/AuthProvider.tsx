// src/auth/AuthProvider.tsx
import React from 'react';
import { Auth0Provider, AppState } from '@auth0/auth0-react';

type Props = { children: React.ReactNode };

const domain   = import.meta.env.VITE_AUTH0_DOMAIN!;      // e.g. "your-tenant.us.auth0.com" (no https://)
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;
const redirectUri = window.location.origin;

// Strip ?code & ?state from the URL after Auth0 returns, so a refresh never
// tries to redeem an already-used authorization code.
function onRedirectCallback(appState?: AppState) {
  const target = appState?.returnTo || window.location.pathname;
  window.history.replaceState({}, document.title, target);
}

export default function AppAuthProvider({ children }: Props) {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        scope: 'openid email profile offline_access',
        prompt: 'select_account', // ← always show Google account chooser
      }}
      cacheLocation="localstorage"
      useRefreshTokens
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

