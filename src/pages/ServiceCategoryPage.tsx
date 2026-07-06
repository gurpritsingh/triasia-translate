import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import NotFound from "./NotFound";
import { serviceCategoriesBySlug } from "@/content/serviceCategories";
import { languages } from "@/content/languages";
import { buildStaticSeo } from "@/content/seo";

const ServiceCategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = categorySlug ? serviceCategoriesBySlug[categorySlug] : undefined;

  if (!category) return <NotFound />;

  const seo = buildStaticSeo({
    title: `${category.title} Services | TriasiaGlobal`,
    description: category.subHeading,
    path: `/services/${category.slug}`,
  });

  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-background">
      <Seo {...seo} />
      <Header />
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className={`w-16 h-16 rounded-lg ${category.bgColor} flex items-center justify-center mx-auto mb-6`}>
              <Icon className={`h-8 w-8 ${category.color}`} />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{category.heading}</h1>
            <p className="text-xl text-muted-foreground">{category.subHeading}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">What We Translate</h2>
              <ul className="space-y-3">
                {category.details.map((detail) => (
                  <li key={detail} className="flex items-start space-x-2 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Available Languages</h2>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((language) => (
                  <Link
                    key={language.slug}
                    to={`/${language.slug}/translator`}
                    className="text-primary hover:underline"
                  >
                    {language.name} Translator
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServiceCategoryPage;
