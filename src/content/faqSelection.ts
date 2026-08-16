import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";
import type { ServiceCategory } from "./serviceCategories";
import { hashString, type FaqItem } from "./pageTemplates";
import { faqPool } from "./faqPool";

const MAX_FAQS = 5;

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

  const eligible = faqPool.filter(
    (faq) =>
      faq.appliesTo.always ||
      faq.appliesTo.service?.includes(service.slug) ||
      faq.appliesTo.documentCategory?.some((slug) => categorySlugs.includes(slug))
  );

  const key = `${city?.slug ?? "hub"}/${language.slug}/${service.slug}`;
  return eligible
    .map((faq) => ({ faq, order: hashString(`${key}:${faq.id}`) }))
    .sort((a, b) => a.order - b.order)
    .slice(0, MAX_FAQS)
    .map(({ faq }) => ({ question: faq.question, answer: faq.answer }));
}
