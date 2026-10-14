"use client";

const PHONE_WIDTH = 390;
const FRAME_WIDTH = 300;

function hideScrollbar(e: React.SyntheticEvent<HTMLIFrameElement>) {
  try {
    const doc = e.currentTarget.contentDocument;
    if (!doc) return;
    const style = doc.createElement("style");
    style.textContent = "html{scrollbar-width:none}html::-webkit-scrollbar{display:none}";
    doc.head.appendChild(style);
  } catch {}
}

/** One of the example sites, shown still inside a plain phone frame. */
export function PhonePreview({ src, title, cta }: { src: string; title: string; cta: string }) {
  const scale = (FRAME_WIDTH - 20) / PHONE_WIDTH;
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-[2.4rem] border-[10px] border-ink bg-ink shadow-[0_30px_60px_-30px_rgba(22,21,19,0.45)]" style={{ width: FRAME_WIDTH, height: 600 }}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          tabIndex={-1}
          onLoad={hideScrollbar}
          className="pointer-events-none absolute left-0 top-0 origin-top-left rounded-[1.6rem] border-0 bg-paper"
          style={{ width: PHONE_WIDTH, height: 580 / scale, transform: `scale(${scale})` }}
        />
      </div>
      <a href={src} target="_blank" rel="noopener" className="mt-5 text-sm font-medium text-ink/70 underline underline-offset-4 transition hover:text-ink">
        {cta} ↗
      </a>
    </div>
  );
}
