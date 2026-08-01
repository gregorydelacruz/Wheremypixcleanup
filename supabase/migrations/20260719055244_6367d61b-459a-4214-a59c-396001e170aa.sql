
-- Revoke EXECUTE on SECURITY DEFINER functions from anon and authenticated.
-- Keep has_role executable by authenticated (it is invoked from RLS policies at query time).
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_subscription() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.increment_usage(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_valid_email(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.reset_monthly_usage() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.profiles_fill_user_id() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- has_role is called from RLS policies executed as the invoking role; keep it executable
-- by authenticated but remove any anon access.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Hide user-scoped tables from the anon GraphQL schema (no anon policy exists for these).
REVOKE SELECT ON public.profiles FROM anon;
REVOKE SELECT ON public.user_roles FROM anon;
REVOKE SELECT ON public.user_subscriptions FROM anon;
REVOKE SELECT ON public.external_identities FROM anon;

-- external_identities has only an admin policy; regular authenticated users have no read
-- access via RLS, so remove them from the authenticated GraphQL schema as well.
-- has_role() runs as SECURITY DEFINER so admin reads still work.
REVOKE SELECT ON public.external_identities FROM authenticated;
GRANT SELECT ON public.external_identities TO service_role;
