import Image from "next/image";
import { CalendarDays, CheckCircle2, Phone } from "lucide-react";

const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com/integrafintax/30min";

const serviceHighlights = [
  "Tax preparation",
  "Bookkeeping support",
  "IRS notice help",
];

export default function HeroCarousel() {
  return (
    <section className="relative flex min-h-[650px] w-full items-center overflow-hidden bg-slate-950 pt-20 text-white md:min-h-[750px]">
      <div className="absolute inset-0">
        <Image
          src="/hero-accounting-workspace.jpg"
          alt="Illustrative tax and accounting consultation workspace"
          fill
          sizes="100vw"
          className="object-cover object-right opacity-55"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="max-w-4xl text-center lg:text-left">
          <p className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#41c3ff] backdrop-blur-sm sm:text-sm">
            Katy Tax &amp; Accounting Firm
          </p>

          <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Get clear next steps for your taxes, books, or IRS notice.
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-relaxed text-slate-200 sm:text-lg md:text-xl lg:mx-0">
            Book a 30-minute consultation with IntegraFin to discuss the records, deadlines, and
            service you need. We support businesses and families in Katy, Fort Bend County, and
            remotely across the United States.
          </p>

          <ul className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-100 lg:justify-start">
            {serviceHighlights.map((service) => (
              <li key={service} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#41c3ff]" aria-hidden="true" />
                {service}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-label="homepage_hero_book_30_min"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0092df] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#0092df]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#007bbf] hover:shadow-2xl hover:shadow-[#0092df]/35 sm:text-lg"
            >
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
              Book a 30-Minute Consultation
            </a>
            <a
              href="tel:+18326471819"
              data-analytics-label="homepage_hero_phone_call"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 sm:text-lg"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call (832) 647-1819
            </a>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-300">
            Monday–Friday, 9:00 AM–6:00 PM Central · Local and online appointments
          </p>
        </div>
      </div>
    </section>
  );
}
