"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AreaCheck, BeforeAfter, DemoNote, Icon, Img, QuoteWizard, Stars } from "./shared";

const PHONE = "56 78 12 34";
const TEL = "tel:+4556781234";

const INK = "#17191c";
const YELLOW = "#ffd000";

/** What to do when the HPFI relay keeps tripping: the steps we would tell you on the phone. */
const HPFI_STEPS = [
  { title: "Sluk alle grupper", text: "Slå alle de små automatsikringer i eltavlen ned. HPFI-relæet er den store kontakt med en testknap." },
  { title: "Slå HPFI-relæet til igen", text: "Bliver det oppe, er fejlen på en af grupperne. Slår det fra med det samme, så stop og ring til os." },
  { title: "Tænd én gruppe ad gangen", text: "Slå grupperne til en for en. Den gruppe, der får relæet til at slå fra, er der hvor fejlen sidder." },
  { title: "Træk stikkene ud på den gruppe", text: "Ofte er det en vaskemaskine, en kogeplade eller en lampe udenfor. Sæt dem i igen en ad gangen." },
];

const SERVICES = [
  { id: "1576446470246-499c738d1c8e", title: "Eltavle og HPFI", text: "Ny tavle, nye grupper og HPFI-relæ. Vi skifter gamle porcelænssikringer på én dag." },
  { id: "1704475289650-6ab9fc4a0a5b", title: "Ladeboks til elbil", text: "Montering af ladeboks i garage, carport eller på en stander ved indkørslen. Fast pris." },
  { id: "1730991568658-ad8638395a9e", title: "Belysning", text: "Spots, pendler over køkkenøen og lys i haven. Vi hjælper også med at vælge." },
  { id: "1621905251189-08b45d6a269e", title: "Renovering og nye stik", text: "Flere stikkontakter, nye kabler og el i køkken og bad, når huset bliver sat i stand." },
];

const PROJECTS = [
  { title: "Eltavle, Køge", text: "Gammel tavle med skruesikringer blev til ny tavle med HPFI og 8 grupper. Én arbejdsdag.", before: "1751783901059-3d1870e69581", after: "1576446470246-499c738d1c8e" },
  { title: "Eltavle, Herfølge", text: "Rusten tavle i kælderen fra 60'erne udskiftet, inkl. ny jordforbindelse.", before: "1757146578941-37e7acc595a1", after: "1544724569-5f546fd6f2b5" },
];

const REVIEWS = [
  { text: "Strømmen gik midt i en fødselsdag. De kom inden for en time, fandt fejlen i udendørslampen og var væk igen 20 minutter senere.", name: "Camilla, Køge" },
  { text: "Fik sat ladeboks op til den pris, der stod på hjemmesiden. Pænt trukket kabel langs garagen og ryddet op bagefter.", name: "Henrik, Herfølge" },
  { text: "Ny eltavle i vores gamle hus. De forklarede hvad de lavede og hvorfor, og der var ingen ekstraregning.", name: "Sofie, Borup" },
];

const AREAS: Record<string, string> = {
  "4600": "Køge",
  "4681": "Herfølge",
  "4140": "Borup",
  "4623": "Lille Skensved",
  "4682": "Tureby",
  "2680": "Solrød Strand",
  "4632": "Bjæverskov",
  "4100": "Ringsted",
};

/** Charger price: a base price plus the things that change it. All examples, incl. VAT. */
const CHARGER = {
  base: 8995,
  power: [
    { label: "11 kW", note: "Passer til de fleste elbiler", add: 0 },
    { label: "22 kW", note: "Kræver 3-faset forsyning med plads til det", add: 2500 },
  ],
  distance: [
    { label: "Under 10 m", note: "Tavlen er i garagen eller lige ved siden af", add: 0 },
    { label: "10–25 m", note: "Kabel gennem en væg eller langs huset", add: 1800 },
    { label: "Over 25 m", note: "Kabel i jorden til carport eller indkørsel", add: 4200 },
  ],
  mount: [
    { label: "På væggen", add: 0 },
    { label: "På stander", add: 1900 },
  ],
};

