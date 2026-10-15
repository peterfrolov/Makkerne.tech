import type { Metadata } from "next";
import { PricePage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Pris",
  description: "Én fast pris på 999,- for hele hjemmesiden. Ingen pakker, ingen timepris og intet månedligt abonnement.",
};

export default function Page() {
  return <PricePage />;
}
