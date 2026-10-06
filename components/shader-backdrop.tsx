"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "framer-motion";

// Light, slightly muted mesh gradient: off-white with soft brand blue and peach.
export function ShaderBackdrop() {
  const reduce = useReducedMotion();
  return (
    <>
      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={["#f3f2ee", "#cfdcff", "#9db8ff", "#f7d9c4", "#e9e7e1"]}
        distortion={0.8}
        swirl={0.15}
        speed={reduce ? 0 : 0.3}
      />
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-50 mix-blend-soft-light"
        colors={["#f3f2ee", "#ffffff", "#7fa3ff", "#f29a6b"]}
        distortion={0.4}
        swirl={0.6}
        speed={reduce ? 0 : 0.2}
      />
      {/* Soft veil keeps text readable and tones the white down */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-paper/80 via-paper/20 to-transparent" />
    </>
  );
}

// SVG filters used by the hero (glass badge, gooey button, glows).
export function ShaderFilters() {
  return (
    <svg className="absolute inset-0 h-0 w-0" aria-hidden>
      <defs>
        <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
        </filter>
        <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="gooey"
          />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
        <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1f6bff" />
          <stop offset="50%" stopColor="#16181d" />
          <stop offset="100%" stopColor="#f29a6b" />
        </linearGradient>
      </defs>
    </svg>
  );
}
