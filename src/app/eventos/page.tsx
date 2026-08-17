import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/design";

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
      <Header />
      <main>
        <section className="bg-brand-forestDark py-16 text-white sm:py-24">
          <Container>
            <Eyebrow className="text-brand-sageSoft">Agenda</Eyebrow>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">Próximos encuentros del Club de Jóvenes CBG.</h1>
          </Container>
        </section>
        <section className="py-16 sm:py-24">
          <Container>
            <article className="grid overflow-hidden rounded-[2rem] border border-brand-border bg-brand-cream lg:grid-cols-[220px_1fr_auto] lg:items-center">
              <div className="border-b border-brand-border p-8 lg:border-b-0 lg:border-r">
                <p className="text-6xl font-semibold text-brand-forest">11</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">Diciembre 2026</p>
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-sm font-semibold text-brand-gold">Campamento</p>
                <h2 className="mt-2 text-3xl font-semibold text-brand-forest sm:text-4xl">Gracia Camp 2026</h2>
                <p className="mt-4 max-w-2xl leading-7 text-brand-muted">Atyrá, Paraguay · Una experiencia de Palabra, comunión, reflexión y crecimiento para los jóvenes de CBG e invitados.</p>
              </div>
              <div className="px-8 pb-8 lg:p-10"><ButtonLink href="/campamento">Ver detalles</ButtonLink></div>
            </article>
            <div className="mt-12 border-t border-brand-border pt-8">
              <p className="text-lg font-semibold text-brand-forest">Más actividades próximamente</p>
              <p className="mt-2 text-brand-muted">La agenda se irá actualizando con nuevos encuentros y actividades del Club.</p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
