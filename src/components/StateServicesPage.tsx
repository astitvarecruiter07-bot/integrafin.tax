import Link from "next/link";

type StateServicesPageProps = {
  stateName: string;
  stateCode: string;
  nearbyCities: string[];
};

export default function StateServicesPage({
  stateName,
  stateCode,
  nearbyCities,
}: StateServicesPageProps) {
  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="bg-primary-dark pt-28 sm:pt-32 pb-14 sm:pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-secondary text-xs font-black tracking-[0.2em] uppercase mb-3">
            {stateCode} Tax And Accounting
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            {stateName} Tax and Accounting Services for Individuals and Businesses
          </h1>
          <p className="text-[#d7e3fc] mt-5 max-w-3xl mx-auto text-base md:text-lg">
            IntegraFin helps clients across {stateName} with tax preparation, bookkeeping,
            payroll, and IRS tax resolution support.
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
        <div className="grid md:grid-cols-2 gap-8">
          <article className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-primary mb-4">
              Core Services In {stateName}
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li>Business tax preparation and planning</li>
              <li>Small business bookkeeping and monthly reporting</li>
              <li>Payroll tax setup and compliance support</li>
              <li>Sales tax and state filing assistance</li>
              <li>IRS audit and tax resolution services</li>
            </ul>
          </article>
          <article className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-primary mb-4">
              Who We Help In {stateName}
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li>Small business owners and startups</li>
              <li>Self-employed professionals and consultants</li>
              <li>LLCs, S-Corps, and multi-member entities</li>
              <li>Real estate, healthcare, retail, and service firms</li>
              <li>Individuals needing tax filing and tax planning support</li>
            </ul>
          </article>
        </div>
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

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-primary-dark">
                Do you offer remote tax and accounting support in {stateName}?
              </h3>
              <p className="text-slate-700 mt-1">
                Yes. We support clients with secure remote workflows, online document sharing,
                and virtual consultations.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-primary-dark">
                Can you help with both federal and state tax compliance?
              </h3>
              <p className="text-slate-700 mt-1">
                Yes. We assist with federal tax filings and state-level compliance based on your
                filing obligations.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-primary-dark">
                How do I start?
              </h3>
              <p className="text-slate-700 mt-1">
                Start with a consultation call so we can review your current setup and recommend
                the best tax and accounting plan.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/contact" className="inline-block bg-primary text-white px-7 py-3 rounded-xl font-bold">
              Request A Call Back
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
