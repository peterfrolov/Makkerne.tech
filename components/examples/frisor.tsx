"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, DemoNote, Img, Stars, useOpenNow, useSlider, scrollTrack, type Hours } from "./shared";

const HOURS: Hours = [
  { day: "Mandag", open: "10:00", close: "18:00" },
  { day: "Tirsdag", open: "10:00", close: "18:00" },
  { day: "Onsdag", open: "10:00", close: "19:00" },
  { day: "Torsdag", open: "10:00", close: "20:00" },
  { day: "Fredag", open: "09:00", close: "18:00" },
  { day: "Lørdag", open: "09:00", close: "15:00" },
  { day: "Søndag", open: "", close: "" },
];

const HERO = [
  { id: "1634449571010-02389ed0f9b0", alt: "Frisør klipper en kunde" },
  { id: "1580618672591-eb180b1a973f", alt: "Føntørring med rundbørste" },
  { id: "1600948836101-f9ffda59d250", alt: "Salonens stole og spejle" },
];

const PRICES = {
  Dame: [
    ["Dameklip", "Inkl. vask og føn", 495, 60],
    ["Klip, kort hår", "Pixie og bob", 425, 45],
    ["Pandehår", "Hurtig opfriskning", 125, 15],
    ["Opsætning", "Bryllup og fest", 650, 60],
  ],
  Herre: [
    ["Herreklip", "Inkl. vask og styling", 395, 45],
    ["Fade", "Maskine og saks", 425, 45],
    ["Skægtrim", "Med varmt håndklæde", 225, 30],
    ["Klip + skæg", "Den fulde pakke", 575, 75],
  ],
  Farve: [
    ["Bundfarve", "Én farve, hele håret", 695, 90],
    ["Highlights", "Halvt hoved", 995, 120],
    ["Balayage", "Håndmalet, naturligt resultat", 1695, 180],
    ["Toning", "Glans og nuance", 450, 45],
  ],
  Behandling: [
    ["Kurbehandling", "Fugt og reparation", 295, 30],
    ["Hovedbundsmassage", "15 min. ren ro", 195, 15],
    ["Keratin", "Glat hår i op til 4 måneder", 1495, 150],
  ],
} as const;

type Category = keyof typeof PRICES;
type Service = { name: string; price: number; mins: number };

const TEAM = [
  { id: "1647462741268-e5724e5886c0", name: "Sara", role: "Farvespecialist", bio: "11 år i faget. Elsker balayage og naturlige toner." },
  { id: "1605497788044-5a32c7078486", name: "Ali", role: "Herreklip & skæg", bio: "Skarpe kanter og klassiske klip. Håndklædet er altid varmt." },
  { id: "1599351431202-1e0f0137899a", name: "Mikkel", role: "Fades & styling", bio: "Moderne klip med maskine og saks. Tager sig tid til en snak." },
];

const LOOKS = [
  { id: "1546877625-cb8c71916608", name: "Bløde bølger" },
  { id: "1672788709547-6d7f239972c3", name: "Kobber-balayage" },
  { id: "1582095133179-bfd08e2fc6b3", name: "Lang & blank" },
  { id: "1611451444023-7fe9d86fe1d0", name: "Naturlige krøller" },
  { id: "1636153279424-cb5d1e00f5a2", name: "Sort glans" },
  { id: "1614204424926-196a80bf0be8", name: "Lag i bevægelse" },
];

const REVIEWS = [
  { text: "Sara forstod præcis, hvad jeg mente med ‘lidt lysere, men ikke for meget’. Bedste farve, jeg har haft.", name: "Camilla" },
  { text: "Endelig en frisør, hvor man kan booke på telefonen på et minut. Og klippet er altid skarpt.", name: "Jonas" },
  { text: "Rolig stemning, god kaffe og ingen stress. Jeg går derfra og føler mig som et nyt menneske.", name: "Fatima" },
];

const SLOTS = ["10:00", "11:00", "12:30", "13:30", "14:30", "15:30", "16:30", "17:00"];
const DAY = ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"];

