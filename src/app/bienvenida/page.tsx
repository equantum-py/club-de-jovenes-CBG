"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Header from "@/components/Header";

const CBG_GOLD = "#b8860b";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transform-gpu transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-5 opacity-0"
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const secondaryObjectives = [
  {
    title: "Fomentar la unidad espiritual del grupo",
    description:
      "Promover vínculos centrados en Cristo que trasciendan lo superficial y fortalezcan la vida en comunidad.",
    icon: "🤝",
  },
  {
    title: "Profundizar la comunión cristiana",
    description:
      "Generar espacios intencionales de convivencia, conversación y edificación mutua entre los participantes.",
    icon: "🕊️",
  },
  {
    title: "Alcanzar con el evangelio a invitados e inconstantes",
    description:
      "Presentar el mensaje de salvación de forma clara, directa y relevante a quienes no tienen una fe firme o son nuevos.",
    icon: "📖",
  },
  {
    title: "Consolidar convicciones doctrinales",
    description:
      "Afirmar la comprensión bíblica sobre la gravedad del pecado, la necesidad de salvación y el llamado a la santidad.",
    icon: "🛡️",
  },
  {
    title: "Llamar a una vida rendida a Cristo",
    description:
      "Desafiar a los jóvenes a una entrega total, evidenciada en obediencia, compromiso y transformación práctica.",
    icon: "🔥",
  },
  {
    title: "Facilitar relaciones sanas y edificantes",
    description:
      "Propiciar un ambiente donde surjan amistades genuinas y relaciones que honren a Dios.",
    icon: "🌱",
  },
];

export default function BienvenidaPage() {
  return (
    <div className="min-h-screen bg-[#1e3a5c]">
      <Header />

      <main className="relative min-h-screen overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_34%),linear-gradient(180deg,#1e3a5c_0%,#172f4d_48%,#0f1f33_100%)]"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12 sm:gap-16 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <Reveal className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-white/70 sm:text-sm">
              Jóvenes de CBG
            </p>

            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Bienvenidos al Campamento 2026
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
              Un espacio preparado para escuchar la Palabra de Dios, examinar
              la fe y responder con arrepentimiento genuino.
            </p>
          </Reveal>

          <Reveal>
            <section className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-md sm:rounded-3xl sm:p-10">
              <p
                className="text-xs font-medium uppercase tracking-[0.22em] sm:text-sm"
                style={{ color: CBG_GOLD }}
              >
                Objetivo principal
              </p>

              <p className="mt-4 text-lg leading-relaxed text-white sm:text-xl">
                Exponer a cada acampante al evangelio de Jesucristo.
              </p>

              <p className="mt-4 leading-relaxed text-white/75">
                Que cada participante examine la autenticidad de su fe, evalúe
                sus convicciones y responda con arrepentimiento genuino y fe
                activa.
              </p>

              <blockquote className="mt-7 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-5 text-center sm:px-6">
                <p className="text-base font-medium leading-relaxed text-white sm:text-lg">
                  &ldquo;Examinaos a vosotros mismos si estáis en la
                  fe.&rdquo;
                </p>

                <footer className="mt-2 text-sm text-white/65">
                  1 Corintios 13:5
                </footer>
              </blockquote>
            </section>
          </Reveal>

          <section>
            <Reveal>
              <div className="text-center">
                <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                  Objetivos específicos
                </h2>
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {secondaryObjectives.map((objective, index) => (
                <Reveal
                  key={objective.title}
                  delay={index * 80}
                >
                  <article className="rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/[0.11] hover:shadow-xl sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg">
                        {objective.icon}
                      </span>

                      <span
                        className="text-sm font-medium"
                        style={{ color: CBG_GOLD }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-medium leading-snug text-white sm:text-xl">
                      {objective.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                      {objective.description}
                    </p>

                    {index === 4 && (
                      <p className="mt-4 text-sm leading-relaxed text-white/80">
                        En otras palabras, que la fe que profesen sea real en
                        su día a día.
                      </p>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal>
            <section className="rounded-2xl border border-white/15 bg-white/[0.08] p-6 text-center backdrop-blur-md sm:rounded-3xl sm:p-8">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Sigamos adelante con propósito
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                Continuá revisando la información del campamento y completá tu
                registro cuando estés listo.
              </p>

              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:justify-center">
                <Link
                  href="/campamento"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#1e3a5c] shadow-lg transition hover:scale-[1.02] hover:bg-white/90 sm:px-8 sm:py-4 sm:text-base"
                >
                  Ver información del campamento
                </Link>

                <Link
                  href="/registro"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white/10 sm:px-8 sm:py-4 sm:text-base"
                >
                  Registrarme
                </Link>

                <Link
                  href="/reglamento"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white/10 sm:px-8 sm:py-4 sm:text-base"
                >
                  Reglamento
                </Link>
              </div>
            </section>
          </Reveal>
        </div>
      </main>
    </div>
  );
}