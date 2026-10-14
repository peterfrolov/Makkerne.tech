"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, DemoNote, Img, Stars, useOpenNow, useSlider, scrollTrack, type Hours } from "./shared";

const HOURS: Hours = [
  { day: "Mandag", open: "07:30", close: "17:00" },
  { day: "Tirsdag", open: "07:30", close: "17:00" },
  { day: "Onsdag", open: "07:30", close: "17:00" },
  { day: "Torsdag", open: "07:30", close: "18:00" },
  { day: "Fredag", open: "07:30", close: "18:00" },
  { day: "Lørdag", open: "09:00", close: "17:00" },
  { day: "Søndag", open: "09:00", close: "16:00" },
];

const SLIDES = [
  { id: "1521017432531-fbd92d768814", title: "Kaffe, kanelsnegle og god tid.", text: "Lille café på Nørrebro med specialkaffe og bagværk, der kommer ud af ovnen hver morgen kl. 7." },
  { id: "1693407839053-04089e33b60d", title: "Friskbagt. Hver eneste morgen.", text: "Vores kanelsnegle er rullet i hånden med brunt smør og masser af kardemomme." },
  { id: "1559001724-fbad036dbc9e", title: "Kaffe, vi selv ville køre efter.", text: "Lyst ristede bønner fra små danske risterier, brygget med omhu." },
];

const MENU = {
  Kaffe: {
    img: "1507133750040-4a8f57021571",
    items: [
      ["Espresso", "Dobbelt shot, husets blend", "32"],
      ["Cortado", "Espresso med lidt skummet mælk", "38"],
      ["Cappuccino", "Med havre- eller sødmælk", "44"],
      ["Flat white", "Dobbelt ristretto, silkemælk", "46"],
      ["Filterkaffe", "Dagens bønne, fri genopfyldning", "35"],
      ["Chai latte", "Hjemmelavet krydderisirup", "48"],
    ],
  },
  Bagværk: {
    img: "1686207855146-c3ffe2166d40",
    items: [
      ["Kanelsnegl", "Husets klassiker med brunt smør", "35"],
      ["Kardemommebolle", "Lun fra ovnen", "35"],
      ["Croissant", "Lagdelt med fransk smør", "30"],
      ["Surdejsbolle", "Med smør og ost", "38"],
      ["Chokoladecookie", "Sprød kant, blød midte", "28"],
      ["Dagens kage", "Spørg ved disken", "45"],
    ],
  },
  Brunch: {
    img: "1504382262782-5b4ece78642b",
    items: [
      ["Kanel-brunch", "Æg, bacon, ost, yoghurt, snegl og juice", "149"],
      ["Avocadomad", "Surdejsbrød, avocado, chili og citron", "95"],
      ["Grød", "Havregrød med æble, nødder og karamel", "69"],
      ["Æg på toast", "Blødkogte æg, purløg og rugbrød", "79"],
      ["Yoghurtskål", "Granola, bær og honning", "65"],
    ],
  },
  Drikke: {
    img: "1598146635303-dd566d5e3ac2",
    items: [
      ["Iskaffe", "Kold brygget, med eller uden mælk", "45"],
      ["Hjemmelavet lemonade", "Citron, mynte og ingefær", "42"],
      ["Varm kakao", "Med flødeskum og kanel", "45"],
      ["Frisk juice", "Æble, appelsin eller gulerod", "39"],
      ["Te", "Økologisk løs te", "32"],
    ],
  },
} as const;

type Tab = keyof typeof MENU;

const COUNTER = [
  { id: "1649308401368-a68b77116605", name: "Kanelsnegl", price: "35 kr." },
  { id: "1593872423141-bb230bd352c6", name: "Havrecookies", price: "28 kr." },
  { id: "1633204339691-9d3645430e14", name: "Dagens kage", price: "45 kr." },
  { id: "1593872571314-4a735d4b27b0", name: "Surdejsbrød", price: "55 kr." },
  { id: "1560055932-595dab110124", name: "Croissant", price: "30 kr." },
  { id: "1612783191467-e7cd68b2ea1b", name: "Avocadomad", price: "95 kr." },
];

