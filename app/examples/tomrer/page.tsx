import type { Metadata } from "next";
import { DM_Serif_Display } from "next/font/google";
import { TomrerSite } from "@/components/examples/tomrer";

const display = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-example-display" });

export const metadata: Metadata = {
  title: { absolute: "Egholm Tømrer & Snedker – tømrer i Roskilde (eksempel)" },
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={display.variable}>
      <TomrerSite />
    </div>
  );
}
