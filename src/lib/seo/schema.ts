export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["AccountingService", "LocalBusiness"],
  "name": "IntegraFin Tax & Accounting",
  "url": "https://integrafin.tax",
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
  "sameAs": [
    "https://www.facebook.com/integrafintax/",
    "https://www.instagram.com/integrafinllc/",
    "https://www.linkedin.com/company/integrafin/?viewAsMember=true",
    "https://x.com/Integrafintax",
    "https://www.yelp.com/biz/integrafin"
  ]
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "IntegraFin",
  "alternateName": "IntegraFin Tax & Accounting",
  "url": "https://integrafin.tax",
  "logo": "https://integrafin.tax/logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-832-647-1819",
    "contactType": "customer service",
    "areaServed": "US",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.facebook.com/integrafintax/",
    "https://www.instagram.com/integrafinllc/",
    "https://www.linkedin.com/company/integrafin/?viewAsMember=true",
    "https://x.com/Integrafintax",
    "https://www.yelp.com/biz/integrafin"
  ]
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "IntegraFin Tax Expert Team",
  "jobTitle": "Tax Expert",
  "worksFor": {
    "@type": "Organization",
    "name": "IntegraFin Tax & Accounting"
  },
  "alumniOf": "Texas Board of Public Accountancy",
  "url": "https://integrafin.tax/about"
};

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Form a New Business in Texas",
  "description": "A step-by-step guide to entity selection and registration for new businesses in Texas, managed by tax experts.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Entity Selection",
      "text": "Choose the optimal business structure (LLC, S-Corp, or C-Corp) to minimize liability and maximize tax efficiency."
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
        "text": "The cost of a tax expert in Katy, TX typically ranges from $150 to $400 for individual tax returns, and $500 to $2,000+ for business returns based on complexity. IntegraFin offers flat-rate, transparent pricing. Call (832) 647-1819 for a free quote."
      }
    },
    {
      "@type": "Question",
      "name": "What documents do I need for tax filing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You need your W-2 or 1099 forms, last year's tax return, Social Security numbers for dependents, receipts for deductions, bank statements, and investment income documents like 1099-DIV or 1099-B to properly file your taxes."
      }
    },
    {
      "@type": "Question",
      "name": "Does IntegraFin help with IRS audits in Katy TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, IntegraFin provides full IRS audit representation in Katy, TX. Our licensed tax experts communicate directly with audit officers on your behalf to review discrepancies, prepare defense documentation, and negotiate settlements to minimize your overall tax liability."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer bookkeeping services for small businesses in Katy TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, IntegraFin offers full-service monthly bookkeeping for small businesses in Katy, TX. This includes bank integrations, detailed financial statements, and QuickBooks support to keep your business audit-ready and help identify cost-saving opportunities."
      }
    },
    {
      "@type": "Question",
      "name": "Can IntegraFin help me resolve back taxes with the IRS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our tax resolution specialists in Katy help you negotiate back taxes with the IRS. We can design structured installment agreements, file penalty abatement requests, or explore Offer in Compromise settlements to protect against liens and levies."
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
        "text": "IntegraFin offers high-level accounting, strategic tax planning, and full IRS representation for businesses and individuals in Katy, TX. We guarantee accurate tax preparation, maximum legally allowed refunds, and ongoing compliance to help you safely scale your wealth."
      }
    },
    {
      "@type": "Question",
      "name": "How can I schedule a free consultation with your accountants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can schedule a free consultation by filling out our online form or calling (832) 647-1819. Available 24/7, our team will analyze your financial situation and instantly project potential tax savings without any obligation to file."
      }
    },
    {
      "@type": "Question",
      "name": "What types of businesses do you specialize in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We specialize in providing accounting and tax services for technology startups, real estate asset managers, healthcare practice centers, and manufacturing plants. We offer corporate entity structuring, monthly bookkeeping, and R&D tax credits to accelerate capital growth."
      }
    },
    {
      "@type": "Question",
      "name": "What cities in Texas do your tax expert services serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Based in Katy, our tax expert services serve all surrounding areas like Houston, Sugar Land, Cypress, and Richmond. Our secure online tax portal also allows us to effectively manage tax compliance and advisory for clients located anywhere in Texas."
      }
    }
  ]
};
