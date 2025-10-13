import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen waveform-bg gradient-mesh">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-12 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-glow">Get in Touch</h1>
            <p className="text-xl text-foreground/80">
              Have questions, feedback, or suggestions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="glass rounded-2xl p-8 hover-lift">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="input-glow"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="input-glow"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                    required
                    className="input-glow"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    required
                    rows={5}
                    className="input-glow resize-none"
                  />
                </div>

                <Button type="submit" className="w-full gradient-primary shadow-glow hover-lift">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary shadow-glow flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-foreground/70 text-sm mb-2">
                      For general inquiries and support
                    </p>
                    <a href="mailto:support@sibilo.app" className="text-primary hover:underline">
                      support@sibilo.app
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary shadow-glow flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Feedback</h3>
                    <p className="text-foreground/70 text-sm mb-2">
                      Help us improve Sibilo
                    </p>
                    <a href="mailto:feedback@sibilo.app" className="text-primary hover:underline">
                      feedback@sibilo.app
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary shadow-glow flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Support</h3>
                    <p className="text-foreground/70 text-sm mb-2">
                      Technical issues and questions
                    </p>
                    <a href="mailto:help@sibilo.app" className="text-primary hover:underline">
                      help@sibilo.app
                    </a>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 hover-lift">
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-foreground/70 text-sm">
                  We typically respond within 24-48 hours. For urgent matters, please mention "urgent" in your subject line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
