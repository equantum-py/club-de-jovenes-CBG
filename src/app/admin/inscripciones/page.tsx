import { findValue, getRegistrations } from "@/lib/registrations";

export const dynamic = "force-dynamic";

export default async function InscripcionesPage() {
  const registrations = await getRegistrations().catch(() => []);
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Campamento</p>
      <h1 className="mt-2 text-4xl font-semibold text-brand-forest">Inscripciones</h1>
      <p className="mt-2 text-brand-muted">Seguimiento de las solicitudes recibidas para Gracia Camp 2026.</p>
      <section className="mt-8 grid gap-4">
        {registrations.slice().reverse().map((r, i) => (
          <article key={i} className="grid gap-5 rounded-2xl border border-brand-border bg-white p-5 md:grid-cols-[1fr_1fr_auto] md:items-center">
            <div><p className="font-semibold text-brand-forest">{findValue(r, ["nombre", "nombres"])} {findValue(r, ["apellido", "apellidos"])}</p><p className="mt-1 text-sm text-brand-muted">CI {findValue(r, ["cedula", "cédula"])}</p></div>
            <div><p className="text-sm text-brand-muted">Forma de pago</p><p className="mt-1 font-medium">{findValue(r, ["forma de pago", "pago"])}</p></div>
            <span className="w-fit rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">Pendiente de revisión</span>
          </article>
        ))}
        {!registrations.length ? <div className="rounded-2xl border border-brand-border bg-white p-8 text-sm text-brand-muted">No hay inscripciones disponibles.</div> : null}
      </section>
    </main>
  );
}
