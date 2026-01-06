import { Twitter, Github, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-3">
              Daily<span className="text-primary">Fix</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-4">
              Your trusted partner for all household services. We connect you with verified professionals to make your home maintenance effortless and reliable.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" />
                <span>support@dailyfix.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Service Street, City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                Browse Services
              </a>
              <a href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <a href="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
            <div className="flex justify-center md:justify-end gap-3 mb-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                title="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Follow us for updates and tips
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-primary font-semibold">DailyFix</span>. 
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for better homes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
