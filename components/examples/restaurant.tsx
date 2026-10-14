"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Arrow, DemoNote, Img, Stars, scrollTrack } from "./shared";

const MENUS = {
  "5 retter": {
    price: "595 kr.",
    courses: [
      ["Snack", "Rugbrødschips, røget ost og syltede løg"],
      ["Hav", "Hellefisk, kærnemælk, dild og stenbiderrogn"],
      ["Mark", "Glaserede gulerødder, hasselnødder og brunt smør"],
      ["Skov", "Kalvecuvette, svampe, ramsløg og sky"],
      ["Have", "Æble, havtorn og is af gammeldags fløde"],
    ],
  },
  "7 retter": {
    price: "795 kr.",
    courses: [
      ["Snack", "Rugbrødschips, røget ost og syltede løg"],
      ["Rå", "Kammusling, agurk og peberrod"],
      ["Hav", "Hellefisk, kærnemælk, dild og stenbiderrogn"],
      ["Mark", "Glaserede gulerødder, hasselnødder og brunt smør"],
      ["Skov", "Kalvecuvette, svampe, ramsløg og sky"],
      ["Ost", "Gammel Knas, rugbrød og tyttebær"],
      ["Have", "Æble, havtorn og is af gammeldags fløde"],
    ],
  },
  Vinmenu: {
    price: "+ 450 kr.",
    courses: [
      ["Bobler", "Crémant de Loire, Domaine Huet"],
      ["Hvid", "Riesling, Mosel 2022"],
      ["Hvid", "Chablis 1er Cru, Bourgogne"],
      ["Rød", "Pinot Noir, Ahr 2021"],
      ["Sød", "Cidre de glace, Québec"],
    ],
  },
} as const;

type MenuKey = keyof typeof MENUS;

const DISHES = [
  { id: "1676471926534-d5c9771909fa", name: "Hellefisk & dild" },
  { id: "1514326640560-7d063ef2aed5", name: "Kalv & svampe" },
  { id: "1616671276441-2f2c277b8bf9", name: "Grønt fra marken" },
  { id: "1703849133132-98c23595b981", name: "Æble & havtorn" },
  { id: "1676471932681-45fa972d848a", name: "Sauce ved bordet" },
  { id: "1689672235501-6dc1e56d454c", name: "Vin til hver ret" },
];

const SLOTS = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
const DAY = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"];
const DAY_LONG = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
const MONTH = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

