import BlogEditor from "@/components/blog-editor/BlogEditor";
import { Metadata } from "next";
import { getBlogPostBySlug } from "@/data/blogData";

export const metadata: Metadata = {
    title: "Admin - Blog Editor | IntegraFin",
    description: "Secure, SEO-optimized blog editor for IntegraFin staff.",
};

export default async function BlogEditorPage({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
    // In a real application, server-side auth would guard this page.
    // e.g. if (!session || session.user.role !== 'admin') redirect('/login');

    const { slug } = await searchParams;
    let initialData = null;
    if (slug) {
        initialData = getBlogPostBySlug(slug);
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {initialData ? "Edit Blog Post" : "IntegraFin Blog Editor"}
                </h1>
                <p className="text-gray-600">Secure authoring environment with real-time SEO validation.</p>
            </div>
            <BlogEditor initialData={initialData} />
        </main>
    );
}
