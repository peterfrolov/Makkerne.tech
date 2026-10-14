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

/**
 * A real, running example site in a browser-style box. The page is rendered at
 * desktop (or phone) size and scaled down, and stays still until it is clicked.
 */
export function LiveSite({
  src,
  title,
  liveLabel,
  tryLabel,
}: {
  src: string;
  title: string;
  liveLabel: string;
  tryLabel: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: DESKTOP_WIDTH, h: 800, scale: 0.5 });
  // Until clicked, the preview can't be interacted with, so it never steals the page's scroll.
  const [active, setActive] = useState(false);

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


  const path = src.replace(/^\//, "makkerne.tech/").replace(/\/$/, "");

  return (
    <div className="group hard overflow-hidden border-2 border-ink bg-card">
      <div className="flex items-center gap-3 border-b-2 border-ink bg-ink px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 bg-paper/25" />
          <span className="size-2.5 bg-paper/25" />
          <span className="size-2.5 bg-paper/25" />
        </span>
        <a
          href={src}
          target="_blank"
          rel="noopener"
          className="min-w-0 flex-1 truncate bg-paper/10 px-3 py-1 text-center font-mono text-[11px] text-paper/70 transition hover:text-paper"
        >
          {path} ↗
        </a>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase text-brand">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {liveLabel}
        </span>
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
          <button
            type="button"
            onClick={() => setActive(true)}
            className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/25 to-transparent to-40% pb-6 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
          >
            <span className="border-2 border-ink bg-brand px-5 py-2.5 font-cond text-lg font-extrabold uppercase text-ink shadow-[4px_4px_0_var(--color-ink)]">{tryLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}
