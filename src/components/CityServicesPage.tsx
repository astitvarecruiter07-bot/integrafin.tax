import Link from "next/link";

type FaqItem = {
  question: string;
  answer: string;
};

type ResourceLink = {
  href: string;
  label: string;
};

type CityServicesPageProps = {
  cityName: string;
  stateName: string;
  stateCode: string;
  pageUrl: string;
  statePageUrl: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroDescription: string;
  directAnswer: string;
  serviceFocus: string[];
  whoWeHelp: string[];
  localScenarios: string[];
  whyChoose: string[];
  faqItems: FaqItem[];
  resourceLinks: ResourceLink[];
  nearbyAreas: string[];
  lastReviewed: string;
};

export default function CityServicesPage({
  cityName,
  stateName,
  stateCode,
  pageUrl,
  statePageUrl,
  primaryKeyword,
  secondaryKeywords,
  heroDescription,
  directAnswer,
  serviceFocus,
  whoWeHelp,
  localScenarios,
  whyChoose,
  faqItems,
  resourceLinks,
  nearbyAreas,
  lastReviewed,
}: CityServicesPageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `${cityName}, ${stateCode} Tax and Accounting FAQ`,
    url: pageUrl,
    lastReviewed,
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Tax and Accounting Services in ${cityName}, ${stateCode}`,
    serviceType: "Tax and Accounting Services",
    provider: {
      "@type": "Organization",
      name: "IntegraFin",
      url: "https://integrafin.tax",
    },
    areaServed: {
      "@type": "City",
      name: cityName,
    },
    description: heroDescription,
    url: pageUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://integrafin.tax/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://integrafin.tax/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${stateName} Services`,
        item: statePageUrl,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${cityName} Tax and Accounting Services`,
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-primary-dark pt-28 sm:pt-32 pb-14 sm:pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-secondary text-xs font-black tracking-[0.2em] uppercase mb-3">
            {cityName}, {stateCode}
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Tax Accountant in {cityName}, {stateName} for Small Businesses and Individuals
          </h1>
          <p className="text-[#d7e3fc] mt-5 max-w-3xl mx-auto text-base md:text-lg">
            {heroDescription}
          </p>
          <p className="text-[#d7e3fc] mt-3 max-w-3xl mx-auto text-sm md:text-base">
            Primary focus: <span className="font-semibold">{primaryKeyword}</span>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="bg-secondary text-primary-dark px-7 py-3 rounded-xl font-bold">
              Book A Consultation
            </Link>
            <Link href={statePageUrl} className="bg-white text-primary-dark px-7 py-3 rounded-xl font-bold">
              View {stateName} Service Hub
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100 mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-4">
            Quick Answer: Tax and Accounting Help in {cityName}
          </h2>
          <p className="text-slate-700 leading-relaxed">{directAnswer}</p>
          <p className="text-slate-500 text-sm mt-4">Last reviewed: {lastReviewed}</p>
        </article>

        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100 mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-4">
            Keywords and Tax Topics We Cover
          </h2>
          <div className="flex flex-wrap gap-2">
            {secondaryKeywords.map((keyword) => (
              <span key={keyword} className="bg-slate-100 text-slate-800 text-sm font-semibold px-3 py-2 rounded-lg">
                {keyword}
              </span>
            ))}
          </div>
        </article>

        <div className="grid md:grid-cols-2 gap-8">
          <article className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-primary mb-4">
              Tax and Accounting Services in {cityName}
            </h2>
            <ul className="space-y-3 text-slate-700">
              {serviceFocus.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </article>
          <article className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-primary mb-4">
              Who We Help in {cityName}
            </h2>
            <ul className="space-y-3 text-slate-700">
              {whoWeHelp.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Common Tax and Accounting Scenarios in {cityName}
          </h2>
          <ul className="space-y-3 text-slate-700">
            {localScenarios.map((scenario) => (
              <li key={scenario}>{scenario}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Nearby Areas We Support
          </h2>
          <div className="flex flex-wrap gap-2">
            {nearbyAreas.map((area) => (
              <span key={area} className="bg-slate-100 text-slate-800 text-sm font-semibold px-3 py-2 rounded-lg">
                {area}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Why Businesses in {cityName} Choose IntegraFin
          </h2>
          <ul className="space-y-3 text-slate-700">
            {whyChoose.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Helpful Resources
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {resourceLinks.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary"
              >
                {resource.label}
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-bold text-primary-dark">{faq.question}</h3>
                <p className="text-slate-700 mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-block bg-primary text-white px-7 py-3 rounded-xl font-bold text-center">
                Request A Call Back
              </Link>
              <Link href="/services" className="inline-block bg-white border border-slate-300 text-primary px-7 py-3 rounded-xl font-bold text-center">
                View All Services
              </Link>
              <Link href="/blog" className="inline-block bg-white border border-slate-300 text-primary px-7 py-3 rounded-xl font-bold text-center">
                Read Tax Insights
              </Link>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
