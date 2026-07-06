import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { serviceCategories } from "@/content/serviceCategories";

const defaultServices = serviceCategories.map((category) => ({
  slug: category.slug,
  icon: category.icon,
  title: category.title,
  description: category.cardDescription,
  color: category.color,
  bgColor: category.bgColor,
}));

const defaultHeading = "Professional Document Translation Services";
const defaultSubheading = " With expertise in over 120 languages, TriAsia Global offers high-quality translations for:"

const ServicesSection = ({
  services = defaultServices,
  heading = defaultHeading,
  subHeading = defaultSubheading,
  headingLevel = "h2",
}: {
  services?: Array<Omit<(typeof defaultServices)[number], "slug"> & { slug?: string }>;
  heading?: string;
  subHeading?: string;
  headingLevel?: "h1" | "h2";
}) => {
  const Heading = headingLevel;
  return (
    <section id="services" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Heading className="text-4xl font-bold text-foreground mb-4">
            {heading}
          </Heading>
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
                  {service.slug ? <Link to={`/services/${service.slug}`}>{service.title}</Link> : service.title}
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