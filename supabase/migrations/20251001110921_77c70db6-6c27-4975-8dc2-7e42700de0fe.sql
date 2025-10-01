-- Create channels table
CREATE TABLE public.channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create voice_notes table
CREATE TABLE public.voice_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES public.channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  audio_url TEXT NOT NULL,
  duration_seconds INTEGER,
  votes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create votes table
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note_id UUID NOT NULL REFERENCES public.voice_notes(id) ON DELETE CASCADE,
  vote_type INTEGER NOT NULL CHECK (vote_type IN (-1, 1)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, note_id)
);

-- Enable RLS
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Channels policies (public read, authenticated create)
CREATE POLICY "Anyone can view channels"
  ON public.channels FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create channels"
  ON public.channels FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Voice notes policies (public read, authenticated create, owner delete)
CREATE POLICY "Anyone can view voice notes"
  ON public.voice_notes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create voice notes"
  ON public.voice_notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own voice notes"
  ON public.voice_notes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Votes policies
CREATE POLICY "Anyone can view votes"
  ON public.votes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create votes"
  ON public.votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own votes"
  ON public.votes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own votes"
  ON public.votes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_voice_notes_channel ON public.voice_notes(channel_id);
CREATE INDEX idx_voice_notes_created ON public.voice_notes(created_at DESC);
CREATE INDEX idx_votes_note ON public.votes(note_id);
CREATE INDEX idx_votes_user_note ON public.votes(user_id, note_id);

-- Create function to update vote counts
CREATE OR REPLACE FUNCTION update_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.voice_notes
    SET votes_count = votes_count + NEW.vote_type
    WHERE id = NEW.note_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.voice_notes
    SET votes_count = votes_count + (NEW.vote_type - OLD.vote_type)
    WHERE id = NEW.note_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.voice_notes
    SET votes_count = votes_count - OLD.vote_type
    WHERE id = OLD.note_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for vote count updates
CREATE TRIGGER update_voice_note_votes
AFTER INSERT OR UPDATE OR DELETE ON public.votes
FOR EACH ROW EXECUTE FUNCTION update_vote_count();

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-notes', 'voice-notes', true)
ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view audio files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'voice-notes');

CREATE POLICY "Authenticated users can upload audio files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'voice-notes');

-- Enable realtime for voice notes
ALTER PUBLICATION supabase_realtime ADD TABLE public.voice_notes;

-- Insert some starter channels
INSERT INTO public.channels (name, description) VALUES
  ('general', 'General discussions and random thoughts'),
  ('music', 'Share music recommendations and hot takes'),
  ('storytime', 'Share your stories and life experiences'),
  ('debate', 'Controversial opinions and debates'),
  ('comedy', 'Jokes, funny stories, and humor');
