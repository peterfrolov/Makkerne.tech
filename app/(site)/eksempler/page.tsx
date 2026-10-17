import type { Metadata } from "next";
import { ExamplesPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Eksempler",
  description: "Se Makkernes eksempler: hjemmesider til VVS'ere, tømrere, malere, tagfirmaer, elektrikere og murere. Se hvad vi kan lave til dit firma.",
};

export default function Page() {
  return <ExamplesPage />;
}
