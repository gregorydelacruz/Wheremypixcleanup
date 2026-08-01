-- Fix database security: Update handle_new_user function with proper security settings
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Add input validation function for email addresses
CREATE OR REPLACE FUNCTION public.is_valid_email(email_address TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Basic email validation regex
  RETURN email_address ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$;

-- Add constraint to profiles table for email validation
ALTER TABLE public.profiles 
ADD CONSTRAINT valid_email_format 
CHECK (email IS NULL OR public.is_valid_email(email));

-- Add constraint to ensure user_id is not null (fixes RLS security)
ALTER TABLE public.profiles 
ALTER COLUMN user_id SET NOT NULL;