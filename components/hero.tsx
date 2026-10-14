"use client";

import { motion } from "framer-motion";
import { PRICE } from "@/lib/content";
import { useLang } from "./lang";
import { PhonePreview } from "./phone-preview";

export function Hero() {
  const { t } = useLang();

  return (
    <section className="relative pt-26">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">
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
            <a href="#eksempler" className="border-2 border-ink px-7 py-3.5 font-cond text-xl font-extrabold uppercase tracking-wide transition hover:bg-brand">
              {t.hero.seeExamples}
            </a>
            <p className="font-cond text-3xl font-black">
              {PRICE} <span className="font-mono text-xs font-normal uppercase text-ink/60">{t.hero.sticker}</span>
            </p>
          </motion.div>
        </div>

        <motion.div
          className="hidden justify-center lg:col-span-5 lg:flex"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PhonePreview src={t.examples.items[0].href} title={t.hero.phone} cta={t.hero.tryIt} />
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
    </section>
  );
}
