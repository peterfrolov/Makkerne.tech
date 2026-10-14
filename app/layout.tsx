import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const barlow = Barlow_Condensed({ variable: "--font-barlow", subsets: ["latin"], weight: ["600", "700", "800", "900"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

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
  themeColor: "#ebe7de",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="da" className={`${inter.variable} ${barlow.variable} ${plexMono.variable} antialiased`}>
      <body className="min-h-dvh bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
