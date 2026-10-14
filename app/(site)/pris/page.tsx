import type { Metadata } from "next";
import { PricePage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Pris",
  description: "Gratis hjemmeside til de første 5 virksomheder, normalt 599,-. Til gengæld må vi vise siden frem som reference.",
};

export default function Page() {
  return <PricePage />;
}
