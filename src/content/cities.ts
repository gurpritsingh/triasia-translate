export interface City {
  slug: string;
  name: string;
  state: string;
  stateSlug: string;
  region?: string;
  /** Optional allow-list of language slugs offered in this city. Omit to offer every language. */
  languages?: string[];
}

const maharashtraCities: City[] = [
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", stateSlug: "maharashtra", region: "Western India" },
  { slug: "pune", name: "Pune", state: "Maharashtra", stateSlug: "maharashtra", region: "Western India" },
  { slug: "nagpur", name: "Nagpur", state: "Maharashtra", stateSlug: "maharashtra", region: "Western India" },
  { slug: "nashik", name: "Nashik", state: "Maharashtra", stateSlug: "maharashtra", region: "Western India" },
];

const delhiCities: City[] = [
  { slug: "delhi", name: "Delhi", state: "Delhi", stateSlug: "delhi", region: "Northern India" },
];

const karnatakaCities: City[] = [
  { slug: "bangalore", name: "Bangalore", state: "Karnataka", stateSlug: "karnataka", region: "Southern India" },
  { slug: "mysore", name: "Mysore", state: "Karnataka", stateSlug: "karnataka", region: "Southern India" },
  { slug: "mangalore", name: "Mangalore", state: "Karnataka", stateSlug: "karnataka", region: "Southern India" },
];

const tamilNaduCities: City[] = [
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", stateSlug: "tamil-nadu", region: "Southern India" },
  { slug: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", stateSlug: "tamil-nadu", region: "Southern India" },
  { slug: "madurai", name: "Madurai", state: "Tamil Nadu", stateSlug: "tamil-nadu", region: "Southern India" },
];

const westBengalCities: City[] = [
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", stateSlug: "west-bengal", region: "Eastern India" },
];

const telanganaCities: City[] = [
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", stateSlug: "telangana", region: "Southern India" },
  { slug: "warangal", name: "Warangal", state: "Telangana", stateSlug: "telangana", region: "Southern India" },
];

const gujaratCities: City[] = [
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", stateSlug: "gujarat", region: "Western India" },
  { slug: "surat", name: "Surat", state: "Gujarat", stateSlug: "gujarat", region: "Western India" },
  { slug: "vadodara", name: "Vadodara", state: "Gujarat", stateSlug: "gujarat", region: "Western India" },
  { slug: "rajkot", name: "Rajkot", state: "Gujarat", stateSlug: "gujarat", region: "Western India" },
];

const rajasthanCities: City[] = [
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", stateSlug: "rajasthan", region: "Northern India" },
  { slug: "udaipur", name: "Udaipur", state: "Rajasthan", stateSlug: "rajasthan", region: "Northern India" },
];

const uttarPradeshCities: City[] = [
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India" },
  { slug: "greater-noida", name: "Greater Noida", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India" },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India" },
  { slug: "kanpur", name: "Kanpur", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India" },
  { slug: "agra", name: "Agra", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India" },
  { slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India" },
];

const haryanaCities: City[] = [
  { slug: "manesar", name: "Manesar", state: "Haryana", stateSlug: "haryana", region: "Northern India" },
  { slug: "gurgaon", name: "Gurgaon", state: "Haryana", stateSlug: "haryana", region: "Northern India" },
  { slug: "gurugram", name: "Gurugram", state: "Haryana", stateSlug: "haryana", region: "Northern India" },
  { slug: "faridabad", name: "Faridabad", state: "Haryana", stateSlug: "haryana", region: "Northern India" },
  { slug: "panipat", name: "Panipat", state: "Haryana", stateSlug: "haryana", region: "Northern India" },
  { slug: "ambala", name: "Ambala", state: "Haryana", stateSlug: "haryana", region: "Northern India" },
];

const himachalPradeshCities: City[] = [
  { slug: "baddi", name: "Baddi", state: "Himachal Pradesh", stateSlug: "himachal-pradesh", region: "Northern India" },
  { slug: "shimla", name: "Shimla", state: "Himachal Pradesh", stateSlug: "himachal-pradesh", region: "Northern India" },
];

const punjabCities: City[] = [
  { slug: "ludhiana", name: "Ludhiana", state: "Punjab", stateSlug: "punjab", region: "Northern India" },
  { slug: "chandigarh", name: "Chandigarh", state: "Punjab", stateSlug: "punjab", region: "Northern India" },
  { slug: "mohali", name: "Mohali", state: "Punjab", stateSlug: "punjab", region: "Northern India" },
  { slug: "amritsar", name: "Amritsar", state: "Punjab", stateSlug: "punjab", region: "Northern India" },
  { slug: "jalandhar", name: "Jalandhar", state: "Punjab", stateSlug: "punjab", region: "Northern India" },
];

const andhraPradeshCities: City[] = [
  { slug: "vijayawada", name: "Vijayawada", state: "Andhra Pradesh", stateSlug: "andhra-pradesh", region: "Southern India" },
  { slug: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", stateSlug: "andhra-pradesh", region: "Southern India" },
];

const biharCities: City[] = [
  { slug: "patna", name: "Patna", state: "Bihar", stateSlug: "bihar", region: "Eastern India" },
];

const chhattisgarhCities: City[] = [
  { slug: "raipur", name: "Raipur", state: "Chhattisgarh", stateSlug: "chhattisgarh", region: "Central India" },
];

const jharkhandCities: City[] = [
  { slug: "ranchi", name: "Ranchi", state: "Jharkhand", stateSlug: "jharkhand", region: "Eastern India" },
  { slug: "jamshedpur", name: "Jamshedpur", state: "Jharkhand", stateSlug: "jharkhand", region: "Eastern India" },
];

const keralaCities: City[] = [
  { slug: "kochi", name: "Kochi", state: "Kerala", stateSlug: "kerala", region: "Southern India" },
  { slug: "thiruvananthapuram", name: "Thiruvananthapuram", state: "Kerala", stateSlug: "kerala", region: "Southern India" },
];

const madhyaPradeshCities: City[] = [
  { slug: "bhopal", name: "Bhopal", state: "Madhya Pradesh", stateSlug: "madhya-pradesh", region: "Central India" },
  { slug: "indore", name: "Indore", state: "Madhya Pradesh", stateSlug: "madhya-pradesh", region: "Central India" },
];

const odishaCities: City[] = [
  { slug: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", stateSlug: "odisha", region: "Eastern India" },
];

const uttarakhandCities: City[] = [
  { slug: "dehradun", name: "Dehradun", state: "Uttarakhand", stateSlug: "uttarakhand", region: "Northern India" },
  { slug: "haridwar", name: "Haridwar", state: "Uttarakhand", stateSlug: "uttarakhand", region: "Northern India" },
];

const jammuAndKashmirCities: City[] = [
  { slug: "srinagar", name: "Srinagar", state: "Jammu and Kashmir", stateSlug: "jammu-and-kashmir", region: "Northern India" },
  { slug: "jammu", name: "Jammu", state: "Jammu and Kashmir", stateSlug: "jammu-and-kashmir", region: "Northern India" },
];

const ladakhCities: City[] = [
  { slug: "leh", name: "Leh", state: "Ladakh", stateSlug: "ladakh", region: "Northern India" },
];

const puducherryCities: City[] = [
  { slug: "puducherry", name: "Puducherry", state: "Puducherry", stateSlug: "puducherry", region: "Southern India" },
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

for (const reserved of ["locations", "services"]) {
  if (citiesBySlug[reserved]) {
    throw new Error(`"${reserved}" is reserved for routing and cannot be used as a city slug`);
  }
}
