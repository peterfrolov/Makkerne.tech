import type { Metadata } from "next";
import { Zilla_Slab } from "next/font/google";
import { MurerSite } from "@/components/examples/murer";

const display = Zilla_Slab({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-example-display" });

export const metadata: Metadata = {
  title: { absolute: "Teglgaard Murer – murermester i Aarhus (eksempel)" },
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={display.variable}>
      <MurerSite />
    </div>
  );
}
