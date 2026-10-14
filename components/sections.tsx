"use client";

import Link from "next/link";
import { useState } from "react";
import { EMAIL, PRICE } from "@/lib/content";
import { useLang } from "./lang";
import { LiveSite, SiteThumb } from "./live-site";
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

/** Landing page: the four example sites as still pictures you can click. */
export function Examples() {
  const { t } = useLang();
  const e = t.examples;
  return (
    <section id="eksempler" className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
      <SectionHead title={e.title} lead={e.lead} />
      <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {e.items.map((item) => (
          <SiteThumb key={item.slug} src={item.href} name={item.name} industry={item.industry} open={e.open} />
        ))}
      </div>
      <p className="mt-10 text-sm text-ink/55">{e.disclaimer}</p>
    </section>
  );
}

/** The full design-examples page, sorted by industry. */
export function ExamplesByIndustry() {
  const { t } = useLang();
  const e = t.examples;
  return (
    <section className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-8 sm:py-24">
      {e.items.map((item) => (
        <article key={item.slug} className="grid gap-10 border-t border-ink/15 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-sm text-ink/60">{item.industry}</p>
            <h2 className="mt-1 font-cond text-4xl font-extrabold uppercase leading-none">
              {item.name} <span className="block text-xl font-bold text-ink/50">{item.place}</span>
            </h2>
            <p className="mt-4 leading-relaxed text-ink/75">{item.long}</p>
            <ul className="mt-6 space-y-2">
              {item.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm">
                  <Check />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={item.href} target="_blank" rel="noopener" className="bg-ink px-5 py-3 font-cond text-lg font-bold uppercase text-paper transition hover:bg-ink/85">
                {e.seeExample} ↗
              </a>
              <a href="#kontakt" className="border border-ink px-5 py-3 font-cond text-lg font-bold uppercase transition hover:bg-brand">
                {e.want}
              </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            <LiveSite src={item.href} title={item.name} tryLabel={e.try} />
          </div>
        </article>
      ))}
    </section>
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
      <p className="mt-4 text-sm text-ink/55">{p.compare}</p>
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
        <ol className="grid gap-10 md:grid-cols-3">
          {p.steps.map((s) => (
            <li key={s.n}>
              <p className="grid size-10 place-items-center bg-brand font-cond text-2xl font-extrabold">{s.n}</p>
              <h3 className="mt-4 font-cond text-2xl font-bold uppercase">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/70">{s.text}</p>
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

/** Email us, or leave a number. With no server behind the site, the form opens a ready-written email. */
export function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  const field = "w-full border border-paper/25 bg-paper/5 px-4 py-3 text-paper outline-none placeholder:text-paper/45 focus:border-brand";
  return (
    <section id="kontakt" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
        <div>
          <h2 className="text-balance font-cond text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl">{c.title}</h2>
          <p className="mt-5 max-w-md text-lg text-paper/70">{c.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`mailto:${EMAIL}`} className="bg-brand px-6 py-3.5 text-center font-medium text-ink transition hover:bg-brand-dark">
              {EMAIL}
            </a>
            <button type="button" onClick={copy} className="border border-paper/30 px-6 py-3.5 font-medium transition hover:border-paper">
              {copied ? `${c.copied} ✓` : c.copy}
            </button>
          </div>
        </div>
        <form
          className="lg:border-l lg:border-paper/15 lg:pl-14"
          onSubmit={(e) => {
            e.preventDefault();
            const body = `${c.name}: ${name}\n${c.phone}: ${phone}`;
            window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(c.subject)}&body=${encodeURIComponent(body)}`;
          }}
        >
          <h3 className="font-cond text-3xl font-bold uppercase">{c.callTitle}</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-paper/70">{c.name}</span>
              <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={`mt-1 ${field}`} />
            </label>
            <label className="block">
              <span className="text-sm text-paper/70">{c.phone}</span>
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" className={`mt-1 ${field}`} />
            </label>
          </div>
          <button type="submit" className="mt-4 border border-paper px-6 py-3.5 font-cond text-lg font-bold uppercase transition hover:bg-paper hover:text-ink">
            {c.send}
          </button>
          <p className="mt-3 text-xs text-paper/50">{c.note}</p>
        </form>
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
        <p className="text-xs text-paper/50">{t.footer}</p>
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
