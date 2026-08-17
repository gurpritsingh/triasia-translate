import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";
import {
  buildEnrichedContent,
  buildLocalRelevance,
  buildPageFacts,
  buildTranslationContent,
  buildTranslationFacts,
  defaultCityContent,
  type PageContent,
} from "./pageTemplates";
import { selectFaqs } from "./faqSelection";
import { buildPageSections } from "./sections";

// Phase 5: the content-differentiation fix now applies to every city page (translator and
// interpreter — the "translation" service stays separately gated in routes.ts, Phase 6's
// concern). Phases 0-3 validated this in stages: a 2x2 pilot, then a 108-page stratified
// cohort covering all three pair archetypes (state-native, foreign-corridor, interstate)
// with zero unexpected regressions. Every city and language now has complete, validated data
// (src/content/cities.ts, languages.ts, states.ts all pass their required-field validators),
// so there is no thin-data case left for this gate to protect against.
function isPilotCombo(city: City | undefined, _language: Language): boolean {
  return Boolean(city);
}

type CityTemplateFn = (ctx: { city: City; language: Language; service: ServiceMeta }) => PageContent;

interface CityTemplateModule {
  translator?: CityTemplateFn;
  interpreter?: CityTemplateFn;
  translation?: CityTemplateFn;
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
  ...import.meta.glob("/src/data/*/translation.ts", { eager: true }),
} as Record<string, { default: PageContent }>;
const hubRegistry: Record<string, PageContent> = {};
for (const path in hubModules) {
  const match = path.match(/\/src\/data\/([^/]+)\/(translator|interpreter|translation)\.ts$/);
  if (!match) continue;
  const [, languageDir, serviceSlug] = match;
  hubRegistry[`${languageDir.toLowerCase()}/${serviceSlug}`] = hubModules[path].default;
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
  const isTranslation = service.slug === "translation";

  if (!city) {
    return (
      hubRegistry[`${language.slug}/${service.slug}`] ??
      (isTranslation ? buildTranslationContent({ language, service }) : defaultCityContent({ language, service }))
    );
  }

  const override = overridesRegistry[`${city.slug}/${language.slug}/${service.slug}`];
  const template = cityTemplatesRegistry[language.slug]?.[service.slug];
  const pilot = isPilotCombo(city, language);

  const base: PageContent =
    override ??
    (template ? template({ city, language, service }) : undefined) ??
    (isTranslation
      ? buildTranslationContent({ city, language, service })
      : pilot
        ? buildEnrichedContent({ city, language, service })
        : defaultCityContent({ city, language, service }));

  if (!pilot) return base;

  const facts = isTranslation ? buildTranslationFacts({ city, language, service }) : buildPageFacts({ city, language, service });
  const sections = buildPageSections({ city, language, service, facts });
  return {
    ...base,
    localRelevance: base.localRelevance ?? buildLocalRelevance({ city, language, service, facts }),
    faqs: base.faqs ?? selectFaqs({ city, language, service, docCategories: facts.docCategories }),
    documentsSection: base.documentsSection ?? sections.documentsSection,
    acceptanceSection: base.acceptanceSection ?? sections.acceptanceSection,
    processSteps: base.processSteps ?? sections.processSteps,
    languageNotesSection: base.languageNotesSection ?? sections.languageNotesSection,
    deliverablesSection: base.deliverablesSection ?? sections.deliverablesSection,
    relatedLinks: base.relatedLinks ?? sections.relatedLinks,
  };
}
