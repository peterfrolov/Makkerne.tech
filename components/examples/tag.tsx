"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BeforeAfter, DemoNote, Icon, Img, Stars, photo } from "./shared";

const PHONE = "45 67 89 01";
const TEL = "tel:+4545678901";

const MENU = {
  Tag: ["Tagdækning / nyt tag", "Tagrenovering", "Tagpap", "Sedumtag", "Isolering", "Kviste", "Ovenlysvinduer"],
  Murer: ["Murerarbejde", "Badeværelse", "Flisearbejde", "Facaderenovering", "Skorsten"],
  Tømrer: ["Tømrerarbejde", "Sommerhuse", "Tilbygning", "Terrasser", "Carporte", "Gavle"],
} as const;

const TRUST = ["20 års garanti på tæthed", "Forsikret op til 10 mio. kr.", "Fast pris i tilbuddet", "2 gratis tageftersyn om året"];

const ROOFS = [
  { name: "Tegltag", id: "1557671009-600c3a1973ca", life: "60–100 år", price: "fra 1.150 kr./m²", text: "Klassisk og holdbart. Tegl ældes smukt og kræver næsten ingen vedligehold." },
  { name: "Betontagsten", id: "1610056868457-e61d6f9eeb86", life: "40–60 år", price: "fra 850 kr./m²", text: "Ligner tegl, men er billigere. Et godt valg til det klassiske parcelhus." },
  { name: "Skiffer", id: "1518736346281-76873166a64a", life: "50–80 år", price: "fra 1.050 kr./m²", text: "Stramt, mørkt og moderne udtryk. Let tag, der passer til de fleste huse." },
  { name: "Sedumtag", id: "1784397545672-3af32b683383", life: "40+ år", price: "fra 950 kr./m²", text: "Grønt tag, der optager regnvand, isolerer og giver liv til carport, skur eller tilbygning." },
];

const SERVICES = [
  { id: "1763665814538-8ba04597286c", title: "Nyt tag", text: "Komplet nyt tag med nedrivning, lægter, undertag og bortskaffelse." },
  { id: "1635424824849-1b09bdcc55b1", title: "Tagrenovering", text: "Udskiftning af beskadigede sten, rygning og inddækninger." },
  { id: "1518736346281-76873166a64a", title: "Tagpap", text: "Fladt tag i to lag pap med garanti. Til hus, garage og carport." },
  { id: "1561297331-a9c00b9c2c44", title: "Tømrerarbejde", text: "Spær, gavle, døre, vinduer og alt det andet i træ." },
  { id: "1676802011549-c3a3f5adf7a1", title: "Kviste og tilbygning", text: "Mere plads og lys. Vi klarer tegninger og byggetilladelse." },
  { id: "1504917595217-d4dc5ebe6122", title: "Murerarbejde", text: "Facader, sokler, skorstene og fugning, udført af egne murere." },
];

const WORK = [
  { title: "Nyt tegltag, Rødovre", before: "1633759593085-1eaeb724fc88", after: "1563993356056-b23a9cd265ad" },
  { title: "Tagudskiftning, Vanløse", before: "1673978482989-5eb3b350be2d", after: "1601658797866-7ae55d05a817" },
  { title: "Badeværelse, Valby", before: "1630840450974-7c7ddad8bdfe", after: "1675612703673-af71e558d827" },
];

const REVIEWS = [
  { name: "Susanne K.", town: "Rødovre", text: "Nyt tag på vores villa. Holdt tidsplanen, ryddede op hver dag og prisen var præcis som aftalt." },
  { name: "Jesper H.", town: "Vanløse", text: "De fandt en utæthed, to andre firmaer ikke kunne finde. Problemet løst på en dag." },
  { name: "Kim R.", town: "Glostrup", text: "Afbetaling uden renter gjorde, at vi kunne få nyt tag nu i stedet for om tre år." },
];

const FAQ = [
  { q: "Hvilken tagtype skal jeg vælge?", a: "Det afhænger af huset, taghældningen og budgettet. Vi kommer ud og giver en ærlig anbefaling, inden du får et tilbud." },
  { q: "Hvilken garanti får jeg?", a: "20 års garanti på tæthed og op til 30 års produktgaranti afhængigt af materialet. Alt arbejde er dækket af vores forsikring." },
  { q: "Hvad koster et nyt tag?", a: "Et typisk parcelhustag koster mellem 120.000 og 250.000 kr. alt efter størrelse og materiale. Du får altid en fast pris." },
  { q: "Kan jeg betale over tid?", a: "Ja. Vi tilbyder rentefri afbetaling uden gebyrer, så du kan sprede betalingen ud." },
  { q: "Hvor lang tid tager det?", a: "Et nyt tag på et parcelhus tager typisk 2–3 uger. Huset er lukket af hver aften, så du kan bo der imens." },
];

