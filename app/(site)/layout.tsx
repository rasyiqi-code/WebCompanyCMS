import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
// import { CartProvider } from "@/components/providers/cart-provider";
import CartDrawer from "../../components/shop/CartDrawer";
import FloatingChat from "../../components/ui/FloatingChat";

import { getSiteSettings } from "../../lib/settings";

export default async function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const settings = await getSiteSettings();
    return (
        <div className="flex flex-col min-h-screen">
            <Header initialSettings={settings} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer initialSettings={settings} />
            <CartDrawer />
            <FloatingChat settings={settings} />
        </div>
    );
}
