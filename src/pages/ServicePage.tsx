import { useParams } from "react-router-dom";
import TranslatorTemplate from "@/components/TranslatorTemplate/TranslatorTemplate";
import Seo from "@/components/Seo";
import NotFound from "./NotFound";
import { languagesBySlug } from "@/content/languages";
import { citiesBySlug } from "@/content/cities";
import { servicesBySlug, isServiceSlug } from "@/content/services";
import { resolveContent } from "@/content/resolveContent";
import { buildServiceSeo } from "@/content/seo";

// Renders both the national hub route (/:languageSlug/:serviceSlug) and the
// city route (/:citySlug/:languageSlug/:serviceSlug) — citySlug is simply
// undefined when matched via the hub route.
const ServicePage = () => {
  const { citySlug, languageSlug, serviceSlug } = useParams<{
    citySlug?: string;
    languageSlug: string;
    serviceSlug: string;
  }>();

  const language = languageSlug ? languagesBySlug[languageSlug] : undefined;
  const service = serviceSlug && isServiceSlug(serviceSlug) ? servicesBySlug[serviceSlug] : undefined;
  const city = citySlug ? citiesBySlug[citySlug] : undefined;

  const cityAllowsLanguage = !city?.languages || (language ? city.languages.includes(language.slug) : false);

  if (!language || !service || (citySlug && !city) || !cityAllowsLanguage) {
    return <NotFound />;
  }

  const content = resolveContent({ city, language, service });
  const path = city ? `/${city.slug}/${language.slug}/${service.slug}` : `/${language.slug}/${service.slug}`;
  const seo = buildServiceSeo({ city, language, service, content, path });

  return (
    <>
      <Seo {...seo} />
      <TranslatorTemplate data={content} />
    </>
  );
};

export default ServicePage;
