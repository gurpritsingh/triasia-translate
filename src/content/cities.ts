export interface City {
  slug: string;
  name: string;
  state: string;
  stateSlug: string;
  region?: string;
  /** Optional allow-list of language slugs offered in this city. Omit to offer every language. */
  languages?: string[];
  /**
   * Slug of the city this one is an alias of — same physical place under a
   * different name (Gurugram/Gurgaon). Alias cities still generate pages so
   * their URLs keep resolving, but every canonical points at the target and
   * they are kept out of the sitemap, so Google consolidates the two sets
   * instead of treating them as duplicates.
   */
  aliasOf?: string;
}

const maharashtraCities: City[] = [
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", stateSlug: "maharashtra", region: "Western India", languages: ["korean", "japanese", "chinese", "arabic", "hindi", "german", "polish"] },
  { slug: "pune", name: "Pune", state: "Maharashtra", stateSlug: "maharashtra", region: "Western India", languages: ["korean", "chinese", "japanese", "tamil", "urdu", "arabic"] },
  { slug: "nagpur", name: "Nagpur", state: "Maharashtra", stateSlug: "maharashtra", region: "Western India", languages: ["korean", "chinese", "japanese"] },
  { slug: "nashik", name: "Nashik", state: "Maharashtra", stateSlug: "maharashtra", region: "Western India", languages: ["korean", "chinese", "japanese", "spanish"] },
];

const delhiCities: City[] = [
  { slug: "delhi", name: "Delhi", state: "Delhi", stateSlug: "delhi", region: "Northern India" },
];

const karnatakaCities: City[] = [
  { slug: "bangalore", name: "Bangalore", state: "Karnataka", stateSlug: "karnataka", region: "Southern India", languages: ["chinese", "japanese", "korean", "tamil", "telugu", "german", "arabic"] },
  { slug: "mysore", name: "Mysore", state: "Karnataka", stateSlug: "karnataka", region: "Southern India", languages: ["korean", "chinese", "japanese"] },
  { slug: "mangalore", name: "Mangalore", state: "Karnataka", stateSlug: "karnataka", region: "Southern India", languages: ["korean", "chinese", "japanese"] },
];

