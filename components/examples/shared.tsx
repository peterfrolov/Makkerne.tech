"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

/** Unsplash photo by id, cropped to the requested width. */
export function photo(id: string, w = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
}

export function Img({ id, w, alt, className }: { id: string; w?: number; alt: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element -- remote stock photos, sized via the URL
  return <img src={photo(id, w)} alt={alt} loading="lazy" decoding="async" className={className} />;
}

/** Index that advances on its own, pauses while hovered, and can be set by hand. */
export function useSlider(count: number, ms = 5000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ms);
    return () => clearInterval(id);
  }, [paused, count, ms, index]);
  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  return {
    index,
    go,
    next: () => go(index + 1),
    prev: () => go(index - 1),
    hover: { onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false) },
  };
}

/** Scrolls a horizontal scroll-snap track by most of its width. */
export function scrollTrack(track: React.RefObject<HTMLDivElement | null>, dir: 1 | -1) {
  const el = track.current;
  if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
}

export type Hours = { day: string; open: string; close: string }[];

/** Open/closed right now, from a Monday-first list of opening hours. */
export function useOpenNow(hours: Hours) {
  const [state, setState] = useState<{ open: boolean; today: number } | null>(null);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const today = (now.getDay() + 6) % 7;
      const h = hours[today];
      const mins = now.getHours() * 60 + now.getMinutes();
      const toMin = (t: string) => {
        const [hh, mm] = t.split(":").map(Number);
        return hh * 60 + mm;
      };
      const open = !!h && h.open !== "" && mins >= toMin(h.open) && mins < toMin(h.close);
      setState({ open, today });
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, [hours]);
  return state;
}

export function Arrow({ dir, onClick, className = "" }: { dir: "left" | "right"; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Forrige" : "Næste"}
      className={`grid size-11 place-items-center rounded-full border transition ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        {dir === "left" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`tracking-[0.15em] ${className}`} aria-label="5 ud af 5 stjerner">
      ★★★★★
    </span>
  );
}

/** Small banner so nobody mistakes the example for a real business. */
export function DemoNote({ className = "" }: { className?: string }) {
  return (
    <p className={`py-2 text-center text-[11px] tracking-wide ${className}`}>
      Eksempel lavet af{" "}
      <Link href="/" target="_top" className="underline underline-offset-2">
        Makkerne
      </Link>{" "}
      · Forretningen er opdigtet
    </p>
  );
}
