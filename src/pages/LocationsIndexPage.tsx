import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { cities } from "@/content/cities";
import { buildStaticSeo } from "@/content/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const seo = buildStaticSeo({
  title: "Translation & Interpretation Services Across India | TriasiaGlobal",
  description:
    "Browse TriasiaGlobal's certified translator and interpreter services by city across India, covering Hindi, Punjabi, Kannada, Korean, and more.",
  path: "/locations",
});

const LocationsIndexPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo {...seo} />
      <Header />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Our Locations Across India</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Certified translation and interpretation services available in the following cities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city) => (
              <Link key={city.slug} to={`/locations/${city.slug}`}>
                <Card className="h-full hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">{city.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{city.state}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LocationsIndexPage;
