import Link from "next/link";

const confetti = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 43) % 100}%`,
  delay: `${(index % 8) * 0.2}s`,
  duration: `${4.2 + (index % 5) * 0.45}s`,
  rotate: `${(index * 47) % 180}deg`,
}));

export default function BienvenidoCampamentoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07140f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(185,154,79,.16),transparent_30%),linear-gradient(180deg,#07140f_0%,#0b241b_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((item, index) => (
          <span
            key={index}
            className="confetti absolute -top-8 h-2.5 w-1.5 rounded-[2px]"
            style={{
              left: item.left,
              animationDelay: item.delay,
              animationDuration: item.duration,
              transform: `rotate(${item.rotate})`,
              background: index % 3 === 0 ? "#f3ead9" : "#b99a4f",
            }}
          />
        ))}
      </div>

      <Link
        href="/campamento"
        aria-label="Volver al inicio del campamento"
        className="absolute left-5 top-5 z-30 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2.5 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10 hover:text-white sm:left-8 sm:top-8"
      >
        <span aria-hidden="true">←</span> Inicio
      </Link>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center px-5 py-20 text-center sm:px-8">
        <div className="welcome-card w-full max-w-3xl px-2 sm:px-8">
          <img src="/logo.png" alt="Gracia Camp" className="mx-auto h-auto max-h-[112px] w-[190px] object-contain sm:w-[230px]" />

          <p className="mt-7 text-[11px] font-bold uppercase tracking-[.32em] text-[#d1b568] sm:text-xs">Registro recibido</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-[clamp(2.8rem,7vw,5.6rem)] font-black leading-[.92] tracking-[-.05em]">
            ¡Bienvenido a<br />Gracia Camp!
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
            Tu registro para Gracia Camp 2026 fue recibido. Ya falta menos para vivir cuatro días de fe, amistad y momentos que vamos a recordar juntos.
          </p>

          <div className="date-pulse mx-auto mt-8 max-w-lg rounded-[1.6rem] border border-[#d1b568]/25 bg-white/[.045] px-5 py-6 backdrop-blur-sm sm:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#d1b568] sm:text-xs">Guardá la fecha</p>
            <p className="mt-2 text-3xl font-black tracking-[-.035em] sm:text-4xl">Nos vemos el 03 de diciembre</p>
            <p className="mt-2 text-sm text-white/60">San Bernardino · Rancho Alegre</p>
          </div>

          <p className="mx-auto mt-5 max-w-xl text-xs leading-5 text-white/50 sm:text-sm">
            El comprobante queda sujeto a verificación por el equipo de organización.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/campamento" className="rounded-full bg-[#f3ead9] px-7 py-3.5 text-sm font-bold text-[#123d31] transition hover:scale-[1.02]">
              Volver al inicio
            </Link>
            <Link href="/reglamento" className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white/85 transition hover:bg-white/10 hover:text-white">
              Ver reglamento
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes confettiFall {
          0% { transform: translate3d(0,-8vh,0) rotate(0deg); opacity: 0; }
          10% { opacity: .75; }
          100% { transform: translate3d(30px,112vh,0) rotate(620deg); opacity: .5; }
        }
        @keyframes cardIn {
          0% { opacity: 0; transform: translateY(20px) scale(.985); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dateGlow {
          0%,100% { box-shadow: 0 0 0 rgba(209,181,104,0); }
          50% { box-shadow: 0 0 38px rgba(209,181,104,.08); }
        }
        .confetti { animation-name: confettiFall; animation-timing-function: linear; animation-iteration-count: infinite; }
        .welcome-card { animation: cardIn .65s cubic-bezier(.2,.75,.2,1) both; }
        .date-pulse { animation: dateGlow 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .confetti,.welcome-card,.date-pulse { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
