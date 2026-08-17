import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Container, Eyebrow } from "@/components/ui/design";

const whatsappUrl = "https://wa.me/595985194953?text=Hola%2C%20quisiera%20consultar%20sobre%20el%20Club%20de%20J%C3%B3venes%20CBG.";

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
      <Header />
      <main>
        <section className="bg-brand-cream py-16 sm:py-24">
          <Container>
            <Eyebrow>Contacto</Eyebrow>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-brand-forest sm:text-6xl lg:text-7xl">¿Querés saber más o participar?</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-muted">Escribinos para conocer las próximas actividades, consultar sobre Gracia Camp o acercarte al Club de Jóvenes CBG.</p>
          </Container>
        </section>
        <section className="py-16 sm:py-24">
          <Container className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[2rem] bg-brand-forest p-8 text-white sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">WhatsApp</p>
              <h2 className="mt-4 text-3xl font-semibold">Hablemos directamente</h2>
              <p className="mt-4 leading-7 text-white/65">Para consultas sobre actividades, inscripciones o el campamento.</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-brand-forest">Escribir por WhatsApp</a>
            </article>
            <article className="rounded-[2rem] border border-brand-border bg-white p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">Gracia Camp 2026</p>
              <h2 className="mt-4 text-3xl font-semibold text-brand-forest">11 de diciembre · Atyrá</h2>
              <p className="mt-4 leading-7 text-brand-muted">Si tu consulta es sobre el campamento, podés revisar primero toda la información disponible.</p>
              <a href="/campamento" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-brand-border px-6 text-sm font-semibold text-brand-forest">Ver campamento</a>
            </article>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
