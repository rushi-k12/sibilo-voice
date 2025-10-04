import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, SkipForward, Radio, Mic } from 'lucide-react';
import { VoiceNoteCard } from '@/components/VoiceNoteCard';
import { AudioRecorder } from '@/components/AudioRecorder';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface VoiceNote {
  id: string;
  audio_url: string;
  votes_count: number;
  created_at: string;
  user_id: string;
  duration_seconds?: number;
}

interface Channel {
  id: string;
  name: string;
  description: string;
}

const ChannelFeed = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [channel, setChannel] = useState<Channel | null>(null);
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, { vote_type: number }>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (channelId) {
      fetchChannel();
      fetchNotes();
      fetchUserVotes();
    }
  }, [user, channelId, navigate]);

  useEffect(() => {
    if (!channelId) return;

    const channel = supabase
      .channel('voice-notes-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'voice_notes',
          filter: `channel_id=eq.${channelId}`
        },
        () => {
          fetchNotes();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votes'
        },
        () => {
          fetchNotes();
          fetchUserVotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelId]);

  const fetchChannel = async () => {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .eq('id', channelId)
      .single();

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load channel",
      });
      navigate('/channels');
    } else {
      setChannel(data);
    }
  };

  const fetchNotes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('voice_notes')
      .select('*')
      .eq('channel_id', channelId)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load voice notes",
      });
    } else {
      setNotes(data || []);
    }
    setIsLoading(false);
  };

  const fetchUserVotes = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('votes')
      .select('note_id, vote_type')
      .eq('user_id', user.id);

    if (data) {
      const votesMap = data.reduce((acc, vote) => {
        acc[vote.note_id] = { vote_type: vote.vote_type };
        return acc;
      }, {} as Record<string, { vote_type: number }>);
      setUserVotes(votesMap);
    }
  };

  const playNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(note.audio_url);
    audioRef.current.play();
    setCurrentNoteId(noteId);
    setIsPlaying(true);

    audioRef.current.onended = () => {
      setIsPlaying(false);
      if (autoplay) {
        playNextNote(noteId);
      }
    };

    audioRef.current.onerror = () => {
      toast({
        variant: "destructive",
        title: "Playback error",
        description: "Failed to play audio",
      });
      setIsPlaying(false);
    };
  };

  const pauseNote = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playNextNote = (currentId: string) => {
    const currentIndex = notes.findIndex(n => n.id === currentId);
    if (currentIndex < notes.length - 1) {
      playNote(notes[currentIndex + 1].id);
    }
  };

  const handlePlayToggle = (noteId: string) => {
    if (currentNoteId === noteId && isPlaying) {
      pauseNote();
    } else {
      playNote(noteId);
    }
  };

  return (
    <div className="min-h-screen waveform-bg pb-32">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/channels')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold">{channel?.name}</h1>
            </div>
          </div>
          {channel?.description && (
            <p className="text-sm text-muted-foreground mt-2 ml-14">{channel.description}</p>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <AudioRecorder channelId={channelId!} onUploadComplete={fetchNotes} />

          <Card className="shadow-card border-border/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Switch
                  id="autoplay"
                  checked={autoplay}
                  onCheckedChange={setAutoplay}
                />
                <Label htmlFor="autoplay" className="cursor-pointer">
                  Autoplay
                </Label>
              </div>
              {currentNoteId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => playNextNote(currentNoteId)}
                  className="gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  Next
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="shadow-card animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-20 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : notes.length === 0 ? (
              <Card className="shadow-card border-border/50">
                <CardContent className="p-12 text-center">
                  <Mic className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No voice notes yet</h3>
                  <p className="text-muted-foreground">
                    Be the first to share a voice note in this channel!
                  </p>
                </CardContent>
              </Card>
            ) : (
              notes.map((note) => (
                <VoiceNoteCard
                  key={note.id}
                  note={note}
                  userVote={userVotes[note.id]}
                  onVoteChange={fetchUserVotes}
                  onDelete={fetchNotes}
                  isPlaying={currentNoteId === note.id && isPlaying}
                  onPlayToggle={() => handlePlayToggle(note.id)}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChannelFeed;
