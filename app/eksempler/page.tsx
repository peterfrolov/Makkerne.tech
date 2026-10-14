import type { Metadata } from "next";
import { ExamplesPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Design-eksempler",
  description: "Se Makkernes design-eksempler: hjemmesider til frisører, caféer og restauranter – gratis for de første 5 virksomheder (normalt 599,-).",
};

export default function Page() {
  return <ExamplesPage />;
}
