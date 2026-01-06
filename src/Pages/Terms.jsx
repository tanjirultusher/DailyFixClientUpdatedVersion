import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Users, AlertTriangle } from 'lucide-react';

const Terms = () => {
  useEffect(() => {
    document.title = 'Terms of Service - DailyFix';
  }, []);

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: `By accessing and using DailyFix, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      id: 'services',
      title: 'Use of Services',
      icon: Users,
      content: `DailyFix provides a platform that connects customers with service providers. We do not directly provide services but facilitate connections between users and independent service providers.`
    },
    {
      id: 'accounts',
      title: 'User Accounts',
      icon: Shield,
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.`
    },
    {
      id: 'prohibited',
      title: 'Prohibited Uses',
      icon: AlertTriangle,
      content: `You may not use our service for any illegal or unauthorized purpose nor may you, in the use of the service, violate any laws in your jurisdiction including but not limited to copyright laws.`
    }
  ];

  const detailedTerms = [
    {
      title: '1. Terms',
      content: `By accessing this website, accessible from dailyfix.com, you are agreeing to be bound by these website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this website are protected by copyright and trade mark law.`
    },
    {
      title: '2. Use License',
      content: `Permission is granted to temporarily download one copy of the materials on DailyFix's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      
      • Modify or copy the materials
      • Use the materials for any commercial purpose or for any public display
      • Attempt to reverse engineer any software contained on the website
      • Remove any copyright or other proprietary notations from the materials`
    },
    {
      title: '3. Disclaimer',
      content: `The materials on DailyFix's website are provided "as is". DailyFix makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, DailyFix does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet website or otherwise relating to such materials or on any sites linked to this site.`
    },
    {
      title: '4. Limitations',
      content: `In no event shall DailyFix or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DailyFix's Internet site, even if DailyFix or a DailyFix authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.`
    },
    {
      title: '5. Revisions and Errata',
      content: `The materials appearing on DailyFix's website could include technical, typographical, or photographic errors. DailyFix does not warrant that any of the materials on its website are accurate, complete, or current. DailyFix may make changes to the materials contained on its website at any time without notice. DailyFix does not, however, make any commitment to update the materials.`
    },
    {
      title: '6. Links',
      content: `DailyFix has not reviewed all of the sites linked to our Internet website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by DailyFix of the site. Use of any such linked website is at the user's own risk.`
    },
    {
      title: '7. Site Terms of Use Modifications',
      content: `DailyFix may revise these terms of use for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms and Conditions of Use.`
    },
    {
      title: '8. Privacy Policy',
      content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.`
    },
    {
      title: '9. Service Provider Relationship',
      content: `DailyFix acts as an intermediary platform connecting customers with independent service providers. We do not employ service providers, and they are not our agents or representatives. Each service provider is an independent contractor responsible for their own services, pricing, and conduct.`
    },
    {
      title: '10. Payment Terms',
      content: `Payment processing is handled through secure third-party payment processors. By using our payment services, you agree to the terms and conditions of our payment processors. DailyFix may charge service fees as disclosed during the booking process.`
    },
    {
      title: '11. Cancellation and Refunds',
      content: `Cancellation and refund policies vary by service provider and are clearly stated during the booking process. DailyFix facilitates refunds according to the applicable cancellation policy but is not responsible for refund decisions made by service providers.`
    },
    {
      title: '12. Dispute Resolution',
      content: `Any disputes arising from the use of our platform should first be addressed through our customer support. If a resolution cannot be reached, disputes may be subject to binding arbitration in accordance with the rules of the American Arbitration Association.`
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
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Last updated: January 1, 2024
            </p>
            <p className="text-muted-foreground max-w-3xl">
              Please read these Terms of Service carefully before using our platform. 
              These terms govern your use of DailyFix and outline the rights and responsibilities 
              of all users.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Quick Overview</h2>
            <p className="text-muted-foreground mb-8">
              Here are the key points you should know about using DailyFix:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{section.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Detailed Terms and Conditions</h2>
            <p className="text-muted-foreground">
              The complete terms and conditions for using DailyFix services.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {detailedTerms.map((term, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{term.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none">
                      <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                        {term.content}
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
            <h2 className="text-3xl font-bold mb-4">Questions About Our Terms?</h2>
            <p className="text-muted-foreground mb-8">
              If you have any questions about these Terms of Service, please don't hesitate to contact us. 
              We're here to help clarify any concerns you may have.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/privacy">Privacy Policy</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terms;