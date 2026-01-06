import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Globe } from 'lucide-react';

const Privacy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy - DailyFix';
  }, []);

  const principles = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'We use industry-standard security measures to protect your personal information.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We clearly explain what data we collect and how we use it.'
    },
    {
      icon: Lock,
      title: 'Your Control',
      description: 'You have control over your data and can request changes or deletion at any time.'
    },
    {
      icon: UserCheck,
      title: 'Minimal Collection',
      description: 'We only collect data that is necessary to provide our services.'
    }
  ];

  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, book a service, or contact us for support. This may include:

      • Personal Information: Name, email address, phone number, and profile photo
      • Account Information: Username, password, and account preferences
      • Payment Information: Credit card details and billing address (processed securely through third-party payment processors)
      • Service Information: Details about services you book or provide
      • Communication Data: Messages sent through our platform and customer support interactions

      We also automatically collect certain information when you use our platform:
      • Device Information: IP address, browser type, operating system
      • Usage Data: Pages visited, features used, time spent on platform
      • Location Data: General location information (with your permission)`
    },
    {
      title: '2. How We Use Your Information',
      content: `We use the information we collect to:

      • Provide and maintain our services
      • Process transactions and send related information
      • Send you technical notices, updates, security alerts, and support messages
      • Respond to your comments, questions, and customer service requests
      • Communicate with you about products, services, offers, and events
      • Monitor and analyze trends, usage, and activities in connection with our services
      • Detect, investigate, and prevent fraudulent transactions and other illegal activities
      • Personalize and improve our services and provide content or features that match your interests
      • Facilitate connections between customers and service providers`
    },
    {
      title: '3. Information Sharing and Disclosure',
      content: `We may share your information in the following situations:

      • With Service Providers: We share necessary information with service providers to facilitate bookings
      • With Third-Party Services: We use trusted third-party services for payment processing, analytics, and customer support
      • For Legal Reasons: We may disclose information if required by law or to protect our rights and safety
      • Business Transfers: In the event of a merger, acquisition, or sale of assets
      • With Your Consent: We may share information with your explicit consent

      We do not sell, trade, or rent your personal information to third parties for marketing purposes.`
    },
    {
      title: '4. Data Security',
      content: `We take data security seriously and implement appropriate technical and organizational measures to protect your information:

      • Encryption: All data transmission is encrypted using SSL/TLS protocols
      • Secure Storage: Personal data is stored on secure servers with restricted access
      • Regular Audits: We conduct regular security audits and assessments
      • Employee Training: Our team is trained on data protection and privacy practices
      • Access Controls: We limit access to personal information to authorized personnel only

      While we strive to protect your information, no method of transmission over the internet is 100% secure.`
    },
    {
      title: '5. Your Rights and Choices',
      content: `You have several rights regarding your personal information:

      • Access: You can request a copy of the personal information we hold about you
      • Correction: You can update or correct your personal information at any time
      • Deletion: You can request deletion of your personal information (subject to legal requirements)
      • Portability: You can request a copy of your data in a machine-readable format
      • Objection: You can object to certain processing of your personal information
      • Restriction: You can request restriction of processing in certain circumstances

      To exercise these rights, please contact us through our support channels.`
    },
    {
      title: '6. Cookies and Tracking Technologies',
      content: `We use cookies and similar tracking technologies to:

      • Remember your preferences and settings
      • Understand how you use our platform
      • Improve our services and user experience
      • Provide personalized content and recommendations

      Types of cookies we use:
      • Essential Cookies: Required for basic platform functionality
      • Analytics Cookies: Help us understand user behavior and improve our services
      • Preference Cookies: Remember your settings and preferences
      • Marketing Cookies: Used to deliver relevant advertisements (with your consent)

      You can control cookie settings through your browser preferences.`
    },
    {
      title: '7. Data Retention',
      content: `We retain your personal information for as long as necessary to:

      • Provide our services to you
      • Comply with legal obligations
      • Resolve disputes and enforce agreements
      • Maintain business records

      Specific retention periods:
      • Account Information: Retained while your account is active and for 3 years after closure
      • Transaction Data: Retained for 7 years for tax and legal compliance
      • Communication Records: Retained for 2 years for customer service purposes
      • Marketing Data: Retained until you opt out or for 2 years of inactivity`
    },
    {
      title: '8. International Data Transfers',
      content: `DailyFix operates globally, and your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place:

      • Adequacy Decisions: We transfer data to countries with adequate data protection laws
      • Standard Contractual Clauses: We use EU-approved contractual clauses for transfers
      • Certification Programs: We work with partners who participate in recognized certification programs
      • Your Consent: We may transfer data with your explicit consent

      We are committed to ensuring your data receives the same level of protection regardless of location.`
    },
    {
      title: '9. Children\'s Privacy',
      content: `Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.

      For users between 13 and 18 years of age, we require parental consent before collecting any personal information. We encourage parents to monitor their children's online activities and help enforce this policy.`
    },
    {
      title: '10. Changes to This Privacy Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:

      • Posting the updated policy on our website
      • Sending you an email notification (if you have an account)
      • Displaying a prominent notice on our platform

      We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information. Your continued use of our services after any changes indicates your acceptance of the updated policy.`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <Badge variant="secondary" className="mb-4">
              Privacy
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Last updated: January 1, 2024
            </p>
            <p className="text-muted-foreground max-w-3xl">
              At DailyFix, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Privacy Principles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide how we handle your personal information and protect your privacy.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full">
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg">{principle.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{principle.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Policy */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Detailed Privacy Policy</h2>
            <p className="text-muted-foreground">
              Complete information about how we collect, use, and protect your personal data.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center mb-4">
              <Database className="h-8 w-8 text-primary mr-2" />
              <Globe className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Questions About Your Privacy?</h2>
            <p className="text-muted-foreground mb-8">
              If you have any questions about this Privacy Policy or how we handle your personal information, 
              our privacy team is here to help. You can also exercise your data rights by contacting us.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">Contact Privacy Team</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/terms">Terms of Service</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;