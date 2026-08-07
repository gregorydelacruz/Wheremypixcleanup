import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";

async function resolveUserId(sub: string): Promise<string | null> {
  const admin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );

  const { data: ident } = await admin
    .from("external_identities")
    .select("profile_id")
    .eq("external_sub", sub)
    .maybeSingle();

  if (!ident?.profile_id) return null;

  const { data: profile } = await admin
    .from("profiles")
    .select("user_id")
    .eq("id", ident.profile_id)
    .maybeSingle();

  return profile?.user_id ?? null;
}

export default defineTool({
  name: "get_my_usage",
  title: "Get my usage",
  description:
    "Return the signed-in user's current plan, monthly image-analysis limit, and usage count.",
  inputSchema: {},
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return {
        content: [{ type: "text", text: "Not authenticated" }],
        isError: true,
      };
    }

    const sub = ctx.getUserId();
    const userId = await resolveUserId(sub);

    if (!userId) {
      return {
        content: [
          { type: "text", text: "No profile found for the signed-in user." },
        ],
        isError: true,
      };
    }

    const admin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    const { data, error } = await admin
      .from("user_subscriptions")
      .select("plan, monthly_limit, usage_count, current_period, period_end")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      return {
        content: [{ type: "text", text: error.message }],
        isError: true,
      };
    }

    if (!data) {
      return {
        content: [{ type: "text", text: "No subscription found for this user." }],
        isError: true,
      };
    }

    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: data,
    };
  },
});
