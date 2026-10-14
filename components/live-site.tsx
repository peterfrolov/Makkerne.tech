"use client";

import { useEffect, useRef, useState } from "react";

function hideScrollbar(e: React.SyntheticEvent<HTMLIFrameElement>) {
  try {
    const doc = e.currentTarget.contentDocument;
    if (!doc) return;
    const style = doc.createElement("style");
    style.textContent = "html{scrollbar-width:none}html::-webkit-scrollbar{display:none}";
    doc.head.appendChild(style);
  } catch {}
}

const DESKTOP_WIDTH = 1280;
const PHONE_WIDTH = 390;

/** Renders a page at desktop (or phone) width and scales it down to fit its box. */
function useScaledFrame() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: DESKTOP_WIDTH, h: 800, scale: 0.5 });
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const measure = () => {
      const w = box.clientWidth < 500 ? PHONE_WIDTH : DESKTOP_WIDTH;
      const scale = box.clientWidth / w;
      setSize({ w, h: Math.ceil(box.clientHeight / scale), scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);
  return { boxRef, size };
}

/** A still picture of an example site: the whole card is a link that opens it. */
export function SiteThumb({ src, name, industry, open }: { src: string; name: string; industry: string; open: string }) {
  const { boxRef, size } = useScaledFrame();
  return (
    <a href={src} target="_blank" rel="noopener" className="group block">
      <div ref={boxRef} className="relative aspect-[16/11] overflow-hidden border border-ink/15 bg-card transition group-hover:border-ink/40">
        <iframe
          src={src}
          title={name}
          loading="lazy"
          tabIndex={-1}
          aria-hidden
          onLoad={hideScrollbar}
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 bg-paper"
          style={{ width: size.w, height: size.h, transform: `scale(${size.scale})` }}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <p>
          <span className="font-cond text-2xl font-bold uppercase">{name}</span>
          <span className="ml-2 text-sm text-ink/60">{industry}</span>
        </p>
        <span className="shrink-0 text-sm text-ink/60 underline-offset-4 group-hover:text-ink group-hover:underline">{open} ↗</span>
      </div>
    </a>
  );
}

/**
 * A real, running example site in a browser-style box. It stays still until it is clicked,
 * so it never steals the page's scroll.
 */
export function LiveSite({ src, title, tryLabel }: { src: string; title: string; liveLabel?: string; tryLabel: string }) {
  const { boxRef, size } = useScaledFrame();
  const [active, setActive] = useState(false);
  const path = src.replace(/^\//, "makkerne.tech/").replace(/\/$/, "");

  return (
    <div className="group overflow-hidden border border-ink/20 bg-card">
      <div className="flex items-center gap-3 border-b border-ink/15 bg-paper-2 px-4 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-ink/20" />
          <span className="size-2.5 rounded-full bg-ink/20" />
          <span className="size-2.5 rounded-full bg-ink/20" />
        </span>
        <a href={src} target="_blank" rel="noopener" className="min-w-0 flex-1 truncate bg-card px-3 py-1 text-center text-xs text-ink/60 transition hover:text-ink">
          {path} ↗
        </a>
      </div>
      <div ref={boxRef} className="relative aspect-[9/14] overflow-hidden bg-paper sm:aspect-[16/10]">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          tabIndex={active ? 0 : -1}
          onLoad={hideScrollbar}
          className={`absolute left-0 top-0 origin-top-left border-0 bg-paper ${active ? "" : "pointer-events-none"}`}
          style={{ width: size.w, height: size.h, transform: `scale(${size.scale})` }}
        />
        {!active && (
          <button type="button" onClick={() => setActive(true)} className="absolute inset-0 flex items-end justify-center pb-6 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
            <span className="bg-ink px-5 py-2.5 font-cond text-lg font-bold uppercase text-paper">{tryLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}