const FACTS = [
  ["20 år", "garanti på tæthed"],
  ["450+", "tage lagt siden 2009"],
  ["10 mio.", "kr. i forsikring"],
  ["4,9", "på Anmeld en håndværker"],
];

const TASKS = ["Nyt tag", "Tagrenovering", "Tagpap", "Sedumtag", "Isolering", "Tømrerarbejde", "Murerarbejde", "Badeværelse", "Andet"];

const INK = "text-[#1d211f]";
const MUTED = "text-[#5d655f]";
const LINE = "border-[#1d211f]/10";

/** The instalment offer, kept flat and quiet. */
function Instalment() {
  return (
    <a href="#kontakt" className={`group flex items-center gap-4 rounded-md border ${LINE} bg-white p-4 transition hover:border-[#1d211f]/30`}>
      <span className="grid size-11 shrink-0 place-items-center rounded-md bg-[#efece5] font-display text-lg font-semibold">kr.</span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">Få nyt tag på afbetaling</span>
        <span className={`block text-sm ${MUTED}`}>0 % rente og ingen gebyrer</span>
      </span>
      <Icon name="arrow" className={`size-5 shrink-0 ${MUTED} transition group-hover:translate-x-1`} />
    </a>
  );
}

function QuoteForm() {
  const [sent, setSent] = useState<string | null>(null);
  const field = `w-full rounded-md border ${LINE} bg-[#f7f5f0] px-4 py-3 text-sm outline-none transition placeholder:text-[#1d211f]/40 focus:border-[#1d211f]/50`;
  return (
    <div className={`rounded-md border ${LINE} bg-white p-6 sm:p-8`}>
      {sent ? (
        <div className="py-10 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#1d211f] text-white">
            <Icon name="check" className="size-6" />
          </span>
          <p className="mt-5 font-display text-2xl font-semibold">Tak, {sent}!</p>
          <p className={`mx-auto mt-2 max-w-xs text-sm ${MUTED}`}>Vi har modtaget din besked og ringer dig op inden for 24 timer.</p>
          <button type="button" onClick={() => setSent(null)} className={`mt-6 text-sm underline underline-offset-4 ${MUTED}`}>
            Send en ny besked
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = new FormData(e.currentTarget).get("name")?.toString() ?? "";
            setSent(name.split(" ")[0]);
          }}
          className="space-y-3"
        >
          <p className="font-display text-2xl font-semibold">Få et gratis tilbud</p>
          <p className={`pb-2 text-sm ${MUTED}`}>Vi ringer inden for 24 timer. Helt uforpligtende.</p>
          <input name="name" required placeholder="Navn" autoComplete="name" className={field} />
          <div className="grid gap-3 sm:grid-cols-2">
            <input required type="tel" placeholder="Telefon" autoComplete="tel" className={field} />
            <input required type="email" placeholder="E-mail" autoComplete="email" className={field} />
          </div>
          <select required defaultValue="" className={`${field} appearance-none`}>
            <option value="" disabled>
              Hvad skal laves?
            </option>
            {TASKS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <textarea rows={3} placeholder="Fortæl kort om opgaven" className={`${field} resize-none`} />
          <button type="submit" className="w-full rounded-md bg-[#1d211f] py-3.5 text-sm font-semibold text-white transition hover:bg-[#3a403c]">
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export function TagSite() {
  const [menu, setMenu] = useState<keyof typeof MENU | null>(null);
  const [roof, setRoof] = useState(0);
  const r = ROOFS[roof];

  return (
    <div className={`min-h-dvh overflow-x-clip bg-[#f7f5f0] font-sans ${INK}`}>
      <DemoNote className="bg-[#1d211f] text-white/60" />

      <header className={`sticky top-0 z-40 border-b ${LINE} bg-[#f7f5f0]`} onMouseLeave={() => setMenu(null)}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-5">
          <a href="#top" className="shrink-0 leading-none">
            <span className="block font-display text-xl font-bold tracking-tight">TAGVÆRK</span>
            <span className={`hidden whitespace-nowrap text-xs min-[380px]:block ${MUTED}`}>Tag, tømrer og murer</span>
          </a>
          <nav className="hidden items-center gap-1 whitespace-nowrap text-sm lg:flex">
            {(Object.keys(MENU) as (keyof typeof MENU)[]).map((k) => (
              <div key={k} className="relative" onMouseEnter={() => setMenu(k)}>
                <button type="button" onClick={() => setMenu(menu === k ? null : k)} aria-expanded={menu === k} className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-[#1d211f]/5">
                  {k}
                  <svg viewBox="0 0 24 24" className={`size-3.5 transition ${menu === k ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <AnimatePresence>
                  {menu === k && (
                    <motion.ul
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.12 }}
                      className={`absolute left-0 top-full mt-1 w-60 rounded-md border ${LINE} bg-white p-2 shadow-lg`}
                    >
                      {MENU[k].map((s) => (
                        <li key={s}>
                          <a href="#ydelser" onClick={() => setMenu(null)} className="block rounded px-3 py-2 hover:bg-[#1d211f]/5">
                            {s}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <a href="#arbejde" className="rounded-md px-3 py-2 hover:bg-[#1d211f]/5">Galleri</a>
            <a href="#om" className="rounded-md px-3 py-2 hover:bg-[#1d211f]/5">Om os</a>
            <a href="#kontakt" className="rounded-md px-3 py-2 hover:bg-[#1d211f]/5">Kontakt</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href={TEL} className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold sm:flex">
              <Icon name="phone" className="size-4" /> {PHONE}
            </a>
            <a href={TEL} aria-label={`Ring ${PHONE}`} className={`grid size-11 place-items-center rounded-md border ${LINE} sm:hidden`}>
              <Icon name="phone" className="size-4" />
            </a>
            <a href="#kontakt" className="whitespace-nowrap rounded-md bg-[#1d211f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3a403c] sm:px-5">
              Få et tilbud
            </a>
          </div>
        </div>
      </header>

      {/* Hero with the form */}
      <section id="top" className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-6 sm:pt-10 lg:grid-cols-2 lg:items-center">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element -- remote stock photo, loaded at once since it is the first thing you see */}
          <img src={photo("1726589004565-bedfba94d3a2", 1400)} alt="Tagdækker lægger nye tegl på et tag" fetchPriority="high" className="mb-8 h-44 w-full rounded-md object-cover object-[50%_35%] sm:h-56" />
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">Tagdækker og tømrer på Sjælland</h1>
          <p className={`mt-5 max-w-lg text-lg leading-relaxed ${MUTED}`}>
            Nyt tag, renovering, tilbygning og murerarbejde. Udført af faglærte folk til en fast pris, der står i tilbuddet.
          </p>
          <ul className="mt-7 grid max-w-lg gap-2.5 sm:grid-cols-2">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm">
                <Icon name="check" className="size-4 shrink-0 text-[#3d6b4f]" />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 max-w-lg">
            <Instalment />
          </div>
          <p className={`mt-6 flex items-center gap-2 text-sm ${MUTED}`}>
            <Stars className="text-[#c9a227]" /> 4,9 ud af 5 på Anmeld en håndværker · 24 anmeldelser
          </p>
        </div>
        <QuoteForm />
      </section>

      <Img id="1580642866497-dde93c97492b" w={2000} alt="Tag med kviste og nye tagsten" className="h-64 w-full object-cover sm:h-96" />

      {/* Roof chooser */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Hvilket tag passer til dit hus?</h2>
        <p className={`mt-3 max-w-xl ${MUTED}`}>Klik på en tagtype og se pris og levetid.</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="space-y-2 lg:col-span-2">
            {ROOFS.map((rf, i) => (
              <button
                key={rf.name}
                type="button"
                onClick={() => setRoof(i)}
                className={`flex w-full items-center gap-4 rounded-md border p-3 text-left transition ${roof === i ? "border-[#1d211f] bg-white" : `${LINE} hover:border-[#1d211f]/30`}`}
              >
                <Img id={rf.id} w={200} alt={rf.name} className="size-14 rounded object-cover" />
                <span className="flex-1">
                  <span className="block font-semibold">{rf.name}</span>
                  <span className={`text-sm ${MUTED}`}>Holder {rf.life}</span>
                </span>
              </button>
            ))}
          </div>
          <div className={`overflow-hidden rounded-md border ${LINE} bg-white lg:col-span-3`}>
            <Img id={r.id} w={1300} alt={r.name} className="aspect-[16/10] w-full object-cover" />
            <div className="flex flex-wrap items-start justify-between gap-4 p-6">
              <div className="max-w-md">
                <p className="font-display text-2xl font-bold">{r.name}</p>
                <p className={`mt-1 text-sm ${MUTED}`}>{r.text}</p>
              </div>
              <p className="rounded bg-[#efece5] px-3 py-1.5 text-sm font-semibold">{r.price}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="ydelser" className={`scroll-mt-24 border-y ${LINE} bg-white py-20 sm:py-24`}>
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Det laver vi</h2>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <a key={s.title} href="#kontakt" className="group">
                <Img id={s.id} w={700} alt={s.title} className="aspect-[16/10] w-full rounded-md object-cover" />
                <h3 className="mt-4 font-display text-xl font-semibold group-hover:underline">{s.title}</h3>
                <p className={`mt-1 text-sm ${MUTED}`}>{s.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Work: before / after */}
      <section id="arbejde" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-24">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Før og efter</h2>
        <p className={`mt-3 ${MUTED}`}>Træk i billederne for at se forskellen.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {WORK.map((w) => (
            <figure key={w.title}>
              <BeforeAfter before={w.before} after={w.after} alt={w.title} className="aspect-[4/5] rounded-md" />
              <figcaption className="mt-3 text-sm font-semibold">{w.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* About + facts */}
      <section id="om" className={`scroll-mt-24 border-y ${LINE} bg-[#efece5] py-20 sm:py-24`}>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Om Tagværk</h2>
            <p className={`mt-5 leading-relaxed ${MUTED}`}>
              Vi er tagdækkere, tømrere og murere under samme tag. Så har du kun én at ringe til, fra første besigtigelse til sidste lægte. Vi har lagt tage på Sjælland siden 2009.
            </p>
          </div>
          <dl className={`grid grid-cols-2 border-l border-t ${LINE}`}>
            {FACTS.map(([n, label]) => (
              <div key={label} className={`border-b border-r ${LINE} p-5`}>
                <dt className="font-display text-3xl font-bold sm:text-4xl">{n}</dt>
                <dd className={`mt-1 text-sm ${MUTED}`}>{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Det siger kunderne</h2>
          <p className={`flex items-center gap-2 text-sm ${MUTED}`}>
            <Stars className="text-[#c9a227]" /> 4,9 ud af 5 · 24 anmeldelser
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((rv) => (
            <figure key={rv.name} className={`rounded-md border ${LINE} bg-white p-6`}>
              <Stars className="text-sm text-[#c9a227]" />
              <blockquote className="mt-3 leading-relaxed">“{rv.text}”</blockquote>
              <figcaption className={`mt-4 text-sm ${MUTED}`}>
                {rv.name}, {rv.town}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pb-20 sm:pb-24">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Spørgsmål</h2>
        <div className={`mt-8 divide-y border-y ${LINE} divide-[#1d211f]/10`}>
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className={`text-xl leading-none ${MUTED} transition group-open:rotate-45`} aria-hidden>
                  +
                </span>
              </summary>
              <p className={`mt-3 text-sm leading-relaxed ${MUTED}`}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="kontakt" className={`scroll-mt-24 border-t ${LINE} bg-white py-20 sm:py-24`}>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Ring eller skriv</h2>
            <p className={`mt-4 max-w-md ${MUTED}`}>Vi kommer gratis ud og kigger på opgaven, og du får en fast pris.</p>
            <dl className="mt-8 space-y-4 text-sm">
              {[
                ["phone", "Telefon", PHONE],
                ["pin", "Adresse", "Tagstensvej 4, 2610 Rødovre"],
                ["shield", "CVR", "00 00 00 00 (eksempel)"],
              ].map(([icon, k, v]) => (
                <div key={k} className="flex items-center gap-4">
                  <span className="grid size-10 place-items-center rounded-md bg-[#efece5]">
                    <Icon name={icon as "phone"} className="size-4" />
                  </span>
                  <span>
                    <dt className={MUTED}>{k}</dt>
                    <dd className="font-semibold">{v}</dd>
                  </span>
                </div>
              ))}
            </dl>
          </div>
          <QuoteForm />
        </div>
      </section>

      <footer className={`border-t ${LINE} px-5 pb-24 pt-10 text-sm ${MUTED} sm:pb-10`}>
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 sm:flex-row">
          <p className={`font-display font-bold ${INK}`}>TAGVÆRK</p>
          <p>Tagstensvej 4, 2610 Rødovre · Tlf. {PHONE}</p>
        </div>
      </footer>

      <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 sm:hidden">
        <a href={TEL} className={`flex items-center justify-center gap-2 rounded-md border ${LINE} bg-white py-4 text-sm font-semibold shadow-lg`}>
          <Icon name="phone" className="size-4" /> Ring
        </a>
        <a href="#kontakt" className="flex items-center justify-center rounded-md bg-[#1d211f] py-4 text-sm font-semibold text-white shadow-lg">
          Få et tilbud
        </a>
      </div>
    </div>
  );
}
