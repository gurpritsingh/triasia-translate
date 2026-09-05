import type { City } from "./cities";
import type { Language } from "./languages";
import type { ServiceMeta } from "./services";
import type { ContentSection, ContentSectionItem, FaqItem, PageContent } from "./pageTemplates";
import { pickVariant, pickOrder } from "./contentVariants";
import { buildLanguagePairs } from "./languagePairs";

/**
 * The interpreter counterpart to defaultTranslatorContent. Interpretation is a
 * different service from translation — live, booked by the day, and judged on
 * mode and setting rather than on certification — so this pool deliberately
 * shares no sentences with the translator generator. Reusing translated copy
 * with "translation" swapped for "interpretation" would have produced 452 more
 * pages saying the same thing, which is the problem this file exists to solve.
 */

interface Ctx {
  city?: City;
  language: Language;
}

type TextVariant = (ctx: Ctx) => string;

// Only real structured data (city name, state, language name) is interpolated —
// never invented local detail such as venues, landmarks or client names.
function areaIn(ctx: Ctx): string {
  return ctx.city ? `in ${ctx.city.name}` : "in India";
}
function areaAcross(ctx: Ctx): string {
  return ctx.city ? `across ${ctx.city.name} and ${ctx.city.state}` : "across India";
}
function citySuffix(ctx: Ctx): string {
  return ctx.city ? ` in ${ctx.city.name}` : "";
}

const seoTitleVariants: TextVariant[] = [
  (ctx) => `${ctx.language.name} Interpreter ${areaIn(ctx)} | Conference & Business Interpretation`,
  (ctx) => `Hire a ${ctx.language.name} Interpreter ${areaIn(ctx)} | ${ctx.language.name} Interpretation Services`,
  (ctx) => `${ctx.language.name} Interpretation Services ${areaIn(ctx)} | TriasiaGlobal`,
];

// Every variant carries both city and language name on city pages, so no two
// city pages for a language can collide on H1 — same contract as the translator pool.
const headingVariants: TextVariant[] = [
  (ctx) => `${ctx.language.name} Interpreter Services ${areaIn(ctx)}`,
  (ctx) => `Professional ${ctx.language.name} Interpreters ${areaIn(ctx)}`,
  (ctx) =>
    ctx.city
      ? `Hire a ${ctx.language.name} Interpreter in ${ctx.city.name}, ${ctx.city.state}`
      : `Hire a ${ctx.language.name} Interpreter in India`,
  (ctx) => `${ctx.language.name} Interpretation Services ${areaIn(ctx)} — Meetings, Conferences & Site Visits`,
];

const introVariants: TextVariant[] = [
  (ctx) =>
    `Triasia Global provides professional ${ctx.language.name} interpreters ${areaIn(ctx)} for business meetings, conferences, factory visits, court matters and medical appointments. Tell us the date, the setting and the subject, and we assign an interpreter who has worked in that setting before — on site or remotely.`,
  (ctx) =>
    `Book a ${ctx.language.name} interpreter ${areaIn(ctx)} for negotiations, conferences, exhibitions, audits and official appointments. Our interpreters work in both directions between ${ctx.language.name} and English, on site or over video, and are matched to your subject matter rather than simply to your date.`,
  (ctx) =>
    `Triasia Global supplies experienced ${ctx.language.name} interpreters ${areaIn(ctx)} for corporate meetings, conferences, technical site visits and legal or medical appointments. We match the interpreting mode to the room — simultaneous, consecutive, liaison or whispered — instead of sending the same setup to every job.`,
];

const section1BodyVariants: TextVariant[] = [
  (ctx) =>
    `We provide ${ctx.language.name} interpreters to companies, government departments and individuals ${areaAcross(ctx)}. An interpreter works live, in the room or on the call, which makes preparation the difference between a session that flows and one that stalls — so every assignment starts with the subject, the participants and the format, not just the booking date.`,
  (ctx) =>
    `Our ${ctx.language.name} interpreters support meetings, site visits and official appointments ${areaAcross(ctx)}. Unlike a document, a conversation cannot be revised after the fact, which is why we brief the interpreter on your agenda and terminology before the day rather than handing them the topic on arrival.`,
  (ctx) =>
    `From two-person negotiations to multi-day conferences, we place ${ctx.language.name} interpreters with clients ${areaAcross(ctx)}. The right interpreter is chosen for the setting and the subject — a technical audit and a court hearing demand very different things from the same language skill.`,
];

