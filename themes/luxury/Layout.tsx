
import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CartDrawer from "../../components/shop/CartDrawer";
import FloatingChat from "../../components/ui/FloatingChat";

/**
 * Luxury Dark Theme Layout.
 * This theme features a sophisticated dark palette, generous whitespace,
 * and a premium aesthetic.
 */
export default function LuxuryLayout({
  children,
  settings,
  mainMenu,
}: {
  children: React.ReactNode;
  settings: any;
  mainMenu: any;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0b] text-[#e1e1e3] selection:bg-indigo-500/30">
      {/* Luxury Style Header */}
      <div className="border-b border-white/5 py-2">
        <Header 
          initialSettings={{
            ...settings,
            headerBackgroundColor: "transparent",
            headerTextColor: "#ffffff"
          }} 
          initialMenuItems={mainMenu?.items || []} 
        />
      </div>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Luxury Style Footer */}
      <div className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
        <Footer initialSettings={settings} />
      </div>

      <CartDrawer />
      <FloatingChat settings={settings} />
      
      <style jsx global>{`
        h1, h2, h3, h4, .font-serif {
          font-family: 'Playfair Display', serif !important;
          letter-spacing: -0.02em;
        }
        body {
          letter-spacing: 0.01em;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  );
}
