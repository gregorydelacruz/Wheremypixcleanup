// deno-lint-ignore-file no-explicit-any
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js';
import { createRemoteJWKSet, jwtVerify } from 'https://deno.land/x/jose@v5.2.0/index.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const AUTH0_ISSUER   = Deno.env.get('AUTH0_ISSUER')!;        // e.g. "https://dev-xxxx.us.auth0.com/"
const AUTH0_CLIENT_ID = Deno.env.get('AUTH0_CLIENT_ID')!;     // SPA client id (aud when no API)
const AUTH0_AUDIENCE  = Deno.env.get('AUTH0_AUDIENCE') || undefined; // if you created an API

const EMAILJS_PUBLIC_KEY = Deno.env.get('EMAILJS_PUBLIC_KEY')!;
const EMAILJS_SERVICE_ID = Deno.env.get('EMAILJS_SERVICE_ID')!;
const EMAILJS_PRIVATE_KEY = Deno.env.get('EMAILJS_PRIVATE_KEY')!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const jwks = createRemoteJWKSet(new URL(`https://${AUTH0_ISSUER}/.well-known/jwks.json`));

function expectedAudience(): string | string[] | undefined {
  return AUTH0_AUDIENCE
    ? [AUTH0_AUDIENCE, AUTH0_CLIENT_ID]
    : AUTH0_CLIENT_ID;
}

async function ensureSubscription(userId: string) {
  const { error } = await supabase
    .from('user_subscriptions')
    .upsert(
      {
        user_id: userId,
        plan: 'free',
        monthly_limit: 25,
        current_period: new Date().toISOString().slice(0, 7),
      },
      { onConflict: 'user_id', ignoreDuplicates: true },
    );

  if (error) throw error;
}

async function addToEmailJSContacts(email: string, name: string | null) {
  try {
    const contactData = {
      service_id: EMAILJS_SERVICE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      contact: {
        email: email,
        name: name || email
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('EmailJS API error:', response.status, errorText);
      return false;
    }

    console.log('Successfully added contact to EmailJS:', email);
    return true;
  } catch (error: any) {
    console.error('Failed to add contact to EmailJS:', error.message);
    return false;
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });

    const auth = req.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return new Response('Missing bearer token', { status: 401, headers: corsHeaders });

    let payload: Record<string, any>;
    try {
      const verified = await jwtVerify(token, jwks, {
        issuer: `https://${AUTH0_ISSUER}/`,
        audience: expectedAudience(),
      });
      payload = verified.payload as Record<string, any>;
    } catch (e: any) {
      console.error('JWT verify failed:', e?.message);
      return new Response('Invalid token', { status: 401, headers: corsHeaders });
    }

    const sub = String(payload.sub || '');
    const email = (payload as any).email ?? null;
    const name = (payload as any).name ?? null;
    const picture = (payload as any).picture ?? null;
    if (!sub) return new Response('Token missing sub', { status: 400, headers: corsHeaders });

    // do we already know this Auth0 user?
    const { data: mapRow, error: mapErr } = await supabase
      .from('external_identities')
      .select('profile_id')
      .eq('external_sub', sub)
      .maybeSingle();
    if (mapErr) throw mapErr;

    if (mapRow?.profile_id) {
      const { error: updErr } = await supabase
        .from('profiles')
        .update({
          email,
          display_name: name,
          avatar_url: picture,
          updated_at: new Date().toISOString(),
        })
        .eq('id', mapRow.profile_id);
      if (updErr) throw updErr;

      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('id', mapRow.profile_id)
        .single();
      if (profileErr) throw profileErr;

      await ensureSubscription(profile.user_id);

      // Add to EmailJS contacts (non-blocking)
      if (email) {
        addToEmailJSContacts(email, name).catch(err => 
          console.error('EmailJS background task failed:', err)
        );
      }

      return new Response(JSON.stringify({ mode: 'updated', user_id: profile.user_id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // create new profiles
    const userId = crypto.randomUUID();
    const { data: inserted, error: insErr } = await supabase
      .from('profiles')
      .insert({ id: userId, user_id: userId, email, display_name: name, avatar_url: picture })
      .select('id, user_id')
      .single();
    if (insErr) throw insErr;

    // map auth0 sub → user_id
    const { error: linkErr } = await supabase
      .from('external_identities')
      .insert({ profile_id: inserted.id, provider: 'auth0', external_sub: sub });
    if (linkErr) {
      await supabase.from('profiles').delete().eq('user_id', inserted.user_id);
      throw linkErr;
    }

    await ensureSubscription(inserted.user_id);

    // Add to EmailJS contacts for new users (non-blocking)
    if (email) {
      addToEmailJSContacts(email, name).catch(err => 
        console.error('EmailJS background task failed:', err)
      );
    }

    return new Response(JSON.stringify({ mode: 'created', user_id: inserted.user_id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error('upsert-profiles error:', e?.message || e);
    return new Response('Internal error, please try again', { status: 500, headers: corsHeaders });
  }
});
