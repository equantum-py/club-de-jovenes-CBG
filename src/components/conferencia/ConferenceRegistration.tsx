"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

export default function ConferenceRegistration() {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);setError("");
    const data = new FormData(event.currentTarget);
    try {
      const result = await fetch("/api/conferencia/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.get("nombre"), apellido: data.get("apellido"), iglesia: data.get("iglesia"), website: data.get("website"),
        }),
      });
      const body = await result.json().catch(() => ({}));
      if (!result.ok) throw new Error(body.error || "No se pudo completar el registro.");
      setCompleted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {setLoading(false);}
  }

  return <main className="min-h-screen bg-[#f8f6f1] px-4 py-7 text-[#09264b] sm:py-12" style={{fontFamily:"Inter, Arial, sans-serif",backgroundImage:"linear-gradient(110deg,transparent 0%,transparent 72%,#e9e2d4 100%)"}}>
    <div className="mx-auto max-w-[520px]">
      <div className="mb-6 flex items-center justify-center gap-3">
        <Image src="/logo.png" width={44} height={44} alt="Jóvenes CBG" className="h-11 w-11 object-contain"/>
        <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#09264b]">Ministerio de Jóvenes CBG</span>
      </div>
      <div className="h-1 w-full bg-[#c89b23]" aria-hidden="true"/><div className="rounded-[12px] border border-[#e4ddd0] bg-white px-6 py-8 shadow-[0_12px_35px_#09264b0c] sm:px-10 sm:py-10">
        {completed ? <div role="status" className="py-9 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#eaf1e8] text-4xl font-bold text-[#2d6a4f]">✓</div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight">¡Ya estás participando!</h1>
          <p className="mt-4 leading-7 text-[#5e6e83]">Tu nombre fue agregado a la ruleta. Prestá atención al sorteo y preparate para decir un versículo bíblico.</p>
        </div> : <>
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#b58712]">Conferencia de Jóvenes · 2026</p>
          <h1 className="mt-4 text-[clamp(1.9rem,6vw,2.55rem)] font-extrabold leading-[1.14] tracking-[-.035em]">Participá de la ruleta bíblica</h1>
          <p className="mt-5 text-base leading-7 text-[#526176]">Dejá tus datos para participar. Si tu nombre sale sorteado, compartí un versículo bíblico.</p>
          <form onSubmit={submit} className="mt-8">
            <label htmlFor="nombre" className="mb-2 block text-sm font-bold">Nombre</label>
            <input id="nombre" name="nombre" type="text" autoComplete="given-name" minLength={2} maxLength={60} required placeholder="Tu nombre" className="mb-5 min-h-[55px] w-full rounded-lg border border-[#cbd3dd] bg-white px-4 outline-none focus:border-[#c2911e]"/>
            <label htmlFor="apellido" className="mb-2 block text-sm font-bold">Apellido</label>
            <input id="apellido" name="apellido" type="text" autoComplete="family-name" minLength={2} maxLength={60} required placeholder="Tu apellido" className="mb-5 min-h-[55px] w-full rounded-xl border border-[#ccd8e6] bg-white px-4 outline-none focus:border-[#174984]"/>
            <label htmlFor="iglesia" className="mb-2 block text-sm font-bold">Iglesia</label>
            <input id="iglesia" name="iglesia" type="text" autoComplete="organization" minLength={2} maxLength={100} required placeholder="Nombre de tu iglesia" className="min-h-[55px] w-full rounded-xl border border-[#ccd8e6] bg-white px-4 outline-none focus:border-[#174984]"/>
            <div className="hidden" aria-hidden="true"><label htmlFor="website">Sitio web</label><input name="website" id="website" type="text" tabIndex={-1} autoComplete="off"/></div>
            <button disabled={loading} type="submit" className="mt-7 min-h-[58px] w-full rounded-lg bg-[#092d5b] px-5 font-bold text-white shadow-lg shadow-[#09264b12] transition hover:bg-[#17467e] disabled:opacity-60">
              {loading ? "Registrando…" : "¡Quiero participar! →"}
            </button>
            {error && <p role="alert" className="mt-4 text-center text-sm font-semibold text-red-700">{error}</p>}
          </form>
        </>}
      </div>
      <p className="mt-6 text-center text-xs text-[#60758d]">Una dinámica para compartir la Palabra de Dios.</p>
    </div>
  </main>;
}