function BookingModal({ initial, onClose }: { initial: { service?: Service; stylist?: string }; onClose: () => void }) {
  const [step, setStep] = useState(initial.service ? (initial.stylist ? 2 : 1) : 0);
  const [service, setService] = useState<Service | undefined>(initial.service);
  const [stylist, setStylist] = useState<string | undefined>(initial.stylist);
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string>();
  const [name, setName] = useState("");

  useEffect(() => {
    const start = new Date();
    const list: Date[] = [];
    for (let i = 0; list.length < 8; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      if (d.getDay() !== 0) list.push(d);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- dates depend on the visitor's clock
    setDays(list);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const steps = ["Behandling", "Frisør", "Tid", "Bekræft"];
  const taken = (i: number) => (day * 3 + i * 5 + (stylist?.length ?? 0)) % 4 === 0;

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1c1f1a]/60 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        role="dialog"
        aria-label="Book tid"
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-[#efece4] p-6 shadow-2xl sm:rounded-3xl sm:p-8"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-2xl font-bold">Book tid</p>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-full bg-[#1c1f1a]/5 text-lg" aria-label="Luk">
            ×
          </button>
        </div>
        {step < 4 && (
          <div className="mt-5 grid grid-cols-4 gap-1.5">
            {steps.map((s, i) => (
              <div key={s}>
                <div className="h-1 overflow-hidden rounded-full bg-[#1c1f1a]/10">
                  <motion.div className="h-full bg-[#5f6f4c]" animate={{ width: i <= step ? "100%" : "0%" }} />
                </div>
                <p className={`mt-1.5 text-[11px] ${i === step ? "font-semibold" : "text-[#1c1f1a]/45"}`}>{s}</p>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25 }} className="mt-6">
            {step === 0 && (
              <div className="space-y-5">
                {(Object.keys(PRICES) as Category[]).map((cat) => (
                  <div key={cat}>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1c1f1a]/45">{cat}</p>
                    <div className="mt-2 grid gap-2">
                      {PRICES[cat].map(([n, , p, m]) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => {
                            setService({ name: n, price: p, mins: m });
                            setStep(stylist ? 2 : 1);
                          }}
                          className="flex items-center justify-between rounded-2xl border border-[#1c1f1a]/10 px-4 py-3 text-left transition hover:border-[#5f6f4c] hover:bg-white/40"
                        >
                          <span className="font-medium">{n}</span>
                          <span className="text-sm text-[#1c1f1a]/60">
                            {m} min · {p} kr.
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-3">
                {[{ id: "", name: "Første ledige", role: "Hurtigste tid" }, ...TEAM].map((t) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => {
                      setStylist(t.name);
                      setStep(2);
                    }}
                    className="flex items-center gap-4 rounded-2xl border border-[#1c1f1a]/10 p-3 text-left transition hover:border-[#5f6f4c] hover:bg-white/40"
                  >
                    {t.id ? (
                      <Img id={t.id} w={160} alt={t.name} className="size-14 rounded-full object-cover" />
                    ) : (
                      <span className="grid size-14 place-items-center rounded-full bg-[#5f6f4c] text-xl text-[#efece4]">✦</span>
                    )}
                    <span>
                      <span className="block font-semibold">{t.name}</span>
                      <span className="text-sm text-[#1c1f1a]/55">{t.role}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
                  {days.map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDay(i);
                        setSlot(undefined);
                      }}
                      className={`w-14 shrink-0 rounded-2xl py-2.5 text-center transition ${day === i ? "bg-[#1c1f1a] text-[#efece4]" : "bg-[#1c1f1a]/5 hover:bg-[#1c1f1a]/10"}`}
                    >
                      <span className="block text-[11px] opacity-70">{DAY[d.getDay()]}</span>
                      <span className="block text-lg font-bold">{d.getDate()}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {SLOTS.map((s, i) => (
                    <button
                      key={s}
                      type="button"
                      disabled={taken(i)}
                      onClick={() => setSlot(s)}
                      className={`rounded-xl py-2.5 text-sm tabular-nums transition disabled:cursor-not-allowed disabled:opacity-30 disabled:line-through ${
                        slot === s ? "bg-[#5f6f4c] text-[#efece4]" : "border border-[#1c1f1a]/10 hover:border-[#5f6f4c]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!slot}
                  onClick={() => setStep(3)}
                  className="mt-6 w-full rounded-full bg-[#1c1f1a] py-3.5 text-sm font-semibold text-[#efece4] transition disabled:opacity-30"
                >
                  Videre
                </button>
              </div>
            )}

            {step === 3 && service && days[day] && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(4);
                }}
              >
                <dl className="divide-y divide-[#1c1f1a]/10 rounded-2xl bg-white/40 px-4 text-sm">
                  {[
                    ["Behandling", service.name],
                    ["Frisør", stylist],
                    ["Tid", `${DAY[days[day].getDay()]} ${days[day].getDate()}/${days[day].getMonth() + 1} kl. ${slot}`],
                    ["Varighed", `${service.mins} min`],
                    ["Pris", `${service.price} kr.`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-3">
                      <dt className="text-[#1c1f1a]/55">{k}</dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dit navn"
                  className="mt-4 w-full rounded-full border border-[#1c1f1a]/15 bg-transparent px-5 py-3 text-sm outline-none focus:border-[#5f6f4c]"
                />
                <button type="submit" className="mt-3 w-full rounded-full bg-[#5f6f4c] py-3.5 text-sm font-semibold text-[#efece4] transition hover:bg-[#4f5e3e]">
                  Bekræft booking
                </button>
              </form>
            )}

            {step === 4 && (
              <div className="py-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                  className="mx-auto grid size-16 place-items-center rounded-full bg-[#5f6f4c] text-2xl text-[#efece4]"
                >
                  ✓
                </motion.div>
                <p className="mt-5 font-display text-3xl font-bold">Vi ses, {name}!</p>
                <p className="mt-2 text-[#1c1f1a]/60">Du får en SMS dagen før med en påmindelse.</p>
                <button type="button" onClick={onClose} className="mt-6 rounded-full bg-[#1c1f1a] px-6 py-3 text-sm font-semibold text-[#efece4]">
                  Luk
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step > 0 && step < 4 && (
          <button type="button" onClick={() => setStep(step - 1)} className="mt-5 text-sm text-[#1c1f1a]/55 underline underline-offset-4">
            ← Tilbage
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

export function FrisorSite() {
  const hero = useSlider(HERO.length, 4500);
  const [cat, setCat] = useState<Category>("Dame");
  const [booking, setBooking] = useState<{ service?: Service; stylist?: string } | null>(null);
  const [review, setReview] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const status = useOpenNow(HOURS);

  useEffect(() => {
    const id = setInterval(() => setReview((r) => (r + 1) % REVIEWS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const book = (b: { service?: Service; stylist?: string } = {}) => setBooking(b);

  return (
    <div className="min-h-dvh overflow-x-clip bg-[#e6e2d8] font-sans text-[#1c1f1a]">
      <DemoNote className="bg-[#1c1f1a] text-[#e6e2d8]/60" />

      <header className="sticky top-0 z-40 bg-[#e6e2d8]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <a href="#top" className="font-display text-2xl font-extrabold tracking-tight">
            Klip &amp; Co.
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#priser" className="hover:text-[#5f6f4c]">Priser</a>
            <a href="#team" className="hover:text-[#5f6f4c]">Team</a>
            <a href="#looks" className="hover:text-[#5f6f4c]">Looks</a>
          </nav>
          <div className="flex items-center gap-3">
            {status && (
              <span className="hidden items-center gap-2 text-xs font-medium sm:flex">
                <span className="relative flex size-2">
                  {status.open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />}
                  <span className={`relative inline-flex size-2 rounded-full ${status.open ? "bg-emerald-600" : "bg-[#1c1f1a]/30"}`} />
                </span>
                {status.open ? `Åben til ${HOURS[status.today].close}` : "Lukket nu"}
              </span>
            )}
            <button type="button" onClick={() => book()} className="rounded-full bg-[#1c1f1a] px-5 py-2.5 text-sm font-semibold text-[#e6e2d8] transition hover:bg-[#5f6f4c]">
              Book tid
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-10 sm:pt-16 lg:grid-cols-2">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 rounded-full border border-[#1c1f1a]/15 px-4 py-1.5 text-xs font-medium">
            <Stars className="text-[#c0805f]" /> 4,9 · 312 anmeldelser
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 font-display text-6xl font-extrabold leading-[0.92] tracking-tight sm:text-7xl"
          >
            Hår, der passer <span className="text-[#5f6f4c]">til dig.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-md text-lg leading-relaxed text-[#1c1f1a]/65">
            Frisør i Valby med plads til en snak, god kaffe og et klip, du er glad for i flere uger.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-9 flex flex-wrap gap-3">
            <button type="button" onClick={() => book()} className="rounded-full bg-[#5f6f4c] px-8 py-4 text-sm font-semibold text-[#efece4] transition hover:bg-[#4f5e3e]">
              Book tid på 1 minut
            </button>
            <a href="#priser" className="rounded-full border-2 border-[#1c1f1a]/15 px-8 py-4 text-sm font-semibold transition hover:border-[#1c1f1a]/40">
              Se priser
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md" {...hero.hover}>
          {HERO.map((h, i) => {
            const pos = (i - hero.index + HERO.length) % HERO.length;
            return (
              <motion.button
                key={h.id}
                type="button"
                onClick={() => hero.go(i)}
                aria-label={h.alt}
                className="absolute inset-0 overflow-hidden rounded-[2.5rem] shadow-2xl"
                animate={{ rotate: pos === 0 ? 0 : pos === 1 ? 6 : -6, x: pos === 0 ? 0 : pos === 1 ? 30 : -30, scale: pos === 0 ? 1 : 0.9, zIndex: 3 - pos }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              >
                <Img id={h.id} w={900} alt={h.alt} className="size-full object-cover" />
              </motion.button>
            );
          })}
          <div className="absolute -bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-[#efece4] px-4 py-2.5 shadow-lg">
            {HERO.map((h, i) => (
              <button key={h.id} type="button" onClick={() => hero.go(i)} aria-label={h.alt} className={`h-2 rounded-full transition-all ${i === hero.index ? "w-6 bg-[#5f6f4c]" : "w-2 bg-[#1c1f1a]/20"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-[#1c1f1a]/10 py-6">
        <motion.div className="flex w-max gap-12 whitespace-nowrap font-display text-5xl font-extrabold sm:text-7xl" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-12">
              {["Klip", "Farve", "Balayage", "Fade", "Skæg", "Styling"].map((w, i) => (
                <span key={w} className={i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_#1c1f1a]" : ""}>
                  {w} ✦
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Prices */}
      <section id="priser" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#5f6f4c]">Prisliste</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">Priser</h2>
            <p className="mt-4 text-[#1c1f1a]/60">Alle priser er inkl. vask og styling. Studerende får 10% hverdage før kl. 14.</p>
            <div className="mt-8 flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {(Object.keys(PRICES) as Category[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${cat === c ? "bg-[#1c1f1a] text-[#e6e2d8]" : "bg-[#1c1f1a]/5 hover:bg-[#1c1f1a]/10"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.ul key={cat} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }} className="divide-y divide-[#1c1f1a]/10 border-y border-[#1c1f1a]/10">
                {PRICES[cat].map(([n, d, p, m]) => (
                  <li key={n} className="group flex items-center gap-4 py-5 transition hover:pl-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xl font-semibold">{n}</p>
                      <p className="text-sm text-[#1c1f1a]/55">
                        {d} · {m} min
                      </p>
                    </div>
                    <p className="font-display text-2xl font-bold tabular-nums">{p} kr.</p>
                    <button
                      type="button"
                      onClick={() => book({ service: { name: n, price: p, mins: m } })}
                      className="rounded-full border border-[#1c1f1a]/15 px-4 py-2 text-sm font-semibold transition group-hover:border-[#5f6f4c] group-hover:bg-[#5f6f4c] group-hover:text-[#efece4]"
                    >
                      Book
                    </button>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="scroll-mt-20 bg-[#1c1f1a] py-24 text-[#e6e2d8] sm:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a9b892]">Mød teamet</p>
          <h2 className="mt-3 font-display text-5xl font-extrabold tracking-tight">Saksene bag</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TEAM.map((t) => (
              <article key={t.name} className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Img id={t.id} w={700} alt={t.name} className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1f1a] via-[#1c1f1a]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#a9b892]">{t.role}</p>
                  <h3 className="mt-1 font-display text-3xl font-bold">{t.name}</h3>
                  <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-2 text-sm text-[#e6e2d8]/75">{t.bio}</p>
                      <button type="button" onClick={() => book({ stylist: t.name })} className="mt-4 rounded-full bg-[#e6e2d8] px-5 py-2.5 text-sm font-semibold text-[#1c1f1a]">
                        Book hos {t.name}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Looks slider */}
      <section id="looks" className="scroll-mt-20 py-24 sm:py-32">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-4 px-5">
          <h2 className="font-display text-5xl font-extrabold tracking-tight">Seneste looks</h2>
          <div className="flex gap-2">
            <Arrow dir="left" onClick={() => scrollTrack(track, -1)} className="border-[#1c1f1a]/15 hover:bg-[#1c1f1a] hover:text-[#e6e2d8]" />
            <Arrow dir="right" onClick={() => scrollTrack(track, 1)} className="border-[#1c1f1a]/15 hover:bg-[#1c1f1a] hover:text-[#e6e2d8]" />
          </div>
        </div>
        <div
          ref={track}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 [scrollbar-width:none] sm:px-[max(1.25rem,calc((100vw_-_72rem)/2_+_1.25rem))] [&::-webkit-scrollbar]:hidden"
        >
          {LOOKS.map((l, i) => (
            <figure key={l.id} className={`group relative w-[64vw] max-w-[300px] shrink-0 snap-start overflow-hidden rounded-[2rem] ${i % 2 ? "mt-10" : ""}`}>
              <Img id={l.id} w={600} alt={l.name} className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-110" />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-[#efece4]/90 px-4 py-2 text-sm font-semibold backdrop-blur">{l.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Salon + reviews */}
      <section className="relative overflow-hidden">
        <Img id="1633681926022-84c23e8cb2d6" w={2000} alt="Salonen" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-[#1c1f1a]/70" />
        <div className="relative mx-auto max-w-3xl px-5 py-28 text-center text-[#e6e2d8] sm:py-36">
          <Stars className="text-xl text-[#d9b8a6]" />
          <div className="mt-6 min-h-[180px] sm:min-h-[150px]">
            <AnimatePresence mode="wait">
              <motion.figure key={review} initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(8px)" }} transition={{ duration: 0.5 }}>
                <blockquote className="text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">“{REVIEWS[review].text}”</blockquote>
                <figcaption className="mt-5 text-sm uppercase tracking-[0.25em] text-[#e6e2d8]/60">{REVIEWS[review].name}</figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {REVIEWS.map((r, i) => (
              <button key={r.name} type="button" onClick={() => setReview(i)} aria-label={`Anmeldelse ${i + 1}`} className={`h-2 rounded-full transition-all ${i === review ? "w-8 bg-[#e6e2d8]" : "w-2 bg-[#e6e2d8]/35"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Hours + contact */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:grid-cols-2">
        <div>
          <h2 className="font-display text-5xl font-extrabold tracking-tight">Find os</h2>
          <p className="mt-4 text-lg text-[#1c1f1a]/65">Valby Langgade 42, 2500 Valby</p>
          <p className="text-lg text-[#1c1f1a]/65">3 min. fra Valby Station</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => book()} className="rounded-full bg-[#5f6f4c] px-7 py-3.5 text-sm font-semibold text-[#efece4] transition hover:bg-[#4f5e3e]">
              Book tid
            </button>
            <a href="#top" className="rounded-full border-2 border-[#1c1f1a]/15 px-7 py-3.5 text-sm font-semibold">
              Ring 36 45 00 12
            </a>
          </div>
        </div>
        <ul className="divide-y divide-[#1c1f1a]/10 rounded-3xl bg-[#efece4] px-6">
          {HOURS.map((h, i) => (
            <li key={h.day} className={`flex justify-between py-3.5 text-sm ${status?.today === i ? "font-bold text-[#5f6f4c]" : ""}`}>
              <span>{h.day}</span>
              <span className="tabular-nums">{h.open ? `${h.open}–${h.close}` : "Lukket"}</span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-[#1c1f1a]/10 px-5 pb-28 pt-10 sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-sm text-[#1c1f1a]/55 sm:flex-row">
          <p className="font-display text-xl font-extrabold text-[#1c1f1a]">Klip &amp; Co.</p>
          <p>© 2026 Klip &amp; Co. · Valby</p>
        </div>
      </footer>

      {/* Sticky booking button on phones */}
      <div className="fixed inset-x-4 bottom-4 z-30 sm:hidden">
        <button type="button" onClick={() => book()} className="w-full rounded-full bg-[#1c1f1a] py-4 text-sm font-semibold text-[#e6e2d8] shadow-2xl">
          Book tid
        </button>
      </div>

      <AnimatePresence>{booking && <BookingModal initial={booking} onClose={() => setBooking(null)} />}</AnimatePresence>
    </div>
  );
}
