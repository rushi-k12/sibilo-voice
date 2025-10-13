import { Navbar } from '@/components/Navbar';

const Privacy = () => {
  return (
    <div className="min-h-screen waveform-bg gradient-mesh">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-glow">Privacy Policy</h1>
            <p className="text-foreground/80">Last updated: January 2025</p>
          </div>

          <div className="glass rounded-2xl p-8 space-y-8">
            {/* Introduction */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Our Commitment to Privacy</h2>
              <p className="text-foreground/80 leading-relaxed">
                At Sibilo, your privacy is our priority. We've built our platform on the foundation of 
                anonymity and data protection. This policy explains how we collect, use, and protect 
                your information.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Information We Collect</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Account Information</h3>
                  <p className="text-foreground/70">
                    When you create an account, we collect your email address and password. 
                    Your email is used solely for account recovery and essential notifications.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Voice Notes</h3>
                  <p className="text-foreground/70">
                    We store the voice recordings you share on our platform. These recordings are 
                    anonymized and not linked to your personal identity in any public-facing way.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Usage Data</h3>
                  <p className="text-foreground/70">
                    We collect anonymous usage statistics to improve the platform, including 
                    interactions with channels, voting patterns, and playback statistics.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              <ul className="space-y-2 text-foreground/70 list-disc list-inside">
                <li>To provide and maintain the Sibilo service</li>
                <li>To authenticate your account and prevent unauthorized access</li>
                <li>To improve our platform based on anonymous usage patterns</li>
                <li>To moderate content and enforce community guidelines</li>
                <li>To send essential service notifications (we'll never spam you)</li>
              </ul>
            </section>

            {/* Anonymity & Protection */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Your Anonymity</h2>
              <p className="text-foreground/80 leading-relaxed">
                Sibilo is built on anonymity. When you share voice notes:
              </p>
              <ul className="space-y-2 text-foreground/70 list-disc list-inside">
                <li>Your name, email, and profile information are not displayed publicly</li>
                <li>Voice notes are not linked to your account in public view</li>
                <li>Other users cannot see your listening history or voting patterns</li>
                <li>We do not sell or share your personal data with third parties</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Data Security</h2>
              <p className="text-foreground/80 leading-relaxed">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="space-y-2 text-foreground/70 list-disc list-inside">
                <li>Encrypted data transmission (HTTPS/TLS)</li>
                <li>Secure password hashing</li>
                <li>Regular security audits and updates</li>
                <li>Limited employee access to personal data</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Your Rights</h2>
              <p className="text-foreground/80 leading-relaxed">You have the right to:</p>
              <ul className="space-y-2 text-foreground/70 list-disc list-inside">
                <li>Access your personal data</li>
                <li>Request deletion of your account and associated data</li>
                <li>Export your voice notes</li>
                <li>Opt out of non-essential communications</li>
                <li>Request corrections to your data</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Third-Party Services</h2>
              <p className="text-foreground/80 leading-relaxed">
                Sibilo uses secure cloud infrastructure to store and deliver content. These 
                providers are bound by strict data protection agreements and do not have access 
                to identifiable user information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Children's Privacy</h2>
              <p className="text-foreground/80 leading-relaxed">
                Sibilo is not intended for users under 13 years of age. We do not knowingly 
                collect personal information from children under 13.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Changes to This Policy</h2>
              <p className="text-foreground/80 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any 
                significant changes by email or through the platform.
              </p>
            </section>

            {/* Contact */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p className="text-foreground/80 leading-relaxed">
                If you have questions about this privacy policy or how we handle your data, 
                please contact us at:{' '}
                <a href="mailto:privacy@sibilo.app" className="text-primary hover:underline">
                  privacy@sibilo.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
