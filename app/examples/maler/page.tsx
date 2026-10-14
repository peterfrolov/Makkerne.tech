import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { MalerSite } from "@/components/examples/maler";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-example-display" });

export const metadata: Metadata = {
  title: { absolute: "Malerfirmaet Kulør – maler i Odense (eksempel)" },
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={display.variable}>
      <MalerSite />
    </div>
  );
}
