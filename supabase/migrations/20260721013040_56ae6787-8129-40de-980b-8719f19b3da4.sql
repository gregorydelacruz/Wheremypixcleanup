
-- 1. Move has_role to a private schema so it is not exposed via PostgREST/GraphQL
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 2. Rewrite policies to use private.has_role
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage all profiles" ON public.profiles;
CREATE POLICY "Admins manage all profiles" ON public.profiles
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins manage external identities" ON public.external_identities;
CREATE POLICY "Admins manage external identities" ON public.external_identities
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins update subscriptions" ON public.user_subscriptions;
CREATE POLICY "Admins update subscriptions" ON public.user_subscriptions
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins view all subscriptions" ON public.user_subscriptions;
CREATE POLICY "Admins view all subscriptions" ON public.user_subscriptions
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- 3. Drop public.has_role now that nothing references it
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 4. Hide sensitive tables from the GraphQL/PostgREST schema for authenticated
--    (row-level access for signed-in users continues via edge functions using service_role)
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.profiles FROM authenticated;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.user_subscriptions FROM authenticated;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.user_roles FROM authenticated;
