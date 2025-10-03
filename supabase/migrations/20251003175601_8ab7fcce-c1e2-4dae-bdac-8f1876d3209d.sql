-- Drop existing duplicate triggers
DROP TRIGGER IF EXISTS update_voice_note_votes ON public.votes;
DROP TRIGGER IF EXISTS update_vote_count_trigger ON public.votes;

-- Recreate single trigger that fires on all vote operations
CREATE TRIGGER update_vote_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.votes
FOR EACH ROW
EXECUTE FUNCTION public.update_vote_count();