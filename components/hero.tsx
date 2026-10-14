"use client";

import { motion } from "framer-motion";
import { PRICE } from "@/lib/content";
import { useLang } from "./lang";

const HERO_PHOTO = "https://images.unsplash.com/photo-1635424824800-692767998d07?auto=format&fit=crop&w=1400&q=75";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="relative flex min-h-svh flex-col pt-18">
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 py-12 sm:px-8 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-7">
          <motion.p
            className="mb-6 inline-block border-2 border-ink bg-card px-3 py-1.5 font-mono text-xs uppercase tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {t.hero.badge}
          </motion.p>

          <motion.h1
            className="font-cond font-black uppercase leading-[0.88] tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="block text-4xl text-ink/55 sm:text-6xl">{t.hero.line1}</span>
            <span className="mt-1 block text-6xl sm:text-8xl lg:text-[7.5rem]">
              <span className="box-decoration-clone bg-brand px-2">{t.hero.line2}</span>
            </span>
            <span className="mt-3 block text-3xl sm:text-5xl">{t.hero.line3}</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink/75"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {t.hero.lead}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <a
              href="#kontakt"
              className="border-2 border-ink bg-ink px-7 py-3.5 font-cond text-xl font-extrabold uppercase tracking-wide text-paper shadow-[5px_5px_0_var(--color-brand)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-brand)]"
            >
              {t.hero.write} →
            </a>
            <a
              href="#eksempler"
              className="border-2 border-ink px-7 py-3.5 font-cond text-xl font-extrabold uppercase tracking-wide transition hover:bg-brand"
            >
              {t.hero.seeExamples}
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative lg:col-span-5"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hard border-2 border-ink bg-ink">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote stock photo, sized via the URL */}
            <img src={HERO_PHOTO} alt={t.hero.photo} className="aspect-[4/5] w-full object-cover grayscale-[20%] contrast-110" />
          </div>
          <div className="absolute -left-4 bottom-10 -rotate-6 border-2 border-ink bg-brand px-5 py-3 shadow-[4px_4px_0_var(--color-ink)] sm:-left-8">
            <p className="font-mono text-[11px] uppercase tracking-widest">{t.hero.sticker}</p>
            <p className="font-cond text-6xl font-black leading-none">{PRICE}</p>
          </div>
        </motion.div>
      </div>

      <dl className="mx-auto grid w-full max-w-7xl grid-cols-3 border-y-2 border-ink sm:border-x-2">
        {t.stats.map((s, i) => (
          <div key={s.label} className={`px-4 py-5 sm:px-8 ${i ? "border-l-2 border-ink" : ""}`}>
            <dt className="font-cond text-3xl font-black uppercase sm:text-5xl">{s.value}</dt>
            <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink/60 sm:text-xs">{s.label}</dd>
          </div>
        ))}
      </dl>

      <div className="tape mt-10 h-7 border-y-2 border-ink" aria-hidden />

      <div className="overflow-hidden bg-ink py-4 text-paper">
        <motion.div
          className="flex w-max gap-8 whitespace-nowrap font-cond text-3xl font-extrabold uppercase sm:text-4xl"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-8" aria-hidden={k === 1}>
              {t.trades.map((w) => (
                <span key={w} className="flex items-center gap-8">
                  {w} <span className="text-brand">■</span>
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
