-- Drop existing overly restrictive policies
DROP POLICY IF EXISTS "external_identities_no_access" ON public.external_identities;
DROP POLICY IF EXISTS "profiles_deny_all" ON public.profiles;

-- Create admin-only policies for profiles table
CREATE POLICY "Admin only access to profiles" 
ON public.profiles 
FOR ALL 
USING (
  CASE 
    WHEN auth.jwt() ->> 'email' IS NOT NULL 
    THEN lower(auth.jwt() ->> 'email') = lower('greg@wherearemypics.info')
    ELSE false
  END
);

-- Create admin-only policies for external_identities table  
CREATE POLICY "Admin only access to external_identities" 
ON public.external_identities 
FOR ALL 
USING (
  CASE 
    WHEN auth.jwt() ->> 'email' IS NOT NULL 
    THEN lower(auth.jwt() ->> 'email') = lower('greg@wherearemypics.info')
    ELSE false
  END
);

-- Allow the upsert-profile edge function to insert/update profiles
-- Edge functions run with service role, so we need separate policies for them
CREATE POLICY "Edge function access to profiles" 
ON public.profiles 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Edge function access to external_identities" 
ON public.external_identities 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);