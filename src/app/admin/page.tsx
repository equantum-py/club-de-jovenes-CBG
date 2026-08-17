import Link from "next/link";

import { findValue, getRegistrations } from "@/lib/registrations";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const registrations = await getRegistrations().catch(() => []);
  const total = registrations.length;
  const guests = registrations.filter((r) => findValue(r, ["invitado", "invitada"]) !== "—").length;
  const minors = registrations.filter((r) => {
    const age = Number(findValue(r, ["edad"]));
    return Number.isFinite(age) && age > 0 && age < 18;
  }).length;

  const cards = [["Inscripciones", total], ["Invitados", guests], ["Menores", minors], ["Campamento", "2026"]];

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Gracia Camp 2026</p><h1 className="mt-2 text-4xl font-semibold text-brand-forest">Resumen general</h1><p className="mt-2 text-brand-muted">Información actualizada desde los registros del campamento.</p></div>
        <Link href="/admin/participantes" className="text-sm font-semibold text-brand-forest">Ver participantes →</Link>
      </div>

      <section className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value]) => <article key={label} className="rounded-2xl border border-brand-border bg-white p-6"><p className="text-sm text-brand-muted">{label}</p><p className="mt-4 text-4xl font-semibold text-brand-forest">{value}</p></article>)}
      </section>

      <section className="mt-8 rounded-2xl border border-brand-border bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between"><div><h2 className="text-xl font-semibold text-brand-forest">Últimas inscripciones</h2><p className="mt-1 text-sm text-brand-muted">Los registros más recientes recibidos.</p></div></div>
        <div className="mt-6 divide-y divide-brand-border">
          {registrations.slice(-5).reverse().map((registration, index) => (
            <div key={index} className="grid gap-1 py-4 sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:gap-4">
              <p className="font-medium text-brand-forest">{findValue(registration, ["nombre", "nombres"])} {findValue(registration, ["apellido", "apellidos"])}</p>
              <p className="text-sm text-brand-muted">{findValue(registration, ["telefono", "teléfono", "whatsapp"])}</p>
              <span className="w-fit rounded-full bg-brand-sageSoft px-3 py-1 text-xs font-semibold text-brand-forest">Registrado</span>
            </div>
          ))}
          {!total ? <p className="py-8 text-sm text-brand-muted">Todavía no hay registros disponibles o Google Sheets no pudo ser leído.</p> : null}
        </div>
      </section>
    </main>
  );
}
