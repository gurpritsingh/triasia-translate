import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import NotFound from "./NotFound";
import { citiesBySlug } from "@/content/cities";
import { languages } from "@/content/languages";
import { services } from "@/content/services";
import { buildStaticSeo } from "@/content/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CityIndexPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citySlug ? citiesBySlug[citySlug] : undefined;

  if (!city) return <NotFound />;

  const availableLanguages = languages.filter(
    (language) => !city.languages || city.languages.includes(language.slug)
  );

  const seo = buildStaticSeo({
    title: `Translator & Interpreter Services in ${city.name} | TriasiaGlobal`,
    description: `Certified translation and interpretation services in ${city.name}, ${city.state} across ${availableLanguages.length} languages, including ${availableLanguages
      .slice(0, 3)
      .map((language) => language.name)
      .join(", ")}.`,
    path: `/locations/${city.slug}`,
  });

  return (
    <div className="min-h-screen bg-background">
      <Seo {...seo} />
      <Header />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Translation &amp; Interpretation Services in {city.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Serving {city.name}, {city.state}, across {availableLanguages.length} languages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableLanguages.map((language) => (
              <Card key={language.slug}>
                <CardHeader>
                  <CardTitle>{language.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/${city.slug}/${language.slug}/${service.slug}`}
                      className="block text-primary hover:underline"
                    >
                      {language.name} {service.label} in {city.name}
                    </Link>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CityIndexPage;
