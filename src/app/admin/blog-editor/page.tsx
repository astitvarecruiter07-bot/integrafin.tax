import BlogEditor from "@/components/blog-editor/BlogEditor";
import { Metadata } from "next";
import { getBlogPostBySlug } from "@/app/actions/blog";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Admin - Blog Editor | IntegraFin",
    description: "SEO-focused blog editor for IntegraFin staff.",
    robots: { index: false, follow: false },
};

export default async function BlogEditorPage({ searchParams }: { searchParams: Promise<{ slug?: string }> }) {
    const { slug } = await searchParams;
    const authed = await isAdminAuthenticated();
    if (!authed) {
        const nextPath = slug ? `/admin/blog-editor?slug=${encodeURIComponent(slug)}` : '/admin/blog-editor';
        redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`);
    }

    let initialData = null;
    if (slug) {
        initialData = await getBlogPostBySlug(slug);
    }

    return (
        <main className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {initialData ? "Edit Blog Post" : "IntegraFin Blog Editor"}
                </h1>
                <p className="text-gray-600">Authoring environment with real-time SEO validation.</p>
            </div>
            <BlogEditor initialData={initialData} />
        </main>
    );
}
