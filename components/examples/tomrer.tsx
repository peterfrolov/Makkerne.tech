"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AreaCheck, BeforeAfter, DemoNote, Icon, Img, QuoteWizard, Stars } from "./shared";

const PHONE = "23 45 67 89";
const TEL = "tel:+4523456789";

const SERVICES = [
  {
    name: "Tag og kviste",
    id: "1690719095815-549c60090c9f",
    text: "Nyt tag, efterisolering eller en kvist, der giver lys og plads på første sal. Vi står for stillads, nedrivning og bortskaffelse.",
    points: ["Tegltag, eternit og tagpap", "Kviste og ovenlysvinduer", "Efterisolering efter BR18"],
    time: "2–4 uger",
  },
  {
    name: "Tilbygning",
    id: "1676802037786-3697d60497ae",
    text: "Mere plads uden at flytte. Vi hjælper med tegninger og byggetilladelse og bygger hele vejen fra sokkel til lister.",
    points: ["Tegninger og byggetilladelse", "Træskelet og facade", "Fast kontaktperson hele vejen"],
    time: "6–12 uger",
  },
  {
    name: "Terrasser",
    id: "1780220176917-750c21d4ff87",
    text: "Terrasse i hårdttræ, lærk eller komposit, bygget så den holder i mange år. Gerne med trappe, bænke og lys.",
    points: ["Hårdttræ, lærk og komposit", "Skjulte skruer", "Trapper, bænke og hegn"],
    time: "1–2 uger",
  },
  {
    name: "Køkken og indretning",
    id: "1628797285815-453c1d0d21e3",
    text: "Vi monterer køkkener fra alle leverandører og bygger skabe, reoler og trapper, der passer præcist til dit hus.",
    points: ["Køkkenmontage", "Skabe og reoler på mål", "Trapper og gelændere"],
    time: "1–3 uger",
  },
  {
    name: "Vinduer og døre",
    id: "1780592018279-279aa3e91f8f",
    text: "Nye vinduer og døre, der lukker tæt og sparer på varmen. Vi river ned, monterer, fuger og pudser af.",
    points: ["Træ og træ/alu", "Indfatninger og fuger", "Hjælp til energitilskud"],
    time: "2–5 dage",
  },
];

type Cat = "Tag" | "Tilbygning" | "Terrasse" | "Indretning";

const GALLERY: { id: string; title: string; place: string; cat: Cat }[] = [
  { id: "1690719095815-549c60090c9f", title: "Nyt tag på villa", place: "Roskilde", cat: "Tag" },
  { id: "1676802011549-c3a3f5adf7a1", title: "Tilbygning på 32 m²", place: "Himmelev", cat: "Tilbygning" },
  { id: "1785431749019-56a5b536d325", title: "Terrasse i hårdttræ", place: "Viby Sj.", cat: "Terrasse" },
  { id: "1628797285815-453c1d0d21e3", title: "Køkken med ø i eg", place: "Svogerslev", cat: "Indretning" },
  { id: "1673978482989-5eb3b350be2d", title: "Tagudskiftning med stillads", place: "Jyllinge", cat: "Tag" },
  { id: "1728025801541-20b44f6ed5f3", title: "Synligt bjælkeloft", place: "Gadstrup", cat: "Indretning" },
  { id: "1780220176917-750c21d4ff87", title: "Terrasse med trappe", place: "Roskilde", cat: "Terrasse" },
  { id: "1676803210608-39cdef6a505c", title: "Anneks i træ", place: "Lejre", cat: "Tilbygning" },
  { id: "1601760561441-16420502c7e0", title: "Hvidt køkken monteret", place: "Trekroner", cat: "Indretning" },
];

const STEPS = [
  { title: "Gratis besigtigelse", text: "Vi kommer ud, kigger på opgaven og lytter til, hvad du drømmer om." },
  { title: "Fast tilbud", text: "Du får et skriftligt tilbud med fast pris og tidsplan inden for en uge." },
  { title: "Vi bygger", text: "Samme folk hver dag, ryddet op hver aften, og du får besked, hvis noget ændrer sig." },
  { title: "Aflevering", text: "Vi gennemgår arbejdet sammen med dig. Der er 5 års garanti på alt, vi laver." },
];

