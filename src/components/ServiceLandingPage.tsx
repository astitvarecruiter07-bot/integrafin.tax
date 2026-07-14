import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Landmark,
  Phone,
  Scale,
} from "lucide-react";
import type { ServiceLandingPageData, ServiceLandingPageSlug } from "@/data/serviceLandingPages";

const provider = {
  "@type": "AccountingService",
  name: "IntegraFin Tax & Accounting",
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
};

const areaServed = [
  { "@type": "Country", name: "United States" },
  { "@type": "AdministrativeArea", name: "Texas" },
  { "@type": "City", name: "Katy" },
  { "@type": "AdministrativeArea", name: "Fort Bend County" },
];

const iconBySlug: Record<ServiceLandingPageSlug, ComponentType<{ className?: string }>> = {
  "business-tax-accounting": Building2,
  "individual-tax-preparation": FileText,
  "tax-resolution": Scale,
  "bookkeeping-cleanup": ClipboardCheck,
  "payroll-tax-support": Landmark,
  "quickbooks-bookkeeping-services": BookOpenCheck,
};

function buildSchemas(data: ServiceLandingPageData) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    serviceType: data.serviceType,
    keywords: data.keywords,
    description: data.metaDescription,
    url: data.url,
    provider,
    areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${data.name} scope`,
      itemListElement: data.highlights.map((highlight) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: highlight.title,
          description: highlight.description,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://integrafin.tax/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://integrafin.tax/services" },
      { "@type": "ListItem", position: 3, name: data.name, item: data.url },
    ],
  };

  return { serviceSchema, faqSchema, breadcrumbSchema };
}

export default function ServiceLandingPage({ data }: { data: ServiceLandingPageData }) {
  const Icon = iconBySlug[data.slug];
  const { serviceSchema, faqSchema, breadcrumbSchema } = buildSchemas(data);

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-primary-dark pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-secondary">
              <Icon className="h-4 w-4" />
              {data.eyebrow}
            </div>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {data.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#d7e3fc] sm:text-lg">
              {data.heroDescription}
            </p>
            <ul className="mt-6 grid gap-3 text-sm font-semibold text-white sm:grid-cols-3">
              {data.heroBullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 rounded-lg border border-white/10 bg-white/10 p-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-7 py-3 font-bold text-primary-dark">
                {data.primaryCta} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+18326471819" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-7 py-3 font-bold text-white">
                <Phone className="h-4 w-4" />
                {data.secondaryCta}
              </a>
              <Link href={data.hubHref} className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3 font-bold text-primary-dark">
                {data.hubLabel}
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/15 bg-white/10 shadow-2xl">
            <Image
              src="/hero-professional.png"
              alt="IntegraFin tax and accounting consultation"
              width={640}
              height={640}
              priority
              className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-black text-primary sm:text-3xl">{data.quickAnswerTitle}</h2>
            <p className="mt-4 leading-relaxed text-slate-700">{data.quickAnswer}</p>
            <p className="mt-5 text-sm font-semibold text-slate-500">Last reviewed: June 30, 2026</p>
          </article>
          <div className="grid gap-4 sm:grid-cols-3">
            {data.highlights.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-black text-primary-dark">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-7 max-w-4xl">
            <h2 className="text-2xl font-black text-primary sm:text-3xl">{data.processTitle}</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{data.processDescription}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.processSteps.map((step) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-black text-primary-dark">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-black text-primary sm:text-3xl">{data.situationsTitle}</h2>
          <div className="mt-6 grid gap-4">
            {data.situations.map((situation) => (
              <article key={situation.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="font-black text-primary-dark">{situation.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{situation.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-primary sm:text-3xl">{data.checklistTitle}</h2>
          <p className="mt-3 leading-relaxed text-slate-700">{data.checklistIntro}</p>
          <ul className="mt-6 grid gap-3 text-sm text-slate-700">
            {data.checklist.map((item) => (
              <li key={item} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary-dark py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="text-2xl font-black sm:text-3xl">{data.whyTitle}</h2>
              <p className="mt-4 leading-relaxed text-[#d7e3fc]">
                IntegraFin Tax & Accounting is based in Katy, TX and supports clients with tax,
                bookkeeping, payroll, and advisory workflows through local and remote service.
              </p>
              <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-lg bg-white/10 p-4">
                  <p className="font-bold text-secondary">Office</p>
                  <p className="mt-1">2039 N Mason Rd, Suite 604, Katy, TX 77449</p>
                </div>
                <div className="rounded-lg bg-white/10 p-4">
                  <p className="font-bold text-secondary">Phone</p>
                  <a href="tel:+18326471819" className="mt-1 inline-block hover:text-secondary">(832) 647-1819</a>
                </div>
                <div className="rounded-lg bg-white/10 p-4">
                  <p className="font-bold text-secondary">Service Area</p>
                  <p className="mt-1">Katy, Fort Bend County, Texas, and remote clients across the United States</p>
                </div>
              </div>
            </div>
            <ul className="grid gap-3">
              {data.whyChoose.map((reason) => (
                <li key={reason} className="flex gap-3 rounded-lg bg-white/10 p-4 leading-relaxed text-[#d7e3fc]">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-2xl font-black text-primary sm:text-3xl">{data.officialResourcesTitle}</h2>
            <p className="mt-3 leading-relaxed text-slate-700">{data.officialResourcesIntro}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {data.officialResources.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-secondary"
                >
                  <h3 className="flex items-center gap-2 font-black text-primary-dark">
                    {resource.label}
                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-secondary" />
                  </h3>
                  {resource.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{resource.description}</p>
                  ) : null}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-primary sm:text-3xl">Helpful IntegraFin Pages</h2>
            <p className="mt-3 leading-relaxed text-slate-700">
              Related pages that support {data.relatedServiceLabel.toLowerCase()} questions.
            </p>
            <div className="mt-6 grid gap-3">
              {data.helpfulLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 font-bold text-primary shadow-sm hover:border-secondary"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 sm:pb-16">
        <h2 className="text-2xl font-black text-primary sm:text-3xl">{data.name} FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {data.faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-black text-primary-dark">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-lg bg-primary-dark p-7 text-center text-white shadow-sm sm:p-10">
          <h2 className="text-2xl font-black sm:text-3xl">Ready to organize the next step?</h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-[#d7e3fc]">
            Tell us what is happening now and we will help map the records, filing, bookkeeping, or notice workflow
            that fits your situation.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-7 py-3 font-bold text-primary-dark">
              {data.primaryCta} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-7 py-3 font-bold text-white">
              Back To Services Hub
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
