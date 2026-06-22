import Link from "next/link";
import type { TexasCityLandingData } from "@/data/texasCityLandingData";
import { texasCityPages } from "@/data/texasCityLandingData";

const officeAddress = "2039 N Mason Rd, Suite 604, Katy, TX 77449";

export default function TexasCityLandingPage({ page }: { page: TexasCityLandingData }) {
  const pageUrl = `https://integrafin.tax/texas/${page.slug}`;
  const relatedPages = texasCityPages
    .filter(({ slug, city }) => slug !== page.slug && page.nearby.includes(city))
    .slice(0, 6);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${page.primaryService} in ${page.city}, TX`,
    serviceType: "Tax and accounting services",
    description: page.hero,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: "IntegraFin",
      url: "https://integrafin.tax",
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
    },
    areaServed: { "@type": "City", name: page.city },
    keywords: [page.primaryKeyword, ...page.supportingKeywords].join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://integrafin.tax/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Texas Tax and Accounting Services",
        item: "https://integrafin.tax/texas-tax-accounting-services",
      },
      { "@type": "ListItem", position: 3, name: `${page.primaryService} in ${page.city}`, item: pageUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-primary-dark pb-16 pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-secondary">
            Serving {page.city} and {page.county}
          </p>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            {page.primaryService} in {page.city}, TX
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#d7e3fc] md:text-lg">
            {page.hero}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="rounded-xl bg-secondary px-7 py-3 font-bold text-primary-dark">
              Schedule Consultation in {page.city}
            </Link>
            <a href="tel:+18326471819" className="rounded-xl border border-white/25 bg-white/10 px-7 py-3 font-bold text-white">
              Call (832) 647-1819
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="mb-5 text-2xl font-black text-primary sm:text-3xl">
            Local Tax and Accounting Support in {page.city}
          </h2>
          <div className="space-y-5 text-slate-700 leading-relaxed">
            {page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <p className="mt-6 text-sm font-semibold text-slate-500">Last reviewed: June 22, 2026</p>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <h2 className="mb-5 text-2xl font-black text-primary sm:text-3xl">
              Why Local Business Context Matters
            </h2>
            <div className="space-y-5 text-slate-700 leading-relaxed">
              {page.localExpertise.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p>
                City-specific service should never mean city-specific tax fiction. Federal rules come from federal law and IRS
                guidance; Texas-administered taxes come from Texas law and Comptroller guidance. Local context helps us
                understand the business, collect the right records and coordinate service. It does not create a deduction,
                credit or filing position by itself.
              </p>
            </div>
          </article>
          <aside className="rounded-2xl bg-primary-dark p-7 text-white shadow-sm">
            <h2 className="mb-4 text-xl font-black">Businesses We Commonly Support</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-[#d7e3fc]">
              {page.industries.map((industry) => <li key={industry}>• {industry}</li>)}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-[#d7e3fc]">
              Industry experience informs our questions, but every engagement is scoped from the client&apos;s own records,
              entity structure and filing history.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="mb-3 text-2xl font-black text-primary sm:text-3xl">
            {page.primaryService} and Related Services in {page.city}
          </h2>
          <p className="mb-7 max-w-4xl text-slate-700 leading-relaxed">
            Services are selected after an initial review. Some clients need one filing project; others need bookkeeping
            before preparation can begin or recurring support after the current issue is resolved. A written scope helps
            everyone understand the deliverables, client responsibilities and items that require a separate engagement.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {page.serviceDetails.map((service) => (
              <section key={service.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-black text-primary-dark">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{service.description}</p>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="mb-3 text-2xl font-black text-primary sm:text-3xl">
            Common {page.city} Tax and Bookkeeping Situations
          </h2>
          <p className="mb-6 text-slate-700 leading-relaxed">
            These examples describe workflow problems, not client testimonials or promised results. They show when an
            organized accounting review may be useful and why the supporting records matter.
          </p>
          <ol className="grid gap-4 md:grid-cols-2">
            {page.scenarios.map((scenario, index) => (
              <li key={scenario} className="rounded-xl bg-slate-50 p-5 text-slate-700 leading-relaxed">
                <span className="mr-2 font-black text-secondary">{index + 1}.</span>{scenario}
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="mb-3 text-2xl font-black text-primary sm:text-3xl">What the Engagement Process Looks Like</h2>
          <p className="mb-7 text-slate-700 leading-relaxed">
            A clear process matters in tax work because advice is only as reliable as the information behind it. The exact
            sequence changes with the engagement, but most {page.city} clients can expect these stages.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["1. Initial review", "We identify the taxpayers, entities, periods, deadlines and immediate concern. If an agency notice is involved, preserve the original letter and envelope and follow the response date shown."],
              ["2. Written scope", "We explain the work included, information needed and known limitations. Bookkeeping cleanup, return preparation, planning and representation are distinct tasks unless the agreement combines them."],
              ["3. Secure document collection", "Clients gather prior returns, statements, payroll reports, entity documents and relevant notices. Sensitive records should use the secure process provided during onboarding."],
              ["4. Reconciliation and questions", "We compare reports to source records, investigate differences and ask the client to clarify business purpose or missing information. Unsupported assumptions are not treated as facts."],
              ["5. Preparation and review", "Deliverables are prepared from the agreed records and reviewed with the client. Tax positions and options are explained with appropriate qualifications when treatment is fact-specific."],
              ["6. Filing or next-step plan", "After required approvals, the work moves to filing, delivery or a notice-response plan. The client receives clear follow-up items rather than a vague promise that everything is handled."],
            ].map(([title, description]) => (
              <section key={title} className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-black text-primary-dark">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{description}</p>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <h2 className="mb-4 text-2xl font-black text-primary">Records That Make the First Review More Useful</h2>
            <p className="mb-5 text-slate-700 leading-relaxed">
              Do not delay a consultation because every document is not yet available. Start with what you have and tell us
              what is missing. Depending on the service, the review commonly uses:
            </p>
            <ul className="space-y-3 text-slate-700">
              <li>• Recently filed federal and state returns and any extensions</li>
              <li>• Current profit-and-loss, balance-sheet and general-ledger reports</li>
              <li>• Bank, credit-card, loan and payment-processor statements</li>
              <li>• Payroll summaries and contractor-payment records</li>
              <li>• Entity formation and ownership documents relevant to the tax work</li>
              <li>• IRS or Texas notices, including all pages and the response date</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <h2 className="mb-4 text-2xl font-black text-primary">Tax-Claim and IRS Safety</h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                IntegraFin is an independent tax and accounting firm. It is not the IRS, the Texas Comptroller or a local
                government agency. Links to those agencies are included so readers can consult official information.
              </p>
              <p>
                Tax consequences depend on facts, documentation, timing and current law. Words such as “may,” “generally”
                and “depending on the facts” are deliberate. This page is general service information, not individualized
                legal, investment or tax advice and not a guarantee of a refund, deduction, penalty reduction or settlement.
              </p>
              <p>
                If a notice has a deadline, read it promptly and use the official contact information printed on it when
                communicating directly with the agency. Do not ignore the letter while searching for help.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="mb-4 text-2xl font-black text-primary sm:text-3xl">Local Business Resources</h2>
          <p className="mb-6 max-w-4xl text-slate-700 leading-relaxed">{page.resourceIntro}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {page.resources.map((resource) => (
              <a key={resource.href} href={resource.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-200 p-5 hover:border-secondary">
                <h3 className="font-black text-primary-dark">{resource.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{resource.description}</p>
              </a>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-2xl bg-primary-dark p-7 text-white shadow-sm sm:p-10">
            <h2 className="mb-4 text-2xl font-black">Office and Service-Area Information</h2>
            <p className="leading-relaxed text-[#d7e3fc]">{page.serviceAreaNote}</p>
            <address className="mt-5 not-italic leading-relaxed">
              <strong>IntegraFin Tax &amp; Accounting</strong><br />
              {officeAddress}<br />
              <a className="text-secondary hover:underline" href="tel:+18326471819">(832) 647-1819</a><br />
              <a className="text-secondary hover:underline" href="mailto:contact@integrafin.tax">contact@integrafin.tax</a>
            </address>
            <a href="https://www.google.com/maps/search/?api=1&query=2039+N+Mason+Rd+Suite+604+Katy+TX+77449" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-xl bg-white px-5 py-3 font-bold text-primary-dark">
              Get Directions to the Katy Office
            </a>
          </article>
          <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <h2 className="mb-4 text-2xl font-black text-primary">Nearby City Service Pages</h2>
            <p className="mb-5 text-slate-700 leading-relaxed">
              IntegraFin serves {page.city} and nearby communities through the same secure, documented workflow. Use the
              city page closest to the service context you need; every route leads to the same real Katy business rather
              than a network of invented offices.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedPages.map((related) => (
                <Link key={related.slug} href={`/texas/${related.slug}`} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-primary hover:border-secondary">
                  {related.primaryService} in {related.city}
                </Link>
              ))}
              <Link href="/texas-tax-accounting-services" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-primary hover:border-secondary">
                Texas Tax and Accounting Services
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="mb-7 text-2xl font-black text-primary sm:text-3xl">
            Frequently Asked Questions About {page.primaryService} in {page.city}
          </h2>
          <div className="space-y-6">
            {page.faq.map((item) => (
              <section key={item.question}>
                <h3 className="font-black text-primary-dark">{item.question}</h3>
                <p className="mt-2 leading-relaxed text-slate-700">{item.answer}</p>
              </section>
            ))}
          </div>
          <div className="mt-9 rounded-2xl bg-slate-50 p-6 text-center">
            <h2 className="text-2xl font-black text-primary-dark">Schedule a Consultation in {page.city}</h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-700">
              Tell us whether you need tax preparation, bookkeeping, business accounting or notice help. We will identify
              the records and next step before asking you to commit to a broader scope.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="rounded-xl bg-primary px-7 py-3 font-bold text-white">Request a Consultation</Link>
              <Link href="/services" className="rounded-xl border border-slate-300 bg-white px-7 py-3 font-bold text-primary">Review All Services</Link>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
