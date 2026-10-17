"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AreaCheck, BeforeAfter, DemoNote, Icon, Img, QuoteWizard, Stars } from "./shared";

const PHONE = "12 34 56 78";
const TEL = "tel:+4512345678";

const PROBLEMS = [
  {
    name: "Stoppet afløb",
    price: "fra 895 kr.",
    when: "I dag",
    tip: "Hæld ikke afløbsrens i. Det kan ætse rørene og gør arbejdet farligt for os bagefter.",
  },
  {
    name: "Toilettet løber",
    price: "fra 795 kr.",
    when: "I dag eller i morgen",
    tip: "Luk for den lille hane bag toilettet. Så sparer du vand, til vi kommer.",
  },
  {
    name: "Dryppende hane",
    price: "fra 695 kr.",
    when: "Inden for 2 dage",
    tip: "En dryppende hane kan koste over 1.000 kr. om året i vand. Det er sjældent en stor reparation.",
  },
  {
    name: "Intet varmt vand",
    price: "fra 995 kr.",
    when: "I dag",
    tip: "Tjek om HFI-relæet er slået fra i eltavlen. Er det ikke det, så ring.",
  },
  {
    name: "Kolde radiatorer",
    price: "fra 895 kr.",
    when: "Inden for 2 dage",
    tip: "Prøv at lufte radiatoren ud med en radiatornøgle. Hjælper det ikke, kigger vi på anlægget.",
  },
  {
    name: "Vandskade / sprængt rør",
    price: "Akut",
    when: "Inden for 1 time",
    tip: "Luk hovedhanen med det samme. Den sidder typisk i bryggers, kælder eller under køkkenvasken.",
  },
];

const SERVICES = [
  { id: "1584622650111-993a426fbf0a", title: "Nye badeværelser", text: "Fra første skitse til sidste fuge. Vi koordinerer murer og elektriker, så du kun har én at ringe til." },
  { id: "1650551182991-b07558247564", title: "Varme og fjernvarme", text: "Ny fjernvarmeunit, gulvvarme eller radiatorer. Vi hjælper også med tilskud til varmepumpe." },
  { id: "1521207418485-99c705420785", title: "Køkken og vand", text: "Ny vask, opvaskemaskine, armaturer og vandinstallationer, når køkkenet skal skiftes." },
  { id: "1676210134188-4c05dd172f89", title: "Akut service", text: "Utætheder, stop og sprængte rør. Døgnvagten rykker ud alle dage, også i weekenden." },
];

const PROJECTS = [
  { title: "Badeværelse, Herlev", text: "Gammelt bad med kar blev til walk-in bruser og gulvvarme. 9 arbejdsdage.", before: "1630840450974-7c7ddad8bdfe", after: "1638799869566-b17fa794c4de" },
  { title: "Badeværelse, Ballerup", text: "Nyt badeværelse i rækkehus fra 70'erne. Nye rør, nyt afløb og ny vægbeklædning.", before: "1701278301488-b550984729c2", after: "1584622650111-993a426fbf0a" },
  { title: "Køkken, Gladsaxe", text: "Ny vask, nye vandrør og tilslutning af opvaskemaskine under køkkenskiftet.", before: "1618832515490-e181c4794a45", after: "1565183928294-7063f23ce0f8" },
];

const REVIEWS = [
  { text: "Ringede kl. 7 om morgenen med vand på gulvet. De var her kl. 8, og det hele var ordnet inden frokost.", name: "Mette, Herlev" },
  { text: "Fik en fast pris på det nye badeværelse, og den holdt. Ingen ekstraregninger. Pænt og ryddeligt arbejde.", name: "Lars, Ballerup" },
  { text: "Venlige folk, der forklarer hvad de laver. Har brugt dem tre gange nu og kommer til at gøre det igen.", name: "Aisha, Gladsaxe" },
  { text: "Super hurtig hjælp med fjernvarmeunitten. Kom til den aftalte tid og ringede, da de var på vej.", name: "Peter, Husum" },
];

