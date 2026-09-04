import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";
import type { FaqItem, PageContent } from "./pageTemplates";
import type { ServiceCategory } from "./serviceCategories";
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

// Shared by every Service schema on the site — one description of the business,
// so a change in business.ts can't leave half the pages describing an older one.
const providerSchema = {
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
};

function faqSchema(faq?: FaqItem[]) {
  if (!faq || faq.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
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
  const title =
    content.seoTitle ??
    (city
      ? `${language.name} ${service.label} in ${city.name} | ${business.name}`
      : `${language.name} ${service.label} Services in India | ${business.name}`);

  const description = truncate(content.subHeading, 160);

  const areaServed = city
    ? { "@type": "City", name: city.name, containedInPlace: { "@type": "State", name: city.state } }
    : { "@type": "Country", name: "India" };

  const serviceSchema = {
    "@type": "Service",
    name: content.heading,
    description,
    areaServed,
    provider: providerSchema,
  };

  const faq = faqSchema(content.faq);

  const jsonLd = faq
    ? { "@context": "https://schema.org", "@graph": [serviceSchema, faq] }
    : { "@context": "https://schema.org", ...serviceSchema };

  return { title, description, canonicalPath: withTrailingSlash(path), jsonLd };
}

// Breadcrumb trails are rendered visually on every service page; emitting the
// matching BreadcrumbList lets Google show the trail in place of the raw URL.
export function breadcrumbSchema(crumbs: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${business.siteUrl}${crumb.path}`,
    })),
  };
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

export function buildCategorySeo(category: ServiceCategory): SeoData {
  const description = truncate(category.metaDescription ?? category.subHeading, 160);

  const serviceSchema = {
    "@type": "Service",
    name: category.heading,
    serviceType: category.title,
    description,
    areaServed: { "@type": "Country", name: "India" },
    provider: providerSchema,
  };

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: category.title, path: `/services/${category.slug}/` },
  ]);

  const faq = faqSchema(category.faq);
  const graph = faq ? [serviceSchema, breadcrumbs, faq] : [serviceSchema, breadcrumbs];

  return {
    title: category.seoTitle ?? `${category.title} Services | ${business.name}`,
    description,
    canonicalPath: withTrailingSlash(`/services/${category.slug}/`),
    jsonLd: { "@context": "https://schema.org", "@graph": graph },
  };
}
