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

// GitHub Pages serves directory pages at the trailing-slash URL (301 from the
// bare form), so canonicals must use the trailing-slash form to match.
function withTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
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
      hasCredential: business.certifications.map((cert) => ({
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: `${cert.standard} — ${cert.name}`,
        recognizedBy: { "@type": "Organization", name: business.certifyingBody },
      })),
    },
  };

  return { title, description, canonicalPath: withTrailingSlash(path), jsonLd };
}

export function buildStaticSeo({
  title,
  description,
  path,
  jsonLd,
}: {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>;
}): SeoData {
  return { title, description, canonicalPath: withTrailingSlash(path), jsonLd };
}
