import { assertCityFacts } from "./validators/cityFacts";
import { assertNoBannedPhrases } from "./validators/prose";

/** Closed vocabulary — every rendered sentence about a city's economy is composed from
 *  these values, never from free-text inference. Add a value here (and its prose frame in
 *  the content engine) before using it on a city; never invent a one-off descriptor. */
export type CityTrait =
  | "metro"
  | "state-capital"
  | "union-territory-capital"
  | "it-services-hub"
  | "manufacturing-cluster"
  | "port-city"
  | "university-city"
  | "border-trade"
  | "administrative-centre"
  | "pharma-cluster"
  | "textile-cluster"
  | "tourism-economy";

export interface City {
  slug: string;
  name: string;
  state: string;
  stateSlug: string;
  region?: string;
  /** Optional allow-list of language slugs offered in this city. Omit to offer every language. */
  languages?: string[];
  /** Real, verifiable local industries — used only to explain which documents this
   *  city's businesses and residents typically need translated. Omit rather than guess. */
  industries: string[];
  /** Named localities/business districts — only added when independently verifiable. */
  notableAreas?: string[];
  /** Subset of serviceCategories.ts slugs this city's economy disproportionately needs. */
  documentFocus: string[];
  /** One factual clause about the city's economy, used as translation-need context (never
   *  rendered as standalone city trivia). */
  economicNote: string;
  /** Closed-enum descriptors driving section-frame selection without free-text inference. */
  cityTraits: CityTrait[];
  /** Real, well-documented emigration/diaspora corridors — omit unless genuinely well known. */
  emigrationCorridors?: string[];
  verifiedOn?: string;
}

