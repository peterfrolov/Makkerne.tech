"use client";

import { useLang } from "./lang";
import { Contact, ExamplesByIndustry, Faq, Footer, PageIntro, Pricing, Process } from "./sections";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
        {children}
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export function ExamplesPage() {
  const { t } = useLang();
  return (
    <Shell>
      <PageIntro title={t.examples.pageTitle} lead={t.examples.pageLead} />
      <ExamplesByIndustry />
    </Shell>
  );
}

export function PricePage() {
  const { t } = useLang();
  return (
    <Shell>
      <PageIntro title={t.pricing.title} lead={t.pricing.lead} />
      <Pricing hideHead />
      <Process />
    </Shell>
  );
}

export function ProcessPage() {
  const { t } = useLang();
  return (
    <Shell>
      <PageIntro title={t.process.title} lead={t.process.lead} />
      <Process hideHead />
      <Faq />
    </Shell>
  );
}

export function FaqPage() {
  const { t } = useLang();
  return (
    <Shell>
      <PageIntro title={t.faq.title} />
      <Faq hideHead />
    </Shell>
  );
}
