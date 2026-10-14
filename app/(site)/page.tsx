import { Hero } from "@/components/hero";
import { Callback, Contact, Faq, Footer, LiveExamples, Pricing, Process, Tech, Trades } from "@/components/sections";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <LiveExamples />
        <Trades />
        <Pricing />
        <Tech />
        <Process />
        <Faq />
        <Callback />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