const tamilNaduCities: City[] = [
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", stateSlug: "tamil-nadu", region: "Southern India", languages: ["korean", "chinese", "japanese", "tamil", "hindi"] },
  { slug: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", stateSlug: "tamil-nadu", region: "Southern India", languages: ["korean", "chinese", "japanese", "tamil", "telugu"] },
  { slug: "madurai", name: "Madurai", state: "Tamil Nadu", stateSlug: "tamil-nadu", region: "Southern India", languages: ["korean", "chinese", "japanese", "spanish"] },
];

const westBengalCities: City[] = [
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", stateSlug: "west-bengal", region: "Eastern India" },
];

const telanganaCities: City[] = [
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", stateSlug: "telangana", region: "Southern India", languages: ["korean", "chinese", "japanese", "german", "spanish"] },
  { slug: "warangal", name: "Warangal", state: "Telangana", stateSlug: "telangana", region: "Southern India", languages: ["korean", "chinese", "japanese"] },
];

const gujaratCities: City[] = [
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", stateSlug: "gujarat", region: "Western India", languages: ["korean", "chinese", "japanese"] },
  { slug: "surat", name: "Surat", state: "Gujarat", stateSlug: "gujarat", region: "Western India", languages: ["korean", "chinese", "japanese"] },
  { slug: "vadodara", name: "Vadodara", state: "Gujarat", stateSlug: "gujarat", region: "Western India", languages: ["korean", "chinese", "japanese"] },
  { slug: "rajkot", name: "Rajkot", state: "Gujarat", stateSlug: "gujarat", region: "Western India", languages: ["korean", "chinese", "japanese"] },
];

const rajasthanCities: City[] = [
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", stateSlug: "rajasthan", region: "Northern India", languages: ["korean", "chinese", "japanese"] },
  { slug: "udaipur", name: "Udaipur", state: "Rajasthan", stateSlug: "rajasthan", region: "Northern India", languages: ["korean", "chinese", "japanese", "german"] },
];

const uttarPradeshCities: City[] = [
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India", languages: ["korean", "chinese", "japanese", "hindi", "punjabi"] },
  { slug: "greater-noida", name: "Greater Noida", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India" },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India" },
  { slug: "kanpur", name: "Kanpur", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India", languages: ["korean", "chinese", "japanese"] },
  { slug: "agra", name: "Agra", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India", languages: ["korean", "chinese", "japanese"] },
  { slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India" },
];

const haryanaCities: City[] = [
  { slug: "manesar", name: "Manesar", state: "Haryana", stateSlug: "haryana", region: "Northern India" },
  { slug: "gurgaon", name: "Gurgaon", state: "Haryana", stateSlug: "haryana", region: "Northern India" },
  { slug: "gurugram", name: "Gurugram", state: "Haryana", stateSlug: "haryana", region: "Northern India", aliasOf: "gurgaon" },
  { slug: "faridabad", name: "Faridabad", state: "Haryana", stateSlug: "haryana", region: "Northern India" },
  { slug: "panipat", name: "Panipat", state: "Haryana", stateSlug: "haryana", region: "Northern India", languages: ["korean", "chinese", "japanese", "hindi", "punjabi", "urdu", "arabic", "french", "german", "spanish", "portuguese", "bulgarian", "italian", "polish"] },
  { slug: "ambala", name: "Ambala", state: "Haryana", stateSlug: "haryana", region: "Northern India", languages: ["korean", "chinese", "japanese", "hindi", "punjabi", "urdu", "arabic", "french", "german", "spanish", "portuguese", "bulgarian", "italian", "polish", "czech"] },
];

const himachalPradeshCities: City[] = [
  { slug: "baddi", name: "Baddi", state: "Himachal Pradesh", stateSlug: "himachal-pradesh", region: "Northern India", languages: ["korean", "chinese", "japanese"] },
  { slug: "shimla", name: "Shimla", state: "Himachal Pradesh", stateSlug: "himachal-pradesh", region: "Northern India", languages: [] },
];

const punjabCities: City[] = [
  { slug: "ludhiana", name: "Ludhiana", state: "Punjab", stateSlug: "punjab", region: "Northern India", languages: ["korean", "chinese", "japanese", "hindi", "punjabi", "urdu", "arabic", "french", "german", "spanish", "portuguese", "bulgarian", "italian", "czech", "polish"] },
  { slug: "chandigarh", name: "Chandigarh", state: "Punjab", stateSlug: "punjab", region: "Northern India", languages: ["korean", "chinese", "japanese", "hindi", "punjabi", "urdu", "arabic", "french", "german", "spanish", "portuguese", "bulgarian", "italian", "czech", "polish"] },
  { slug: "mohali", name: "Mohali", state: "Punjab", stateSlug: "punjab", region: "Northern India", languages: ["korean", "chinese", "japanese", "hindi", "punjabi", "urdu", "arabic", "french", "german", "spanish", "portuguese", "bulgarian", "italian", "czech", "polish"] },
  { slug: "amritsar", name: "Amritsar", state: "Punjab", stateSlug: "punjab", region: "Northern India", languages: ["korean", "chinese", "japanese", "hindi", "punjabi", "urdu", "arabic", "french", "german", "spanish", "portuguese", "bulgarian", "italian", "czech", "polish", "danish"] },
  { slug: "jalandhar", name: "Jalandhar", state: "Punjab", stateSlug: "punjab", region: "Northern India", languages: ["korean", "chinese", "japanese", "hindi", "punjabi", "urdu", "arabic", "french", "german", "spanish", "portuguese", "bulgarian", "italian", "czech", "polish"] },
];

const andhraPradeshCities: City[] = [
  { slug: "vijayawada", name: "Vijayawada", state: "Andhra Pradesh", stateSlug: "andhra-pradesh", region: "Southern India", languages: ["chinese", "japanese", "korean", "hindi", "arabic", "spanish", "telugu"] },
  { slug: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", stateSlug: "andhra-pradesh", region: "Southern India", languages: ["chinese", "japanese", "korean", "telugu"] },
];

const biharCities: City[] = [
  { slug: "patna", name: "Patna", state: "Bihar", stateSlug: "bihar", region: "Eastern India", languages: ["chinese", "japanese", "korean", "hindi"] },
];

const chhattisgarhCities: City[] = [
  { slug: "raipur", name: "Raipur", state: "Chhattisgarh", stateSlug: "chhattisgarh", region: "Central India", languages: ["chinese", "japanese", "korean"] },
];

const jharkhandCities: City[] = [
  { slug: "ranchi", name: "Ranchi", state: "Jharkhand", stateSlug: "jharkhand", region: "Eastern India", languages: ["chinese", "japanese", "korean"] },
  { slug: "jamshedpur", name: "Jamshedpur", state: "Jharkhand", stateSlug: "jharkhand", region: "Eastern India", languages: ["chinese", "japanese", "korean", "german"] },
];

const keralaCities: City[] = [
  { slug: "kochi", name: "Kochi", state: "Kerala", stateSlug: "kerala", region: "Southern India", languages: ["chinese", "japanese", "korean", "german", "spanish", "portuguese"] },
  { slug: "thiruvananthapuram", name: "Thiruvananthapuram", state: "Kerala", stateSlug: "kerala", region: "Southern India", languages: ["chinese", "japanese", "korean"] },
];

const madhyaPradeshCities: City[] = [
  { slug: "bhopal", name: "Bhopal", state: "Madhya Pradesh", stateSlug: "madhya-pradesh", region: "Central India", languages: ["chinese", "japanese", "korean", "hindi", "german"] },
  { slug: "indore", name: "Indore", state: "Madhya Pradesh", stateSlug: "madhya-pradesh", region: "Central India", languages: ["chinese", "japanese", "korean"] },
];

const odishaCities: City[] = [
  { slug: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", stateSlug: "odisha", region: "Eastern India", languages: ["chinese", "japanese", "korean"] },
];

const uttarakhandCities: City[] = [
  { slug: "dehradun", name: "Dehradun", state: "Uttarakhand", stateSlug: "uttarakhand", region: "Northern India", languages: ["chinese", "japanese", "korean", "german", "spanish"] },
  { slug: "haridwar", name: "Haridwar", state: "Uttarakhand", stateSlug: "uttarakhand", region: "Northern India", languages: ["chinese", "japanese", "korean"] },
];

const jammuAndKashmirCities: City[] = [
  { slug: "srinagar", name: "Srinagar", state: "Jammu and Kashmir", stateSlug: "jammu-and-kashmir", region: "Northern India", languages: ["chinese", "japanese", "korean"] },
  { slug: "jammu", name: "Jammu", state: "Jammu and Kashmir", stateSlug: "jammu-and-kashmir", region: "Northern India", languages: ["chinese", "japanese", "korean"] },
];

const ladakhCities: City[] = [
  { slug: "leh", name: "Leh", state: "Ladakh", stateSlug: "ladakh", region: "Northern India", languages: ["chinese", "japanese", "korean"] },
];

const puducherryCities: City[] = [
  { slug: "puducherry", name: "Puducherry", state: "Puducherry", stateSlug: "puducherry", region: "Southern India", languages: ["chinese", "japanese", "korean", "german", "spanish", "french", "italian"] },
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
  ...biharCities,
  ...chhattisgarhCities,
  ...jharkhandCities,
  ...keralaCities,
  ...madhyaPradeshCities,
  ...odishaCities,
  ...uttarakhandCities,
  ...jammuAndKashmirCities,
  ...ladakhCities,
  ...puducherryCities,
];

export const citiesBySlug: Record<string, City> = Object.fromEntries(
  cities.map((city) => [city.slug, city])
);

// An alias whose target is missing — or which offers a language the target
// doesn't — would emit a canonical pointing at a URL that has no page, which is
// worse than the duplication it's meant to fix. Fail the build instead.
for (const city of cities) {
  if (!city.aliasOf) continue;
  const target = citiesBySlug[city.aliasOf];
  if (!target) {
    throw new Error(`City "${city.slug}" aliases "${city.aliasOf}", which is not a known city`);
  }
  if (target.aliasOf) {
    throw new Error(`City "${city.slug}" aliases "${target.slug}", which is itself an alias`);
  }
  const targetLanguages = target.languages;
  const missing = (city.languages ?? []).filter(
    (slug) => targetLanguages && !targetLanguages.includes(slug)
  );
  if (city.languages && missing.length) {
    throw new Error(
      `City "${city.slug}" offers ${missing.join(", ")} but its alias target "${target.slug}" does not — ` +
        `those pages would canonicalise to a URL that is never generated`
    );
  }
  if (!city.languages && targetLanguages) {
    throw new Error(
      `City "${city.slug}" offers every language but its alias target "${target.slug}" is restricted — ` +
        `some pages would canonicalise to a URL that is never generated`
    );
  }
}

for (const reserved of ["locations", "services"]) {
  if (citiesBySlug[reserved]) {
    throw new Error(`"${reserved}" is reserved for routing and cannot be used as a city slug`);
  }
}
