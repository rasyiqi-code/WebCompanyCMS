import Link from "next/link";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
// import { CartProvider } from "@/components/providers/cart-provider";
import CartDrawer from "../../components/shop/CartDrawer";
import FloatingChat from "../../components/ui/FloatingChat";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <CartDrawer />
            <FloatingChat />
        </div>
    );
}
