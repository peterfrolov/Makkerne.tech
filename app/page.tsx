import { Hero } from "@/components/hero";
import { Contact, Faq, Footer, LiveExamples, Pricing, Process } from "@/components/sections";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <LiveExamples />
        <Pricing />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
