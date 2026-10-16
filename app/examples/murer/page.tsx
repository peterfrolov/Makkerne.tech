import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { MurerSite } from "@/components/examples/murer";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-example-display" });

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
