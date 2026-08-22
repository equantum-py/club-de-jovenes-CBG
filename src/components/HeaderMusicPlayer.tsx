"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title: string;
  autoplay?: boolean;
  loop?: boolean;
  volume?: number;
  viewport?: "desktop" | "mobile";
};

const TIME_KEY = "gracia-music-time";
const PLAY_KEY = "gracia-music-playing";
const REVEAL_EVENT = "gracia-reveal-progress";

export default function HeaderMusicPlayer({
  src,
  title,
  autoplay = true,
  loop = true,
  volume = 35,
  viewport,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [eligible, setEligible] = useState(true);
  const revealProgressRef = useRef(0);
  const revealActiveRef = useRef(false);

  useEffect(() => {
    if (!viewport) {
      setEligible(true);
      return;
    }
    const media = window.matchMedia(viewport === "desktop" ? "(min-width: 1024px)" : "(max-width: 1023px)");
    const sync = () => setEligible(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [viewport]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src || !eligible) {
      if (audio && !eligible) audio.pause();
      return;
    }

    const baseVolume = Math.max(0, Math.min(1, volume / 100));
    const setRevealVolume = (progress: number) => {
      const normalized = Math.max(0, Math.min(1, progress));
      revealProgressRef.current = normalized;
      const factor = 1 - normalized * 0.9;
      audio.volume = Math.max(0.025, Math.min(1, baseVolume * factor));
    };

    setRevealVolume(revealProgressRef.current);

    const saved = Number(sessionStorage.getItem(TIME_KEY) || 0);
    const restore = () => {
      if (saved > 0 && Number.isFinite(saved)) {
        audio.currentTime = Math.min(saved, audio.duration || saved);
      }
    };
    audio.addEventListener("loadedmetadata", restore, { once: true });

    const tryPlay = async (force = false) => {
      if (!autoplay && !force) return;
      try {
        await audio.play();
        setPlaying(true);
        sessionStorage.setItem(PLAY_KEY, "1");
      } catch {
        // El navegador puede bloquear audio hasta la primera interacción real.
      }
    };

    // Para la experiencia de lanzamiento no respetamos un estado "pausado" viejo:
    // si autoplay está activo, siempre intentamos arrancar nuevamente al cargar.
    if (autoplay) void tryPlay(true);

    const unlock = () => {
      if (revealActiveRef.current || autoplay) void tryPlay(true);
    };

    document.addEventListener("pointerdown", unlock, { once: true });
    document.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("wheel", unlock, { once: true, passive: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });

    const onRevealProgress = (event: Event) => {
      const detail = (event as CustomEvent<{ progress?: number; active?: boolean }>).detail;
      const nextProgress = Number(detail?.progress ?? 0);
      revealActiveRef.current = Boolean(detail?.active);
      setRevealVolume(nextProgress);

      if (detail?.active && audio.paused) {
        void tryPlay(true);
      }
    };
    window.addEventListener(REVEAL_EVENT, onRevealProgress as EventListener);

    const save = () => {
      sessionStorage.setItem(TIME_KEY, String(audio.currentTime));
      if (!revealActiveRef.current) {
        sessionStorage.setItem(PLAY_KEY, audio.paused ? "0" : "1");
      }
    };
    const timer = window.setInterval(save, 1000);

    return () => {
      save();
      window.clearInterval(timer);
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener(REVEAL_EVENT, onRevealProgress as EventListener);
    };
  }, [src, autoplay, volume, eligible]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !eligible) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
        sessionStorage.setItem(PLAY_KEY, "1");
      } catch {}
    } else {
      audio.pause();
      setPlaying(false);
      sessionStorage.setItem(PLAY_KEY, "0");
    }
  };

  if (!src) return null;
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-full border border-brand-border bg-white/80 px-2 py-1.5 shadow-sm" title={title}>
      <audio ref={audioRef} src={src} loop={loop} preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <button type="button" onClick={toggle} aria-label={playing ? "Pausar música" : "Reproducir música"} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-forest text-xs text-white">
        {playing ? "Ⅱ" : "▶"}
      </button>
      <div className="hidden min-w-0 xl:block">
        <p className="max-w-[110px] truncate text-[10px] font-semibold text-brand-forest">{title}</p>
        <p className="text-[9px] text-brand-muted">{playing ? "Reproduciendo" : "Pausado"}</p>
      </div>
      <span className="flex h-5 items-end gap-[2px]" aria-hidden="true">
        {[10,16,12,18].map((h,i)=><span key={i} className={`w-[2px] rounded-full bg-brand-gold ${playing ? "animate-pulse" : "opacity-40"}`} style={{height:h}} />)}
      </span>
    </div>
  );
}
