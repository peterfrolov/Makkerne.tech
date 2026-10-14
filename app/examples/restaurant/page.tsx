import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { RestaurantSite } from "@/components/examples/restaurant";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-example-display" });

export const metadata: Metadata = {
  title: { absolute: "Restaurant Lyng – nordisk mad på Frederiksberg (eksempel)" },
  robots: { index: false },
};

export default function Page() {
  return (
    <div className={display.variable}>
      <RestaurantSite />
    </div>
  );
}