const REVIEWS = [
  { text: "Byens bedste kanelsnegl. Jeg har prøvet dem alle, og jeg kommer stadig tilbage hver lørdag.", name: "Sofie, Nørrebro" },
  { text: "Hyggeligt sted, hvor man faktisk kan sidde og arbejde. Kaffen er fantastisk, og personalet husker ens bestilling.", name: "Mads, kunde siden 2021" },
  { text: "Vi bestilte brunch til hele kontoret, og alt var klar til tiden. Det gør vi igen.", name: "Line, kontorchef" },
];

const GALLERY = [
  "1550731358-491ded4af838",
  "1648462908676-8305f0eff8e0",
  "1694632288834-17d86b340745",
  "1583424534441-c5926f74ac05",
  "1593443320739-77f74939d0da",
  "1544031064-9de80864ade5",
];

const TICKER = ["Friskbagt hver morgen kl. 7", "Specialkaffe fra danske risterier", "Hjemmelavet chai", "Takeaway på 5 minutter", "Gavekort i disken", "Firmabestilling til møder"];

function Logo() {
  return (
    <a href="#top" className="font-display text-2xl font-semibold tracking-tight">
      Kanel<span className="text-[#c2652f]">.</span>
    </a>
  );
}

export function CafeSite() {
  const slider = useSlider(SLIDES.length, 5500);
  const [tab, setTab] = useState<Tab>("Kaffe");
  const [review, setReview] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const status = useOpenNow(HOURS);

  const nav = [
    ["Menu", "#menu"],
    ["Om os", "#om"],
    ["Find os", "#find"],
  ];

  return (
    <div id="top" className="min-h-dvh overflow-x-clip bg-[#f3e9d8] font-sans text-[#2a1b13]">
      <DemoNote className="bg-[#2a1b13] text-[#f3e9d8]/70" />

      <header className="sticky top-0 z-40 border-b border-[#2a1b13]/10 bg-[#f3e9d8]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {nav.map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-[#c2652f]">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {status && (
              <span className="hidden items-center gap-2 rounded-full bg-[#2a1b13]/5 px-3 py-1.5 text-xs font-medium sm:flex">
                <span className={`size-2 rounded-full ${status.open ? "bg-emerald-600" : "bg-[#c2652f]"}`} />
                {status.open ? "Åben nu" : "Lukket nu"}
              </span>
            )}
            <a href="#menu" className="rounded-full bg-[#c2652f] px-5 py-2.5 text-sm font-semibold text-[#f3e9d8] transition hover:bg-[#a9541f]">
              Bestil takeaway
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-full border border-[#2a1b13]/15 md:hidden"
              aria-label="Menu"
            >
              <span className="text-lg">{menuOpen ? "×" : "≡"}</span>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 px-5 pb-5">
                {nav.map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-lg font-display hover:bg-[#2a1b13]/5">
                    {label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero slider */}
      <section className="relative h-[88svh] min-h-[560px] overflow-hidden bg-[#2a1b13]" {...slider.hover}>
        <AnimatePresence initial={false}>
          <motion.div
            key={slider.index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.1 }, scale: { duration: 6, ease: "linear" } }}
          >
            <Img id={SLIDES[slider.index].id} w={2000} alt="" className="size-full object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c120c]/90 via-[#1c120c]/35 to-[#1c120c]/10" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 text-[#f3e9d8] sm:pb-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#f0b48a]">Café · Nørrebro</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={slider.index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="max-w-3xl text-balance font-display text-5xl font-semibold leading-[1.02] sm:text-7xl">
                {SLIDES[slider.index].title}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-[#f3e9d8]/80">{SLIDES[slider.index].text}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#menu" className="rounded-full bg-[#f3e9d8] px-7 py-3.5 text-sm font-semibold text-[#2a1b13] transition hover:bg-white/90">
              Se menukortet
            </a>
            <a href="#find" className="rounded-full border border-[#f3e9d8]/40 px-7 py-3.5 text-sm font-semibold transition hover:bg-[#f3e9d8]/10">
              Find vej
            </a>
          </div>
          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => slider.go(i)}
                  aria-label={`Billede ${i + 1}`}
                  className="h-1 w-12 overflow-hidden rounded-full bg-[#f3e9d8]/25"
                >
                  {i === slider.index && (
                    <motion.span
                      key={slider.index}
                      className="block h-full bg-[#f3e9d8]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5.5, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Arrow dir="left" onClick={slider.prev} className="border-[#f3e9d8]/30 hover:bg-[#f3e9d8]/10" />
              <Arrow dir="right" onClick={slider.next} className="border-[#f3e9d8]/30 hover:bg-[#f3e9d8]/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-y border-[#2a1b13]/10 bg-[#c2652f] py-4 text-[#f3e9d8]">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap font-display text-xl italic"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t} <span className="not-italic text-[#f3e9d8]/60">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Menu with tabs */}
      <section id="menu" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c2652f]">Menukort</p>
            <h2 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">Hvad har du lyst til?</h2>
          </div>
          <div className="flex flex-wrap gap-2 rounded-full bg-[#2a1b13]/5 p-1.5">
            {(Object.keys(MENU) as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition ${tab === t ? "text-[#f3e9d8]" : "hover:text-[#c2652f]"}`}
              >
                {tab === t && <motion.span layoutId="cafe-tab" className="absolute inset-0 rounded-full bg-[#2a1b13]" />}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:col-span-2">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={tab}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Img id={MENU[tab].img} w={900} alt={tab} className="size-full object-cover" />
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-5 left-5 rounded-full bg-[#f3e9d8] px-4 py-2 font-display text-lg font-semibold">{tab}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.ul
              key={tab}
              className="divide-y divide-[#2a1b13]/10 self-center lg:col-span-3"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {MENU[tab].items.map(([name, desc, price]) => (
                <motion.li
                  key={name}
                  variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}
                  className="group flex items-baseline gap-4 py-5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-2xl font-semibold transition group-hover:text-[#c2652f]">{name}</p>
                    <p className="mt-1 text-sm text-[#2a1b13]/60">{desc}</p>
                  </div>
                  <span className="hidden flex-1 border-b border-dashed border-[#2a1b13]/20 sm:block" />
                  <span className="font-display text-xl font-semibold">{price} kr.</span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </section>

      {/* From the counter: horizontal slider */}
      <section className="bg-[#2a1b13] py-24 text-[#f3e9d8] sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f0b48a]">Fra disken i dag</p>
              <h2 className="mt-3 font-display text-4xl font-semibold sm:text-6xl">Bagt i morges</h2>
            </div>
            <div className="hidden gap-2 sm:flex">
              <Arrow dir="left" onClick={() => scrollTrack(track, -1)} className="border-[#f3e9d8]/25 hover:bg-[#f3e9d8]/10" />
              <Arrow dir="right" onClick={() => scrollTrack(track, 1)} className="border-[#f3e9d8]/25 hover:bg-[#f3e9d8]/10" />
            </div>
          </div>
        </div>
        <div
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-[max(1.25rem,calc((100vw_-_72rem)/2_+_1.25rem))] [&::-webkit-scrollbar]:hidden"
        >
          {COUNTER.map((c) => (
            <article key={c.id} className="group w-[72vw] max-w-[320px] shrink-0 snap-start">
              <div className="aspect-[3/4] overflow-hidden rounded-3xl">
                <Img id={c.id} w={700} alt={c.name} className="size-full object-cover transition duration-700 group-hover:scale-110" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-semibold">{c.name}</h3>
                <span className="text-[#f0b48a]">{c.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="om" className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-12 px-5 py-24 sm:py-32 lg:grid-cols-2">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Img id="1579265898841-79c7890d69cf" w={1000} alt="Baristaen laver kaffe" className="size-full object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute -bottom-8 -right-4 w-40 overflow-hidden rounded-2xl border-4 border-[#f3e9d8] shadow-xl sm:w-56"
          >
            <Img id="1552975955-b7a92c9aa248" w={500} alt="Espressomaskinen" className="aspect-square w-full object-cover" />
          </motion.div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c2652f]">Om Kanel</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">Startet af to venner med en ovn og en drøm.</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#2a1b13]/70">
            Kanel åbnede i 2019 i en gammel bagerbutik på Nørrebro. Vi bager alt selv, fra kanelsnegle til surdejsbrød, og vi bruger kun økologisk mel og
            mælk fra en gård på Sjælland.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[#2a1b13]/10 pt-8">
            {[
              ["600+", "snegle om ugen"],
              ["4,9", "på Google"],
              ["100%", "økologisk mel"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-semibold text-[#c2652f] sm:text-4xl">{v}</dt>
                <dd className="mt-1 text-sm text-[#2a1b13]/60">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#e7d6bd] py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Stars className="text-xl text-[#c2652f]" />
          <div className="relative mt-8 min-h-[190px] sm:min-h-[160px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={review}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="text-balance font-display text-2xl font-medium leading-snug sm:text-4xl">“{REVIEWS[review].text}”</blockquote>
                <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#2a1b13]/55">{REVIEWS[review].name}</figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Arrow dir="left" onClick={() => setReview((r) => (r + REVIEWS.length - 1) % REVIEWS.length)} className="border-[#2a1b13]/20 hover:bg-[#2a1b13]/5" />
            <span className="w-14 text-sm tabular-nums text-[#2a1b13]/60">
              {review + 1} / {REVIEWS.length}
            </span>
            <Arrow dir="right" onClick={() => setReview((r) => (r + 1) % REVIEWS.length)} className="border-[#2a1b13]/20 hover:bg-[#2a1b13]/5" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">@cafekanel</h2>
          <a href="#top" className="text-sm font-semibold underline decoration-[#c2652f] decoration-2 underline-offset-4">
            Følg os på Instagram
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {GALLERY.map((id, i) => (
            <div key={id} className={`group overflow-hidden rounded-2xl ${i === 0 ? "row-span-2" : "aspect-square"}`}>
              <Img id={id} w={700} alt="" className="size-full object-cover transition duration-700 group-hover:scale-110" />
            </div>
          ))}
        </div>
      </section>

      {/* Find us */}
      <section id="find" className="scroll-mt-20 px-5 pb-24">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-[#2a1b13] text-[#f3e9d8] lg:grid-cols-2">
          <div className="p-8 sm:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f0b48a]">Find os</p>
            <h2 className="mt-3 font-display text-4xl font-semibold">Kanelgade 12, Nørrebro</h2>
            <p className="mt-3 text-[#f3e9d8]/70">2 minutter fra Nørrebro Station. Cykelparkering lige foran.</p>
            <table className="mt-8 w-full text-sm">
              <tbody>
                {HOURS.map((h, i) => (
                  <tr key={h.day} className={`border-b border-[#f3e9d8]/10 ${status?.today === i ? "font-semibold text-[#f0b48a]" : ""}`}>
                    <td className="py-2.5">
                      {h.day} {status?.today === i && <span className="ml-2 rounded-full bg-[#f0b48a]/20 px-2 py-0.5 text-[10px] uppercase tracking-wider">I dag</span>}
                    </td>
                    <td className="py-2.5 text-right tabular-nums">
                      {h.open}–{h.close}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#top" className="rounded-full bg-[#c2652f] px-6 py-3 text-sm font-semibold transition hover:bg-[#a9541f]">
                Rutevejledning
              </a>
              <a href="#top" className="rounded-full border border-[#f3e9d8]/30 px-6 py-3 text-sm font-semibold transition hover:bg-[#f3e9d8]/10">
                Ring 12 34 56 78
              </a>
            </div>
          </div>
          <div className="relative min-h-72">
            <Img id="1511081692775-05d0f180a065" w={1000} alt="Caféen indefra" className="absolute inset-0 size-full object-cover" />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2a1b13]/10 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-sm text-[#2a1b13]/60 sm:flex-row sm:items-center">
          <Logo />
          <p>Gavekort · Firmabestilling · Takeaway</p>
          <p>© 2026 Café Kanel</p>
        </div>
      </footer>
    </div>
  );
}
