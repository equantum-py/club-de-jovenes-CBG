import Header from "@/components/Header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/design";

const REGLAS = [
  [
    "Puntualidad",
    "Todos los participantes deben respetar los horarios establecidos para actividades, comidas y reuniones.",
  ],
  [
    "Respeto y sujeción",
    "Cada acampante debe mantener una actitud de respeto hacia líderes, encargados y demás participantes.",
  ],
  [
    "Cuidado del testimonio",
    "El comportamiento dentro y fuera de las actividades debe reflejar una conducta digna y coherente con la fe cristiana.",
  ],
  [
    "Uso responsable de pertenencias",
    "Cada participante es responsable del cuidado de sus objetos personales y del buen uso de las instalaciones.",
  ],
  [
    "Orden y limpieza",
    "Se espera colaboración en el orden, limpieza de habitaciones y cuidado general del lugar.",
  ],
  [
    "Participación en actividades",
    "Todos deben participar con disposición en las actividades programadas, salvo indicación contraria del equipo responsable.",
  ],
  [
    "Cuidado físico y salud",
    "Cualquier malestar, medicación o situación médica debe informarse inmediatamente a los responsables.",
  ],
  [
    "Relaciones sanas",
    "Las interacciones entre participantes deben mantenerse en pureza, respeto y edificación mutua.",
  ],
  [
    "Prohibiciones",
    "No se permitirá ninguna conducta que atente contra el propósito espiritual, la seguridad o el orden del campamento.",
  ],
];

export default function ReglamentoPage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
      <Header />
      <main>
        <section className="bg-brand-cream py-16 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Eyebrow>Club de Jóvenes CBG</Eyebrow>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-brand-forest sm:text-6xl">
                Reglamento del Campamento Jóvenes CBG 2026
              </h1>
            </div>
            <div className="text-lg leading-9 text-brand-muted">
              <p>Querido acampante:</p>
              <p className="mt-4">
                Gracias por inscribirte al Campamento CBG 2026. Es un verdadero
                gozo contar contigo.
              </p>
              <p className="mt-4">
                Nuestro anhelo es que este tiempo sea de bendición y
                transformación para tu vida.
              </p>
              <p className="mt-4">
                Deseamos honrar a Dios en cada detalle de esta actividad. Por
                ello, buscamos que todo se realice con orden, respeto y
                excelencia, conforme a principios que le agradan.
              </p>
              <p className="mt-4">
                Las siguientes normas tienen como propósito facilitar el
                desarrollo del campamento y cuidar el bienestar espiritual y
                físico de todos.
              </p>
            </div>
          </Container>
        </section>

        <section className="bg-brand-warmWhite py-16 sm:py-24">
          <Container>
            <div className="grid gap-x-14 lg:grid-cols-2">
              {REGLAS.map(([titulo, descripcion], index) => (
                <article
                  key={titulo}
                  className="grid grid-cols-[64px_1fr] gap-5 border-t border-brand-border py-8"
                >
                  <span className="text-4xl font-semibold text-brand-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-2xl font-semibold text-brand-forest">
                      {titulo}
                    </h2>
                    <p className="mt-3 leading-8 text-brand-muted">
                      {descripcion}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-brand-forest py-14 text-white">
          <Container className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-3xl text-lg leading-8 text-white/80">
              Estas normas no buscan solo mantener el orden, sino ayudar a que
              cada participante aproveche este tiempo para crecer, escuchar la
              Palabra de Dios y convivir de una manera que honre a Cristo.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/registro"
                variant="secondary"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Volver al registro
              </ButtonLink>
              <ButtonLink href="/campamento" variant="light">
                Finalizar
              </ButtonLink>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
