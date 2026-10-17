"use client";

import { useLang } from "./lang";
import { PhonePreview } from "./phone-preview";
import { setTrade, useTrade } from "./trade-store";

/**
 * First view: who we build for, in one line, and a button for each trade. The trade buttons are
 * the way in: on a computer they swap the phone next to them, on a phone they jump to the example.
 */
export function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const items = t.examples.items;
  const sel = useTrade();

  return (
    <section className="border-b border-ink/15 pt-18">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-12 sm:px-8 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-7">
          <h1 className="font-cond font-extrabold uppercase leading-[0.92] tracking-tight">
            <span className="block text-5xl sm:text-7xl">{h.title}</span>
            <span className="mt-3 inline-block bg-brand px-2 pt-1 text-[2.6rem] leading-[0.95] min-[360px]:text-5xl min-[420px]:text-6xl sm:text-7xl xl:text-[5.4rem]">{h.titleHighlight}</span>
          </h1>

          <p className="mt-6 max-w-lg text-xl leading-relaxed text-ink/80">{h.lead}</p>

          <p className="mt-9 font-cond text-lg font-bold uppercase tracking-wide">{h.pickTrade}</p>
          <ul className="mt-3 flex max-w-xl flex-wrap gap-2">
            {items.map((it, i) => (
              <li key={it.slug}>
                <a
                  href="#eksempler"
                  aria-current={i === sel ? "true" : undefined}
                  onClick={(e) => {
                    setTrade(i);
                    // On a computer the phone is right here, so stay put and let it change.
                    if (window.matchMedia("(min-width: 1024px)").matches) e.preventDefault();
                  }}
                  className={`block whitespace-nowrap border-2 border-ink px-4 py-2 font-cond text-xl font-bold uppercase transition ${
                    i === sel ? "bg-ink text-paper lg:shadow-[4px_4px_0_0_var(--color-brand)]" : "bg-card hover:bg-brand"
                  }`}
                >
                  {it.trade}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#eksempler" className="inline-flex items-center gap-2 whitespace-nowrap border-b-2 border-ink pb-0.5 font-cond text-xl font-bold uppercase transition hover:border-brand">
              {h.allExamples} <span aria-hidden>↓</span>
            </a>
            <a href="#beregner" className="whitespace-nowrap text-base font-medium text-ink/70 underline underline-offset-4 transition hover:text-ink">
              {h.priceLink}
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:col-span-5">
          <PhonePreview items={items} title={h.phone} cta={h.tryIt} />
        </div>
      </div>
    </section>
  );
}
