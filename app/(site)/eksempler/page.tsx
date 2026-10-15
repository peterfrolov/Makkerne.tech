import type { Metadata } from "next";
import { ExamplesPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Eksempler",
  description: "Se Makkernes eksempler: hjemmesider til VVS'ere, tømrere og malere – til en fast pris på 999,-.",
};

export default function Page() {
  return <ExamplesPage />;
}
