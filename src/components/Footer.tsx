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
  Heart,
} from "lucide-react";
import { languages } from "@/content/languages";
import { cities } from "@/content/cities";
import { serviceCategories } from "@/content/serviceCategories";
import { business } from "@/content/business";
import { Link } from "react-router-dom";

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
                <p className="text-sm text-background/70">
                  Language Specialists
                </p>
              </div>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              India's leading translation service provider specializing in
              Korean and Chinese languages with support for 120+ languages
              worldwide.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-background hover:text-korean-red hover:bg-background/10"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-background hover:text-chinese-gold hover:bg-background/10"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-background hover:text-primary hover:bg-background/10"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-background hover:text-korean-blue hover:bg-background/10"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3 text-background/80">
              {serviceCategories.map((category) => (
                <li key={category.slug}>
                  <Link to={`/services/${category.slug}`} className="hover:text-korean-red transition-colors">
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-bold text-lg mb-6">Specialty Languages</h4>
            <div className="space-y-3 text-background/80">
              {languages?.map((language) => (
                <div key={language.slug} className="flex items-center gap-2">
                  <Link to={`/${language.slug}/translator`} className="hover:text-korean-red transition-colors">
                    {language.name} Translator
                  </Link>
                  <span className="text-background/40">·</span>
                  <Link to={`/${language.slug}/interpreter`} className="text-sm hover:text-korean-red transition-colors">
                    Interpreter
                  </Link>
                </div>
              ))}
              <div className="hover:text-korean-red transition-colors">
                <Link to="/locations">Browse by City</Link>
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
                  <p className="text-background/80">
                    <a href={`tel:${business.phone}`}>{business.phone}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-chinese-gold mt-1" />
                <div>
                  <p className="text-background/80">{business.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-background/80">
                    {business.address.streetAddress}
                    <br />
                    {business.address.addressLocality}, India - {business.address.postalCode}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="hero" size="sm" className="w-full">
                <a href={`mailto:${business.email}`}>Get Instant Quote</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Cities We Serve */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <h4 className="font-bold text-lg mb-4">
            <Link to="/locations" className="hover:text-korean-red transition-colors">
              Cities We Serve
            </Link>
          </h4>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-background/80">
            {cities.map((city) => (
              <Link key={city.slug} to={`/locations/${city.slug}`} className="hover:text-korean-red transition-colors">
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-background/70">
              <span>© 2025 TriasiaGlobal. All rights reserved.</span>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-korean-red transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-chinese-gold transition-colors">
                Quality Standards
              </a>
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
