import { revalidatePath } from "next/cache";

import {
  assignMemberToCabin,
  createCabin,
  deleteCabin,
  listCabins,
  listTeamMembers,
  setCabinLeader,
} from "@/lib/camp-management";

export const dynamic = "force-dynamic";

const field =
  "min-h-11 rounded-xl border border-brand-border bg-white px-3 text-sm font-normal text-brand-forest placeholder:text-brand-muted/70 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20";

async function createAction(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  if (!name) return;
  const capacityRaw = String(formData.get("capacity") || "").trim();
  await createCabin({
    name,
    capacity: capacityRaw ? Number(capacityRaw) : null,
    notes: String(formData.get("notes") || "").trim(),
  });
  revalidatePath("/admin/cabanas");
}

async function addMemberAction(formData: FormData) {
  "use server";
  const cabinId = String(formData.get("cabinId") || "");
  const memberId = String(formData.get("memberId") || "");
  if (!cabinId || !memberId) return;

  const [cabins, members] = await Promise.all([listCabins(), listTeamMembers()]);
  const cabin = cabins.find((item) => item.id === cabinId);
  const occupied = members.filter((item) => item.cabin_id === cabinId).length;
  if (cabin?.capacity && occupied >= cabin.capacity) return;

  await assignMemberToCabin(memberId, cabinId);
  revalidatePath("/admin/cabanas");
  revalidatePath("/admin/participantes");
}

async function moveMemberAction(formData: FormData) {
  "use server";
  const memberId = String(formData.get("memberId") || "");
  const cabinId = String(formData.get("cabinId") || "");
  if (!memberId) return;
  await assignMemberToCabin(memberId, cabinId || null);
  revalidatePath("/admin/cabanas");
  revalidatePath("/admin/participantes");
}

async function removeMemberAction(formData: FormData) {
  "use server";
  const memberId = String(formData.get("memberId") || "");
  const cabinId = String(formData.get("cabinId") || "");
  if (!memberId) return;

  await assignMemberToCabin(memberId, null);

  const cabins = await listCabins();
  const cabin = cabins.find((item) => item.id === cabinId);
  if (cabin?.leader_registration_id === memberId) {
    await setCabinLeader(cabinId, null);
  }

  revalidatePath("/admin/cabanas");
  revalidatePath("/admin/participantes");
}

async function leaderAction(formData: FormData) {
  "use server";
  const cabinId = String(formData.get("cabinId") || "");
  const memberId = String(formData.get("memberId") || "");
  if (!cabinId || !memberId) return;

  await assignMemberToCabin(memberId, cabinId);
  await setCabinLeader(cabinId, memberId);
  revalidatePath("/admin/cabanas");
  revalidatePath("/admin/participantes");
}

async function deleteAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;

  const members = await listTeamMembers();
  const cabinMembers = members.filter((member) => member.cabin_id === id);
  for (const member of cabinMembers) {
    await assignMemberToCabin(member.id, null);
  }

  await deleteCabin(id);
  revalidatePath("/admin/cabanas");
  revalidatePath("/admin/participantes");
}

