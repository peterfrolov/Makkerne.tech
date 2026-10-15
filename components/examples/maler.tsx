"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import heroPhoto from "@/public/examples/maler-hero.jpg";
import { AreaCheck, BeforeAfter, DemoNote, Icon, Img, QuoteWizard, Stars } from "./shared";

const PHONE = "34 56 78 90";
const TEL = "tel:+4534567890";

const SERVICES = [
  { id: "1745665777586-09381ba528d6", title: "Indvendig maling", text: "Vægge, lofter og træværk. Vi afdækker møbler og gulve og rydder op hver dag." },
  { id: "1574359411659-15573a27fd0c", title: "Facade og udvendigt", text: "Facader, sokler, udhæng og vinduer, malet med maling der kan klare dansk vejr." },
  { id: "1717281234297-3def5ae3eee1", title: "Spartling og tapet", text: "Revner, huller og ujævne vægge bliver glatte. Vi sætter også glasvæv og tapet op." },
  { id: "1519068554083-0fb38e848f59", title: "Vinduer og døre", text: "Skrabning, kitning og maling af vinduer, døre og lister, så de holder i mange år igen." },
];

const COLORS = [
  { name: "Skovgrøn", hex: "#3f5a4a", text: "#f3efe7", photo: "1615873968403-89e068629265", note: "Dyb og rolig. Flot i stuen bag en lys sofa." },
  { name: "Salvie", hex: "#a7b39c", text: "#1d1b19", photo: "1721274506311-bfe458dea21b", note: "Blød grøn, der føles lys, selv på en grå dag." },
  { name: "Dueblå", hex: "#7189a0", text: "#f3efe7", photo: "1634207523205-cf9ef97a31d1", note: "Kølig og frisk. Giver ro i soveværelset." },
  { name: "Varm grå", hex: "#5f5a55", text: "#f3efe7", photo: "1560185893-a55cbc8c57e8", note: "Elegant og mørk, uden at rummet bliver koldt." },
  { name: "Kalkhvid", hex: "#ebe5da", text: "#1d1b19", photo: "1597293544475-16730f31a638", note: "Den varme hvide, der aldrig går af mode." },
];

const PARTS = [
  { key: "walls", label: "Vægge", rate: 190 },
  { key: "ceiling", label: "Loft", rate: 95 },
  { key: "wood", label: "Lister og døre", rate: 45 },
] as const;

type PartKey = (typeof PARTS)[number]["key"];

const REVIEWS = [
  { text: "Hele huset malet indvendigt på fem dage. Ikke en stænk på gulvet, og de dækkede alt af, selv klaveret.", name: "Signe", place: "Odense C" },
  { text: "Fik hjælp til farvevalget og endte med en grøn, jeg aldrig selv havde turdet. Den er perfekt.", name: "Morten", place: "Odense V" },
  { text: "Facaden ser ny ud igen. Prisen var præcis den, vi fik i tilbuddet. Kan varmt anbefales.", name: "Hanne og Ole", place: "Kerteminde" },
];

const AREAS: Record<string, string> = {
  "5000": "Odense C",
  "5200": "Odense V",
  "5210": "Odense NV",
  "5220": "Odense SØ",
  "5230": "Odense M",
  "5250": "Odense SV",
  "5260": "Odense S",
  "5270": "Odense N",
  "5300": "Kerteminde",
  "5800": "Nyborg",
  "5750": "Ringe",
};

const kr = (n: number) => n.toLocaleString("da-DK");

