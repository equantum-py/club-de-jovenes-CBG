import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/design";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-forestDark text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:py-16">
        <div className="max-w-md">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/logo.png" alt="Ministerio de Jóvenes CBG" width={64} height={64} className="h-14 w-14 object-contain" />
            <div>
              <p className="font-semibold">Ministerio de Jóvenes CBG</p>
              <p className="text-sm text-white/55">Crecer · Compartir · Servir</p>
            </div>
          </Link>
          <p className="mt-5 text-sm leading-7 text-white/60">
            Una comunidad de jóvenes que busca conocer a Cristo, crecer en su Palabra y vivir la fe con propósito.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">Explorar</p>
          <div className="mt-4 grid gap-3 text-sm text-white/65">
            <Link href="/bienvenida" className="hover:text-white">El Ministerio</Link>
            <Link href="/campamento" className="hover:text-white">Gracia Camp 2026</Link>
            <Link href="/reglamento" className="hover:text-white">Reglamento</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">Campamento</p>
          <p className="mt-4 text-sm leading-7 text-white/60">11 de diciembre de 2026<br />Atyrá, Paraguay</p>
          <Link href="/registro" className="mt-5 inline-flex text-sm font-semibold text-white underline decoration-brand-gold underline-offset-4">Inscribirme</Link>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Ministerio de Jóvenes CBG.</p>
          <p>Hecho con propósito.</p>
        </Container>
      </div>
    </footer>
  );
}
