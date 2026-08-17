"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Countdown from "@/components/Countdown";
import { Container } from "@/components/ui/design";
import type { SiteSettings } from "@/lib/site-settings";

type Config = SiteSettings & {
  logoUrl?: string;
  bannerDesktopUrl?: string;
  bannerMobileUrl?: string;
};

type Props = { settings?: Config };

const fallback: Config = {
  siteName: "Jóvenes CBG",
  siteTagline: "Crecer · Compartir · Servir",
  showLogo: true,
  showSiteText: true,
  logoSizeMobile: 56,
  logoSizeTablet: 64,
  logoSizeDesktop: 140,
  stickyHeader: true,
  showCountdown: true,
  countdownLabel: "Gracia Camp",
  showCta: true,
  ctaText: "Inscribirme",
  ctaHref: "/registro",
  nav: { inicio: true, nosotros: true, actividades: true, eventos: true, galeria: true, campamento: true, contacto: true },
  showBanner: false,
  bannerHref: "",
  bannerAlt: "Banner",
  bannerMaxHeightDesktop: 260,
  bannerMaxHeightMobile: 220,
  logoPath: "",
  bannerDesktopPath: "",
  bannerMobilePath: "",
  logoUrl: "/logo.png",
  bannerDesktopUrl: "",
  bannerMobileUrl: "",
};

const base = [
  ["inicio", "Inicio", "/"],
  ["nosotros", "Nosotros", "/nosotros"],
  ["actividades", "Actividades", "/actividades"],
  ["eventos", "Eventos", "/eventos"],
  ["galeria", "Galería", "/galeria"],
  ["campamento", "Campamento", "/campamento"],
  ["contacto", "Contacto", "/contacto"],
] as const;

export default function Header({ settings }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [s, setS] = useState<Config>(settings || fallback);
  const [logoSrc, setLogoSrc] = useState(settings?.logoUrl || "/logo.png");

  useEffect(() => {
    if (settings) {
      setS(settings);
      setLogoSrc(settings.logoUrl || "/logo.png");
      return;
    }
    fetch("/api/site-settings", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data) {
          setS(data);
          setLogoSrc(data.logoUrl || "/logo.png");
        }
      })
      .catch(() => undefined);
  }, [settings]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const nav = base.filter(([key]) => s.nav[key] !== false);

  const bannerImage = (
    <picture>
      {s.bannerMobileUrl ? <source media="(max-width: 767px)" srcSet={s.bannerMobileUrl} /> : null}
      <img
        src={s.bannerDesktopUrl || s.bannerMobileUrl}
        alt={s.bannerAlt}
        className="dynamic-banner block w-full object-cover"
      />
    </picture>
  );

  return (
    <>
      <style jsx>{`
        .dynamic-logo {
          width: ${s.logoSizeMobile}px;
          height: auto;
          max-height: 58px;
        }
        .dynamic-banner { max-height: ${s.bannerMaxHeightMobile}px; }
        @media (min-width: 640px) {
          .dynamic-logo {
            width: ${s.logoSizeTablet}px;
            max-height: 68px;
          }
        }
        @media (min-width: 1024px) {
          .dynamic-logo {
            width: ${s.logoSizeDesktop}px;
            max-height: 82px;
          }
          .dynamic-banner { max-height: ${s.bannerMaxHeightDesktop}px; }
        }
      `}</style>

      <header className={`${s.stickyHeader ? "sticky top-0" : ""} z-50 border-b border-brand-border/70 bg-brand-warmWhite/95 backdrop-blur-md`}>
        <Container className="flex min-h-[68px] items-center justify-between gap-3 py-2 lg:grid lg:grid-cols-[minmax(180px,1fr)_auto_minmax(260px,1fr)] lg:gap-6">
          <Link href="/" className="flex min-w-0 items-center gap-3 lg:justify-self-start">
            {s.showLogo ? (
              <img
                src={logoSrc}
                alt={s.siteName || "Gracia Camp"}
                onError={() => setLogoSrc("/logo.png")}
                className="dynamic-logo shrink-0 object-contain"
              />
            ) : null}
            {s.showSiteText && (s.siteName || s.siteTagline) ? (
              <div className="hidden min-w-0 leading-tight md:block">
                {s.siteName ? <p className="truncate text-sm font-bold text-brand-forest">{s.siteName}</p> : null}
                {s.siteTagline ? <p className="mt-0.5 truncate text-xs text-brand-muted">{s.siteTagline}</p> : null}
              </div>
            ) : null}
          </Link>

          <nav className="hidden items-center justify-center gap-0.5 lg:flex" aria-label="Navegación principal">
            {nav.map(([, label, href]) => (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${pathname === href ? "bg-brand-cream text-brand-forest" : "text-brand-muted hover:bg-brand-cream/60 hover:text-brand-forest"}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center justify-self-end gap-3 lg:flex">
            {s.showCountdown ? (
              <div className="border-l border-brand-border pl-4">
                <p className="text-[10px] font-medium text-brand-muted">{s.countdownLabel}</p>
                <Countdown compact />
              </div>
            ) : null}
            {s.showCta ? (
              <Link href={s.ctaHref} className="inline-flex min-h-11 items-center rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-forestLight">
                {s.ctaText}
              </Link>
            ) : null}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white text-brand-forest"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              <span className="text-2xl leading-none">{open ? "×" : "☰"}</span>
            </button>
          </div>
        </Container>

        <div className={`overflow-hidden border-t border-brand-border bg-brand-warmWhite transition-all lg:hidden ${open ? "max-h-[760px] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}>
          <Container className="py-4">
            <nav className="grid" aria-label="Navegación móvil">
              {nav.map(([, label, href]) => (
                <Link key={`${href}-mobile`} href={href} className="flex min-h-12 items-center justify-between border-b border-brand-border/70 text-base font-medium text-brand-muted">
                  {label}
                  {pathname === href ? <span className="h-2 w-2 rounded-full bg-brand-gold" /> : null}
                </Link>
              ))}
              {(s.showCountdown || s.showCta) ? (
                <div className="mt-5 rounded-2xl bg-brand-cream p-4">
                  {s.showCountdown ? <><p className="text-xs text-brand-muted">{s.countdownLabel}</p><div className="mt-1"><Countdown compact /></div></> : null}
                  {s.showCta ? <Link href={s.ctaHref} className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-forest px-6 text-sm font-semibold text-white">{s.ctaText}</Link> : null}
                </div>
              ) : null}
            </nav>
          </Container>
        </div>
      </header>

      {s.showBanner && (s.bannerDesktopUrl || s.bannerMobileUrl) ? (
        <div className="w-full overflow-hidden bg-brand-cream">
          {s.bannerHref ? <Link href={s.bannerHref} className="block">{bannerImage}</Link> : bannerImage}
        </div>
      ) : null}
    </>
  );
}
