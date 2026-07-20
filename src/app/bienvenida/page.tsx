import Header from "@/components/Header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/design";

const objectives = [
  [
    "Fomentar la unidad espiritual del grupo",
    "Promover vínculos centrados en Cristo que trasciendan lo superficial y fortalezcan la vida en comunidad.",
  ],
  [
    "Profundizar la comunión cristiana",
    "Generar espacios intencionales de convivencia, conversación y edificación mutua entre los participantes.",
  ],
  [
    "Alcanzar con el evangelio a invitados e inconstantes",
    "Presentar el mensaje de salvación de forma clara, directa y relevante a quienes no tienen una fe firme o son nuevos.",
  ],
  [
    "Consolidar convicciones doctrinales",
    "Afirmar la comprensión bíblica sobre la gravedad del pecado, la necesidad de salvación y el llamado a la santidad.",
  ],
  [
    "Llamar a una vida rendida a Cristo",
    "Desafiar a los jóvenes a una entrega total, evidenciada en obediencia, compromiso y transformación práctica. En otras palabras, que la fe que profesen sea real en su día a día.",
  ],
  [
    "Facilitar relaciones sanas y edificantes",
    "Propiciar un ambiente donde surjan amistades genuinas y relaciones que honren a Dios.",
  ],
];

export default function BienvenidaPage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
      <Header />
      <main>
        <section className="bg-brand-forest py-16 text-white sm:py-24">
          <Container>
            <Eyebrow className="text-brand-sageSoft">Jóvenes de CBG</Eyebrow>
            <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              Bienvenidos al Campamento 2026
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75 sm:text-xl">
              Un espacio preparado para escuchar la Palabra de Dios, examinar la
              fe y responder con arrepentimiento genuino.
            </p>
          </Container>
        </section>

        <section className="bg-brand-cream py-16 sm:py-20">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Eyebrow>Objetivo principal</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-forest sm:text-5xl">
                Exponer a cada acampante al evangelio de Jesucristo.
              </h2>
            </div>
            <div className="text-lg leading-9 text-brand-muted">
              <p>
                Que cada participante examine la autenticidad de su fe, evalúe
                sus convicciones y responda con arrepentimiento genuino y fe
                activa.
              </p>
              <blockquote className="mt-8 border-l-2 border-brand-gold pl-5 text-2xl leading-10 text-brand-forest">
                &ldquo;Examinaos a vosotros mismos si estáis en la fe.&rdquo;
                <footer className="mt-3 text-sm font-medium text-brand-muted">
                  1 Corintios 13:5
                </footer>
              </blockquote>
            </div>
          </Container>
        </section>

        <section className="bg-brand-warmWhite py-16 sm:py-24">
          <Container>
            <div className="max-w-3xl">
              <Eyebrow>Objetivos específicos</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
                Un recorrido espiritual con propósito.
              </h2>
            </div>
            <div className="mt-12 grid gap-x-12 lg:grid-cols-2">
              {objectives.map(([title, description], index) => (
                <article
                  key={title}
                  className="grid grid-cols-[56px_1fr] gap-4 border-t border-brand-border py-7"
                >
                  <span className="text-3xl font-semibold text-brand-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold leading-snug text-brand-forest">
                      {title}
                    </h3>
                    <p className="mt-3 leading-7 text-brand-muted">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-brand-forest py-14 text-white">
          <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">
                Sigamos adelante con propósito
              </h2>
              <p className="mt-3 max-w-2xl text-white/70">
                Continuá revisando la información del campamento y completá tu
                registro cuando estés listo.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/campamento" variant="light">
                Ver campamento
              </ButtonLink>
              <ButtonLink
                href="/registro"
                variant="secondary"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                Registrarme
              </ButtonLink>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
