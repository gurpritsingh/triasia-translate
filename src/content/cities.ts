export interface City {
  slug: string;
  name: string;
  state: string;
  stateSlug: string;
  region?: string;
  /** Optional allow-list of language slugs offered in this city. Omit to offer every language. */
  languages?: string[];
}

export const cities: City[] = [
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", stateSlug: "maharashtra", region: "Western India" },
  { slug: "delhi", name: "Delhi", state: "Delhi", stateSlug: "delhi", region: "Northern India" },
  { slug: "bangalore", name: "Bangalore", state: "Karnataka", stateSlug: "karnataka", region: "Southern India" },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", stateSlug: "tamil-nadu", region: "Southern India" },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", stateSlug: "west-bengal", region: "Eastern India" },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", stateSlug: "telangana", region: "Southern India" },
  { slug: "pune", name: "Pune", state: "Maharashtra", stateSlug: "maharashtra", region: "Western India" },
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", stateSlug: "gujarat", region: "Western India" },
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", stateSlug: "rajasthan", region: "Northern India" },
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", stateSlug: "uttar-pradesh", region: "Northern India" },
];

export const citiesBySlug: Record<string, City> = Object.fromEntries(
  cities.map((city) => [city.slug, city])
);

for (const reserved of ["locations", "services"]) {
  if (citiesBySlug[reserved]) {
    throw new Error(`"${reserved}" is reserved for routing and cannot be used as a city slug`);
  }
}
