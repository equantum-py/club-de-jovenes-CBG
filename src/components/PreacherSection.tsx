"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/design";

type S = {
  sectionEnabled: boolean;
  eyebrow: string;
  name: string;
  role: string;
  topic: string;
  description: string;
  dayLabel: string;
  church: string;
  cityCountry: string;
  showBanner: boolean;
  showProfileCard: boolean;
  ctaEnabled: boolean;
  ctaText: string;
  ctaHref: string;
  photoUrl: string;
  bannerDesktopUrl: string;
  bannerMobileUrl: string;
};

export default function PreacherSection() {
  const [settings, setSettings] = useState<S | null>(null);

  useEffect(() => {
    fetch("/api/predicador", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then(setSettings)
      .catch(() => {});
  }, []);

  if (!settings?.sectionEnabled) return null;

  const s = settings;
  const hasBanner = s.showBanner && (s.bannerDesktopUrl || s.bannerMobileUrl);

  return (
    <section id="predicador" className="relative scroll-mt-28 overflow-hidden bg-[#090b0d] py-10 text-white sm:py-12 lg:py-16">
      {hasBanner ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
          <picture>
            {s.bannerMobileUrl ? <source media="(max-width: 767px)" srcSet={s.bannerMobileUrl} /> : null}
            <img
              src={s.bannerDesktopUrl || s.bannerMobileUrl}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-[#090b0d]/55 via-[#090b0d]/70 to-[#090b0d]" />
        </div>
      ) : null}

      <Container className="relative">
        <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101416]/95 shadow-2xl shadow-black/20 backdrop-blur-sm lg:grid lg:grid-cols-[1.08fr_.92fr] lg:items-stretch">
          <div className="p-6 sm:p-8 lg:flex lg:flex-col lg:justify-center lg:p-12 xl:p-14">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-gold px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.15em] text-brand-forest">
                {s.eyebrow || "Predicador invitado"}
              </span>
              {s.dayLabel ? (
                <span className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.13em] text-white/55">
                  {s.dayLabel}
                </span>
              ) : null}
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-brand-gold">{s.role || "Pastor"}</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-[-.035em] sm:text-4xl lg:text-5xl">{s.name}</h2>
            </div>

            {(s.church || s.cityCountry) ? <div className="my-6 h-px bg-white/10" /> : null}

            {s.church || s.cityCountry ? (
              <div className="flex flex-wrap gap-2 text-xs text-white/60 sm:text-sm">
                {s.church ? <span className="rounded-full border border-white/12 px-3 py-2">{s.church}</span> : null}
                {s.cityCountry ? <span className="rounded-full border border-white/12 px-3 py-2">{s.cityCountry}</span> : null}
              </div>
            ) : null}

            {s.ctaEnabled && s.ctaHref ? (
              <a href={s.ctaHref} className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-gold px-6 text-sm font-bold text-brand-forest sm:w-auto">
                {s.ctaText} →
              </a>
            ) : null}
          </div>

          <div className="relative min-h-[330px] overflow-hidden bg-black sm:min-h-[430px] lg:min-h-[560px]">
            {s.showProfileCard && s.photoUrl ? (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_40%,rgba(19,86,74,.35),transparent_55%)]" />
                <img
                  src={s.photoUrl}
                  alt={s.name}
                  className="absolute inset-x-0 bottom-0 mx-auto h-full w-full object-contain object-bottom px-2 pt-4 sm:px-6 sm:pt-6 lg:px-8"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-sm sm:left-6 sm:right-6">
                  <p className="text-xs font-semibold uppercase tracking-[.14em] text-brand-gold">{s.role || "Pastor"}</p>
                  <p className="mt-1 text-xl font-semibold text-white sm:text-2xl">{s.name}</p>
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-[330px] items-center justify-center p-8 text-center text-sm text-white/35">
                {s.showProfileCard ? "Cargá una foto del predicador desde el panel administrativo." : "Perfil oculto desde el panel administrativo."}
              </div>
            )}
          </div>
        </article>
      </Container>
    </section>
  );
}
