"use client";

import { PRICE } from "@/lib/content";
import { useLang } from "./lang";
import { PhonePreview } from "./phone-preview";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="border-b border-ink/15 pt-18">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          <h1 className="font-cond text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl">
            {t.hero.line1}
            <br />
            {t.hero.line2}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75">{t.hero.lead}</p>

          <p className="mt-8 flex items-baseline gap-3">
            <span className="font-cond text-5xl font-extrabold">{PRICE}</span>
            <span className="text-ink/65">{t.hero.priceNote}</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#eksempler" className="bg-ink px-6 py-3.5 font-cond text-lg font-bold uppercase tracking-wide text-paper transition hover:bg-ink/85">
              {t.hero.seeExamples}
            </a>
            <a href="#kontakt" className="border border-ink px-6 py-3.5 font-cond text-lg font-bold uppercase tracking-wide transition hover:bg-brand">
              {t.hero.write}
            </a>
          </div>
        </div>

        <div className="hidden justify-center lg:col-span-5 lg:flex">
          <PhonePreview src={t.examples.items[0].href} title={t.hero.phone} cta={t.hero.tryIt} />
        </div>
      </div>
    </section>
  );
}
