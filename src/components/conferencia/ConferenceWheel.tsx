"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ConferenceParticipant } from "@/lib/conferencia-ruleta";

const COLORS = ["#f9c74f","#72d6c2","#ff9c85","#a9c8ff","#d8b4fe","#f6b9d1","#b4e58a","#ffd29b"];
const TAU = Math.PI * 2;

export default function ConferenceWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [participants, setParticipants] = useState<ConferenceParticipant[]>([]);
  const [busy, setBusy] = useState(false);
  const [winner, setWinner] = useState<ConferenceParticipant | null>(null);
  const [message, setMessage] = useState("Cargando participantes…");
  const rotation = useRef(0);
  const busyRef = useRef(false);
  const participantsRef = useRef<ConferenceParticipant[]>([]);

  const draw = useCallback((people: ConferenceParticipant[], angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const center = canvas.width / 2;
    const r = center - 18;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();ctx.translate(center, center);ctx.rotate(angle);
    if (!people.length) {
      ctx.beginPath();ctx.arc(0, 0, r, 0, TAU);ctx.fillStyle = "#dbeafe";ctx.fill();
      ctx.fillStyle = "#123052";ctx.font = "bold 29px sans-serif";ctx.textAlign = "center";ctx.fillText("Sin participantes", 0, 12);
    } else {
      const arc = TAU / people.length;
      people.forEach((p, i) => {
        const start = i * arc - Math.PI / 2;
        ctx.beginPath();ctx.moveTo(0, 0);ctx.arc(0, 0, r, start, start + arc);ctx.closePath();
        ctx.fillStyle = COLORS[i % COLORS.length];ctx.fill();ctx.strokeStyle = "#fff";ctx.lineWidth = 3;ctx.stroke();
        ctx.save();ctx.rotate(start + arc / 2);ctx.translate(Math.max(90, r * .57), 0);ctx.rotate(Math.PI / 2 - (start + arc / 2) - angle);
        let label = p.nombre + " " + p.apellido;
        const max = r * .73;
        const size = people.length > 25 ? 13 : people.length > 14 ? 17 : people.length > 8 ? 21 : 27;
        ctx.font = `bold ${size}px sans-serif`;
        while (ctx.measureText(label).width > max && label.length > 4) label = label.slice(0, -2) + "…";
        ctx.textAlign = "center";ctx.textBaseline = "middle";
        ctx.fillStyle = "#142d4d";ctx.fillText(label, 0, 0);
        ctx.restore();
      });
    }
    ctx.restore();
    ctx.beginPath();ctx.arc(center, center, 34, 0, TAU);ctx.fillStyle = "#fff";ctx.fill();ctx.lineWidth = 6;ctx.strokeStyle = "#dca24c";ctx.stroke();
    ctx.beginPath();ctx.arc(center, center, 12, 0, TAU);ctx.fillStyle = "#183f73";ctx.fill();
  }, []);

  const refresh = useCallback(async () => {
    if (busyRef.current) return;
    try {
      const response = await fetch("/api/admin/conferencia", { cache: "no-store" });
      if (!response.ok) throw new Error("No se pudo cargar la lista.");
      const data = await response.json();
      const people = (data.participantes ?? []) as ConferenceParticipant[];
      participantsRef.current = people;
      setParticipants(people);
      setMessage(people.length ? "Participantes actualizados." : "Esperando los primeros registros.");
      draw(people.filter(p => !p.sorteado), rotation.current);
    } catch {setMessage("Error de conexión. Volvé a actualizar.");}
  }, [draw]);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(), 4000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  const eligible = participants.filter(p => !p.sorteado);

  async function post(action: "spin" | "reset", confirm?: string) {
    const response = await fetch("/api/admin/conferencia", {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ action, confirm }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Error inesperado.");
    return data;
  }

  async function spin() {
    if (busyRef.current || !eligible.length) return;
    busyRef.current = true;setBusy(true);setWinner(null);setMessage("¡La ruleta está girando!");
    const current = participantsRef.current.filter(p => !p.sorteado);
    try {
      const {ganador} = await post("spin") as {ganador: ConferenceParticipant};
      const index = current.findIndex(p => p.id === ganador.id);
      if (index < 0) {setWinner(ganador);return;}
      const arc = TAU / current.length;
      const desired = -(index + .5) * arc;
      const normalized = ((rotation.current % TAU) + TAU) % TAU;
      const normalizedTarget = ((desired % TAU) + TAU) % TAU;
      const delta = (normalizedTarget - normalized + TAU) % TAU;
      const start = rotation.current, end = start + TAU * 6 + delta;
      await new Promise<void>(resolve => {
        const started = performance.now();
        function frame(now: number) {
          const t = Math.min((now - started) / 5000, 1);
          rotation.current = start + (end - start) * (1 - (1 - t) ** 4);
          // Dibujar con la lista anterior para mantener la animación alineada con el ganador.
          draw(current, rotation.current);
          if (t < 1) requestAnimationFrame(frame); else resolve();
        }
        requestAnimationFrame(frame);
      });
      setWinner(ganador);
      setMessage("¡Tenemos una persona elegida!");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error al sortear.");
    } finally {
      busyRef.current = false;setBusy(false);
      // Se refresca el listado pero se conserva el resultado hasta el próximo giro.
      void refresh();
    }
  }

  async function reset() {
    if (busyRef.current || !window.confirm("¿Volver a incluir a todos los participantes en el sorteo?")) return;
    busyRef.current = true;setBusy(true);
    try {await post("reset", "REINICIAR");setWinner(null);rotation.current = 0;setMessage("Nueva ronda preparada.");}
    catch(error) {setMessage(error instanceof Error ? error.message : "Error al reiniciar.");}
    finally {busyRef.current = false;setBusy(false);void refresh();}
  }

  return <main className="min-h-screen bg-[#f4f8ff] p-4 text-[#123052] sm:p-6">
    <div className="mx-auto max-w-[1700px]">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#cbd9ea] bg-white px-5 py-3">
        <div className="flex items-center gap-3"><Image src="/logo.png" width={45} height={45} alt="CBG" className="h-11 w-11 object-contain"/><div><p className="text-sm font-black uppercase tracking-widest">Dinámica bíblica</p><p className="text-xs text-[#526b86]">Conferencia de Jóvenes</p></div></div>
        <Link href="/conferencia/registro" target="_blank" className="text-sm font-bold text-[#174e91] underline">Abrir formulario ↗</Link>
      </header>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="min-w-0 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#9b5c05]">Momento del sorteo</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">¿A quién le toca el versículo?</h1>
          <p className="mt-2 text-[#526b86]">La ruleta elegirá al próximo participante.</p>
          <div className="relative mx-auto my-4 aspect-square w-full max-w-[min(630px,64vh)] drop-shadow-xl">
            <canvas ref={canvasRef} width={720} height={720} aria-label="Ruleta con los participantes" role="img" className="h-full w-full"/>
            <div aria-hidden className="absolute left-1/2 top-0 z-10 -translate-x-1/2 border-x-[18px] border-t-[40px] border-x-transparent border-t-[#e5a139]"/>
          </div>
          <button onClick={spin} disabled={busy || !eligible.length} className="min-h-14 w-full max-w-sm rounded-xl bg-[#f6bd55] px-6 text-xl font-extrabold text-[#142b4b] shadow-lg transition hover:bg-[#a96b13] disabled:opacity-50">✦ GIRAR RULETA</button>
          <p role="status" className="mt-3 text-sm text-[#526b86]">{message}</p>
          {winner && <div role="status" className="mx-auto mt-5 max-w-xl rounded-2xl border-2 border-[#e9b967] bg-white p-6">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#b27a20]">¡Persona elegida!</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#153e75] sm:text-5xl">{winner.nombre} {winner.apellido}</h2>
            <p className="mt-2 text-[#4e6681]">{winner.iglesia}</p>
            <p className="mt-4 text-lg font-bold text-[#a46f1a]">¡Es tu turno de decir un versículo bíblico!</p>
          </div>}
        </section>
        <aside className="rounded-2xl border border-[#dce5f0] bg-white p-5 shadow-sm">
          <div className="grid grid-cols-3 gap-2 border-b border-[#d7e2ef] pb-5 text-center">
            <div><strong className="block text-3xl text-[#174e91]">{participants.length}</strong><span className="text-xs text-white/60">Registrados</span></div>
            <div><strong className="block text-3xl text-[#174e91]">{eligible.length}</strong><span className="text-xs text-[#788ba2]">Disponibles</span></div>
            <div><strong className="block text-3xl text-[#1d4b83]">{participants.length - eligible.length}</strong><span className="text-xs text-[#788ba2]">Elegidos</span></div>
          </div>
          <div className="mt-5 flex items-center justify-between"><h2 className="text-lg font-extrabold">Participantes</h2><button onClick={() => void refresh()} className="text-xs font-bold text-[#f4c477]">Actualizar ↻</button></div>
          <p className="mt-2 text-xs text-[#607891]">Se actualiza automáticamente cada 4 segundos.</p>
          <ul className="mt-4 max-h-[46vh] space-y-1 overflow-auto">
            {participants.map(p => <li key={p.id} className="border-b border-white/10 px-1 py-3"><p className={`text-sm font-bold ${p.sorteado ? "text-[#8595a7]" : "text-white"}`}>{p.nombre} {p.apellido} {p.sorteado ? "· Elegido" : ""}</p><p className="mt-1 text-xs text-white/60">{p.iglesia}</p></li>)}
            {!participants.length && <li className="py-8 text-center text-sm text-white/60">Esperando registros…</li>}
          </ul>
          <button onClick={reset} disabled={busy} className="mt-5 w-full rounded-xl border border-[#c7d7e9] bg-[#edf4fc] px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Reiniciar sorteo</button>
          <p className="mt-2 text-center text-xs text-white/55">No elimina a los participantes.</p>
        </aside>
      </div>
    </div>
  </main>;
}
