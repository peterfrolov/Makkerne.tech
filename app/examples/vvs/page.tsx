import type { Metadata } from "next";
import { Big_Shoulders } from "next/font/google";
import { VvsSite } from "@/components/examples/vvs";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["600", "700", "800"], adjustFontFallback: false, variable: "--font-example-display" });

export const metadata: Metadata = {
  title: { absolute: "Holm VVS – VVS'er i Herlev med døgnvagt (eksempel)" },
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={display.variable}>
      <VvsSite />
    </div>
  );
}
