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

/**
 * A real, running example site in a soft, rounded browser window with a live dot and a strip in
 * the example's own colour along the bottom. It stays still until it is clicked, so it never
 * steals the page's scroll.
 */
export function BrowserSite({ src, title, liveLabel, tryLabel, accent }: { src: string; title: string; liveLabel: string; tryLabel: string; accent: string }) {
  const { boxRef, size } = useScaledFrame();
  const [active, setActive] = useState(false);
  const path = src.replace(/^\//, "makkerne.tech/").replace(/\/$/, "");

  return (
    <div className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-3 rounded-full bg-black/15" />
          <span className="size-3 rounded-full bg-black/15" />
          <span className="size-3 rounded-full bg-black/15" />
        </span>
        <a href={src} target="_blank" rel="noopener" className="min-w-0 flex-1 truncate rounded-full bg-[#f3f2ef] px-4 py-1.5 text-center text-sm text-black/55 transition hover:text-black">
          {path} ↗
        </a>
        <span className="hidden items-center gap-2 text-sm text-black/60 sm:flex">
          <span className="size-2.5 rounded-full bg-emerald-500" aria-hidden />
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
          <button type="button" onClick={() => setActive(true)} className="absolute inset-0 flex items-end justify-center pb-6 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
            <span className="rounded-xl bg-black/45 px-6 py-3 text-base font-semibold text-white/85 backdrop-blur-sm">{tryLabel}</span>
          </button>
        )}
      </div>
      <div className="h-1.5" style={{ background: accent }} aria-hidden />
    </div>
  );
}
