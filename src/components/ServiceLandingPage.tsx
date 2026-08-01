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
import { serviceAeoDetails } from "@/data/serviceAeoDetails";
import { serviceGuideLinks } from "@/data/internalLinking";
import {
  getContactHref,
  getLeadCtaLabel,
  SERVICE_BY_LANDING_SLUG,
} from "@/lib/leadServices";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
  localBusinessRef,
} from "@/lib/seo/schema";

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
  "small-business-bookkeeping-services": BookOpenCheck,
  "contractor-bookkeeping-services": BookOpenCheck,
};

function buildSchemas(data: ServiceLandingPageData) {
  const serviceId = `${data.url}#service`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId,
    name: data.name,
    serviceType: data.serviceType,
    keywords: data.keywords,
    description: data.metaDescription,
    url: data.url,
    provider: localBusinessRef,
    areaServed,
    mainEntityOfPage: { "@id": `${data.url}#webpage` },
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

  const faqSchema = buildFaqSchema(data.url, data.faqs);

  const breadcrumbSchema = buildBreadcrumbSchema(data.url, [
    { name: "Home", item: "https://integrafin.tax/" },
    { name: "Services", item: "https://integrafin.tax/services" },
    { name: data.name, item: data.url },
  ]);

  const webPageSchema = buildWebPageSchema({
    url: data.url,
    name: data.metaTitle,
    description: data.metaDescription,
    mainEntityId: serviceId,
  });

  return { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema };
}

export default function ServiceLandingPage({ data }: { data: ServiceLandingPageData }) {
  const Icon = iconBySlug[data.slug];
  const { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema } = buildSchemas(data);
  const selectedService = SERVICE_BY_LANDING_SLUG[data.slug];
  const contactHref = getContactHref(selectedService);
  const primaryCta = getLeadCtaLabel(selectedService, data.primaryCta);
  const aeo = serviceAeoDetails[data.slug];
  const helpfulLinkHrefs = new Set(data.helpfulLinks.map((link) => link.href));
  const relatedGuides = serviceGuideLinks[data.slug].filter(
    (guide) => !helpfulLinkHrefs.has(guide.href),
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <section id="overview" className="scroll-mt-24 bg-primary-dark pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-secondary">
              <Icon className="h-4 w-4" />
              {data.eyebrow}
            </div>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {data.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl rounded-lg border border-white/15 bg-white/10 p-5 text-base leading-relaxed text-white sm:text-lg">
              <span className="font-black text-secondary">Short answer:</span>{" "}
              {data.quickAnswer}
            </p>
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
              <Link href={contactHref} className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-7 py-3 font-bold text-primary-dark">
                {primaryCta} <ArrowRight className="h-4 w-4" />
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

      <section id="who-this-applies-to" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-lg border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-black text-primary sm:text-3xl">Who this applies to</h2>
            <p className="mt-4 leading-relaxed text-slate-700">{aeo.whoThisAppliesTo}</p>
            <p className="mt-5 text-sm font-semibold text-slate-500">
              Published: {aeo.published} · Last substantive review: {aeo.lastReviewed}
            </p>
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

      <section id="process" className="scroll-mt-24 bg-white py-12 sm:py-16">
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

      <section id="common-situations" className="scroll-mt-24 mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:py-16 lg:grid-cols-2">
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

      <section id="scope" className="scroll-mt-24 mx-auto max-w-7xl px-6 pb-12 sm:pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-lg border border-emerald-200 bg-emerald-50 p-7">
            <h2 className="text-2xl font-black text-primary">What is included</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-slate-700">
              {aeo.included.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-lg border border-amber-200 bg-amber-50 p-7">
            <h2 className="text-2xl font-black text-primary">What requires a separate scope</h2>
            <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-slate-700">
              {aeo.notIncluded.map((item) => (
                <li key={item} className="flex gap-3">
                  <Scale className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="why-integrafin" className="scroll-mt-24 bg-primary-dark py-12 text-white sm:py-16">
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

      <section id="timing-pricing-limitations" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="mb-8 max-w-4xl">
          <h2 className="text-2xl font-black text-primary sm:text-3xl">
            Timing, deadlines, pricing, and limitations
          </h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            These factors help define the written scope before work begins. Exact timing and fees
            are confirmed after the records, periods, deadlines, and requested deliverables are reviewed.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["Important timing and deadlines", aeo.timingAndDeadlines],
            ["Factors that affect pricing", aeo.pricingFactors],
            ["Important limitations", aeo.limitations],
          ].map(([title, items]) => (
            <article key={title as string} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-black text-primary-dark">{title as string}</h3>
              <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-slate-700">
                {(items as readonly string[]).map((item) => (
                  <li key={item} className="flex gap-3">
                    <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
          <p>
            <span className="font-black text-primary-dark">Content owner:</span>{" "}
            IntegraFin Tax &amp; Accounting. A named professional reviewer will be added only
            after the reviewer&apos;s identity, role, and publishable qualifications are verified.
          </p>
        </div>
      </section>

      <section id="official-resources" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-12 sm:py-16">
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
              <Link
                href="/pricing"
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 font-bold text-primary shadow-sm hover:border-secondary"
              >
                <span>Pricing and scope guide</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
              {data.helpfulLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href === "/contact" ? contactHref : link.href}
                  className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 font-bold text-primary shadow-sm hover:border-secondary"
                >
                  <span>{link.href === "/contact" ? primaryCta : link.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">Supporting guidance</p>
          <h2 className="mt-2 text-2xl font-black text-primary sm:text-3xl">
            Related {data.relatedServiceLabel} Guides
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">
            Use these practical articles to prepare records and questions before requesting service.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 font-bold text-primary hover:border-secondary hover:bg-white"
              >
                <span>{guide.label}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="frequently-asked-questions" className="scroll-mt-24 mx-auto max-w-7xl px-6 pb-12 sm:pb-16">
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
            <Link href={contactHref} className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-7 py-3 font-bold text-primary-dark">
              {primaryCta} <ArrowRight className="h-4 w-4" />
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
