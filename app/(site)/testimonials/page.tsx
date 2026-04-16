import { getTestimonials } from "../../../lib/get-testimonials";
import Image from "next/image";
import { Quote, Star, MessageSquarePlus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Testimonials",
    description: "What our clients and partners say about their experience with Unived Press.",
};

export default async function TestimonialsPage() {
    const testimonials = await getTestimonials();

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={16}
                className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-white border-b border-gray-200 overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-5 pointer-events-none">
                    <Quote size={400} />
                </div>
                <div className="max-w-7xl mx-auto px-6 py-20 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
                            Verified <span className="text-blue-600">Client Stories</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-gray-500 leading-relaxed">
                            Discover how we've helped authors, researchers, and institutions achieve their publishing goals.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials List */}
            <section className="flex-1 py-16 lg:py-24 max-w-7xl mx-auto px-6 lg:px-8">
                {testimonials.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-300">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No stories shared yet</h3>
                        <p className="text-gray-500 mb-8">Be the first one to share your journey with us.</p>
                        <Link
                            href="/submit-testimonial"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium"
                        >
                            <MessageSquarePlus size={20} className="mr-2" /> Share Your Story
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                            >
                                <div className="flex gap-1 mb-6">
                                    {renderStars(item.rating || 5)}
                                </div>
                                <div className="relative flex-1 mb-8">
                                    <Quote size={24} className="absolute -top-2 -left-2 text-blue-100 -z-0 rotate-180" />
                                    <p className="text-gray-700 leading-relaxed relative z-10 italic">
                                        "{item.quote}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-blue-50 flex-shrink-0 border-2 border-white shadow-sm">
                                        {item.avatarUrl ? (
                                            <Image
                                                src={item.avatarUrl}
                                                alt={item.author}
                                                fill
                                                sizes="48px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-bold text-blue-600">
                                                {item.author.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-gray-900 truncate">
                                            {item.author}
                                        </h4>
                                        <p className="text-sm text-gray-500 truncate">
                                            {item.role || "Author"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 py-16">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Ready to start your own publishing journey?
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/submit-testimonial"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-2xl hover:bg-gray-50 transition-all font-bold shadow-lg"
                        >
                            <MessageSquarePlus size={20} className="mr-2" /> Share Your Experience
                        </Link>
                        <Link
                            href="/shop"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-2xl hover:bg-white/10 transition-all font-bold"
                        >
                            Browse Our Books
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
