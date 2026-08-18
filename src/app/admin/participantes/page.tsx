import Link from "next/link";

import DeleteRegistrationButton from "@/components/admin/DeleteRegistrationButton";
import { getSignedSelfieUrl, listRegistrations } from "@/lib/registration-db";

export const dynamic = "force-dynamic";

export default async function ParticipantesPage() {
  const registrations = await listRegistrations().catch(() => []);
  const rows = await Promise.all(
    registrations.map(async (registration) => ({
      ...registration,
      selfieUrl: await getSignedSelfieUrl(registration.selfiePath).catch(() => ""),
    })),
  );

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Gestión</p>
          <h1 className="mt-2 text-4xl font-semibold text-brand-forest">Inscripciones</h1>
          <p className="mt-2 text-brand-muted">{rows.length} personas inscriptas actualmente.</p>
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
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="bg-brand-cream text-xs uppercase tracking-wider text-brand-muted">
              <tr>
                <th className="px-5 py-4">Foto</th>
                <th className="px-5 py-4">Participante</th>
                <th className="px-5 py-4">Edad</th>
                <th className="px-5 py-4">Teléfono</th>
                <th className="px-5 py-4">Cédula</th>
                <th className="px-5 py-4">Iglesia</th>
                <th className="px-5 py-4">Invitado</th>
                <th className="px-5 py-4">Forma de pago</th>
                <th className="px-5 py-4">Estado</th>
                <th className="px-5 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {rows.map((registration) => {
                const fullName = `${registration.nombre} ${registration.apellido}`.trim();
                return (
                  <tr key={registration.id} className="hover:bg-brand-cream/40">
                    <td className="px-5 py-4">
                      <Link href={`/admin/participantes/${registration.id}`} className="block h-14 w-14 overflow-hidden rounded-full border border-brand-border bg-brand-cream">
                        {registration.selfieUrl ? (
                          <img src={registration.selfieUrl} alt={`Selfie de ${registration.nombre}`} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-brand-muted">Sin foto</div>
                        )}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/admin/participantes/${registration.id}`} className="font-semibold text-brand-forest underline-offset-4 hover:underline">
                        {registration.nombre} {registration.apellido}
                      </Link>
                      <p className="mt-1 text-xs text-brand-muted">{registration.fecha}</p>
                      <Link href={`/admin/participantes/${registration.id}`} className="mt-2 inline-block text-xs font-semibold text-brand-forest">Ver ficha completa →</Link>
                    </td>
                    <td className="px-5 py-4">{registration.edad || "—"}</td>
                    <td className="px-5 py-4">{registration.telefono || "—"}</td>
                    <td className="px-5 py-4">{registration.cedula || "—"}</td>
                    <td className="px-5 py-4">{registration.iglesia || "—"}</td>
                    <td className="px-5 py-4">{registration.esInvitado}</td>
                    <td className="px-5 py-4">{registration.formaPago || "—"}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-brand-sageSoft px-3 py-1 text-xs font-semibold capitalize text-brand-forest">
                        {registration.estado || "registrado"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <DeleteRegistrationButton id={registration.id} name={fullName} compact />
                      <p className="mt-1 text-[10px] font-semibold text-red-700">Eliminar</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!rows.length ? <p className="p-8 text-sm text-brand-muted">Todavía no hay personas inscriptas para mostrar.</p> : null}
      </div>

      <p className="mt-4 text-xs leading-6 text-brand-muted">Hacé clic en la foto o en el nombre para abrir la ficha completa. Para borrar una prueba, usá el basurero y confirmá la eliminación.</p>
    </main>
  );
}
