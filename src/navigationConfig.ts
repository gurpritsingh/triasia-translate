import { languages } from "@/content/languages";
import { services } from "@/content/services";

export interface NavItem {
  name: string;
  path?: string;
  children?: NavItem[];
}

const languageRoutes: NavItem[] = languages.map((language) => ({
  name: language.name,
  children: services.map((service) => ({
    name: service.label,
    path: `/${language.slug}/${service.slug}`,
  })),
}));

export const navigationConfig: NavItem[] = [
  { name: "Services", path: "/#services" },
  {
    name: "Languages",
    path: "/#languages",
    children: languageRoutes,
  },
  { name: "Why Choose Us", path: "/#why-us" },
  { name: "Locations", path: "/locations" },
];
