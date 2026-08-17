"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Countdown from "@/components/Countdown";
import { Container } from "@/components/ui/design";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Actividades", href: "/actividades" },
  { label: "Eventos", href: "/eventos" },
  { label: "Galería", href: "/galeria" },
  { label: "Campamento", href: "/campamento" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setIsMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border/70 bg-brand-warmWhite/95 backdrop-blur-md">
      <Container className="flex min-h-[76px] items-center justify-between gap-4 py-2">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Ir al inicio del Club de Jóvenes CBG">
          <Image src="/logo.png" alt="Club de Jóvenes CBG" width={72} height={72} priority className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
          <div className="hidden leading-tight sm:block"><p className="text-sm font-bold tracking-tight text-brand-forest">Jóvenes CBG</p><p className="mt-0.5 text-xs text-brand-muted">Crecer · Compartir · Servir</p></div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`rounded-full px-2.5 py-2 text-xs font-medium transition xl:px-3 xl:text-sm ${active ? "bg-brand-cream text-brand-forest" : "text-brand-muted hover:bg-brand-cream/60 hover:text-brand-forest"}`}>{item.label}</Link>;
          })}
        </nav>

        <div className="hidden items-center gap-3 2xl:flex">
          <div className="border-l border-brand-border pl-3"><p className="text-[10px] font-medium text-brand-muted">Gracia Camp</p><Countdown compact /></div>
          <Link href="/registro" className="inline-flex min-h-11 items-center rounded-full bg-brand-forest px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-forestLight">Inscribirme</Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/registro" className="hidden min-h-11 items-center rounded-full bg-brand-forest px-4 text-sm font-semibold text-white sm:inline-flex">Inscribirme</Link>
          <button type="button" onClick={() => setIsMenuOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border text-brand-forest" aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMenuOpen} aria-controls="menu-principal-mobile"><span className="text-2xl leading-none" aria-hidden="true">{isMenuOpen ? "×" : "☰"}</span></button>
        </div>
      </Container>

      <div id="menu-principal-mobile" className={`overflow-hidden border-t border-brand-border bg-brand-warmWhite transition-[max-height,opacity] duration-300 lg:hidden ${isMenuOpen ? "max-h-[720px] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}>
        <Container className="py-4">
          <nav className="grid" aria-label="Navegación móvil">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return <Link key={`${item.href}-mobile`} href={item.href} aria-current={active ? "page" : undefined} className={`flex min-h-12 items-center justify-between border-b border-brand-border/70 text-base font-medium ${active ? "text-brand-forest" : "text-brand-muted"}`}><span>{item.label}</span>{active ? <span className="h-2 w-2 rounded-full bg-brand-gold" aria-hidden="true" /> : null}</Link>;
            })}
            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="text-xs text-brand-muted">Faltan para Gracia Camp</p><Countdown compact /></div><Link href="/registro" className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-forest px-6 text-sm font-semibold text-white">Inscribirme</Link></div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
