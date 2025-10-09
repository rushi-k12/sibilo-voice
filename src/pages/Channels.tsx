import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Radio } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Navbar } from '@/components/Navbar';

interface Channel {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

const Channels = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchChannels();
  }, [user, navigate]);

  const fetchChannels = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .order('name');

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load channels",
      });
    } else {
      setChannels(data || []);
    }
    setIsLoading(false);
  };

  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    channel.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen waveform-bg gradient-mesh">
      <Navbar 
        showSearch={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Channels</h2>
            <p className="text-muted-foreground">Choose a channel to listen to anonymous voice notes</p>
          </div>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="glass shadow-card animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : filteredChannels.length === 0 ? (
            <Card className="glass shadow-card border-border/50 animate-scale-in">
              <CardContent className="p-12 text-center">
                <Radio className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchQuery ? 'No channels found' : 'No channels yet'}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery 
                    ? 'Try adjusting your search terms' 
                    : 'Check back later for new channels to join'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredChannels.map((channel, index) => (
                <Card 
                  key={channel.id}
                  className="glass shadow-card hover-lift hover-glow cursor-pointer group border-border/50 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/channel/${channel.id}`)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-smooth">
                      <Radio className="w-5 h-5" />
                      {channel.name}
                    </CardTitle>
                    <CardDescription>{channel.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Channels;
