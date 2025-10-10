import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Mic, Radio, TrendingUp, Users } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/channels');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen waveform-bg gradient-mesh">
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="py-20 text-center space-y-8">
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="drop-shadow-glow">Speak. Share.</span>
                <span className="gradient-primary bg-clip-text text-transparent block mt-2 drop-shadow-glow">
                  Be Heard.
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
                Anonymous voice notes in topic-based channels. Pure content, authentic conversations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button
                size="lg"
                className="gradient-primary shadow-glow text-lg px-10 py-6 h-auto hover-lift font-semibold"
                onClick={() => navigate('/auth')}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 h-auto glass hover-glow border-primary/30 font-semibold"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* App Preview Demo */}
          <div className="py-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-border/50 glass hover-lift">
              <div className="aspect-video flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-4">
                  {/* Demo Voice Note Cards */}
                  <div className="glass rounded-lg p-4 border border-border/30 animate-fade-in">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary shadow-glow flex items-center justify-center">
                        <Mic className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 bg-primary/60 rounded-full flex-1 overflow-hidden">
                            <div className="h-full w-3/4 bg-primary rounded-full"></div>
                          </div>
                          <span className="text-xs text-muted-foreground">0:45</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Voice note from Tech Talk</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-lg p-4 border border-border/30 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary shadow-glow flex items-center justify-center">
                        <Mic className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 bg-primary/60 rounded-full flex-1 overflow-hidden">
                            <div className="h-full w-1/2 bg-primary rounded-full"></div>
                          </div>
                          <span className="text-xs text-muted-foreground">1:12</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Voice note from Music Reviews</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Radio className="w-4 h-4" />
                      <span>Live voice conversations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="py-20 grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-xl glass hover-lift hover-glow animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-primary shadow-glow">
                <Mic className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Voice First</h3>
              <p className="text-muted-foreground">
                Record and share authentic voice messages in seconds. No typing required.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl glass hover-lift hover-glow animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-primary shadow-glow">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Anonymous</h3>
              <p className="text-muted-foreground">
                Share your real thoughts without identity barriers. Pure content, no profiles.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl glass hover-lift hover-glow animate-fade-in" style={{ animationDelay: '1s' }}>
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
      <footer className="border-t border-border/50 glass mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6 text-sm">
              <button className="text-muted-foreground hover:text-foreground transition-smooth">
                About
              </button>
              <span className="text-border">•</span>
              <button className="text-muted-foreground hover:text-foreground transition-smooth">
                Contact
              </button>
              <span className="text-border">•</span>
              <button className="text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Sibilo. Anonymous voice notes, amplified.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
