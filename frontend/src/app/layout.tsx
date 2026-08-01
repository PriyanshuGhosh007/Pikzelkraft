import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
  metadataBase: new URL("https://pikzelkraft.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
