import type { City } from "@/content/cities";
import type { Language } from "@/content/languages";
import type { ServiceMeta } from "@/content/services";
import type { PageContent } from "@/content/pageTemplates";

interface Ctx {
  city: City;
  language: Language;
  service: ServiceMeta;
}

const interpreter = ({ city, language, service }: Ctx): PageContent => ({
  heading: `${language.name} ${service.label} for Meetings & Conferences in ${city.name}`,
  subHeading: `Our ${language.name} interpreters support corporate meetings, factory visits, and conferences in ${city.name}, ${city.state}, ensuring smooth communication for Korean-Indian business collaborations.`,
});

export default { interpreter };
