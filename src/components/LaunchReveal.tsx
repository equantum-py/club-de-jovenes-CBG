"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "gracia-camp-launch-reveal-seen";

export default function LaunchReveal() {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {}

    setActive(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      progressRef.current = 1;
      setProgress(1);
      window.setTimeout(() => {
        setActive(false);
        document.body.style.overflow = previousOverflow;
        try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
      }, 620);
    };

    const advance = (amount: number) => {
      const next = Math.max(0, Math.min(1, progressRef.current + amount));
      progressRef.current = next;
      setProgress(next);
      if (next >= 0.98) finish();
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      advance(Math.abs(event.deltaY) / 900);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchStartY.current === null) return;
      event.preventDefault();
      const currentY = event.touches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - currentY;
      if (delta > 0) advance(delta / 520);
      else if (delta < 0) advance(delta / 900);
      touchStartY.current = currentY;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(event.key)) {
        event.preventDefault();
        advance(0.24);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!active) return null;

  const curtainOffset = progress * 100;
  const textOpacity = Math.max(0, 1 - progress * 2.2);
  const hintOpacity = Math.max(0, 1 - progress * 3.2);
  const glowOpacity = Math.max(0, 0.32 - progress * 0.32);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden" aria-label="Presentación de Gracia Camp 2026">
      <div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#050806] will-change-transform"
        style={{ transform: `translate3d(-${curtainOffset}%,0,0)`, transition: "transform 90ms linear" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#050806] will-change-transform"
        style={{ transform: `translate3d(${curtainOffset}%,0,0)`, transition: "transform 90ms linear" }}
      />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,148,70,.26),transparent_34%)]"
        style={{ opacity: glowOpacity }}
      />

      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
        style={{ opacity: textOpacity, transform: `translateY(${-progress * 28}px) scale(${1 + progress * 0.035})`, transition: "opacity 100ms linear, transform 100ms linear" }}
      >
        <p className="mb-5 text-[10px] font-bold uppercase tracking-[.4em] text-[#b99a4f] sm:text-xs">Gracia Camp 2026</p>
        <h1 className="max-w-6xl text-[clamp(3.2rem,10vw,9rem)] font-black uppercase leading-[.82] tracking-[-.055em]">
          ¿Estás listo?
        </h1>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 text-white/70 sm:bottom-10"
        style={{ opacity: hintOpacity }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[.28em] sm:text-xs">Deslizá para descubrir</span>
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/35 p-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b99a4f]" />
        </span>
      </div>
    </div>
  );
}
