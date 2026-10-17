"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AreaCheck, BeforeAfter, DemoNote, Icon, Img, QuoteWizard, SampleReviewsNote, Stars } from "./shared";

const PHONE = "78 90 12 34";
const TEL = "tel:+4578901234";

const INK = "#2a211d";
const BRICK = "#a63d24";
const LIME = "#f3efe7";

/** "What's wrong with my wall?": the four things people ring a bricklayer about. */
const PROBLEMS = [
  {
    id: "fuger",
    label: "Fugerne smuldrer",
    photo: "1612529505363-07a363324da7",
    cause: "Gamle kalkfuger bliver slidt af regn og frost. Når de smuldrer, trænger vandet ind i muren, og stenene begynder at skalle.",
    fix: "Vi kradser de gamle fuger ud i 15–20 mm dybde og fuger om med en mørtel, der passer til husets alder.",
    price: "Fra 650 kr./m²",
  },
  {
    id: "revner",
    label: "Revner i muren",
    photo: "1746606512371-e14d7cb6e45a",
    cause: "Revner kommer tit af sætninger i fundamentet, rustne murbindere eller en vinduesoverligger, der har givet sig.",
    fix: "Vi finder årsagen først. Derefter syr vi revnen med rustfri armering og murer de løse sten om.",
    price: "Fra 4.500 kr. pr. revne",
  },
  {
    id: "puds",
    label: "Pudsen skaller af",
    photo: "1533738630286-f1f4a61705f8",
    cause: "Puds, der er lavet med for stærk cementmørtel, kan ikke ånde. Fugten bliver fanget bag pudsen, og så slipper den.",
    fix: "Vi banker den løse puds af og pudser op igen med en diffusionsåben kalkmørtel, som muren kan ånde igennem.",
    price: "Fra 850 kr./m²",
  },
  {
    id: "fugt",
    label: "Fugt og hvide pletter",
    photo: "1616282836245-5d98abee8d98",
    cause: "Hvide pletter er salte, som fugten trækker ud af muren. Det betyder, at der kommer vand ind et sted, typisk fra sokkel, tag eller nedløb.",
    fix: "Vi gennemgår huset, finder vandvejen og laver sokkel, inddækning eller fuger, så muren kan tørre ud.",
    price: "Gratis gennemgang",
  },
];

const SERVICES = [
  { id: "1617720356637-6264c1c0b4bb", title: "Murværk og tilbygning", text: "Fra fundament til gesims. Vi murer tilbygninger, garager og nye vægge i den sten, der passer til huset." },
  { id: "1606989254307-863681926e43", title: "Facade og omfugning", text: "Omfugning, udskiftning af skadede sten og rens af facaden, så huset ser ordentligt ud de næste 40 år." },
  { id: "1558211583-03ed8a0b3d5f", title: "Badeværelse", text: "Vådrumssikring, fliser og klinker. Vi er certificeret til vådrum og står for hele badet, også de andre fag." },
  { id: "1604413950933-073730fba9f2", title: "Skorsten og sokkel", text: "Omfugning og ny afdækning af skorstenen, og pudsning af sokler, der er slået i stykker af frost." },
];

const PROJECTS = [
  { title: "Omfugning, Højbjerg", text: "Murermestervilla fra 1934. 140 m² facade kradset ud og fuget om med kalkmørtel. 9 arbejdsdage.", before: "1612529505363-07a363324da7", after: "1592795694703-24f1814cfb0a" },
  { title: "Pudset sokkel, Risskov", text: "Afskallet cementpuds banket af og pudset op igen med kalk. Holder i frost og kan ånde.", before: "1533738630286-f1f4a61705f8", after: "1559173525-d16dfd7c17fe" },
];

const REVIEWS = [
  { text: "De kom og kiggede på vores facade dagen efter, jeg ringede. Prisen holdt til kronen, og fugerne ser ud som da huset var nyt.", name: "Lene, Højbjerg" },
  { text: "Nyt badeværelse på tre uger, som lovet. De styrede både VVS'eren og elektrikeren, så vi skulle ikke tænke på noget.", name: "Morten, Viby J" },
  { text: "Ærlige folk. De sagde selv, at vores revne ikke var farlig, og at vi kunne vente et par år. Det sætter jeg pris på.", name: "Anne og Jakob, Lystrup" },
];

