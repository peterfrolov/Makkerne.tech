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
            <span className="mt-2 inline-block bg-brand px-2 text-6xl sm:text-8xl">{h.titlePrice}</span>
          </h1>

          <p className="mt-6 max-w-lg text-xl leading-relaxed text-ink/80">
            {h.lead} <span className="font-semibold text-ink">{h.priceNote}</span>
          </p>

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

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#kontakt" className="bg-ink px-6 py-3.5 font-cond text-lg font-bold uppercase tracking-wide text-paper transition hover:bg-ink/85">
              {h.write}
            </a>
            <a href="#eksempler" className="border border-ink px-6 py-3.5 font-cond text-lg font-bold uppercase tracking-wide transition hover:bg-brand">
              {h.seeExamples}
            </a>
          </div>
          <p className="mt-4 text-sm text-ink/60">{h.reassure}</p>
        </div>

        <div className="flex justify-center lg:col-span-5">
          <PhonePreview items={t.examples.items} title={h.phone} cta={h.tryIt} pick={h.pickTrade} />
        </div>
      </div>
    </section>
  );
}
