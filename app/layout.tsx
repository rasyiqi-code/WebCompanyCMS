import "./styles.css";
import { Providers } from "./providers";
import { Metadata } from "next";
import Script from "next/script";
import { getSiteSettings } from "../lib/settings";

import { Inter, Lato, Montserrat, Playfair_Display, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-inter" });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700", "900"], variable: "--font-lato" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], variable: "--font-montserrat" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-playfair" });
const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-roboto" });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: settings.siteName || "Builder",
      template: settings.seoTitle || `%s - ${settings.siteName || "Builder"}`,
    },
    description: settings.description || "Built with Builder",
    keywords: settings.seoKeywords ? settings.seoKeywords.split(",") : [],
    icons: settings.faviconUrl ? [{ rel: "icon", url: settings.faviconUrl }] : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: baseUrl,
      siteName: settings.siteName || "Builder",
      images: settings.seoImage ? [{ url: settings.seoImage }] : undefined,
    },
    verification: {
      google: settings.googleSiteVerificationId || undefined,
    }
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": settings.siteName || "Builder",
    "alternateName": settings.tagline || undefined,
    "url": baseUrl,
    "description": settings.description,
    "publisher": {
      "@type": "Organization",
      "name": settings.siteName || "Builder",
      "logo": {
        "@type": "ImageObject",
        "url": settings.logoUrl || `${baseUrl}/logo.png`
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${lato.variable} ${montserrat.variable} ${playfair.variable} ${roboto.variable}`}>
      <body className="min-h-screen">
        <style precedence="default" dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-inter: ${inter.style.fontFamily};
              --font-lato: ${lato.style.fontFamily};
              --font-montserrat: ${montserrat.style.fontFamily};
              --font-playfair: ${playfair.style.fontFamily};
              --font-roboto: ${roboto.style.fontFamily};
            }
            body {
              font-family: var(--font-inter), sans-serif;
            }
          `
        }} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {settings.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${settings.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