const kr = (n: number) => `${n.toLocaleString("da-DK")} kr.`;

function Choice({ active, onClick, label, note }: { active: boolean; onClick: () => void; label: string; note?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md border-2 px-4 py-3 text-left text-[#17191c] transition ${active ? "border-[#ffd000] bg-[#ffd000]" : "border-white bg-white hover:border-[#ffd000]/60"}`}
    >
      <span className="block font-display text-lg font-bold">{label}</span>
      {note && <span className="mt-0.5 block text-xs leading-snug text-[#17191c]/60">{note}</span>}
    </button>
  );
}

export function ElSite() {
  const [done, setDone] = useState<boolean[]>(HPFI_STEPS.map(() => false));
  const [power, setPower] = useState(0);
  const [distance, setDistance] = useState(0);
  const [mount, setMount] = useState(0);
  const [project, setProject] = useState(0);
  const [preset, setPreset] = useState<{ service?: string; note?: string }>({});
  const [presetKey, setPresetKey] = useState(0);

  const order = (service: string, note = "") => {
    setPreset({ service, note });
    setPresetKey((k) => k + 1);
    document.getElementById("tilbud")?.scrollIntoView({ behavior: "smooth" });
  };

  const price = CHARGER.base + CHARGER.power[power].add + CHARGER.distance[distance].add + CHARGER.mount[mount].add;
  const chargerNote = `Ladeboks ${CHARGER.power[power].label}, kabel ${CHARGER.distance[distance].label.toLowerCase()}, ${CHARGER.mount[mount].label.toLowerCase()}. Vejledende pris ${kr(price)}`;
  const allDone = done.every(Boolean);

  return (
    <div
      className="min-h-dvh overflow-x-clip bg-[#f4f3ef] font-sans text-[#17191c]"
      style={{ "--ex-ink": INK, "--ex-paper": "#ffffff", "--ex-accent": YELLOW, "--ex-on-accent": INK } as React.CSSProperties}
    >
      <DemoNote className="bg-[#0f1113] text-white/55" />

      <header className="sticky top-0 z-40 border-b border-[#17191c]/10 bg-[#f4f3ef]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-5">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-md bg-[#ffd000]">
              <svg viewBox="0 0 24 24" className="size-5" fill={INK} aria-hidden>
                <path d="M13.5 2L5 13.5h6L9.5 22 19 9.5h-6z" />
              </svg>
            </span>
            <span className="leading-none">
              <span className="block whitespace-nowrap font-display text-xl font-bold tracking-tight">Fasebro El</span>
              <span className="mt-0.5 hidden whitespace-nowrap text-[11px] text-[#17191c]/55 sm:block">Autoriseret elinstallatør · Køge</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 whitespace-nowrap text-sm font-medium lg:flex">
            <a href="#hpfi" className="hover:underline hover:decoration-[#ffd000] hover:decoration-2 hover:underline-offset-8">Strømmen er gået</a>
            <a href="#ladeboks" className="hover:underline hover:decoration-[#ffd000] hover:decoration-2 hover:underline-offset-8">Ladeboks</a>
            <a href="#ydelser" className="hover:underline hover:decoration-[#ffd000] hover:decoration-2 hover:underline-offset-8">Ydelser</a>
            <a href="#projekter" className="hover:underline hover:decoration-[#ffd000] hover:decoration-2 hover:underline-offset-8">Før og efter</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={TEL} aria-label={`Ring ${PHONE}`} className="hidden items-center gap-2 whitespace-nowrap rounded-md border-2 border-[#17191c]/12 px-3 py-2 text-sm font-semibold transition hover:border-[#17191c]/40 min-[380px]:flex sm:px-4">
              <Icon name="phone" className="size-4" /> <span className="hidden sm:inline">{PHONE}</span>
            </a>
            <a href="#tilbud" className="whitespace-nowrap rounded-md bg-[#17191c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ffd000] hover:text-[#17191c] sm:px-5">
              Få et tilbud
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-[#17191c] text-white">
        <Img id="1615774925655-a0e97fc85c14" w={2000} alt="Elektriker måler på en eltavle" className="absolute inset-0 size-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17191c] via-[#17191c]/88 to-[#17191c]/30" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-14 sm:pb-28 sm:pt-24">
          <p className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
            <Stars className="text-[#ffd000]" /> 4,9 af 5 · 286 anmeldelser
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl"
          >
            Strømmen gået? <span className="text-[#ffd000]">Vi kommer i dag.</span>
          </motion.h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Autoriseret elinstallatør i Køge og omegn. Eltavler, ladebokse, lys og nye stik. Fast pris før vi går i gang.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={TEL} className="flex items-center gap-2 rounded-md bg-[#ffd000] px-7 py-4 text-base font-semibold text-[#17191c] transition hover:brightness-105">
              <Icon name="phone" /> Ring {PHONE}
            </a>
            <a href="#ladeboks" className="rounded-md border-2 border-white/25 px-7 py-4 text-base font-semibold transition hover:bg-white hover:text-[#17191c]">
              Pris på ladeboks
            </a>
          </div>
          <ul className="mt-12 grid max-w-3xl gap-4 text-sm text-white/80 sm:grid-cols-3">
            {[
              ["shield", "Autoriseret af Sikkerhedsstyrelsen"],
              ["clock", "Akut hjælp samme dag"],
              ["check", "Fast pris, ingen overraskelser"],
            ].map(([icon, text]) => (
              <li key={text} className="flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-white/10 text-[#ffd000]">
                  <Icon name={icon as "shield"} className="size-4.5" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HPFI guide */}
      <section id="hpfi" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#17191c]/50">Gør det selv, inden du ringer</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">Slår HPFI-relæet fra?</h2>
            <p className="mt-4 text-[#17191c]/65">
              Tit kan du selv finde fejlen på fem minutter. Følg trinene og sæt flueben. Rør aldrig ved åbne ledninger, og lugter det brændt, så sluk og ring med det samme.
            </p>
            <a href={TEL} className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#17191c] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ffd000] hover:text-[#17191c]">
              <Icon name="phone" className="size-4" /> Ring hellere med det samme
            </a>
          </div>
          <div className="lg:col-span-3">
            <ol className="space-y-3">
              {HPFI_STEPS.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                    aria-pressed={done[i]}
                    className={`flex w-full items-start gap-4 rounded-md border-2 bg-white p-5 text-left transition ${done[i] ? "border-[#ffd000]" : "border-transparent hover:border-[#17191c]/15"}`}
                  >
                    <span className={`grid size-9 shrink-0 place-items-center rounded-md font-display text-lg font-bold transition ${done[i] ? "bg-[#ffd000]" : "bg-[#17191c]/6"}`}>
                      {done[i] ? <Icon name="check" className="size-5" /> : i + 1}
                    </span>
                    <span>
                      <span className="block font-display text-xl font-bold">{s.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-[#17191c]/65">{s.text}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <AnimatePresence>
              {allDone && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-md bg-[#17191c] p-5 text-white"
                >
                  <p className="max-w-sm text-sm">
                    <span className="font-semibold">Slår det stadig fra?</span> <span className="text-white/65">Så er fejlen i selve installationen. Det skal en elektriker se på.</span>
                  </p>
                  <button type="button" onClick={() => order("Akut hjælp", "HPFI-relæet slår fra. Har prøvet at finde gruppen selv.")} className="rounded-md bg-[#ffd000] px-5 py-3 text-sm font-semibold text-[#17191c]">
                    Bestil en elektriker
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Charger price */}
      <section id="ladeboks" className="scroll-mt-24 bg-[#17191c] py-20 text-white sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ffd000]">Ladeboks til elbil</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Hvad koster det hos dig?</h2>
            <p className="mt-4 max-w-lg text-white/65">Vælg tre ting, så ser du prisen med det samme. Den er inkl. ladeboks, montering, kabel og moms.</p>
            <div className="mt-8 space-y-6 text-[#17191c]">
              <fieldset>
                <legend className="mb-2.5 text-sm font-semibold text-white">1. Hvor stærk skal den være?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {CHARGER.power.map((o, i) => (
                    <Choice key={o.label} active={power === i} onClick={() => setPower(i)} label={o.label} note={o.note} />
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2.5 text-sm font-semibold text-white">2. Hvor langt er der fra eltavlen?</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {CHARGER.distance.map((o, i) => (
                    <Choice key={o.label} active={distance === i} onClick={() => setDistance(i)} label={o.label} note={o.note} />
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2.5 text-sm font-semibold text-white">3. Hvor skal den sidde?</legend>
                <div className="grid grid-cols-2 gap-2">
                  {CHARGER.mount.map((o, i) => (
                    <Choice key={o.label} active={mount === i} onClick={() => setMount(i)} label={o.label} />
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-28 overflow-hidden rounded-md bg-white text-[#17191c]">
              <Img id="1766507680004-1c71007aefe5" w={900} alt="Ladeboks monteret på en trævæg" className="aspect-[16/10] w-full object-cover" />
              <div className="p-6 sm:p-7">
                <p className="text-sm text-[#17191c]/55">Vejledende pris</p>
                <motion.p key={price} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 font-display text-5xl font-bold tabular-nums tracking-tight">
                  {kr(price)}
                </motion.p>
                <ul className="mt-5 space-y-2 text-sm">
                  {["Ladeboks med app og gratis opdateringer", "Montering, kabel og ny gruppe i tavlen", "Anmeldelse til netselskabet"].map((t) => (
                    <li key={t} className="flex gap-2.5">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => order("Ladeboks til elbil", chargerNote)} className="mt-6 w-full rounded-md bg-[#ffd000] py-4 text-sm font-semibold transition hover:brightness-105">
                  Få et fast tilbud på denne pris
                </button>
                <p className="mt-3 text-center text-xs text-[#17191c]/45">Vi kigger på det hos dig, før prisen er endelig.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="ydelser" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Det klarer vi</h2>
          <p className="max-w-sm text-[#17191c]/60">Fra en ny stikkontakt til en hel installation i et nyt hus. Små opgaver er lige så velkomne som store.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <article key={s.title} className="group overflow-hidden rounded-md bg-white">
              <div className="aspect-[16/9] overflow-hidden">
                <Img id={s.id} w={900} alt={s.title} className="size-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-end justify-between gap-4 p-6">
                <div>
                  <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#17191c]/65">{s.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => order(s.title)}
                  aria-label={`Få tilbud på ${s.title}`}
                  className="grid size-12 shrink-0 place-items-center rounded-md bg-[#17191c] text-white transition group-hover:bg-[#ffd000] group-hover:text-[#17191c]"
                >
                  <Icon name="arrow" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Before / after */}
      <section id="projekter" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Gammel tavle ud. Ny tavle ind.</h2>
          <p className="mt-3 text-[#17191c]/60">Træk i billedet for at se forskellen.</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div key={project} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <BeforeAfter before={PROJECTS[project].before} after={PROJECTS[project].after} alt={PROJECTS[project].title} className="aspect-[4/3] rounded-md" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="space-y-3">
              {PROJECTS.map((pr, i) => (
                <button
                  key={pr.title}
                  type="button"
                  onClick={() => setProject(i)}
                  className={`flex w-full items-center gap-4 rounded-md p-3 text-left transition ${project === i ? "bg-[#17191c] text-white" : "bg-[#f4f3ef] hover:bg-[#ebe9e3]"}`}
                >
                  <Img id={pr.after} w={240} alt={pr.title} className="size-20 shrink-0 rounded-md object-cover" />
                  <span>
                    <span className="block font-semibold">{pr.title}</span>
                    <span className={`mt-1 block text-sm leading-snug ${project === i ? "text-white/65" : "text-[#17191c]/55"}`}>{pr.text}</span>
                  </span>
                </button>
              ))}
              <div className="rounded-md border-2 border-dashed border-[#17191c]/15 p-4 text-sm text-[#17191c]/65">
                <span className="font-semibold text-[#17191c]">Har du stadig skruesikringer?</span> Så mangler du sandsynligvis et HPFI-relæ, der slår strømmen fra, før nogen kommer til skade.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Det siger kunderne</h2>
          <p className="flex items-center gap-2 text-[#17191c]/65">
            <span className="font-display text-3xl font-bold text-[#17191c]">4,9</span> <Stars className="text-[#e0a800]" /> 286 anmeldelser på Google
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="rounded-md bg-white p-6">
              <Stars className="text-sm text-[#e0a800]" />
              <blockquote className="mt-3 leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm text-[#17191c]/60">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Area + quote */}
      <section id="omraade" className="scroll-mt-24 border-t border-[#17191c]/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Vi kører i hele Køge Bugt</h2>
            <p className="mt-3 max-w-md text-[#17191c]/60">Værkstedet ligger i Køge, og bilerne er på vejene fra Solrød til Ringsted hver dag. Tast dit postnummer:</p>
            <div className="mt-8 max-w-md">
              <AreaCheck areas={AREAS} base="Køge" />
            </div>
            <div className="mt-10 flex items-center gap-4 rounded-md bg-white p-5">
              <span className="grid size-16 shrink-0 place-items-center rounded-md bg-[#ffd000] font-display text-2xl font-bold">MF</span>
              <div>
                <p className="font-semibold">Mads Fasebro, elinstallatør</p>
                <p className="text-sm text-[#17191c]/60">“Du får mit nummer, og jeg ringer selv tilbage.”</p>
              </div>
            </div>
          </div>
          <div id="tilbud" className="scroll-mt-24">
            <h2 className="font-display text-3xl font-bold tracking-tight">Få et gratis tilbud</h2>
            <p className="mb-6 mt-2 text-[#17191c]/60">Udfyld på under et minut. Vi ringer dig op, typisk samme dag.</p>
            <QuoteWizard
              key={presetKey}
              preset={preset}
              services={["Akut hjælp", "Eltavle og HPFI", "Ladeboks til elbil", "Belysning", "Nye stik og kabler", "Andet"]}
              reply="Mads ringer dig op i dag. Er strømmen gået helt, så ring direkte på 56 78 12 34."
            />
          </div>
        </div>
      </section>

      <footer className="bg-[#0f1113] px-5 pb-28 pt-12 text-sm text-white/55 sm:pb-12">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-bold text-white">Fasebro El</p>
            <p className="mt-2">Autoriseret elinstallatør</p>
          </div>
          <div>
            <p>Industrivej 14, 4600 Køge</p>
            <p>CVR 00 00 00 00 (eksempel)</p>
          </div>
          <div>
            <a href={TEL} className="block text-white">Tlf. {PHONE}</a>
            <p>Hverdage 7–16 · Akut alle dage</p>
          </div>
        </div>
      </footer>

      {/* Phone action bar */}
      <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 sm:hidden">
        <a href={TEL} className="flex items-center justify-center gap-2 rounded-md bg-[#ffd000] py-4 text-sm font-semibold text-[#17191c] shadow-2xl">
          <Icon name="phone" className="size-4" /> Ring nu
        </a>
        <a href="#tilbud" className="flex items-center justify-center rounded-md bg-white py-4 text-sm font-semibold text-[#17191c] shadow-2xl ring-1 ring-[#17191c]/10">
          Få et tilbud
        </a>
      </div>
    </div>
  );
}
