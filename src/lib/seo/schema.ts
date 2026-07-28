export const SITE_URL = "https://integrafin.tax";

export const SCHEMA_IDS = {
  organization: `${SITE_URL}/#organization`,
  localBusiness: `${SITE_URL}/#localbusiness`,
  website: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
  homepage: `${SITE_URL}/#webpage`,
} as const;

export const organizationRef = { "@id": SCHEMA_IDS.organization } as const;
export const localBusinessRef = { "@id": SCHEMA_IDS.localBusiness } as const;
export const websiteRef = { "@id": SCHEMA_IDS.website } as const;

const organizationSchema = {
  "@type": "Organization",
  "@id": SCHEMA_IDS.organization,
  name: "IntegraFin Tax & Accounting",
  alternateName: "IntegraFin",
  legalName: "IntegraFin LLC",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    "@id": SCHEMA_IDS.logo,
    url: `${SITE_URL}/logo.svg`,
    contentUrl: `${SITE_URL}/logo.svg`,
    caption: "IntegraFin Tax & Accounting",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-832-647-1819",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: "English",
  },
  sameAs: ["https://www.linkedin.com/company/integrafin/"],
};

const localBusinessSchema = {
  "@type": ["AccountingService", "LocalBusiness"],
  "@id": SCHEMA_IDS.localBusiness,
  name: "IntegraFin Tax & Accounting",
  legalName: "IntegraFin LLC",
  url: `${SITE_URL}/`,
  telephone: "+1-832-647-1819",
  email: "contact@integrafin.tax",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2039 N Mason Rd, Suite 604",
    addressLocality: "Katy",
    addressRegion: "TX",
    postalCode: "77449",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 29.7858,
    longitude: -95.8244,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IntegraFin tax and accounting services",
    itemListElement: [
      ["Small Business Tax Accountant Katy", "/business-tax-accounting"],
      ["Individual Tax Preparation Katy TX", "/individual-tax-preparation"],
      ["Tax Resolution Katy TX", "/tax-resolution"],
      ["Payroll Tax Support", "/payroll-tax-support"],
      ["Bookkeeping Services Katy TX", "/texas/katy-bookkeeping-services"],
      ["QuickBooks Cleanup Katy TX", "/quickbooks-bookkeeping-services"],
      ["LLC Tax Setup Texas", "/llc-formation-tax-setup"],
    ].map(([name, path]) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        url: `${SITE_URL}${path}`,
      },
    })),
  },
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "Katy" },
    { "@type": "City", name: "Houston" },
    { "@type": "City", name: "Sugar Land" },
    { "@type": "City", name: "Cypress" },
    { "@type": "City", name: "Richmond" },
    { "@type": "AdministrativeArea", name: "Fort Bend County" },
    { "@type": "AdministrativeArea", name: "Texas" },
    { "@type": "Country", name: "United States" },
  ],
  parentOrganization: organizationRef,
  sameAs: ["https://www.linkedin.com/company/integrafin/"],
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": SCHEMA_IDS.website,
  url: `${SITE_URL}/`,
  name: "IntegraFin Tax & Accounting",
  alternateName: "IntegraFin",
  publisher: organizationRef,
  inLanguage: "en-US",
};

export const rootSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, localBusinessSchema, websiteSchema],
};

export const homepageWebPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": SCHEMA_IDS.homepage,
  url: `${SITE_URL}/`,
  name: "Katy Tax and Accounting Firm | IntegraFin Tax & Accounting",
  description:
    "IntegraFin is a Katy tax and accounting firm helping businesses and families with tax preparation, bookkeeping, payroll records, IRS notice help, and year-round support.",
  isPartOf: websiteRef,
  about: localBusinessRef,
  mainEntity: localBusinessRef,
  inLanguage: "en-US",
};

export function buildWebPageSchema({
  url,
  name,
  description,
  mainEntityId,
  type = "WebPage",
}: {
  url: string;
  name: string;
  description?: string;
  mainEntityId?: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    ...(description ? { description } : {}),
    isPartOf: websiteRef,
    about: localBusinessRef,
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
    inLanguage: "en-US",
  };
}

export function buildBreadcrumbSchema(
  url: string,
  items: readonly { name: string; item: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function buildFaqSchema(
  url: string,
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    isPartOf: { "@id": `${url}#webpage` },
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
