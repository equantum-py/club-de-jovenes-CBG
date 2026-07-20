"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";

/* ─── CBG Brand Colors ─── */
const CBG = {
  navy: "#1e3a5c",
  gold: "#b8860b",
  cream: "#f8f6f1",
};

type Regla = {
  titulo: string;
  descripcion: string;
};

const REGLAS: Regla[] = [
  {
    titulo: "Puntualidad",
    descripcion:
      "Todos los participantes deben respetar los horarios establecidos para actividades, comidas y reuniones.",
  },
  {
    titulo: "Respeto y sujeción",
    descripcion:
      "Cada acampante debe mantener una actitud de respeto hacia líderes, encargados y demás participantes.",
  },
  {
    titulo: "Cuidado del testimonio",
    descripcion:
      "El comportamiento dentro y fuera de las actividades debe reflejar una conducta digna y coherente con la fe cristiana.",
  },
  {
    titulo: "Uso responsable de pertenencias",
    descripcion:
      "Cada participante es responsable del cuidado de sus objetos personales y del buen uso de las instalaciones.",
  },
  {
    titulo: "Orden y limpieza",
    descripcion:
      "Se espera colaboración en el orden, limpieza de habitaciones y cuidado general del lugar.",
  },
  {
    titulo: "Participación en actividades",
    descripcion:
      "Todos deben participar con disposición en las actividades programadas, salvo indicación contraria del equipo responsable.",
  },
  {
    titulo: "Cuidado físico y salud",
    descripcion:
      "Cualquier malestar, medicación o situación médica debe informarse inmediatamente a los responsables.",
  },
  {
    titulo: "Relaciones sanas",
    descripcion:
      "Las interacciones entre participantes deben mantenerse en pureza, respeto y edificación mutua.",
  },
  {
    titulo: "Prohibiciones",
    descripcion:
      "No se permitirá ninguna conducta que atente contra el propósito espiritual, la seguridad o el orden del campamento.",
  },
];

export default function ReglamentoPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="min-h-screen text-white" style={{ backgroundColor: CBG.navy }}>
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10">
          <Reveal>
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
                Club de Jóvenes CBG
              </p>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                Reglamento del Campamento Jóvenes CBG 2026
              </h1>

              <p className="mt-8 max-w-4xl whitespace-pre-line text-base leading-8 text-white/80 sm:text-lg">
                {`Querido acampante:
Gracias por inscribirte al Campamento CBG 2026. Es un verdadero gozo contar contigo.
Nuestro anhelo es que este tiempo sea de bendición y transformación para tu vida.
Deseamos honrar a Dios en cada detalle de esta actividad. Por ello, buscamos que todo se realice con orden, respeto y excelencia, conforme a principios que le agradan.
Las siguientes normas tienen como propósito facilitar el desarrollo del campamento y cuidar el bienestar espiritual y físico de todos.`}
              </p>
            </section>
          </Reveal>

          <section className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {REGLAS.map((regla, index) => (
              <Reveal key={regla.titulo} delay={index * 60}>
                <article className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-[#b8860b]/30 hover:shadow-[0_18px_45px_rgba(184,134,11,0.15)]">
                  <p className="text-sm font-bold tracking-[0.25em]" style={{ color: CBG.gold }}>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-xl font-bold text-white">{regla.titulo}</h2>
                  <p className="mt-3 leading-7 text-white/70">{regla.descripcion}</p>
                </article>
              </Reveal>
            ))}
          </section>

          <Reveal delay={120}>
            <section className="mt-10 rounded-2xl border border-[#b8860b]/20 p-6 sm:p-7" style={{ backgroundColor: "rgba(184,134,11,0.1)" }}>
              <p className="text-base leading-8 text-white/90 sm:text-lg">
                Estas normas no buscan solo mantener el orden, sino ayudar a que
                cada participante aproveche este tiempo para crecer, escuchar la
                Palabra de Dios y convivir de una manera que honre a Cristo.
              </p>
            </section>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/registro"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Volver al registro
              </Link>

              <Link
                href="/campamento"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-bold text-slate-950 transition hover:opacity-90"
                style={{ backgroundColor: CBG.gold }}
              >
                Finalizar
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform-gpu transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
