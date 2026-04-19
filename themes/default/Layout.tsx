
import React from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CartDrawer from "../../components/shop/CartDrawer";
import FloatingChat from "../../components/ui/FloatingChat";

/**
 * Default Theme Layout for Next_CMS.
 * This is the fallback theme that replicates the original site structure.
 */
export default function DefaultLayout({
  children,
  settings,
  mainMenu,
}: {
  children: React.ReactNode;
  settings: any;
  mainMenu: any;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        initialSettings={settings} 
        initialMenuItems={mainMenu?.items || []} 
      />
      <main className="flex-grow">
        {children}
      </main>
      <Footer initialSettings={settings} />
      <CartDrawer />
      <FloatingChat settings={settings} />
    </div>
  );
}
