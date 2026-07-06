import type { City } from "@/content/cities";
import type { Language } from "@/content/languages";
import type { ServiceMeta } from "@/content/services";
import type { PageContent } from "@/content/pageTemplates";

interface Ctx {
  city: City;
  language: Language;
  service: ServiceMeta;
}

const translator = ({ city, language, service }: Ctx): PageContent => ({
  heading: `${language.name} ${service.label} in ${city.name} — Business & Legal Specialists`,
  subHeading: `Triasia Global's ${language.name} translators in ${city.name} specialize in business contracts, technical manuals, and legal documents for companies expanding between Korea and ${city.state}. Certified, accurate, and fast.`,
});

const interpreter = ({ city, language, service }: Ctx): PageContent => ({
  heading: `${language.name} ${service.label} for Meetings & Conferences in ${city.name}`,
  subHeading: `Our ${language.name} interpreters support corporate meetings, factory visits, and conferences in ${city.name}, ${city.state}, ensuring smooth communication for Korean-Indian business collaborations.`,
});

export default { translator, interpreter };
