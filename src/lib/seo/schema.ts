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
    "https://www.facebook.com/integrafin",
    "https://www.linkedin.com/company/integrafin",
    "https://www.yelp.com/biz/integrafin"
  ]
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a CPA cost in Katy TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CPA fees in Katy TX typically range from $150 to $400 for individual tax returns and $500 to $2,000+ for business returns depending on complexity. IntegraFin offers competitive, transparent pricing. Contact us at (832) 647-1819 for a free quote."
      }
    },
    {
      "@type": "Question",
      "name": "What documents do I need for tax filing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You will need your W-2 or 1099 forms, last year's tax return, Social Security numbers for all family members, receipts for business or personal deductions, bank statements, and any investment income documents such as 1099-DIV or 1099-B."
      }
    },
    {
      "@type": "Question",
      "name": "Does IntegraFin help with IRS audits in Katy TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. IntegraFin provides full IRS audit representation for individuals and businesses in Katy, TX, and the greater Houston area. Our licensed CPAs communicate directly with audit officers on your behalf to defend your filings correctly. We review discrepancies, prepare defense documentation, and negotiate settlements to minimize overall liability successfully."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer bookkeeping services for small businesses in Katy TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. IntegraFin offers full-service monthly bookkeeping for small businesses in Katy, TX, including bank integrations, reconciliations, detailed financial statement modeling, and QuickBooks or Xero support setup. Our professional oversight ensures your accounts remain audit-ready year-round while revealing critical cost-saving potentials and capital flow efficiency gains back to your operations."
      }
    },
    {
      "@type": "Question",
      "name": "Can IntegraFin help me resolve back taxes with the IRS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Our tax resolution specialists in Katy help you negotiate with the IRS for back taxes. We design structured installment agreements, file penalty abatement requests, and explore Offer in Compromise settlements based on your situation. Call (832) 647-1819 today for direct protection against liens, levies, and continuous back tax stress."
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
      "name": "Why choose IntegraFin for CPA services in Katy TX?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "IntegraFin provides high-level accounting oversight, transparent modeling, and strategic tax planning tailored for growth-focused SMEs and high-net-worth individuals in Katy. We guarantee 100% accurate file handling, maximum legally allowed refunds, and dedicated IRS representation, ensuring your business scaling remains compliant with full audit-ready security year-round."
      }
    },
    {
      "@type": "Question",
      "name": "How can I schedule a free consultation with your accountants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can schedule a free online review or offline consultation by filling out our contact form or calling (832) 647-1819 immediately. Our staff is available 24/7 to secure your session. During this rapid consultation, we analyze your current bracket and project your potential tax savings instantly without any obligation to file."
      }
    },
    {
      "@type": "Question",
      "name": "What types of businesses do you specialize in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We specialize in technology startups, real estate asset managers, healthcare practice centers, and manufacturing plants with high-throughput domestic volume requiring R&D credits. Our CPAs tailor corporate structure guidance, full-service monthly bookkeeping, and risk-adjusted tax reduction strategies specifically formulated for these complex sectors to accelerate capital growth and efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "What cities in Texas do your CPA services serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While based in Katy, we serve corporations and families in Houston, Sugar Land, Cypress, Richmond, and the greater Fort Bend surrounding counties. Our online tax filing platform enables seamless secure strategy deployment anywhere in Texas, offering global asset advisory for clients requiring remote compliance with institutional precision and 24/7 client center access."
      }
    }
  ]
};
