export default function LogoMarquee() {
    const partners = [
        "QuickBooks",
        "Xero",
        "Zoho Books",
        "TaxDome",
        "Intuit",
    ];

    return (
        <div className="bg-[#1B2A4A] rounded-2xl mx-4 sm:mx-6 md:mx-auto max-w-6xl py-4 sm:py-5 px-4 overflow-hidden my-8 sm:my-12">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...partners, ...partners].map((partner, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 sm:gap-3 mx-6 sm:mx-10 text-white font-bold text-sm sm:text-lg"
                    >
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <span>{partner}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
