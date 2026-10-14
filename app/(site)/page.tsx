import { Hero } from "@/components/hero";
import { Contact, Examples, Footer, Pricing, Process } from "@/components/sections";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Examples />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
