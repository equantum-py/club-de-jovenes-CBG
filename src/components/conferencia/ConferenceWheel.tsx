"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ConferenceParticipant } from "@/lib/conferencia-ruleta";

const COLORS = ["#e8edf3","#f4e8cd","#d5e0ed","#f8f1e3","#cbd9e8","#eee1c6","#dce5ee","#f6ead4"];
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
      ctx.beginPath();ctx.arc(0, 0, r, 0, TAU);ctx.fillStyle = "#e9eef4";ctx.fill();
      ctx.fillStyle = "#09264b";ctx.font = "bold 29px Inter, Arial, sans-serif";ctx.textAlign = "center";ctx.fillText("Sin participantes", 0, 12);
    } else {
      const arc = TAU / people.length;
      // Hasta 100 participantes: mostrar nombres breves con orientación radial,
      // ajustando el tamaño al espacio real de cada sector.
      const showNames = people.length <= 100;
      people.forEach((p, i) => {
        const start = i * arc - Math.PI / 2;
        ctx.beginPath();ctx.moveTo(0, 0);ctx.arc(0, 0, r, start, start + arc);ctx.closePath();
        ctx.fillStyle = COLORS[i % COLORS.length];ctx.fill();
        ctx.strokeStyle = "#ffffff";ctx.lineWidth = people.length > 50 ? .7 : people.length > 20 ? 1.2 : 3;ctx.stroke();
        if (!showNames) return;
        const middle = start + arc / 2;
        const fontSize = people.length > 70 ? 7 : people.length > 45 ? 8 : people.length > 28 ? 10 : people.length > 16 ? 12 : people.length > 9 ? 15 : 19;
        const radius = people.length > 28 ? r * .76 : r * .68;
        const availableWidth = Math.min(r * .48, Math.max(0, 2 * radius * Math.sin(arc / 2) - 5));
        if (availableWidth < 7) return;
        const full = [p.nombre,p.apellido].filter(Boolean).join(" ").trim();
        const first = p.nombre.trim().split(/\\s+/)[0] || "Participante";
        const label = people.length > 16 ? first : full;
        ctx.save();
        ctx.rotate(middle);
        ctx.translate(radius, 0);
        ctx.rotate(-(middle + angle));
        ctx.font = `700 ${fontSize}px Inter, Arial, sans-serif`;
        ctx.textAlign = "center";ctx.textBaseline = "middle";ctx.fillStyle = "#09264b";
        ctx.fillText(label, 0, 0, availableWidth);
        ctx.restore();
      });
    }
    ctx.restore();
    ctx.beginPath();ctx.arc(center, center, 34, 0, TAU);ctx.fillStyle = "#fff";ctx.fill();ctx.lineWidth = 6;ctx.strokeStyle = "#c89b23";ctx.stroke();
    ctx.beginPath();ctx.arc(center, center, 12, 0, TAU);ctx.fillStyle = "#09264b";ctx.fill();
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

  return <main style={{fontFamily:"Inter, Arial, sans-serif"}} className="min-h-screen bg-[#f8f6f1] p-3 text-[#09264b] sm:p-5">
    <div className="mx-auto max-w-[1660px]">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#e0ddd5] bg-white px-5 py-3">
        <div className="flex items-center gap-3"><Image src="/logo.png" width={45} height={45} alt="CBG" className="h-11 w-11 object-contain"/><div><p className="text-sm font-black uppercase tracking-widest">Conferencia de jóvenes</p><p className="text-xs text-[#526176]">Ministerio de Jóvenes CBG</p></div></div>
        <Link href="/conferencia/registro" target="_blank" className="text-sm font-bold text-[#092d5b] underline">Abrir formulario ↗</Link>
      </header>
      <div className="mx-auto max-w-5xl">
        <section className="min-w-0 text-center">
          <div className="relative mx-auto max-w-5xl">
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-5xl">Ruleta de versículos bíblicos</h1>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d9d5cb] bg-white px-4 py-2 text-sm font-semibold text-[#09264b] shadow-sm sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2" aria-live="polite">
              <span className="text-xl font-black tabular-nums">{participants.length}</span>
              <span>{participants.length === 1 ? "participante" : "participantes"}</span>
            </div>
          </div>
          <div className="relative mx-auto my-3 aspect-square w-full max-w-[min(590px,55vh)] drop-shadow-xl">
            <canvas ref={canvasRef} width={720} height={720} aria-label="Ruleta con los participantes" role="img" className="h-full w-full"/>
            
            <div aria-hidden className="absolute left-1/2 top-0 z-10 -translate-x-1/2 border-x-[18px] border-t-[40px] border-x-transparent border-t-[#b48a2c]"/>
          </div>
          <button onClick={spin} disabled={busy || !eligible.length} className="min-h-14 w-full max-w-sm rounded-lg bg-[#09264b] px-6 text-xl font-extrabold text-white shadow-lg transition hover:bg-[#174270] disabled:opacity-50">✦ GIRAR RULETA</button>
          <div className="mt-4"><button onClick={reset} disabled={busy} className="min-h-12 rounded-lg border border-[#cbd3dd] bg-white px-7 text-sm font-bold text-[#09264b] transition hover:bg-[#edf1f6] disabled:opacity-50">Reiniciar ruleta</button></div>
          <p role="status" className="mt-3 text-sm text-[#526b86]">{message}</p>
          {winner && <div role="status" className="mx-auto mt-5 max-w-xl rounded-2xl border-2 border-[#e9b967] bg-white p-6">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#b27a20]">¡Persona elegida!</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#153e75] sm:text-5xl">{winner.nombre} {winner.apellido}</h2>
            <p className="mt-2 text-[#4e6681]">{winner.iglesia}</p>
            <p className="mt-4 text-lg font-bold text-[#a46f1a]">¡Es tu turno de decir un versículo bíblico!</p>
          </div>}
        </section>

      </div>
    </div>
  </main>;
}
