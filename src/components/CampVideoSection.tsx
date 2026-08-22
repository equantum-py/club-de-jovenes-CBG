"use client";

import { useEffect, useState } from "react";
import { Container, Eyebrow } from "@/components/ui/design";

type CampVideoPayload = {
  enabled: boolean;
  eyebrow: string;
  title: string;
  description: string;
  videoId: string;
  thumbnailUrl: string;
  embedUrl: string;
};

export default function CampVideoSection() {
  const [settings, setSettings] = useState<CampVideoPayload | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    fetch("/api/camp-video", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then(setSettings)
      .catch(() => {});
  }, []);

  if (!settings?.enabled || !settings.videoId) return null;

  return (
    <section id="video-completo" className="scroll-mt-24 bg-brand-warmWhite py-12 sm:py-16">
      <Container>
        <article className="overflow-hidden rounded-[1.7rem] bg-brand-forestDark text-white lg:grid lg:grid-cols-[.42fr_.58fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <Eyebrow className="text-brand-gold">{settings.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.03em] sm:text-4xl">{settings.title}</h2>
            <p className="mt-4 text-sm leading-6 text-white/65 sm:text-base">{settings.description}</p>
          </div>

          <div className="aspect-video lg:aspect-auto lg:min-h-[360px]">
            {showPlayer ? (
              <iframe
                src={`${settings.embedUrl}?autoplay=1`}
                title={settings.title || "Video oficial Gracia Camp"}
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowPlayer(true)}
                className="group relative h-full w-full overflow-hidden"
                aria-label="Reproducir video oficial de Gracia Camp"
              >
                <img src={settings.thumbnailUrl} alt="Video oficial Gracia Camp" className="absolute inset-0 h-full w-full object-cover opacity-70" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-black/35 text-xl text-white backdrop-blur transition group-hover:scale-105">▶</span>
                </span>
              </button>
            )}
          </div>
        </article>
      </Container>
    </section>
  );
}
