const SITE_URL = "https://www.unicorntechnologiess.com";

// Shared address/geo block — reused across schema types so the NAP
// (Name, Address, Phone) data is 100% consistent everywhere it appears.
// Consistent NAP across the site + citations (Google Business Profile,
// Justdial, Sulekha, etc.) is one of the strongest local-SEO ranking signals.
const address = {
  "@type": "PostalAddress",
  streetAddress: "382, Near Trikoni Park, Shankar Nagar",
  addressLocality: "Nagpur",
  addressRegion: "Maharashtra",
  postalCode: "440010",
  addressCountry: "IN",
};

const geo = {
  "@type": "GeoCoordinates",
  latitude: 21.1614,
  longitude: 79.0768,
};

// Cities/areas we want to rank in — used as `areaServed` on LocalBusiness
// and again on the individual Service entries below.
const areaServed = [
  { "@type": "City", name: "Nagpur" },
  { "@type": "State", name: "Maharashtra" },
];

export const Organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Unicorn Technologies",
  legalName: "Unicorn Technologies",
  description:
    "Unicorn Technologies is a Nagpur-based software company specializing in website development, mobile app development, and custom software for startups and enterprises.",
  url: SITE_URL,
  logo: `${SITE_URL}/assest/logo.png`,
  image: `${SITE_URL}/assest/logo.png`,
  email: "narendra@unicorntechnologiess.com",
  telephone: "+91-9921224567",
  address,
  // Add live social profile URLs here as they go live — helps Google
  // connect the entity across the web (Knowledge Panel signal).
  sameAs: [] as string[],
};

export const WebSite = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Unicorn Technologies",
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

// LocalBusiness (extended as ProfessionalService) is what actually powers
// Google's local pack / Maps results for "web development in Nagpur"
// style queries — this is the most important addition for local ranking.
export const ProfessionalService = {
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Unicorn Technologies",
  image: `${SITE_URL}/assest/logo.png`,
  url: SITE_URL,
  telephone: "+91-9921224567",
  email: "narendra@unicorntechnologiess.com",
  priceRange: "₹₹",
  address,
  geo,
  areaServed,
  hasMap: "https://www.google.com/maps?q=Trikoni+Park+Shankar+Nagar+Nagpur",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  serviceType: [
    "Website Development",
    "Mobile App Development",
    "Digital Marketing",
    "Custom Software Development",
  ],
  // OfferCatalog lets each service line up with its own landing page,
  // reinforcing the exact-match keywords we target on-page.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Development in Nagpur",
          url: `${SITE_URL}/website-development-in-nagpur`,
          areaServed,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "App Development in Nagpur",
          url: `${SITE_URL}/app-development-in-nagpur`,
          areaServed,
        },
      },
    ],
  },
};

// Builds FAQPage schema from a plain [{question, answer}] list. Import and
// call this on any page that renders an on-page FAQ (see the two new
// Nagpur landing pages) so the FAQs are eligible for rich results.
export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Builds BreadcrumbList schema for a page given its trail.
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
