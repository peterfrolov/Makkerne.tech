"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { BeforeAfter, DemoNote, Icon, Img, Stars } from "./shared";

const PHONE = "45 67 89 01";
const TEL = "tel:+4545678901";

const MENU = {
  Tag: ["Tagdækning / nyt tag", "Tagrenovering", "Tagpap", "Sedumtag", "Isolering", "Kviste", "Ovenlysvinduer"],
  Murer: ["Murerarbejde", "Badeværelse", "Flisearbejde", "Facaderenovering", "Skorsten"],
  Tømrer: ["Tømrerarbejde", "Sommerhuse", "Tilbygning", "Terrasser", "Carporte", "Gavle"],
} as const;

const TRUST = ["20 års garanti på tæthed", "Forsikret op til 10 mio. kr.", "Fast pris i tilbuddet", "2 gratis tageftersyn om året"];

const ROOFS = [
  { name: "Tegltag", id: "1528223871781-8f4c984f6164", life: "60–100 år", price: "fra 1.150 kr./m²", text: "Klassisk og holdbart. Tegl ældes smukt og kræver næsten ingen vedligehold." },
  { name: "Betontagsten", id: "1610056868457-e61d6f9eeb86", life: "40–60 år", price: "fra 850 kr./m²", text: "Ligner tegl, men er billigere. Et godt valg til det klassiske parcelhus." },
  { name: "Skiffer", id: "1518736346281-76873166a64a", life: "50–80 år", price: "fra 1.050 kr./m²", text: "Stramt, mørkt og moderne udtryk. Let tag, der passer til de fleste huse." },
  { name: "Sedumtag", id: "1784397545672-3af32b683383", life: "40+ år", price: "fra 950 kr./m²", text: "Grønt tag, der optager regnvand, isolerer og giver liv til carport, skur eller tilbygning." },
];

const SERVICES = [
  { id: "1605450099279-533bd3ce379a", title: "Tagdækning / nyt tag", text: "Komplet nyt tag med nedrivning, lægter, undertag og bortskaffelse." },
  { id: "1635424824849-1b09bdcc55b1", title: "Tagrenovering", text: "Udskiftning af beskadigede sten, rygning og inddækninger." },
  { id: "1518736346281-76873166a64a", title: "Tagpap", text: "Fladt tag i to lag pap med garanti. Til hus, garage og carport." },
  { id: "1561297331-a9c00b9c2c44", title: "Tømrerarbejde", text: "Spær, gavle, døre, vinduer og alt det andet i træ." },
  { id: "1676802011549-c3a3f5adf7a1", title: "Kviste og tilbygning", text: "Mere plads og lys. Vi klarer tegninger og byggetilladelse." },
  { id: "1570793005386-840846445fed", title: "Sommerhuse", text: "Nyt tag, ny beklædning eller hele sommerhuset sat i stand." },
  { id: "1504917595217-d4dc5ebe6122", title: "Murerarbejde", text: "Facader, sokler, skorstene og fugning, udført af egne murere." },
  { id: "1638799869566-b17fa794c4de", title: "Badeværelse", text: "Nyt bad fra bunden med vådrumssikring, fald og fliser." },
  { id: "1781445781804-dff17e05bd53", title: "Flisearbejde", text: "Fliser på gulv og væg, i bad, køkken og bryggers." },
];

const SPECIALS = ["Sedumtag", "Isolering", "Energiløsninger", "Klikfals", "Ståltag", "Eternittag", "Skiffereternit", "Tegltag", "Lertegl", "Betontegl", "Skiffertag", "Naturskiffer", "Zinktag", "Kobbertag", "Asbestsanering", "Tilbygning", "Gavle", "Ovenlysvinduer", "Byggesagkyndig"];

const WORK = [
  { title: "Nyt tegltag, Rødovre", before: "1633759593085-1eaeb724fc88", after: "1563993356056-b23a9cd265ad" },
  { title: "Tagudskiftning, Vanløse", before: "1673978482989-5eb3b350be2d", after: "1601658797866-7ae55d05a817" },
  { title: "Badeværelse, Valby", before: "1630840450974-7c7ddad8bdfe", after: "1675612703673-af71e558d827" },
];

const MORE = ["1635424709961-f3a150459ad4", "1643225523483-e2c434191bba", "1763665814538-8ba04597286c", "1614418583513-8e96d9160333", "1635424710928-0544e8512eae", "1508167290553-87a67eca5bf5"];

