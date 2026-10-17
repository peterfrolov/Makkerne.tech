"use client";

import { useLang } from "./lang";
import { PhonePreview } from "./phone-preview";

/**
 * First view: what we make and for whom, one line under it, one button to the examples, and a
 * real example site on a phone. On a computer it fills the screen, so the examples start below the fold.
 */
export function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section className="border-b border-ink/15 pt-18 lg:flex lg:min-h-svh lg:flex-col lg:justify-center">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-14 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="lg:col-span-7">
          <h1 className="font-cond text-[2rem] font-extrabold uppercase leading-none tracking-tight min-[360px]:text-[2.4rem] min-[400px]:text-5xl sm:text-6xl xl:text-[4.25rem]">
            <span className="block">
              <span className="inline-block bg-brand px-2 pt-[0.07em]">{h.titleHighlight}</span> {h.title}
            </span>
            <span className="mt-[0.2em] block">{h.titleEnd}</span>
          </h1>

          <p className="mt-6 max-w-md text-xl leading-relaxed text-ink/80">{h.lead}</p>

          <a
            href="#eksempler"
            className="mt-10 inline-flex w-full items-center justify-center gap-3 whitespace-nowrap bg-brand px-10 py-5 font-cond text-2xl font-extrabold uppercase tracking-wide text-ink transition hover:bg-brand-dark sm:w-auto sm:min-w-80"
          >
            {h.cta} <span aria-hidden>→</span>
          </a>
        </div>

        <div className="flex justify-center lg:col-span-5">
          <PhonePreview items={t.examples.items} title={h.phone} />
        </div>
      </div>
    </section>
  );
}
