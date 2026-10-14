import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { TagSite } from "@/components/examples/tag";

const display = Outfit({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-example-display" });

export const metadata: Metadata = {
  title: { absolute: "Tagværk – tagdækker og tømrer på Sjælland (eksempel)" },
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={display.variable}>
      <TagSite />
    </div>
  );
}
