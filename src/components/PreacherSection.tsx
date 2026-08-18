"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const tema = document.querySelector("#tema");
    if (tema) {
      let node = document.getElementById("predicador-mount");
      if (!node) {
        node = document.createElement("div");
        node.id = "predicador-mount";
        tema.insertAdjacentElement("afterend", node);
      }
      setMount(node);
    }

    fetch("/api/predicador", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then(setSettings)
      .catch(() => {});
  }, []);

  if (!mount || !settings?.sectionEnabled) return null;

  const s = settings;
  const desktopVisual =
    (s.showBanner && s.bannerDesktopUrl) || s.photoUrl || s.bannerMobileUrl;
  const mobileVisual =
    s.photoUrl || (s.showBanner && s.bannerMobileUrl) || s.bannerDesktopUrl;

  const section = (
    <section
      id="predicador"
      className="scroll-mt-28 bg-[#090b0d] py-10 text-white sm:py-12 lg:py-16"
    >
      <Container>
        <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101416] shadow-2xl shadow-black/20 lg:grid lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
          <div className="order-2 p-6 sm:p-8 lg:order-1 lg:flex lg:flex-col lg:justify-center lg:p-12 xl:p-14">
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
              <p className="text-sm font-medium text-brand-gold">
                {s.role || "Pastor"}
              </p>
              <h2 className="mt-1 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">
                {s.name}
              </h2>
            </div>

            <div className="my-6 h-px bg-white/10" />

            <p className="text-xs font-semibold uppercase tracking-[.16em] text-white/45">
              Tema
            </p>
            <h3 className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-.035em] sm:text-4xl lg:text-[2.7rem]">
              {s.topic}
            </h3>

            {s.description ? (
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                {s.description}
              </p>
            ) : null}

            {s.church || s.cityCountry ? (
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/60 sm:text-sm">
                {s.church ? (
                  <span className="rounded-full border border-white/12 px-3 py-2">
                    {s.church}
                  </span>
                ) : null}
                {s.cityCountry ? (
                  <span className="rounded-full border border-white/12 px-3 py-2">
                    {s.cityCountry}
                  </span>
                ) : null}
              </div>
            ) : null}

            {s.ctaEnabled && s.ctaHref ? (
              <a
                href={s.ctaHref}
                className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-gold px-6 text-sm font-bold text-brand-forest sm:w-auto"
              >
                {s.ctaText} →
              </a>
            ) : null}
          </div>

          <div className="order-1 relative min-h-[300px] bg-black sm:min-h-[380px] lg:order-2 lg:min-h-[520px]">
            {desktopVisual || mobileVisual ? (
              <picture>
                {mobileVisual ? (
                  <source media="(max-width: 1023px)" srcSet={mobileVisual} />
                ) : null}
                <img
                  src={desktopVisual || mobileVisual}
                  alt={s.name}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </picture>
            ) : (
              <div className="flex h-full min-h-[300px] items-center justify-center p-8 text-center text-sm text-white/35">
                Cargá una foto del predicador desde el panel administrativo.
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-[#101416]/35" />

            <div className="absolute bottom-5 left-5 right-5 lg:hidden">
              <div className="inline-flex rounded-full bg-black/55 px-3 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm">
                {s.name}
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );

  return createPortal(section, mount);
}
