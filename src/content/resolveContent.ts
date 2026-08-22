import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";
import { defaultCityContent, type PageContent } from "./pageTemplates";
import { buildDefaultTranslatorContent } from "./defaultTranslatorContent";

type CityTemplateFn = (ctx: { city: City; language: Language; service: ServiceMeta }) => PageContent;

interface CityTemplateModule {
  translator?: CityTemplateFn;
  interpreter?: CityTemplateFn;
}

// Auto-discovers content files by folder convention — adding a new override or
// per-language template is just dropping a file in the right place, no registry to edit.
const overrideModules = import.meta.glob("/src/content/overrides/*/*/*.ts", { eager: true }) as Record<
  string,
  { default: PageContent }
>;
const overridesRegistry: Record<string, PageContent> = {};
for (const path in overrideModules) {
  const match = path.match(/overrides\/([^/]+)\/([^/]+)\/([^/]+)\.ts$/);
  if (!match) continue;
  const [, citySlug, languageSlug, serviceSlug] = match;
  overridesRegistry[`${citySlug}/${languageSlug}/${serviceSlug}`] = overrideModules[path].default;
}

const cityTemplateModules = import.meta.glob("/src/data/*/cityTemplate.ts", { eager: true }) as Record<
  string,
  { default: CityTemplateModule }
>;
const cityTemplatesRegistry: Record<string, CityTemplateModule> = {};
for (const path in cityTemplateModules) {
  const match = path.match(/\/src\/data\/([^/]+)\/cityTemplate\.ts$/);
  if (!match) continue;
  const [, languageDir] = match;
  cityTemplatesRegistry[languageDir.toLowerCase()] = cityTemplateModules[path].default;
}

const hubModules = {
  ...import.meta.glob("/src/data/*/translator.ts", { eager: true }),
  ...import.meta.glob("/src/data/*/interpreter.ts", { eager: true }),
} as Record<string, { default: PageContent }>;
const hubRegistry: Record<string, PageContent> = {};
for (const path in hubModules) {
  const match = path.match(/\/src\/data\/([^/]+)\/(translator|interpreter)\.ts$/);
  if (!match) continue;
  const [, languageDir, serviceSlug] = match;
  hubRegistry[`${languageDir.toLowerCase()}/${serviceSlug}`] = hubModules[path].default;
}

// Translator pages get the rich, variation-aware generator; every other service
// (interpreter) keeps the original lightweight default untouched.
function fallbackContent(ctx: { city?: City; language: Language; service: ServiceMeta }): PageContent {
  return ctx.service.slug === "translator" ? buildDefaultTranslatorContent(ctx) : defaultCityContent(ctx);
}

/**
 * Resolution order for city pages: exact override > language-level city template > global default template.
 * National hub pages (no city) use the existing per-language src/data files.
 */
export function resolveContent({
  city,
  language,
  service,
}: {
  city?: City;
  language: Language;
  service: ServiceMeta;
}): PageContent {
  if (!city) {
    return hubRegistry[`${language.slug}/${service.slug}`] ?? fallbackContent({ language, service });
  }

  const override = overridesRegistry[`${city.slug}/${language.slug}/${service.slug}`];
  if (override) return override;

  const template = cityTemplatesRegistry[language.slug]?.[service.slug];
  if (template) return template({ city, language, service });

  return fallbackContent({ city, language, service });
}
