"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { type BlogPost } from "@/data/blogData";
import { Search, ArrowRight, Mail, Calculator, Share2, CornerDownRight } from "lucide-react";

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
        // Find first featured post, or fall back to the first post in the list
        return filteredPosts.find(post => post.featured) || filteredPosts[0];
    }, [filteredPosts]);

    const gridPosts = useMemo(() => {
        // Exclude the featured post from the grid list if it exists and we're showing all or just that category
        if (!featuredPost) return [];
        return filteredPosts.filter(post => post.slug !== featuredPost.slug);
    }, [filteredPosts, featuredPost]);

    return (
        <div className="bg-surface font-body text-on-surface">
            <style>{`
                .grid-texture {
                    background-image: radial-gradient(#00C2CB 0.5px, transparent 0.5px);
                    background-size: 30px 30px;
                }
            `}</style>
            {/* SECTION 1: BLOG HERO BANNER */}
            <section className="relative pt-40 pb-24 bg-[#0047AB] overflow-hidden">
                <div className="absolute inset-0 bg-secondary/5 grid-texture pointer-events-none opacity-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full"></div>
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <h1 className="font-headline text-5xl md:text-7xl text-white mb-6 leading-tight">
                        Tax Insights & <br />
                        <span className="bg-gradient-to-r from-[#00C2CB] to-[#97f0ff] bg-clip-text text-transparent">
                            Financial Intelligence
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-on-primary-container text-lg mb-12 font-light">
                        Stay informed with the latest tax tips, financial strategies, and legislative updates curated by our senior architects of wealth.
                    </p>
                    <div className="max-w-xl mx-auto mb-16 relative">
                        <input
                            type="text"
                            placeholder="Search insights..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/10 border-2 border-secondary/40 rounded-full py-4 px-8 text-white focus:ring-2 focus:ring-secondary focus:border-secondary transition-all placeholder:text-white/50"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:scale-110 transition-transform">
                            <Search className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-full border ${selectedCategory === cat ? 'border-secondary text-secondary bg-secondary/10' : 'border-white/10 text-slate-300 hover:border-secondary/50 hover:text-white'} transition-all font-label text-[10px] font-black uppercase tracking-[0.2em]`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 2: FEATURED POST */}
            {featuredPost && (
                <section className="bg-[#003580] py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col lg:flex-row items-center gap-12 group overflow-hidden bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-8">
                            <div className="lg:w-1/2 w-full overflow-hidden rounded-xl relative h-[400px]">
                                {featuredPost.image ? (
                                    <Image
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-[#0047AB] flex items-center justify-center">
                                        <CornerDownRight className="w-12 h-12 text-secondary/30" />
                                    </div>
                                )}
                            </div>
                            <div className="lg:w-1/2 w-full">
                                <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded font-label text-[10px] font-black uppercase tracking-widest mb-6">
                                    Featured Insight
                                </span>
                                <h2 className="font-headline text-4xl text-white mb-6 leading-tight">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-on-primary-container text-lg mb-8 leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-white/10 border border-secondary/30 overflow-hidden relative">
                                        <Image
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb2fbflM3WQEL4GC36HymGmmpKnz0eLSSuOhfZT7BJukCRfj2HGwjZ2B2ETouhXdCFmEZ98XG--me0LLqyFdI5OWs-aHcpj-Zbda3K23VA6C_Ghp64dchUJNgidKs9NaUBKPMTFd9g94YMc5fsvXprfRLxC7z09tTaViju_7TIDftv8VdWBq18qs-r0yW8UpUm55bwQkkDtMqYaElSZ8x0zBQL8lH8XYRBAqtlmYzR7EzO48ty_PZSRNx82Mhi3ZznMulprgIQLC4"
                                            alt="Author"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm">Marcus Sterling</p>
                                        <p className="text-on-primary-container text-xs uppercase tracking-tighter">Managing Partner</p>
                                    </div>
                                </div>
                                <Link
                                    href={`/blog/${featuredPost.slug}`}
                                    className="inline-flex items-center gap-2 bg-secondary text-[#003580] px-8 py-3.5 rounded-lg font-label font-black tracking-widest uppercase text-xs hover:bg-[#33ced5] transition-colors"
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
            <section className="bg-surface-container-low py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {gridPosts.map((post) => (
                            <div
                                key={post.slug}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg border-t-4 border-secondary hover:-translate-y-2 transition-transform duration-300 flex flex-col"
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
                                        <div className="w-full h-full bg-gradient-to-br from-secondary/10 to-[#0047AB]/10 flex items-center justify-center">
                                            <CornerDownRight className="w-12 h-12 text-secondary/30" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex justify-between items-center mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span>{post.category}</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="font-headline text-2xl text-[#0047AB] mb-4 hover:text-secondary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                                        <span className="text-slate-400 text-xs">{post.readTime}</span>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="text-secondary font-black text-xs uppercase tracking-widest hover:text-[#0047AB] transition-colors inline-flex items-center gap-1"
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
                            <div className="bg-[#003580] rounded-2xl p-10 flex flex-col justify-center items-center text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-secondary/5 radial-gradient"></div>
                                <Mail className="w-12 h-12 text-secondary mb-6" />
                                <h3 className="font-headline text-3xl text-white mb-4">Want More Insights?</h3>
                                <p className="text-slate-300 mb-8">Join 5,000+ executives receiving our weekly financial architecture digest.</p>
                                <button className="w-full py-4 bg-secondary text-[#003580] font-black uppercase tracking-widest text-xs rounded-lg hover:bg-[#33ced5] transition-colors">
                                    Subscribe Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* SECTION 4: NEWSLETTER BANNER */}
            <section className="py-24 bg-[#0047AB] relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-secondary/10 blur-[150px] rounded-full"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h2 className="font-headline text-5xl text-white mb-6">Never Miss a Tax Update</h2>
                    <p className="text-slate-300 text-lg mb-12 max-w-xl mx-auto">Get meticulous financial engineering insights delivered directly to your executive inbox.</p>
                    <form className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="executive@yourfirm.com"
                            className="flex-grow bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-white/15 transition-all"
                        />
                        <button type="submit" className="bg-secondary text-[#003580] px-10 py-4 rounded-lg font-label font-black tracking-widest uppercase text-xs hover:bg-[#33ced5] transition-colors whitespace-nowrap">
                            Subscribe Securely
                        </button>
                    </form>
                    <p className="mt-6 text-slate-400 text-[10px] uppercase tracking-widest">Privacy compliant. Zero spam. Pure intelligence.</p>
                </div>
            </section>

            {/* SECTION 5: TOPICS & SIDEBAR */}
            <section className="py-24 bg-surface">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Main Topics Area */}
                        <div className="lg:w-2/3">
                            <h3 className="font-label text-xs font-black text-secondary uppercase tracking-[0.3em] mb-12 border-b border-slate-200 pb-4">Knowledge Categories</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {categories.filter(c => c !== "All").map((cat) => (
                                    <div key={cat} className="p-8 bg-white border-l-4 border-secondary shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCategory(cat)}>
                                        <h4 className="font-headline text-xl text-[#0047AB] mb-2">{cat}</h4>
                                        <p className="text-slate-500 text-sm">Expert insights and updates related to {cat.toLowerCase()}.</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:w-1/3 space-y-12">
                            {/* CTA Card 1 */}
                            <div className="bg-[#003580] p-10 rounded-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/20 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                                <h4 className="text-white font-headline text-2xl mb-4">Need Tax Help?</h4>
                                <p className="text-slate-300 text-sm mb-8">Schedule a 15-minute diagnostic session with our lead architects.</p>
                                <button className="w-full py-3 border border-secondary text-secondary text-[10px] font-black uppercase tracking-widest rounded hover:bg-secondary hover:text-[#003580] transition-all">
                                    Book Consultation
                                </button>
                            </div>

                            {/* CTA Card 2 */}
                            <div className="bg-slate-50 p-10 rounded-2xl border-t-4 border-secondary">
                                <h4 className="text-[#0047AB] font-headline text-2xl mb-4">Tax Estimator</h4>
                                <p className="text-slate-600 text-sm mb-8">Utilize our proprietary engine to calculate your projected 2025 liability.</p>
                                <button className="w-full py-3.5 bg-secondary text-[#003580] text-[10px] font-black uppercase tracking-widest rounded flex items-center justify-center gap-2 hover:bg-[#33ced5] transition-colors">
                                    <Calculator className="w-4 h-4" />
                                    Open Estimator
                                </button>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="font-label text-xs font-black text-[#0047AB] uppercase tracking-[0.3em] mb-6 border-b border-slate-200 pb-2">Resource Library</h4>
                                <ul className="space-y-4">
                                    {["Whitepapers", "Compliance Checklists", "Case Studies", "Webinar Archives"].map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-slate-500 hover:text-secondary transition-colors flex items-center justify-between group">
                                                <span className="text-sm">{link}</span>
                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
