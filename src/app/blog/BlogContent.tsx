"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { type BlogPost } from "@/data/blogData";
import { Search, ArrowRight, Mail, Calculator, CornerDownRight } from "lucide-react";

interface BlogContentProps {
    initialPosts: BlogPost[];
}

const categories = [
    "All",
    "Tax Planning",
    "Accounting",
    "Compliance",
    "Tax Resolution",
    "Payroll",
    "Business Advisory",
];

export default function BlogContent({ initialPosts }: BlogContentProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredPosts = useMemo(() => {
        return initialPosts.filter(post => {
            const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [initialPosts, searchQuery, selectedCategory]);

    const featuredPost = useMemo(() => {
        return filteredPosts.find(post => post.featured) || filteredPosts[0];
    }, [filteredPosts]);

    const gridPosts = useMemo(() => {
        if (!featuredPost) return [];
        return filteredPosts.filter(post => post.slug !== featuredPost.slug);
    }, [filteredPosts, featuredPost]);

    return (
        <div className="bg-slate-50 font-sans text-slate-800">

            {/* SECTION 1: BLOG HERO BANNER */}
            <section className="relative pt-28 sm:pt-40 pb-16 sm:pb-24 bg-[#003580] overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0092df 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#0092df]/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-4 block">Our Insights Hub</span>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                        Tax Insights &{" "}
                        <br />
                        <span className="bg-gradient-to-r from-[#0092df] to-[#00C2CB] bg-clip-text text-transparent">
                            Financial Intelligence
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg mb-8 sm:mb-12 font-medium leading-relaxed">
                        Stay informed with the latest tax tips, financial strategies, and legislative updates curated by our senior architects of wealth.
                    </p>
                    <div className="max-w-xl mx-auto mb-10 sm:mb-16 relative">
                        <input
                            type="text"
                            placeholder="Search insights..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/10 border-2 border-[#0092df]/40 rounded-full py-4 px-8 text-white focus:ring-2 focus:ring-[#0092df] focus:border-[#0092df] transition-all placeholder:text-white/50"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0092df] hover:scale-110 transition-transform">
                            <Search className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 sm:px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all ${selectedCategory === cat
                                    ? 'border-[#0092df] text-[#0092df] bg-[#0092df]/10'
                                    : 'border-white/20 text-slate-300 hover:border-[#0092df]/50 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 2: FEATURED POST */}
            {featuredPost && (
                <section className="bg-white py-12 sm:py-20 border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 group overflow-hidden bg-slate-50 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-5 sm:p-8 hover:shadow-2xl hover:shadow-[#0092df]/10 transition-all duration-500">
                            <div className="lg:w-1/2 w-full overflow-hidden rounded-2xl relative h-[250px] sm:h-[400px]">
                                {featuredPost.image ? (
                                    <Image
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[#0092df]/20 to-[#003580]/10 flex items-center justify-center">
                                        <CornerDownRight className="w-12 h-12 text-[#0092df]/30" />
                                    </div>
                                )}
                            </div>
                            <div className="lg:w-1/2 w-full">
                                <span className="inline-block px-3 py-1 bg-[#0092df]/10 text-[#0092df] rounded font-black text-[10px] uppercase tracking-widest mb-6 border border-[#0092df]/20">
                                    Featured Insight
                                </span>
                                <h2 className="text-2xl sm:text-4xl font-black text-[#003580] mb-4 sm:mb-6 leading-tight tracking-tight">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-slate-600 text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed font-medium">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-[#003580]/10 border border-[#0092df]/30 overflow-hidden relative">
                                        <Image
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb2fbflM3WQEL4GC36HymGmmpKnz0eLSSuOhfZT7BJukCRfj2HGwjZ2B2ETouhXdCFmEZ98XG--me0LLqyFdI5OWs-aHcpj-Zbda3K23VA6C_Ghp64dchUJNgidKs9NaUBKPMTFd9g94YMc5fsvXprfRLxC7z09tTaViju_7TIDftv8VdWBq18qs-r0yW8UpUm55bwQkkDtMqYaElSZ8x0zBQL8lH8XYRBAqtlmYzR7EzO48ty_PZSRNx82Mhi3ZznMulprgIQLC4"
                                            alt="Author"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[#003580] font-black text-sm">Marcus Sterling</p>
                                        <p className="text-slate-400 text-xs uppercase tracking-wider">Managing Partner</p>
                                    </div>
                                </div>
                                <Link
                                    href={`/blog/${featuredPost.slug}`}
                                    className="inline-flex items-center gap-2 bg-[#003580] hover:bg-[#002050] text-white px-8 py-3.5 rounded-xl font-black tracking-widest uppercase text-xs transition-all duration-300 shadow-lg shadow-[#003580]/20 hover:-translate-y-0.5"
                                >
                                    Read Full Strategy
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION 3: BLOG GRID */}
            <section className="bg-slate-50 py-12 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-2 block">Latest Articles</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#003580] tracking-tight">Browse All Insights</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {gridPosts.map((post) => (
                            <div
                                key={post.slug}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0092df]/10 hover:border-[#0092df]/20 transition-all duration-500 flex flex-col"
                            >
                                <div className="h-56 relative overflow-hidden">
                                    {post.image ? (
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#0092df]/10 to-[#003580]/10 flex items-center justify-center">
                                            <CornerDownRight className="w-12 h-12 text-[#0092df]/30" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 sm:p-8 flex-grow flex flex-col">
                                    <div className="flex justify-between items-center mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>{post.category}</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-[#003580] mb-4 hover:text-[#0092df] transition-colors leading-snug tracking-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow font-medium">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                                        <span className="text-slate-400 text-xs font-medium">{post.readTime}</span>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="text-[#0092df] font-black text-xs uppercase tracking-widest hover:text-[#003580] transition-colors inline-flex items-center gap-1"
                                        >
                                            Read More
                                            <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Newsletter Card In Grid */}
                        {gridPosts.length > 0 && (
                            <div className="bg-[#003580] rounded-3xl p-6 sm:p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0092df]/20 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                                <Mail className="w-12 h-12 text-[#0092df] mb-6 relative z-10" />
                                <h3 className="text-3xl font-black text-white mb-4 tracking-tight relative z-10">Want More Insights?</h3>
                                <p className="text-slate-300 mb-8 font-medium text-sm leading-relaxed relative z-10">Join 5,000+ executives receiving our weekly financial architecture digest.</p>
                                <button className="w-full py-4 bg-[#0092df] hover:bg-[#007bc0] text-white font-black uppercase tracking-widest text-xs rounded-xl transition-colors relative z-10">
                                    Subscribe Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* SECTION 4: NEWSLETTER BANNER */}
            <section className="py-12 sm:py-24 bg-white border-t border-slate-100 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0092df]/5 blur-[150px] rounded-full pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-4 block">Stay Updated</span>
                    <h2 className="text-3xl sm:text-5xl font-black text-[#003580] mb-4 sm:mb-6 tracking-tight">Never Miss a Tax Update</h2>
                    <p className="text-slate-600 text-sm sm:text-lg mb-8 sm:mb-12 max-w-xl mx-auto font-medium leading-relaxed">Get meticulous financial engineering insights delivered directly to your executive inbox.</p>
                    <form className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="executive@yourfirm.com"
                            className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0092df] focus:border-[#0092df] transition-all placeholder:text-slate-400"
                        />
                        <button type="submit" className="bg-[#003580] hover:bg-[#002050] text-white px-10 py-4 rounded-xl font-black tracking-widest uppercase text-xs transition-all duration-300 shadow-lg shadow-[#003580]/20 hover:-translate-y-0.5 whitespace-nowrap">
                            Subscribe Securely
                        </button>
                    </form>
                    <p className="mt-6 text-slate-400 text-[10px] uppercase tracking-widest">Privacy compliant. Zero spam. Pure intelligence.</p>
                </div>
            </section>

            {/* SECTION 5: TOPICS & SIDEBAR */}
            <section className="py-12 sm:py-24 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Main Topics Area */}
                        <div className="lg:w-2/3">
                            <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-2 block">Browse Topics</span>
                            <h3 className="text-3xl font-black text-[#003580] tracking-tight mb-12 pb-4 border-b border-slate-200">Knowledge Categories</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {categories.filter(c => c !== "All").map((cat) => (
                                    <div
                                        key={cat}
                                        className="group p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-[#0092df]/10 hover:border-[#0092df]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        <div className="w-10 h-10 bg-[#0092df]/10 group-hover:bg-[#0092df] rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                                            <ArrowRight className="w-5 h-5 text-[#0092df] group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <h4 className="text-xl font-black text-[#003580] mb-2 tracking-tight">{cat}</h4>
                                        <p className="text-slate-600 text-sm font-medium leading-relaxed">Expert insights and updates related to {cat.toLowerCase()}.</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-1/3 space-y-8">
                            {/* CTA Card 1 */}
                            <div className="bg-[#003580] p-6 sm:p-10 rounded-3xl relative overflow-hidden group shadow-xl shadow-[#003580]/20">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0092df]/20 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                                <h4 className="text-white font-black text-2xl mb-4 tracking-tight relative z-10">Need Tax Help?</h4>
                                <p className="text-slate-300 text-sm mb-8 leading-relaxed font-medium relative z-10">Schedule a 15-minute diagnostic session with our lead architects.</p>
                                <button className="w-full py-3.5 border-2 border-[#0092df] text-[#0092df] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#0092df] hover:text-white transition-all relative z-10">
                                    Book Consultation
                                </button>
                            </div>

                            {/* CTA Card 2 */}
                            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-[#0092df]/10 hover:border-[#0092df]/20 transition-all duration-300">
                                <h4 className="text-[#003580] font-black text-2xl mb-4 tracking-tight">Tax Estimator</h4>
                                <p className="text-slate-600 text-sm mb-8 leading-relaxed font-medium">Utilize our proprietary engine to calculate your projected 2025 liability.</p>
                                <button className="w-full py-3.5 bg-[#003580] hover:bg-[#002050] text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#003580]/20 hover:-translate-y-0.5">
                                    <Calculator className="w-4 h-4" />
                                    Open Estimator
                                </button>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50">
                                <h4 className="text-[#003580] font-black text-xs uppercase tracking-[0.3em] mb-6 pb-4 border-b border-slate-100">Resource Library</h4>
                                <ul className="space-y-4">
                                    {["Whitepapers", "Compliance Checklists", "Case Studies", "Webinar Archives"].map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-slate-500 hover:text-[#0092df] transition-colors flex items-center justify-between group">
                                                <span className="text-sm font-medium">{link}</span>
                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#0092df]" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
