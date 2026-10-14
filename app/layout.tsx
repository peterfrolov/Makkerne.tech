import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://makkerne.tech"),
  title: { default: "Makkerne", template: "%s · Makkerne" },
  description:
    "Makkerne laver hjemmesider til håndværkere: VVS'ere, tømrere, malere og andre fag. Du klarer håndværket, vi klarer siden. Fast pris: 599,-.",
  openGraph: {
    title: "Makkerne – du klarer håndværket, vi klarer hjemmesiden",
    description: "Hjemmesider til håndværkere, der får telefonen til at ringe. Fast pris: 599,-.",
    locale: "da_DK",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f2ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="da" className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
