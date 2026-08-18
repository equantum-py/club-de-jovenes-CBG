import Link from "next/link";
import { notFound } from "next/navigation";

import DeleteRegistrationButton from "@/components/admin/DeleteRegistrationButton";
import { getRegistrationById, getSignedSelfieUrl } from "@/lib/registration-db";

export const dynamic = "force-dynamic";

function Item({ label, value }: { label: string; value?: string }) {
  return (
    <div className="border-b border-brand-border py-4 last:border-b-0">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">{label}</p>
      <p className="mt-1 break-words text-base font-medium text-brand-forest">{value || "—"}</p>
    </div>
  );
}

export default async function ParticipanteDetallePage({ params }: { params: { id: string } }) {
  const registration = await getRegistrationById(params.id).catch(() => null);
  if (!registration) notFound();

  const selfieUrl = await getSignedSelfieUrl(registration.selfiePath, 900).catch(() => "");
  const fullName = `${registration.nombre} ${registration.apellido}`.trim();

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/admin/participantes" className="text-sm font-semibold text-brand-forest">← Volver a inscripciones</Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Ficha de inscripción</p>
          <h1 className="mt-2 text-4xl font-semibold text-brand-forest">{registration.nombre} {registration.apellido}</h1>
          <p className="mt-2 text-sm text-brand-muted">Inscripto: {registration.fecha}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-fit rounded-full bg-brand-sageSoft px-4 py-2 text-sm font-semibold capitalize text-brand-forest">
            {registration.estado || "registrado"}
          </span>
          <DeleteRegistrationButton id={registration.id} name={fullName} redirectAfterDelete />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-brand-border bg-white p-5">
          <div className="aspect-square overflow-hidden rounded-2xl bg-brand-cream">
            {selfieUrl ? (
              <img src={selfieUrl} alt={`Selfie de ${registration.nombre} ${registration.apellido}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-sm text-brand-muted">Este registro no tiene selfie disponible.</div>
            )}
          </div>
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">Identificación</p>
            <p className="mt-1 text-xl font-semibold text-brand-forest">{registration.nombre} {registration.apellido}</p>
            <p className="mt-1 text-sm text-brand-muted">CI {registration.cedula || "—"}</p>
          </div>
        </aside>

        <div className="grid gap-6">
          <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
            <h2 className="text-xl font-semibold text-brand-forest">Datos personales</h2>
            <div className="mt-3 grid md:grid-cols-2 xl:grid-cols-3">
              <Item label="Nombre" value={registration.nombre} />
              <Item label="Apellido" value={registration.apellido} />
              <Item label="Edad" value={registration.edad} />
              <Item label="Sexo" value={registration.sexo} />
              <Item label="Cédula" value={registration.cedula} />
              <Item label="Teléfono" value={registration.telefono} />
              <Item label="Iglesia / congregación" value={registration.iglesia} />
              <Item label="¿Es invitado?" value={registration.esInvitado} />
              <Item label="Invitado por" value={registration.invitadoPor} />
            </div>
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
            <h2 className="text-xl font-semibold text-brand-forest">Responsable y emergencia</h2>
            <div className="mt-3 grid md:grid-cols-2">
              <Item label="Padre, madre o tutor" value={registration.nombrePadreMadre} />
              <Item label="Teléfono del responsable" value={registration.telefonoPadreMadre} />
              <Item label="Contacto de emergencia" value={registration.contactoEmergenciaNombre} />
              <Item label="Teléfono de emergencia" value={registration.contactoEmergenciaTelefono} />
            </div>
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
            <h2 className="text-xl font-semibold text-brand-forest">Salud</h2>
            <div className="mt-3 grid md:grid-cols-2 xl:grid-cols-3">
              <Item label="Alergias" value={registration.alergias} />
              <Item label="Medicamentos" value={registration.medicamentos} />
              <Item label="Enfermedad de base" value={registration.enfermedadBase} />
            </div>
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
            <h2 className="text-xl font-semibold text-brand-forest">Pago y observaciones</h2>
            <div className="mt-3 grid md:grid-cols-2">
              <Item label="Forma de pago" value={registration.formaPago} />
              <Item label="Estado" value={registration.estado} />
            </div>
            <div className="mt-2">
              <Item label="Observaciones" value={registration.observaciones} />
            </div>
          </section>

          <section className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-700">Zona de eliminación</p>
            <h2 className="mt-2 text-xl font-semibold text-red-900">Eliminar esta inscripción</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-red-800/80">Usá esta opción solamente para registros de prueba o inscripciones que realmente deban borrarse. Se pedirá confirmación antes de eliminar.</p>
            <div className="mt-5">
              <DeleteRegistrationButton id={registration.id} name={fullName} redirectAfterDelete />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
