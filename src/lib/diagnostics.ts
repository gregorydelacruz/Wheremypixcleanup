// Lightweight diagnostics store: captures the last "why did it fail" event
// so the app can show a precise error screen instead of a generic toast.

export type DiagnosticKind =
  | 'auth0_callback'
  | 'auth0_token'
  | 'cors'
  | 'edge_401'
  | 'edge_error'
  | 'unknown';

export interface DiagnosticReport {
  kind: DiagnosticKind;
  title: string;
  status?: number | string;
  code?: string;
  message: string;
  hint?: string;
  origin: string;
  at: string;
  raw?: string;
}

type Listener = (report: DiagnosticReport | null) => void;

let current: DiagnosticReport | null = null;
const listeners = new Set<Listener>();

export function getDiagnostic() {
  return current;
}

export function subscribeDiagnostics(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function clearDiagnostic() {
  current = null;
  listeners.forEach((l) => l(null));
}

export function reportDiagnostic(
  report: Omit<DiagnosticReport, 'origin' | 'at'>,
) {
  current = {
    ...report,
    origin: typeof window !== 'undefined' ? window.location.origin : 'unknown',
    at: new Date().toISOString(),
  };
  console.error('[diagnostics]', current);
  listeners.forEach((l) => l(current));
}

const TITLES: Record<DiagnosticKind, string> = {
  auth0_callback: 'Auth0 callback failed',
  auth0_token: 'Auth0 token refresh failed',
  cors: 'Network / CORS failure',
  edge_401: 'Rejected by analyze-image (401)',
  edge_error: 'analyze-image returned an error',
  unknown: 'Unexpected failure',
};

export function titleFor(kind: DiagnosticKind) {
  return TITLES[kind];
}

/**
 * Reads ?error=...&error_description=... left in the URL by Auth0 after a
 * failed authorize/callback round-trip.
 */
export function captureAuth0CallbackError(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const error = params.get('error');
  if (!error) return false;
  const description = params.get('error_description') || '';
  reportDiagnostic({
    kind: 'auth0_callback',
    title: TITLES.auth0_callback,
    code: error,
    message: description || error,
    hint:
      error === 'access_denied' || /callback|redirect|origin/i.test(description)
        ? `Auth0 rejected the redirect for ${window.location.origin}. Confirm this exact origin (no trailing slash) is in Allowed Callback URLs, Allowed Logout URLs and Allowed Web Origins.`
        : undefined,
    raw: window.location.search,
  });
  return true;
}

/** Classifies an Auth0 SDK error (login / getAccessTokenSilently). */
export function reportAuth0Error(error: unknown, phase: 'callback' | 'token') {
  const err = error as { error?: string; error_description?: string; message?: string };
  const code = err?.error;
  const message = err?.error_description || err?.message || String(error);
  const isCors = /cors|failed to fetch|networkerror|origin/i.test(message);

  reportDiagnostic({
    kind: isCors ? 'cors' : phase === 'callback' ? 'auth0_callback' : 'auth0_token',
    title: isCors ? TITLES.cors : phase === 'callback' ? TITLES.auth0_callback : TITLES.auth0_token,
    code,
    message,
    hint: isCors
      ? `The browser blocked the request to Auth0 from ${window.location.origin}. Add this origin to Auth0 → Allowed Web Origins (and Allowed Origins/CORS).`
      : code === 'login_required' || code === 'invalid_grant'
        ? 'The refresh token expired or was rotated away. Sign out and sign in again; also check Refresh Token Expiration settings in Auth0.'
        : undefined,
    raw: JSON.stringify(err ?? {}, null, 2),
  });
}

/** Classifies a failure from invoking the analyze-image edge function. */
export async function reportEdgeFunctionError(error: unknown, fnName = 'analyze-image') {
  const err = error as { name?: string; message?: string; context?: Response | unknown };
  const message = err?.message || String(error);
  const ctx = err?.context;
  const isResponse =
    !!ctx && typeof ctx === 'object' && 'status' in (ctx as Record<string, unknown>);

  if (isResponse) {
    const res = ctx as Response;
    let body = '';
    try {
      body = await res.clone().text();
    } catch {
      /* body already consumed */
    }
    const status = res.status;
    reportDiagnostic({
      kind: status === 401 ? 'edge_401' : 'edge_error',
      title: status === 401 ? TITLES.edge_401 : `${fnName} returned ${status}`,
      status,
      message: body || message,
      hint:
        status === 401
          ? 'The Auth0 ID token was missing, expired, or its audience/issuer did not match. Check the Auth0 token lifetime settings and that AUTH0_ISSUER / AUTH0_CLIENT_ID secrets match this tenant.'
          : status === 429
            ? 'Monthly image quota reached for this account.'
            : undefined,
      raw: body,
    });
    return;
  }

  const isNetwork =
    err?.name === 'FunctionsFetchError' ||
    /failed to fetch|networkerror|cors|load failed/i.test(message);

  reportDiagnostic({
    kind: isNetwork ? 'cors' : 'edge_error',
    title: isNetwork ? TITLES.cors : TITLES.edge_error,
    message,
    hint: isNetwork
      ? `The request to ${fnName} never completed — a CORS preflight rejection or blocked network request from ${window.location.origin}.`
      : undefined,
    raw: message,
  });
}
