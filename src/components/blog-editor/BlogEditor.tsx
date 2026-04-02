"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bold, Italic, Link as LinkIcon, Image as ImageIcon, Heading2, Heading3, Code, List, ListOrdered, Quote } from 'lucide-react';
import { sanitizeHtml, generateBlogJsonLd, BlogPayload } from '@/utils/seo';
import type { BlogPost } from '@/data/blogData';
import { saveBlogPost } from '@/app/actions/blog';
import { useRouter } from 'next/navigation';

interface BlogEditorProps {
    initialData?: BlogPost | null;
}

export default function BlogEditor({ initialData }: BlogEditorProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [metaTitle, setMetaTitle] = useState(initialData?.title || '');
    const [metaDescription, setMetaDescription] = useState(initialData?.excerpt || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [slugOverride, setSlugOverride] = useState(!!initialData);
    const [htmlContent, setHtmlContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Initialize editor content once
    useEffect(() => {
        if (editorRef.current && initialData && !editorRef.current.innerHTML) {
            let initialHtml = '';
            if (initialData.contentHtml) {
                initialHtml = initialData.contentHtml;
            } else if (initialData.content) {
                initialHtml = initialData.content.map(p => `<p>${p}</p>`).join('');
            }
            editorRef.current.innerHTML = initialHtml;
            setHtmlContent(initialHtml);
        }
    }, [initialData]);

    // Dialog States
    const [linkDialogOpen, setLinkDialogOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkNoFollow, setLinkNoFollow] = useState(false);
    const [linkNewTab, setLinkNewTab] = useState(false);

    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');

    // Range preservation for dialogs
    const [savedRange, setSavedRange] = useState<Range | null>(null);

    // Auto-generate slug from title if not overridden
    useEffect(() => {
        if (!slugOverride) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setSlug(generatedSlug);
        }
    }, [title, slugOverride]);

    const handleEditorInput = () => {
        if (editorRef.current) {
            setHtmlContent(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        handleEditorInput();
        editorRef.current?.focus();
    };

    const saveSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            setSavedRange(selection.getRangeAt(0));
        }
    };

    const restoreSelection = () => {
        const selection = window.getSelection();
        if (selection && savedRange) {
            selection.removeAllRanges();
            selection.addRange(savedRange);
        }
    };

    // Dialog Handlers
    const openLinkDialog = () => {
        saveSelection();
        setLinkUrl('');
        setLinkNoFollow(false);
        setLinkNewTab(false);
        setLinkDialogOpen(true);
    };

    const insertLink = () => {
        restoreSelection();
        if (linkUrl) {
            const rel = linkNoFollow ? 'nofollow' : '';
            const target = linkNewTab ? '_blank' : '';
            const aTag = `<a href="${linkUrl}" ${rel ? `rel="${rel}"` : ''} ${target ? `target="${target}"` : ''}>${window.getSelection()?.toString() || linkUrl}</a>`;
            document.execCommand('insertHTML', false, aTag);
            handleEditorInput();
        }
        setLinkDialogOpen(false);
    };

    const openImageDialog = () => {
        saveSelection();
        setImageUrl('');
        setImageAlt('');
        setImageDialogOpen(true);
    };

    const insertImage = () => {
        restoreSelection();
        if (imageUrl && imageAlt) {
            const imgTag = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%; height: auto;" />`;
            document.execCommand('insertHTML', false, imgTag);
            handleEditorInput();
        } else {
            alert('Alt text is required for accessibility and SEO.');
            return;
        }
        setImageDialogOpen(false);
    };

    // Format block wrapper to enforce semantic HTML constraints
    const toggleBlock = (tag: string) => {
        execCommand('formatBlock', tag);
    };

    // Save and Generate Output
    const handleSave = async () => {
        setIsSaving(true);
        try {
            const sanitizedContent = sanitizeHtml(htmlContent);
            const payload = {
                title: title || 'Untitled',
                excerpt: metaDescription,
                slug: slug,
                contentHtml: sanitizedContent,
                author: { name: 'Admin User' }
            };

            const result = await saveBlogPost(payload);

            if (result.success) {
                alert("Blog Post saved successfully to the database!");
                router.push('/blog');
                router.refresh();
            } else {
                alert("Failed to save blog post: " + result.error);
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("An error occurred while saving the blog post.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">
            {/* Main Editor Canvas (Left/Center) */}
            <div className="flex-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[calc(100vh-8rem)]">

                    {/* Main H1 Title Input */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Main Blog Title (H1)"
                        className="text-4xl font-bold w-full outline-none placeholder-gray-300 border-b border-gray-100 pb-4 mb-4 focus:border-blue-500 transition-colors"
                    />

                    {/* Toolbar */}
                    <div className="flex flex-wrap gap-2 py-3 border-b border-gray-100 mb-4 sticky top-0 bg-white z-10">
                        <button onClick={() => execCommand('bold')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Bold (Ctrl+B)"><Bold size={18} /></button>
                        <button onClick={() => execCommand('italic')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Italic (Ctrl+I)"><Italic size={18} /></button>
                        <div className="w-px bg-gray-200 mx-1"></div>
                        <button onClick={() => toggleBlock('H2')} className="p-2 hover:bg-gray-100 rounded text-gray-700 font-semibold flex items-center gap-1" title="Heading 2"><Heading2 size={18} /></button>
                        <button onClick={() => toggleBlock('H3')} className="p-2 hover:bg-gray-100 rounded text-gray-700 font-semibold flex items-center gap-1" title="Heading 3"><Heading3 size={18} /></button>
                        <div className="w-px bg-gray-200 mx-1"></div>
                        <button onClick={() => toggleBlock('BLOCKQUOTE')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Blockquote"><Quote size={18} /></button>
                        <button onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Bullet List"><List size={18} /></button>
                        <button onClick={() => execCommand('insertOrderedList')} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Numbered List"><ListOrdered size={18} /></button>
                        <div className="w-px bg-gray-200 mx-1"></div>
                        <button onClick={openLinkDialog} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Insert Link"><LinkIcon size={18} /></button>
                        <button onClick={openImageDialog} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Insert Image"><ImageIcon size={18} /></button>
                    </div>

                    {/* Editor Area */}
                    <div
                        ref={editorRef}
                        contentEditable
                        onInput={handleEditorInput}
                        className="flex-1 outline-none prose max-w-none w-full overflow-y-auto"
                        style={{ minHeight: '300px' }}
                        data-placeholder="Start writing your story here..."
                    />
                </div>
            </div>

            {/* SEO & Meta Sidebar (Right Column) */}
            <div className="w-full lg:w-96 space-y-6 flex-shrink-0">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">SEO & Meta settings</h3>

                    {/* Meta Title */}
                    <div className="mb-5">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-gray-700">Meta Title</label>
                            <span className={`text-xs ${metaTitle.length > 60 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                                {metaTitle.length} / 60
                            </span>
                        </div>
                        <input
                            type="text"
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            placeholder="Enter Meta Title..."
                            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${metaTitle.length > 60 ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200'}`}
                        />
                    </div>

                    {/* Meta Description */}
                    <div className="mb-5">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-gray-700">Meta Description</label>
                            <span className={`text-xs ${metaDescription.length > 160 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                                {metaDescription.length} / 160
                            </span>
                        </div>
                        <textarea
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            placeholder="Write a compelling description for search engines..."
                            rows={4}
                            className={`w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 ${metaDescription.length > 160 ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200'}`}
                        />
                    </div>

                    {/* URL Slug */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-semibold text-gray-700">URL Slug</label>
                            <button
                                onClick={() => setSlugOverride(!slugOverride)}
                                className="text-xs text-blue-600 hover:text-blue-800"
                            >
                                {slugOverride ? 'Auto-generate' : 'Manual Override'}
                            </button>
                        </div>
                        <div className="flex items-center">
                            <span className="bg-gray-50 border border-r-0 border-gray-200 text-gray-500 px-3 py-3 rounded-l-lg text-sm">
                                /blog/
                            </span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => {
                                    setSlug(e.target.value);
                                    if (!slugOverride) setSlugOverride(true);
                                }}
                                className="w-full p-3 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>
                    </div>

                    {/* Live SERP Preview */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Live SERP Preview</h4>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-800">IF</div>
                                <div className="text-xs text-gray-800">
                                    <span className="hover:underline cursor-pointer">integrafin.tax</span> › blog › {slug || 'your-slug-here'}
                                </div>
                            </div>
                            <h3 className="text-[#1a0dab] text-xl cursor-pointer hover:underline truncate">
                                {metaTitle || title || 'Your Meta Title Will Appear Here'}
                            </h3>
                            <p className="text-sm text-[#4d5156] line-clamp-2">
                                {metaDescription || 'Your meta description will appear here. Write something compelling to increase click-through rates from search engine results.'}
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`w-full text-white font-bold py-4 rounded-xl transition-colors shadow-sm ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {isSaving ? 'Saving...' : 'Save & Publish'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Link Dialog */}
            {linkDialogOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold mb-4">Insert Link</h3>
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={e => setLinkUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <div className="flex flex-col gap-3 mb-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={linkNoFollow} onChange={e => setLinkNoFollow(e.target.checked)} className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-gray-700">Add rel="nofollow" (Good for external links)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={linkNewTab} onChange={e => setLinkNewTab(e.target.checked)} className="w-4 h-4 text-blue-600" />
                                <span className="text-sm text-gray-700">Open in target="_blank" (New Tab)</span>
                            </label>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setLinkDialogOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                            <button onClick={insertLink} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium">Insert</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Dialog */}
            {imageDialogOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold mb-4">Insert Image</h3>
                        <div className="space-y-4 mb-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    value={imageUrl}
                                    onChange={e => setImageUrl(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Alt Text <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={imageAlt}
                                    onChange={e => setImageAlt(e.target.value)}
                                    placeholder="Describe the image for SEO..."
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                                <p className="text-xs text-gray-500 mt-1">Required for accessibility & SEO.</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setImageDialogOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                            <button onClick={insertImage} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium disabled:opacity-50" disabled={!imageUrl || !imageAlt}>Insert</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