const modeIntroVariants: TextVariant[] = [
  (ctx) =>
    `There is no single way to interpret a session. The mode is chosen by the room — how many people need ${ctx.language.name}, whether the schedule can absorb pauses, and whether equipment is available.`,
  (ctx) =>
    `Which mode suits your event depends on the audience size, the schedule and the equipment on hand. These are the four we work in for ${ctx.language.name}.`,
  (ctx) =>
    `Choosing the mode matters as much as choosing the interpreter. Here is how the four options differ in practice for ${ctx.language.name} assignments.`,
];

const settingIntroVariants: TextVariant[] = [
  (ctx) =>
    `Our ${ctx.language.name} interpreters work ${areaIn(ctx)} across the settings where a misunderstanding is expensive — commercial, technical, legal and medical.`,
  (ctx) =>
    `We place ${ctx.language.name} interpreters ${areaIn(ctx)} in the settings that need them most, each with its own pace, vocabulary and etiquette.`,
  (ctx) =>
    `From boardrooms to shop floors, these are the ${ctx.language.name} interpreting assignments we handle most often ${areaIn(ctx)}.`,
];

const remoteBodyVariants: TextVariant[] = [
  (ctx) =>
    `Not every session needs someone in the room. We provide ${ctx.language.name} interpreters on site${citySuffix(ctx)} and remotely over video or phone — remote suits short calls, supplier check-ins and follow-up meetings, while on site remains the better choice for negotiations, factory walk-throughs and anything where the interpreter needs to see what is being pointed at.`,
  (ctx) =>
    `${ctx.language.name} interpretation is available both on site${citySuffix(ctx)} and remotely by video or telephone. Remote sessions start faster and cost less; on-site interpreters read the room, follow gestures and handle side conversations that a video window simply does not carry.`,
  (ctx) =>
    `We cover both formats: an interpreter physically present${citySuffix(ctx)}, or a remote ${ctx.language.name} interpreter joining your video call. Short and unplanned conversations tend to work remotely; site visits, inspections and negotiations are worth having someone in the room for.`,
];

const bookingIntroVariants: TextVariant[] = [
  (ctx) =>
    `Booking a ${ctx.language.name} interpreter${citySuffix(ctx)} is straightforward, and a few details up front make a visible difference on the day.`,
  (ctx) =>
    `Here is what we need to place the right ${ctx.language.name} interpreter${citySuffix(ctx)}, and what helps them prepare properly.`,
  (ctx) =>
    `What goes into arranging a ${ctx.language.name} interpreter${citySuffix(ctx)} — and the two or three things clients can do that most improve the outcome.`,
];

const interpreterBodyVariants: TextVariant[] = [
  (ctx) =>
    `Our ${ctx.language.name} interpreters are native or near-native speakers with working experience in the settings they are sent to — commercial negotiation, technical inspection, legal proceedings or clinical consultation. Interpreting is as much about judgement as vocabulary: knowing when to ask a speaker to repeat, when to interrupt, and when to stay invisible.`,
  (ctx) =>
    `We work with ${ctx.language.name} interpreters who are native or near-native in the language and genuinely familiar with the subject at hand. The skill that separates them is not vocabulary but composure — keeping pace with a speaker who does not pause, and rendering meaning rather than words.`,
  (ctx) =>
    `Every ${ctx.language.name} interpreter we assign is a native or near-native speaker with real experience of the setting — a negotiation, an audit, a hearing or a consultation. They work in both directions between ${ctx.language.name} and English, and treat everything said in the room as confidential.`,
];

const whyBodyVariants: TextVariant[] = [
  (ctx) =>
    `We match interpreters to the subject rather than to the calendar, brief them before the day, and confirm the mode and equipment the session actually requires. ISO 9001:2015 and ISO 17100:2015 certified, with ${ctx.language.name} interpreters available ${areaIn(ctx)} at short notice and for multi-day assignments.`,
  (ctx) =>
    `Subject-matched interpreters, briefed in advance, with the interpreting mode agreed before the session rather than improvised at the venue. ISO 9001:2015 and ISO 17100:2015 certified, and available for one-off meetings or multi-day ${ctx.language.name} assignments ${areaIn(ctx)}.`,
  (ctx) =>
    `An interpreter who knows the subject, has read your agenda, and arrives with the right setup for the room. That is the whole offer — backed by ISO 9001:2015 and ISO 17100:2015 certification and ${ctx.language.name} coverage ${areaIn(ctx)} for single meetings and long assignments alike.`,
];

