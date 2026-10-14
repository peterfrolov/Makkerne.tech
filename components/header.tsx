"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LangToggle, useLang } from "./lang";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Makkerne – forside">
      <span className="grid size-10 place-items-center bg-ink transition group-hover:-rotate-3">
        <svg viewBox="0 0 100 100" aria-hidden className="size-7 fill-brand">
          <path d="M15 85V15h12l18 35 18-35h12v70h-12V35L45 70h-10L17 35v50H15z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-cond text-2xl font-extrabold uppercase tracking-tight ${light ? "text-paper" : ""}`}>Makkerne</span>
        <span className={`mt-0.5 font-mono text-[9px] uppercase tracking-[0.15em] ${light ? "text-paper/55" : "text-ink/55"}`}>Hjemmesider til håndværkere</span>
      </span>
    </Link>
  );
}

export function Header() {
  const { t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/eksempler/", label: t.nav.examples },
    { href: "/pris/", label: t.nav.price },
    { href: "/proces/", label: t.nav.process },
    { href: "/faq/", label: t.nav.faq },
  ];
  const here = (href: string) => pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={here(l.href) ? "page" : undefined}
              className={`px-3 py-2 font-cond text-base font-bold uppercase tracking-wide transition ${
                here(l.href) ? "bg-ink text-paper" : "text-ink/75 hover:bg-brand hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle className="hidden sm:flex" />
          <a
            href="#kontakt"
            className="hidden border-2 border-ink bg-brand px-4 py-2 font-cond text-base font-extrabold uppercase tracking-wide shadow-[3px_3px_0_var(--color-ink)] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--color-ink)] sm:block"
          >
            {t.nav.cta} →
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
            className="grid size-10 place-items-center border-2 border-ink md:hidden"
          >
            <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t-2 border-ink px-4 pb-4 md:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center border-b border-ink/15 font-cond text-xl font-bold uppercase"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <LangToggle />
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="border-2 border-ink bg-brand px-5 py-2 font-cond text-lg font-extrabold uppercase"
            >
              {t.nav.cta} →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
