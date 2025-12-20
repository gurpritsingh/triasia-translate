import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Globe, Phone, Mail, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { navigationConfig } from "../navigationConfig";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationConfig.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <div 
                    key={item.name} 
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button 
                      className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors py-2"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 w-48 bg-popover border border-border rounded-md shadow-lg py-2 transition-all duration-200 ${activeDropdown === item.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                      {item.children.map((child) => (
                        <div key={child.name} className="relative group/sub">
                          {child.children ? (
                             <div className="px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer flex justify-between items-center">
                               {child.name}
                               <ChevronDown className="h-3 w-3 -rotate-90" />
                               
                               {/* Sub-dropdown (Right side) */}
                               <div className="absolute left-full top-0 w-48 bg-popover border border-border rounded-md shadow-lg py-2 hidden group-hover/sub:block">
                                 {child.children.map((subChild) => (
                                   <Link
                                     key={subChild.path}
                                     to={subChild.path!}
                                     className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                                   >
                                     {subChild.name}
                                   </Link>
                                 ))}
                               </div>
                             </div>
                          ) : (
                            <Link
                              to={child.path!}
                              className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                              {child.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              
              return (
                <Link 
                  key={item.name}
                  to={item.path!} 
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              );
            })}
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
              <SheetContent side="fullscreen" className="flex flex-col p-0">
                <div className="flex flex-col h-full overflow-y-auto p-8">
                  {/* Logo Section */}
                  <Link to="/" className="flex flex-col items-center space-y-4 text-center mb-8" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-12 w-12 text-primary" />
                      <div>
                        <h1 className="text-3xl font-bold text-foreground">TriasiaGlobal</h1>
                        <p className="text-sm text-muted-foreground">Korean & Chinese Specialists</p>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Navigation */}
                  <nav className="flex flex-col space-y-4 w-full">
                    {navigationConfig.map((item) => {
                      if (item.children) {
                        return (
                          <div key={item.name} className="flex flex-col space-y-2">
                            <div className="text-xl font-medium text-foreground text-center py-2 border-b border-border/50">
                              {item.name}
                            </div>
                            <div className="flex flex-col space-y-2 pl-4">
                              {item.children.map((child) => (
                                <div key={child.name} className="flex flex-col space-y-2">
                                  {child.children ? (
                                    <>
                                      <div className="text-lg font-medium text-muted-foreground text-center py-1">
                                        {child.name}
                                      </div>
                                      {child.children.map((subChild) => (
                                        <Link
                                          key={subChild.path}
                                          to={subChild.path!}
                                          className="text-base text-muted-foreground hover:text-primary text-center py-1"
                                          onClick={() => setIsOpen(false)}
                                        >
                                          {subChild.name}
                                        </Link>
                                      ))}
                                    </>
                                  ) : (
                                    <Link
                                      to={child.path!}
                                      className="text-lg text-muted-foreground hover:text-primary text-center py-2"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {child.name}
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <Link 
                          key={item.name}
                          to={item.path!} 
                          className="text-2xl font-medium text-foreground hover:text-primary transition-all duration-300 text-center py-4 hover:scale-105"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Contact Info & CTA */}
                  <div className="flex flex-col items-center space-y-6 w-full mt-auto pt-8">
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