export function MalerSite() {
  const [color, setColor] = useState(0);
  const [m2, setM2] = useState(40);
  const [parts, setParts] = useState<Record<PartKey, boolean>>({ walls: true, ceiling: true, wood: false });
  const [filler, setFiller] = useState(false);
  const [preset, setPreset] = useState<{ service?: string; note?: string }>({});
  const [presetKey, setPresetKey] = useState(0);

  const base = PARTS.reduce((sum, p) => sum + (parts[p.key] ? p.rate * m2 : 0), 0) * (filler ? 1.3 : 1);
  const low = Math.round((base * 0.9) / 100) * 100;
  const high = Math.round((base * 1.1) / 100) * 100;
  const days = Math.max(1, Math.ceil(base / 9000));
  const picked = PARTS.filter((p) => parts[p.key]).map((p) => p.label.toLowerCase());

  const order = (service: string, note = "") => {
    setPreset({ service, note });
    setPresetKey((k) => k + 1);
    document.getElementById("tilbud")?.scrollIntoView({ behavior: "smooth" });
  };

  const c = COLORS[color];

  return (
    <div
      className="min-h-dvh overflow-x-clip bg-[#f7f4ef] font-sans text-[#1d1b19]"
      style={{ "--ex-ink": "#1d1b19", "--ex-paper": "#fffdf9", "--ex-accent": "#2f5d50", "--ex-on-accent": "#fffdf9" } as React.CSSProperties}
    >
      <DemoNote className="bg-[#1d1b19] text-[#f7f4ef]/55" />

      <header className="sticky top-0 z-40 bg-[#f7f4ef]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
            <span className="flex gap-0.5" aria-hidden>
              {["#3f5a4a", "#c96f4a", "#e8c26a"].map((h) => (
                <span key={h} className="h-6 w-2 rounded-full" style={{ background: h }} />
              ))}
            </span>
            Kulør
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#pris" className="hover:text-[#2f5d50]">Prisberegner</a>
            <a href="#farver" className="hover:text-[#2f5d50]">Farveguide</a>
            <a href="#ydelser" className="hover:text-[#2f5d50]">Ydelser</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href={TEL} aria-label={`Ring ${PHONE}`} className="grid size-10 place-items-center rounded-full border border-[#1d1b19]/15 sm:hidden">
              <Icon name="phone" className="size-4" />
            </a>
            <a href={TEL} className="hidden text-sm font-semibold sm:block">{PHONE}</a>
            <a href="#tilbud" className="rounded-md bg-[#2f5d50] px-5 py-2.5 text-sm font-semibold text-[#fffdf9] transition hover:bg-[#244a40]">
              Få et tilbud
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-8 sm:pt-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.p className="inline-flex items-center gap-2 rounded-full bg-[#2f5d50]/10 px-4 py-1.5 text-xs font-semibold text-[#2f5d50]">
            <Stars /> 4,9 · Malerfirma i Odense
          </motion.p>
          <motion.h1
            className="mt-6 font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl"
          >
            Skarpe kanter.
            <br />
            <span className="text-[#c96f4a]">Ingen stænk.</span>
          </motion.h1>
          <motion.p className="mt-6 max-w-md text-lg leading-relaxed text-[#1d1b19]/65">
            Vi afdækker, spartler, maler og rydder op. Du kommer hjem til et færdigt rum, og prisen står i tilbuddet.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-3">
            <a href="#pris" className="rounded-md bg-[#1d1b19] px-7 py-4 text-sm font-semibold text-[#f7f4ef] transition hover:bg-[#2f5d50]">
              Beregn din pris
            </a>
            <a href={TEL} className="flex items-center gap-2 rounded-md border-2 border-[#1d1b19]/15 px-7 py-4 text-sm font-semibold transition hover:border-[#1d1b19]/40">
              <Icon name="phone" className="size-4" /> {PHONE}
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 2rem)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 2rem)" }}
          transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
          className="relative lg:col-span-6"
        >
          <Image
            src={heroPhoto}
            alt="Smilende maler i hvidt arbejdstøj med malerrulle og spand foran et hus"
            sizes="(min-width: 1024px) 540px, 100vw"
            fetchPriority="high"
            loading="eager"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover object-[50%_20%] sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          <div className="absolute bottom-6 left-4 rounded-md bg-[#fffdf9] px-5 py-4 shadow-xl sm:bottom-8 sm:left-6">
            <p className="font-display text-3xl font-bold">1.200+</p>
            <p className="text-sm text-[#1d1b19]/60">rum malet på Fyn</p>
          </div>
        </motion.div>
      </section>

      {/* Price calculator */}
      <section id="pris" className="scroll-mt-24 bg-[#1d1b19] py-20 text-[#f7f4ef] sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <h2 className="mt-3 font-display text-5xl font-bold tracking-tight">Hvad koster det?</h2>
            <p className="mt-4 max-w-md text-[#f7f4ef]/65">Få en vejledende pris på indvendig maling på 20 sekunder. Den endelige pris får du, når vi har set rummet.</p>

            <div className="mt-10 space-y-8">
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="m2" className="text-sm font-semibold">Gulvareal</label>
                  <span className="font-display text-3xl font-bold tabular-nums">{m2} m²</span>
                </div>
                <input
                  id="m2"
                  type="range"
                  min={10}
                  max={200}
                  step={5}
                  value={m2}
                  onChange={(e) => setM2(Number(e.target.value))}
                  className="mt-3 w-full accent-[#e8c26a]"
                />
                <div className="mt-1 flex justify-between text-xs text-[#f7f4ef]/40">
                  <span>Et værelse</span>
                  <span>Hele huset</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">Hvad skal males?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PARTS.map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      aria-pressed={parts[p.key]}
                      onClick={() => setParts((s) => ({ ...s, [p.key]: !s[p.key] }))}
                      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                        parts[p.key] ? "bg-[#e8c26a] text-[#1d1b19]" : "bg-[#f7f4ef]/8 hover:bg-[#f7f4ef]/15"
                      }`}
                    >
                      {parts[p.key] && <Icon name="check" className="size-4" />}
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-md bg-[#f7f4ef]/6 px-5 py-4">
                <span>
                  <span className="block text-sm font-semibold">Væggene skal spartles først</span>
                  <span className="text-xs text-[#f7f4ef]/50">Revner, huller eller gammel tapet</span>
                </span>
                <input type="checkbox" checked={filler} onChange={(e) => setFiller(e.target.checked)} className="peer sr-only" />
                <span className="relative h-7 w-12 shrink-0 rounded-full bg-[#f7f4ef]/20 transition peer-checked:bg-[#e8c26a] after:absolute after:left-1 after:top-1 after:size-5 after:rounded-full after:bg-[#f7f4ef] after:transition peer-checked:after:translate-x-5" />
              </label>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-lg bg-[#f7f4ef] p-8 text-[#1d1b19] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1d1b19]/50">Vejledende pris</p>
            {base > 0 ? (
              <>
                <motion.p key={`${low}-${high}`} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 whitespace-nowrap font-display text-4xl font-bold tabular-nums tracking-tight sm:text-5xl">
                  {kr(low)}–{kr(high)} kr.
                </motion.p>
                <p className="mt-2 text-[#1d1b19]/60">inkl. moms, maling, afdækning og oprydning</p>
                <ul className="mt-8 space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <Icon name="clock" className="size-5 text-[#2f5d50]" /> Ca. {days} {days === 1 ? "arbejdsdag" : "arbejdsdage"}
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon name="shield" className="size-5 text-[#2f5d50]" /> 2 lag maling og 2 års garanti
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon name="check" className="size-5 text-[#2f5d50]" /> Gratis farveprøver med i prisen
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() =>
                    order("Indvendig maling", `Ca. ${m2} m² gulv: ${picked.join(", ")}${filler ? ", med spartling" : ""}. Beregnet pris: ${kr(low)}–${kr(high)} kr.`)
                  }
                  className="mt-8 w-full rounded-full bg-[#2f5d50] py-4 text-sm font-semibold text-[#fffdf9] transition hover:bg-[#244a40]"
                >
                  Få en fast pris på det her
                </button>
              </>
            ) : (
              <p className="mt-4 text-[#1d1b19]/60">Vælg mindst én ting, der skal males.</p>
            )}
          </div>
        </div>
      </section>

      {/* Colour guide */}
      <motion.section id="farver" animate={{ backgroundColor: c.hex, color: c.text }} transition={{ duration: 0.6 }} className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
          <div>
            <h2 className="mt-3 font-display text-5xl font-bold tracking-tight">Svært at vælge farve?</h2>
            <p className="mt-4 max-w-md opacity-75">Klik dig igennem årets mest valgte farver og se dem i rigtige rum. Vi kommer gerne med prøver, du kan sætte op derhjemme.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {COLORS.map((col, i) => (
                <button
                  key={col.name}
                  type="button"
                  onClick={() => setColor(i)}
                  aria-label={col.name}
                  aria-pressed={color === i}
                  className={`size-14 rounded-full border-4 shadow-lg transition ${color === i ? "scale-110 border-current" : "border-white/40 hover:scale-105"}`}
                  style={{ background: col.hex }}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={color} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-8">
                <p className="font-display text-4xl font-bold">{c.name}</p>
                <p className="mt-2 opacity-75">{c.note}</p>
              </motion.div>
            </AnimatePresence>
            <button
              type="button"
              onClick={() => order("Indvendig maling", `Farveprøver: ${c.name}`)}
              className="mt-8 rounded-md border-2 border-current px-7 py-3.5 text-sm font-semibold transition hover:bg-current/10"
            >
              Bestil gratis farveprøver
            </button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl">
            <AnimatePresence initial={false}>
              <motion.div key={c.photo} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                <Img id={c.photo} w={1200} alt={`Rum malet i ${c.name.toLowerCase()}`} className="size-full object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* Services */}
      <section id="ydelser" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
        <h2 className="font-display text-5xl font-bold tracking-tight">Det maler vi</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <article key={s.title} className="group">
              <div className="aspect-[3/4] overflow-hidden rounded-lg">
                <Img id={s.id} w={700} alt={s.title} className="size-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#1d1b19]/65">{s.text}</p>
              <button type="button" onClick={() => order(s.title)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2f5d50]">
                Få et tilbud <Icon name="arrow" className="size-4" />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Before / after */}
      <section className="bg-[#ece6dc] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mt-3 font-display text-5xl font-bold tracking-tight">Stue på Hunderupvej</h2>
            </div>
            <p className="max-w-sm text-[#1d1b19]/60">Nedslidte vægge blev spartlet og malet i en varm hvid. Træk i billedet for at se forskellen.</p>
          </div>
          <BeforeAfter before="1718816281270-ed6ef8357859" after="1615528650248-8630bcd26814" alt="Stue på Hunderupvej" className="mt-10 aspect-[4/3] rounded-[2rem] sm:aspect-[16/8]" />
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-5xl font-bold tracking-tight">Glade kunder</h2>
          <p className="flex items-center gap-2 text-sm text-[#1d1b19]/60">
            <Stars className="text-[#c96f4a]" /> 4,9 af 5 på Google · 156 anmeldelser
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg bg-[#fffdf9] p-7 shadow-sm"
            >
              <Stars className="text-[#c96f4a]" />
              <blockquote className="mt-4 leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm">
                <span className="grid size-9 place-items-center rounded-full font-bold text-[#fffdf9]" style={{ background: COLORS[i].hex }}>
                  {r.name[0]}
                </span>
                <span>
                  <span className="block font-semibold">{r.name}</span>
                  <span className="text-[#1d1b19]/55">{r.place}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Area + quote */}
      <section id="tilbud" className="scroll-mt-24 border-t border-[#1d1b19]/10 bg-[#f1ece4] py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-5xl font-bold tracking-tight">Få et fast tilbud</h2>
            <p className="mt-4 max-w-md text-lg text-[#1d1b19]/65">Fortæl kort, hvad der skal males. Vi kigger forbi og giver en fast pris, som er den, du betaler.</p>
            <div className="mt-10 max-w-md">
              <AreaCheck areas={AREAS} base="Odense" />
            </div>
          </div>
          <QuoteWizard
            key={presetKey}
            preset={preset}
            services={["Indvendig maling", "Facade og udvendigt", "Spartling og tapet", "Vinduer og døre", "Erhverv", "Andet"]}
            reply="Vi ringer dig op inden for en hverdag og aftaler, hvornår vi kan kigge forbi."
          />
        </div>
      </section>

      <footer className="px-5 pb-28 pt-12 text-sm text-[#1d1b19]/55 sm:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row">
          <p className="font-display text-xl font-bold text-[#1d1b19]">Malerfirmaet Kulør</p>
          <p>Vestergade 12, 5000 Odense C · Tlf. {PHONE}</p>
        </div>
      </footer>

      {/* Phone action bar */}
      <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 sm:hidden">
        <a href={TEL} className="flex items-center justify-center gap-2 rounded-full bg-[#1d1b19] py-4 text-sm font-semibold text-[#f7f4ef] shadow-2xl">
          <Icon name="phone" className="size-4" /> Ring
        </a>
        <a href="#tilbud" className="flex items-center justify-center rounded-full bg-[#2f5d50] py-4 text-sm font-semibold text-[#fffdf9] shadow-2xl">
          Få et tilbud
        </a>
      </div>
    </div>
  );
}
