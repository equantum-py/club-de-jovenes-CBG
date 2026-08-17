"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Countdown from "@/components/Countdown";
import { Container } from "@/components/ui/design";

const navItems = [
  {
    label: "Inicio",
    href: "/campamento",
  },
  {
    label: "Bienvenida",
    href: "/bienvenida",
  },
  {
    label: "Registro",
    href: "/registro",
  },
  {
    label: "Reglamento",
    href: "/reglamento",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") { setIsMenuOpen(false); menuButtonRef.current?.focus(); } };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  function isCurrentRoute(href: string) {
    return pathname === href;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border/70 bg-brand-warmWhite/95 backdrop-blur-sm">
      <Container className="flex min-h-[76px] items-center justify-between gap-4 py-3">
        <Link
          href="/campamento"
          className="flex shrink-0 items-center gap-3"
          aria-label="Ir al inicio de Gracia Camp"
        >
          <Image
            src="/logo.png"
            alt="Gracia Camp"
            width={74}
            height={74}
            priority
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />

          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold text-brand-forest">
              Jóvenes CBG
            </p>

            <p className="text-xs text-brand-muted">
              Gracia Camp 2026
            </p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full bg-brand-cream px-2 py-2 lg:flex"
          aria-label="Navegación principal"
        >
          {navItems.map((item) => {
            const isActive = isCurrentRoute(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-warmWhite text-brand-forest shadow-soft"
                    : "text-brand-muted hover:text-brand-forest"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <div className="border-l border-brand-border pl-5">
            <p className="text-xs font-medium text-brand-muted">
              Faltan para el campamento
            </p>

            <Countdown compact />
          </div>

          <Link
            href="/registro"
            className="inline-flex min-h-11 items-center rounded-full bg-brand-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-forestLight"
          >
            Inscribirme
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/registro"
            className="hidden min-h-11 items-center rounded-full bg-brand-forest px-4 text-sm font-semibold text-white transition hover:bg-brand-forestLight sm:inline-flex"
          >
            Inscribirme
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() =>
              setIsMenuOpen((currentValue) => !currentValue)
            }
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border text-brand-forest transition hover:bg-brand-cream lg:hidden"
            aria-label={
              isMenuOpen
                ? "Cerrar menú de navegación"
                : "Abrir menú de navegación"
            }
            aria-expanded={isMenuOpen}
            aria-controls="menu-principal-mobile"
          >
            <span
              className="text-2xl leading-none"
              aria-hidden="true"
            >
              {isMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </Container>

      <div
        id="menu-principal-mobile"
        aria-hidden={!isMenuOpen}
        className={`overflow-hidden border-t border-brand-border bg-brand-warmWhite transition-[max-height,opacity] duration-300 lg:hidden ${
          isMenuOpen
            ? "max-h-[520px] opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <Container className="py-5">
          <nav
            className="grid gap-2"
            aria-label="Navegación móvil"
          >
            {navItems.map((item) => {
              const isActive = isCurrentRoute(item.href);

              return (
                <Link
                  key={`${item.href}-mobile`}
                  href={item.href}
                  tabIndex={isMenuOpen ? 0 : -1}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-12 items-center justify-between border-b border-brand-border/70 py-3 text-base font-medium ${
                    isActive
                      ? "text-brand-forest"
                      : "text-brand-muted"
                  }`}
                >
                  <span>{item.label}</span>

                  {isActive ? (
                    <span
                      className="h-2 w-2 rounded-full bg-brand-gold"
                      aria-hidden="true"
                    />
                  ) : null}
                </Link>
              );
            })}

            <div className="mt-3 grid gap-4 border-t border-brand-border pt-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-xs text-brand-muted">
                  Faltan para el campamento
                </p>

                <Countdown compact />
              </div>

              <Link
                href="/registro"
                tabIndex={isMenuOpen ? 0 : -1}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-forest px-5 text-sm font-semibold text-white transition hover:bg-brand-forestLight"
              >
                Inscribirme
              </Link>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
