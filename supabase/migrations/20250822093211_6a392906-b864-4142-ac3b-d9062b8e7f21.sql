-- Update admin-only policies to include both email addresses
DROP POLICY IF EXISTS "Admin only access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admin only access to external_identities" ON public.external_identities;

-- Create updated admin-only policies for profiles table
CREATE POLICY "Admin only access to profiles" 
ON public.profiles 
FOR ALL 
USING (
  CASE 
    WHEN auth.jwt() ->> 'email' IS NOT NULL 
    THEN lower(auth.jwt() ->> 'email') IN (
      lower('greg@wherearemypics.info'),
      lower('gregorydelacruz@gmail.com')
    )
    ELSE false
  END
);

-- Create updated admin-only policies for external_identities table  
CREATE POLICY "Admin only access to external_identities" 
ON public.external_identities 
FOR ALL 
USING (
  CASE 
    WHEN auth.jwt() ->> 'email' IS NOT NULL 
    THEN lower(auth.jwt() ->> 'email') IN (
      lower('greg@wherearemypics.info'),
      lower('gregorydelacruz@gmail.com')
    )
    ELSE false
  END
);