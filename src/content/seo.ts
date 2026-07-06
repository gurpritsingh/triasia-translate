import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";
import type { PageContent } from "./pageTemplates";
import { business } from "./business";

export interface SeoData {
  title: string;
  description: string;
  canonicalPath: string;
  jsonLd?: Record<string, unknown>;
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export function buildServiceSeo({
  city,
  language,
  service,
  content,
  path,
}: {
  city?: City;
  language: Language;
  service: ServiceMeta;
  content: PageContent;
  path: string;
}): SeoData {
  const title = city
    ? `${language.name} ${service.label} in ${city.name} | ${business.name}`
    : `${language.name} ${service.label} Services in India | ${business.name}`;

  const description = truncate(content.subHeading, 160);

  const areaServed = city
    ? { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: city.state } }
    : { "@type": "Country", name: "India" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.heading,
    description,
    areaServed,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: business.phone,
      email: business.email,
      address: { "@type": "PostalAddress", ...business.address },
    },
  };

  return { title, description, canonicalPath: path, jsonLd };
}

export function buildStaticSeo({ title, description, path }: { title: string; description: string; path: string }): SeoData {
  return { title, description, canonicalPath: path };
}
