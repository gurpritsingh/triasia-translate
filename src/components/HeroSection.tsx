import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Star, Users, FileText } from "lucide-react";
import heroImage from "@/assets/hero-translation.jpg";

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary font-medium">
                <CheckCircle className="h-5 w-5" />
                <span>India's Leading Translation Service</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Certified <span className="text-korean-red">Translation & Interpretation</span>
                <span className="text-chinese-gold"> Services</span>  in India
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                TriAsiaGlobal is a leading certified translation and interpretation agency in India, trusted nationwide for delivering precise, government-recognized, and internationally accepted translations.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">We specialize in authorized document translation for individuals, corporations, and government bodies. Our team of certified translators and native language experts ensures accuracy, cultural sensitivity, and compliance with official requirements.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                <a href="mailto:triasiaglobal@gmail.com">Start Your Translation</a>
              </Button>
              {/* <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                View Sample Work
              </Button> */}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <Card className="p-4 text-center bg-gradient-card shadow-card border-0">
                <div className="flex flex-col items-center space-y-2">
                  <Users className="h-8 w-8 text-primary" />
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
              </Card>
              
              <Card className="p-4 text-center bg-gradient-card shadow-card border-0">
                <div className="flex flex-col items-center space-y-2">
                  <FileText className="h-8 w-8 text-korean-red" />
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Documents</div>
                </div>
              </Card>
              
              <Card className="p-4 text-center bg-gradient-card shadow-card border-0">
                <div className="flex flex-col items-center space-y-2">
                  <Star fill="yellow" strokeWidth={1} className="h-8 w-8"/>
                  <div className="text-2xl font-bold text-foreground">5.0</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="Professional Translation Services" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating quality badges */}
            {/* <Card className="absolute -top-4 -left-4 p-3 bg-gradient-card shadow-glow border-0">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-korean-red" />
                <span className="font-semibold text-foreground">ISO Certified</span>
              </div>
            </Card> */}
            
            <Card className="absolute -bottom-4 -right-4 p-3 bg-gradient-card shadow-glow border-0">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-chinese-gold" />
                <span className="font-semibold text-foreground">24/7 Support</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;