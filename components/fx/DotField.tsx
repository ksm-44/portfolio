"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Aether background: full-bleed dot-matrix particle field.
 * Slow breathing pulse, subtle pointer-reactive drift, soft depth fade.
 * Reduced motion gets a static field; the DOM beneath is always the fallback.
 */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const SPACING = 34;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 2); // DPR clamp
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / width;
      pointer.ty = e.clientY / height;
    };

    const draw = (t: number) => {
      // Subtle drift toward the pointer.
      pointer.x += (pointer.tx - pointer.x) * 0.03;
      pointer.y += (pointer.ty - pointer.y) * 0.03;

      ctx.clearRect(0, 0, width, height);
      const dark = document.documentElement.classList.contains("dark");
      const breath = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(t / 4500); // slow pulse
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING + (pointer.x - 0.5) * 14;
          const y = j * SPACING + (pointer.y - 0.5) * 14;
          // Depth fade: dots dim toward the bottom, brighten near center.
          const fade = 1 - Math.abs(j / rows - 0.35) * 1.4;
          if (fade <= 0) continue;
          const wave = reduce
            ? 0.5
            : 0.5 + 0.5 * Math.sin(t / 2600 + i * 0.35 + j * 0.22);
          const alpha = (dark ? 0.16 : 0.12) * fade * (0.4 + 0.6 * wave * breath);
          const r = 1 + wave * breath * 0.8;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = dark
            ? `rgba(255, 122, 61, ${alpha})`
            : `rgba(226, 97, 47, ${alpha})`;
          ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
