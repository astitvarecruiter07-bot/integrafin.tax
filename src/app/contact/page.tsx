import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { getLeadCtaLabel, normalizeLeadService } from "@/lib/leadServices";

export const metadata: Metadata = {
  title: "Contact IntegraFin | Katy Tax & Accounting",
  description:
    "Contact IntegraFin in Katy, TX for tax preparation, bookkeeping, payroll support, LLC tax setup, or IRS notice help. Call (832) 647-1819 or request a consultation.",
  alternates: { canonical: "https://integrafin.tax/contact" },
  openGraph: {
    title: "Contact IntegraFin | Katy Tax & Accounting",
    description:
      "Request tax, bookkeeping, payroll, LLC tax-setup, or IRS notice support from IntegraFin in Katy, Texas.",
    url: "https://integrafin.tax/contact",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IntegraFin Tax & Accounting in Katy, Texas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact IntegraFin | Katy Tax & Accounting",
    description: "Request tax and accounting support from IntegraFin in Katy, Texas.",
    images: ["/og-image.jpg"],
  },
};

const contactFaqs = [
  {
    question: "What should I include in my consultation request?",
    answer:
      "Select the service you need and provide either an email address or phone number. You may add a deadline, IRS notice number, or brief bookkeeping concern, but do not submit Social Security numbers, bank details, tax returns, or other sensitive records through the public form.",
  },
  {
    question: "What happens after I contact IntegraFin?",
    answer:
      "The team reviews the service selected and follows up using the contact method you provided. The initial conversation identifies the records, deadlines, and scope that may be needed before work begins.",
  },
  {
    question: "Can IntegraFin work with clients outside Katy?",
    answer:
      "Yes. IntegraFin is based in Katy, Texas and supports local and remote clients across the United States when the requested service and jurisdiction are within the available scope.",
  },
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://integrafin.tax/contact#webpage",
  url: "https://integrafin.tax/contact",
  name: "Contact IntegraFin Tax & Accounting",
  description:
    "Contact IntegraFin in Katy, Texas for tax preparation, bookkeeping, payroll support, LLC tax setup, and IRS notice help.",
  mainEntity: { "@id": "https://integrafin.tax/#localbusiness" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://integrafin.tax/" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://integrafin.tax/contact" },
  ],
};

const contactFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: contactFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

