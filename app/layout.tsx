import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { ClientLayout, StructuredData, VercelAnalytics } from "@/components";
import { SITE } from "@/lib/seo";

import "./globals.css";
import "./pdf-viewer.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.tagline,
  keywords: [
    "frontend engineer Vietnam",
    "senior frontend developer",
    "React engineer",
    "Next.js developer",
    "UI architecture",
    "design systems",
    "Vietnamese software engineer",
    "frontend developer",
    "react developer",
    "nextjs developer",
    "typescript developer",
    "web developer",
    "portfolio",
    "Hoang Le",
    "senior frontend engineer",
    "javascript developer",
    "ui developer",
    "web applications",
    "responsive design",
    "modern web development",
    "frontend architecture",
    "react portfolio",
    "nextjs portfolio",
    "developer portfolio vietnam",
    "scalable UI systems",
    "product-driven engineering",
  ],
  category: "Technology",
  classification: "Portfolio",
  referrer: "origin-when-cross-origin",
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: SITE.name,
    description: SITE.tagline,
    siteName: SITE.name,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} - ${SITE.role} Portfolio`,
        type: "image/jpeg",
      },
    ],
    countryName: "Vietnam",
  },
  other: {
    "linkedin:profile": "https://linkedin.com/in/ivermin1123",
    "facebook:profile": "https://facebook.com/ivermin1123",
    "instagram:profile": "https://instagram.com/ivermin1123",
    "profile:linkedin": "https://linkedin.com/in/ivermin1123",
    "profile:facebook": "https://facebook.com/ivermin1123",
    "profile:instagram": "https://instagram.com/ivermin1123",
    "article:author": "Hoang Le",
    "article:publisher": "https://hoangle.xyz",
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "application-name": "Hoang Le Portfolio",
    "msapplication-tooltip": "Hoang Le - Senior Frontend Engineer Portfolio",
    "msapplication-starturl": "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "XK1SmGtmdwvEc5MMQ48bn65an3iMGt0couYZlKKWimQ",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="XK1SmGtmdwvEc5MMQ48bn65an3iMGt0couYZlKKWimQ"
        />
        <StructuredData />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
        <VercelAnalytics />
      </body>
    </html>
  );
}