export default async function CabanasPage() {
  const [cabins, members] = await Promise.all([
    listCabins().catch(() => []),
    listTeamMembers().catch(() => []),
  ]);

  const unassigned = members.filter((member) => !member.cabin_id);

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-gold">Gestión</p>
        <h1 className="mt-2 text-4xl font-semibold text-brand-forest">Cabañas</h1>
        <p className="mt-2 text-brand-muted">Creá cada cabaña una sola vez y organizá sus integrantes adentro.</p>
      </div>

      <section className="mt-8 grid gap-5 xl:grid-cols-2">
        {cabins.map((cabin) => {
          const cabinMembers = members.filter((member) => member.cabin_id === cabin.id);
          const occupied = cabinMembers.length;
          const isFull = Boolean(cabin.capacity && occupied >= cabin.capacity);

          return (
            <article key={cabin.id} className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.14em] text-brand-gold">Cabaña</p>
                  <h2 className="mt-1 text-2xl font-semibold text-brand-forest">{cabin.name}</h2>
                  <p className="mt-1 text-sm text-brand-muted">
                    {occupied} / {cabin.capacity || "—"} ocupados
                  </p>
                </div>
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={cabin.id} />
                  <button className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700">
                    Eliminar
                  </button>
                </form>
              </div>

              <div className="mt-5 rounded-xl bg-brand-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-[.12em] text-brand-muted">Líder de cabaña</p>
                <p className="mt-1 font-semibold text-brand-forest">
                  {cabin.leader ? `${cabin.leader.nombre} ${cabin.leader.apellido}` : "Sin asignar"}
                </p>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-brand-forest">Integrantes</h3>
                  <span className="text-xs text-brand-muted">{occupied} personas</span>
                </div>

                <div className="mt-3 divide-y divide-brand-border rounded-xl border border-brand-border">
                  {cabinMembers.map((member) => {
                    const isLeader = cabin.leader_registration_id === member.id;
                    return (
                      <div key={member.id} className="p-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="truncate font-semibold text-brand-forest">{member.nombre} {member.apellido}</p>
                              {isLeader ? (
                                <span className="rounded-full bg-brand-gold/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-gold">
                                  Líder
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-0.5 text-xs text-brand-muted">{member.edad ? `${member.edad} años` : "Participante"}</p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {!isLeader ? (
                              <form action={leaderAction}>
                                <input type="hidden" name="cabinId" value={cabin.id} />
                                <input type="hidden" name="memberId" value={member.id} />
                                <button className="rounded-lg border border-brand-border px-3 py-2 text-xs font-semibold text-brand-forest">
                                  Hacer líder
                                </button>
                              </form>
                            ) : null}
                            <form action={removeMemberAction}>
                              <input type="hidden" name="cabinId" value={cabin.id} />
                              <input type="hidden" name="memberId" value={member.id} />
                              <button className="rounded-lg px-3 py-2 text-xs font-semibold text-red-700">Quitar</button>
                            </form>
                          </div>
                        </div>

                        {cabins.length > 1 ? (
                          <form action={moveMemberAction} className="mt-3 flex gap-2">
                            <input type="hidden" name="memberId" value={member.id} />
                            <select name="cabinId" defaultValue={cabin.id} className={`${field} min-w-0 flex-1`}>
                              {cabins.map((option) => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                              ))}
                            </select>
                            <button className="rounded-xl border border-brand-border px-4 text-xs font-semibold text-brand-forest">Mover</button>
                          </form>
                        ) : null}
                      </div>
                    );
                  })}
                  {!cabinMembers.length ? (
                    <p className="p-4 text-sm text-brand-muted">Todavía no hay integrantes en esta cabaña.</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5 border-t border-brand-border pt-5">
                <h3 className="font-semibold text-brand-forest">Agregar integrante</h3>
                {isFull ? (
                  <p className="mt-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">La cabaña ya llegó a su capacidad máxima.</p>
                ) : unassigned.length ? (
                  <form action={addMemberAction} className="mt-3 flex gap-2">
                    <input type="hidden" name="cabinId" value={cabin.id} />
                    <select name="memberId" required defaultValue="" className={`${field} min-w-0 flex-1`}>
                      <option value="" disabled>Elegir participante</option>
                      {unassigned.map((member) => (
                        <option key={member.id} value={member.id}>{member.nombre} {member.apellido}</option>
                      ))}
                    </select>
                    <button className="rounded-xl bg-brand-forest px-4 text-sm font-semibold text-white">Agregar</button>
                  </form>
                ) : (
                  <p className="mt-2 text-sm text-brand-muted">No hay participantes sin cabaña.</p>
                )}
              </div>

              {cabin.notes ? <p className="mt-4 text-sm text-brand-muted">{cabin.notes}</p> : null}
            </article>
          );
        })}

        {!cabins.length ? (
          <div className="rounded-2xl border border-dashed border-brand-border bg-white p-6 text-sm text-brand-muted">
            Todavía no hay cabañas creadas.
          </div>
        ) : null}
      </section>

      <details className="mt-6 rounded-2xl border border-brand-border bg-white">
        <summary className="cursor-pointer px-5 py-4 font-semibold text-brand-forest">+ Crear una cabaña nueva</summary>
        <form action={createAction} className="grid gap-4 border-t border-brand-border p-5 lg:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-brand-forest">
            Nombre
            <input name="name" required placeholder="Ej. Cabaña 2" className={field} />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-brand-forest">
            Capacidad
            <input name="capacity" type="number" min="1" placeholder="Ej. 8" className={field} />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-brand-forest lg:col-span-2">
            Observaciones
            <input name="notes" placeholder="Opcional" className={field} />
          </label>
          <button className="min-h-11 rounded-xl bg-brand-forest px-5 font-semibold text-white lg:col-span-2">
            Crear cabaña
          </button>
        </form>
      </details>
    </main>
  );
}
