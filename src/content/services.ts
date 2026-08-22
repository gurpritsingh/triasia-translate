export type ServiceSlug = "translator" | "interpreter" | "translation";

export interface ServiceMeta {
  slug: ServiceSlug;
  label: string;
  noun: string;
}

export const services: ServiceMeta[] = [
  { slug: "translator", label: "Translator", noun: "translation" },
  { slug: "interpreter", label: "Interpreter", noun: "interpretation" },
  { slug: "translation", label: "Document Translation", noun: "paperwork translation" },
];

export const servicesBySlug: Record<ServiceSlug, ServiceMeta> = {
  translator: services[0],
  interpreter: services[1],
  translation: services[2],
};

export function isServiceSlug(value: string): value is ServiceSlug {
  return value === "translator" || value === "interpreter" || value === "translation";
}
