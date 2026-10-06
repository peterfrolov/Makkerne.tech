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
 * desktop (or phone) size and scaled down. While the box passes through the
 * viewport, the site inside scrolls along with the landing page.
 */
export function LiveSite({ src, title, liveLabel }: { src: string; title: string; liveLabel: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
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

  useEffect(() => {
    let raf = 0;
    const sync = () => {
      raf = 0;
      const box = boxRef.current;
      const win = frameRef.current?.contentWindow;
      if (!box || !win) return;
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      try {
        // Same-origin only (the example sites are served from this domain).
        const max = win.document.documentElement.scrollHeight - win.innerHeight;
        win.scrollTo({ top: progress * max, behavior: "instant" });
      } catch {
        // Cross-origin preview: leave it static.
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const path = src.replace(/^\//, "makkerne.tech/").replace(/\/$/, "");

  return (
    <a
      href={src}
      target="_blank"
      rel="noopener"
      className="group block overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-[0_30px_80px_-30px_rgba(22,24,29,0.35)] transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="flex items-center gap-3 border-b border-ink/10 bg-paper-2/70 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-ink/15" />
          <span className="size-2.5 rounded-full bg-ink/15" />
          <span className="size-2.5 rounded-full bg-ink/15" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-paper px-3 py-1 text-center text-[11px] text-ink/55">
          {path}
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-ink/60">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {liveLabel}
        </span>
      </div>
      <div ref={boxRef} className="relative aspect-[9/14] overflow-hidden bg-paper sm:aspect-[16/10]">
        <iframe
          ref={frameRef}
          src={src}
          title={title}
          loading="lazy"
          tabIndex={-1}
          onLoad={hideScrollbar}
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 bg-white"
          style={{ width: size.w, height: size.h, transform: `scale(${size.scale})` }}
        />
      </div>
    </a>
  );
}
