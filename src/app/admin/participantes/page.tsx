import { findValue, getRegistrations } from "@/lib/registrations";

export const dynamic = "force-dynamic";

export default async function ParticipantesPage() {
  const registrations = await getRegistrations().catch(() => []);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Gestión</p>
      <h1 className="mt-2 text-4xl font-semibold text-brand-forest">Participantes</h1>
      <p className="mt-2 text-brand-muted">{registrations.length} personas registradas actualmente.</p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-brand-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-brand-cream text-xs uppercase tracking-wider text-brand-muted"><tr><th className="px-5 py-4">Participante</th><th className="px-5 py-4">Edad</th><th className="px-5 py-4">Teléfono</th><th className="px-5 py-4">Cédula</th><th className="px-5 py-4">Iglesia</th><th className="px-5 py-4">Estado</th></tr></thead>
            <tbody className="divide-y divide-brand-border">
              {registrations.slice().reverse().map((r, i) => <tr key={i} className="hover:bg-brand-cream/40"><td className="px-5 py-4 font-medium text-brand-forest">{findValue(r, ["nombre", "nombres"])} {findValue(r, ["apellido", "apellidos"])}</td><td className="px-5 py-4">{findValue(r, ["edad"])}</td><td className="px-5 py-4">{findValue(r, ["telefono", "teléfono", "whatsapp"])}</td><td className="px-5 py-4">{findValue(r, ["cedula", "cédula"])}</td><td className="px-5 py-4">{findValue(r, ["iglesia"])}</td><td className="px-5 py-4"><span className="rounded-full bg-brand-sageSoft px-3 py-1 text-xs font-semibold text-brand-forest">Registrado</span></td></tr>)}
            </tbody>
          </table>
        </div>
        {!registrations.length ? <p className="p-8 text-sm text-brand-muted">No hay participantes para mostrar.</p> : null}
      </div>
    </main>
  );
}
