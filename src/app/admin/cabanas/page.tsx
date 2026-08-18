import { revalidatePath } from "next/cache";

import { createCabin, deleteCabin, listCabins } from "@/lib/camp-management";
import { listRegistrations } from "@/lib/registration-db";

export const dynamic="force-dynamic";
const field="min-h-12 rounded-xl border border-brand-border bg-white px-4 font-normal text-brand-forest placeholder:text-brand-muted/70 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20";

async function createAction(formData:FormData){"use server";const name=String(formData.get("name")||"").trim();if(!name)return;const capacityRaw=String(formData.get("capacity")||"").trim();await createCabin({name,leaderId:String(formData.get("leaderId")||""),capacity:capacityRaw?Number(capacityRaw):null,notes:String(formData.get("notes")||"").trim()});revalidatePath("/admin/cabanas");}
async function deleteAction(formData:FormData){"use server";const id=String(formData.get("id")||"");if(id)await deleteCabin(id);revalidatePath("/admin/cabanas");}

export default async function CabanasPage(){const[cabins,registrations]=await Promise.all([listCabins().catch(()=>[]),listRegistrations().catch(()=>[])]);return <main className="p-5 sm:p-8 lg:p-10">
  <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-gold">Gestión</p><h1 className="mt-2 text-4xl font-semibold text-brand-forest">Cabañas</h1><p className="mt-2 text-brand-muted">Organizá las cabañas y asigná un líder a cada grupo.</p></div>
  <section className="mt-8 rounded-2xl border border-brand-border bg-white p-5 sm:p-7"><h2 className="text-xl font-semibold text-brand-forest">Crear cabaña</h2><form action={createAction} className="mt-5 grid gap-4 lg:grid-cols-2">
    <label className="grid gap-2 text-sm font-semibold text-brand-forest">Nombre de la cabaña<input name="name" required placeholder="Ej. Cabaña 1" className={field}/></label>
    <label className="grid gap-2 text-sm font-semibold text-brand-forest">Líder de cabaña<select name="leaderId" className={field}><option value="">Sin asignar</option>{registrations.map(r=><option key={r.id} value={r.id}>{r.nombre} {r.apellido}</option>)}</select></label>
    <label className="grid gap-2 text-sm font-semibold text-brand-forest">Capacidad<input name="capacity" type="number" min="1" placeholder="Ej. 8" className={field}/></label>
    <label className="grid gap-2 text-sm font-semibold text-brand-forest">Observaciones<input name="notes" placeholder="Opcional" className={field}/></label>
    <button className="min-h-12 rounded-xl bg-brand-forest px-5 font-semibold text-white lg:col-span-2">Agregar cabaña</button>
  </form></section>
  <section className="mt-6"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{cabins.map(c=><article key={c.id} className="rounded-2xl border border-brand-border bg-white p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-brand-gold">Cabaña</p><h2 className="mt-1 text-2xl font-semibold text-brand-forest">{c.name}</h2></div><form action={deleteAction}><input type="hidden" name="id" value={c.id}/><button className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700">Eliminar</button></form></div><div className="mt-5 grid gap-3 text-sm"><p><span className="text-brand-muted">Líder:</span> <strong className="text-brand-forest">{c.leader?`${c.leader.nombre} ${c.leader.apellido}`:"Sin asignar"}</strong></p><p><span className="text-brand-muted">Capacidad:</span> <strong>{c.capacity||"Sin definir"}</strong></p>{c.notes?<p className="text-brand-muted">{c.notes}</p>:null}</div></article>)}{!cabins.length?<p className="text-sm text-brand-muted">Todavía no hay cabañas creadas.</p>:null}</div></section>
</main>}
