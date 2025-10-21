import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  GraduationCap, 
  Scale, 
  Building, 
  BookOpen, 
  Stethoscope,
  Cog,
  Briefcase 
} from "lucide-react";

const defaultServices = [
  {
    icon: Scale,
    title: "Legal Document Translation",
    description: "Contracts, agreements, court documents, and legal certificates with certified accuracy.",
    color: "text-korean-red",
    bgColor: "bg-korean-red/10"
  },
  {
    icon: GraduationCap,
    title: "Educational Certificates",
    description: "Academic transcripts, degrees, diplomas, and educational credentials.",
    color: "text-chinese-gold",
    bgColor: "bg-chinese-gold/10"
  },
  {
    icon: Stethoscope,
    title: "Medical Documents",
    description: "Medical reports, prescriptions, health certificates, and clinical documentation.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Cog,
    title: "Technical Manuals",
    description: "User manuals, technical specifications, engineering documents, and product guides.",
    color: "text-korean-blue",
    bgColor: "bg-korean-blue/10"
  },
  {
    icon: Building,
    title: "Business Documents",
    description: "Company profiles, brochures, marketing materials, and corporate communications.",
    color: "text-accent-foreground",
    bgColor: "bg-accent/20"
  },
  {
    icon: FileText,
    title: "Personal Documents",
    description: "Birth certificates, marriage certificates, ID documents, and personal records.",
    color: "text-muted-foreground",
    bgColor: "bg-muted/20"
  }
];

const defaultHeading = "Professional Document Translation Services";
const defaultSubheading = " With expertise in over 120 languages, TriAsia Global offers high-quality translations for:"

const ServicesSection = ({ services = defaultServices, heading = defaultHeading, subHeading = defaultSubheading }) => {
  return (
    <section id="services" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {heading}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {subHeading}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 bg-gradient-card border-0">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </CardDescription>
                {/* <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                  Learn More →
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="px-8 py-6">
            <a href="mailto:triasiaglobal@gmail.com" className="text-lg
">Get Free Quote</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;