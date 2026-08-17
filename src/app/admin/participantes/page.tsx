import { findValue, getRegistrations } from "@/lib/registrations";

export const dynamic = "force-dynamic";

export default async function ParticipantesPage() {
  const registrations = await getRegistrations().catch(() => []);

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Gestión</p>
          <h1 className="mt-2 text-4xl font-semibold text-brand-forest">Participantes</h1>
          <p className="mt-2 text-brand-muted">{registrations.length} personas inscriptas actualmente.</p>
        </div>

        <a
          href="/api/admin/export"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-forestLight"
        >
          Descargar Excel
        </a>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-brand-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="bg-brand-cream text-xs uppercase tracking-wider text-brand-muted">
              <tr>
                <th className="px-5 py-4">Participante</th>
                <th className="px-5 py-4">Edad</th>
                <th className="px-5 py-4">Teléfono</th>
                <th className="px-5 py-4">Cédula</th>
                <th className="px-5 py-4">Iglesia</th>
                <th className="px-5 py-4">Invitado</th>
                <th className="px-5 py-4">Forma de pago</th>
                <th className="px-5 py-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {registrations.map((registration, index) => (
                <tr key={findValue(registration, ["ID"]) || index} className="hover:bg-brand-cream/40">
                  <td className="px-5 py-4">
                    <p className="font-medium text-brand-forest">{findValue(registration, ["Nombre"])} {findValue(registration, ["Apellido"])}</p>
                    <p className="mt-1 text-xs text-brand-muted">{findValue(registration, ["Fecha"])}</p>
                  </td>
                  <td className="px-5 py-4">{findValue(registration, ["Edad"])}</td>
                  <td className="px-5 py-4">{findValue(registration, ["Telefono"])}</td>
                  <td className="px-5 py-4">{findValue(registration, ["Cedula"])}</td>
                  <td className="px-5 py-4">{findValue(registration, ["Iglesia"])}</td>
                  <td className="px-5 py-4">{findValue(registration, ["EsInvitado"])}</td>
                  <td className="px-5 py-4">{findValue(registration, ["FormaPago"])}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-brand-sageSoft px-3 py-1 text-xs font-semibold text-brand-forest">Registrado</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!registrations.length ? <p className="p-8 text-sm text-brand-muted">Todavía no hay personas inscriptas para mostrar.</p> : null}
      </div>

      <p className="mt-4 text-xs leading-6 text-brand-muted">El archivo Excel incluye todos los datos del formulario: datos personales, contacto, iglesia, invitación, responsable de menores, salud, emergencia, forma de pago y observaciones.</p>
    </main>
  );
}
