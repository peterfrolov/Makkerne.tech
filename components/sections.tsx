"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { EMAIL, PRICE, TEAM, type Example } from "@/lib/content";
import { useLang } from "./lang";
import { BrowserSite, WorkshopScreen } from "./live-site";
import { RuggedPhone } from "./phone-preview";
import { Logo } from "./header";

function SectionHead({ title, lead, light = false }: { title: string; lead?: string; light?: boolean }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 className="text-balance font-cond text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">{title}</h2>
      {lead && <p className={`mt-4 text-pretty text-lg leading-relaxed ${light ? "text-paper/70" : "text-ink/70"}`}>{lead}</p>}
    </div>
  );
}

function Check({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`mt-0.5 size-5 shrink-0 ${light ? "text-brand" : "text-ink"}`} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Landing page: one soft browser-window row per example, under a heading. */
export function Examples() {
  const { t } = useLang();
  const e = t.examples;
  return (
    <section id="eksempler" className="bg-[#f3f2ef]">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-8 sm:pt-28">
        <SectionHead title={e.title} lead={e.lead} />
      </div>
      <ExampleRows />
      <p className="mx-auto max-w-7xl px-4 pb-20 text-sm text-ink/55 sm:px-8 sm:pb-28">{e.disclaimer}</p>
    </section>
  );
}

/**
 * The examples page: pick your trade, and see that site on a computer and on a phone side by
 * side, with what it can do next to it. Rawer than the landing page on purpose.
 */
export function ExamplesByIndustry() {
  const { t } = useLang();
  const e = t.examples;
  const [sel, setSel] = useState(0);
  const item = e.items[sel];

  return (
    <section className="border-b border-ink/15">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
        <p className="font-cond text-lg font-bold uppercase tracking-wide text-ink/55">{e.pick}</p>
        <div role="tablist" aria-label={e.pick} className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {e.items.map((it, i) => (
            <button
              key={it.slug}
              type="button"
              role="tab"
              aria-selected={i === sel}
              aria-controls="eksempel-panel"
              onClick={() => setSel(i)}
              className={`flex shrink-0 items-baseline gap-2 border-2 border-ink px-5 py-3 font-cond text-xl font-bold uppercase transition sm:text-2xl ${
                i === sel ? "bg-brand" : "bg-card hover:bg-paper-2"
              }`}
            >
              <span className="text-sm text-ink/45">{String(i + 1).padStart(2, "0")}</span>
              {it.trade}
            </button>
          ))}
        </div>

        <div id="eksempel-panel" role="tabpanel" className="mt-10">
          {/* Computer and phone next to each other, never on top of each other. */}
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-end md:gap-10">
            <div className="w-full min-w-0 md:flex-1">
              <WorkshopScreen src={item.href} title={item.name} tryLabel={e.try} />
            </div>
            <div className="shrink-0">
              <RuggedPhone src={item.href} title={`${item.name} på telefonen`} width={240} height={490} />
            </div>
          </div>

          <div className="mt-14 grid gap-10 border-t-2 border-ink pt-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-sm text-ink/60">
                {item.industry} · {item.place}
              </p>
              <h2 className="mt-1 font-cond text-5xl font-extrabold uppercase leading-none">{item.name}</h2>
              <p className="mt-4 max-w-lg leading-relaxed text-ink/75">{item.long}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={item.href} target="_blank" rel="noopener" className="bg-ink px-5 py-3 font-cond text-lg font-bold uppercase text-paper transition hover:bg-ink/85">
                  {e.open} ↗
                </a>
                <a href="#kontakt" className="border-2 border-ink px-5 py-3 font-cond text-lg font-bold uppercase transition hover:bg-brand">
                  {e.want}
                </a>
              </div>
            </div>
            <ul className="space-y-3 lg:col-span-6 lg:pt-6">
              {item.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-lg">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-14 text-sm text-ink/55">{e.disclaimer}</p>
      </div>
    </section>
  );
}

/** Each example's own main colour, used for the strip under its browser window. */
const ACCENT: Record<Example["slug"], string> = { vvs: "#ff5a1f", tomrer: "#a2582a", maler: "#2f5d50", tag: "#1d211f", el: "#ffd000", murer: "#a63d24" };

/** One row per example: the live site in a browser window, its text beside it, swapping sides each row. */
function ExampleRows() {
  const { t } = useLang();
  const e = t.examples;
  return (
    <div className="mx-auto max-w-7xl space-y-24 px-4 py-12 sm:space-y-32 sm:px-8 sm:py-16">
      {e.items.map((item, i) => (
        <article key={item.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className={`min-w-0 lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
            <BrowserSite src={item.href} title={item.name} tryLabel={e.try} accent={ACCENT[item.slug]} />
          </div>
          <div className={`min-w-0 lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              {String(i + 1).padStart(2, "0")} · {item.industry}
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#1a1a1a]">{item.name}</h2>
            <p className="mt-5 text-lg leading-relaxed text-black/60">{item.short}</p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {item.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 text-black/70">
                  {tag}
                </li>
              ))}
            </ul>
            <a href={item.href} target="_blank" rel="noopener" className="mt-8 inline-block border-b border-black/70 pb-0.5 text-lg font-semibold text-[#1a1a1a] transition hover:border-blue-600 hover:text-blue-600">
              {e.open} ↗
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Pricing({ hideHead = false }: { hideHead?: boolean }) {
  const { t } = useLang();
  const p = t.pricing;
  return (
    <section id="pris" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      {!hideHead && <SectionHead title={p.title} lead={p.lead} />}
      <div className="grid border border-ink/20 bg-card md:grid-cols-2">
        <div className="border-b border-ink/15 p-8 sm:p-10 md:border-b-0 md:border-r">
          <p className="text-sm text-ink/60">{p.label}</p>
          <p className="mt-1 font-cond text-8xl font-extrabold leading-none tracking-tight">{PRICE}</p>
          <p className="mt-4 max-w-xs text-ink/75">{p.once}</p>
          <a href="#kontakt" className="mt-8 inline-flex bg-ink px-6 py-3.5 font-cond text-lg font-bold uppercase text-paper transition hover:bg-ink/85">
            {p.cta}
          </a>
        </div>
        <ul className="space-y-3.5 p-8 sm:p-10">
          {p.included.map((f) => (
            <li key={f} className="flex gap-3 text-lg">
              <Check />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 max-w-2xl text-sm text-ink/60">
        {p.running} {p.compare}
      </p>
    </section>
  );
}

/** Plain side-by-side with the two usual alternatives. */
export function Comparison() {
  const { t } = useLang();
  const tb = t.pricing.table;
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-8 sm:pb-28">
      <h2 className="font-cond text-3xl font-extrabold uppercase sm:text-4xl">{tb.title}</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm sm:text-base">
          <thead>
            <tr className="border-b-2 border-ink">
              {tb.cols.map((col, i) => (
                <th key={i} scope="col" className={`py-3 pr-4 font-cond text-lg font-bold uppercase ${i === 1 ? "bg-brand/40 px-3" : ""}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tb.rows.map(([label, ...cells]) => (
              <tr key={label} className="border-b border-ink/15">
                <th scope="row" className="py-3 pr-4 font-medium text-ink/70">
                  {label}
                </th>
                {cells.map((cell, i) => (
                  <td key={i} className={`py-3 pr-4 ${i === 0 ? "bg-brand/40 px-3 font-semibold" : "text-ink/75"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function Process({ hideHead = false }: { hideHead?: boolean }) {
  const { t } = useLang();
  const p = t.process;
  return (
    <section id="proces" className="border-y border-ink/15 bg-paper-2">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
        {!hideHead && <SectionHead title={p.title} lead={p.lead} />}
        <ol className="max-w-3xl border-t border-ink/20">
          {p.steps.map((s) => (
            <li key={s.n} className="grid grid-cols-[3rem_1fr] gap-x-5 border-b border-ink/20 py-7 sm:grid-cols-[4rem_1fr]">
              <p className="font-cond text-5xl font-extrabold leading-none text-ink/30 sm:text-6xl">{s.n}</p>
              <div>
                <h3 className="font-cond text-2xl font-bold uppercase sm:text-3xl">{s.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-ink/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq({ hideHead = false }: { hideHead?: boolean }) {
  const { t } = useLang();
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-8 sm:py-28">
      {!hideHead && <SectionHead title={t.faq.title} />}
      <div className="border-t border-ink/20">
        {t.faq.items.map((item) => (
          <details key={item.q} className="group border-b border-ink/20 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="text-2xl leading-none text-ink/50 transition group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Email is the only way in. The button opens a mail with the three things we need already listed. */
export function Contact() {
  const { t } = useLang();
  const c = t.contact;
  // Which address was just copied, so only that line says "Copied".
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (mail: string) => {
    try {
      await navigator.clipboard.writeText(mail);
      setCopied(mail);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  };
  // The main address first, then Peter's underneath.
  const mails = [EMAIL, ...TEAM.map((p) => p.email).filter((m) => m !== EMAIL)];
  return (
    <section id="kontakt" className="bg-ink text-paper">
      {/* The text keeps to the page's column; the photos run all the way to the right edge. */}
      <div className="grid gap-14 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,28rem)_1fr] lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
        <div>
          <h2 className="text-balance font-cond text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl">{c.title}</h2>
          <p className="mt-5 max-w-md text-lg text-paper/70">{c.lead}</p>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(c.subject)}&body=${encodeURIComponent(c.body)}`}
            className="mt-8 inline-flex bg-brand px-7 py-4 font-cond text-xl font-bold uppercase text-ink transition hover:bg-brand-dark"
          >
            {c.write}
          </a>
          {/* Two columns, so the "Copy" links line up under each other. */}
          <div className="mt-5 grid w-fit grid-cols-[auto_auto] items-center gap-x-4 gap-y-2 text-paper/70">
            {mails.map((mail) => (
              <Fragment key={mail}>
                <span className="break-all">{mail}</span>
                <button type="button" onClick={() => copy(mail)} className="justify-self-start text-sm underline underline-offset-4 transition hover:text-paper">
                  {copied === mail ? `${c.copied} ✓` : c.copy}
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:border-l lg:border-paper/15 lg:pl-14">
          <p className="text-2xl font-bold">{c.who}</p>
          <div className="mt-6 grid flex-1 grid-cols-2 gap-4 sm:gap-6">
            {TEAM.map((p) => (
              <figure key={p.email} className="flex flex-col">
                <img src={p.photo} alt={p.name} loading="lazy" decoding="async" className="aspect-[4/5] w-full flex-1 border-2 border-paper/15 object-cover object-top" />
                <figcaption className="mt-3">
                  <span className="block font-cond text-xl font-bold uppercase">{p.name}</span>
                  <a href={`mailto:${p.email}`} className="break-all text-sm text-paper/70 underline-offset-4 transition hover:text-brand hover:underline">
                    {p.email}
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-8">
        <Logo light />
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-cond text-lg font-bold uppercase text-paper/70">
          <Link href="/eksempler/" className="hover:text-brand">{t.nav.examples}</Link>
          <Link href="/pris/" className="hover:text-brand">{t.nav.price}</Link>
          <Link href="/proces/" className="hover:text-brand">{t.nav.process}</Link>
          <Link href="/faq/" className="hover:text-brand">{t.nav.faq}</Link>
        </nav>
        <p className="text-xs text-paper/50">
          {t.footer} · {t.updated}
        </p>
      </div>
    </footer>
  );
}

/** Plain band at the top of the separate menu pages. */
export function PageIntro({ title, lead }: { title: string; lead?: string }) {
  return (
    <section className="border-b border-ink/15">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-32 sm:px-8 sm:pb-16 sm:pt-36">
        <h1 className="max-w-4xl text-balance font-cond text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">{lead}</p>}
      </div>
    </section>
  );
}
