import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Container, Eyebrow } from "@/components/ui/design";

const values = [
  ["Cristo al centro", "Buscamos que cada actividad, decisión y relación apunte a Cristo."],
  ["Palabra", "Queremos conocer la Biblia, comprenderla y vivirla de manera práctica."],
  ["Comunidad", "Creemos en amistades sanas, acompañamiento y crecimiento compartido."],
  ["Servicio", "Entendemos nuestros dones como una oportunidad para servir a Dios y a otros."],
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
      <Header />
      <main>
        <section className="bg-brand-forest py-16 text-white sm:py-24">
          <Container>
            <Eyebrow className="text-brand-sageSoft">El Ministerio</Eyebrow>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">Una comunidad para crecer en la fe y caminar juntos.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">El Ministerio de Jóvenes CBG reúne a jóvenes que desean conocer más a Cristo, fortalecer su fe y construir relaciones con propósito.</p>
          </Container>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Eyebrow>Nuestra esencia</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-brand-forest sm:text-5xl">No buscamos solamente reunirnos. Queremos crecer.</h2>
              <p className="mt-6 text-lg leading-8 text-brand-muted">Creamos espacios de enseñanza bíblica, conversación, amistad, servicio y actividades especiales para acompañar a cada joven en una fe más firme y genuina.</p>
            </div>
            <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] sm:min-h-[500px]">
              <Image src="/bienvenida-bg..jpg" alt="Jóvenes del Ministerio CBG compartiendo juntos" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
          </Container>
        </section>

        <section className="bg-brand-cream py-16 sm:py-20">
          <Container>
            <Eyebrow>Lo que nos guía</Eyebrow>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {values.map(([title, text], index) => (
                <article key={title} className="border-t border-brand-border pt-6">
                  <span className="text-sm font-semibold text-brand-gold">0{index + 1}</span>
                  <h3 className="mt-3 text-2xl font-semibold text-brand-forest">{title}</h3>
                  <p className="mt-3 max-w-xl leading-7 text-brand-muted">{text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
