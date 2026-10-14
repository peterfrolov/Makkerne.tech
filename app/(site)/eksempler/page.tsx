import type { Metadata } from "next";
import { ExamplesPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Design-eksempler",
  description: "Se Makkernes design-eksempler: hjemmesider til frisører, caféer og restauranter – til en fast pris på 599,-.",
};

export default function Page() {
  return <ExamplesPage />;
}
