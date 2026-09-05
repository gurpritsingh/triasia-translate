import type { City } from "./cities";
import type { Language } from "./languages";
import type { FaqItem } from "./pageTemplates";
import { pickVariant, pickOrder } from "./contentVariants";
import { fitTitle } from "./seo";

/**
 * Copy for /locations/:city/ — 56 pages that were 62 median words with no
 * structured data, the thinnest set on the site.
 *
 * Honesty rule (same as the city × language generators): only real data is
 * interpolated — city name, state, and the languages the city actually offers.
 * No invented branch offices, addresses, landmarks or client names. The company
 * has one office, in New Delhi, so `tier` below decides what a page may claim:
 * NCR cities can invite someone to walk in, the rest describe how remote
 * service actually works. Saying "our Chennai office" would rank fine and be a lie.
 */

export type PresenceTier = "ncr" | "strong" | "national";

const NCR = new Set(["delhi", "gurgaon", "gurugram", "noida", "greater-noida", "faridabad", "ghaziabad", "manesar"]);
const STRONG_CITIES = new Set(["mumbai", "bangalore"]);
const STRONG_STATES = new Set(["Punjab", "Gujarat"]);

export function presenceTier(city: City): PresenceTier {
  if (NCR.has(city.slug)) return "ncr";
  if (STRONG_CITIES.has(city.slug) || STRONG_STATES.has(city.state)) return "strong";
  return "national";
}

export interface CityLandingContent {
  seoTitle: string;
  metaDescription: string;
  heading: string;
  subHeading: string;
  intro: string[];
  documentsIntro: string;
  workingHeading: string;
  workingIntro: string;
  workingItems: Array<{ heading: string; body: string }>;
  languagesIntro: string;
  faq: FaqItem[];
}

interface Ctx {
  city: City;
  languages: Language[];
  tier: PresenceTier;
}

type V = (ctx: Ctx) => string;

