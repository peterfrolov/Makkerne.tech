"use client";

import { useLang } from "./lang";
import { PhonePreview } from "./phone-preview";

export function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section className="border-b border-ink/15 pt-18">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <h1 className="font-cond font-extrabold uppercase leading-[0.92] tracking-tight">
            <span className="block text-5xl sm:text-7xl">{h.title}</span>
            <span className="mt-2 inline-block bg-brand px-2 text-6xl sm:text-7xl xl:text-[5.4rem]">{h.titleHighlight}</span>
          </h1>

          <p className="mt-6 max-w-lg text-xl leading-relaxed text-ink/80">{h.lead}</p>

          {/* The one thing people worry about: the domain. Say plainly that we sort it out. */}
          <p className="mt-6 flex max-w-lg items-start gap-3 border-l-4 border-brand bg-card px-4 py-3 text-lg leading-snug">
            <svg viewBox="0 0 24 24" className="mt-0.5 size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
            </svg>
            <span>
              <span className="font-semibold">{h.domainTitle}</span> {h.domain}
            </span>
          </p>

          {/* One clear way in: the price calculator. The examples are a quiet second choice. */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#beregner" className="inline-flex items-center gap-3 bg-ink px-8 py-4 font-cond text-2xl font-bold uppercase tracking-wide text-paper shadow-[6px_6px_0_0_var(--color-brand)] transition hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_var(--color-brand)]">
              {h.cta} <span aria-hidden>→</span>
            </a>
            <a href="#eksempler" className="text-base font-medium text-ink/70 underline underline-offset-4 transition hover:text-ink">
              {h.seeExamples}
            </a>
          </div>
          <p className="mt-4 text-sm font-medium text-ink/60">{h.ctaNote}</p>
        </div>

        <div className="flex justify-center lg:col-span-5">
          <PhonePreview items={t.examples.items} title={h.phone} cta={h.tryIt} pick={h.pickTrade} />
        </div>
      </div>
    </section>
  );
}
