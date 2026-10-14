import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { CafeSite } from "@/components/examples/cafe";

const display = Fraunces({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--font-example-display" });

export const metadata: Metadata = {
  title: { absolute: "Café Kanel – kaffe og bagværk på Nørrebro (eksempel)" },
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={display.variable}>
      <CafeSite />
    </div>
  );
}
