"use client";

import { useEffect, useRef, useState } from "react";
import type { Example } from "@/lib/content";

const PHONE_WIDTH = 390;

function hideScrollbar(e: React.SyntheticEvent<HTMLIFrameElement>) {
  try {
    const doc = e.currentTarget.contentDocument;
    if (!doc) return;
    const style = doc.createElement("style");
    style.textContent = "html{scrollbar-width:none}html::-webkit-scrollbar{display:none}";
    doc.head.appendChild(style);
  } catch {}
}

/** One yellow rubber corner of the work-phone case. */
function Bumper({ className }: { className: string }) {
  return <span aria-hidden className={`pointer-events-none absolute size-14 border-brand ${className}`} />;
}

/**
 * A work phone in a rugged case: black rubber, yellow corner bumpers, a chunky side button.
 * The screen shows one of the example sites at real phone width; it never takes clicks itself.
 */
export function RuggedPhone({ src, title, width = 300, height = 600 }: { src: string; title: string; width?: number; height?: number }) {
  const rim = Math.round(width * 0.04);
  const screenW = width - rim * 2;
  const scale = screenW / PHONE_WIDTH;
  // Which site has finished loading, so a newly picked trade never shows a blank screen.
  const [loaded, setLoaded] = useState<string | null>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  // The first site can finish loading before React is ready to hear about it; catch that case.
  useEffect(() => {
    const check = () => {
      try {
        const doc = frameRef.current?.contentDocument;
        if (doc?.readyState === "complete" && doc.location.href !== "about:blank") setLoaded(src);
      } catch {}
    };
    const id = setTimeout(check, 0);
    return () => clearTimeout(id);
  }, [src]);
  return (
    <div className="relative" style={{ width, height }}>
      <div className="absolute inset-0 rounded-[2.4rem] bg-ink shadow-[0_34px_60px_-28px_rgba(22,21,19,0.55)]" style={{ padding: rim }}>
        <div className="relative size-full overflow-hidden rounded-[1.7rem] bg-paper">
          <iframe
            key={src}
            ref={frameRef}
            src={src}
            title={title}
            loading="lazy"
            tabIndex={-1}
            aria-hidden
            onLoad={(e) => {
              hideScrollbar(e);
              setLoaded(src);
            }}
            className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 bg-paper"
            style={{ width: PHONE_WIDTH, height: (height - rim * 2) / scale, transform: `scale(${scale})` }}
          />
          <div aria-hidden className={`absolute inset-0 grid place-items-center bg-paper transition-opacity duration-300 ${loaded === src ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            <span className="h-1.5 w-16 animate-pulse bg-brand" />
          </div>
        </div>
      </div>
      <Bumper className="left-0 top-0 rounded-tl-[2.4rem] border-l-[7px] border-t-[7px]" />
      <Bumper className="right-0 top-0 rounded-tr-[2.4rem] border-r-[7px] border-t-[7px]" />
      <Bumper className="bottom-0 left-0 rounded-bl-[2.4rem] border-b-[7px] border-l-[7px]" />
      <Bumper className="bottom-0 right-0 rounded-br-[2.4rem] border-b-[7px] border-r-[7px]" />
      <span aria-hidden className="absolute -right-2 top-[22%] h-16 w-2 rounded-r-md bg-ink" />
      <span aria-hidden className="absolute -left-2 top-[18%] h-9 w-2 rounded-l-md bg-ink" />
    </div>
  );
}

/**
 * Front page: the work phone with the visitor's own trade on screen. A row of trade buttons
 * underneath swaps the site, so a painter sees a painter's site straight away.
 */
export function PhonePreview({ items, title, cta, pick }: { items: Example[]; title: string; cta: string; pick: string }) {
  const [sel, setSel] = useState(0);
  const item = items[sel];
  // A smaller phone on small screens, so it doesn't fill the whole first view.
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return (
    <div className="flex flex-col items-center">
      <RuggedPhone src={item.href} title={`${title}: ${item.name}`} width={small ? 240 : 300} height={small ? 480 : 600} />
      <p className="mt-7 font-cond text-sm font-bold uppercase tracking-widest text-ink/55">{pick}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-1.5" role="group" aria-label={pick}>
        {items.map((it, i) => (
          <button
            key={it.slug}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={i === sel}
            className={`border-2 border-ink px-2.5 py-1 font-cond text-sm font-bold uppercase transition sm:px-3 sm:py-1.5 sm:text-base ${i === sel ? "bg-ink text-paper" : "hover:bg-brand"}`}
          >
            {it.trade}
          </button>
        ))}
      </div>
      <a href={item.href} target="_blank" rel="noopener" className="mt-4 text-sm font-medium text-ink/70 underline underline-offset-4 transition hover:text-ink">
        {cta} ↗
      </a>
    </div>
  );
}
