"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { EMAIL } from "@/lib/content";
import { useLang } from "./lang";
import { LiveSite } from "./live-site";
import { Logo } from "./header";

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function SectionHead({ no, title, lead, light = false }: { no?: string; title: string; lead?: string; light?: boolean }) {
  return (
    <motion.div {...reveal} className="mb-12 max-w-3xl">
      {no && <p className={`font-mono text-xs uppercase tracking-widest ${light ? "text-brand" : "text-ink/55"}`}>{no}</p>}
      <h2 className="mt-2 text-balance font-cond text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl">{title}</h2>
      {lead && <p className={`mt-5 max-w-2xl text-pretty text-lg leading-relaxed ${light ? "text-paper/70" : "text-ink/70"}`}>{lead}</p>}
    </motion.div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((tag) => (
        <li key={tag} className="border-2 border-ink/80 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide">
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
      <SectionHead no={`01 / ${t.nav.examples}`} title={e.title} lead={e.lead} />
      <div className="space-y-24 sm:space-y-32">
        {e.items.map((item, i) => (
          <div key={item.slug} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`lg:col-span-8 ${i % 2 ? "lg:order-2" : ""}`}
            >
              <LiveSite src={item.href} title={item.name} liveLabel={e.live} tryLabel={e.try} />
            </motion.div>
            <motion.div {...reveal} className={`lg:col-span-4 ${i % 2 ? "lg:order-1" : ""}`}>
              <p className="inline-block bg-ink px-2 py-1 font-mono text-xs uppercase tracking-widest text-brand">
                {String(i + 1).padStart(2, "0")} — {item.industry}
              </p>
              <h3 className="mt-4 font-cond text-5xl font-black uppercase leading-none">{item.name}</h3>
              <p className="mt-4 leading-relaxed text-ink/75">{item.short}</p>
              <div className="mt-5">
                <Tags items={item.tags} />
              </div>
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex items-center gap-2 border-b-2 border-ink font-cond text-lg font-extrabold uppercase transition hover:bg-brand"
              >
                {e.open} ↗
              </a>
            </motion.div>
          </div>
        ))}
      </div>
      <motion.div {...reveal} className="mt-20 flex flex-col items-start gap-4 border-t-2 border-ink pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md font-mono text-xs text-ink/60">{e.disclaimer}</p>
        <Link href="/eksempler/" className="border-2 border-ink px-6 py-3 font-cond text-lg font-extrabold uppercase transition hover:bg-brand">
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
        <motion.article key={item.slug} {...reveal} className="grid gap-10 border-t-2 border-ink pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="inline-block bg-ink px-2 py-1 font-mono text-xs uppercase tracking-widest text-brand">{item.industry}</p>
            <h2 className="mt-4 font-cond text-5xl font-black uppercase leading-none">
              {item.name} <span className="block text-2xl text-ink/50">{item.place}</span>
            </h2>
            <p className="mt-4 leading-relaxed text-ink/75">{item.long}</p>
            <ul className="mt-6 space-y-2">
              {item.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <span className="mt-1.5 size-2.5 shrink-0 bg-brand ring-2 ring-ink" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={item.href} target="_blank" rel="noopener" className="border-2 border-ink bg-ink px-5 py-2.5 font-cond text-lg font-extrabold uppercase text-paper transition hover:bg-ink/85">
                {e.seeExample} ↗
              </a>
              <a href="#kontakt" className="border-2 border-ink px-5 py-2.5 font-cond text-lg font-extrabold uppercase transition hover:bg-brand">
                {e.want}
              </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            <LiveSite src={item.href} title={item.name} liveLabel={e.live} tryLabel={e.try} />
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
      {!hideHead && <SectionHead no={`02 / ${t.nav.price}`} title={p.title} lead={p.lead} />}
      <div className="grid gap-8 lg:grid-cols-12">
        <motion.div {...reveal} className="hard border-2 border-ink bg-brand p-8 sm:p-10 lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-widest">{p.label}</p>
          <p className="mt-2 font-cond text-[7rem] font-black leading-none tracking-tight sm:text-[9rem]">{t.stats[0].value}</p>
          <p className="mt-4 max-w-xs font-medium">{p.once}</p>
          <a href="#kontakt" className="mt-8 inline-flex border-2 border-ink bg-ink px-7 py-3.5 font-cond text-xl font-extrabold uppercase text-paper transition hover:bg-ink/85">
            {p.cta} →
          </a>
        </motion.div>
        <div className="lg:col-span-7">
          <ul className="grid border-l-2 border-t-2 border-ink sm:grid-cols-2">
            {p.features.map((f, i) => (
              <motion.li key={f.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.04 }} className="border-b-2 border-r-2 border-ink bg-card p-6">
                <p className="font-mono text-[11px] text-ink/50">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 font-cond text-2xl font-extrabold uppercase leading-tight">{f.title}</p>
                <p className="mt-1 text-sm text-ink/70">{f.text}</p>
              </motion.li>
            ))}
          </ul>
          <p className="mt-5 font-mono text-xs text-ink/60">{p.compare}</p>
        </div>
      </div>
    </section>
  );
}

export function Process({ hideHead = false }: { hideHead?: boolean }) {
  const { t } = useLang();
  const p = t.process;
  return (
    <section id="proces" className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        {!hideHead && <SectionHead no={`03 / ${t.nav.process}`} title={p.title} lead={p.lead} light />}
        <ol className="grid gap-px border-2 border-paper/20 bg-paper/20 md:grid-cols-3">
          {p.steps.map((s, i) => (
            <motion.li key={s.n} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="bg-ink p-8">
              <p className="font-cond text-7xl font-black text-brand">{s.n}</p>
              <h3 className="mt-4 font-cond text-3xl font-extrabold uppercase">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-paper/70">{s.text}</p>
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
      {!hideHead && <SectionHead no={`04 / ${t.nav.faq}`} title={t.faq.title} />}
      <div className="border-t-2 border-ink">
        {t.faq.items.map((item) => (
          <motion.details key={item.q} {...reveal} className="group border-b-2 border-ink py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-cond text-2xl font-extrabold uppercase [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="grid size-9 shrink-0 place-items-center border-2 border-ink font-mono text-lg transition group-open:rotate-45 group-open:bg-brand">+</span>
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{item.a}</p>
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
      <motion.div {...reveal} className="hard mx-auto max-w-7xl border-2 border-ink bg-brand">
        <div className="tape h-6 border-b-2 border-ink" aria-hidden />
        <div className="px-6 py-16 sm:px-12 sm:py-24">
          <h2 className="max-w-4xl text-balance font-cond text-5xl font-black uppercase leading-[0.92] sm:text-8xl">{t.contact.title}</h2>
          <p className="mt-6 max-w-xl text-lg font-medium">{t.contact.lead}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={`mailto:${EMAIL}`} className="border-2 border-ink bg-ink px-7 py-4 text-center font-mono text-sm text-paper transition hover:bg-ink/85">
              {EMAIL}
            </a>
            <button type="button" onClick={copy} className="border-2 border-ink px-6 py-4 font-cond text-lg font-extrabold uppercase transition hover:bg-card">
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
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-8">
        <Logo light />
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-cond text-lg font-bold uppercase text-paper/70">
          <Link href="/eksempler/" className="hover:text-brand">{t.nav.examples}</Link>
          <Link href="/pris/" className="hover:text-brand">{t.nav.price}</Link>
          <Link href="/proces/" className="hover:text-brand">{t.nav.process}</Link>
          <Link href="/faq/" className="hover:text-brand">{t.nav.faq}</Link>
        </nav>
        <p className="font-mono text-xs text-paper/50">{t.footer}</p>
      </div>
    </footer>
  );
}

/** Plain band at the top of the separate menu pages. */
export function PageIntro({ title, lead }: { title: string; lead?: string }) {
  return (
    <section className="border-b-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl text-balance font-cond text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-8xl"
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
            {lead}
          </motion.p>
        )}
      </div>
      <div className="tape h-6 border-t-2 border-ink" aria-hidden />
    </section>
  );
}
