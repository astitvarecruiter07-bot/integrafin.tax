export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["AccountingService", "LocalBusiness"],
  "@id": "https://integrafin.tax/#localbusiness",
  "name": "IntegraFin Tax & Accounting",
  "legalName": "IntegraFin LLC",
  "url": "https://integrafin.tax/",
  "telephone": "+1-832-647-1819",
  "email": "contact@integrafin.tax",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2039 N Mason Rd, Suite 604",
    "addressLocality": "Katy",
    "addressRegion": "TX",
    "postalCode": "77449",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 29.7858,
    "longitude": -95.8244
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tax & Accounting Services Katy TX",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Tax & Accounting Katy TX" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Individual Tax Preparation Katy TX" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IRS Tax Resolution Katy TX" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Payroll Services Katy TX" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bookkeeping Services Katy TX" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "New Business Consultation Katy TX" }}
    ]
  },
  "priceRange": "$$",
  "areaServed": ["Katy TX", "Houston TX", "Sugar Land TX", "Cypress TX", "Richmond TX"],
  "parentOrganization": {
    "@id": "https://integrafin.tax/#organization"
  },
  "sameAs": [
    "https://www.linkedin.com/company/integrafin/"
  ]
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://integrafin.tax/#organization",
  "name": "IntegraFin Tax & Accounting",
  "alternateName": "IntegraFin",
  "legalName": "IntegraFin LLC",
  "url": "https://integrafin.tax/",
  "logo": "https://integrafin.tax/logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-832-647-1819",
    "contactType": "customer service",
    "areaServed": "US",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.linkedin.com/company/integrafin/"
  ]
};

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Form a New Business in Texas",
  "description": "A general overview of entity review, registration, EIN, bookkeeping, payroll, and tax setup steps for a new Texas business.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Entity Selection",
      "text": "Review ownership, operations, expected income, tax treatment, and legal considerations before choosing a structure. The appropriate entity depends on the business facts and may require legal advice."
    },
    {
      "@type": "HowToStep",
      "name": "State Registration",
      "text": "File the necessary formation documents with the Texas Secretary of State and local regulators to gain legal recognition."
    },
    {
      "@type": "HowToStep",
      "name": "EIN and Tax Setup",
      "text": "Obtain an Employer Identification Number (EIN) from the IRS and set up payroll, bookkeeping, and state tax accounts."
    }
  ]
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a tax expert cost in Katy TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fees depend on the returns, entities, periods, record condition, deadlines, and services involved. IntegraFin reviews the requested work before providing scope and pricing information. Call (832) 647-1819 to discuss the initial details."
      }
    },
    {
      "@type": "Question",
      "name": "What documents do I need for tax filing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common records include W-2 and 1099 forms, the prior-year return, dependent information, deduction support, estimated-payment records, bank records for relevant business activity, and investment forms such as 1099-DIV or 1099-B. The final list depends on the return and taxpayer facts."
      }
    },
    {
      "@type": "Question",
      "name": "Does IntegraFin help with IRS audits in Katy TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IntegraFin can review IRS correspondence, compare it with the relevant return and records, and explain the next documentation and response steps. The assistance available depends on the notice, the facts, and the agreed engagement scope."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer bookkeeping services for small businesses in Katy TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IntegraFin offers bookkeeping support for small businesses in Katy. Scope may include account setup, transaction classification, reconciliations, review questions, financial reports, cleanup, and QuickBooks support, depending on the records and written engagement."
      }
    },
    {
      "@type": "Question",
      "name": "Can IntegraFin help me resolve back taxes with the IRS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IntegraFin can review back-tax notices, filing history, balances, payment records, and supporting documents, then explain procedures that may be relevant. Payment plans, penalty relief, offers, representation, and agency outcomes depend on eligibility, facts, authorization, and IRS approval."
      }
    }
  ]
};

export const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why choose IntegraFin for tax expert services in Katy TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IntegraFin provides Katy-area tax preparation, bookkeeping, payroll-record support, planning discussions, and IRS notice review. Each engagement is scoped from the records, deadlines, taxpayer facts, and professional authorization; refunds, savings, compliance, and agency outcomes are not guaranteed."
      }
    },
    {
      "@type": "Question",
      "name": "How can I schedule a free consultation with your accountants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can schedule a free consultation by filling out our online form or calling (832) 647-1819 during business hours. Our team will review your financial situation and outline practical next steps without any obligation to file."
      }
    },
    {
      "@type": "Question",
      "name": "What types of businesses do you specialize in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IntegraFin's service pages address bookkeeping and tax workflows that can arise in real estate, construction, healthcare, professional services, retail, technology, and other businesses. The available work depends on the entity, records, filing history, and agreed scope."
      }
    },
    {
      "@type": "Question",
      "name": "What cities in Texas do your tax expert services serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IntegraFin is based in Katy and serves clients in nearby communities including Houston, Sugar Land, Cypress, and Richmond. Many engagements can use remote meetings and an organized document process; the available service depends on the work and client location."
      }
    }
  ]
};