const REVIEWS = [
  { name: "Susanne K.", town: "Rødovre", date: "2. okt. 2026", text: "Nyt tag på vores villa. Holdt tidsplanen, ryddede op hver dag og prisen var præcis som aftalt." },
  { name: "Michael B.", town: "Brønshøj", date: "18. sep. 2026", text: "Hurtig besigtigelse og et tilbud, der var til at forstå. Flinke folk på taget." },
  { name: "Lone og Per", town: "Herlev", date: "30. aug. 2026", text: "Fik lavet sedumtag på carporten. Flot arbejde og god rådgivning om valg af tag." },
  { name: "Jesper H.", town: "Vanløse", date: "12. aug. 2026", text: "De fandt en utæthed, to andre firmaer ikke kunne finde. Problemet løst på en dag." },
  { name: "Fatima A.", town: "Valby", date: "29. jul. 2026", text: "Nyt badeværelse bygget af murer. Flot flisearbejde og helt tæt. Kan anbefales." },
  { name: "Kim R.", town: "Glostrup", date: "3. jul. 2026", text: "Afbetaling uden renter gjorde, at vi kunne få nyt tag nu i stedet for om tre år." },
];

const FAQ = [
  { q: "Hvilken tagtype skal jeg vælge?", a: "Det afhænger af huset, taghældningen og budgettet. Vi kommer ud og giver en ærlig anbefaling, inden du får et tilbud." },
  { q: "Hvilken garanti får jeg?", a: "20 års garanti på tæthed og op til 30 års produktgaranti afhængigt af materialet. Alt arbejde er dækket af vores forsikring." },
  { q: "Hvad koster et nyt tag?", a: "Et typisk parcelhustag koster mellem 120.000 og 250.000 kr. alt efter størrelse og materiale. Du får altid en fast pris." },
  { q: "Kan jeg betale over tid?", a: "Ja. Vi tilbyder rentefri afbetaling uden gebyrer, så du kan sprede betalingen ud." },
  { q: "Skal mit tag efterisoleres?", a: "Er dit hus fra før 1980, er der ofte meget at hente. Vi måler og regner besparelsen ud, når vi besigtiger taget." },
  { q: "Hvor lang tid tager det?", a: "Et nyt tag på et parcelhus tager typisk 2–3 uger. Huset er lukket af hver aften, så du kan bo der imens." },
];

const STATS = [
  { n: 20, suffix: " år", label: "garanti på tæthed" },
  { n: 10, suffix: " mio.", label: "kr. i forsikring" },
  { n: 450, suffix: "+", label: "tage lagt" },
  { n: 30, suffix: " år", label: "produktgaranti" },
];

const TASKS = ["Tagdækning / nyt tag", "Tagrenovering", "Tagpap", "Sedumtag", "Isolering", "Tømrerarbejde", "Murerarbejde", "Badeværelse", "Andet"];

