import { db } from "../../../../lib/db";
import { puckPages } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import TiptapRenderer from "@/components/TiptapRenderer";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const path = `/${slug}`;

    const [page] = await db.select()
        .from(puckPages)
        .where(eq(puckPages.path, path))
        .limit(1);

    if (!page) return {};

    return {
        title: page?.title || "Page",
    };
}

export default async function StandardPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const path = `/${slug}`;

    const [page] = await db.select()
        .from(puckPages)
        .where(eq(puckPages.path, path))
        .limit(1);

    if (!page) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-12 lg:px-8">
                <header className="mb-10 text-center">
                    {page.title && <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">{page.title}</h1>}
                </header>
                <TiptapRenderer content={page.body || ""} />
            </div>
        </div>
    );
}
