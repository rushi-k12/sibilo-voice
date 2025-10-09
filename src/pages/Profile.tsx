import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mic, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceNote {
  id: string;
  audio_url: string;
  votes_count: number;
  created_at: string;
  duration_seconds?: number;
  channel_id: string;
  channels: {
    name: string;
  };
}

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notes, setNotes] = useState<VoiceNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUserNotes();
  }, [user, loading, navigate]);

  const fetchUserNotes = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from('voice_notes')
      .select(`
        id,
        audio_url,
        votes_count,
        created_at,
        duration_seconds,
        channel_id,
        channels (
          name
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load your voice notes',
      });
    } else {
      setNotes(data || []);
    }
    setIsLoading(false);
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
              <User className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-bold">Profile</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* User Info Card */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full gradient-primary shadow-glow">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
                Your Account
              </CardTitle>
              <CardDescription>
                {user?.email || 'No email available'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Voice Notes</span>
                <span className="font-semibold">{notes.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total Votes</span>
                <span className="font-semibold">
                  {notes.reduce((sum, note) => sum + (note.votes_count || 0), 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Voice Notes List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Voice Notes</h2>
            
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
                  <p className="text-muted-foreground mb-4">
                    Start sharing your voice in channels!
                  </p>
                  <Button
                    onClick={() => navigate('/channels')}
                    className="gradient-primary shadow-glow"
                  >
                    Browse Channels
                  </Button>
                </CardContent>
              </Card>
            ) : (
              notes.map((note) => (
                <Card
                  key={note.id}
                  className="shadow-card border-border/50 hover:shadow-glow transition-smooth cursor-pointer"
                  onClick={() => navigate(`/channel/${note.channel_id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                          <Mic className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-semibold">
                              {note.channels?.name || 'Unknown Channel'}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">
                              {formatDate(note.created_at)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <span>{formatDuration(note.duration_seconds)}</span>
                            <span>•</span>
                            <span>{note.votes_count || 0} votes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
