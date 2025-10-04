import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Mic, Radio, TrendingUp, Users } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/channels');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen waveform-bg">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full gradient-primary shadow-glow">
                <Mic className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                Sibilo
              </h1>
            </div>
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="py-20 text-center space-y-8">
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Anonymous Voice Notes,
                <span className="gradient-primary bg-clip-text text-transparent block mt-2">
                  Amplified
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Share your thoughts through voice in topic-based channels. No names, just authentic conversations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button
                size="lg"
                className="gradient-primary shadow-glow text-lg px-8"
                onClick={() => navigate('/auth')}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                onClick={() => navigate('/auth')}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* App Preview Placeholder */}
          <div className="py-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-card border border-border/50 bg-card/30 backdrop-blur-sm">
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary shadow-glow">
                    <Radio className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground">App Preview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="py-20 grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:shadow-glow transition-smooth animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-primary shadow-glow">
                <Mic className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Voice First</h3>
              <p className="text-muted-foreground">
                Record and share authentic voice messages in seconds. No typing required.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:shadow-glow transition-smooth animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-primary shadow-glow">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Anonymous</h3>
              <p className="text-muted-foreground">
                Share your real thoughts without identity barriers. Pure content, no profiles.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:shadow-glow transition-smooth animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-primary shadow-glow">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Community Driven</h3>
              <p className="text-muted-foreground">
                Vote on the best content. Let quality rise to the top organically.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Sibilo. Anonymous voice notes, amplified.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
