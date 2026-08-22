import Link from "next/link";

const confetti = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 9) * 0.16}s`,
  duration: `${3.6 + (index % 6) * 0.38}s`,
  rotate: `${(index * 47) % 180}deg`,
}));

const balloons = [
  { left: "7%", delay: "0s", duration: "7.2s", tone: "#b99a4f", size: 86 },
  { left: "18%", delay: "1.1s", duration: "8.4s", tone: "#f3ead9", size: 70 },
  { left: "80%", delay: ".5s", duration: "7.8s", tone: "#173d31", size: 82 },
  { left: "91%", delay: "1.8s", duration: "9s", tone: "#b99a4f", size: 66 },
  { left: "28%", delay: "2.2s", duration: "9.4s", tone: "#09193A", size: 58 },
  { left: "69%", delay: "2.7s", duration: "8.8s", tone: "#f6f0e5", size: 62 },
];

export default function BienvenidoCampamentoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07140f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(185,154,79,.24),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(20,43,35,.85),transparent_58%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:38px_38px]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((item, index) => (
          <span
            key={index}
            className="confetti absolute -top-8 h-3 w-2 rounded-[2px]"
            style={{
              left: item.left,
              animationDelay: item.delay,
              animationDuration: item.duration,
              transform: `rotate(${item.rotate})`,
              background: index % 4 === 0 ? "#f3ead9" : index % 3 === 0 ? "#173d31" : "#b99a4f",
            }}
          />
        ))}
        {balloons.map((balloon, index) => (
          <span
            key={index}
            className="balloon absolute -bottom-40 rounded-[50%_50%_46%_46%] shadow-[inset_-12px_-14px_22px_rgba(0,0,0,.18),0_14px_34px_rgba(0,0,0,.2)]"
            style={{
              left: balloon.left,
              width: balloon.size,
              height: Math.round(balloon.size * 1.22),
              background: balloon.tone,
              animationDelay: balloon.delay,
              animationDuration: balloon.duration,
            }}
          >
            <span className="absolute bottom-[-7px] left-1/2 h-4 w-3 -translate-x-1/2 rotate-45" style={{ background: balloon.tone }} />
            <span className="absolute left-1/2 top-[calc(100%+7px)] h-28 w-px -translate-x-1/2 bg-white/25" />
          </span>
        ))}
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 py-14 text-center sm:px-8">
        <div className="welcome-card w-full max-w-3xl rounded-[2.2rem] border border-white/10 bg-black/25 px-6 py-10 shadow-[0_28px_100px_rgba(0,0,0,.38)] backdrop-blur-md sm:px-12 sm:py-14">
          <img src="/logo.png" alt="Gracia Camp" className="mx-auto h-auto w-[170px] object-contain brightness-0 invert sm:w-[210px]" />

          <p className="mt-8 text-xs font-bold uppercase tracking-[.3em] text-[#d1b568] sm:text-sm">Registro recibido</p>
          <h1 className="mt-4 text-[clamp(2.7rem,8vw,6rem)] font-black leading-[.9] tracking-[-.055em]">
            ¡Bienvenido a<br />Gracia Camp!
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-xl sm:leading-8">
            Tu registro para Gracia Camp 2026 fue recibido. Ya falta menos para vivir cuatro días de fe, amistad y momentos que vamos a recordar juntos.
          </p>

          <div className="date-pulse mx-auto mt-8 max-w-xl rounded-3xl border border-[#d1b568]/30 bg-[#d1b568]/10 px-6 py-6 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[.26em] text-[#d1b568]">Guardá la fecha</p>
            <p className="mt-2 text-3xl font-black tracking-[-.03em] sm:text-5xl">Nos vemos el 03 de diciembre</p>
            <p className="mt-2 text-sm text-white/65">San Bernardino · Rancho Alegre</p>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/58">
            El comprobante queda sujeto a verificación por el equipo de organización.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/reglamento" className="rounded-full bg-[#f3ead9] px-7 py-3.5 text-sm font-bold text-[#123d31] transition hover:scale-[1.02]">
              Ver reglamento
            </Link>
            <Link href="/campamento" className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
              Volver al campamento
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes confettiFall {
          0% { transform: translate3d(0,-8vh,0) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          100% { transform: translate3d(40px,112vh,0) rotate(760deg); opacity: .95; }
        }
        @keyframes balloonRise {
          0% { transform: translate3d(0,0,0) rotate(-2deg); opacity: 0; }
          8% { opacity: .92; }
          50% { transform: translate3d(16px,-58vh,0) rotate(3deg); }
          100% { transform: translate3d(-10px,-125vh,0) rotate(-3deg); opacity: .78; }
        }
        @keyframes cardIn {
          0% { opacity: 0; transform: translateY(28px) scale(.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dateGlow {
          0%,100% { box-shadow: 0 0 0 rgba(209,181,104,0); }
          50% { box-shadow: 0 0 46px rgba(209,181,104,.12); }
        }
        .confetti { animation-name: confettiFall; animation-timing-function: linear; animation-iteration-count: infinite; }
        .balloon { animation-name: balloonRise; animation-timing-function: ease-in; animation-iteration-count: infinite; }
        .welcome-card { animation: cardIn .8s cubic-bezier(.2,.75,.2,1) both; }
        .date-pulse { animation: dateGlow 2.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .confetti,.balloon,.welcome-card,.date-pulse { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