type ContactPageProps = {
  searchParams: Promise<{ service?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const requestedService = (await searchParams).service;
  const initialService = normalizeLeadService(
    Array.isArray(requestedService) ? requestedService[0] : requestedService,
  );
  const formHeading = initialService
    ? getLeadCtaLabel(initialService, "Request a consultation")
    : "Tell us what you need";

  return (
    <main className="bg-slate-50 font-sans text-slate-800">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqSchema) }} />

      <header className="relative overflow-hidden bg-primary-dark pb-24 pt-32 text-white sm:pb-28 sm:pt-40">
        <Image
          src="/A_professional,_wide-angle_202604082301.png"
          alt="IntegraFin tax and accounting consultation workspace"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/95 to-primary-dark/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,194,203,0.2),transparent_38%)]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-sm font-semibold text-blue-100">
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Contact</span>
          </nav>

          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-cyan-300">
              Katy tax and accounting support
            </p>
            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Talk with IntegraFin about your tax, books, or IRS notice.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
              Start with your name, the service you need, and one way to reach you. The team will
              review the request and help identify the records, deadlines, and appropriate next step.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-7 py-3.5 text-base font-bold text-primary-dark shadow-lg transition-colors hover:bg-cyan-300"
              >
                Start your request
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="tel:+18326471819"
                data-analytics-label="contact_hero_phone_call"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call (832) 647-1819
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-blue-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" />Email or phone is enough</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" />Local and remote appointments</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" />No sensitive documents in this form</li>
            </ul>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto -mt-14 max-w-7xl px-4 pb-20 sm:px-8 sm:pb-24">
        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-8 lg:p-10">
            <div className="mb-8 border-b border-slate-200 pb-7">
              <p className="text-sm font-bold text-brand-blue">Three quick details to begin</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-primary-dark sm:text-3xl">
                {formHeading}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Choose a service and provide either email or phone. Company information and a message are optional.
              </p>
            </div>
            <ContactForm initialService={initialService} />
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-slate-700">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <p>
                Do not include Social Security numbers, bank details, tax returns, or other sensitive records.
                The team will confirm an appropriate document process when needed.
              </p>
            </div>
          </article>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-primary-dark p-7 text-white shadow-xl sm:p-8">
              <h2 className="text-2xl font-black tracking-tight">Contact IntegraFin directly</h2>
              <p className="mt-2 text-sm leading-6 text-blue-100">Use the option that is easiest for you during business hours.</p>
              <div className="mt-7 space-y-3">
                <a href="tel:+18326471819" data-analytics-label="contact_sidebar_phone_call" className="flex items-center gap-4 rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/15">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary-dark"><Phone className="h-5 w-5" /></span>
                  <span><span className="block text-sm text-blue-100">Call</span><span className="font-bold">(832) 647-1819</span></span>
                </a>
                <a href="mailto:contact@integrafin.tax" data-analytics-label="contact_sidebar_email" className="flex items-center gap-4 rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/15">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary-dark"><Mail className="h-5 w-5" /></span>
                  <span className="min-w-0"><span className="block text-sm text-blue-100">Email</span><span className="break-all font-bold">contact@integrafin.tax</span></span>
                </a>
                <a href="https://wa.me/18326471819" data-analytics-label="contact_sidebar_whatsapp" className="flex items-center gap-4 rounded-xl bg-white/10 p-4 transition-colors hover:bg-white/15">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary-dark"><MessageSquare className="h-5 w-5" /></span>
                  <span><span className="block text-sm text-blue-100">WhatsApp</span><span className="font-bold">Message IntegraFin</span></span>
                </a>
              </div>
              <div className="mt-6 flex items-start gap-3 border-t border-white/15 pt-5 text-sm text-blue-100">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                <p>Monday–Friday, 9:00 AM–6:00 PM Central</p>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary"><MapPin className="h-5 w-5" /></span>
                <div>
                  <h2 className="text-xl font-black text-primary-dark">Katy office</h2>
                  <address className="mt-2 not-italic text-sm leading-6 text-slate-600">
                    IntegraFin LLC<br />
                    2039 N Mason Rd, Suite 604<br />
                    Katy, TX 77449
                  </address>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=2039+N+Mason+Rd+Suite+604+Katy+TX+77449"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex font-bold text-primary hover:text-primary-dark hover:underline"
                  >
                    Get directions
                  </a>
                </div>
              </div>
              <details className="mt-6 border-t border-slate-200 pt-5 text-sm text-slate-600">
                <summary className="cursor-pointer font-bold text-primary-dark">India operations contact</summary>
                <p className="mt-3 leading-6">Nagpur, Maharashtra 440008 · <a href="tel:+918855075450" className="font-semibold text-primary hover:underline">+91 88550 75450</a></p>
              </details>
            </section>

            <section className="rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-8">
              <h2 className="text-xl font-black text-primary-dark">Received an IRS notice?</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Keep the complete letter and envelope, note the response date, and review the notice before sending records.
              </p>
              <Link href="/texas/irs-notice-help-katy-tx" className="mt-5 inline-flex items-center gap-2 font-bold text-primary hover:text-primary-dark hover:underline">
                Review Katy IRS notice help <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-blue">Katy, Texas</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-primary-dark">Visit the IntegraFin office</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Scheduled local appointments are available at the Katy office. Call or submit the form before visiting so the team can confirm timing and the records relevant to your request.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <iframe
              src="https://www.google.com/maps?q=2039+N+Mason+Rd+Suite+604+Katy+TX+77449&output=embed"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map to IntegraFin at 2039 N Mason Rd Suite 604 in Katy, Texas"
              className="block min-h-[320px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-blue">Before you contact us</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-primary-dark">Consultation request FAQ</h2>
        </div>
        <div className="mt-10 grid gap-4">
          {contactFaqs.map((faq) => (
            <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <h3 className="text-lg font-black text-primary-dark">{faq.question}</h3>
              <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