const pairsIntroRegional: TextVariant[] = [
  (ctx) =>
    `${ctx.language.name} interpreters work between ${ctx.language.name} and English, and between ${ctx.language.name} and the international languages we cover. The combinations below are the ones requested most.`,
  (ctx) =>
    `We interpret between ${ctx.language.name} and English, and between ${ctx.language.name} and our supported international languages — the usual combinations are listed below.`,
  (ctx) =>
    `As an Indian regional language, ${ctx.language.name} pairs with English and with the international languages we support. Common interpreting combinations are shown below.`,
];

const pairsIntroForeign: TextVariant[] = [
  (ctx) =>
    `${ctx.language.name} interpreting runs between ${ctx.language.name} and English in both directions — the working pair for business, legal and official sessions in India.`,
  (ctx) =>
    `We interpret ${ctx.language.name} to and from English, which is the pairing meetings, hearings and official appointments in India are conducted in.`,
  (ctx) =>
    `Sessions run between ${ctx.language.name} and English in both directions, the combination used for commercial, legal and government settings across India.`,
];

interface ItemDef {
  id: string;
  heading: string;
  bodyVariants: string[];
}

const modeItems: ItemDef[] = [
  {
    id: "simultaneous",
    heading: "Simultaneous interpretation",
    bodyVariants: [
      "The interpreter renders speech in real time while the speaker keeps talking, usually from a booth with headsets for the audience. It keeps a conference running to schedule, and standard practice is two interpreters per language rotating roughly every 20–30 minutes, because concentration at that intensity does not hold much longer.",
      "Real-time interpretation delivered as the speaker talks, normally with a booth and receivers. It adds no time to the agenda, which is why conferences use it — and it is worked in pairs per language, with interpreters swapping every 20–30 minutes to keep accuracy from drifting.",
      "Used where the schedule cannot absorb pauses: the interpreter speaks at the same time as the speaker, through headsets. Because the cognitive load is high, simultaneous work is staffed with two interpreters per language who rotate every 20–30 minutes.",
    ],
  },
  {
    id: "consecutive",
    heading: "Consecutive interpretation",
    bodyVariants: [
      "The speaker talks in segments and pauses; the interpreter takes notes and delivers each segment. It needs no equipment and is the most accurate mode for detail-heavy discussion, but it roughly doubles the length of the session — worth planning the agenda around.",
      "Speech is delivered in chunks, with the interpreter rendering each one from notes during the pause. No equipment is required and precision is high, which suits negotiations and interviews — but budget about twice the meeting time.",
      "The interpreter waits for a natural break, then delivers the passage from notes. It is the standard for meetings, depositions and interviews where exactness matters more than speed, and it effectively doubles how long the session runs.",
    ],
  },
  {
    id: "liaison",
    heading: "Liaison and escort interpreting",
    bodyVariants: [
      "Informal two-way interpreting for delegations, factory tours, buyer visits and trade fairs, where conversation moves around and nobody is standing at a podium. The interpreter walks with the group and keeps both sides in the conversation.",
      "Used when a visiting delegation is moving through a site or a trade fair: short exchanges, both directions, no equipment. The interpreter accompanies the group rather than working from a fixed position.",
      "The mode for site visits, supplier tours and exhibition floors — quick two-way exchanges as the group moves, with the interpreter alongside rather than in a booth.",
    ],
  },
  {
    id: "whispered",
    heading: "Whispered interpretation (chuchotage)",
    bodyVariants: [
      "Simultaneous interpreting delivered quietly to one or two listeners without equipment. It suits a single delegate sitting in a meeting held in another language, and works only for very small numbers — beyond two listeners it becomes disruptive to the room.",
      "The interpreter sits beside one or two people and interprets under their breath as the meeting proceeds. No booth or headsets needed, which makes it practical for a lone participant, but it does not scale past a couple of listeners.",
      "For a single participant who needs the meeting rendered live: the interpreter whispers alongside the speaker, without equipment. Practical for one or two listeners, unworkable for more.",
    ],
  },
];