function languageList(ctx: Ctx, count = 4): string {
  const names = ctx.languages.slice(0, count).map((l) => l.name);
  if (names.length === 0) return "every language we cover";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

const headingVariants: V[] = [
  ({ city }) => `Translation and Interpretation Services in ${city.name}`,
  ({ city }) => `Certified Translation Services in ${city.name}, ${city.state}`,
  ({ city }) => `Translators and Interpreters for ${city.name}`,
];

const seoTitleVariants: V[] = [
  ({ city }) => `Translation Services in ${city.name} | Certified Translators | TriasiaGlobal`,
  ({ city }) => `Certified Translator & Interpreter in ${city.name} | TriasiaGlobal`,
  ({ city }) => `Translation & Interpretation in ${city.name}, ${city.state} | TriasiaGlobal`,
];

const leadVariants: V[] = [
  (ctx) =>
    `Certified document translation and professional interpreters for clients in ${ctx.city.name}, ${ctx.city.state} — covering ${ctx.languages.length} languages including ${languageList(ctx, 3)}, with certification that courts, embassies and government offices accept.`,
  (ctx) =>
    `Certified translation, interpretation and attestation for ${ctx.city.name} — ${ctx.languages.length} languages, ${languageList(ctx, 3)} among them, each translation issued with a signed certificate of accuracy.`,
  (ctx) =>
    `We handle certified translation and on-site interpreting for individuals and businesses in ${ctx.city.name}, ${ctx.city.state}, across ${ctx.languages.length} languages — from single certificates to full corporate document sets.`,
];

// Tier decides what the page is allowed to claim about physical presence.
const introFirstByTier: Record<PresenceTier, V[]> = {
  ncr: [
    (ctx) =>
      `${ctx.city.name} is on our doorstep. Our office is in Tagore Garden, New Delhi, so documents can be dropped in and collected in person, interpreters reach ${ctx.city.name} at short notice, and attestation runs through the same MEA and embassy channels we use every week.`,
    (ctx) =>
      `We work in ${ctx.city.name} constantly. The office is in Tagore Garden, New Delhi — close enough that you can hand documents over in person if you prefer, and close enough for an interpreter to be with you the same day when a meeting moves up.`,
    (ctx) =>
      `Being based in Tagore Garden, New Delhi puts ${ctx.city.name} within easy reach: in-person drop-off if you want it, interpreters on site at short notice, and MEA attestation handled through the offices we deal with routinely.`,
  ],
  strong: [
    (ctx) =>
      `${ctx.city.name} is one of the places we work in most. Translation itself runs remotely — clear scans reach us faster than any courier — while interpreters travel to ${ctx.city.name} for meetings, audits and site visits, and certified hard copies come to you by courier.`,
    (ctx) =>
      `We have a strong client base in ${ctx.city.name}. Documents are handled digitally, which is what makes a 24–48 hour turnaround possible; certified physical sets are couriered, and interpreters travel in for anything that has to happen in the room.`,
    (ctx) =>
      `${ctx.city.name} accounts for a steady share of our work. Scans in, certified copies couriered back, and interpreters on the ground for meetings and inspections — the only part that has to be physical is the part that genuinely is.`,
  ],
  national: [
    (ctx) =>
      `Being in ${ctx.city.name} changes very little about how this works. Documents are sent as scans and returned certified — by email immediately, and by courier where you need the stamped hard copy — so the turnaround is the same as it would be for a client sitting in Delhi.`,
    (ctx) =>
      `We serve ${ctx.city.name} from our New Delhi office, and for document work that makes no practical difference: send clear scans, get certified translations back the same way, with physical sets couriered when the receiving office insists on paper.`,
    (ctx) =>
      `Distance stopped mattering for translation some time ago. Clients in ${ctx.city.name} send scans, receive certified translations by email, and get stamped hard copies by courier — and interpreters travel to ${ctx.city.name} when a session needs someone present.`,
  ],
};

const introSecondVariants: V[] = [
  (ctx) =>
    `Every translation is issued with a signed certificate of accuracy on our letterhead, and we arrange notarisation, MEA/Apostille attestation and embassy legalisation where the receiving authority in ${ctx.city.state} or abroad asks for it. ISO 9001:2015 and ISO 17100:2015 certified.`,
  (ctx) =>
    `Translations leave with a signed certificate of accuracy, and where an office wants more than that we handle notarisation, MEA/Apostille attestation and embassy legalisation as part of the same job. ISO 9001:2015 and ISO 17100:2015 certified.`,
  (ctx) =>
    `ISO 9001:2015 and ISO 17100:2015 certified, with a signed certificate of accuracy on every translation and attestation — notarisation, MEA/Apostille, embassy legalisation — arranged in the same job rather than left to you.`,
];

const documentsIntroVariants: V[] = [
  (ctx) =>
    `The document types clients in ${ctx.city.name} bring us most often. Each one is translated and certified for the office it is actually going to, whether that is a court, a university, an insurer or an embassy.`,
  (ctx) =>
    `Whatever the paperwork, it is translated for a specific destination — a registrar, an admissions office, a hospital or a consulate — because that is what determines how it has to be certified.`,
  (ctx) =>
    `These are the categories we handle for ${ctx.city.name} clients, each prepared for the authority receiving it rather than as a generic translation.`,
];

const workingIntroVariants: V[] = [
  (ctx) => `What working with us from ${ctx.city.name} actually involves, start to finish.`,
  (ctx) => `The practical side — how documents, people and deadlines move between you and us in ${ctx.city.name}.`,
  (ctx) => `How a job runs for a client in ${ctx.city.name}, from first message to certified delivery.`,
];

const languagesIntroVariants: V[] = [
  (ctx) =>
    `${ctx.languages.length} languages are available in ${ctx.city.name} for both translation and interpretation. Pick a language to see what we cover.`,
  (ctx) =>
    `Translation and interpreting in ${ctx.city.name} across ${ctx.languages.length} languages — choose one below for the detail.`,
  (ctx) =>
    `Each of these ${ctx.languages.length} languages is available in ${ctx.city.name} as both certified translation and live interpreting.`,
];

interface ItemDef {
  id: string;
  heading: string;
  bodyVariants: string[];
}

function workingItemDefs(ctx: Ctx): ItemDef[] {
  const { city } = ctx;
  const dropOff: ItemDef =
    ctx.tier === "ncr"
      ? {
          id: "send",
          heading: "Send a scan, or bring the originals",
          bodyVariants: [
            `WhatsApp or email a scan and we can quote straight away. If you would rather hand the documents over, the office is in Tagore Garden, New Delhi and originals can be dropped off and collected.`,
            `A phone photo is usually enough to quote from. Being in ${city.name}, you also have the option of bringing originals to our Tagore Garden office instead of couriering them.`,
            `Send a scan by WhatsApp or email for a quote, or drop the originals at our Tagore Garden office — from ${city.name} that is often simpler than arranging a courier.`,
          ],
        }
      : {
          id: "send",
          heading: "Send a scan from wherever you are",
          bodyVariants: [
            `WhatsApp or email a clear scan or photo — the whole page, including stamps and anything on the reverse. We quote on what we see, with a delivery date, before starting.`,
            `A readable phone photo is enough to begin. Send the full page, both sides where there is printing, and you get a quote and a firm date back before any work happens.`,
            `Scans go by WhatsApp or email. We come back with a fixed quote and delivery date, so nothing about being in ${city.name} slows down the first step.`,
          ],
        };

  const delivery: ItemDef = {
    id: "delivery",
    heading: ctx.tier === "ncr" ? "Collect, or have it couriered" : `Certified copies couriered to ${city.name}`,
    bodyVariants:
      ctx.tier === "ncr"
        ? [
            `The certified translation is emailed as soon as it is ready. Stamped hard copies can be collected from the office or couriered to you in ${city.name}, usually the next working day.`,
            `Soft copy by email the moment it is done; the signed and stamped set is either collected in person or couriered across to ${city.name}.`,
            `You get the PDF immediately and the physical certified set either over the counter or by courier — whichever suits the deadline you are working to.`,
          ]
        : [
            `The certified translation is emailed as soon as it is ready, which is all most offices need. Where a stamped physical set is required, it is couriered to ${city.name} — add a day or two for transit.`,
            `Soft copies land by email the same day the work finishes. Hard copies with the signature and stamp are couriered to your address in ${city.name} when the receiving office insists on paper.`,
            `Delivery is by email first — that is what most authorities accept — with the stamped hard copy couriered to ${city.name} if you need it in hand.`,
          ],
  };

  const interpreters: ItemDef = {
    id: "interpreters",
    heading: `Interpreters on site in ${city.name}`,
    bodyVariants:
      ctx.tier === "ncr"
        ? [
            `For meetings, audits, hearings and appointments in ${city.name}, an interpreter comes to you. Being local means short-notice bookings are usually workable, though more notice always buys a better subject match.`,
            `Interpreters reach ${city.name} easily, so same-week and sometimes same-day bookings are possible. Tell us the subject and format and we assign accordingly.`,
            `On-site interpreting in ${city.name} is straightforward from here — for negotiations, factory visits, hearings or medical appointments, with remote sessions available for shorter calls.`,
          ]
        : [
            `For meetings, audits, exhibitions and appointments in ${city.name}, interpreters travel to you — worth booking early, since travel and accommodation form part of the arrangement.`,
            `Interpreters travel to ${city.name} for on-site work. Give us as much notice as you can: it widens the pool and keeps travel costs sensible.`,
            `On-site interpreting in ${city.name} is arranged with travel included; short calls and check-ins can be handled remotely by video instead.`,
          ],
  };

  const attestation: ItemDef = {
    id: "attestation",
    heading: "Attestation handled in one go",
    bodyVariants: [
      `MEA/Apostille attestation and embassy legalisation run through Delhi regardless of where you are, so we handle that step centrally rather than sending you to chase it from ${city.name}.`,
      `Apostille and embassy legalisation happen in Delhi for the whole country. We manage that stage for you, which is usually the part that costs ${city.name} clients the most time otherwise.`,
      `Because MEA attestation is centralised in Delhi, we take that on directly — a practical advantage of working with a Delhi-based agency from ${city.name}.`,
    ],
  };

  return [dropOff, delivery, interpreters, attestation];
}

export function buildCityLandingContent(city: City, availableLanguages: Language[]): CityLandingContent {
  const tier = presenceTier(city);
  const ctx: Ctx = { city, languages: availableLanguages, tier };
  const seed = `/locations/${city.slug}/`;

  const workingItems = pickOrder(seed, "working-order", workingItemDefs(ctx)).map((def) => ({
    heading: def.heading,
    body: pickVariant(seed, `working-${def.id}`, def.bodyVariants),
  }));

  const officeAnswer: Record<PresenceTier, string> = {
    ncr: `Our office is at Tagore Garden, New Delhi, which serves the whole NCR including ${city.name}. You are welcome to bring documents in person, though most clients simply send a scan and have the certified copies couriered.`,
    strong: `We work with ${city.name} clients from our New Delhi office rather than a branch in the city. In practice it changes nothing: documents are handled digitally, certified hard copies are couriered, and interpreters travel to ${city.name} for on-site work.`,
    national: `Our office is in New Delhi and we serve ${city.name} from there. Translation is handled digitally end to end, certified hard copies are couriered, and interpreters travel to ${city.name} when a session needs someone in the room.`,
  };

  const faq: FaqItem[] = [
    {
      question: `Do you have an office in ${city.name}?`,
      answer: officeAnswer[tier],
    },
    {
      question: `How do I send my documents from ${city.name}?`,
      answer: pickVariant(seed, "faq-send", [
        `WhatsApp or email a clear scan or photo of the full page, including any stamps and anything printed on the reverse. That is enough for us to quote and to translate — originals are only needed when attestation is involved, and we will tell you if that applies before you post anything.`,
        `A readable phone photo sent over WhatsApp or email is all it takes. Originals stay with you unless the job includes attestation, in which case we will say so upfront rather than after you have couriered them.`,
        `Send scans by WhatsApp or email — whole page, both sides where there is printing. We only ask for originals when MEA or embassy attestation requires them, and never before confirming that with you.`,
      ]),
    },
    {
      question: `How long does a certified translation take in ${city.name}?`,
      answer: pickVariant(seed, "faq-time", [
        `Standard documents — certificates, licences, short affidavits — are normally back within 24–48 hours by email, and the date is fixed when we quote. If you need the stamped hard copy in ${city.name}, allow a day or two more for the courier. Attestation runs on government timelines and is quoted separately.`,
        `Most single-page certificates are ready in 24–48 hours, delivered by email with a firm date agreed at quote stage. Physical certified copies add courier time to ${city.name}; apostille and legalisation are quoted as their own timeline.`,
        `Expect 24–48 hours for standard documents, longer for contracts and multi-document sets. Email delivery is immediate on completion; a couriered hard copy to ${city.name} takes a day or two more, and attestation depends on government schedules rather than ours.`,
      ]),
    },
    {
      question: `Can I book an interpreter in ${city.name}?`,
      answer: pickVariant(seed, "faq-interpreter", [
        tier === "ncr"
          ? `Yes — interpreters cover ${city.name} for business meetings, factory visits, legal proceedings and medical appointments, often at short notice. Tell us the language, the setting and how long the session runs, and we assign someone who has worked in that setting before.`
          : `Yes. Interpreters travel to ${city.name} for meetings, audits, exhibitions and official appointments, and remote video interpreting is available for shorter sessions. Give as much notice as you can — it improves the subject match and keeps travel costs down.`,
        tier === "ncr"
          ? `Yes. On-site interpreting in ${city.name} is straightforward for us, whether that is a negotiation, an audit, a hearing or a hospital appointment. Same-week bookings are usually possible; more notice means a better subject match.`
          : `Yes — for on-site work an interpreter travels to ${city.name}, with travel arranged as part of the booking. Short calls and check-ins can run remotely by video instead, which is faster to set up.`,
      ]),
    },
    {
      question: `Will your translations be accepted by offices in ${city.state}?`,
      answer: pickVariant(seed, "faq-accept", [
        `Every translation carries a signed and stamped certificate of accuracy on our letterhead, which is the form courts, registrars, universities, embassies and government departments ask for across India. Where an office additionally requires notarisation or MEA attestation, tell us at the start and it is handled in the same job.`,
        `Yes — our certification is the standard signed statement of accuracy on letterhead that authorities across ${city.state} and the rest of India work with. If the specific office has asked for notarisation or apostille as well, say so upfront and we will include it.`,
        `Translations go out certified in the form Indian authorities expect: a signed, stamped statement of completeness and accuracy on letterhead. Notarisation and MEA/Apostille attestation are added whenever the receiving office in ${city.state} or abroad requires them.`,
      ]),
    },
  ];

  return {
    seoTitle: fitTitle([
      pickVariant(seed, "seo-title", seoTitleVariants)(ctx),
      `Translation Services in ${city.name} | TriasiaGlobal`,
      `Certified Translators in ${city.name}`,
      `Translation in ${city.name}`,
    ]),
    metaDescription: `Certified translation and interpretation in ${city.name}, ${city.state} — ${availableLanguages.length} languages, certified documents, interpreters on site and apostille attestation.`.slice(
      0,
      160
    ),
    heading: pickVariant(seed, "heading", headingVariants)(ctx),
    subHeading: pickVariant(seed, "lead", leadVariants)(ctx),
    intro: [
      pickVariant(seed, "intro-1", introFirstByTier[tier])(ctx),
      pickVariant(seed, "intro-2", introSecondVariants)(ctx),
    ],
    documentsIntro: pickVariant(seed, "documents-intro", documentsIntroVariants)(ctx),
    workingHeading: `Working with us from ${city.name}`,
    workingIntro: pickVariant(seed, "working-intro", workingIntroVariants)(ctx),
    workingItems,
    languagesIntro: pickVariant(seed, "languages-intro", languagesIntroVariants)(ctx),
    faq,
  };
}