const REVIEWS = [
  { text: "Vores tilbygning blev færdig til tiden og til prisen. Mads og drengene var søde ved børnene og ryddede op hver dag.", name: "Line og Kasper", place: "Himmelev" },
  { text: "Flot terrasse og en fornuftig snak om materialer. Han frarådede den dyreste løsning, og det havde han ret i.", name: "Henrik", place: "Viby Sj." },
  { text: "Nyt tag på et hus fra 1932. Fagligt dygtige, og de fandt råd i en spær, som de løste uden at tage en formue.", name: "Birgitte", place: "Roskilde" },
];

const AREAS: Record<string, string> = {
  "4000": "Roskilde",
  "4040": "Jyllinge",
  "4320": "Lejre",
  "4330": "Hvalsø",
  "4621": "Gadstrup",
  "4130": "Viby Sj.",
  "4600": "Køge",
  "2640": "Hedehusene",
  "4050": "Skibby",
};

export function TomrerSite() {
  const [service, setService] = useState(0);
  const [cat, setCat] = useState<Cat | "Alle">("Alle");
  const [open, setOpen] = useState<number | null>(null);
  const [preset, setPreset] = useState<{ service?: string }>({});
  const [presetKey, setPresetKey] = useState(0);

  const shown = GALLERY.map((g, i) => ({ ...g, i })).filter((g) => cat === "Alle" || g.cat === cat);
  const s = SERVICES[service];

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % GALLERY.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + GALLERY.length) % GALLERY.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const order = (name: string) => {
    setPreset({ service: name });
    setPresetKey((k) => k + 1);
    document.getElementById("besigtigelse")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-dvh overflow-x-clip bg-[#f4efe6] font-sans text-[#221c15]"
      style={{ "--ex-ink": "#221c15", "--ex-paper": "#fbf8f2", "--ex-accent": "#a2582a", "--ex-on-accent": "#fbf8f2" } as React.CSSProperties}
    >
      <DemoNote className="bg-[#221c15] text-[#f4efe6]/55" />

      <header className="sticky top-0 z-40 bg-[#f4efe6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="leading-none">
            <span className="block font-display text-2xl">Egholm</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a2582a]">Tømrer &amp; Snedker</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="#ydelser" className="hover:text-[#a2582a]">Ydelser</a>
            <a href="#projekter" className="hover:text-[#a2582a]">Projekter</a>
            <a href="#saadan" className="hover:text-[#a2582a]">Sådan arbejder vi</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href={TEL} className="hidden items-center gap-2 text-sm font-semibold sm:flex">
              <Icon name="phone" className="size-4 text-[#a2582a]" /> {PHONE}
            </a>
            <a href="#besigtigelse" className="rounded-full bg-[#221c15] px-5 py-2.5 text-sm font-semibold text-[#f4efe6] transition hover:bg-[#a2582a]">
              Book besigtigelse
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="px-3 sm:px-5">
        <div className="relative mx-auto min-h-[78svh] max-w-[90rem] overflow-hidden rounded-[2rem]">
          <motion.div initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
            <Img id="1676802037786-3697d60497ae" w={2200} alt="Hus under opførelse med træskelet" className="size-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a150f]/90 via-[#1a150f]/35 to-[#1a150f]/10" />
          <div className="relative flex min-h-[78svh] flex-col justify-end p-7 text-[#fbf8f2] sm:p-14">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e9b98f]">
              Tømrermester i Roskilde siden 2003
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-4 max-w-4xl font-display text-6xl leading-[0.95] sm:text-8xl"
            >
              Bygget ordentligt. <em className="text-[#e9b98f]">Første gang.</em>
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-lg leading-relaxed text-[#fbf8f2]/80">
                Tage, tilbygninger, terrasser og køkkener til private i Roskilde og omegn. Fast pris og 5 års garanti.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#besigtigelse" className="rounded-full bg-[#fbf8f2] px-7 py-4 text-sm font-semibold text-[#221c15] transition hover:bg-[#e9b98f]">
                  Book gratis besigtigelse
                </a>
                <a href="#projekter" className="rounded-full border border-[#fbf8f2]/40 px-7 py-4 text-sm font-semibold backdrop-blur transition hover:bg-[#fbf8f2]/10">
                  Se projekter
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 py-16 md:grid-cols-4">
        {[
          ["22 år", "som tømrermester"],
          ["640+", "afsluttede projekter"],
          ["5 år", "garanti på arbejdet"],
          ["4,9 ★", "på Google (212 anmeldelser)"],
        ].map(([v, l]) => (
          <div key={l} className="border-l border-[#221c15]/15 pl-5">
            <p className="font-display text-4xl sm:text-5xl">{v}</p>
            <p className="mt-1 text-sm text-[#221c15]/60">{l}</p>
          </div>
        ))}
      </section>

      {/* Services in tabs */}
      <section id="ydelser" className="scroll-mt-24 bg-[#26302a] py-20 text-[#f4efe6] sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e9b98f]">Ydelser</p>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl">Hvad skal bygges?</h2>
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {SERVICES.map((sv, i) => (
              <button
                key={sv.name}
                type="button"
                onClick={() => setService(i)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${service === i ? "bg-[#f4efe6] text-[#221c15]" : "bg-[#f4efe6]/8 hover:bg-[#f4efe6]/15"}`}
              >
                {sv.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 grid items-center gap-10 lg:grid-cols-2"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-3xl">
                <Img id={s.id} w={1100} alt={s.name} className="size-full object-cover" />
              </div>
              <div>
                <h3 className="font-display text-4xl">{s.name}</h3>
                <p className="mt-4 text-lg leading-relaxed text-[#f4efe6]/75">{s.text}</p>
                <ul className="mt-6 space-y-3">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3">
                      <span className="grid size-7 place-items-center rounded-full bg-[#e9b98f] text-[#221c15]">
                        <Icon name="check" className="size-4" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 flex items-center gap-2 text-sm text-[#f4efe6]/60">
                  <Icon name="clock" className="size-4" /> Typisk tidsramme: {s.time}
                </p>
                <button type="button" onClick={() => order(s.name)} className="mt-8 rounded-full bg-[#e9b98f] px-7 py-3.5 text-sm font-semibold text-[#221c15] transition hover:bg-[#f4efe6]">
                  Få et tilbud på {s.name.toLowerCase()}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Before / after */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="grid items-end gap-6 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a2582a]">Før og efter</p>
            <h2 className="mt-3 font-display text-5xl">Tilbygning i Himmelev</h2>
            <p className="mt-4 leading-relaxed text-[#221c15]/65">
              Familien manglede plads til et køkken-alrum. Vi byggede 32 m² på bagsiden af huset, med højt til loftet og store vinduer mod haven.
            </p>
            <p className="mt-4 text-sm text-[#221c15]/50">Træk i billedet →</p>
          </div>
          <BeforeAfter before="1768321917661-d4f1a89d2185" after="1648475236583-2e25a6cbf3bd" alt="Tilbygning i Himmelev" className="aspect-[4/3] rounded-3xl lg:col-span-2" />
        </div>
      </section>

      {/* Gallery */}
      <section id="projekter" className="scroll-mt-24 border-t border-[#221c15]/10 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-5xl sm:text-6xl">Udvalgte projekter</h2>
            <div className="flex flex-wrap gap-2">
              {(["Alle", "Tag", "Tilbygning", "Terrasse", "Indretning"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-2 text-sm transition ${cat === c ? "bg-[#221c15] text-[#f4efe6]" : "border border-[#221c15]/15 hover:border-[#221c15]/40"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            <AnimatePresence>
              {shown.map((g) => (
                <motion.button
                  layout
                  key={g.id}
                  type="button"
                  onClick={() => setOpen(g.i)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl text-left"
                >
                  <Img id={g.id} w={700} alt={g.title} className="size-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#1a150f]/80 to-transparent to-50% opacity-90" />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-[#fbf8f2]">
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-[#e9b98f]">{g.cat}</span>
                    <span className="block font-display text-lg leading-tight sm:text-xl">{g.title}</span>
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* How we work */}
      <section id="saadan" className="scroll-mt-24 bg-[#ebe3d6] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-5xl sm:text-6xl">Sådan arbejder vi</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {STEPS.map((st, i) => (
              <li key={st.title}>
                <p className="font-display text-6xl text-[#a2582a]/60">{i + 1}</p>
                <h3 className="mt-3 text-lg font-semibold">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#221c15]/65">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Master + reviews */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:py-28 lg:grid-cols-2">
        <div className="relative">
          <Img id="1595844730298-b960ff98fee0" w={1000} alt="Mads Egholm med værktøjsbælte" className="aspect-[4/5] w-full rounded-3xl object-cover" />
          <div className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-[#fbf8f2] p-5 shadow-xl sm:left-auto sm:w-72">
            <p className="font-display text-xl">Mads Egholm</p>
            <p className="text-sm text-[#221c15]/60">Tømrermester. Det er mig, der kommer ud og ser på opgaven.</p>
          </div>
        </div>
        <div className="space-y-6 pt-8 lg:pt-0">
          <h2 className="font-display text-5xl">Det siger kunderne</h2>
          {REVIEWS.map((r) => (
            <figure key={r.name} className="rounded-2xl border border-[#221c15]/10 bg-[#fbf8f2] p-6">
              <Stars className="text-sm text-[#a2582a]" />
              <blockquote className="mt-3 leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-3 text-sm text-[#221c15]/55">
                {r.name}, {r.place}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Area + quote */}
      <section id="besigtigelse" className="scroll-mt-24 bg-[#26302a] py-20 text-[#f4efe6] sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-5xl sm:text-6xl">Book en gratis besigtigelse</h2>
            <p className="mt-4 max-w-md text-lg text-[#f4efe6]/70">Vi kommer ud og ser på opgaven, uden at det koster noget. Du får et fast tilbud inden for en uge.</p>
            <a href={TEL} className="mt-8 inline-flex items-center gap-3 text-2xl font-display">
              <span className="grid size-12 place-items-center rounded-full bg-[#e9b98f] text-[#221c15]">
                <Icon name="phone" />
              </span>
              {PHONE}
            </a>
            <div className="mt-10 max-w-md rounded-2xl bg-[#f4efe6] p-6 text-[#221c15]">
              <AreaCheck areas={AREAS} base="Roskilde" />
            </div>
          </div>
          <div className="text-[#221c15]">
            <QuoteWizard
              key={presetKey}
              preset={preset}
              services={["Tag og kviste", "Tilbygning", "Terrasser", "Køkken og indretning", "Vinduer og døre", "Andet"]}
              reply="Mads ringer dig op inden for to hverdage og aftaler en tid til besigtigelse."
              submitLabel="Book besigtigelse"
            />
          </div>
        </div>
      </section>

      <footer className="px-5 pb-28 pt-12 text-sm text-[#221c15]/55 sm:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row">
          <p className="font-display text-xl text-[#221c15]">Egholm Tømrer &amp; Snedker</p>
          <p>Håndværkervej 8, 4000 Roskilde · Tlf. {PHONE}</p>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a150f]/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Img id={GALLERY[open].id} w={1600} alt={GALLERY[open].title} className="max-h-[75dvh] w-full rounded-2xl object-cover" />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-[#fbf8f2]">
                <span>
                  <span className="block font-display text-2xl">{GALLERY[open].title}</span>
                  <span className="text-sm text-[#fbf8f2]/60">{GALLERY[open].place}</span>
                </span>
                <span className="flex gap-2">
                  <button type="button" aria-label="Forrige" onClick={() => setOpen((open - 1 + GALLERY.length) % GALLERY.length)} className="grid size-11 place-items-center rounded-full border border-[#fbf8f2]/30">
                    ←
                  </button>
                  <button type="button" aria-label="Næste" onClick={() => setOpen((open + 1) % GALLERY.length)} className="grid size-11 place-items-center rounded-full border border-[#fbf8f2]/30">
                    →
                  </button>
                  <button type="button" aria-label="Luk" onClick={() => setOpen(null)} className="grid size-11 place-items-center rounded-full bg-[#fbf8f2] text-[#221c15]">
                    ×
                  </button>
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone action bar */}
      <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 sm:hidden">
        <a href={TEL} className="flex items-center justify-center gap-2 rounded-full bg-[#221c15] py-4 text-sm font-semibold text-[#f4efe6] shadow-2xl">
          <Icon name="phone" className="size-4" /> Ring
        </a>
        <a href="#besigtigelse" className="flex items-center justify-center rounded-full bg-[#a2582a] py-4 text-sm font-semibold text-[#fbf8f2] shadow-2xl">
          Få et tilbud
        </a>
      </div>
    </div>
  );
}
