"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { EMAIL } from "@/lib/content";
import { useLang } from "./lang";
import { LiveSite } from "./live-site";
import { Logo } from "./header";
import { ShaderBackdrop } from "./shader-backdrop";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionHead({ title, lead, center = false }: { title: string; lead?: string; center?: boolean }) {
  return (
    <motion.div {...reveal} className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {lead && <p className="mt-4 text-pretty text-lg font-light leading-relaxed text-ink/65">{lead}</p>}
    </motion.div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((tag) => (
        <li key={tag} className="rounded-full border border-ink/10 bg-paper-2/60 px-3 py-1 text-xs text-ink/70">
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** Landing page: the example sites running live, one big box at a time. */
export function LiveExamples() {
  const { t } = useLang();
  const e = t.examples;
  return (
    <section id="eksempler" className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
      <SectionHead title={e.title} lead={e.lead} />
      <div className="space-y-24 sm:space-y-32">
        {e.items.map((item, i) => (
          <div key={item.slug} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`lg:col-span-8 ${i % 2 ? "lg:order-2" : ""}`}
            >
              <LiveSite src={item.href} title={item.name} liveLabel={e.live} />
            </motion.div>
            <motion.div {...reveal} className={`lg:col-span-4 ${i % 2 ? "lg:order-1" : ""}`}>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand">
                {String(i + 1).padStart(2, "0")} · {item.industry}
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight">{item.name}</h3>
              <p className="mt-4 leading-relaxed text-ink/70">{item.short}</p>
              <div className="mt-5">
                <Tags items={item.tags} />
              </div>
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-ink/20 underline-offset-4 transition hover:decoration-brand"
              >
                {e.open} ↗
              </a>
            </motion.div>
          </div>
        ))}
      </div>
      <motion.div {...reveal} className="mt-20 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm text-ink/55">{e.disclaimer}</p>
        <Link
          href="/eksempler/"
          className="rounded-full border-2 border-ink/15 px-6 py-3 text-sm font-medium transition hover:border-brand/50 hover:bg-paper-2"
        >
          {e.all} →
        </Link>
      </motion.div>
    </section>
  );
}

/** The full design-examples page, sorted by industry. */
export function ExamplesByIndustry() {
  const { t } = useLang();
  const e = t.examples;
  return (
    <section className="mx-auto max-w-7xl space-y-24 px-4 py-20 sm:px-8 sm:py-28">
      {e.items.map((item) => (
        <motion.article key={item.slug} {...reveal} className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-brand">{item.industry}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {item.name} <span className="font-light text-ink/50">({item.place})</span>
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">{item.long}</p>
            <ul className="mt-6 space-y-2">
              {item.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-ink/80">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:bg-ink/85"
              >
                {e.seeExample} ↗
              </a>
              <a
                href="#kontakt"
                className="rounded-full border-2 border-ink/15 px-6 py-3 text-sm font-medium transition hover:border-brand/50"
              >
                {e.want}
              </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            <LiveSite src={item.href} title={item.name} liveLabel={e.live} />
          </div>
        </motion.article>
      ))}
    </section>
  );
}

export function Pricing({ hideHead = false }: { hideHead?: boolean }) {
  const { t } = useLang();
  const p = t.pricing;
  return (
    <section id="pris" className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
      {!hideHead && <SectionHead title={p.title} lead={p.lead} />}
      <div className="grid gap-8 lg:grid-cols-12">
        <motion.div
          {...reveal}
          className="relative overflow-hidden rounded-3xl border border-ink/10 bg-card p-8 shadow-[0_30px_80px_-40px_rgba(22,24,29,0.3)] sm:p-10 lg:col-span-5"
        >
          <div aria-hidden className="absolute -right-24 -top-24 size-64 rounded-full bg-brand/15 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -left-16 size-56 rounded-full bg-peach/20 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink/55">{p.label}</p>
            <p className="mt-3 text-7xl font-black tracking-tight sm:text-8xl">{t.stats[0].value}</p>
            <p className="mt-2 text-lg text-ink/50 line-through decoration-ink/40">{p.normal}</p>
            <p className="mt-4 max-w-xs text-ink/65">{p.once}</p>
            <p className="mt-6 text-sm font-semibold">{p.dealTitle}</p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink/65">
              {p.deal.map((d) => (
                <li key={d} className="flex gap-2">
                  <span aria-hidden className="text-brand">✓</span>
                  {d}
                </li>
              ))}
            </ul>
            <a
              href="#kontakt"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-brand to-peach px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:shadow-xl"
            >
              {p.cta}
            </a>
          </div>
        </motion.div>
        <div className="lg:col-span-7">
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {p.features.map((f, i) => (
              <motion.li
                key={f.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.05 }}
                className="bg-paper p-6"
              >
                <p className="font-semibold">{f.title}</p>
                <p className="mt-1 text-sm text-ink/60">{f.text}</p>
              </motion.li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink/55">{p.compare}</p>
        </div>
      </div>
    </section>
  );
}

export function Process({ hideHead = false }: { hideHead?: boolean }) {
  const { t } = useLang();
  const p = t.process;
  return (
    <section id="proces" className="border-y border-ink/5 bg-paper-2/50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        {!hideHead && <SectionHead title={p.title} lead={p.lead} />}
        <ol className="grid gap-6 md:grid-cols-3">
          {p.steps.map((s, i) => (
            <motion.li
              key={s.n}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.1 }}
              className="rounded-3xl border border-ink/10 bg-card p-8"
            >
              <p className="bg-gradient-to-r from-brand to-peach bg-clip-text text-5xl font-black text-transparent">{s.n}</p>
              <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/65">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq({ hideHead = false }: { hideHead?: boolean }) {
  const { t } = useLang();
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-24 sm:px-8 sm:py-32">
      {!hideHead && <SectionHead title={t.faq.title} />}
      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {t.faq.items.map((item) => (
          <motion.details key={item.q} {...reveal} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="grid size-8 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/60 transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink/65">{item.a}</p>
          </motion.details>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <section id="kontakt" className="px-4 pb-24 sm:px-8">
      <motion.div
        {...reveal}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-ink/10 px-6 py-20 text-center sm:px-12 sm:py-28"
      >
        <ShaderBackdrop />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">{t.contact.title}</h2>
          <p className="mt-5 text-lg font-light text-ink/70">{t.contact.lead}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition hover:bg-ink/85"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copy}
              className="rounded-full border-2 border-ink/20 bg-paper/40 px-6 py-3 text-sm font-medium backdrop-blur-sm transition hover:bg-paper/70"
            >
              {copied ? `${t.contact.copied} ✓` : t.contact.copy}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-8">
        <Logo />
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/60">
          <Link href="/eksempler/" className="hover:text-ink">{t.nav.examples}</Link>
          <Link href="/pris/" className="hover:text-ink">{t.nav.price}</Link>
          <Link href="/proces/" className="hover:text-ink">{t.nav.process}</Link>
          <Link href="/faq/" className="hover:text-ink">{t.nav.faq}</Link>
        </nav>
        <p className="text-sm text-ink/50">{t.footer}</p>
      </div>
    </footer>
  );
}

/** Compact shader band at the top of the separate menu pages. */
export function PageIntro({ title, lead }: { title: string; lead?: string }) {
  return (
    <section className="relative overflow-hidden">
      <ShaderBackdrop />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl"
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-ink/70"
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}
