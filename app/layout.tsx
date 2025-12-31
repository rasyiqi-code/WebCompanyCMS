import "./styles.css";
import { Providers } from "./providers";
import { Metadata } from "next";
import Script from "next/script";
import { getSiteSettings } from "../lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: settings.siteName || "Builder",
      template: settings.seoTitle || `%s | ${settings.siteName || "Builder"}`,
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
    "url": baseUrl,
    "description": settings.description,
    "publisher": {
      "@type": "Organization",
      "name": settings.siteName || "Builder",
      "logo": {
        "@type": "ImageObject",
        "url": settings.logoUrl || `${baseUrl}/logo.png`
      }
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Lato:wght@300;400;700;900&family=Montserrat:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
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
