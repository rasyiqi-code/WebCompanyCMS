import React, { useEffect, useState, useId } from "react";
import type { ComponentConfig } from "@measured/puck";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ColorPickerField } from "./fields/ColorPickerField";
import { ResponsiveSliderField, type ResponsiveValue } from "./fields/ResponsiveSliderField";

export type BlogListProps = {
    title?: string;
    description?: string;
    limit?: number;
    showImage?: boolean;
    columns?: number;
    backgroundColor?: string;
    padding?: ResponsiveValue;
    titleColor?: string;
    descriptionColor?: string;
    cardBackgroundColor?: string;
    cardBorderColor?: string;
    cardTitleColor?: string;
    cardTextColor?: string;
    cardDateColor?: string;
    linkColor?: string;
};

type Post = {
    id: string;
    title: string;
    slug: string;
    content: string;
    imageUrl?: string;
    published: boolean;
    createdAt: string;
    authorId?: string;
};

export const BlogList: ComponentConfig<BlogListProps> = {
    label: "Blog List",
    fields: {
        title: { type: "text", label: "Section Title" },
        description: { type: "textarea", label: "Description" },
        limit: { type: "number", label: "Number of posts" },
        columns: { type: "number", label: "Desktop Columns", min: 1, max: 4 },
        backgroundColor: {
            type: "custom",
            label: "Background Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        padding: {
            type: "custom",
            label: "Section Padding (px)",
            render: ({ value, onChange }) => <ResponsiveSliderField value={value} onChange={onChange} min={0} max={200} step={4} />
        },
        titleColor: {
            type: "custom",
            label: "Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        descriptionColor: {
            type: "custom",
            label: "Description Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        cardBackgroundColor: {
            type: "custom",
            label: "Card Background",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        cardBorderColor: {
            type: "custom",
            label: "Card Border Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        cardTitleColor: {
            type: "custom",
            label: "Card Title Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        cardTextColor: {
            type: "custom",
            label: "Card Text Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        cardDateColor: {
            type: "custom",
            label: "Card Date Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
        linkColor: {
            type: "custom",
            label: "Link Color",
            render: ({ value, onChange }) => <ColorPickerField value={value} onChange={onChange} />
        },
    },
    defaultProps: {
        title: "Latest from our Blog",
        description: "Insights and updates from our team.",
        limit: 3,
        columns: 3,
        backgroundColor: "#ffffff",
        padding: { desktop: 80, tablet: 60, mobile: 40 },
        titleColor: "#111827",
        descriptionColor: "#4b5563",
        cardBackgroundColor: "#ffffff",
        cardBorderColor: "#f3f4f6",
        cardTitleColor: "#111827",
        cardTextColor: "#4b5563",
        cardDateColor: "#9ca3af",
        linkColor: "#2563eb",
    },
    render: ({
        title,
        description,
        limit = 3,
        columns = 3,
        backgroundColor = "#ffffff",
        padding = { desktop: 80, tablet: 60, mobile: 40 },
        titleColor = "#111827",
        descriptionColor = "#4b5563",
        cardBackgroundColor = "#ffffff",
        cardBorderColor = "#f3f4f6",
        cardTitleColor = "#111827",
        cardTextColor = "#4b5563",
        cardDateColor = "#9ca3af",
        linkColor = "#2563eb",
    }) => {
        const [posts, setPosts] = useState<Post[]>([]);
        const [loading, setLoading] = useState(true);
        const [mounted, setMounted] = useState(false);
        const id = useId().replace(/:/g, '');
        const uniqueClass = `blog-list-${id}`;

        const getPadding = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.desktop ?? fallback;
        };
        const getTabletPadding = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.tablet ?? val?.desktop ?? fallback;
        };
        const getMobilePadding = (val: ResponsiveValue | undefined, fallback: number) => {
            if (typeof val === 'number') return val;
            return val?.mobile ?? val?.tablet ?? val?.desktop ?? fallback;
        };

        useEffect(() => {
            setMounted(true);
            const fetchPosts = async () => {
                try {
                    // Fetch all and filter/limit client side for MVP simplicity
                    // In production, use query params ?limit=X
                    const res = await fetch("/api/posts"); // Use GET endpoint
                    if (res.ok) {
                        const data = await res.json();
                        // Assume API returns { posts: [] }
                        setPosts(data.posts || []);
                    }
                } catch (e) {
                    console.error("Failed to fetch posts", e);
                } finally {
                    setLoading(false);
                }
            };

            fetchPosts();
        }, []);

        if (!mounted) {
            return <div className="p-8 text-center text-gray-400">Loading Blog...</div>;
        }

        const displayedPosts = posts.filter(p => p.published).slice(0, limit);

        return (
            <section className={uniqueClass} style={{ backgroundColor: backgroundColor }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .${uniqueClass} {
                            padding: ${getPadding(padding, 80)}px 20px;
                        }
                        @media (max-width: 1024px) {
                            .${uniqueClass} {
                                padding: ${getTabletPadding(padding, 60)}px 20px;
                            }
                        }
                        @media (max-width: 640px) {
                            .${uniqueClass} {
                                padding: ${getMobilePadding(padding, 40)}px 20px;
                            }
                        }
                    `
                }} />

                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        {title && <h2 className="text-4xl font-bold mb-4" style={{ color: titleColor }}>{title}</h2>}
                        {description && <p className="text-lg max-w-2xl mx-auto" style={{ color: descriptionColor }}>{description}</p>}
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : displayedPosts.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500">No published posts found.</p>
                        </div>
                    ) : (
                        <div className={`grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`}>
                            {displayedPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                                    style={{
                                        backgroundColor: cardBackgroundColor,
                                        border: `1px solid ${cardBorderColor}`,
                                    }}
                                >
                                    {/* Image Placeholder */}
                                    <div className="h-48 bg-gray-200 w-full relative group overflow-hidden">
                                        {post.imageUrl ? (
                                            <img
                                                src={post.imageUrl}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                                                <span className="text-4xl text-gray-200">📷</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors"></div>
                                        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded text-xs font-bold text-blue-600 uppercase tracking-wide">
                                            Article
                                        </div>
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="text-xs mb-3 block" style={{ color: cardDateColor }}>
                                            {new Date(post.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 line-clamp-2" style={{ color: cardTitleColor }}>
                                            {post.title}
                                        </h3>
                                        <p className="mb-6 line-clamp-3 text-sm leading-relaxed flex-1" style={{ color: cardTextColor }}>
                                            {/* Simple strip tags for excerpt */}
                                            {(() => {
                                                try {
                                                    // Handle both JSON string and plain text for legacy/testing
                                                    const rawContent = post.content || '';
                                                    const textContent = rawContent.startsWith('"') || rawContent.startsWith('{') || rawContent.startsWith('[')
                                                        ? JSON.parse(rawContent)
                                                        : rawContent;

                                                    // If it's still an object (e.g. Tiptap JSON), stringify or just show placeholder
                                                    // For MVP, if it is a string, strip tags.
                                                    if (typeof textContent === 'string') {
                                                        return textContent.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';
                                                    }
                                                    return "Read more...";
                                                } catch (e) {
                                                    return "Read more...";
                                                }
                                            })()}
                                        </p>

                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center font-semibold text-sm hover:translate-x-1 transition-transform"
                                            style={{ color: linkColor }}
                                        >
                                            Read Full Article <ArrowRight size={16} className="ml-2" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    },
};
