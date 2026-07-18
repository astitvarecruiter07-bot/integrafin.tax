import Link from "next/link";
import type { HoustonIrsServicePageData } from "@/data/houstonIrsServicePages";

const siteUrl = "https://integrafin.tax";
const officeAddress = "2039 N Mason Rd, Suite 604, Katy, TX 77449";

export default function HoustonIrsServicePage({ data }: { data: HoustonIrsServicePageData }) {
  const pageUrl = `${siteUrl}${data.path}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.serviceName,
    serviceType: data.serviceName,
    description: data.metaDescription,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: "IntegraFin Tax & Accounting",
      url: siteUrl,
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
    areaServed: [
      { "@type": "City", name: "Houston" },
      { "@type": "AdministrativeArea", name: "Greater Houston" },
    ],
    keywords: [data.primaryKeyword, ...data.supportingKeywords].join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Houston Tax and Accounting",
        item: `${siteUrl}/texas/houston-tax-accountant`,
      },
      { "@type": "ListItem", position: 3, name: data.serviceName, item: pageUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-primary-dark pb-16 pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-secondary">{data.eyebrow}</p>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">{data.heroTitle}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#d7e3fc] md:text-lg">
            {data.heroDescription}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              data-analytics-label={`${data.slug}-hero-contact`}
              className="rounded-xl bg-secondary px-7 py-3 font-bold text-primary-dark"
            >
              Request IRS Help
            </Link>
            <a
              href="tel:+18326471819"
              data-analytics-label={`${data.slug}-hero-phone`}
              className="rounded-xl border border-white/25 bg-white/10 px-7 py-3 font-bold text-white"
            >
              Call (832) 647-1819
            </a>
            <Link href="/texas/houston-tax-accountant" className="rounded-xl border border-white/25 px-7 py-3 font-bold text-white">
              Houston Services Hub
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Direct answer</p>
          <h2 className="mt-3 text-2xl font-black text-primary-dark sm:text-3xl">{data.quickAnswerTitle}</h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-slate-700">{data.quickAnswer}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-5 text-sm text-slate-500">
            <span>Last reviewed: {data.lastReviewed}</span>
            <span>Reviewed by the IntegraFin Tax &amp; Accounting team</span>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="text-2xl font-black text-primary sm:text-3xl">{data.situationsTitle}</h2>
          <p className="mt-3 max-w-4xl leading-relaxed text-slate-700">{data.situationsIntro}</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.situations.map((item) => (
              <section key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-black text-primary-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.description}</p>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <h2 className="text-2xl font-black text-primary">{data.firstStepsTitle}</h2>
            <ol className="mt-6 space-y-5">
              {data.firstSteps.map((item) => (
                <li key={item.title} className="border-l-4 border-secondary pl-5">
                  <h3 className="font-black text-primary-dark">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{item.description}</p>
                </li>
              ))}
            </ol>
          </article>
          <aside className="rounded-2xl bg-primary-dark p-7 text-white shadow-sm sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">Houston service area</p>
            <h2 className="mt-3 text-2xl font-black">Remote support with a real Katy office</h2>
            <p className="mt-4 leading-relaxed text-[#d7e3fc]">
              IntegraFin serves Houston clients through virtual meetings and an organized document workflow. We do not
              claim a separate Houston office. In-person appointments are available at our Katy location.
            </p>
            <address className="mt-6 not-italic leading-relaxed">
              <strong>IntegraFin Tax &amp; Accounting</strong>
              <br />
              {officeAddress}
              <br />
              <a href="tel:+18326471819" className="text-secondary hover:underline">(832) 647-1819</a>
            </address>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="text-2xl font-black text-primary sm:text-3xl">{data.supportTitle}</h2>
          <p className="mt-3 max-w-4xl leading-relaxed text-slate-700">{data.supportIntro}</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {data.supportItems.map((item) => (
              <section key={item.title} className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-black text-primary-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.description}</p>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <h2 className="text-2xl font-black text-primary">{data.documentsTitle}</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{data.documentsIntro}</p>
            <ul className="mt-6 space-y-3 text-slate-700">
              {data.documents.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="font-black text-primary">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <h2 className="text-2xl font-black text-primary">{data.processTitle}</h2>
            <div className="mt-6 space-y-4">
              {data.processSteps.map((step) => (
                <section key={step.title} className="rounded-xl bg-slate-50 p-5">
                  <h3 className="font-black text-primary-dark">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.description}</p>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="text-2xl font-black text-primary sm:text-3xl">Official IRS resources</h2>
          <p className="mt-3 max-w-4xl leading-relaxed text-slate-700">
            Use official IRS pages to confirm current eligibility, instructions, deadlines, and procedures. IntegraFin is
            an independent tax and accounting firm and is not affiliated with the IRS.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {data.officialResources.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-secondary hover:bg-white"
              >
                <h3 className="font-black text-primary-dark">{resource.label}</h3>
                {resource.description && <p className="mt-2 text-sm leading-relaxed text-slate-600">{resource.description}</p>}
              </a>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="text-2xl font-black text-primary">Explore related Houston IRS help</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-primary hover:border-secondary">
                {link.label}
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="text-2xl font-black text-primary sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-7 space-y-6">
            {data.faqs.map((faq) => (
              <section key={faq.question}>
                <h3 className="font-black text-primary-dark">{faq.question}</h3>
                <p className="mt-2 leading-relaxed text-slate-700">{faq.answer}</p>
              </section>
            ))}
          </div>
          <div className="mt-9 rounded-2xl bg-slate-50 p-6 text-center">
            <h2 className="text-2xl font-black text-primary-dark">Start with the notice, returns, and records you have</h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-700">
              Tell us the tax periods involved, any deadline shown, and what has already been filed or paid. We will identify
              the records needed for an initial review and explain the next step.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                data-analytics-label={`${data.slug}-bottom-contact`}
                className="rounded-xl bg-primary px-7 py-3 font-bold text-white"
              >
                Request a Consultation
              </Link>
              <a
                href="tel:+18326471819"
                data-analytics-label={`${data.slug}-bottom-phone`}
                className="rounded-xl border border-slate-300 bg-white px-7 py-3 font-bold text-primary"
              >
                Call (832) 647-1819
              </a>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