const AREAS: Record<string, string> = {
  "2730": "Herlev",
  "2750": "Ballerup",
  "2860": "Søborg",
  "2700": "Brønshøj",
  "2740": "Skovlunde",
  "2610": "Rødovre",
  "2600": "Glostrup",
  "2880": "Bagsværd",
  "2400": "København NV",
};

export function VvsSite() {
  const [problem, setProblem] = useState(0);
  const [project, setProject] = useState(0);
  const [preset, setPreset] = useState<{ service?: string; note?: string }>({});
  const [presetKey, setPresetKey] = useState(0);

  const order = (service: string, note = "") => {
    setPreset({ service, note });
    setPresetKey((k) => k + 1);
    document.getElementById("tilbud")?.scrollIntoView({ behavior: "smooth" });
  };

  const p = PROBLEMS[problem];

  return (
    <div
      className="min-h-dvh overflow-x-clip bg-[#f2f4f6] font-sans text-[#0e1e33]"
      style={{ "--ex-ink": "#0e1e33", "--ex-paper": "#ffffff", "--ex-accent": "#ff5a1f", "--ex-on-accent": "#ffffff" } as React.CSSProperties}
    >
      <DemoNote className="bg-[#0a1626] text-white/55" />

      {/* Emergency bar */}
      <a href={TEL} className="flex items-center justify-center gap-3 bg-[#ff5a1f] px-4 py-2.5 text-sm font-semibold text-white">
        <Icon name="phone" className="size-4" />
        Akut? Døgnvagt alle dage. Ring {PHONE}
      </a>

      <header className="sticky top-0 z-40 border-b border-[#0e1e33]/8 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-5">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-[#0e1e33] font-display text-xl font-bold text-white">H</span>
            <span className="whitespace-nowrap font-display text-2xl font-bold uppercase leading-none tracking-wide">
              Holm <span className="text-[#ff5a1f]">VVS</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 whitespace-nowrap text-sm font-medium lg:flex">
            <a href="#hjaelp" className="hover:text-[#ff5a1f]">Hvad er der galt?</a>
            <a href="#ydelser" className="hover:text-[#ff5a1f]">Ydelser</a>
            <a href="#projekter" className="hover:text-[#ff5a1f]">Før og efter</a>
            <a href="#omraade" className="hover:text-[#ff5a1f]">Område</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={TEL} className="hidden items-center gap-2 whitespace-nowrap rounded-full border-2 border-[#0e1e33]/12 px-4 py-2 text-sm font-semibold transition hover:border-[#0e1e33]/40 sm:flex">
              <Icon name="phone" className="size-4" /> {PHONE}
            </a>
            <a href="#tilbud" className="whitespace-nowrap rounded-md bg-[#0e1e33] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff5a1f] sm:px-5">
              Få et tilbud
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-[#0e1e33] text-white">
        <Img id="1749532125405-70950966b0e5" w={2000} alt="VVS'er reparerer rør på et badeværelse" className="absolute inset-0 size-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1e33] via-[#0e1e33]/85 to-[#0e1e33]/20" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pb-28 sm:pt-24">
          <motion.p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <Stars className="text-[#ffb35c]" /> 4,9 af 5 · 418 anmeldelser
          </motion.p>
          <motion.h1
            className="mt-6 max-w-3xl font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight sm:text-8xl"
          >
            Utæt? Stoppet? <span className="text-[#ff5a1f]">Vi kommer i dag.</span>
          </motion.h1>
          <motion.p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Autoriseret VVS-installatør i Herlev og omegn. Fast pris, før vi går i gang, og vi rydder op efter os.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-3">
            <a href={TEL} className="flex items-center gap-2 rounded-md bg-[#ff5a1f] px-8 py-4 text-base font-semibold text-white transition hover:brightness-110">
              <Icon name="phone" /> Ring {PHONE}
            </a>
            <a href="#tilbud" className="rounded-md border-2 border-white/25 px-8 py-4 text-base font-semibold transition hover:bg-white hover:text-[#0e1e33]">
              Få et gratis tilbud
            </a>
          </motion.div>
          <motion.ul className="mt-12 grid max-w-3xl gap-4 text-sm text-white/80 sm:grid-cols-3">
            {[
              ["shield", "Autoriseret og forsikret"],
              ["clock", "Svar inden for 1 time"],
              ["check", "Fast pris, ingen overraskelser"],
            ].map(([icon, text]) => (
              <li key={text} className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-white/10 text-[#ffb35c]">
                  <Icon name={icon as "shield"} className="size-4.5" />
                </span>
                {text}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* What's wrong? */}
      <section id="hjaelp" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
        <h2 className="mt-3 font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">Hvad er der galt?</h2>
        <p className="mt-3 max-w-xl text-[#0e1e33]/60">Vælg dit problem, og se hvad det typisk koster, hvornår vi kan komme, og hvad du kan gøre lige nu.</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="grid grid-cols-2 gap-2 lg:col-span-2 lg:grid-cols-1">
            {PROBLEMS.map((pr, i) => (
              <button
                key={pr.name}
                type="button"
                onClick={() => setProblem(i)}
                className={`flex items-center justify-between rounded-md px-4 py-3.5 text-left text-sm font-semibold transition sm:px-5 sm:text-base ${
                  problem === i ? "bg-[#0e1e33] text-white" : "bg-white hover:bg-white/60"
                }`}
              >
                {pr.name}
                <Icon name="arrow" className={`hidden size-4 sm:block ${problem === i ? "text-[#ff5a1f]" : "opacity-30"}`} />
              </button>
            ))}
          </div>
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={problem}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-lg bg-white p-7 shadow-sm sm:p-9"
              >
                <h3 className="font-display text-4xl font-bold uppercase">{p.name}</h3>
                <dl className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-md bg-[#f2f4f6] p-4">
                    <dt className="text-xs uppercase tracking-wider opacity-55">Typisk pris</dt>
                    <dd className="mt-1 font-display text-3xl font-bold">{p.price}</dd>
                  </div>
                  <div className="rounded-md bg-[#f2f4f6] p-4">
                    <dt className="text-xs uppercase tracking-wider opacity-55">Vi kan komme</dt>
                    <dd className="mt-1 font-display text-3xl font-bold text-[#ff5a1f]">{p.when}</dd>
                  </div>
                </dl>
                <div className="mt-5 rounded-md border border-[#ffb35c]/50 bg-[#fff6ec] p-4 text-sm leading-relaxed">
                  <p className="font-semibold">Mens du venter</p>
                  <p className="mt-1 text-[#0e1e33]/75">{p.tip}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={TEL} className="flex items-center gap-2 rounded-md bg-[#ff5a1f] px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110">
                    <Icon name="phone" className="size-4" /> Ring nu
                  </a>
                  <button type="button" onClick={() => order(p.name)} className="rounded-md border-2 border-[#0e1e33]/15 px-6 py-3 text-sm font-semibold transition hover:border-[#0e1e33]">
                    Bestil en VVS&apos;er
                  </button>
                </div>
                <p className="mt-4 text-xs opacity-45">Priser er inkl. moms og første halve time. Akut udkald aften og weekend: +495 kr.</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="ydelser" className="scroll-mt-24 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="mt-3 font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">Det klarer vi</h2>
            </div>
            <p className="max-w-sm text-[#0e1e33]/60">Fra et dryppende rør til et helt nyt badeværelse. Små opgaver er lige så velkomne som store.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <article key={s.title} className="group overflow-hidden rounded-lg bg-[#f2f4f6]">
                <div className="aspect-[16/9] overflow-hidden">
                  <Img id={s.id} w={900} alt={s.title} className="size-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-end justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-3xl font-bold uppercase">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0e1e33]/65">{s.text}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => order(s.title)}
                    aria-label={`Få tilbud på ${s.title}`}
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-[#0e1e33] text-white transition group-hover:bg-[#ff5a1f]"
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
      <section id="projekter" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
        <h2 className="mt-3 font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">Før og efter</h2>
        <p className="mt-3 text-[#0e1e33]/60">Træk i billedet for at se forskellen.</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={project} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <BeforeAfter before={PROJECTS[project].before} after={PROJECTS[project].after} alt={PROJECTS[project].title} className="aspect-[4/3] rounded-lg" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="space-y-3">
            {PROJECTS.map((pr, i) => (
              <button
                key={pr.title}
                type="button"
                onClick={() => setProject(i)}
                className={`flex w-full items-center gap-4 rounded-md p-3 text-left transition ${project === i ? "bg-[#0e1e33] text-white" : "bg-white hover:bg-white/60"}`}
              >
                <Img id={pr.after} w={240} alt={pr.title} className="size-20 shrink-0 rounded-xl object-cover" />
                <span>
                  <span className="block font-semibold">{pr.title}</span>
                  <span className={`mt-1 block text-sm leading-snug ${project === i ? "text-white/65" : "text-[#0e1e33]/55"}`}>{pr.text}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">Det siger kunderne</h2>
            <p className="flex items-center gap-2 text-[#0e1e33]/65">
              <span className="font-display text-3xl font-bold text-[#0e1e33]">4,9</span> <Stars className="text-[#e8952c]" /> 418 anmeldelser på Google
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REVIEWS.slice(0, 3).map((r) => (
              <figure key={r.name} className="rounded-md border border-[#0e1e33]/10 p-6">
                <Stars className="text-sm text-[#e8952c]" />
                <blockquote className="mt-3 leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm text-[#0e1e33]/60">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Area + quote */}
      <section id="omraade" className="mx-auto grid max-w-6xl scroll-mt-24 gap-12 px-5 py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <h2 className="mt-3 font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">Vi kører i hele Storkøbenhavn</h2>
          <p className="mt-3 max-w-md text-[#0e1e33]/60">Værkstedet ligger i Herlev, og vores biler er altid på vej rundt i nordvest. Tast dit postnummer:</p>
          <div className="mt-8 max-w-md">
            <AreaCheck areas={AREAS} base="Herlev" />
          </div>
          <div className="mt-10 flex items-center gap-4 rounded-md bg-white p-5">
            <Img id="1621905252507-b35492cc74b4" w={200} alt="Mester Jonas Holm" className="size-16 rounded-full object-cover" />
            <div>
              <p className="font-semibold">Jonas Holm, VVS-mester</p>
              <p className="text-sm text-[#0e1e33]/60">“Jeg ringer selv tilbage på alle forespørgsler.”</p>
            </div>
          </div>
        </div>
        <div id="tilbud" className="scroll-mt-24">
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight">Få et gratis tilbud</h2>
          <p className="mb-6 mt-2 text-[#0e1e33]/60">Udfyld på under et minut. Vi ringer dig op, typisk inden for en time.</p>
          <QuoteWizard
            key={presetKey}
            preset={preset}
            services={["Akut hjælp", "Stoppet afløb", "Nyt badeværelse", "Varme og fjernvarme", "Køkken og vand", "Andet"]}
            reply="Jonas ringer dig op inden for en time i dag. Har det travlt, så ring direkte på 12 34 56 78."
          />
        </div>
      </section>

      <footer className="bg-[#0a1626] px-5 pb-28 pt-12 text-sm text-white/55 sm:pb-12">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-bold uppercase text-white">
              Holm <span className="text-[#ff5a1f]">VVS</span>
            </p>
            <p className="mt-2">Autoriseret VVS-installatør</p>
          </div>
          <div>
            <p>Herlev Hovedgade 120, 2730 Herlev</p>
            <p>CVR 00 00 00 00 (eksempel)</p>
          </div>
          <div>
            <a href={TEL} className="block text-white">Tlf. {PHONE}</a>
            <p>Hverdage 7–16 · Døgnvagt alle dage</p>
          </div>
        </div>
      </footer>

      {/* Phone action bar */}
      <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 sm:hidden">
        <a href={TEL} className="flex items-center justify-center gap-2 rounded-full bg-[#ff5a1f] py-4 text-sm font-semibold text-white shadow-2xl">
          <Icon name="phone" className="size-4" /> Ring nu
        </a>
        <a href="#tilbud" className="flex items-center justify-center rounded-full bg-[#0e1e33] py-4 text-sm font-semibold text-white shadow-2xl">
          Få et tilbud
        </a>
      </div>
    </div>
  );
}