function Booking() {
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState(0);
  const [guests, setGuests] = useState(2);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- dates depend on the visitor's clock, so they are set after hydration
    setDays(Array.from({ length: 10 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)));
  }, []);

  // Some slots look booked, so the widget feels real. Closed Sunday and Monday.
  const closed = days[day]?.getDay() === 0 || days[day]?.getDay() === 1;
  const taken = (i: number) => (day * 5 + i * 3 + guests) % 4 === 0;

  if (done && days[day]) {
    const d = days[day];
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full border border-[#c9a46a] text-2xl text-[#c9a46a]">✓</div>
        <h3 className="mt-6 font-display text-4xl">Tak, {name || "kære gæst"}.</h3>
        <p className="mx-auto mt-3 max-w-sm text-[#ece4d6]/70">
          Vi har reserveret bord til {guests} {guests === 1 ? "person" : "personer"} {DAY_LONG[d.getDay()]} d. {d.getDate()}. {MONTH[d.getMonth()]} kl. {slot}.
          En bekræftelse er på vej.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setSlot(null);
          }}
          className="mt-8 text-sm text-[#c9a46a] underline underline-offset-4"
        >
          Lav en ny reservation
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[#ece4d6]/50">1 · Vælg dato</p>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
        {days.map((d, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setDay(i);
              setSlot(null);
            }}
            className={`w-16 shrink-0 rounded-xl border py-3 text-center transition ${
              day === i ? "border-[#c9a46a] bg-[#c9a46a] text-[#12110f]" : "border-[#ece4d6]/15 hover:border-[#ece4d6]/40"
            }`}
          >
            <span className="block text-[11px] uppercase tracking-wider opacity-70">{i === 0 ? "I dag" : DAY[d.getDay()]}</span>
            <span className="block font-display text-2xl">{d.getDate()}</span>
            <span className="block text-[11px] opacity-70">{MONTH[d.getMonth()]}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.3em] text-[#ece4d6]/50">2 · Antal gæster</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            className="grid size-10 place-items-center rounded-full border border-[#ece4d6]/20 text-lg hover:border-[#c9a46a]"
            aria-label="Færre gæster"
          >
            −
          </button>
          <span className="w-8 text-center font-display text-3xl tabular-nums">{guests}</span>
          <button
            type="button"
            onClick={() => setGuests((g) => Math.min(10, g + 1))}
            className="grid size-10 place-items-center rounded-full border border-[#ece4d6]/20 text-lg hover:border-[#c9a46a]"
            aria-label="Flere gæster"
          >
            +
          </button>
        </div>
      </div>

      <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#ece4d6]/50">3 · Vælg tidspunkt</p>
      {closed ? (
        <p className="mt-3 rounded-xl border border-[#ece4d6]/10 p-4 text-sm text-[#ece4d6]/60">Vi holder lukket søndag og mandag. Vælg en anden dag.</p>
      ) : (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {SLOTS.map((s, i) => (
            <button
              key={s}
              type="button"
              disabled={taken(i)}
              onClick={() => setSlot(s)}
              className={`rounded-xl border py-2.5 text-sm tabular-nums transition disabled:cursor-not-allowed disabled:opacity-25 disabled:line-through ${
                slot === s ? "border-[#c9a46a] bg-[#c9a46a] text-[#12110f]" : "border-[#ece4d6]/15 hover:border-[#ece4d6]/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {slot && !closed && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dit navn"
                className="min-w-0 flex-1 rounded-full border border-[#ece4d6]/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-[#ece4d6]/40 focus:border-[#c9a46a]"
              />
              <button type="submit" className="rounded-full bg-[#c9a46a] px-7 py-3 text-sm font-semibold text-[#12110f] transition hover:bg-[#d8b77f]">
                Bekræft kl. {slot}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function RestaurantSite() {
  const [menu, setMenu] = useState<MenuKey>("5 retter");
  const track = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 800], [1.05, 1.2]);

  return (
    <div className="min-h-dvh overflow-x-clip bg-[#12110f] font-sans text-[#ece4d6]">
      <DemoNote className="bg-[#0a0908] text-[#ece4d6]/50" />

      <header className="absolute inset-x-0 top-8 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a href="#top" className="font-display text-3xl tracking-wide">
            Lyng
          </a>
          <nav className="hidden items-center gap-9 text-sm tracking-wide text-[#ece4d6]/80 md:flex">
            <a href="#menu" className="hover:text-[#c9a46a]">Menu</a>
            <a href="#selskaber" className="hover:text-[#c9a46a]">Selskaber</a>
            <a href="#gavekort" className="hover:text-[#c9a46a]">Gavekort</a>
          </nav>
          <a href="#book" className="rounded-full border border-[#c9a46a] px-5 py-2.5 text-sm text-[#c9a46a] transition hover:bg-[#c9a46a] hover:text-[#12110f]">
            Book bord
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative h-[100svh] min-h-[620px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <Img id="1709548145082-04d0cde481d4" w={2200} alt="Restaurant Lyng om aftenen" className="size-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#12110f]/60 via-[#12110f]/30 to-[#12110f]" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-5 text-center">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.8em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.4 }}
            className="text-xs uppercase text-[#c9a46a]"
          >
            Frederiksberg · Siden 2017
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 max-w-4xl text-balance font-display text-6xl font-light leading-[0.95] sm:text-8xl"
          >
            Nordisk mad, <em className="text-[#c9a46a]">sæsonens</em> bedste.
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#book" className="rounded-full bg-[#c9a46a] px-8 py-4 text-sm font-semibold text-[#12110f] transition hover:bg-[#d8b77f]">
              Book et bord
            </a>
            <a href="#menu" className="rounded-full border border-[#ece4d6]/30 px-8 py-4 text-sm transition hover:bg-[#ece4d6]/10">
              Se ugens menu
            </a>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-[#c9a46a] to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 sm:py-36 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c9a46a]">Køkkenet</p>
          <h2 className="mt-4 font-display text-5xl font-light leading-tight sm:text-6xl">
            Fra mark og hav <em>til bordet</em> på samme dag.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[#ece4d6]/65">
            Vi køber ind hos små producenter på Sjælland og laver menuen om hver uge. Det, der er bedst lige nu, kommer på tallerkenen.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[3/4] overflow-hidden rounded-t-full"
          >
            <Img id="1663530761401-15eefb544889" w={800} alt="Kokken hælder sauce" className="size-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="aspect-[3/4] overflow-hidden rounded-b-full"
          >
            <Img id="1615763966401-c7003179a98c" w={800} alt="Vinglas på bordet" className="size-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="border-y border-[#ece4d6]/10 bg-[#1a1815] py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c9a46a]">Uge 42</p>
          <h2 className="mt-4 font-display text-5xl font-light sm:text-6xl">Ugens menu</h2>
          <div className="mx-auto mt-10 inline-flex rounded-full border border-[#ece4d6]/15 p-1">
            {(Object.keys(MENUS) as MenuKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setMenu(k)}
                className={`relative rounded-full px-5 py-2 text-sm transition sm:px-7 ${menu === k ? "text-[#12110f]" : "text-[#ece4d6]/70 hover:text-[#ece4d6]"}`}
              >
                {menu === k && <motion.span layoutId="lyng-menu" className="absolute inset-0 rounded-full bg-[#c9a46a]" />}
                <span className="relative">{k}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={menu} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}>
              <ol className="mt-14 space-y-8">
                {MENUS[menu].courses.map(([course, desc], i) => (
                  <li key={i}>
                    <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9a46a]">{course}</p>
                    <p className="mt-2 font-display text-2xl font-light sm:text-3xl">{desc}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-14 font-display text-4xl text-[#c9a46a]">{MENUS[menu].price}</p>
              <p className="mt-2 text-sm text-[#ece4d6]/50">{menu === "Vinmenu" ? "Til 5 retter. Alkoholfri parring 295 kr." : "pr. person · vegetarisk mulig"}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Dish slider */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-5">
          <h2 className="font-display text-5xl font-light sm:text-6xl">
            Fra <em className="text-[#c9a46a]">køkkenet</em>
          </h2>
          <div className="flex gap-2">
            <Arrow dir="left" onClick={() => scrollTrack(track, -1)} className="border-[#ece4d6]/20 hover:border-[#c9a46a] hover:text-[#c9a46a]" />
            <Arrow dir="right" onClick={() => scrollTrack(track, 1)} className="border-[#ece4d6]/20 hover:border-[#c9a46a] hover:text-[#c9a46a]" />
          </div>
        </div>
        <div
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 [scrollbar-width:none] sm:px-[max(1.25rem,calc((100vw_-_72rem)/2_+_1.25rem))] [&::-webkit-scrollbar]:hidden"
        >
          {DISHES.map((d, i) => (
            <figure key={d.id} className="group w-[78vw] max-w-[380px] shrink-0 snap-start">
              <div className="aspect-[4/5] overflow-hidden">
                <Img id={d.id} w={800} alt={d.name} className="size-full object-cover grayscale-[30%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              </div>
              <figcaption className="mt-4 flex items-baseline gap-3">
                <span className="text-xs tabular-nums text-[#c9a46a]">0{i + 1}</span>
                <span className="font-display text-2xl">{d.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Chef */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden">
            <Img id="1785413319364-0578f9574c5d" w={1000} alt="Kokken anretter" className="size-full object-cover" />
          </div>
          <blockquote>
            <p className="font-display text-4xl font-light leading-tight sm:text-5xl">
              “Den bedste ret er den, hvor råvaren får lov at være <em className="text-[#c9a46a]">sig selv</em>.”
            </p>
            <footer className="mt-8 text-sm uppercase tracking-[0.3em] text-[#ece4d6]/60">Jonas Lyng · Køkkenchef</footer>
            <div className="mt-10 flex items-center gap-4 border-t border-[#ece4d6]/10 pt-8">
              <Stars className="text-[#c9a46a]" />
              <span className="text-sm text-[#ece4d6]/60">“Et af Frederiksbergs mest oversete steder.” · Madanmelder</span>
            </div>
          </blockquote>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="px-5 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-[#ece4d6]/10 bg-[#1a1815] lg:grid-cols-5">
          <div className="relative hidden lg:col-span-2 lg:block">
            <Img id="1680209668065-26985bc92268" w={900} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] to-transparent" />
            <div className="absolute bottom-0 p-10">
              <p className="font-display text-3xl">Tir–lør fra 17.30</p>
              <p className="mt-2 text-sm text-[#ece4d6]/60">Gammel Kongevej 100, Frederiksberg</p>
            </div>
          </div>
          <div className="p-6 sm:p-12 lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.35em] text-[#c9a46a]">Reservation</p>
            <h2 className="mb-10 mt-3 font-display text-5xl font-light">Book et bord</h2>
            <Booking />
          </div>
        </div>
      </section>

      {/* Events + gift card */}
      <section id="selskaber" className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { id: "1723401502523-47a7c0ac744f", title: "Selskaber", text: "Privat stue til op til 24 gæster. Vi skræddersyr menuen." },
            { id: "1611765083444-a3ce30f1c885", title: "Vinaftener", text: "Første torsdag i måneden. 4 retter og 4 glas med vinbonden." },
            { id: "1552960226-639240203497", title: "Firmafrokost", text: "Lukket frokost for hele teamet, tirsdag til fredag." },
          ].map((e) => (
            <a key={e.title} href="#book" className="group relative block aspect-[3/4] overflow-hidden">
              <Img id={e.id} w={700} alt={e.title} className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12110f] via-[#12110f]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-display text-3xl">{e.title}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm text-[#ece4d6]/70 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">{e.text}</p>
                <span className="mt-3 inline-block text-xs uppercase tracking-[0.3em] text-[#c9a46a]">Læs mere →</span>
              </div>
            </a>
          ))}
        </div>

        <div id="gavekort" className="mt-6 flex flex-col items-start justify-between gap-6 border border-[#c9a46a]/30 p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <h3 className="font-display text-4xl font-light">Giv en aften på Lyng</h3>
            <p className="mt-2 text-[#ece4d6]/60">Gavekort fra 500 kr. Sendes på mail med det samme.</p>
          </div>
          <a href="#book" className="rounded-full bg-[#c9a46a] px-7 py-3.5 text-sm font-semibold text-[#12110f] transition hover:bg-[#d8b77f]">
            Køb gavekort
          </a>
        </div>
      </section>

      <footer className="border-t border-[#ece4d6]/10 px-5 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 text-sm text-[#ece4d6]/60 sm:grid-cols-3">
          <div>
            <p className="font-display text-3xl text-[#ece4d6]">Lyng</p>
            <p className="mt-2">Gammel Kongevej 100 · 1850 Frederiksberg</p>
          </div>
          <div>
            <p className="text-[#ece4d6]">Åbningstider</p>
            <p className="mt-2">Tirsdag–lørdag 17.30–24.00</p>
            <p>Søndag–mandag lukket</p>
          </div>
          <div>
            <p className="text-[#ece4d6]">Kontakt</p>
            <p className="mt-2">bord@lyng.dk · 33 22 11 00</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