const settingItems: ItemDef[] = [
  {
    id: "business",
    heading: "Business meetings and negotiations",
    bodyVariants: [
      "Supplier discussions, distribution talks, joint ventures and board meetings, where tone carries as much weight as terms. The interpreter conveys hesitation and emphasis as well as content, because both sides are reading the room.",
      "Commercial negotiations, partner meetings and management reviews. Beyond accuracy, the job is register — a rendering that is technically correct but blunt can cost goodwill that took months to build.",
      "From first supplier meetings to contract negotiation, interpreted so both sides follow not just the terms but the intent behind them.",
    ],
  },
  {
    id: "conference",
    heading: "Conferences, seminars and exhibitions",
    bodyVariants: [
      "Multi-speaker events run to a schedule, usually simultaneous and usually staffed in pairs. Speaker slides and abstracts sent in advance make a measurable difference, since specialised terms rarely survive being heard for the first time at the podium.",
      "Conference sessions, panel discussions and exhibition presentations, interpreted simultaneously so the agenda holds. Advance materials matter here more than anywhere else.",
      "Seminars, industry conferences and trade exhibitions where several speakers follow one another and stopping for consecutive interpreting is not an option.",
    ],
  },
  {
    id: "technical",
    heading: "Factory visits, audits and technical training",
    bodyVariants: [
      "Plant inspections, quality audits, machine commissioning and operator training, where the interpreter has to handle equipment vocabulary and often noise. Being able to see what is being pointed at is precisely why this work is done on site.",
      "Supplier audits, installation and commissioning, and training sessions on the floor — technical vocabulary, safety instructions and a working environment that a remote call cannot convey.",
      "Machinery handover, quality inspections and shop-floor training, interpreted by someone comfortable with technical terminology rather than translating it approximately.",
    ],
  },
  {
    id: "legal",
    heading: "Legal and official proceedings",
    bodyVariants: [
      "Hearings, arbitration, statements and legal consultations, where interpreting is expected to be complete and literal — including questions the speaker would rather rephrase. Nothing is summarised or softened.",
      "Arbitration sessions, legal consultations and official statements, interpreted precisely and completely, with no editing of what either side actually said.",
      "Legal meetings, arbitration and formal statements, where the standard is a full and faithful rendering rather than a helpful paraphrase.",
    ],
  },
  {
    id: "medical",
    heading: "Medical appointments and hospital visits",
    bodyVariants: [
      "Consultations, admissions and treatment discussions for patients who do not share a language with their doctor. Symptoms, dosages and consent are interpreted exactly, and the interpreter stays out of the clinical decision entirely.",
      "Doctor consultations, hospital admissions and discharge conversations, interpreted so patient and clinician understand each other on symptoms, treatment options and consent.",
      "For patients travelling for treatment: appointments, ward rounds and discharge instructions interpreted precisely, without the interpreter editing or advising.",
    ],
  },
  {
    id: "government",
    heading: "Government, embassy and visa appointments",
    bodyVariants: [
      "Official interviews, registrations and embassy appointments, where the interpreter's job is to render questions and answers exactly as asked and given, without smoothing either.",
      "Visa interviews, registrations and departmental meetings, interpreted faithfully — these are settings where a helpful paraphrase can cause real problems.",
      "Embassy appointments, official interviews and government departmental meetings, interpreted exactly as spoken in both directions.",
    ],
  },
];

const bookingItems: ItemDef[] = [
  {
    id: "brief",
    heading: "Tell us the setting, not just the date",
    bodyVariants: [
      "The subject, the number of participants, the venue and how long the session runs decide which interpreter fits and which mode the room needs. A date alone is not enough to place the right person.",
      "Subject matter, participant count, venue and duration determine both the interpreter and the mode. Give us those and the match is straightforward.",
      "We need the topic, the format and the length of the session as well as the date — that is what determines who is right for the job.",
    ],
  },
  {
    id: "notice",
    heading: "Give as much notice as you can",
    bodyVariants: [
      "Short-notice bookings are often possible, but notice widens the pool — particularly for less commonly requested languages, technical subjects and multi-day assignments where the same interpreter should stay across all sessions.",
      "We do handle urgent requests, though more notice means a better-matched interpreter rather than simply an available one — especially for specialised subjects and rarer languages.",
      "Urgent bookings can usually be covered; advance notice buys you the right specialist instead of the nearest one, which matters most for technical and less common language work.",
    ],
  },
  {
    id: "materials",
    heading: "Send the agenda and any terminology",
    bodyVariants: [
      "An agenda, participant names, product names and past minutes let the interpreter prepare vocabulary in advance. This is the single cheapest thing a client can do to improve the result, and the one most often skipped.",
      "Slides, agendas, product lists and previous minutes go straight into the interpreter's preparation. Sessions where materials arrive beforehand simply run better.",
      "Anything you can share in advance — agenda, names, technical terms, earlier correspondence — is preparation time that shows up on the day.",
    ],
  },
  {
    id: "logistics",
    heading: "Confirm equipment and travel",
    bodyVariants: [
      "Simultaneous work needs booths or portable receivers and a second interpreter; consecutive needs neither. We confirm what your session requires and coordinate with your venue or AV team, along with travel for assignments outside the city.",
      "We agree the equipment the mode requires with your venue or AV supplier before the day, and arrange travel where the assignment is outside the city.",
      "Equipment depends entirely on the mode — a consecutive session needs nothing, a simultaneous one needs booths or receivers and a second interpreter. We settle that in advance, along with any travel.",
    ],
  },
];

