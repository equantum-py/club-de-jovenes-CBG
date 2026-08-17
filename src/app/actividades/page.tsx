import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/design";

const activities = [
  ["Encuentros de jóvenes", "Reuniones para compartir la Palabra, conversar, orar y crecer juntos."],
  ["Campamentos", "Experiencias especiales de varios días enfocadas en enseñanza bíblica, comunión y reflexión."],
  ["Actividades recreativas", "Momentos para compartir, conocernos mejor y fortalecer la amistad dentro del grupo."],
  ["Servicio", "Oportunidades para involucrarnos, colaborar y poner nuestros dones al servicio de otros."],
];

export default function ActividadesPage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
      <Header />
      <main>
        <section className="bg-brand-cream py-16 sm:py-24">
          <Container>
            <Eyebrow>Vida del Club</Eyebrow>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-brand-forest sm:text-6xl lg:text-7xl">Momentos para aprender, compartir y construir comunidad.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-brand-muted">El Club no es solamente un evento. Durante el año buscamos crear diferentes espacios para encontrarnos y crecer juntos.</p>
          </Container>
        </section>

        <section className="py-16 sm:py-24">
          <Container className="grid gap-5 md:grid-cols-2">
            {activities.map(([title, text], index) => (
              <article key={title} className="min-h-[260px] rounded-[2rem] border border-brand-border bg-white p-7 sm:p-9">
                <p className="text-sm font-semibold text-brand-gold">0{index + 1}</p>
                <h2 className="mt-8 text-3xl font-semibold text-brand-forest">{title}</h2>
                <p className="mt-4 max-w-lg leading-8 text-brand-muted">{text}</p>
              </article>
            ))}
          </Container>
        </section>

        <section className="bg-brand-forest py-14 text-white">
          <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="text-3xl font-semibold">Nuestro próximo gran encuentro</h2><p className="mt-2 text-white/65">Conocé todos los detalles de Gracia Camp 2026.</p></div>
            <ButtonLink href="/campamento" variant="light">Ver Gracia Camp</ButtonLink>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
