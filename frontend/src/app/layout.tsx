import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { MotionProvider } from "@/components/providers/motion-provider";
import { JsonLd } from "@/components/marketing/json-ld";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pikzelkraft — Digital Marketing & IT Solutions",
    template: "%s | Pikzelkraft",
  },
  description:
    "Pikzelkraft delivers pixel-perfect digital marketing and IT solutions for ambitious brands.",
  keywords: ["digital marketing", "IT solutions", "web development", "Pikzelkraft"],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Pikzelkraft",
    title: "Pikzelkraft — Digital Marketing & IT Solutions",
    description:
      "Pikzelkraft delivers pixel-perfect digital marketing and IT solutions for ambitious brands.",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pikzelkraft — Digital Marketing & IT Solutions",
    description:
      "Pikzelkraft delivers pixel-perfect digital marketing and IT solutions for ambitious brands.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pikzelkraft",
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Level 4, Pinnacle Tech Park, HSR Layout",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560102",
    addressCountry: "IN",
  },
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
    siteConfig.social.twitter,
    siteConfig.social.youtube,
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pikzelkraft",
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
