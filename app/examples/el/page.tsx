import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { ElSite } from "@/components/examples/el";

const display = Archivo({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-example-display" });

export const metadata: Metadata = {
  title: { absolute: "Fasebro El – elektriker i Køge (eksempel)" },
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={display.variable}>
      <ElSite />
    </div>
  );
}
