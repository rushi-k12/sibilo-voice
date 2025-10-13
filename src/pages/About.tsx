import { Navbar } from '@/components/Navbar';
import { Mic, Users, Radio, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen waveform-bg gradient-mesh">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-12 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-glow">About Sibilo</h1>
            <p className="text-xl text-foreground/80">
              Your voice matters. We're here to amplify it.
            </p>
          </div>

          {/* Mission */}
          <div className="glass rounded-2xl p-8 space-y-4 hover-lift">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-foreground/80 leading-relaxed">
              Sibilo is built on the belief that everyone has a story worth sharing. We've created 
              a platform where your voice—literally—takes center stage. No profiles, no follower counts, 
              just pure, authentic conversations in topic-based channels.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              In a world dominated by text and curated personas, we're bringing back the human element 
              through voice. Your tone, your emotion, your authenticity—that's what makes conversations real.
            </p>
          </div>

          {/* How It Works */}
          <div className="glass rounded-2xl p-8 space-y-6 hover-lift">
            <h2 className="text-2xl font-bold">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-primary shadow-glow flex items-center justify-center">
                  <Mic className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Record Your Thoughts</h3>
                  <p className="text-foreground/70">
                    Hit record and speak your mind. No typing, no editing—just raw, authentic voice notes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-primary shadow-glow flex items-center justify-center">
                  <Radio className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Choose Your Channel</h3>
                  <p className="text-foreground/70">
                    Share in topic-based channels—from comedy to debate, music to storytelling.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-primary shadow-glow flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Stay Anonymous</h3>
                  <p className="text-foreground/70">
                    Your identity stays private. Let your content speak for itself, not your profile.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-primary shadow-glow flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Community-Driven</h3>
                  <p className="text-foreground/70">
                    Vote on the best content. Quality rises to the top organically through community engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="glass rounded-2xl p-8 space-y-4 hover-lift">
            <h2 className="text-2xl font-bold">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">🎤 Authenticity First</h3>
                <p className="text-foreground/70">
                  Real voices, real emotions, real conversations. No filters, no facades.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🔒 Privacy Matters</h3>
                <p className="text-foreground/70">
                  Your anonymity is protected. Share without fear of judgment or exposure.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🌍 Inclusive Community</h3>
                <p className="text-foreground/70">
                  Everyone has a voice. Everyone deserves to be heard.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">⚡ Quality Content</h3>
                <p className="text-foreground/70">
                  Let great content rise naturally through community voting and engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
