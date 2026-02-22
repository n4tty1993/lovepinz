import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar/Navbar";
import { Footer } from "@/components/shared/Footer/Footer";
import { Providers } from "@/components/shared/Providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Custom Magnetic Pins — No Holes. No Damage.",
  description:
    "Design and order custom enamel magnetic pins online. No holes, no fabric damage. Minimum 25 pieces. Free shipping across the USA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          {process.env.NODE_ENV === "development" && (
              <Script
                  src="//unpkg.com/react-grab/dist/index.global.js"
                  crossOrigin="anonymous"
                  strategy="beforeInteractive"
              />
          )}
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
