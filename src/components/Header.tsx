import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Globe, Phone, Mail, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to='/' className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">TriasiaGlobal</h1>
              <p className="text-xs text-muted-foreground">Language Specialists</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#languages" className="text-foreground hover:text-primary transition-colors">
              Languages
            </a>
            <a href="#why-us" className="text-foreground hover:text-primary transition-colors">
              Why Choose Us
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span><a href="tel:+91-9958-403-494">+91-9958-403-494</a></span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>triasiaglobal@gmail.com</span>
              </div>
            </div>
            <Button variant="hero" size="sm" className="hidden sm:flex">
              <a href="mailto:triasiaglobal@gmail.com">Get Quote</a>
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="fullscreen" className="flex flex-col justify-center items-center p-8">
                <div className="flex flex-col items-center space-y-12 w-full max-w-md">
                  {/* Logo Section */}
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-12 w-12 text-primary" />
                      <div>
                        <h1 className="text-3xl font-bold text-foreground">TriasiaGlobal</h1>
                        <p className="text-sm text-muted-foreground">Korean & Chinese Specialists</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <nav className="flex flex-col space-y-6 w-full">
                    <a 
                      href="#services" 
                      className="text-2xl font-medium text-foreground hover:text-primary transition-all duration-300 text-center py-4 hover:scale-105"
                      onClick={() => setIsOpen(false)}
                    >
                      Services
                    </a>
                    <a 
                      href="#languages" 
                      className="text-2xl font-medium text-foreground hover:text-primary transition-all duration-300 text-center py-4 hover:scale-105"
                      onClick={() => setIsOpen(false)}
                    >
                      Languages
                    </a>
                    <a 
                      href="#why-us" 
                      className="text-2xl font-medium text-foreground hover:text-primary transition-all duration-300 text-center py-4 hover:scale-105"
                      onClick={() => setIsOpen(false)}
                    >
                      Why Choose Us
                    </a>
                    <a 
                      href="#contact" 
                      className="text-2xl font-medium text-foreground hover:text-primary transition-all duration-300 text-center py-4 hover:scale-105"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </a>
                  </nav>

                  {/* Contact Info & CTA */}
                  <div className="flex flex-col items-center space-y-6 w-full mt-8">
                    <div className="flex flex-col items-center space-y-4 text-center">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Phone className="h-5 w-5" />
                        <span className="text-lg"><a href="tel:+91-9958-403-494">+91-9958-403-494</a></span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Mail className="h-5 w-5" />
                        <span className="text-lg">triasiaglobal@gmail.com</span>
                      </div>
                    </div>
                    <Button variant="hero" size="lg" className="w-full text-lg py-6">
                      Get Quote
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;