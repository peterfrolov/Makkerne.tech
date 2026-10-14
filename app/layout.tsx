import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://makkerne.tech"),
  title: { default: "Makkerne", template: "%s · Makkerne" },
  description:
    "Makkerne: en ny, moderne hjemmeside til din café, frisørsalon eller restaurant – gratis for de første 5 virksomheder (normalt 599,-).",
  openGraph: {
    title: "Makkerne – en helt ny hjemmeside til din forretning",
    description: "Moderne, hurtige hjemmesider til caféer, frisører og restauranter. Gratis for de første 5 (normalt 599,-).",
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
