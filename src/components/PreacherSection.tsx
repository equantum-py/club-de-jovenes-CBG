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
  const [s, setS] = useState<S | null>(null);

  useEffect(() => {
    fetch("/api/predicador", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setS)
      .catch(() => {});
  }, []);

  if (!s?.sectionEnabled) return null;

  const desktopVisual = (s.showBanner && s.bannerDesktopUrl) || s.photoUrl || s.bannerMobileUrl;
  const mobileVisual = s.photoUrl || (s.showBanner && s.bannerMobileUrl) || s.bannerDesktopUrl;

  return (
    <section id="predicador" className="scroll-mt-28 bg-[#090b0d] py-10 text-white sm:py-12 lg:py-16">
      <Container>
        <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101416] lg:grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="p-6 sm:p-8 lg:flex lg:flex-col lg:justify-center lg:p-12">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-brand-forest">{s.eyebrow || "Predicador invitado"}</span>
              {s.dayLabel ? <span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.12em] text-white/55">{s.dayLabel}</span> : null}
            </div>

            <p className="mt-6 text-sm font-semibold text-brand-gold">{s.role}</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">{s.name}</h2>

            <div className="my-5 h-px bg-white/10" />
            <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/40">Tema</p>
            <h3 className="mt-2 max-w-2xl text-2xl font-semibold leading-[1.08] tracking-[-.03em] sm:text-3xl lg:text-4xl">{s.topic}</h3>
            {s.description ? <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">{s.description}</p> : null}

            {s.church || s.cityCountry ? <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/60">{s.church ? <span className="rounded-full border border-white/12 px-3 py-2">{s.church}</span> : null}{s.cityCountry ? <span className="rounded-full border border-white/12 px-3 py-2">{s.cityCountry}</span> : null}</div> : null}

            {s.ctaEnabled && s.ctaHref ? <a href={s.ctaHref} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-gold px-6 text-sm font-bold text-brand-forest sm:w-auto">{s.ctaText} →</a> : null}
          </div>

          <div className="relative min-h-[260px] bg-black sm:min-h-[340px] lg:min-h-[480px]">
            {desktopVisual || mobileVisual ? <picture>{mobileVisual ? <source media="(max-width:1023px)" srcSet={mobileVisual} /> : null}<img src={desktopVisual || mobileVisual} alt={s.name} className="absolute inset-0 h-full w-full object-cover object-top" /></picture> : <div className="flex h-full min-h-[260px] items-center justify-center p-8 text-center text-sm text-white/35">Cargá una foto desde el panel administrativo.</div>}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-[#101416]/30" />
          </div>
        </article>
      </Container>
    </section>
  );
}
