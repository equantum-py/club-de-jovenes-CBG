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

  return <main className="min-h-screen bg-[#f2f5f9] px-4 py-8 text-[#123252] sm:py-14" style={{backgroundImage:"radial-gradient(ellipse at 85% 8%,#f9e3b6 0%,transparent 45%),linear-gradient(145deg,#e9f1fa,#f9fafc)"}}>
    <div className="mx-auto max-w-[530px]">
      <div className="mb-7 flex items-center justify-center gap-3">
        <Image src="/logo.png" width={44} height={44} alt="Jóvenes CBG" className="h-11 w-11 object-contain"/>
        <span className="text-xs font-extrabold uppercase tracking-[.2em] text-[#163e69]">Ministerio de Jóvenes CBG</span>
      </div>
      <div className="rounded-[25px] border border-[#dae4ef] bg-white px-6 py-9 shadow-[0_18px_55px_#173a611c] sm:px-10 sm:py-11">
        {completed ? <div role="status" className="py-9 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#e4f5ea] text-4xl font-bold text-[#25805d]">✓</div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight">¡Ya estás participando!</h1>
          <p className="mt-4 leading-7 text-[#5e6e83]">Tu nombre fue agregado a la ruleta. Prestá atención al sorteo y preparate para decir un versículo bíblico.</p>
        </div> : <>
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#a9762c]">Conferencia de Jóvenes · 2026</p>
          <h1 className="mt-4 text-[clamp(2rem,7vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-.05em]">¡Tu nombre puede salir en la ruleta!</h1>
          <p className="mt-5 text-base leading-7 text-[#61738b]">Registrate para participar. Si salís elegido, tendrás que decir un versículo bíblico.</p>
          <form onSubmit={submit} className="mt-8">
            <label htmlFor="nombre" className="mb-2 block text-sm font-bold">Nombre</label>
            <input id="nombre" name="nombre" type="text" autoComplete="given-name" minLength={2} maxLength={60} required placeholder="Tu nombre" className="mb-5 min-h-[55px] w-full rounded-xl border border-[#ccd8e6] bg-white px-4 outline-none focus:border-[#174984]"/>
            <label htmlFor="apellido" className="mb-2 block text-sm font-bold">Apellido</label>
            <input id="apellido" name="apellido" type="text" autoComplete="family-name" minLength={2} maxLength={60} required placeholder="Tu apellido" className="mb-5 min-h-[55px] w-full rounded-xl border border-[#ccd8e6] bg-white px-4 outline-none focus:border-[#174984]"/>
            <label htmlFor="iglesia" className="mb-2 block text-sm font-bold">Iglesia</label>
            <input id="iglesia" name="iglesia" type="text" autoComplete="organization" minLength={2} maxLength={100} required placeholder="Nombre de tu iglesia" className="min-h-[55px] w-full rounded-xl border border-[#ccd8e6] bg-white px-4 outline-none focus:border-[#174984]"/>
            <div className="hidden" aria-hidden="true"><label htmlFor="website">Sitio web</label><input name="website" id="website" type="text" tabIndex={-1} autoComplete="off"/></div>
            <button disabled={loading} type="submit" className="mt-7 min-h-[58px] w-full rounded-xl bg-[#173f7f] px-5 font-bold text-white shadow-lg shadow-[#193c7226] transition hover:bg-[#22549c] disabled:opacity-60">
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