const AREAS: Record<string, string> = {
  "8000": "Aarhus C",
  "8200": "Aarhus N",
  "8210": "Aarhus V",
  "8230": "Åbyhøj",
  "8240": "Risskov",
  "8260": "Viby J",
  "8270": "Højbjerg",
  "8361": "Hasselager",
  "8381": "Tilst",
  "8520": "Lystrup",
};

/** Repointing price: m² of facade, how worn the joints are, and how tall the house is. All examples, incl. VAT. */
const WEAR = [
  { label: "Lidt slidte", note: "Fugerne er hele, men lidt hule", perM2: 650 },
  { label: "Løse og smuldrende", note: "Fugerne drysser, når du kradser i dem", perM2: 850 },
];
const FLOORS = [
  { label: "1 etage", note: "Vi klarer os med rullestillads", add: 0 },
  { label: "1½ etage", note: "Stillads til tagfoden", add: 9500 },
  { label: "2 etager", note: "Fuldt stillads hele vejen rundt", add: 16500 },
];

const kr = (n: number) => `${Math.round(n).toLocaleString("da-DK")} kr.`;

/** Brick bond in thin lines, used as a quiet pattern on the lime sections. */
const BOND = {
  // One tile is two courses: the head joints in the second course sit halfway along the first.
  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="84" height="56"><g stroke="rgba(42,33,29,0.07)" stroke-width="1" fill="none"><path d="M0 .5H84M0 28.5H84M.5 0V28M42.5 28V56"/></g></svg>',
  )}")`,
  backgroundSize: "84px 56px",
} as React.CSSProperties;