function Counter({ n, suffix }: { n: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setV(Math.round(n * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, n]);
  return (
    <span ref={ref} className="tabular-nums">
      {v}
      {suffix}
    </span>
  );
}

/** The instalment offer, kept flat and quiet. */
function Instalment() {
  return (
    <a href="#kontakt" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20">
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#e8e4da] font-display text-lg font-semibold text-[#141716]">kr.</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#a9b3ab]">Nyt tilbud · 0% rente</span>
        <span className="block font-display text-lg font-semibold text-white">Få nyt tag på afbetaling</span>
        <span className="block text-sm text-[#a9b3ab]">Spred betalingen ud, uden renter og gebyrer</span>
      </span>
      <Icon name="arrow" className="size-5 shrink-0 text-[#a9b3ab] transition group-hover:translate-x-1" />
    </a>
  );
}

function QuoteForm() {
  const [sent, setSent] = useState<string | null>(null);
  const field = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#8fb39a]";
  return (
    <div className="rounded-3xl border border-white/10 bg-[#181c1a] p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#8fb39a] text-[#141716]">
              <Icon name="check" className="size-7" />
            </span>
            <p className="mt-5 font-display text-2xl font-semibold">Tak, {sent}!</p>
            <p className="mx-auto mt-2 max-w-xs text-sm text-[#a9b3ab]">Vi har modtaget din besked og vender tilbage inden for 24 timer.</p>
            <button type="button" onClick={() => setSent(null)} className="mt-6 text-sm text-[#a9b3ab] underline underline-offset-4">
              Send en ny besked
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={(e) => {
              e.preventDefault();
              const name = new FormData(e.currentTarget).get("name")?.toString() ?? "";
              setSent(name.split(" ")[0]);
            }}
            className="space-y-3"
          >
            <p className="font-display text-2xl font-semibold">Indhent gratis tilbud</p>
            <p className="pb-2 text-sm text-[#a9b3ab]">Svar inden for 24 timer. Helt uforpligtende.</p>
            <input name="name" required placeholder="Navn" autoComplete="name" className={field} />
            <div className="grid gap-3 sm:grid-cols-2">
              <input required type="tel" placeholder="Telefon" autoComplete="tel" className={field} />
              <input required type="email" placeholder="E-mail" autoComplete="email" className={field} />
            </div>
            <select required defaultValue="" className={`${field} appearance-none`}>
              <option value="" disabled>
                Vælg opgavetype
              </option>
              {TASKS.map((t) => (
                <option key={t} className="bg-[#181c1a]">
                  {t}
                </option>
              ))}
            </select>
            <textarea rows={3} placeholder="Beskriv din opgave" className={`${field} resize-none`} />
            <button type="submit" className="w-full rounded-xl bg-[#e8e4da] py-3.5 text-sm font-semibold text-[#141716] transition hover:bg-white">
              Send besked
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TagSite() {
  const [menu, setMenu] = useState<keyof typeof MENU | null>(null);
  const [roof, setRoof] = useState(0);
  const [more, setMore] = useState(false);
  const r = ROOFS[roof];

  return (
    <div className="min-h-dvh overflow-x-clip bg-[#111413] font-sans text-[#e9ece9]">
      <DemoNote className="bg-black text-white/45" />

      <div className="border-b border-white/5 bg-[#151917] px-5 py-2.5 text-center text-xs text-[#a9b3ab]">
        <Stars className="mr-2 text-[#d9c58c]" /> 4,9 ud af 5 på Anmeld en håndværker · Gratis tilbud på alle opgaver
      </div>

      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#111413]/90 backdrop-blur-md" onMouseLeave={() => setMenu(null)}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="leading-none">
            <span className="block font-display text-xl font-bold tracking-tight">TAGVÆRK</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.3em] text-[#a9b3ab]">Tag &amp; Tømrer</span>
          </a>
          <nav className="hidden items-center gap-1 text-sm lg:flex">
            {(Object.keys(MENU) as (keyof typeof MENU)[]).map((k) => (
              <div key={k} className="relative" onMouseEnter={() => setMenu(k)}>
                <button type="button" onClick={() => setMenu(menu === k ? null : k)} aria-expanded={menu === k} className="flex items-center gap-1 rounded-lg px-3 py-2 hover:bg-white/5">
                  {k}
                  <svg viewBox="0 0 24 24" className={`size-3.5 transition ${menu === k ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <AnimatePresence>
                  {menu === k && (
                    <motion.ul
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-1 w-60 rounded-2xl border border-white/10 bg-[#181c1a] p-2 shadow-2xl"
                    >
                      {MENU[k].map((s) => (
                        <li key={s}>
                          <a href="#ydelser" onClick={() => setMenu(null)} className="block rounded-lg px-3 py-2 text-[#c9d0cb] hover:bg-white/5 hover:text-white">
                            {s}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <a href="#arbejde" className="rounded-lg px-3 py-2 hover:bg-white/5">Galleri</a>
            <a href="#om" className="rounded-lg px-3 py-2 hover:bg-white/5">Om os</a>
            <a href="#kontakt" className="rounded-lg px-3 py-2 hover:bg-white/5">Kontakt</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={TEL} aria-label={`Ring ${PHONE}`} className="grid size-10 place-items-center rounded-xl border border-white/10 lg:hidden">
              <Icon name="phone" className="size-4" />
            </a>
            <a href="#kontakt" className="rounded-xl bg-[#e8e4da] px-5 py-2.5 text-sm font-semibold text-[#141716] transition hover:bg-white">
              Indhent tilbud
            </a>
          </div>
        </div>
      </header>

      {/* Hero with the form */}
      <section id="top" className="relative overflow-hidden">
        <Img id="1635424709961-f3a150459ad4" w={2000} alt="Tagdækkere i gang med et tag" className="absolute inset-0 size-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111413]/40 via-[#111413]/80 to-[#111413]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-14 sm:pt-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a9b3ab]">Hele Sjælland</p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
              Tagdækker &amp; Tømrer
            </motion.h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#c9d0cb]">
              Din lokale entreprenør til både tag og tømrer på Sjælland. Nyt tag, renovering, tilbygning og murerarbejde, udført af faglærte folk med fast pris.
            </p>
            <div className="mt-8 max-w-lg">
              <Instalment />
            </div>
            <ul className="mt-8 grid max-w-lg gap-3 sm:grid-cols-2">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10">
                    <Icon name="check" className="size-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={TEL} className="flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold transition hover:bg-white/5">
                <Icon name="phone" className="size-4" /> Ring til os
              </a>
              <a href="#kontakt" className="rounded-xl bg-[#e8e4da] px-6 py-3.5 text-sm font-semibold text-[#141716] transition hover:bg-white">
                Indhent tilbud
              </a>
              <span className="ml-1 flex items-center gap-2 text-sm text-[#a9b3ab]">
                <Stars className="text-[#d9c58c]" /> 4,9/5 · 24 anmeldelser
              </span>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      {/* Materials marquee */}
      <div className="overflow-hidden border-y border-white/5 py-5">
        <motion.div className="flex w-max gap-10 whitespace-nowrap text-sm uppercase tracking-[0.25em] text-[#7f8a83]" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-10">
              {["Tegltag", "Skiffer", "Tagpap", "Sedumtag", "Zink", "Kviste", "Isolering", "Tilbygning", "Badeværelse", "Facader"].map((w) => (
                <span key={w}>{w} ·</span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Roof chooser */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8fb39a]">Prøv det selv</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Hvordan ser dit nye tag ud?</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="space-y-2 lg:col-span-2">
            {ROOFS.map((rf, i) => (
              <button
                key={rf.name}
                type="button"
                onClick={() => setRoof(i)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition ${roof === i ? "border-white/25 bg-white/[0.06]" : "border-white/5 hover:border-white/15"}`}
              >
                <Img id={rf.id} w={200} alt={rf.name} className="size-14 rounded-xl object-cover" />
                <span className="flex-1">
                  <span className="block font-semibold">{rf.name}</span>
                  <span className="text-sm text-[#a9b3ab]">Holder {rf.life}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-3">
            <AnimatePresence initial={false}>
              <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                <Img id={r.id} w={1300} alt={r.name} className="size-full object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6 pt-20">
              <p className="font-display text-3xl font-bold">{r.name}</p>
              <p className="mt-1 max-w-md text-sm text-white/75">{r.text}</p>
              <p className="mt-3 inline-flex rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold backdrop-blur">{r.price}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About + stats */}
      <section id="om" className="scroll-mt-24 border-y border-white/5 bg-[#151917] py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8fb39a]">Om os</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Hvem er vi?</h2>
            <p className="mt-6 leading-relaxed text-[#c9d0cb]">
              Drømmer du om et tag eller en tilbygning, der både er holdbart og udført med fagligt håndværk? Vi er tagdækkere, tømrere og murere under samme tag, så du kun har én at ringe til, fra første besigtigelse til sidste lægte.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#kontakt" className="rounded-xl bg-[#e8e4da] px-6 py-3 text-sm font-semibold text-[#141716]">Kontakt ›</a>
              <a href="#ydelser" className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold">Se ydelser →</a>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/8 bg-[#111413] p-6">
                <dt className="font-display text-4xl font-bold sm:text-5xl">
                  <Counter n={s.n} suffix={s.suffix} />
                </dt>
                <dd className="mt-2 text-sm text-[#a9b3ab]">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section id="ydelser" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8fb39a]">Ydelser</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Alle vores ydelser</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <a key={s.title} href="#kontakt" className="group overflow-hidden rounded-2xl border border-white/8 bg-[#151917] transition hover:border-white/20">
              <div className="aspect-[16/10] overflow-hidden">
                <Img id={s.id} w={700} alt={s.title} className="size-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-[#a9b3ab]">{s.text}</p>
                <p className="mt-3 text-sm font-semibold">Læs mere ›</p>
              </div>
            </a>
          ))}
        </div>
        <h3 className="mt-16 font-display text-2xl font-semibold">Flere specialer</h3>
        <ul className="mt-5 flex flex-wrap gap-2">
          {SPECIALS.map((s) => (
            <li key={s} className="rounded-full border border-white/10 px-4 py-2 text-sm text-[#c9d0cb]">
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Work: before / after */}
      <section id="arbejde" className="scroll-mt-24 border-t border-white/5 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8fb39a]">Galleri</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Vores arbejde</h2>
          <p className="mt-3 text-[#a9b3ab]">Træk i billederne for at se før og efter.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {WORK.map((w) => (
              <figure key={w.title}>
                <BeforeAfter before={w.before} after={w.after} alt={w.title} className="aspect-[4/5] rounded-2xl" />
                <figcaption className="mt-3 text-sm font-semibold">{w.title}</figcaption>
              </figure>
            ))}
          </div>
          <AnimatePresence>
            {more && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="grid grid-cols-2 gap-4 pt-5 md:grid-cols-3">
                  {MORE.map((id) => (
                    <Img key={id} id={id} w={700} alt="Tagopgave" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button type="button" onClick={() => setMore((m) => !m)} className="mt-8 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold transition hover:bg-white/5">
            {more ? "Se færre billeder" : "Se flere billeder"}
          </button>
        </div>
      </section>

      {/* Bathrooms */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:py-28 lg:grid-cols-2">
        <Img id="1638799869566-b17fa794c4de" w={1100} alt="Nyt badeværelse med walk-in bruser" className="aspect-[4/3] w-full rounded-3xl object-cover" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8fb39a]">Badeværelser på Sjælland</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Nyt badeværelse bygget af murer</h2>
          <p className="mt-5 leading-relaxed text-[#c9d0cb]">Et badeværelse skal være tæt i mange år. Vores murere står for vådrumssikring, fald mod afløb og fliser, så det hele er gjort rigtigt fra bunden.</p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {["Vådrumssikring", "Korrekt fald mod afløb", "Fliser på gulv og væg", "Hel eller delvis renovering", "Fast pris"].map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm">
                <Icon name="check" className="size-4 text-[#8fb39a]" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-y border-white/5 bg-[#151917] py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8fb39a]">Anmeldelser</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Det siger kunderne</h2>
            </div>
            <p className="flex items-center gap-2 text-sm text-[#a9b3ab]">
              <span className="font-display text-3xl font-bold text-white">4,9</span> <Stars className="text-[#d9c58c]" /> 24 anmeldelser
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((rv) => (
              <figure key={rv.name} className="rounded-2xl border border-white/8 bg-[#111413] p-6">
                <div className="flex items-center justify-between">
                  <Stars className="text-sm text-[#d9c58c]" />
                  <span className="flex items-center gap-1 text-[11px] text-[#a9b3ab]">
                    <Icon name="shield" className="size-3.5" /> Verificeret kunde
                  </span>
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-[#dfe4e0]">“{rv.text}”</blockquote>
                <figcaption className="mt-4 text-xs text-[#a9b3ab]">
                  <span className="font-semibold text-white">{rv.name}</span> · {rv.town} · {rv.date}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:py-28">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#8fb39a]">Ofte stillede spørgsmål</p>
        <h2 className="mt-3 text-center font-display text-4xl font-bold tracking-tight sm:text-5xl">Find svar her</h2>
        <div className="mt-10 divide-y divide-white/8 border-y border-white/8">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/15 text-[#a9b3ab] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[#a9b3ab]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="kontakt" className="scroll-mt-24 border-t border-white/5 bg-[#151917] py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Klar til at komme i gang?</h2>
            <p className="mt-4 max-w-md text-[#c9d0cb]">Gratis tilbud, svar inden for 24 timer og rentefri afbetaling.</p>
            <dl className="mt-8 space-y-4 text-sm">
              {[
                ["phone", "Telefon", PHONE],
                ["pin", "Adresse", "Tagstensvej 4, 2610 Rødovre"],
                ["shield", "CVR", "00 00 00 00 (eksempel)"],
              ].map(([icon, k, v]) => (
                <div key={k} className="flex items-center gap-4">
                  <span className="grid size-10 place-items-center rounded-xl bg-white/5">
                    <Icon name={icon as "phone"} className="size-4" />
                  </span>
                  <span>
                    <dt className="text-[#a9b3ab]">{k}</dt>
                    <dd className="font-semibold">{v}</dd>
                  </span>
                </div>
              ))}
            </dl>
            <div className="mt-8 max-w-md">
              <Instalment />
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <footer className="px-5 pb-24 pt-10 text-sm text-[#7f8a83] sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 sm:flex-row">
          <p className="font-display font-bold text-white">TAGVÆRK · Tag &amp; Tømrer</p>
          <p>Tagstensvej 4, 2610 Rødovre · Tlf. {PHONE}</p>
        </div>
      </footer>

      <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 sm:hidden">
        <a href={TEL} className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#111413] py-4 text-sm font-semibold shadow-2xl">
          <Icon name="phone" className="size-4" /> Ring
        </a>
        <a href="#kontakt" className="flex items-center justify-center rounded-xl bg-[#e8e4da] py-4 text-sm font-semibold text-[#141716] shadow-2xl">
          Indhent tilbud
        </a>
      </div>
    </div>
  );
}