const maharashtraCities: City[] = [
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    stateSlug: "maharashtra",
    region: "Western India",
    industries: ["financial services and banking", "media and entertainment", "international trade and shipping"],
    notableAreas: ["Bandra", "Andheri", "South Mumbai"],
    documentFocus: ["business-documents", "legal-document-translation", "personal-documents"],
    economicNote: "India's financial capital and a major port and media city",
    cityTraits: ["metro", "port-city"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    stateSlug: "maharashtra",
    region: "Western India",
    industries: ["information technology and software services", "automotive and auto-component manufacturing", "higher education"],
    notableAreas: ["Hinjewadi", "Kharadi", "Baner"],
    documentFocus: ["technical-manuals", "business-documents", "educational-certificates"],
    economicNote: "a major IT and automotive manufacturing hub, and one of India's largest student cities",
    cityTraits: ["it-services-hub", "manufacturing-cluster", "university-city"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "nagpur",
    name: "Nagpur",
    state: "Maharashtra",
    stateSlug: "maharashtra",
    region: "Western India",
    industries: ["logistics and warehousing", "trading and distribution", "orange and agricultural trade"],
    documentFocus: ["business-documents", "personal-documents"],
    economicNote: "a logistics and cargo hub at the geographic centre of India",
    cityTraits: ["administrative-centre"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "nashik",
    name: "Nashik",
    state: "Maharashtra",
    stateSlug: "maharashtra",
    region: "Western India",
    industries: ["wine and grape cultivation", "manufacturing", "agriculture and agro-processing"],
    documentFocus: ["business-documents", "personal-documents"],
    economicNote: "known for its vineyards and a growing manufacturing base",
    cityTraits: ["manufacturing-cluster", "tourism-economy"],
    verifiedOn: "2026-08-18",
  },
];

const delhiCities: City[] = [
  {
    slug: "delhi",
    name: "Delhi",
    state: "Delhi",
    stateSlug: "delhi",
    region: "Northern India",
    industries: ["government administration", "trade and professional services", "corporate headquarters"],
    documentFocus: ["government-paperwork", "business-documents", "legal-document-translation"],
    economicNote: "India's national capital and a major administrative and commercial centre",
    cityTraits: ["metro", "state-capital", "administrative-centre"],
    verifiedOn: "2026-08-18",
  },
];

const karnatakaCities: City[] = [
  {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    stateSlug: "karnataka",
    region: "Southern India",
    industries: ["information technology and software services", "biotechnology", "aerospace"],
    documentFocus: ["technical-manuals", "business-documents", "educational-certificates"],
    economicNote: "home to one of India's largest concentrations of technology and startup companies",
    cityTraits: ["metro", "state-capital", "it-services-hub"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "mysore",
    name: "Mysore",
    state: "Karnataka",
    stateSlug: "karnataka",
    region: "Southern India",
    industries: ["heritage tourism", "IT and electronics manufacturing", "sandalwood and silk crafts"],
    documentFocus: ["personal-documents", "educational-certificates"],
    economicNote: "a heritage and tourism city with a growing electronics-manufacturing base",
    cityTraits: ["tourism-economy", "university-city"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "mangalore",
    name: "Mangalore",
    state: "Karnataka",
    stateSlug: "karnataka",
    region: "Southern India",
    industries: ["port operations and shipping", "petrochemicals and refining", "banking and financial services"],
    documentFocus: ["business-documents", "personal-documents"],
    economicNote: "Karnataka's main port city and a banking centre",
    cityTraits: ["port-city"],
    verifiedOn: "2026-08-18",
  },
];

const tamilNaduCities: City[] = [
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    region: "Southern India",
    industries: ["automotive manufacturing", "IT and business services", "port operations"],
    documentFocus: ["technical-manuals", "business-documents", "personal-documents"],
    economicNote: "a major automotive-manufacturing hub and port city, often called the 'Detroit of India'",
    cityTraits: ["metro", "state-capital", "manufacturing-cluster", "port-city"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "coimbatore",
    name: "Coimbatore",
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    region: "Southern India",
    industries: ["textile machinery and pump manufacturing", "engineering and foundry work", "textiles and garments"],
    documentFocus: ["technical-manuals", "business-documents", "educational-certificates"],
    economicNote: "a long-established engineering and textile-machinery manufacturing centre",
    cityTraits: ["manufacturing-cluster", "university-city"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "madurai",
    name: "Madurai",
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    region: "Southern India",
    industries: ["textiles and garments", "agriculture and agro-processing", "heritage tourism"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "a historic temple city and regional trading centre",
    cityTraits: ["tourism-economy", "textile-cluster"],
    verifiedOn: "2026-08-18",
  },
];

const westBengalCities: City[] = [
  {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    stateSlug: "west-bengal",
    region: "Eastern India",
    industries: ["jute and textiles", "trade and commerce", "engineering and manufacturing"],
    documentFocus: ["business-documents", "personal-documents", "legal-document-translation"],
    economicNote: "a historic trading and manufacturing hub in eastern India",
    cityTraits: ["metro", "state-capital", "port-city"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "siliguri",
    name: "Siliguri",
    state: "West Bengal",
    stateSlug: "west-bengal",
    region: "Eastern India",
    industries: ["trade and logistics", "tea trade", "tourism gateway to the Himalayas and North East"],
    documentFocus: ["business-documents", "personal-documents"],
    economicNote: "a key trade and logistics gateway connecting eastern India, Nepal, Bhutan and the North East",
    cityTraits: ["border-trade"],
    verifiedOn: "2026-08-18",
  },
];

const telanganaCities: City[] = [
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    stateSlug: "telangana",
    region: "Southern India",
    industries: ["information technology and software services", "pharmaceuticals and biotechnology", "aerospace"],
    documentFocus: ["technical-manuals", "business-documents", "educational-certificates"],
    economicNote: "a major IT and pharmaceutical hub known as India's 'Genome Valley'",
    cityTraits: ["metro", "state-capital", "it-services-hub", "pharma-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "warangal",
    name: "Warangal",
    state: "Telangana",
    stateSlug: "telangana",
    region: "Southern India",
    industries: ["textiles", "agriculture and agro-processing", "granite and mineral trade"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "a historic administrative and trading centre in Telangana",
    cityTraits: ["administrative-centre"],
    verifiedOn: "2026-08-18",
  },
];

const gujaratCities: City[] = [
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    stateSlug: "gujarat",
    region: "Western India",
    industries: ["textile manufacturing", "chemicals and pharmaceuticals", "trade and commerce"],
    documentFocus: ["business-documents", "technical-manuals", "personal-documents"],
    economicNote: "Gujarat's largest city and a long-established textile and chemicals manufacturing centre",
    cityTraits: ["metro", "manufacturing-cluster", "textile-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "surat",
    name: "Surat",
    state: "Gujarat",
    stateSlug: "gujarat",
    region: "Western India",
    industries: ["diamond cutting and polishing", "textile and synthetic fabric manufacturing", "trade and exports"],
    notableAreas: ["Ring Road", "Varachha"],
    documentFocus: ["business-documents", "personal-documents"],
    economicNote: "a global center of diamond processing and textile manufacturing, with a large trading and NRI community",
    cityTraits: ["manufacturing-cluster", "textile-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "vadodara",
    name: "Vadodara",
    state: "Gujarat",
    stateSlug: "gujarat",
    region: "Western India",
    industries: ["petrochemicals and engineering", "pharmaceuticals", "public sector manufacturing"],
    documentFocus: ["technical-manuals", "business-documents"],
    economicNote: "a major petrochemical and engineering manufacturing centre",
    cityTraits: ["manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "rajkot",
    name: "Rajkot",
    state: "Gujarat",
    stateSlug: "gujarat",
    region: "Western India",
    industries: ["engineering and auto-parts manufacturing", "brass and metal industries", "trade and commerce"],
    documentFocus: ["business-documents", "technical-manuals"],
    economicNote: "a hub for small and medium engineering and auto-parts manufacturing",
    cityTraits: ["manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "gandhinagar",
    name: "Gandhinagar",
    state: "Gujarat",
    stateSlug: "gujarat",
    region: "Western India",
    industries: ["government administration", "IT and electronics manufacturing", "renewable energy"],
    documentFocus: ["government-paperwork", "business-documents"],
    economicNote: "Gujarat's planned state capital and an emerging IT and electronics hub",
    cityTraits: ["state-capital", "administrative-centre"],
    verifiedOn: "2026-08-18",
  },
];

const rajasthanCities: City[] = [
  {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    stateSlug: "rajasthan",
    region: "Northern India",
    industries: ["tourism and hospitality", "handicrafts and gemstones", "textiles"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "Rajasthan's capital and a major heritage-tourism destination",
    cityTraits: ["state-capital", "tourism-economy"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "jodhpur",
    name: "Jodhpur",
    state: "Rajasthan",
    stateSlug: "rajasthan",
    region: "Northern India",
    industries: ["handicrafts and textiles", "tourism and hospitality", "stone and marble processing"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "a heritage-tourism city and handicraft-manufacturing centre in western Rajasthan",
    cityTraits: ["tourism-economy"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    stateSlug: "rajasthan",
    region: "Northern India",
    industries: ["tourism and hospitality", "marble and mineral processing", "handicrafts"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "a heritage-tourism city known for its lakes and palaces",
    cityTraits: ["tourism-economy"],
    verifiedOn: "2026-08-18",
  },
];

const uttarPradeshCities: City[] = [
  {
    slug: "lucknow",
    name: "Lucknow",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    region: "Northern India",
    industries: ["government administration", "handicrafts (chikankari embroidery)", "trade and services"],
    documentFocus: ["government-paperwork", "personal-documents"],
    economicNote: "Uttar Pradesh's capital and an administrative and handicraft centre",
    cityTraits: ["state-capital", "administrative-centre"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "greater-noida",
    name: "Greater Noida",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    region: "Northern India",
    industries: ["manufacturing", "IT and electronics", "higher education"],
    documentFocus: ["technical-manuals", "business-documents", "educational-certificates"],
    economicNote: "a planned industrial and education city in the National Capital Region",
    cityTraits: ["manufacturing-cluster", "university-city"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "noida",
    name: "Noida",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    region: "Northern India",
    industries: ["IT and business process services", "electronics and mobile-handset manufacturing", "media and broadcasting"],
    documentFocus: ["business-documents", "technical-manuals", "personal-documents"],
    economicNote: "a planned industrial and services city in the National Capital Region",
    cityTraits: ["it-services-hub", "manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "kanpur",
    name: "Kanpur",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    region: "Northern India",
    industries: ["leather manufacturing and exports", "textiles", "engineering"],
    documentFocus: ["business-documents", "technical-manuals"],
    economicNote: "a long-established leather-manufacturing and textile centre",
    cityTraits: ["manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    region: "Northern India",
    industries: ["silk weaving and handicrafts", "religious tourism", "trade and commerce"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "one of India's oldest cities and a major pilgrimage and handicraft centre",
    cityTraits: ["tourism-economy", "textile-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    region: "Northern India",
    industries: ["leather and footwear manufacturing", "tourism and hospitality", "handicrafts (marble inlay)"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "home to the Taj Mahal and a major tourism and leather-manufacturing centre",
    cityTraits: ["tourism-economy", "manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "ghaziabad",
    name: "Ghaziabad",
    state: "Uttar Pradesh",
    stateSlug: "uttar-pradesh",
    region: "Northern India",
    industries: ["manufacturing", "engineering", "trade and logistics"],
    documentFocus: ["business-documents", "technical-manuals"],
    economicNote: "an industrial city in the National Capital Region",
    cityTraits: ["manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
];

const haryanaCities: City[] = [
  {
    slug: "manesar",
    name: "Manesar",
    state: "Haryana",
    stateSlug: "haryana",
    region: "Northern India",
    industries: ["automotive manufacturing", "auto-component manufacturing", "industrial estates"],
    documentFocus: ["technical-manuals", "business-documents"],
    economicNote: "a major automotive and auto-component manufacturing hub",
    cityTraits: ["manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "gurgaon",
    name: "Gurgaon",
    state: "Haryana",
    stateSlug: "haryana",
    region: "Northern India",
    industries: ["IT and business process services", "corporate headquarters", "automotive manufacturing"],
    documentFocus: ["business-documents", "technical-manuals", "personal-documents"],
    economicNote: "a major corporate and IT-services hub in the National Capital Region",
    cityTraits: ["it-services-hub", "manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "gurugram",
    name: "Gurugram",
    state: "Haryana",
    stateSlug: "haryana",
    region: "Northern India",
    industries: ["IT and business process services", "corporate headquarters", "automotive manufacturing"],
    documentFocus: ["business-documents", "technical-manuals", "personal-documents"],
    economicNote: "a major corporate and IT-services hub in the National Capital Region",
    cityTraits: ["it-services-hub", "manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "faridabad",
    name: "Faridabad",
    state: "Haryana",
    stateSlug: "haryana",
    region: "Northern India",
    industries: ["manufacturing and engineering", "auto-component manufacturing", "trade and logistics"],
    documentFocus: ["business-documents", "technical-manuals"],
    economicNote: "an industrial city in the National Capital Region",
    cityTraits: ["manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "panipat",
    name: "Panipat",
    state: "Haryana",
    stateSlug: "haryana",
    region: "Northern India",
    industries: ["textile manufacturing (handloom and power loom)", "trade and logistics", "agriculture"],
    documentFocus: ["business-documents", "personal-documents"],
    economicNote: "known as India's 'textile city' for its handloom and power-loom industry",
    cityTraits: ["textile-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "ambala",
    name: "Ambala",
    state: "Haryana",
    stateSlug: "haryana",
    region: "Northern India",
    industries: ["scientific and surgical instrument manufacturing", "trade and commerce", "agriculture"],
    documentFocus: ["business-documents", "technical-manuals"],
    economicNote: "known for its scientific-instrument manufacturing industry",
    cityTraits: ["manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
];

const himachalPradeshCities: City[] = [
  {
    slug: "baddi",
    name: "Baddi",
    state: "Himachal Pradesh",
    stateSlug: "himachal-pradesh",
    region: "Northern India",
    industries: ["pharmaceutical manufacturing", "industrial estates", "FMCG manufacturing"],
    documentFocus: ["technical-manuals", "business-documents"],
    economicNote: "one of India's largest pharmaceutical-manufacturing hubs",
    cityTraits: ["pharma-cluster", "manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "shimla",
    name: "Shimla",
    state: "Himachal Pradesh",
    stateSlug: "himachal-pradesh",
    region: "Northern India",
    industries: ["tourism and hospitality", "government administration", "horticulture"],
    documentFocus: ["personal-documents", "government-paperwork"],
    economicNote: "Himachal Pradesh's capital and a major hill-station tourism destination",
    cityTraits: ["state-capital", "tourism-economy"],
    verifiedOn: "2026-08-18",
  },
];

const punjabCities: City[] = [
  {
    slug: "ludhiana",
    name: "Ludhiana",
    state: "Punjab",
    stateSlug: "punjab",
    region: "Northern India",
    industries: ["hosiery and knitwear manufacturing", "bicycle and bicycle-parts manufacturing", "auto components"],
    documentFocus: ["business-documents", "personal-documents", "technical-manuals"],
    economicNote: "Punjab's largest industrial city and a long-standing textile and light-engineering cluster",
    cityTraits: ["manufacturing-cluster", "textile-cluster"],
    emigrationCorridors: ["Canada", "the United Kingdom", "Australia"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    state: "Punjab",
    stateSlug: "punjab",
    region: "Northern India",
    industries: ["government administration", "IT and business services", "education"],
    documentFocus: ["government-paperwork", "business-documents", "educational-certificates"],
    economicNote: "the shared capital of Punjab and Haryana, and a planned administrative city",
    cityTraits: ["union-territory-capital", "administrative-centre", "university-city"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "mohali",
    name: "Mohali",
    state: "Punjab",
    stateSlug: "punjab",
    region: "Northern India",
    industries: ["IT and business process services", "pharmaceuticals", "electronics manufacturing"],
    documentFocus: ["business-documents", "technical-manuals"],
    economicNote: "an emerging IT and pharmaceutical-manufacturing hub near Chandigarh",
    cityTraits: ["it-services-hub", "pharma-cluster"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    stateSlug: "punjab",
    region: "Northern India",
    industries: ["Golden Temple pilgrimage tourism", "agriculture and food processing", "border trade"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "a major pilgrimage and trade city with a large overseas Punjabi diaspora",
    cityTraits: ["tourism-economy", "border-trade"],
    emigrationCorridors: ["Canada", "the United Kingdom", "Australia"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "jalandhar",
    name: "Jalandhar",
    state: "Punjab",
    stateSlug: "punjab",
    region: "Northern India",
    industries: ["sports-goods manufacturing", "leather goods", "agriculture"],
    documentFocus: ["business-documents", "personal-documents"],
    economicNote: "known for its sports-goods manufacturing industry and large emigrant population",
    cityTraits: ["manufacturing-cluster"],
    emigrationCorridors: ["Canada", "the United Kingdom", "Australia"],
    verifiedOn: "2026-08-18",
  },
];

const andhraPradeshCities: City[] = [
  {
    slug: "vijayawada",
    name: "Vijayawada",
    state: "Andhra Pradesh",
    stateSlug: "andhra-pradesh",
    region: "Southern India",
    industries: ["agriculture and agro-processing", "trade and logistics", "government administration"],
    documentFocus: ["business-documents", "personal-documents"],
    economicNote: "a major trading and logistics centre on the Krishna river",
    cityTraits: ["administrative-centre"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "visakhapatnam",
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    stateSlug: "andhra-pradesh",
    region: "Southern India",
    industries: ["port operations and shipping", "steel and heavy industry", "petrochemicals and refining", "shipbuilding"],
    documentFocus: ["technical-manuals", "business-documents", "real-estate-documents"],
    economicNote: "Andhra Pradesh's largest port city and its main heavy-industry centre",
    cityTraits: ["port-city", "manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
];

const arunachalPradeshCities: City[] = [
  {
    slug: "itanagar",
    name: "Itanagar",
    state: "Arunachal Pradesh",
    stateSlug: "arunachal-pradesh",
    region: "North Eastern India",
    industries: ["government administration", "horticulture", "tourism and hospitality"],
    documentFocus: ["government-paperwork", "personal-documents"],
    economicNote: "Arunachal Pradesh's capital, with an economy centred on administration and horticulture",
    cityTraits: ["state-capital", "administrative-centre"],
    verifiedOn: "2026-08-18",
  },
];

const assamCities: City[] = [
  {
    slug: "guwahati",
    name: "Guwahati",
    state: "Assam",
    stateSlug: "assam",
    region: "North Eastern India",
    industries: ["tea trade and processing", "regional trade and distribution", "government administration", "healthcare and education services"],
    documentFocus: ["government-paperwork", "personal-documents", "educational-certificates"],
    economicNote: "the largest city in the North East and its main commercial and administrative gateway",
    cityTraits: ["administrative-centre", "border-trade"],
    verifiedOn: "2026-08-18",
  },
];

const biharCities: City[] = [
  {
    slug: "patna",
    name: "Patna",
    state: "Bihar",
    stateSlug: "bihar",
    region: "Eastern India",
    industries: ["government administration", "agriculture and food processing", "trade and commerce"],
    documentFocus: ["government-paperwork", "personal-documents"],
    economicNote: "Bihar's capital and its main administrative and trading centre",
    cityTraits: ["state-capital", "administrative-centre"],
    verifiedOn: "2026-08-18",
  },
];

const chhattisgarhCities: City[] = [
  {
    slug: "raipur",
    name: "Raipur",
    state: "Chhattisgarh",
    stateSlug: "chhattisgarh",
    region: "Central India",
    industries: ["steel and mining", "power generation", "agriculture and agro-processing"],
    documentFocus: ["business-documents", "technical-manuals"],
    economicNote: "Chhattisgarh's capital and a major steel and power-generation centre",
    cityTraits: ["state-capital", "manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
];

const goaCities: City[] = [
  {
    slug: "panaji",
    name: "Panaji",
    state: "Goa",
    stateSlug: "goa",
    region: "Western India",
    industries: ["tourism and hospitality", "mining and mineral exports", "pharmaceuticals"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "Goa's capital and a coastal tourism destination",
    cityTraits: ["state-capital", "tourism-economy"],
    verifiedOn: "2026-08-18",
  },
];

const jharkhandCities: City[] = [
  {
    slug: "ranchi",
    name: "Ranchi",
    state: "Jharkhand",
    stateSlug: "jharkhand",
    region: "Eastern India",
    industries: ["mining-sector administration", "government administration", "heavy engineering"],
    documentFocus: ["government-paperwork", "business-documents"],
    economicNote: "Jharkhand's capital, in a mineral-rich industrial state",
    cityTraits: ["state-capital", "administrative-centre"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "jamshedpur",
    name: "Jamshedpur",
    state: "Jharkhand",
    stateSlug: "jharkhand",
    region: "Eastern India",
    industries: ["steel manufacturing", "heavy engineering", "automotive components"],
    documentFocus: ["technical-manuals", "business-documents"],
    economicNote: "India's first planned industrial city, built around its steel industry",
    cityTraits: ["manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
];

const keralaCities: City[] = [
  {
    slug: "kochi",
    name: "Kochi",
    state: "Kerala",
    stateSlug: "kerala",
    region: "Southern India",
    industries: ["port operations and shipping", "IT and business services", "seafood and spice exports", "tourism and hospitality"],
    documentFocus: ["business-documents", "personal-documents", "government-paperwork"],
    economicNote: "Kerala's main port and commercial centre",
    cityTraits: ["port-city", "it-services-hub", "tourism-economy"],
    emigrationCorridors: ["the United Arab Emirates", "Saudi Arabia", "Qatar"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "thiruvananthapuram",
    name: "Thiruvananthapuram",
    state: "Kerala",
    stateSlug: "kerala",
    region: "Southern India",
    industries: ["government administration", "IT and software services", "space and technology research"],
    documentFocus: ["government-paperwork", "business-documents", "educational-certificates"],
    economicNote: "Kerala's capital and a growing IT and technology-research hub",
    cityTraits: ["state-capital", "it-services-hub"],
    emigrationCorridors: ["the United Arab Emirates", "Saudi Arabia", "Qatar"],
    verifiedOn: "2026-08-18",
  },
];

const madhyaPradeshCities: City[] = [
  {
    slug: "bhopal",
    name: "Bhopal",
    state: "Madhya Pradesh",
    stateSlug: "madhya-pradesh",
    region: "Central India",
    industries: ["government administration", "manufacturing", "education"],
    documentFocus: ["government-paperwork", "business-documents"],
    economicNote: "Madhya Pradesh's capital and an administrative and industrial centre",
    cityTraits: ["state-capital", "administrative-centre"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "indore",
    name: "Indore",
    state: "Madhya Pradesh",
    stateSlug: "madhya-pradesh",
    region: "Central India",
    industries: ["textile and pharmaceutical manufacturing", "trade and commerce", "IT services"],
    documentFocus: ["business-documents", "technical-manuals", "personal-documents"],
    economicNote: "Madhya Pradesh's largest city and its main commercial and manufacturing centre",
    cityTraits: ["manufacturing-cluster", "pharma-cluster"],
    verifiedOn: "2026-08-18",
  },
];

const manipurCities: City[] = [
  {
    slug: "imphal",
    name: "Imphal",
    state: "Manipur",
    stateSlug: "manipur",
    region: "North Eastern India",
    industries: ["handloom and handicrafts", "agriculture", "border trade with Myanmar"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "Manipur's capital, with a strong handloom and handicraft tradition",
    cityTraits: ["state-capital", "border-trade"],
    verifiedOn: "2026-08-18",
  },
];

const meghalayaCities: City[] = [
  {
    slug: "shillong",
    name: "Shillong",
    state: "Meghalaya",
    stateSlug: "meghalaya",
    region: "North Eastern India",
    industries: ["coal and mineral trade", "tourism and hospitality", "education"],
    documentFocus: ["personal-documents", "educational-certificates"],
    economicNote: "Meghalaya's capital and a hill-station tourism and education centre",
    cityTraits: ["state-capital", "tourism-economy"],
    verifiedOn: "2026-08-18",
  },
];

const mizoramCities: City[] = [
  {
    slug: "aizawl",
    name: "Aizawl",
    state: "Mizoram",
    stateSlug: "mizoram",
    region: "North Eastern India",
    industries: ["horticulture", "bamboo-based industries", "border trade with Myanmar"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "Mizoram's capital, with an economy centred on horticulture and bamboo-based industries",
    cityTraits: ["state-capital", "border-trade"],
    verifiedOn: "2026-08-18",
  },
];

const nagalandCities: City[] = [
  {
    slug: "kohima",
    name: "Kohima",
    state: "Nagaland",
    stateSlug: "nagaland",
    region: "North Eastern India",
    industries: ["agriculture and horticulture", "handloom and handicrafts", "tourism and hospitality"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "Nagaland's capital, with an economy centred on agriculture and handicrafts",
    cityTraits: ["state-capital", "tourism-economy"],
    verifiedOn: "2026-08-18",
  },
];

const odishaCities: City[] = [
  {
    slug: "bhubaneswar",
    name: "Bhubaneswar",
    state: "Odisha",
    stateSlug: "odisha",
    region: "Eastern India",
    industries: ["government administration", "IT and software services", "mining-sector administration"],
    documentFocus: ["government-paperwork", "business-documents", "educational-certificates"],
    economicNote: "Odisha's capital and a growing IT-services hub",
    cityTraits: ["state-capital", "it-services-hub"],
    verifiedOn: "2026-08-18",
  },
];

const sikkimCities: City[] = [
  {
    slug: "gangtok",
    name: "Gangtok",
    state: "Sikkim",
    stateSlug: "sikkim",
    region: "North Eastern India",
    industries: ["tourism and hospitality", "hydropower", "organic agriculture"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "Sikkim's capital and a Himalayan tourism destination",
    cityTraits: ["state-capital", "tourism-economy"],
    verifiedOn: "2026-08-18",
  },
];

const tripuraCities: City[] = [
  {
    slug: "agartala",
    name: "Agartala",
    state: "Tripura",
    stateSlug: "tripura",
    region: "North Eastern India",
    industries: ["agriculture and rubber cultivation", "border trade with Bangladesh", "handloom"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "Tripura's capital, with strong trade and cultural ties to Bangladesh",
    cityTraits: ["state-capital", "border-trade"],
    verifiedOn: "2026-08-18",
  },
];

const uttarakhandCities: City[] = [
  {
    slug: "dehradun",
    name: "Dehradun",
    state: "Uttarakhand",
    stateSlug: "uttarakhand",
    region: "Northern India",
    industries: ["education and research institutions", "pharmaceutical and industrial manufacturing", "tourism and hospitality"],
    documentFocus: ["educational-certificates", "government-paperwork", "business-documents"],
    economicNote: "Uttarakhand's capital and a major education and research centre",
    cityTraits: ["state-capital", "university-city"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "haridwar",
    name: "Haridwar",
    state: "Uttarakhand",
    stateSlug: "uttarakhand",
    region: "Northern India",
    industries: ["pharmaceutical and industrial manufacturing", "religious tourism", "agriculture"],
    documentFocus: ["personal-documents", "technical-manuals"],
    economicNote: "a major pilgrimage city and industrial-manufacturing centre",
    cityTraits: ["tourism-economy", "manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
];

const jammuAndKashmirCities: City[] = [
  {
    slug: "srinagar",
    name: "Srinagar",
    state: "Jammu and Kashmir",
    stateSlug: "jammu-and-kashmir",
    region: "Northern India",
    industries: ["handicrafts and handlooms (Kashmiri shawls, carpets)", "horticulture (apples, saffron)", "tourism and hospitality"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "Jammu and Kashmir's summer capital, known for its handicrafts and horticulture",
    cityTraits: ["union-territory-capital", "tourism-economy"],
    verifiedOn: "2026-08-18",
  },
  {
    slug: "jammu",
    name: "Jammu",
    state: "Jammu and Kashmir",
    stateSlug: "jammu-and-kashmir",
    region: "Northern India",
    industries: ["government administration", "trade and logistics", "small-scale manufacturing"],
    documentFocus: ["government-paperwork", "personal-documents"],
    economicNote: "Jammu and Kashmir's winter capital and a trade and logistics centre",
    cityTraits: ["union-territory-capital", "administrative-centre"],
    verifiedOn: "2026-08-18",
  },
];

const ladakhCities: City[] = [
  {
    slug: "leh",
    name: "Leh",
    state: "Ladakh",
    stateSlug: "ladakh",
    region: "Northern India",
    industries: ["high-altitude tourism", "handicrafts", "agriculture and horticulture"],
    documentFocus: ["personal-documents", "government-paperwork"],
    economicNote: "Ladakh's capital, with an economy centred on high-altitude tourism",
    cityTraits: ["union-territory-capital", "tourism-economy"],
    verifiedOn: "2026-08-18",
  },
];

const puducherryCities: City[] = [
  {
    slug: "puducherry",
    name: "Puducherry",
    state: "Puducherry",
    stateSlug: "puducherry",
    region: "Southern India",
    industries: ["tourism and hospitality", "manufacturing", "trade and commerce"],
    documentFocus: ["personal-documents", "business-documents"],
    economicNote: "a coastal Union Territory with a French colonial heritage and a tourism-driven economy",
    cityTraits: ["union-territory-capital", "tourism-economy"],
    verifiedOn: "2026-08-18",
  },
];

const andamanAndNicobarCities: City[] = [
  {
    slug: "port-blair",
    name: "Port Blair",
    state: "Andaman and Nicobar Islands",
    stateSlug: "andaman-and-nicobar-islands",
    region: "Southern India",
    industries: ["tourism and hospitality", "fisheries", "government administration"],
    documentFocus: ["personal-documents", "government-paperwork"],
    economicNote: "the capital of the Andaman and Nicobar Islands, with an economy centred on tourism and fisheries",
    cityTraits: ["union-territory-capital", "tourism-economy"],
    verifiedOn: "2026-08-18",
  },
];

const lakshadweepCities: City[] = [
  {
    slug: "kavaratti",
    name: "Kavaratti",
    state: "Lakshadweep",
    stateSlug: "lakshadweep",
    region: "Southern India",
    industries: ["fisheries", "coconut and coir products", "tourism and hospitality"],
    documentFocus: ["personal-documents", "government-paperwork"],
    economicNote: "the capital of Lakshadweep, a small island territory with an economy centred on fisheries",
    cityTraits: ["union-territory-capital"],
    verifiedOn: "2026-08-18",
  },
];

const dadraAndNagarHaveliCities: City[] = [
  {
    slug: "daman",
    name: "Daman",
    state: "Dadra and Nagar Haveli and Daman and Diu",
    stateSlug: "dadra-and-nagar-haveli-and-daman-and-diu",
    region: "Western India",
    industries: ["manufacturing", "tourism and hospitality", "fisheries"],
    documentFocus: ["business-documents", "personal-documents"],
    economicNote: "a small industrial Union Territory on the Gujarat coast",
    cityTraits: ["union-territory-capital", "manufacturing-cluster"],
    verifiedOn: "2026-08-18",
  },
];

export const cities: City[] = [
  ...maharashtraCities,
  ...delhiCities,
  ...karnatakaCities,
  ...tamilNaduCities,
  ...westBengalCities,
  ...telanganaCities,
  ...gujaratCities,
  ...rajasthanCities,
  ...uttarPradeshCities,
  ...haryanaCities,
  ...himachalPradeshCities,
  ...punjabCities,
  ...andhraPradeshCities,
  ...arunachalPradeshCities,
  ...assamCities,
  ...biharCities,
  ...chhattisgarhCities,
  ...goaCities,
  ...jharkhandCities,
  ...keralaCities,
  ...madhyaPradeshCities,
  ...manipurCities,
  ...meghalayaCities,
  ...mizoramCities,
  ...nagalandCities,
  ...odishaCities,
  ...sikkimCities,
  ...tripuraCities,
  ...uttarakhandCities,
  ...jammuAndKashmirCities,
  ...ladakhCities,
  ...puducherryCities,
  ...andamanAndNicobarCities,
  ...lakshadweepCities,
  ...dadraAndNagarHaveliCities,
];

export const citiesBySlug: Record<string, City> = Object.fromEntries(
  cities.map((city) => [city.slug, city])
);

for (const reserved of ["locations", "services"]) {
  if (citiesBySlug[reserved]) {
    throw new Error(`"${reserved}" is reserved for routing and cannot be used as a city slug`);
  }
}

assertCityFacts(cities);

assertNoBannedPhrases(
  cities.flatMap((city) => [
    { field: `${city.slug}.economicNote`, text: city.economicNote },
    ...city.industries.map((industry, i) => ({ field: `${city.slug}.industries[${i}]`, text: industry })),
  ])
);
