// deno-lint-ignore-file no-explicit-any
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js';
import { createRemoteJWKSet, jwtVerify } from 'https://deno.land/x/jose@v5.2.0/index.ts';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const AUTH0_ISSUER = Deno.env.get('AUTH0_ISSUER')!;
const AUTH0_CLIENT_ID = Deno.env.get('AUTH0_CLIENT_ID')!;
const AUTH0_AUDIENCE = Deno.env.get('AUTH0_AUDIENCE') || undefined;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
const jwks = createRemoteJWKSet(new URL(`https://${AUTH0_ISSUER}/.well-known/jwks.json`));

function expectedAudience(): string | string[] | undefined {
  return AUTH0_AUDIENCE
    ? [AUTH0_AUDIENCE, AUTH0_CLIENT_ID]
    : AUTH0_CLIENT_ID;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
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

// Resolve or create the internal user_id from an Auth0 token.
async function resolveUserId(payload: Record<string, any>): Promise<string | null> {
  const sub = String(payload.sub || '');
  if (!sub) return null;

  const { data: ident } = await supabase
    .from('external_identities')
    .select('profile_id')
    .eq('external_sub', sub)
    .maybeSingle();
  if (!ident?.profile_id) {
    const userId = crypto.randomUUID();
    const { data: inserted, error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        user_id: userId,
        email: payload.email ?? null,
        display_name: payload.name ?? null,
        avatar_url: payload.picture ?? null,
      })
      .select('id, user_id')
      .single();
    if (insertError) throw insertError;

    const { error: linkError } = await supabase
      .from('external_identities')
      .insert({ profile_id: inserted.id, provider: 'auth0', external_sub: sub });
    if (linkError) {
      await supabase.from('profiles').delete().eq('user_id', inserted.user_id);
      throw linkError;
    }

    await ensureSubscription(inserted.user_id);
    return inserted.user_id;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('id', ident.profile_id)
    .maybeSingle();

  if (profile?.user_id) {
    await ensureSubscription(profile.user_id);
  }

  return profile?.user_id ?? null;
}

// Check current plan/usage. Returns { ok: true, usage } or { ok: false, reason }.
type UsageInfo = { plan: string; monthly_limit: number; usage_count: number; remaining: number };
async function checkAndIncrementUsage(userId: string): Promise<
  { ok: true; usage: UsageInfo } | { ok: false; status: number; error: string }
> {
  const { data: sub, error } = await supabase
    .from('user_subscriptions')
    .select('plan, monthly_limit, usage_count, current_period, period_end')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) {
    console.error('user_subscriptions lookup error:', error.message);
    return { ok: false, status: 500, error: 'Subscription lookup failed' };
  }
  if (!sub) {
    return { ok: false, status: 403, error: 'No active subscription. Please sign in again.' };
  }

  // Roll the period over if we've passed period_end.
  const now = new Date();
  const periodEnd = sub.period_end ? new Date(sub.period_end) : null;
  if (periodEnd && periodEnd < now) {
    await supabase.rpc('reset_monthly_usage');
    const { data: refreshed } = await supabase
      .from('user_subscriptions')
      .select('plan, monthly_limit, usage_count')
      .eq('user_id', userId)
      .maybeSingle();
    if (refreshed) {
      sub.usage_count = refreshed.usage_count;
      sub.monthly_limit = refreshed.monthly_limit;
      sub.plan = refreshed.plan;
    }
  }

  if (sub.usage_count >= sub.monthly_limit) {
    return {
      ok: false,
      status: 429,
      error:
        sub.plan === 'free'
          ? `You've used all ${sub.monthly_limit} images on the free plan this month. Upgrade to Pro for a lot more.`
          : `Monthly limit reached for ${sub.plan} plan (${sub.monthly_limit} images).`,
    };
  }

  const { error: incErr } = await supabase.rpc('increment_usage', { _user_id: userId });
  if (incErr) {
    console.error('increment_usage error:', incErr.message);
    return { ok: false, status: 500, error: 'Usage tracking failed' };
  }
  const usageCount = sub.usage_count + 1;
  return {
    ok: true,
    usage: {
      plan: sub.plan,
      monthly_limit: sub.monthly_limit,
      usage_count: usageCount,
      remaining: Math.max(0, sub.monthly_limit - usageCount),
    },
  };
}


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- AuthN: require a valid Auth0 bearer token ---
    const auth = req.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return json({ error: 'Missing bearer token' }, 401);

    let payload: Record<string, any>;
    try {
      const verified = await jwtVerify(token, jwks, {
        issuer: `https://${AUTH0_ISSUER}/`,
        audience: expectedAudience(),
        clockTolerance: '120s',
      });
      payload = verified.payload as Record<string, any>;
    } catch (e: any) {
      console.error('JWT verify failed:', e?.message);
      return json({ error: `Invalid token: ${e?.message ?? 'unknown'}` }, 401);
    }
    const sub = String(payload.sub || '');
    if (!sub) return json({ error: 'Token missing sub' }, 401);

    const userId = await resolveUserId(payload);
    if (!userId) return json({ error: 'Profile not found. Please sign in again.' }, 403);

    // --- AuthZ / quota: server-side plan + usage enforcement ---
    const check = await checkAndIncrementUsage(userId);
    if (!check.ok) return json({ error: check.error }, check.status);

    // --- Input validation ---
    const body = await req.json().catch(() => ({}));
    const base64Image = (body as any)?.base64Image;
    if (!base64Image || typeof base64Image !== 'string') {
      return json({ error: "No image provided" }, 400);
    }
    if (base64Image.length > 6_000_000) {
      return json({ error: "Image too large. Please upload smaller images (<5MB)." }, 413);
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) return json({ error: "OpenAI API key not configured" }, 500);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-5.5",
        messages: [
          {
            role: "system",
            content:
              "You are an AI that describes images in simple, plain English. Always provide a single concise sentence and do not start with 'A', 'An', 'The', or 'The image shows'.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Describe this image in one concise sentence without starting with 'A', 'An', 'The', or 'The image shows'.",
              },
              {
                type: "image_url",
                image_url: { url: `data:image/jpeg;base64,${base64Image}` },
              },
            ],
          },
        ],
        max_completion_tokens: 400,
        reasoning_effort: "none",
      }),
    });

    if (!response.ok) {
      let details = "";
      try {
        const errorData = await response.json();
        details = errorData.error?.message || JSON.stringify(errorData);
      } catch (_) {
        details = await response.text();
      }
      console.error('OpenAI error:', details);
      return json({ error: 'Image analysis service error' }, 502);
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content;
    const description = Array.isArray(raw)
      ? raw.map((p: any) => p?.text ?? "").join(" ").trim()
      : typeof raw === "string"
        ? raw.trim()
        : "";
    if (!description) {
      console.error('Empty completion:', JSON.stringify({
        finish_reason: data?.choices?.[0]?.finish_reason,
        usage: data?.usage,
      }));
      return json({ error: 'Invalid API response' }, 502);
    }

    return json({ description, usage: check.usage });
  } catch (error) {
    console.error("Error in analyze-image function:", error);
    return json({ error: 'Unknown error occurred' }, 500);
  }
});
