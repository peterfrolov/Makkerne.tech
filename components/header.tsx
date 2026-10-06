"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LangToggle, useLang } from "./lang";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Makkerne – forside">
      <motion.svg
        viewBox="0 0 100 100"
        aria-hidden
        className="size-9 fill-ink"
        style={{ filter: "url(#logo-glow)" }}
        whileHover={{ fill: "url(#logo-gradient)", rotate: [0, -2, 2, 0], transition: { duration: 0.6 } }}
      >
        <path d="M15 85V15h12l18 35 18-35h12v70h-12V35L45 70h-10L17 35v50H15z" />
      </motion.svg>
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight">Makkerne</span>
        <span className="mt-0.5 text-[9px] font-medium tracking-[0.3em] text-ink/55">WEBDESIGN</span>
      </span>
    </Link>
  );
}

export function Header() {
  const { t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/eksempler/", label: t.nav.examples },
    { href: "/pris/", label: t.nav.price },
    { href: "/proces/", label: t.nav.process },
    { href: "/faq/", label: t.nav.faq },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-ink/5 bg-paper/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname.replace(/\/$/, "") === l.href.replace(/\/$/, "") ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-xs font-medium transition ${
                pathname.replace(/\/$/, "") === l.href.replace(/\/$/, "") ? "bg-ink/10 text-ink" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle className="hidden sm:flex" />
          {/* Gooey CTA with arrow */}
          <a href="#kontakt" className="group relative hidden items-center sm:flex" style={{ filter: "url(#gooey-filter)" }}>
            <span className="absolute right-0 z-0 flex h-8 -translate-x-10 items-center justify-center rounded-full bg-ink px-2.5 text-paper transition-all duration-300 group-hover:-translate-x-[6.25rem]">
              <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
            <span className="z-10 flex h-8 items-center rounded-full bg-ink px-5 text-xs font-medium text-paper">
              {t.nav.cta}
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full text-ink hover:bg-ink/5 md:hidden"
          >
            <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink/5 px-4 pb-4 md:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center border-b border-ink/5 text-base text-ink/80"
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
              className="flex h-10 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
