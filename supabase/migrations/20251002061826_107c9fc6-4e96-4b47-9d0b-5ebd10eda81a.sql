-- Create the trigger that updates vote counts automatically
CREATE TRIGGER update_vote_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.votes
FOR EACH ROW
EXECUTE FUNCTION public.update_vote_count();