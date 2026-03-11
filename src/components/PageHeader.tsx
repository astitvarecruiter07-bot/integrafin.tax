interface PageHeaderProps {
    title: string;
    breadcrumb: string;
    description?: string;
}

export default function PageHeader({ title, breadcrumb, description }: PageHeaderProps) {
    return (
        <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden bg-white">
            {/* Decorative wave shapes */}
            <div className="absolute top-0 right-0 w-64 sm:w-96 h-40 sm:h-64 opacity-40">
                <svg viewBox="0 0 500 300" fill="none" className="w-full h-full">
                    <path
                        d="M0 0C100 50 200 100 350 80C450 65 500 120 500 120V0H0Z"
                        fill="#F5F7FA"
                    />
                    <path
                        d="M200 0C300 80 400 50 500 90V0H200Z"
                        fill="#D6E4F0"
                        opacity="0.5"
                    />
                </svg>
            </div>
            <div className="absolute top-10 left-0 w-48 sm:w-72 h-32 sm:h-48 opacity-30">
                <svg viewBox="0 0 400 250" fill="none" className="w-full h-full">
                    <path
                        d="M0 0C50 80 150 120 250 90C350 60 400 100 400 100V0H0Z"
                        fill="#F5F7FA"
                    />
                </svg>
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                    {title}
                </h1>
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-accent-dark text-white rounded-full text-sm font-medium mb-4">
                    <a href="/" className="hover:underline">Home</a>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>{breadcrumb}</span>
                </div>
                {description && (
                    <p className="text-text-secondary text-base leading-relaxed max-w-xl mx-auto">
                        {description}
                    </p>
                )}
            </div>
        </section>
    );
}
