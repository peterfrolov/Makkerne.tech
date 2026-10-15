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

          <ul className="mt-6 grid max-w-lg gap-x-6 gap-y-2 sm:grid-cols-2">
            {h.setup.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-lg">
                <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

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

        <div className="hidden justify-center lg:col-span-5 lg:flex">
          <PhonePreview src={t.examples.items[0].href} title={h.phone} cta={h.tryIt} />
        </div>
      </div>
    </section>
  );
}
