import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Heart
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="h-8 w-8 text-korean-red" />
              <div>
                <h3 className="text-xl font-bold">TriasiaGlobal</h3>
                <p className="text-sm text-background/70">Language Specialists</p>
              </div>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              India's leading translation service provider specializing in Korean and Chinese 
              languages with support for 120+ languages worldwide.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-background hover:text-korean-red hover:bg-background/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-chinese-gold hover:bg-background/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-korean-blue hover:bg-background/10">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3 text-background/80">
              <li>
                <a href="#" className="hover:text-korean-red transition-colors">
                  Legal Document Translation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-chinese-gold transition-colors">
                  Educational Certificates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Medical Documents
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-korean-blue transition-colors">
                  Technical Manuals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-korean-red transition-colors">
                  Business Documents
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-chinese-gold transition-colors">
                  Personal Documents
                </a>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-bold text-lg mb-6">Specialty Languages</h4>
            <div className="space-y-4">
              <div>
                <Badge className="bg-korean-red text-white mb-2">Korean Specialization</Badge>
                <ul className="text-sm text-background/80 space-y-1">
                  <li>한국어 ↔ English</li>
                  <li>한국어 ↔ Hindi</li>
                  <li>한국어 ↔ Regional Indian</li>
                </ul>
              </div>
              <div>
                <Badge className="bg-chinese-gold text-foreground mb-2">Chinese Specialization</Badge>
                <ul className="text-sm text-background/80 space-y-1">
                  <li>中文 ↔ English</li>
                  <li>中文 ↔ Hindi</li>
                  <li>中文 ↔ Regional Indian</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-korean-red mt-1" />
                <div>
                  <p className="text-background/80"><a href="tel:+91-9958-403-494">+91-9958-403-494</a></p>
                  {/* <p className="text-background/80">+91-XXX-XXX-XXXX</p> */}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-chinese-gold mt-1" />
                <div>
                  <p className="text-background/80">triasiaglobal@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-background/80">
                    Tagore Garden<br />
                    New Delhi, India - 110027
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="hero" size="sm" className="w-full">
                <a href="mailto:triasiaglobal@gmail.com">Get Instant Quote</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-background/70">
              <span>© 2025 TriasiaGlobal. All rights reserved.</span>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-korean-red transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-chinese-gold transition-colors">Quality Standards</a>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-background/80">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-korean-red" />
              <span>in India</span>
            </div>
          </div>

          {/* <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Badge variant="outline" className="border-background/30 text-background/80">
              ISO 17100:2015 Certified
            </Badge>
            <Badge variant="outline" className="border-background/30 text-background/80">
              ISO 9001:2015 Quality
            </Badge>
            <Badge variant="outline" className="border-background/30 text-background/80">
              ATA Member
            </Badge>
            <Badge variant="outline" className="border-background/30 text-background/80">
              GDPR Compliant
            </Badge>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;