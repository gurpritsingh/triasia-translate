export type ServiceSlug = "translator" | "interpreter";

export interface ServiceMeta {
  slug: ServiceSlug;
  label: string;
  noun: string;
}

export const services: ServiceMeta[] = [
  { slug: "translator", label: "Translator", noun: "translation" },
  { slug: "interpreter", label: "Interpreter", noun: "interpretation" },
];

export const servicesBySlug: Record<ServiceSlug, ServiceMeta> = {
  translator: services[0],
  interpreter: services[1],
};

export function isServiceSlug(value: string): value is ServiceSlug {
  return value === "translator" || value === "interpreter";
}
