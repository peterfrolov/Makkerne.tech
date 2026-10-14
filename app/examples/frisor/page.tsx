import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { FrisorSite } from "@/components/examples/frisor";

const display = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-example-display" });

export const metadata: Metadata = {
  title: { absolute: "Klip & Co. – frisør i Valby (eksempel)" },
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={display.variable}>
      <FrisorSite />
    </div>
  );
}
