export const business = {
  name: "TriasiaGlobal",
  phone: "+91-9958-403-494",
  email: "triasiaglobal@gmail.com",
  address: {
    streetAddress: "Tagore Garden",
    addressLocality: "New Delhi",
    postalCode: "110027",
    addressCountry: "IN",
  },
  siteUrl: "https://www.triasiaglobal.com",
  certifyingBody: "RCS Cert",
  certifications: [
    {
      standard: "ISO 9001:2015",
      name: "Quality Management System",
      description:
        "Certified quality management system, ensuring consistent, well-documented processes across every project.",
      icon: "lucide:badge-check",
    },
    {
      standard: "ISO 17100:2025",
      name: "Translation Services",
      description:
        "The international standard specific to translation providers, covering translator qualifications, project management, and quality control.",
      icon: "lucide:shield-check",
    },
  ],
};

// wa.me needs digits-only, country code first — derived from `phone` so the two never drift apart.
export const whatsappUrl = `https://wa.me/${business.phone.replace(/\D/g, "")}`;
