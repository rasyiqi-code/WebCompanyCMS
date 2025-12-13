import { Client } from "./[...puckPath]/client";
import { Metadata } from "next";
import { getPage } from "../../lib/get-page";

export async function generateMetadata(): Promise<Metadata> {
    const pageData = await getPage("/");

    return {
        title: pageData?.title || pageData?.data?.root?.props?.title, // Will use template from layout if not absolute
        description: pageData?.description, // Fallback to layout if undefined
        openGraph: {
            title: pageData?.title || "Home",
            description: pageData?.description,
            images: pageData?.imageUrl ? [{ url: pageData.imageUrl }] : undefined,
        },
    };
}

export default async function Page() {
    const data = await getPage("/");

    if (!data) {
        // If no homepage defined, render a default simple welcome or notFound
        // For builder, better to show something if DB is empty?
        // But getPage('/') handles missing page by returning null.
        // Let's return a default "Welcome" if not found to avoid 404 on clean install
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Builder</h1>
                <p className="text-gray-600">Please create a page with path <code>/</code> to customize this homepage.</p>
            </div>
        );
    }

    if (data.body) {
        return (
            <div className="min-h-screen bg-white">
                {/* Homepage specific layout if needed, otherwise standard container */}
                <div className="max-w-7xl mx-auto px-6 py-12 lg:px-8">
                    {/* Hide title on homepage usually, or make optional. For now render if present */}
                    {data.title && <h1 className="text-center text-4xl font-extrabold text-gray-900 sm:text-5xl mb-10">{data.title}</h1>}
                    <div className="prose prose-lg mx-auto text-gray-600" dangerouslySetInnerHTML={{ __html: data.body }} />
                </div>
            </div>
        );
    }

    return <Client data={data.data} />;
}
