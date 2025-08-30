
import "./globals.css";
import type { Metadata } from "next";
import { SITE } from "@/lib/seo";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: SITE.tagline,
  openGraph: { title: SITE.name, description: SITE.tagline, images: [SITE.ogImage] },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.tagline, images: [SITE.ogImage] }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
