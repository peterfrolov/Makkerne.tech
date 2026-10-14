import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import { VvsSite } from "@/components/examples/vvs";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-example-display" });

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
