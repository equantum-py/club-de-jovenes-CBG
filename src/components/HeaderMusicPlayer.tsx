"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; title: string; autoplay?: boolean; loop?: boolean; volume?: number };
const TIME_KEY = "gracia-music-time";
const PLAY_KEY = "gracia-music-playing";

export default function HeaderMusicPlayer({ src, title, autoplay = true, loop = true, volume = 35 }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    audio.volume = Math.max(0, Math.min(1, volume / 100));
    const saved = Number(sessionStorage.getItem(TIME_KEY) || 0);
    const wanted = sessionStorage.getItem(PLAY_KEY) !== "0" && autoplay;
    const restore = () => { if (saved > 0 && Number.isFinite(saved)) audio.currentTime = Math.min(saved, audio.duration || saved); };
    audio.addEventListener("loadedmetadata", restore, { once: true });

    const tryPlay = () => {
      if (!wanted) return;
      audio.play().then(() => setPlaying(true)).catch(() => undefined);
    };
    tryPlay();
    const unlock = () => { tryPlay(); document.removeEventListener("pointerdown", unlock); document.removeEventListener("keydown", unlock); };
    document.addEventListener("pointerdown", unlock, { once: true });
    document.addEventListener("keydown", unlock, { once: true });
    const save = () => { sessionStorage.setItem(TIME_KEY, String(audio.currentTime)); sessionStorage.setItem(PLAY_KEY, audio.paused ? "0" : "1"); };
    const timer = window.setInterval(save, 1000);
    return () => { save(); window.clearInterval(timer); document.removeEventListener("pointerdown", unlock); document.removeEventListener("keydown", unlock); };
  }, [src, autoplay, volume]);

  const toggle = async () => {
    const audio = audioRef.current; if (!audio) return;
    if (audio.paused) { try { await audio.play(); setPlaying(true); sessionStorage.setItem(PLAY_KEY,"1"); } catch {} }
    else { audio.pause(); setPlaying(false); sessionStorage.setItem(PLAY_KEY,"0"); }
  };

  if (!src) return null;
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-full border border-brand-border bg-white/80 px-2 py-1.5 shadow-sm" title={title}>
      <audio ref={audioRef} src={src} loop={loop} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
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
