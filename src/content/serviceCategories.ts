import type { ContentSection, FaqItem, LanguagePairsBlock } from "./pageTemplates";

export interface ServiceCategory {
  slug: string;
  title: string;
  cardDescription: string;
  heading: string;
  subHeading: string;
  /** <title> text; falls back to "<title> Services | TriasiaGlobal". */
  seoTitle?: string;
  /** <meta name="description"> — kept under ~160 chars; falls back to subHeading. */
  metaDescription?: string;
  /** Supporting paragraphs rendered inside the hero, under the lead. */
  intro?: string[];
  details: string[];
  /** Optional H2 (+H3 card) sections rendered below the two-column block. */
  sections?: ContentSection[];
  /** Optional "language to language" combinations band. */
  languagePairs?: LanguagePairsBlock;
  /** Optional FAQ accordion, also emitted as FAQPage JSON-LD. */
  faq?: FaqItem[];
  /** Iconify name rendered via astro-icon, e.g. "lucide:scale" */
  icon: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "legal-document-translation",
    title: "Legal Document Translation",
    cardDescription: "Contracts, agreements, court documents, and legal certificates with certified accuracy.",
    heading: "Certified Legal Document Translation Services in India",
    seoTitle: "Certified Legal Document Translation in India | TriasiaGlobal",
    subHeading:
      "Government-authorized translation of contracts, agreements, court documents and affidavits — handled by certified legal translators and accepted by courts, government offices and embassies across India.",
    metaDescription:
      "Certified legal document translation in India — contracts, affidavits, court papers and property documents, with notarisation and MEA/Apostille attestation.",
    intro: [
      "We also handle what comes after the translation — MEA/Apostille attestation, embassy legalisation and visa documentation — and we translate between any two languages, not only into and out of English.",
      "ISO 9001:2015 and ISO 17100:2015 certified, working with law firms, companies and individuals across Delhi, Gurgaon, Noida, Mumbai, Bangalore, Punjab and Gujarat — and with clients everywhere else in India.",
    ],
    details: [
      "Contracts, agreements and commercial documents",
      "Court documents, orders and affidavits",
      "Sworn translations of legal documents",
      "Power of attorney",
      "Property documents and title papers",
      "Marriage and divorce certificates",
      "Notarised, MEA-attested and Apostille-ready translations",
    ],
    sections: [
      {
        heading: "The documents we are asked for most",
        items: [
          {
            heading: "Contracts and commercial agreements",
            body: "Employment contracts, vendor and distribution agreements, shareholder and incorporation papers. The work here is consistency — a defined term has to mean the same thing in clause 2 as it does in clause 40.",
          },
          {
            heading: "Court documents and affidavits",
            body: "Petitions, orders, judgments, statements and affidavits, usually against a deadline somebody else set. Each goes out with a certificate of accuracy, and as a sworn or notarised translation where the court expects one.",
          },
          {
            heading: "Property papers and power of attorney",
            body: "Sale deeds, title documents, lease agreements and powers of attorney — often needed when the owner is abroad. Names, dates, boundaries and figures are checked separately from the body text, because that is where a slip does real damage.",
          },
          {
            heading: "Marriage and divorce certificates",
            body: "Translated for visa files, spousal applications, name changes and inheritance matters. These are the ones most often needed with attestation attached, which we arrange as part of the same job.",
          },
        ],
      },
      {
        heading: "How a legal translation job runs",
        items: [
          {
            heading: "1. Send the document",
            body: "A scan, a phone photo or the hard copy, by WhatsApp or email. You get a quote and a delivery date back before any work starts.",
          },
          {
            heading: "2. Translation by a legal translator",
            body: "The file goes to a translator who works in that language pair and with legal text. Terminology is settled at the start and applied the same way throughout.",
          },
          {
            heading: "3. Review and certification",
            body: "A second pass checks names, dates, figures and formatting against the original. The translation is then issued on our letterhead with a signed and stamped certificate of accuracy.",
          },
          {
            heading: "4. Attestation and delivery",
            body: "Notarisation, MEA/Apostille attestation or embassy legalisation where the receiving office needs it. Soft copy by email; hard copies couriered, or collected from our Delhi office.",
          },
        ],
      },
      {
        heading: "Why legal translation is treated differently",
        body: "A translated legal document can read perfectly well and still be rejected. Three things separate this work from ordinary translation.",
        items: [
          {
            heading: "Terminology is fixed, not flexible",
            body: "“Shall” is not “will”, and an indemnity is not a warranty. Where a term has a settled meaning in one legal system and no equivalent in the other, it is rendered and explained rather than swapped for the nearest familiar word.",
          },
          {
            heading: "Layout carries meaning",
            body: "Clause numbering, schedules, seals, stamps and signature blocks stay where they sit in the original, because whoever verifies the translation reads both documents side by side.",
          },
          {
            heading: "The certificate is part of the document",
            body: "Courts, registrars, embassies and immigration officers accept a translation on the strength of how it was certified — on letterhead, signed and stamped, with notarisation or attestation added where required.",
          },
        ],
      },
    ],
    languagePairs: {
      heading: "Legal language pairs we handle most",
      intro:
        "The combinations we see most often on legal files. They are a sample, not a limit — we translate between any two languages.",
      pairs: [
        { from: "English", to: "Hindi" },
        { from: "Hindi", to: "English" },
        { from: "English", to: "Punjabi" },
        { from: "English", to: "Arabic" },
        { from: "English", to: "French" },
        { from: "English", to: "German" },
        { from: "English", to: "Spanish" },
        { from: "English", to: "Japanese" },
        { from: "English", to: "Korean" },
        { from: "English", to: "Chinese" },
      ],
    },
    faq: [
      {
        question: "Will a court or government office accept your translation?",
        answer:
          "Every legal translation carries a signed and stamped certificate of accuracy on our letterhead — the form courts, registrars, embassies and government offices normally ask for. If the office also wants notarisation or MEA/Apostille attestation, tell us when you send the document and we arrange it in the same job.",
      },
      {
        question: "What is the difference between a certified and a sworn translation?",
        answer:
          "A certified translation carries the provider's signed statement that it is complete and accurate. A sworn translation is signed before a notary or authorised official, which adds legal standing. Indian authorities usually ask for certified plus notarised; several European countries ask for sworn. Tell us the destination country and we will confirm which one applies.",
      },
      {
        question: "How long does a legal translation take?",
        answer:
          "Standard documents such as certificates and short affidavits are normally back within 24–48 hours; contracts and case files depend on length and language pair. You get a firm delivery date with the quote. Attestation and legalisation are quoted as a separate timeline, because those run on government and embassy schedules.",
      },
      {
        question: "Do you handle MEA/Apostille attestation and embassy legalisation?",
        answer:
          "Yes. Translation, notarisation, MEA/Apostille attestation and embassy legalisation are handled end to end, so a document that has to be translated and then legalised stays one job with one point of contact instead of three separate errands.",
      },
      {
        question: "Which languages do you translate legal documents into?",
        answer:
          "Any language to any language, not only into and out of English. The heaviest legal volumes are Hindi, Punjabi, Arabic, French, German, Spanish, Japanese, Korean and Chinese, but coverage is not limited to those.",
      },
      {
        question: "Do you work outside Delhi NCR?",
        answer:
          "Yes. We have a strong presence in Delhi, Gurgaon, Noida, Mumbai, Bangalore, Punjab and Gujarat, and work with clients across the rest of India. Documents are received and returned digitally, so location does not change the turnaround — hard copies are couriered when you need physical certified sets.",
      },
    ],
    icon: "lucide:scale",
  },
  {
    slug: "educational-certificates",
    title: "Educational Certificates",
    cardDescription: "Academic transcripts, degrees, diplomas, and educational credentials.",
    heading: "Educational Certificate Translation Services in India",
    seoTitle: "Educational Certificate Translation in India | TriasiaGlobal",
    subHeading:
      "Degrees, mark sheets and transcripts translated and certified for university admissions, student visas and credential evaluation — prepared the way WES, universities and immigration authorities expect them.",
    metaDescription:
      "Certified translation of degrees, transcripts and mark sheets for university admissions, student visas and WES credential evaluation. Any language pair.",
    intro: [
      "Admissions offices and credential evaluators are stricter than most applicants expect. The translation has to mirror the original exactly — every stamp, seal, signature, grading scale and handwritten note carried across, nothing summarised and nothing tidied away. A clean, readable version that quietly drops the marks legend is one of the most common reasons a file comes back.",
      "We translate academic records into and out of any language, certify them with a signed statement of accuracy naming the translator, and arrange MEA/Apostille attestation where the university or immigration authority asks for it. ISO 9001:2015 and ISO 17100:2015 certified, working with students, parents and institutions in Delhi, Gurgaon, Noida, Mumbai, Bangalore, Punjab and Gujarat, and with applicants across the rest of India.",
    ],
    details: [
      "Degree certificates, diplomas and provisional certificates",
      "Year-wise and semester-wise mark sheets",
      "Academic transcripts and grading scales",
      "School leaving and transfer certificates",
      "Migration and character certificates",
      "Documents for WES, ECE and other credential evaluations",
      "Apostilled and attested academic sets",
    ],
    sections: [
      {
        heading: "What an admissions or evaluation file usually needs",
        items: [
          {
            heading: "Degree and provisional certificates",
            body: "The document proving the qualification was actually awarded. Evaluators want the final degree — or the provisional certificate where the degree has not been issued yet — alongside the marks records, not instead of them.",
          },
          {
            heading: "Mark sheets, year by year",
            body: "Indian universities issue marks year-wise or semester-wise, and that is how evaluators want them: the complete set, each sheet translated in full, including the grading scale printed on the reverse that people routinely forget to scan.",
          },
          {
            heading: "Transcripts and grading scales",
            body: "A transcript only means something if the grading key travels with it. Percentages, CGPA bands, division and class are translated exactly as printed — converting marks into another system is the evaluator's job, not the translator's.",
          },
          {
            heading: "Migration, transfer and character certificates",
            body: "Needed when moving between boards, universities or countries, and usually wanted with attestation already attached. We handle the attestation in the same job rather than sending you off to arrange it separately.",
          },
        ],
      },
      {
        heading: "How we handle an academic file",
        items: [
          {
            heading: "1. Send the whole set at once",
            body: "Scans of every page, front and back. Sending the set together lets us keep names, roll numbers and institution names identical across every document — mismatches between sheets are a routine rejection reason.",
          },
          {
            heading: "2. Word-for-word translation",
            body: "Nothing is condensed or smoothed. Stamps, seals, signatures, marginal notes and the marks legend are all carried across and marked where they sit on the page.",
          },
          {
            heading: "3. Certification",
            body: "Each translation is issued on our letterhead with a signed statement of accuracy and the translator's details — the form evaluators, universities and visa offices ask for.",
          },
          {
            heading: "4. Attestation where required",
            body: "Where the university, embassy or immigration authority wants more than certification, we arrange notarisation and MEA/Apostille attestation before the file goes out.",
          },
        ],
      },
      {
        heading: "Where these translations end up",
        body: "Destinations differ, and the difference is usually procedural rather than linguistic.",
        items: [
          {
            heading: "Credential evaluators",
            body: "Bodies such as WES and ECE want an exact, word-for-word English translation of the complete record, submitted alongside the original and prepared by a translator rather than by the applicant. Self-translated and handwritten versions are refused on sight.",
          },
          {
            heading: "Universities and admissions offices",
            body: "Most accept a certified translation attached to the original transcript. A few insist the translation come sealed by the issuing institution — worth checking the admissions page before ordering, and telling us if that applies to you.",
          },
          {
            heading: "Embassies and student visas",
            body: "Study visa files generally need certified translations plus attestation. Germany, France, Italy and Spain commonly want the documents in their own language rather than in English.",
          },
        ],
      },
    ],
    languagePairs: {
      heading: "Academic language pairs we handle most",
      intro: "Indian records going out to universities abroad, and foreign records coming in for admission or employment here.",
      pairs: [
        { from: "Hindi", to: "English" },
        { from: "Punjabi", to: "English" },
        { from: "Bengali", to: "English" },
        { from: "English", to: "German" },
        { from: "English", to: "French" },
        { from: "English", to: "Spanish" },
        { from: "English", to: "Italian" },
        { from: "English", to: "Japanese" },
        { from: "English", to: "Korean" },
        { from: "English", to: "Chinese" },
      ],
    },
    faq: [
      {
        question: "Are your translations prepared the way WES asks for?",
        answer:
          "WES asks for an exact, word-for-word English translation of the complete record, prepared by a translator rather than the applicant and submitted alongside the original. That is precisely how we prepare academic files — full document, every stamp and note included, with a signed statement of accuracy and the translator's details attached.",
      },
      {
        question: "Do I have to translate every mark sheet, or just the degree?",
        answer:
          "Every one, both sides. Evaluators assess the marks record year by year, so a degree certificate alone leaves the file incomplete — and the grading scale printed on the back of the sheet is part of what they read.",
      },
      {
        question: "Can I translate my own documents to save money?",
        answer:
          "No. Universities, evaluators and immigration authorities reject translations produced by the applicant, and usually those from family members too, however good the language is. What they are buying with certification is an independent party taking responsibility for the accuracy.",
      },
      {
        question: "Will you convert my percentage marks into GPA?",
        answer:
          "No, and you should be wary of anyone who offers to. A translation reproduces what the document says; converting Indian percentages or CGPA into another grading system is the evaluator's decision, and a converted figure in the translation can put the whole file in doubt.",
      },
      {
        question: "Do I need an apostille as well as a translation?",
        answer:
          "It depends on the destination. Countries in the Hague Apostille Convention want MEA apostille on the academic documents; others want embassy legalisation. Tell us which country the file is going to and we will confirm what is needed before you pay for the wrong thing.",
      },
      {
        question: "How quickly can a full academic set be translated?",
        answer:
          "A standard set of mark sheets and certificates is usually back within 24–48 hours; larger sets and less common languages take longer. Attestation runs on government timelines and is quoted separately. Clear scans are enough to start — originals are not needed for the translation itself.",
      },
    ],
    icon: "lucide:graduation-cap",
  },
  {
    slug: "medical-documents",
    title: "Medical Documents",
    cardDescription: "Medical reports, prescriptions, health certificates, and clinical documentation.",
    heading: "Medical Document Translation Services in India",
    seoTitle: "Medical Report & Document Translation in India | TriasiaGlobal",
    subHeading:
      "Medical reports, discharge summaries, prescriptions and lab results translated by linguists who work with clinical terminology — for treatment abroad, patients travelling to India, and insurance claims.",
    metaDescription:
      "Certified medical document translation in India — reports, discharge summaries, prescriptions, lab results and clinical documentation, in any language pair.",
    intro: [
      "Medical translation has an unusually low tolerance for approximation. A dosage, a unit, a generic drug name against its local brand, a negative result read as a positive — those are the errors that matter, and they are the ones we check separately before anything is delivered.",
      "We work in both directions of India's medical traffic: records leaving with patients seeking treatment or a second opinion abroad, and case histories arriving with patients coming here from the Gulf, Africa, Bangladesh and Central Asia. ISO 9001:2015 and ISO 17100:2015 certified, working with hospitals, insurers and patients in Delhi, Gurgaon, Noida, Mumbai, Bangalore, Punjab and Gujarat, and with every file restricted to the translator and project manager handling it.",
    ],
    details: [
      "Medical reports and discharge summaries",
      "Prescriptions, dosage charts and treatment plans",
      "Laboratory, radiology and pathology reports",
      "Health, fitness and vaccination certificates",
      "Insurance claim and reimbursement documentation",
      "Pharmaceutical and clinical trial documents",
      "Medical device manuals and instructions for use",
    ],
    sections: [
      {
        heading: "The files we are asked for most",
        items: [
          {
            heading: "Case files for treatment abroad",
            body: "Discharge summaries, imaging and histopathology reports and the treating doctor's notes, prepared as one consistent set for a hospital or specialist in another country. Consistency across the set matters as much as any single page, because the receiving clinician reads them together.",
          },
          {
            heading: "Records for patients coming to India",
            body: "Case histories arriving in Arabic, Bengali, Urdu, French or Portuguese and needed in English by a hospital here. Usually urgent, often partly handwritten — anything genuinely illegible is flagged rather than guessed at.",
          },
          {
            heading: "Insurance and reimbursement files",
            body: "Claims fail on paperwork more often than on medicine. Bills, prescriptions, diagnoses and discharge notes are translated so dates, amounts and conditions reconcile across every document in the claim.",
          },
          {
            heading: "Pharmaceutical and clinical documentation",
            body: "Protocols, informed consent forms, investigator brochures and product literature, where terminology has to stay consistent with the sponsor's approved wording across every document in a study.",
          },
        ],
      },
      {
        heading: "How a medical file is handled",
        items: [
          {
            heading: "1. Send the records",
            body: "Scans or clear photographs, handwritten pages included. Tell us where the file is going — a hospital, an insurer, an embassy — because that changes how the certification is prepared.",
          },
          {
            heading: "2. Translation by someone who knows the terminology",
            body: "Clinical vocabulary, abbreviations and drug names are handled by translators who work with medical text, keeping generic names alongside local brand names wherever the two differ between countries.",
          },
          {
            heading: "3. A separate pass for the numbers",
            body: "Dosages, units, dates, values and reference ranges are checked apart from the prose. Numbers are where a medical translation does damage, so they are never proofread in the same sweep as the sentences around them.",
          },
          {
            heading: "4. Certified delivery",
            body: "A signed certificate of accuracy where the hospital, insurer or embassy needs one, with attestation arranged when the document forms part of a visa or legal file.",
          },
        ],
      },
      {
        heading: "Why medical translation is not general translation",
        body: "Three things go wrong on medical files, and none of them are about fluency.",
        items: [
          {
            heading: "Abbreviations do not travel",
            body: "The same three letters mean different things in different specialities and different countries. They are resolved against the context of the record and written out, not carried across on the assumption that the reader will work it out.",
          },
          {
            heading: "Handwriting is a real risk",
            body: "Much of an Indian case file is handwritten. Where a word cannot be read with certainty we mark it and ask, instead of producing a confident-looking translation of something nobody could actually read.",
          },
          {
            heading: "Units and drug names differ by country",
            body: "Reference ranges, units and brand names change across borders. Source figures are kept intact and the generic drug name is added, so the clinician reading it is not left converting on trust.",
          },
        ],
      },
    ],
    languagePairs: {
      heading: "Medical language pairs we handle most",
      intro: "Treatment abroad in one direction, medical travel to India in the other.",
      pairs: [
        { from: "English", to: "Arabic" },
        { from: "Arabic", to: "English" },
        { from: "Bengali", to: "English" },
        { from: "Urdu", to: "English" },
        { from: "French", to: "English" },
        { from: "English", to: "French" },
        { from: "Portuguese", to: "English" },
        { from: "Hindi", to: "English" },
        { from: "English", to: "German" },
        { from: "English", to: "Spanish" },
      ],
    },
    faq: [
      {
        question: "Can you translate handwritten prescriptions and doctor's notes?",
        answer:
          "Yes, and most Indian case files include them. Where a word or figure genuinely cannot be read with confidence, we mark it and come back to you rather than filling the gap with something plausible — on a dosage or a drug name, a confident guess is the worst possible outcome.",
      },
      {
        question: "Will a hospital or insurer accept the translation?",
        answer:
          "Medical translations are delivered with a signed certificate of accuracy on our letterhead, which is what hospitals, insurers and embassies normally require alongside the original record. Tell us which organisation the file is for and we will prepare the certification in the form they ask for.",
      },
      {
        question: "How fast can urgent medical records be turned around?",
        answer:
          "Standard reports and discharge summaries are usually back within 24–48 hours, and genuinely urgent cases are prioritised — treatment decisions and visa appointments do not wait. Send everything you have at once, since a part-file has to be re-checked when the rest arrives.",
      },
      {
        question: "Is my medical information kept confidential?",
        answer:
          "Files are shared only with the translator and project manager assigned to the job, never used as samples, and we sign a confidentiality agreement wherever you or your hospital require one.",
      },
      {
        question: "Do you handle insurance claim and reimbursement documents?",
        answer:
          "Yes. Bills, prescriptions, diagnostic reports and discharge summaries are translated as one set so that dates, amounts and diagnoses match across the whole claim — insurers reject on inconsistencies between documents as readily as on the medicine itself.",
      },
      {
        question: "Which languages do you cover for medical documents?",
        answer:
          "Any language to any language. In practice the heaviest medical volumes are Arabic, Bengali, Urdu, French, Portuguese, Hindi, German and Spanish, reflecting where patients travel from and where Indian patients go for treatment.",
      },
    ],
    icon: "lucide:stethoscope",
  },
  {
    slug: "technical-manuals",
    title: "Technical Manuals",
    cardDescription: "User manuals, technical specifications, engineering documents, and product guides.",
    heading: "Technical Manual and Documentation Translation in India",
    seoTitle: "Technical Manual Translation Services in India | TriasiaGlobal",
    subHeading:
      "User manuals, machine documentation, specifications and safety data sheets translated with the terminology fixed and the layout intact — for manufacturers, importers and engineering teams working across languages.",
    metaDescription:
      "Technical manual and documentation translation in India — user manuals, machine documentation, specifications, safety data sheets and software strings.",
    intro: [
      "Technical translation in India runs mostly in two directions: imported machinery arriving with German, Japanese, Korean or Chinese documentation that the people operating it cannot read, and Indian-built products going out to markets that require documentation in the local language before anything can be sold there.",
      "We handle both — terminology fixed in a glossary agreed before translation starts, and files returned in the layout they arrived in, with figures, callouts, tables and warnings where the original put them. ISO 9001:2015 and ISO 17100:2015 certified, working with manufacturing and engineering teams in Delhi, Gurgaon, Noida, Mumbai, Bangalore, Punjab and Gujarat, and with plants across the rest of India.",
    ],
    details: [
      "User, operation and maintenance manuals",
      "Machine and equipment documentation",
      "Technical specifications and datasheets",
      "Engineering drawings and process documents",
      "Safety data sheets (SDS) and safety instructions",
      "Installation, commissioning and service manuals",
      "Software strings, interface text and help documentation",
    ],
    sections: [
      {
        heading: "What we translate",
        items: [
          {
            heading: "Operation and maintenance manuals",
            body: "The manual someone actually uses standing at the machine. Warnings, sequences and part names have to match the equipment and the labels on it — a manual that disagrees with the control panel in front of the operator is worse than no manual.",
          },
          {
            heading: "Documentation for imported machinery",
            body: "Japanese, Korean, German and Chinese documentation rendered into English or Hindi for the team running the line, fault code tables and maintenance schedules included, so the plant is not dependent on whoever happens to read the language.",
          },
          {
            heading: "Specifications, datasheets and drawings",
            body: "Figures, tolerances, units and part numbers are treated as untouchable and verified separately from the text around them. Everything else can be rewritten; these cannot.",
          },
          {
            heading: "Safety data sheets and safety instructions",
            body: "SDS sections, hazard and precautionary statements and handling instructions, kept in the standard section order so the document stays recognisable to anyone who has to check or act on it.",
          },
        ],
      },
      {
        heading: "How a technical project runs",
        items: [
          {
            heading: "1. Scope and glossary",
            body: "We go through the file set, agree the terms for recurring parts, controls and warnings, and lock them before translation begins. This is what keeps page 4 and page 240 calling the same component by the same name.",
          },
          {
            heading: "2. Translation by field, not by availability",
            body: "Assigned by subject — machinery, electronics, automotive, chemical — because terminology that sounds plausible but is wrong is the hardest error to catch downstream, and the most expensive on a shop floor.",
          },
          {
            heading: "3. Layout rebuilt around the new text",
            body: "Callouts, captions, tables and cross-references go back where they belong, and text that expands in translation is fitted rather than left to overflow the frame it sits in.",
          },
          {
            heading: "4. Technical review and delivery",
            body: "A review pass against the source document, then delivery in the working format you sent us rather than as a flat file you have to rebuild yourself.",
          },
        ],
      },
      {
        heading: "Why technical documentation is translated differently",
        body: "Manuals get read under pressure, by someone with a machine in front of them. Three things follow from that.",
        items: [
          {
            heading: "One term, one meaning, whole document",
            body: "A component called three different things across a 200-page manual costs the reader time at exactly the moment they do not have any. Terminology is agreed once and applied everywhere, including revisions issued months later.",
          },
          {
            heading: "Layout is part of the instruction",
            body: "A callout pointing at the wrong part, a warning that has drifted onto the following page, a table that lost its header row — the words can be flawless and the page still unusable.",
          },
          {
            heading: "Compliance decides the language",
            body: "Machinery placed on the EU market has to be supplied with instructions in the official language of the country it is sold in, with the translation accompanied by the original instructions. Comparable rules apply to safety information in most export markets — cheaper to check before the shipment than after.",
          },
        ],
      },
    ],
    languagePairs: {
      heading: "Technical language pairs we handle most",
      intro: "Documentation arriving with imported equipment, and Indian technical documentation going out to export markets.",
      pairs: [
        { from: "Japanese", to: "English" },
        { from: "Korean", to: "English" },
        { from: "German", to: "English" },
        { from: "Chinese", to: "English" },
        { from: "Italian", to: "English" },
        { from: "English", to: "Hindi" },
        { from: "English", to: "German" },
        { from: "English", to: "French" },
        { from: "English", to: "Spanish" },
        { from: "English", to: "Portuguese" },
      ],
    },
    faq: [
      {
        question: "Can you keep the original formatting and layout?",
        answer:
          "Yes — that is part of the job rather than an extra. Callouts, tables, captions and cross-references are rebuilt around the translated text, and expansion is fitted to the frame. Send the editable source file where you have one; working from a flat PDF means the layout has to be reconstructed, which takes longer.",
      },
      {
        question: "How do you keep terminology consistent across a long manual?",
        answer:
          "A glossary is agreed before translation starts and applied across the whole set, then kept for later revisions so an update issued next year matches the manual already on the floor. For long documents this matters more than the elegance of any individual sentence.",
      },
      {
        question: "Do you translate software interfaces and help files?",
        answer:
          "Yes — interface strings, error messages, help documentation and release notes. Interface text is translated with its length constraints in mind, since a label that is correct but three times too long simply breaks the screen it appears on.",
      },
      {
        question: "Do you handle safety data sheets and compliance documentation?",
        answer:
          "Yes. Safety data sheets, hazard and precautionary statements, safety instructions and CE-related documentation are translated in the section structure the destination market expects, so the checker reading it finds each part where it should be.",
      },
      {
        question: "What language does my documentation legally need to be in?",
        answer:
          "For the EU, machinery must carry instructions in the official language of the member state where it is sold, and a translated manual must travel with the original instructions. Other markets set their own rules. Tell us where the product is going and we will tell you what the documentation has to cover.",
      },
      {
        question: "How is a large manual quoted and scheduled?",
        answer:
          "We look at the whole file set first — text volume, repetition, number of figures and the format it is in — and come back with a fixed quote and a delivery schedule. Long manuals can be delivered in agreed stages when a launch or installation date is driving the timeline.",
      },
    ],
    icon: "lucide:cog",
  },
  {
    slug: "business-documents",
    title: "Business Documents",
    cardDescription: "Company profiles, brochures, marketing materials, and corporate communications.",
    heading: "Business Document Translation Services in India",
    seoTitle: "Business Document Translation Services in India | TriasiaGlobal",
    subHeading:
      "Company profiles, reports, tenders, presentations and marketing material translated for businesses selling into India and Indian companies selling abroad — accurate where it must be, persuasive where it should be.",
    metaDescription:
      "Business document translation in India — company profiles, reports, tenders, presentations, marketing content and trade documents, in any language pair.",
    intro: [
      "Business translation carries a risk that is easy to miss, because nothing ever looks wrong. A brochure translated literally reads as stiff rather than incorrect, a proposal loses the register it needed, and the client on the other side quietly concludes you would be difficult to work with. Nobody writes back to tell you why.",
      "So we match the treatment to the document: contracts, financial statements and trade papers translated precisely, marketing copy rebuilt to land in the target language with the claim intact. ISO 9001:2015 and ISO 17100:2015 certified, working with companies in Delhi, Gurgaon, Noida, Mumbai, Bangalore, Punjab and Gujarat, and with exporters across the rest of India.",
    ],
    details: [
      "Company profiles, brochures and product catalogues",
      "Websites, marketing and campaign content",
      "Corporate reports, policies and internal communications",
      "Business proposals, tenders and presentations",
      "Financial statements and audit documents",
      "Import/export and trade documentation",
      "HR documents, employment contracts and training material",
    ],
    sections: [
      {
        heading: "What businesses come to us for",
        items: [
          {
            heading: "Market entry material",
            body: "Company profiles, catalogues and websites for a business opening in a new market, written so the material reads as though it was made for that audience rather than imported into it. This is where literal translation is most obviously not enough.",
          },
          {
            heading: "Tenders and proposals",
            body: "Deadline-bound, formatted to somebody else's template, and usually needing certified translations of registration and compliance documents attached. We work backwards from the submission date rather than from a comfortable one.",
          },
          {
            heading: "Corporate reporting and internal communication",
            body: "Annual reports, policies, codes of conduct and training material rolled out across offices in several languages, with terminology held consistent between them so one policy does not contradict its own translation.",
          },
          {
            heading: "Trade and export documentation",
            body: "Invoices, packing lists, certificates of origin and customs paperwork, where a discrepancy between two documents in the same consignment is enough to hold the shipment at the port.",
          },
        ],
      },
      {
        heading: "How we work with businesses",
        items: [
          {
            heading: "1. Establish the audience",
            body: "Who reads this, in which country, and to make what decision. A distributor, a regulator and a retail buyer need three genuinely different translations of the same brochure.",
          },
          {
            heading: "2. Agree terminology and tone",
            body: "Product names, taglines and internal vocabulary are settled once and reused, so this quarter's deck matches last quarter's website and neither contradicts the contract.",
          },
          {
            heading: "3. Translation and revision",
            body: "Translated into the target language by a native speaker of it, then revised by a second linguist — the two-pass method ISO 17100 sets out, and the reason the standard exists.",
          },
          {
            heading: "4. Delivered ready to use",
            body: "Back in the format you sent, laid out and usable as-is, with certified versions prepared where a bank, registrar or customs office needs one.",
          },
        ],
      },
      {
        heading: "Translate, or transcreate?",
        body: "Not every business document should be handled the same way, and choosing wrongly costs either money or credibility.",
        items: [
          {
            heading: "Translate precisely",
            body: "Contracts, financial statements, policies, technical and trade documents. Fidelity to the source is the entire job — nothing is smoothed over, nothing is improved, and the translator's opinion is not wanted.",
          },
          {
            heading: "Transcreate",
            body: "Taglines, campaigns, landing pages and anything written to persuade. The claim survives; the wording, idiom and rhythm are rebuilt, because a slogan translated word for word usually lands somewhere between flat and faintly comic.",
          },
          {
            heading: "Localise the details",
            body: "Dates, currencies, units, address formats, name order and legal disclaimers. Small things individually, and collectively the signal that tells a reader whether this document was made for them or merely sent to them.",
          },
        ],
      },
    ],
    languagePairs: {
      heading: "Business language pairs we handle most",
      intro: "The combinations that come up most on market entry, export and corporate work.",
      pairs: [
        { from: "English", to: "Japanese" },
        { from: "English", to: "Korean" },
        { from: "English", to: "Chinese" },
        { from: "English", to: "German" },
        { from: "English", to: "French" },
        { from: "English", to: "Spanish" },
        { from: "English", to: "Arabic" },
        { from: "English", to: "Portuguese" },
        { from: "English", to: "Italian" },
        { from: "Hindi", to: "English" },
      ],
    },
    faq: [
      {
        question: "Do you translate marketing copy, or only formal documents?",
        answer:
          "Both, handled differently. Formal documents are translated precisely; marketing copy is transcreated — rewritten to work in the target language while keeping the claim and the intent. Tell us which register you want and we will say if we think the document calls for the other one.",
      },
      {
        question: "Can you keep our brand terminology consistent across projects?",
        answer:
          "Yes. Product names, taglines and internal vocabulary are kept in a glossary that carries from one project to the next, so material produced months apart still agrees with itself. For companies publishing continuously, this ends up mattering more than any single translation.",
      },
      {
        question: "Are commercial documents kept confidential?",
        answer:
          "Files go only to the translator and project manager assigned to the job, are never used as samples, and we sign your NDA before receiving anything where the material is sensitive — pre-launch products, tender pricing, financial results.",
      },
      {
        question: "Can you work to a tender deadline?",
        answer:
          "Yes, and tell us the deadline when you first make contact rather than after we quote. Tenders usually combine a large document set with certified translations of registration papers, and the certification step is the one people forget to allow time for.",
      },
      {
        question: "Do you provide certified translations for banks and customs?",
        answer:
          "Yes. Financial statements, incorporation documents, trade papers and compliance records are issued with a signed certificate of accuracy, and with notarisation or MEA/Apostille attestation where the receiving institution requires it.",
      },
      {
        question: "Which languages are most in demand for Indian businesses?",
        answer:
          "Japanese, Korean, Chinese and German dominate manufacturing and engineering work; French, Spanish, Portuguese and Arabic dominate export and distribution. We translate between any two languages, so an unusual pair is a scheduling question rather than a capability one.",
      },
    ],
    icon: "lucide:building",
  },
  {
    slug: "personal-documents",
    title: "Personal Documents",
    cardDescription: "Birth certificates, marriage certificates, ID documents, and personal records.",
    heading: "Certified Personal Document Translation in India",
    seoTitle: "Personal Document Translation in India | TriasiaGlobal",
    subHeading:
      "Birth, marriage and death certificates, identity documents and police clearance certificates translated and certified for visa, immigration and government applications — in any language, with attestation arranged.",
    metaDescription:
      "Certified personal document translation in India — birth, marriage and death certificates, IDs, police clearance and visa papers, with apostille attestation.",
    intro: [
      "Personal documents are almost always attached to something with a deadline and a fee: a visa appointment, a residence application, a registration that cannot easily be rebooked. The translation is a small part of that file and one of the easiest parts to get rejected — and when it is rejected, it is nearly always over certification rather than over language.",
      "Every translation we issue carries a signed statement of accuracy naming the translator and confirming the translation is complete and correct, which is the wording immigration authorities look for. Where the destination country also wants an apostille, we arrange MEA attestation as part of the same job rather than handing the file back half-finished. We prepare visa and immigration paperwork for clients in Delhi, Gurgaon, Noida, Mumbai, Bangalore, Punjab and Gujarat, and by post everywhere else in India.",
    ],
    details: [
      "Birth and death certificates",
      "Marriage, divorce and single status certificates",
      "Passports, Aadhaar, PAN and identity documents",
      "Police clearance certificates",
      "Driving licences",
      "Visa, residence and immigration paperwork",
      "Adoption, guardianship and name change documents",
    ],
    sections: [
      {
        heading: "Documents we translate most",
        items: [
          {
            heading: "Civil records",
            body: "Birth, marriage, divorce and death certificates, translated in full — registrar stamps, seals, endorsements and anything written in the margin included. A certificate with an untranslated stamp on it is an incomplete translation, and gets treated as one.",
          },
          {
            heading: "Identity and status documents",
            body: "Passports, driving licences, Aadhaar and PAN, single status certificates and affidavits of relationship, usually needed as supporting evidence inside a larger visa or residence file.",
          },
          {
            heading: "Police clearance certificates",
            body: "Required for work visas, residence permits and PR applications, and often carrying a validity window — which makes turnaround the thing that matters most, since a certificate that expires while you wait has to be obtained again from the start.",
          },
          {
            heading: "Family and name change documents",
            body: "Adoption papers, guardianship orders, gazette notifications and affidavits of name change, where the same name has to be reproduced identically across every document in the file, including its older spellings.",
          },
        ],
      },
      {
        heading: "How your documents are handled",
        items: [
          {
            heading: "1. Send a clear scan",
            body: "A phone photo is fine as long as the full page is readable — edges, stamps and anything printed or written on the reverse. Tell us the destination country and the authority the file is going to.",
          },
          {
            heading: "2. Complete translation",
            body: "Everything on the page is carried across: seals, stamps, signatures, handwritten entries and printed footers, each marked where it appears rather than silently omitted because it is not part of the main text.",
          },
          {
            heading: "3. Certification",
            body: "A signed statement of accuracy on our letterhead, naming the translator and confirming the translation is complete and accurate — the form embassies, consulates and immigration authorities ask for.",
          },
          {
            heading: "4. Apostille or legalisation",
            body: "MEA apostille for countries in the Hague Convention, embassy legalisation for the rest. We confirm which one your destination needs before you pay for it, because paying for the wrong one is common and non-refundable.",
          },
        ],
      },
      {
        heading: "What actually gets a personal document rejected",
        body: "Language is rarely the problem. These three are.",
        items: [
          {
            heading: "Self-translated documents",
            body: "You cannot translate your own documents for an immigration file, however fluent you are, and a version from a friend or relative is refused for the same reason. The certification has to come from a translator with no stake in the application.",
          },
          {
            heading: "Partial translations",
            body: "Stamps, seals, endorsements and the small print on the back are part of the record. Leave them out and the translation no longer matches the original the officer is holding next to it.",
          },
          {
            heading: "Weak or missing certification",
            body: "USCIS, for instance, requires a complete English translation certified as complete and accurate together with the translator's certification that they are competent to translate the language. Without that statement it is not a certified translation, whatever the heading on the page claims.",
          },
        ],
      },
    ],
    languagePairs: {
      heading: "Personal document language pairs we handle most",
      intro: "Indian records going abroad for visa and immigration files, and foreign records needed in English here.",
      pairs: [
        { from: "Hindi", to: "English" },
        { from: "Punjabi", to: "English" },
        { from: "Urdu", to: "English" },
        { from: "Bengali", to: "English" },
        { from: "Tamil", to: "English" },
        { from: "Telugu", to: "English" },
        { from: "English", to: "Arabic" },
        { from: "English", to: "German" },
        { from: "English", to: "French" },
        { from: "English", to: "Spanish" },
      ],
    },
    faq: [
      {
        question: "Can I translate my own documents for a visa application?",
        answer:
          "No. Immigration authorities do not accept translations made by the applicant, and generally refuse those from family members too. The point of certification is that somebody independent of the application takes responsibility for the accuracy of the translation.",
      },
      {
        question: "What makes a translation “certified”?",
        answer:
          "A signed statement from the translator confirming the translation is complete and accurate, together with their name, credentials and contact details, attached to the translation itself. USCIS additionally wants the translator's certification that they are competent to translate the language in question. Ours carries all of it, on letterhead.",
      },
      {
        question: "Do I need an apostille as well as a translation?",
        answer:
          "Often, yes. Countries in the Hague Apostille Convention want MEA apostille on the document; others want embassy legalisation. Which comes first — translation or attestation — also varies by country, so tell us the destination before you start and we will sequence it correctly.",
      },
      {
        question: "Do you need my original documents?",
        answer:
          "For the translation, a clear scan is enough. Attestation is different: MEA and embassy procedures usually require the original or a notarised copy, and we will tell you which one applies when we confirm your destination.",
      },
      {
        question: "How long does it take?",
        answer:
          "A standard certificate is normally back within 24–48 hours, with a firm date given when we quote. Apostille and embassy legalisation add their own time and are quoted separately, since those run on government and embassy schedules rather than ours.",
      },
      {
        question: "Which personal documents do embassies ask for most?",
        answer:
          "Birth certificates, marriage certificates and police clearance certificates, followed by educational documents for work and study visas. Send the whole list of what the embassy has asked for at once — translating the set together keeps names, dates and spellings identical across every document in the file.",
      },
    ],
    icon: "lucide:file-text",
  },
];

export const serviceCategoriesBySlug: Record<string, ServiceCategory> = Object.fromEntries(
  serviceCategories.map((category) => [category.slug, category])
);

// With file-based routing, a category slugged "locations" wouldn't crash — the
// static /locations dir would silently shadow it. Fail loudly at build instead.
if (serviceCategoriesBySlug["locations"]) {
  throw new Error('"locations" is reserved for routing and cannot be used as a service category slug');
}
