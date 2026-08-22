import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";
import type { ServiceCategory } from "./serviceCategories";
import { hashString, type FaqItem } from "./pageTemplates";
import { faqPool } from "./faqPool";

const MAX_FAQS = 8;

/** Deterministic hash-based selection of eligible FAQs, so different pages surface a
 *  different subset/order rather than every page showing the same block. */
export function selectFaqs(ctx: {
  city?: City;
  language: Language;
  service: ServiceMeta;
  docCategories: ServiceCategory[];
}): FaqItem[] {
  const { city, language, service, docCategories } = ctx;
  const categorySlugs = docCategories.map((category) => category.slug);

  // A FAQ tagged with BOTH service and documentCategory must match both (e.g. a
  // "translate business documents" question shouldn't surface on an interpreter page just
  // because the page's document focus includes business-documents). A FAQ tagged with only
  // one of the two needs just that one to match. `always` short-circuits everything.
  const eligible = faqPool.filter((faq) => {
    if (faq.appliesTo.always) return true;
    const serviceOk = !faq.appliesTo.service || faq.appliesTo.service.includes(service.slug);
    const categoryOk = !faq.appliesTo.documentCategory || faq.appliesTo.documentCategory.some((slug) => categorySlugs.includes(slug));
    if (!faq.appliesTo.service && !faq.appliesTo.documentCategory) return false;
    return serviceOk && categoryOk;
  });

  const key = `${city?.slug ?? "hub"}/${language.slug}/${service.slug}`;
  return eligible
    .map((faq) => ({ faq, order: hashString(`${key}:${faq.id}`) }))
    .sort((a, b) => a.order - b.order)
    .slice(0, MAX_FAQS)
    .map(({ faq }) => ({ question: faq.question, answer: faq.answer }));
}
