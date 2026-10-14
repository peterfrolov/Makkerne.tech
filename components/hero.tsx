"use client";

import { PulsingBorder } from "@paper-design/shaders-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "./lang";
import { ShaderBackdrop } from "./shader-backdrop";

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      <ShaderBackdrop />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-10 pt-28 sm:px-8 sm:pb-12">
        <div className="max-w-3xl">
          <motion.div
            className="relative mb-6 inline-flex items-center rounded-full border border-ink/10 bg-paper/50 px-4 py-2 backdrop-blur-sm"
            style={{ filter: "url(#glass-effect)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute left-1 right-1 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
            <span className="relative z-10 text-sm font-medium tracking-wide text-ink/80">✨ {t.hero.badge}</span>
          </motion.div>

          <motion.h1
            className="mb-6 text-5xl font-bold leading-none tracking-tight text-ink sm:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="mb-2 block bg-clip-text text-3xl font-light tracking-wider text-transparent sm:text-5xl lg:text-6xl"
              style={{
                backgroundImage: "linear-gradient(135deg, #16181d 0%, #1f6bff 35%, #f29a6b 70%, #16181d 100%)",
                backgroundSize: "200% 200%",
              }}
              animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {t.hero.line1}
            </motion.span>
            <span className="block font-black">{t.hero.line2}</span>
            <span className="block text-3xl font-light italic text-ink/75 sm:text-5xl lg:text-6xl">{t.hero.line3}</span>
          </motion.h1>

          <motion.p
            className="mb-3 text-2xl font-semibold text-brand md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {t.hero.price}{" "}
            <span className="whitespace-nowrap text-lg font-normal text-ink/50 line-through decoration-ink/40 md:text-xl">
              {t.hero.normal}
            </span>
          </motion.p>

          <motion.p
            className="mb-8 max-w-xl text-lg font-light leading-relaxed text-ink/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {t.hero.lead}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <motion.a
              href="#eksempler"
              className="rounded-full border-2 border-ink/20 bg-paper/30 px-8 py-3.5 text-sm font-medium text-ink backdrop-blur-sm transition-colors hover:border-brand/50 hover:bg-paper/60"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero.seeExamples}
            </motion.a>
            <motion.a
              href="#kontakt"
              className="rounded-full bg-gradient-to-r from-brand to-peach px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-shadow hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero.write}
            </motion.a>
          </motion.div>
        </div>

        <motion.dl
          className="mt-12 grid max-w-3xl grid-cols-3 gap-3 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {t.stats.map((s) => (
            <div key={s.label} className="border-l border-ink/15 pl-3 sm:pl-4">
              <dt className="text-lg font-semibold tracking-tight sm:text-2xl">{s.value}</dt>
              <dd className="mt-1 text-xs text-ink/60 sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Pulsing ring with rotating text */}
      <div className="absolute bottom-10 right-8 z-30 hidden lg:block">
        <div className="relative flex size-28 items-center justify-center">
          <PulsingBorder
            colors={["#1f6bff", "#7fa3ff", "#f29a6b", "#16181d"]}
            colorBack="#00000000"
            speed={reduce ? 0 : 1.5}
            roundness={1}
            thickness={0.1}
            softness={0.2}
            intensity={5}
            spots={5}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.5}
            smokeSize={4}
            scale={0.65}
            aspectRatio="square"
            style={{ width: 80, height: 80, borderRadius: "50%" }}
          />
          <motion.svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            aria-hidden
          >
            <defs>
              <path id="hero-ring" d="M 50, 50 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
            </defs>
            <text className="fill-ink/70 text-[8px] font-medium uppercase tracking-wider">
              <textPath href="#hero-ring" textLength="272" lengthAdjust="spacing">
                {t.hero.ring}
              </textPath>
            </text>
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
