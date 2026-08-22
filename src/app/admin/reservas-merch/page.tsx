import { listMerchReservations } from "@/lib/merch-reservations";

export const dynamic="force-dynamic";
const fmt=(n:number)=>`Gs. ${n.toLocaleString("es-PY")}`;

export default async function MerchReservationsAdmin(){
  const rows=await listMerchReservations().catch(()=>[]);
  const total=rows.reduce((sum,row)=>sum+row.total,0);
  return <main className="p-5 sm:p-8 lg:p-10"><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-gold">Gestión</p><h1 className="mt-2 text-4xl font-semibold text-brand-forest">Reservas de merch</h1><p className="mt-2 text-brand-muted">Solicitudes de remeras y gorras enviadas desde la página pública.</p>
    <div className="mt-7 grid gap-4 sm:grid-cols-3"><Stat label="Reservas" value={String(rows.length)}/><Stat label="Pendientes" value={String(rows.filter(r=>r.estado==="pendiente").length)}/><Stat label="Total solicitado" value={fmt(total)}/></div>
    <div className="mt-7 overflow-x-auto rounded-2xl border border-brand-border bg-white"><table className="min-w-[1050px] w-full text-left text-sm"><thead className="bg-brand-cream text-xs uppercase tracking-wider text-brand-muted"><tr><th className="p-4">Fecha</th><th className="p-4">Nombre</th><th className="p-4">Teléfono</th><th className="p-4">Remera</th><th className="p-4">Gorra</th><th className="p-4">Total</th><th className="p-4">Comprobante</th><th className="p-4">Estado</th></tr></thead><tbody className="divide-y divide-brand-border">{rows.map(r=><tr key={r.id}><td className="p-4 text-brand-muted">{r.createdAt?new Date(r.createdAt).toLocaleString("es-PY"):"—"}</td><td className="p-4 font-semibold text-brand-forest">{r.nombre} {r.apellido}</td><td className="p-4">{r.telefono}</td><td className="p-4">{r.deseaRemera?`${r.talleRemera} · ${r.colorRemera} · ${fmt(r.precioRemera)}`:"No"}</td><td className="p-4">{r.deseaGorra?`${r.colorGorra} · ${fmt(r.precioGorra)}`:"No"}</td><td className="p-4 font-bold text-brand-forest">{fmt(r.total)}</td><td className="p-4">{r.comprobanteUrl?<a href={r.comprobanteUrl} target="_blank" rel="noreferrer" className="font-semibold text-brand-forest underline">Ver comprobante</a>:"—"}</td><td className="p-4"><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold capitalize text-amber-800">{r.estado}</span></td></tr>)}{!rows.length?<tr><td colSpan={8} className="p-8 text-center text-brand-muted">Todavía no hay reservas de merch.</td></tr>:null}</tbody></table></div>
  </main>;
}
function Stat({label,value}:{label:string;value:string}){return <div className="rounded-2xl border border-brand-border bg-white p-5"><p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">{label}</p><p className="mt-2 text-2xl font-bold text-brand-forest">{value}</p></div>}