export function MurerSite() {
  const [problem, setProblem] = useState(0);
  const [m2, setM2] = useState(120);
  const [wear, setWear] = useState(0);
  const [floors, setFloors] = useState(0);
  const [project, setProject] = useState(0);
  const [preset, setPreset] = useState<{ service?: string; note?: string }>({});
  const [presetKey, setPresetKey] = useState(0);

  const order = (service: string, note = "") => {
    setPreset({ service, note });
    setPresetKey((k) => k + 1);
    document.getElementById("tilbud")?.scrollIntoView({ behavior: "smooth" });
  };

  const price = m2 * WEAR[wear].perM2 + FLOORS[floors].add;
  const days = Math.max(2, Math.ceil(m2 / (wear ? 14 : 18)));
  const priceNote = `Omfugning af ca. ${m2} m² facade, fuger ${WEAR[wear].label.toLowerCase()}, hus i ${FLOORS[floors].label}. Vejledende pris ${kr(price)}`;
  const p = PROBLEMS[problem];

  return (
    <div
      className="min-h-dvh overflow-x-clip bg-[#f3efe7] font-sans text-[#2a211d]"
      style={{ "--ex-ink": INK, "--ex-paper": "#ffffff", "--ex-accent": BRICK, "--ex-on-accent": "#ffffff" } as React.CSSProperties}
    >
      <DemoNote className="bg-[#2a211d] text-white/80" />

      <header className="sticky top-0 z-40 border-b border-[#2a211d]/10 bg-[#f3efe7]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-5">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            {/* Three bricks in a running bond. */}
            <span className="grid size-9 place-items-center bg-[#a63d24]" aria-hidden>
              <svg viewBox="0 0 24 24" className="size-6" fill={LIME}>
                <rect x="3" y="5" width="8.5" height="4" />
                <rect x="12.5" y="5" width="8.5" height="4" />
                <rect x="7.75" y="10" width="8.5" height="4" />
                <rect x="3" y="15" width="8.5" height="4" />
                <rect x="12.5" y="15" width="8.5" height="4" />
              </svg>
            </span>
            <span className="leading-none">
              <span className="block whitespace-nowrap font-display text-xl font-extrabold tracking-tight">Teglgaard Murer</span>
              <span className="mt-0.5 hidden whitespace-nowrap text-[11px] text-[#2a211d]/55 sm:block">Murermester siden 1998 · Aarhus</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 whitespace-nowrap text-sm font-medium xl:flex">
            {[
              ["#mur", "Hvad fejler muren?"],
              ["#pris", "Pris på omfugning"],
              ["#ydelser", "Ydelser"],
              ["#projekter", "Før og efter"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="hover:text-[#a63d24]">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={TEL} aria-label={`Ring ${PHONE}`} className="hidden items-center gap-2 whitespace-nowrap border-2 border-[#2a211d]/15 px-3 py-2 text-sm font-semibold transition hover:border-[#2a211d]/45 min-[380px]:flex sm:px-4">
              <Icon name="phone" className="size-4" /> <span className="hidden sm:inline">{PHONE}</span>
            </a>
            <a href="#tilbud" className="whitespace-nowrap bg-[#a63d24] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2a211d] sm:px-5">
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Gratis besigtigelse</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero: text on lime with the brick bond behind, a big photo on the right. */}
      <section id="top" className="relative" style={BOND}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 text-xs font-medium shadow-sm">
              Murermester · Aarhus siden 1998
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl"
            >
              Murerarbejde, der holder i 100 år.
            </motion.h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#2a211d]/70">
              Facader, omfugning, tilbygninger og badeværelser i Aarhus og omegn. Vi kommer ud og kigger gratis, og du får en fast pris på skrift.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#tilbud" className="bg-[#a63d24] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#2a211d]">
                Book gratis besigtigelse
              </a>
              <a href={TEL} className="flex items-center gap-2 border-2 border-[#2a211d] px-7 py-4 text-base font-semibold transition hover:bg-[#2a211d] hover:text-white">
                <Icon name="phone" /> {PHONE}
              </a>
            </div>
            <ul className="mt-10 grid gap-3 text-sm text-[#2a211d]/75 sm:grid-cols-3">
              {[
                ["shield", "Medlem af Danske Murermestre"],
                ["check", "Fast pris på skrift"],
                ["clock", "Besigtigelse inden for 3 dage"],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-center gap-2.5">
                  <span className="grid size-9 shrink-0 place-items-center bg-white text-[#a63d24]">
                    <Icon name={icon as "shield"} className="size-4.5" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative lg:col-span-6">
            <Img priority id="1701850009190-2859ba2aeea6" w={1400} alt="Murer lægger en ny række sten i mørtel" className="aspect-[4/3] w-full object-cover shadow-[16px_16px_0_0_#a63d24] lg:aspect-[4/5]" />
            <div className="absolute -bottom-6 left-4 bg-[#2a211d] px-5 py-4 text-white sm:left-[-1.5rem]">
              <p className="font-display text-3xl font-extrabold leading-none">2.400+</p>
              <p className="mt-1 text-xs text-white/65">opgaver i Østjylland</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's wrong with my wall? */}
      <section id="mur" className="scroll-mt-24 bg-[#2a211d] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#e07a55]">Kig på din mur</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Hvad fejler muren?</h2>
          <p className="mt-4 max-w-xl text-white/65">Vælg det, der ligner din mur mest. Så ser du, hvad det typisk skyldes, hvad vi gør ved det, og hvad det ca. koster.</p>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist">
            {PROBLEMS.map((pr, i) => (
              <button
                key={pr.id}
                type="button"
                role="tab"
                aria-selected={problem === i}
                onClick={() => setProblem(i)}
                className={`px-5 py-3 text-sm font-semibold transition ${problem === i ? "bg-[#a63d24] text-white" : "bg-white/8 text-white/75 hover:bg-white/15"}`}
              >
                {pr.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 grid overflow-hidden bg-[#f3efe7] text-[#2a211d] md:grid-cols-2"
            >
              <Img id={p.photo} w={1000} alt={p.label} className="aspect-[4/3] size-full object-cover md:aspect-auto" />
              <div className="flex flex-col p-7 sm:p-9">
                <h3 className="font-display text-3xl font-extrabold tracking-tight">{p.label}</h3>
                <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                  <div>
                    <dt className="font-semibold">Hvorfor sker det?</dt>
                    <dd className="mt-1 text-[#2a211d]/70">{p.cause}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Det gør vi</dt>
                    <dd className="mt-1 text-[#2a211d]/70">{p.fix}</dd>
                  </div>
                </dl>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[#2a211d]/10 pt-6">
                  <p>
                    <span className="block text-xs text-[#2a211d]/55">Typisk pris</span>
                    <span className="font-display text-2xl font-extrabold">{p.price}</span>
                  </p>
                  <button type="button" onClick={() => order("Facade og fuger", `${p.label}. `)} className="bg-[#a63d24] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2a211d]">
                    Få det set på, gratis
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Repointing price */}
      <section id="pris" className="scroll-mt-24 py-20 sm:py-28" style={BOND}>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#a63d24]">Omfugning</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Hvad koster det at fuge om?</h2>
            <p className="mt-4 max-w-lg text-[#2a211d]/65">Mål din facade ca. op, og vælg hvordan fugerne ser ud. Prisen er inkl. stillads, mørtel, oprydning og moms.</p>
            <div className="mt-8 space-y-7 bg-white p-6 shadow-sm sm:p-8">
              <label className="block">
                <span className="flex items-baseline justify-between text-sm font-semibold">
                  1. Hvor mange m² facade? <span className="font-display text-2xl font-extrabold tabular-nums">{m2} m²</span>
                </span>
                <input type="range" min={20} max={300} step={5} value={m2} onChange={(e) => setM2(Number(e.target.value))} className="mt-3 w-full accent-[#a63d24]" />
                <span className="mt-1 flex justify-between text-xs text-[#2a211d]/45">
                  <span>Lille hus</span>
                  <span>Stor villa</span>
                </span>
              </label>
              <fieldset>
                <legend className="mb-2.5 text-sm font-semibold">2. Hvordan ser fugerne ud?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {WEAR.map((o, i) => (
                    <button key={o.label} type="button" onClick={() => setWear(i)} aria-pressed={wear === i} className={`border-2 px-4 py-3 text-left transition ${wear === i ? "border-[#a63d24] bg-[#a63d24]/8" : "border-[#2a211d]/12 hover:border-[#2a211d]/30"}`}>
                      <span className="block font-semibold">{o.label}</span>
                      <span className="mt-0.5 block text-xs text-[#2a211d]/55">{o.note}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2.5 text-sm font-semibold">3. Hvor højt er huset?</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {FLOORS.map((o, i) => (
                    <button key={o.label} type="button" onClick={() => setFloors(i)} aria-pressed={floors === i} className={`border-2 px-4 py-3 text-left transition ${floors === i ? "border-[#a63d24] bg-[#a63d24]/8" : "border-[#2a211d]/12 hover:border-[#2a211d]/30"}`}>
                      <span className="block font-semibold">{o.label}</span>
                      <span className="mt-0.5 block text-xs text-[#2a211d]/55">{o.note}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#a63d24] p-7 text-white sm:p-8">
              <p className="text-sm text-white/70">Vejledende pris</p>
              <motion.p key={price} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 font-display text-5xl font-extrabold tabular-nums tracking-tight">
                {kr(price)}
              </motion.p>
              <p className="mt-2 text-sm text-white/75">Ca. {days} arbejdsdage med to murere.</p>
              <ul className="mt-6 space-y-2 border-t border-white/20 pt-6 text-sm">
                {["Gamle fuger kradset ud i 15–20 mm", "Ny fuge i mørtel, der passer til huset", "Stillads, afdækning og oprydning"].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0" /> {t}
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => order("Facade og fuger", priceNote)} className="mt-7 w-full bg-white py-4 text-sm font-semibold text-[#2a211d] transition hover:bg-[#f3efe7]">
                Få en fast pris på din facade
              </button>
              <p className="mt-3 text-center text-xs text-white/60">Vi måler op hos dig, før prisen er endelig.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="ydelser" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Det murer vi</h2>
            <p className="max-w-sm text-[#2a211d]/60">Fra en løs sten i soklen til en hel tilbygning. Vi har vores egne folk og bruger ingen underleverandører.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <article key={s.title} className="group overflow-hidden bg-[#f3efe7]">
                <div className="aspect-[16/9] overflow-hidden">
                  <Img id={s.id} w={900} alt={s.title} className="size-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-end justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#2a211d]/65">{s.text}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => order(s.title)}
                    aria-label={`Få tilbud på ${s.title}`}
                    className="grid size-12 shrink-0 place-items-center bg-[#2a211d] text-white transition group-hover:bg-[#a63d24]"
                  >
                    <Icon name="arrow" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section id="projekter" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Før og efter</h2>
          <p className="mt-3 text-[#2a211d]/60">Træk i billedet for at se forskellen.</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div key={project} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <BeforeAfter before={PROJECTS[project].before} after={PROJECTS[project].after} alt={PROJECTS[project].title} className="aspect-[4/3]" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="space-y-3">
              {PROJECTS.map((pr, i) => (
                <button
                  key={pr.title}
                  type="button"
                  onClick={() => setProject(i)}
                  className={`flex w-full items-center gap-4 p-3 text-left transition ${project === i ? "bg-[#2a211d] text-white" : "bg-white hover:bg-[#ebe5da]"}`}
                >
                  <Img id={pr.after} w={240} alt={pr.title} className="size-20 shrink-0 object-cover" />
                  <span>
                    <span className="block font-semibold">{pr.title}</span>
                    <span className={`mt-1 block text-sm leading-snug ${project === i ? "text-white/65" : "text-[#2a211d]/55"}`}>{pr.text}</span>
                  </span>
                </button>
              ))}
              <div className="border-2 border-dashed border-[#2a211d]/15 p-4 text-sm text-[#2a211d]/65">
                <span className="font-semibold text-[#2a211d]">Bedste tid at fuge om?</span> Fra april til oktober. Mørtel må ikke få frost, før den er hærdet.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Det siger kunderne</h2>
            <SampleReviewsNote className="max-w-sm text-[#2a211d]/60" />
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="border-t-4 border-[#a63d24] bg-[#f3efe7] p-6">
                <Stars className="text-sm text-[#c9861a]" />
                <blockquote className="mt-3 leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm text-[#2a211d]/60">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Area + quote */}
      <section id="omraade" className="scroll-mt-24 border-t border-[#2a211d]/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">Vi murer i hele Aarhus</h2>
            <p className="mt-3 max-w-md text-[#2a211d]/60">Pladsen ligger i Hasselager, og vi kører fra Lystrup til Højbjerg hver dag. Tast dit postnummer:</p>
            <div className="mt-8 max-w-md">
              <AreaCheck areas={AREAS} base="Aarhus" />
            </div>
            <div className="mt-10 flex items-center gap-4 bg-white p-5">
              <span className="grid size-16 shrink-0 place-items-center bg-[#a63d24] font-display text-2xl font-extrabold text-white">JT</span>
              <div>
                <p className="font-semibold">Jens Teglgaard, murermester</p>
                <p className="text-sm text-[#2a211d]/60">“Jeg kommer selv ud og kigger. Så ved du, hvem der står for arbejdet.”</p>
              </div>
            </div>
          </div>
          <div id="tilbud" className="scroll-mt-24">
            <h2 className="font-display text-3xl font-extrabold tracking-tight">Book en gratis besigtigelse</h2>
            <p className="mb-6 mt-2 text-[#2a211d]/60">Fortæl kort, hvad der skal laves. Jens ringer dig op og aftaler en tid.</p>
            <QuoteWizard
              key={presetKey}
              preset={preset}
              services={["Facade og fuger", "Murværk og tilbygning", "Badeværelse", "Skorsten og sokkel", "Pudsning", "Andet"]}
              reply="Jens ringer dig op inden for to hverdage og aftaler en tid til at komme ud og kigge."
              submitLabel="Book besigtigelse"
            />
          </div>
        </div>
      </section>

      <footer className="bg-[#2a211d] px-5 pb-28 pt-12 text-sm text-white/55 sm:pb-12">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-extrabold text-white">Teglgaard Murer</p>
            <p className="mt-2">Murermester siden 1998</p>
          </div>
          <div>
            <p>Bødkervej 7, 8361 Hasselager</p>
            <p>CVR 00 00 00 00 (eksempel)</p>
          </div>
          <div>
            <a href={TEL} className="block text-white">Tlf. {PHONE}</a>
            <p>Hverdage 7–15.30</p>
          </div>
        </div>
      </footer>

      {/* Phone action bar */}
      <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 sm:hidden">
        <a href={TEL} className="flex items-center justify-center gap-2 bg-[#a63d24] py-4 text-sm font-semibold text-white shadow-2xl">
          <Icon name="phone" className="size-4" /> Ring nu
        </a>
        <a href="#tilbud" className="flex items-center justify-center bg-white py-4 text-sm font-semibold text-[#2a211d] shadow-2xl ring-1 ring-[#2a211d]/10">
          Gratis besigtigelse
        </a>
      </div>
    </div>
  );
}
