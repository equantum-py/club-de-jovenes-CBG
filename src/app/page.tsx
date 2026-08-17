import Image from "next/image";
import Link from "next/link";

import Header from "@/components/Header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/design";

const pillars = [
  {
    number: "01",
    title: "Palabra",
    text: "Crecer en el conocimiento de Dios y aprender a vivir una fe firme y práctica.",
  },
  {
    number: "02",
    title: "Comunidad",
    text: "Compartir, acompañarnos y construir amistades con propósito dentro y fuera de la iglesia.",
  },
  {
    number: "03",
    title: "Servicio",
    text: "Poner nuestros dones al servicio de Cristo, de la iglesia y de quienes nos rodean.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-brand-forestDark text-white">
          <div className="absolute inset-0">
            <Image
              src="/campamento-hero.jpg"
              alt="Jóvenes reunidos en una actividad del Club de Jóvenes CBG"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-forestDark via-brand-forestDark/85 to-brand-forestDark/45" />
          </div>

          <Container className="relative grid min-h-[680px] items-end gap-10 py-14 sm:min-h-[720px] sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-gold">
                Club de Jóvenes CBG
              </p>
              <h1 className="mt-5 text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-8xl">
                Una generación que quiere vivir su fe con propósito.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
                Un espacio para crecer en la Palabra, compartir en comunidad y servir juntos a Cristo.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/campamento" variant="light" className="px-7">
                  Conocer Gracia Camp 2026
                </ButtonLink>
                <Link
                  href="/bienvenida"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Conocé el club
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex lg:justify-end">
              <div className="max-w-sm border-l border-white/20 pl-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  Próximo gran encuentro
                </p>
                <p className="mt-4 text-3xl font-semibold">Gracia Camp 2026</p>
                <p className="mt-3 leading-7 text-white/65">
                  11 de diciembre · Atyrá, Paraguay. Una experiencia de Palabra, comunión y crecimiento.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-b border-brand-border bg-brand-cream">
          <Container className="grid gap-0 py-0 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.number}
                className="border-b border-brand-border py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-brand-gold">
                  {pillar.number}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-brand-forest">
                  {pillar.title}
                </h2>
                <p className="mt-3 leading-7 text-brand-muted">{pillar.text}</p>
              </article>
            ))}
          </Container>
        </section>

        <section className="py-16 sm:py-20 lg:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Eyebrow>Quiénes somos</Eyebrow>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-brand-forest sm:text-5xl">
                Jóvenes que aprenden, comparten y crecen juntos.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-brand-muted">
                El Club de Jóvenes CBG busca acompañar a una nueva generación en su crecimiento espiritual, personal y comunitario, creando espacios donde la fe pueda ser conocida, examinada y vivida.
              </p>
              <div className="mt-8">
                <ButtonLink href="/bienvenida" variant="secondary">
                  Leer nuestra bienvenida
                </ButtonLink>
              </div>
            </div>

            <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] sm:min-h-[500px]">
              <Image
                src="/bienvenida-bg..jpg"
                alt="Encuentro del Club de Jóvenes CBG"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        </section>

        <section className="bg-brand-forest text-white">
          <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Campamento 2026
              </p>
              <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
                Gracia Camp: una fe examinada, una vida rendida a Cristo.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                Toda la información, el programa, la remera oficial y el registro están disponibles en la página del campamento.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="/campamento" variant="light">
                Ver campamento
              </ButtonLink>
              <Link
                href="/registro"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Inscribirme
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