export function buildDefaultInterpreterContent(ctx: {
  city?: City;
  language: Language;
  service: ServiceMeta;
}): PageContent {
  const { city, language } = ctx;
  const vctx: Ctx = { city, language };
  const seedKey = city ? `/${city.slug}/${language.slug}/interpreter/` : `/${language.slug}/interpreter/`;

  const seoTitle = pickVariant(seedKey, "seoTitle", seoTitleVariants)(vctx);
  const heading = pickVariant(seedKey, "heading", headingVariants)(vctx);

  if (city && (!heading.includes(city.name) || !heading.includes(language.name))) {
    throw new Error(`buildDefaultInterpreterContent: heading missing city/language name for ${seedKey}`);
  }

  const subHeading = pickVariant(seedKey, "intro", introVariants)(vctx);
  const suffix = citySuffix(vctx);

  const resolve = (defs: ItemDef[], salt: string): ContentSectionItem[] =>
    pickOrder(seedKey, `${salt}-order`, defs).map((def) => ({
      heading: def.heading,
      body: pickVariant(seedKey, `${salt}-${def.id}-body`, def.bodyVariants),
    }));

  const sections: ContentSection[] = [
    {
      heading: `${language.name} Interpretation Services${suffix}`,
      body: pickVariant(seedKey, "section1-body", section1BodyVariants)(vctx),
    },
    {
      heading: `Simultaneous, Consecutive and Liaison ${language.name} Interpreting`,
      body: pickVariant(seedKey, "modes-intro", modeIntroVariants)(vctx),
      items: resolve(modeItems, "mode"),
    },
    {
      heading: `Where Our ${language.name} Interpreters Work${suffix}`,
      body: pickVariant(seedKey, "settings-intro", settingIntroVariants)(vctx),
      items: resolve(settingItems, "setting"),
    },
    {
      heading: `On-Site and Remote ${language.name} Interpretation${suffix}`,
      body: pickVariant(seedKey, "remote-body", remoteBodyVariants)(vctx),
    },
    {
      heading: `Booking a ${language.name} Interpreter${suffix}`,
      body: pickVariant(seedKey, "booking-intro", bookingIntroVariants)(vctx),
      items: resolve(bookingItems, "booking"),
    },
    {
      heading: `Professional ${language.name} Interpreters${suffix}`,
      body: pickVariant(seedKey, "interpreters-body", interpreterBodyVariants)(vctx),
    },
    {
      heading: `Why Choose Triasia Global for ${language.name} Interpretation${suffix}?`,
      body: pickVariant(seedKey, "why-body", whyBodyVariants)(vctx),
    },
  ];

  const languagePairs = {
    heading: `${language.name} Interpretation Language ${language.type === "regional" ? "Combinations" : "Pairs"}`,
    intro: pickVariant(seedKey, "pairs-intro", language.type === "regional" ? pairsIntroRegional : pairsIntroForeign)(
      vctx
    ),
    pairs: buildLanguagePairs(language),
  };

  const faq: FaqItem[] = [
    {
      question: "What is the difference between simultaneous and consecutive interpretation?",
      answer: pickVariant(seedKey, "faq-1-answer", [
        `Simultaneous interpreting happens in real time while the speaker talks, normally with a booth and headsets, and adds no time to your agenda — it is staffed with two interpreters per language who rotate every 20–30 minutes. Consecutive interpreting works in segments with the speaker pausing, needs no equipment, and roughly doubles the length of the session. Conferences use the first; meetings, interviews and legal sessions usually use the second.`,
        `Simultaneous means the interpreter speaks at the same time as the speaker, via headsets, keeping the event on schedule and requiring two interpreters per language. Consecutive means the speaker pauses and the interpreter delivers each segment from notes — no equipment, higher precision, about twice the meeting time. Your format decides which one fits.`,
        `With simultaneous interpreting, ${language.name} is rendered live through headsets while the speaker continues, so the schedule holds; it is worked in pairs because of the concentration involved. With consecutive, the speaker pauses between segments and the interpreter delivers from notes — nothing to set up, but plan for the session taking roughly twice as long.`,
      ]),
    },
    {
      question: `How much notice do you need to book a ${language.name} interpreter${suffix}?`,
      answer: pickVariant(seedKey, "faq-2-answer", [
        `Short-notice and same-week bookings are often possible. More notice mainly buys you a better match rather than mere availability — it matters most for less commonly requested languages, technical or legal subject matter, and multi-day events where you want the same interpreter throughout.`,
        `We can frequently cover urgent requests, but the earlier you book, the wider the pool of interpreters who actually know your subject. That gap is widest for specialised topics, rarer languages and assignments running several days.`,
        `Urgent bookings are usually workable. Advance notice is what lets us assign an interpreter matched to your subject rather than simply free on the date — worth it particularly for technical, legal or multi-day ${language.name} assignments.`,
      ]),
    },
    {
      question: `Do you provide remote ${language.name} interpretation as well as on-site?`,
      answer: pickVariant(seedKey, "faq-3-answer", [
        `Both. Remote interpreting over video or phone is quicker to arrange and suits short calls, supplier check-ins and follow-ups. On-site is the better choice for negotiations, factory visits and inspections, where the interpreter needs to see the room and what is being pointed at.`,
        `Yes — we cover video and telephone interpreting as well as sending an interpreter to your location${suffix}. Remote works well for short or unplanned conversations; anything involving a site, equipment or delicate negotiation is better handled in person.`,
        `We do both. Remote sessions start faster and cost less, while on-site interpreters catch gestures, side conversations and the general temperature of the room that a video window flattens out.`,
      ]),
    },
    {
      question: "Is an interpreter booked by the hour or by the day?",
      answer: pickVariant(seedKey, "faq-4-answer", [
        `Interpreting is normally booked in half-day or full-day blocks rather than by the hour, because the interpreter reserves the slot, travels to you and prepares your subject matter beforehand. Short remote sessions are the usual exception. We confirm the basis when we quote, so nothing is open-ended.`,
        `Assignments are generally quoted as half days or full days — preparation and travel are part of the job, not extras around it. Short remote calls can be handled differently, and we set out the basis in the quote before you commit.`,
        `Most on-site work is arranged as a half-day or full-day booking, since the interpreter blocks out the time, travels and prepares your terminology in advance. Brief remote sessions are quoted separately.`,
      ]),
    },
    {
      question: "Do we need special equipment for simultaneous interpretation?",
      answer: pickVariant(seedKey, "faq-5-answer", [
        `Yes — simultaneous interpreting requires a booth or portable receivers so the audience can hear the interpreter without talking over the speaker, plus a second interpreter for anything beyond a short session. Consecutive, liaison and whispered interpreting need no equipment at all. Tell us the venue and we will confirm what your session actually requires and coordinate it with your AV team.`,
        `For simultaneous, yes: booths or portable headset systems, and two interpreters per language. For consecutive, liaison or whispered interpreting, nothing is needed. Send us the venue details and format and we will tell you which applies before you spend anything on hire.`,
        `Only simultaneous work needs it — booths or receivers, and a second interpreter to rotate with. The other modes need nothing. We confirm the requirement with your venue or AV supplier in advance rather than discovering it on the day.`,
      ]),
    },
    {
      question: `Will the interpreter understand our technical or legal subject matter?`,
      answer: pickVariant(seedKey, "faq-6-answer", [
        `Interpreters are assigned by subject as well as by language, so a quality audit and an arbitration hearing do not get the same person by default. Sending the agenda, participant names and any product or technical vocabulary in advance lets them prepare properly — it is the single most useful thing a client can do before the day.`,
        `Yes — we match ${language.name} interpreters to the field, whether that is engineering, legal, medical or commercial. Share your agenda and terminology beforehand and the interpreter arrives already prepared on the vocabulary your session will actually use.`,
        `We assign by subject familiarity, not just language pair. Anything you can send ahead — slides, agenda, product names, earlier minutes — goes into the interpreter's preparation, and the difference on the day is noticeable.`,
      ]),
    },
  ];

  return { seoTitle, heading, subHeading, sections, languagePairs, faq };
}
