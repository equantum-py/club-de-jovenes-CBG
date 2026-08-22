"use client";

import { useEffect, useRef, useState } from "react";

const REVEAL_EVENT = "gracia-reveal-progress";

function emitRevealProgress(progress: number, active: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(REVEAL_EVENT, {
      detail: { progress: Math.max(0, Math.min(1, progress)), active },
    }),
  );
}

export default function LaunchReveal() {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("skipReveal") === "1") {
      params.delete("skipReveal");
      const cleanQuery = params.toString();
      const cleanUrl = `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", cleanUrl);
      emitRevealProgress(1, false);
      setActive(false);
      return;
    }

    setActive(true);
    progressRef.current = 0;
    targetRef.current = 0;
    setProgress(0);
    emitRevealProgress(0, true);

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    let finished = false;
    let finishTimer: number | null = null;

    const advance = (amount: number) => {
      if (finished) return;
      targetRef.current = Math.max(0, Math.min(1, targetRef.current + amount));
      if (targetRef.current >= 0.97) targetRef.current = 1;
      emitRevealProgress(targetRef.current, true);
    };

    const onWheel = (event: WheelEvent) => {
      if (finished) return;
      event.preventDefault();
      const direction = event.deltaY >= 0 ? 1 : -1;
      const magnitude = Math.min(Math.abs(event.deltaY), 180);
      advance(direction * magnitude / 900);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (finished) return;
      touchStartY.current = event.touches[0]?.clientY ?? null;
      emitRevealProgress(targetRef.current, true);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (finished || touchStartY.current === null) return;
      event.preventDefault();
      const currentY = event.touches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - currentY;
      advance(delta / 520);
      touchStartY.current = currentY;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (finished) return;
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(event.key)) {
        event.preventDefault();
        advance(0.34);
      }
      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        advance(-0.34);
      }
    };

    const removeInteractionLocks = () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      emitRevealProgress(1, false);
      removeInteractionLocks();
      finishTimer = window.setTimeout(() => setActive(false), 180);
    };

    const animate = () => {
      if (finished) return;
      const current = progressRef.current;
      const target = targetRef.current;
      const next = current + (target - current) * 0.16;
      progressRef.current = Math.abs(target - next) < 0.001 ? target : next;
      setProgress(progressRef.current);
      emitRevealProgress(progressRef.current, true);

      if (target >= 1 && progressRef.current >= 0.985) {
        progressRef.current = 1;
        setProgress(1);
        finish();
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      finished = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (finishTimer) window.clearTimeout(finishTimer);
      emitRevealProgress(1, false);
      removeInteractionLocks();
    };
  }, []);

  if (!active) return null;

  const eased = 1 - Math.pow(1 - progress, 2.15);
  const curtainOffset = eased * 106;
  const inwardScale = 1 - eased * 0.02;
  const textOpacity = Math.max(0, 1 - progress * 1.85);
  const hintOpacity = Math.max(0, 1 - progress * 2.7);
  const glowOpacity = Math.max(0, 0.28 - progress * 0.24);
  const seamOpacity = Math.max(0, 0.9 - progress * 1.45);

  const curtainTexture = {
    backgroundImage:
      "linear-gradient(90deg,rgba(255,255,255,.025),transparent 9%,rgba(255,255,255,.018) 18%,transparent 27%,rgba(0,0,0,.26) 40%,rgba(255,255,255,.025) 52%,rgba(0,0,0,.2) 66%,rgba(255,255,255,.02) 82%,transparent),linear-gradient(180deg,#090c0a 0%,#030504 100%)",
    backgroundSize: "180px 100%,100% 100%",
  } as const;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#030504]" aria-label="Presentación de Gracia Camp 2026">
      <div className="absolute inset-y-0 left-0 w-[51%] origin-left will-change-transform shadow-[18px_0_42px_rgba(0,0,0,.45)]" style={{ ...curtainTexture, transform: `translate3d(-${curtainOffset}%,0,0) scaleX(${inwardScale})` }}><div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/55 to-transparent" /></div>
      <div className="absolute inset-y-0 right-0 w-[51%] origin-right will-change-transform shadow-[-18px_0_42px_rgba(0,0,0,.45)]" style={{ ...curtainTexture, transform: `translate3d(${curtainOffset}%,0,0) scaleX(${inwardScale})` }}><div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/55 to-transparent" /></div>
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-white/5 via-[#b99a4f]/35 to-white/5" style={{ opacity: seamOpacity }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" style={{ opacity: Math.max(0.25, 1 - progress) }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,148,70,.22),transparent_38%)]" style={{ opacity: glowOpacity }} />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white will-change-transform" style={{ opacity: textOpacity, transform: `translateY(${-progress * 16}px) scale(${1 + progress * 0.015})` }}><p className="mb-5 text-[10px] font-bold uppercase tracking-[.42em] text-[#b99a4f] sm:text-xs">Gracia Camp 2026</p><h1 className="max-w-6xl text-[clamp(3.2rem,10vw,9rem)] font-black uppercase leading-[.82] tracking-[-.055em]">¿Estás listo?</h1></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 text-white/70 sm:bottom-10" style={{ opacity: hintOpacity }}><span className="text-[10px] font-semibold uppercase tracking-[.28em] sm:text-xs">Deslizá para descubrir</span><span className="flex h-10 w-6 justify-center rounded-full border border-white/35 p-1"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b99a4f]" /></span></div>
    </div>
  );
}
