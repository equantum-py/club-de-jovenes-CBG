import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/design";

const pillars = [
  { number: "01", title: "Palabra", text: "Conocer a Dios, entender la Biblia y llevar una fe real a cada día." },
  { number: "02", title: "Comunidad", text: "Encontrar amigos, acompañarnos y crecer juntos con propósito." },
  { number: "03", title: "Servicio", text: "Usar nuestros dones para servir a Cristo, a la iglesia y a otros." },
];

const quickLinks = [
  ["Quiero participar", "Sumate al próximo Gracia Camp y viví la experiencia.", "/registro", "Inscribirme"],
  ["Quiero conocernos", "Descubrí quiénes somos, qué creemos y por qué hacemos esto.", "/nosotros", "Conocer el ministerio"],
  ["Quiero ver qué hacemos", "Encuentros, campamentos, servicio y momentos que vivimos juntos.", "/actividades", "Ver actividades"],
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
      <Header />
      <main>
        <section className="relative isolate overflow-hidden bg-brand-forestDark text-white">
          <div className="absolute inset-0 -z-20">
            <Image src="/campamento-hero.jpg" alt="Jóvenes del Ministerio de Jóvenes CBG reunidos" fill priority sizes="100vw" className="object-cover object-center" />
          </div>
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,48,38,.97)_0%,rgba(5,48,38,.87)_48%,rgba(5,48,38,.48)_100%)]" />
          <div className="absolute -right-24 top-20 -z-10 h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96" />

          <Container className="grid min-h-[610px] items-end gap-10 py-14 sm:min-h-[680px] sm:py-20 lg:min-h-[720px] lg:grid-cols-[1.12fr_.88fr] lg:items-center lg:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-brand-sageSoft backdrop-blur-sm">
                Ministerio de Jóvenes CBG
              </div>
              <h1 className="mt-6 max-w-4xl text-[clamp(3.2rem,8vw,7.2rem)] font-semibold leading-[.88] tracking-[-.055em]">Fe que se vive.<br />Amigos que suman.<br /><span className="text-brand-gold">Propósito real.</span></h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">Un ministerio para jóvenes que quieren conocer más a Cristo, compartir en comunidad y crecer juntos en cada etapa.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/registro" variant="light" className="min-h-12 px-7">Quiero ser parte</ButtonLink>
                <Link href="/nosotros" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition hover:bg-white/10">Conocer el ministerio →</Link>
              </div>
            </div>

            <div className="hidden self-end pb-5 lg:block lg:self-center lg:pb-0">
              <div className="ml-auto max-w-sm rounded-[2rem] border border-white/15 bg-white/10 p-7 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-gold">Próximo encuentro</p>
                <p className="mt-4 text-3xl font-semibold">Gracia Camp 2026</p>
                <p className="mt-3 leading-7 text-white/70">11 de diciembre · Atyrá, Paraguay</p>
                <div className="mt-6 h-px bg-white/15" />
                <p className="mt-5 text-sm leading-6 text-white/65">Palabra, comunidad, actividades y un tiempo para volver a lo esencial.</p>
                <ButtonLink href="/campamento" variant="light" className="mt-6 w-full">Ver campamento</ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-b border-brand-border bg-brand-cream py-5">
          <Container className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-center text-xs font-semibold uppercase tracking-[.13em] text-brand-forest sm:text-sm">
            <span>✦ Cristo al centro</span><span className="text-brand-gold">•</span><span>✦ Comunidad real</span><span className="text-brand-gold">•</span><span>✦ Jóvenes con propósito</span>
          </Container>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-3xl">
              <Eyebrow>Empezá por acá</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-.035em] text-brand-forest sm:text-5xl lg:text-6xl">¿Qué estás buscando?</h2>
              <p className="mt-5 text-lg leading-8 text-brand-muted">La página te lleva directo a lo importante, sin hacerte buscar entre demasiada información.</p>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {quickLinks.map(([title, text, href, cta], index) => (
                <article key={title} className="group flex min-h-[280px] flex-col rounded-[2rem] border border-brand-border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-forest/5 sm:p-8">
                  <span className="text-sm font-semibold text-brand-gold">0{index + 1}</span>
                  <h3 className="mt-8 text-2xl font-semibold text-brand-forest sm:text-3xl">{title}</h3>
                  <p className="mt-4 leading-7 text-brand-muted">{text}</p>
                  <Link href={href} className="mt-auto pt-8 text-sm font-semibold text-brand-forest">{cta} →</Link>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="overflow-hidden bg-brand-forest text-white">
          <Container className="grid lg:grid-cols-[.92fr_1.08fr] lg:items-stretch">
            <div className="py-16 sm:py-20 lg:py-24 lg:pr-14">
              <Eyebrow className="text-brand-gold">Nuestro propósito</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.03] tracking-[-.035em] sm:text-5xl">No queremos solamente reunir jóvenes.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">Queremos acompañar una generación que conozca a Cristo, haga preguntas, construya amistades sanas y aprenda a vivir su fe fuera de una reunión.</p>
              <div className="mt-10 grid gap-7 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {pillars.map((pillar) => <div key={pillar.number} className="border-t border-white/15 pt-5"><span className="text-xs font-semibold text-brand-gold">{pillar.number}</span><h3 className="mt-2 text-xl font-semibold">{pillar.title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{pillar.text}</p></div>)}
              </div>
            </div>
            <div className="relative min-h-[420px] overflow-hidden lg:min-h-full lg:translate-x-8">
              <Image src="/bienvenida-bg..jpg" alt="Jóvenes compartiendo en el Ministerio de Jóvenes CBG" fill sizes="(min-width:1024px) 55vw,100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/40 to-transparent lg:bg-gradient-to-r" />
            </div>
          </Container>
        </section>

        <section className="bg-brand-cream py-16 sm:py-20 lg:py-24">
          <Container className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow>Gracia Camp 2026</Eyebrow>
              <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.03] tracking-[-.035em] text-brand-forest sm:text-5xl lg:text-6xl">Un fin de semana para salir de la rutina y volver a lo esencial.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-muted">Conocé el lugar, tema, remera, reglamento y todo lo que necesitás antes de inscribirte.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink href="/campamento" className="min-h-12 px-7">Explorar Gracia Camp</ButtonLink>
              <ButtonLink href="/registro" variant="secondary" className="min-h-12 px-7">Inscribirme</ButtonLink>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
