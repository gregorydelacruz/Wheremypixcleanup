-- Fix the remaining function with search_path

-- Fix the profiles_fill_user_id function
CREATE OR REPLACE FUNCTION public.profiles_fill_user_id()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
begin
  if new.id is null then
    new.id := gen_random_uuid();
  end if;
  if new.user_id is null then
    new.user_id := new.id;
  end if;
  return new;
end $function$;