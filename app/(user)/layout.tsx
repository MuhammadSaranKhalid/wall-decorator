import type React from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { FloatingWhatsApp } from "@/components/whatsapp";
import { MetaPixel } from "@/components/meta-pixel";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#F8F6F3] text-[#2E2C2A] font-sans">
        <MetaPixel />

        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <BottomNavigation />
            <FloatingWhatsApp />
          </div>
        </Providers>
      </body>
    </html>
  );
}

export const metadata = {
  generator: "v0.dev",
};
