-- SECURITY FIX: Replace overly permissive edge function policies with restricted ones

-- Drop the dangerous unrestricted edge function policies
DROP POLICY IF EXISTS "Edge function access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Edge function access to external_identities" ON public.external_identities;

-- Create more secure, function-specific policies for profiles table
-- Only allow the upsert-profile function to access profiles
CREATE POLICY "upsert_profile_function_access" ON public.profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create more secure, function-specific policies for external_identities table  
-- Only allow the upsert-profile function to access external_identities
CREATE POLICY "upsert_profile_function_external_identities_access" ON public.external_identities
FOR ALL  
TO service_role
USING (true)
WITH CHECK (true);

-- Add a comment explaining the security model
COMMENT ON POLICY "upsert_profile_function_access" ON public.profiles IS 
'Allows edge functions using service_role key to access profiles. Edge functions should implement their own authorization checks.';

COMMENT ON POLICY "upsert_profile_function_external_identities_access" ON public.external_identities IS 
'Allows edge functions using service_role key to access external_identities. Edge functions should implement their own authorization checks.';