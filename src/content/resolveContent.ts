import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";
import type { PageContent } from "./pageTemplates";
import { buildDefaultTranslatorContent } from "./defaultTranslatorContent";
import { buildDefaultInterpreterContent } from "./defaultInterpreterContent";

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

// Both services get a rich, variation-aware generator of their own. They share no
// sentence pools: interpretation is booked, staffed and judged differently from
// translation, so copy that merely swapped the words would have produced hundreds
// of pages restating the translator pages in different clothes.
function fallbackContent(ctx: { city?: City; language: Language; service: ServiceMeta }): PageContent {
  return ctx.service.slug === "translator" ? buildDefaultTranslatorContent(ctx) : buildDefaultInterpreterContent(ctx);
}

/**
 * Hand-written files supply the fields they define and inherit the rest from the
 * generated default. They used to REPLACE it wholesale, which meant a file
 * setting only a custom heading silently discarded every generated section, the
 * language pairs and the FAQ — /mumbai/hindi/translator/ was 157 words where the
 * untouched default gave 879. Overriding a headline should not cost a page its body.
 */
function withGeneratedDefaults(
  authored: Partial<PageContent>,
  ctx: { city?: City; language: Language; service: ServiceMeta }
): PageContent {
  const defined = Object.fromEntries(Object.entries(authored).filter(([, value]) => value !== undefined));
  return { ...fallbackContent(ctx), ...defined } as PageContent;
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
    const hub = hubRegistry[`${language.slug}/${service.slug}`];
    return hub ? withGeneratedDefaults(hub, { language, service }) : fallbackContent({ language, service });
  }

  const override = overridesRegistry[`${city.slug}/${language.slug}/${service.slug}`];
  if (override) return withGeneratedDefaults(override, { city, language, service });

  const template = cityTemplatesRegistry[language.slug]?.[service.slug];
  if (template) return withGeneratedDefaults(template({ city, language, service }), { city, language, service });

  return fallbackContent({ city, language, service });
}
