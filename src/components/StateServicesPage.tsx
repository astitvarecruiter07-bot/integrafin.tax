import Link from "next/link";

type FaqItem = {
  question: string;
  answer: string;
};

type ResourceLink = {
  href: string;
  label: string;
};

type CityPageLink = {
  href: string;
  label: string;
};

type StateServicesPageProps = {
  stateName: string;
  stateCode: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroDescription: string;
  directAnswer: string;
  serviceFocus: string[];
  whoWeHelp: string[];
  compliancePoints: string[];
  whyChoose: string[];
  nearbyCities: string[];
  faqItems: FaqItem[];
  resourceLinks: ResourceLink[];
  cityPageLinks?: CityPageLink[];
  pageUrl: string;
  lastReviewed: string;
};

export default function StateServicesPage({
  stateName,
  stateCode,
  heroDescription,
  directAnswer,
  serviceFocus,
  whoWeHelp,
  compliancePoints,
  whyChoose,
  nearbyCities,
  faqItems,
  resourceLinks,
  cityPageLinks = [],
  pageUrl,
  lastReviewed,
}: StateServicesPageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `${stateName} Tax and Accounting Services FAQ`,
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
    name: `${stateName} Tax and Accounting Services`,
    serviceType: "Tax and Accounting Services",
    provider: {
      "@type": "Organization",
      name: "IntegraFin",
      url: "https://integrafin.tax",
    },
    areaServed: {
      "@type": "State",
      name: stateName,
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
        name: `${stateName} Tax and Accounting Services`,
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
            {stateCode} Tax And Accounting
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            {stateName} Tax and Accounting Services for Small Businesses and Individuals
          </h1>
          <p className="text-[#d7e3fc] mt-5 max-w-3xl mx-auto text-base md:text-lg">
            {heroDescription}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="bg-secondary text-primary-dark px-7 py-3 rounded-xl font-bold">
              Book A Consultation
            </Link>
            <Link href="/services" className="bg-white text-primary-dark px-7 py-3 rounded-xl font-bold">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100 mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-4">
            Quick Answer: What We Do In {stateName}
          </h2>
          <p className="text-slate-700 leading-relaxed">
            {directAnswer}
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Last reviewed: {lastReviewed}
          </p>
        </article>

        <div className="grid md:grid-cols-2 gap-8">
          <article className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-primary mb-4">
              Tax and Accounting Services In {stateName}
            </h2>
            <ul className="space-y-3 text-slate-700">
              {serviceFocus.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </article>
          <article className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-primary mb-4">
              Who We Help In {stateName}
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
            State Tax Compliance Support In {stateName}
          </h2>
          <p className="text-slate-700 mb-5">
            Our team helps you stay compliant with federal and {stateName} requirements with a practical filing workflow.
          </p>
          <ul className="space-y-3 text-slate-700">
            {compliancePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-14">
        <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Service Areas In {stateName}
          </h2>
          <p className="text-slate-700 mb-5">
            We support clients across {stateName}, including:
          </p>
          <div className="flex flex-wrap gap-2">
            {nearbyCities.map((city) => (
              <span
                key={city}
                className="bg-slate-100 text-slate-800 text-sm font-semibold px-3 py-2 rounded-lg"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {cityPageLinks.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-10">
          <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
              City Tax Accountant Pages In {stateName}
            </h2>
            <p className="text-slate-700 mb-5">
              Explore our city-specific service pages:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {cityPageLinks.map((cityLink) => (
                <Link
                  key={cityLink.href}
                  href={cityLink.href}
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary"
                >
                  {cityLink.label}
                </Link>
              ))}
            </div>
          </article>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Why Businesses Choose IntegraFin In {stateName}
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
            Recommended Tax Resources
          </h2>
          <p className="text-slate-700 mb-5">
            Explore these practical resources to improve your tax planning and accounting systems:
          </p>
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
        <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
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
        </div>
      </section>
    </main>
  );
}
