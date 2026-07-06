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
};

// wa.me needs digits-only, country code first — derived from `phone` so the two never drift apart.
export const whatsappUrl = `https://wa.me/${business.phone.replace(/\D/g, "")}`;
