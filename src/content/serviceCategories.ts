import { FileText, GraduationCap, Scale, Building, Stethoscope, Cog, type LucideIcon } from "lucide-react";

export interface ServiceCategory {
  slug: string;
  title: string;
  cardDescription: string;
  heading: string;
  subHeading: string;
  details: string[];
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "legal-document-translation",
    title: "Legal Document Translation",
    cardDescription: "Contracts, agreements, court documents, and legal certificates with certified accuracy.",
    heading: "Certified Legal Document Translation Services",
    subHeading:
      "Triasia Global provides government-authorized legal document translation for contracts, agreements, court documents, and affidavits. Our certified legal translators ensure precise legal terminology, accepted by courts, government offices, and embassies across India.",
    details: [
      "Contracts and agreements",
      "Court documents and affidavits",
      "Power of attorney",
      "Property and legal certificates",
      "Notarized and apostille-ready translations",
    ],
    icon: Scale,
    color: "text-korean-red",
    bgColor: "bg-korean-red/10",
  },
  {
    slug: "educational-certificates",
    title: "Educational Certificates",
    cardDescription: "Academic transcripts, degrees, diplomas, and educational credentials.",
    heading: "Educational Certificate Translation Services",
    subHeading:
      "From academic transcripts to degrees and diplomas, Triasia Global delivers certified translations of educational credentials accepted by universities, embassies, and immigration authorities — ideal for admissions, visa applications, and credential evaluation.",
    details: [
      "Degree certificates and diplomas",
      "Academic transcripts and mark sheets",
      "School leaving certificates",
      "Migration certificates",
      "Credential evaluation reports",
    ],
    icon: GraduationCap,
    color: "text-chinese-gold",
    bgColor: "bg-chinese-gold/10",
  },
  {
    slug: "medical-documents",
    title: "Medical Documents",
    cardDescription: "Medical reports, prescriptions, health certificates, and clinical documentation.",
    heading: "Medical Document Translation Services",
    subHeading:
      "Triasia Global's medical translators combine linguistic accuracy with clinical terminology expertise to translate medical reports, prescriptions, and health certificates — critical for insurance claims, second opinions, and international treatment.",
    details: [
      "Medical reports and discharge summaries",
      "Prescriptions and lab reports",
      "Health and vaccination certificates",
      "Insurance and clinical documentation",
      "Pharmaceutical and clinical trial documents",
    ],
    icon: Stethoscope,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    slug: "technical-manuals",
    title: "Technical Manuals",
    cardDescription: "User manuals, technical specifications, engineering documents, and product guides.",
    heading: "Technical Manual & Documentation Translation",
    subHeading:
      "We translate user manuals, technical specifications, and engineering documentation with precision, ensuring complex technical terminology is rendered accurately for manufacturing, engineering, and product teams operating across languages.",
    details: [
      "User and instruction manuals",
      "Technical specifications and datasheets",
      "Engineering and product documentation",
      "Safety data sheets (SDS)",
      "Software and hardware documentation",
    ],
    icon: Cog,
    color: "text-korean-blue",
    bgColor: "bg-korean-blue/10",
  },
  {
    slug: "business-documents",
    title: "Business Documents",
    cardDescription: "Company profiles, brochures, marketing materials, and corporate communications.",
    heading: "Business Document Translation Services",
    subHeading:
      "Triasia Global helps businesses communicate confidently across markets with certified translation of company profiles, brochures, marketing materials, and corporate communications tailored to your industry and audience.",
    details: [
      "Company profiles and brochures",
      "Marketing and promotional material",
      "Corporate communications and reports",
      "Business proposals and presentations",
      "Import/export and trade documentation",
    ],
    icon: Building,
    color: "text-accent-foreground",
    bgColor: "bg-accent/20",
  },
  {
    slug: "personal-documents",
    title: "Personal Documents",
    cardDescription: "Birth certificates, marriage certificates, ID documents, and personal records.",
    heading: "Personal Document Translation Services",
    subHeading:
      "From birth and marriage certificates to ID documents and personal records, Triasia Global provides certified personal document translation accepted by visa, immigration, and government authorities.",
    details: [
      "Birth and marriage certificates",
      "Passport and ID documents",
      "Divorce and death certificates",
      "Visa and immigration documents",
      "Police clearance certificates",
    ],
    icon: FileText,
    color: "text-muted-foreground",
    bgColor: "bg-muted/20",
  },
];

export const serviceCategoriesBySlug: Record<string, ServiceCategory> = Object.fromEntries(
  serviceCategories.map((category) => [category.slug, category])
);

if (serviceCategoriesBySlug["locations"]) {
  throw new Error('"locations" is reserved for the /locations route and cannot be used as a service category slug');
}
