import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Clock, 
  Award, 
  Users, 
  CheckCircle, 
  Globe, 
  Star,
  Zap
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Accuracy Guarantee",
    description: "Our certified translators ensure every document maintains its original meaning with cultural sensitivity.",
    color: "text-korean-red",
    bgColor: "bg-korean-red/10"
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Express delivery options available. Most documents completed within 24-48 hours.",
    color: "text-chinese-gold",
    bgColor: "bg-chinese-gold/10"
  },
  {
    icon: Award,
    title: "ISO Certified Quality",
    description: "ISO 17100:2015 certified translation services with rigorous quality control processes.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Users,
    title: "Native Linguists",
    description: "Team of native Korean and Chinese speakers with subject matter expertise.",
    color: "text-korean-blue",
    bgColor: "bg-korean-blue/10"
  },
  {
    icon: Globe,
    title: "Cultural Authenticity",
    description: "Deep understanding of cultural nuances ensures authentic and appropriate translations.",
    color: "text-accent-foreground",
    bgColor: "bg-accent/20"
  },
  {
    icon: Zap,
    title: "24/7 Support",
    description: "Round-the-clock customer support for urgent translation requirements.",
    color: "text-muted-foreground",
    bgColor: "bg-muted/20"
  }
];

const achievements = [
  { number: "15+", label: "Years Experience" },
  { number: "500+", label: "Happy Clients" },
  { number: "10K+", label: "Documents Translated" },
  { number: "120+", label: "Languages Supported" },
  { number: "99.9%", label: "Client Satisfaction" },
  { number: "24/7", label: "Customer Support" }
];

const WhyChooseUsSection = () => {
  return (
    <section id="why-us" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose TranslateIndia?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            India's most trusted translation service provider with a proven track record 
            of excellence in Korean and Chinese translations.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center bg-gradient-card shadow-card border-0 hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{achievement.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{achievement.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 bg-gradient-card border-0">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quality Certifications */}
        <Card className="bg-gradient-to-r from-primary/5 via-korean-red/5 to-chinese-gold/5 border-0 shadow-elegant">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Quality Certifications & Standards
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our commitment to excellence is backed by internationally recognized certifications and standards.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <Badge variant="outline" className="border-primary text-primary">ISO 17100:2015</Badge>
                <p className="text-sm text-muted-foreground mt-2">Translation Services</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-korean-red/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-8 w-8 text-korean-red" />
                </div>
                <Badge variant="outline" className="border-korean-red text-korean-red">ISO 9001:2015</Badge>
                <p className="text-sm text-muted-foreground mt-2">Quality Management</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-chinese-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-8 w-8 text-chinese-gold" />
                </div>
                <Badge variant="outline" className="border-chinese-gold text-chinese-gold">ATA Certified</Badge>
                <p className="text-sm text-muted-foreground mt-2">American Translators</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-korean-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-8 w-8 text-korean-blue" />
                </div>
                <Badge variant="outline" className="border-korean-blue text-korean-blue">GDPR Compliant</Badge>
                <p className="text-sm text-muted-foreground mt-2">Data Protection</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;