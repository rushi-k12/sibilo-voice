-- Fix security: Set search_path on the update_vote_count function
ALTER FUNCTION public.update_vote_count() SET search_path = public;