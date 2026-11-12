import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { hasAdminSession } from "@/lib/admin-auth";
import { saveRegistration, type RegistrationPayload } from "@/lib/registration-db";

export const dynamic="force-dynamic";
const input="mt-1 w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-brand-forest focus:outline-none focus:ring-2 focus:ring-brand-gold/40";
const labels:Record<string,string>={nombre:"Nombre",apellido:"Apellido",edad:"Edad",sexo:"Sexo",cedula:"Cédula",telefono:"Teléfono",iglesia:"Iglesia",esInvitado:"¿Es invitado?",invitadoPor:"Invitado por",contactoEmergenciaNombre:"Contacto de emergencia",contactoEmergenciaTelefono:"Teléfono de emergencia",nombrePadreMadre:"Padre, madre o tutor",telefonoPadreMadre:"Teléfono del responsable",alergias:"Alergias",medicamentos:"Medicamentos",enfermedadBase:"Enfermedad de base",deseaRemera:"¿Desea remera?",talleRemera:"Talle",colorRemera:"Color de remera",deseaGorra:"¿Desea gorra?",colorGorra:"Color de gorra"};
const required=["nombre","apellido"];
async function createManual(formData:FormData){
 "use server";
 if(!hasAdminSession())throw new Error("Acceso no autorizado");
 const val=(key:string)=>String(formData.get(key)??"").trim().slice(0,200);
 const payload:RegistrationPayload={
 nombre:val("nombre"),apellido:val("apellido"),edad:val("edad"),telefono:val("telefono"),cedula:val("cedula"),sexo:val("sexo"),iglesia:val("iglesia"),
 esInvitado:val("esInvitado")||"No",invitadoPor:val("invitadoPor"),alergias:val("alergias"),medicamentos:val("medicamentos"),enfermedadBase:val("enfermedadBase"),
 contactoEmergenciaNombre:val("contactoEmergenciaNombre"),contactoEmergenciaTelefono:val("contactoEmergenciaTelefono"),formaPago:"transferencia",
 nombrePadreMadre:val("nombrePadreMadre"),telefonoPadreMadre:val("telefonoPadreMadre"),deseaRemera:val("deseaRemera")||"No",
 talleRemera:val("talleRemera"),colorRemera:val("colorRemera"),deseaGorra:val("deseaGorra")||"No",colorGorra:val("colorGorra")
 };
 if(required.some(k=>!val(k))||(payload.cedula&&!/^\d{3,12}$/.test(payload.cedula.replace(/[.\s]/g,"")))||(payload.edad&&(!/^\d{1,2}$/.test(payload.edad)||Number(payload.edad)<1||Number(payload.edad)>99)))throw new Error("Revisá los campos obligatorios, la edad y la cédula.");
 await saveRegistration({...payload,cedula:payload.cedula.replace(/[.\s]/g,"")});
 revalidatePath("/admin/participantes");revalidatePath("/admin");
 redirect("/admin/participantes");
}
function Field({name,required:must=false}:{name:string;required?:boolean}){
 return <label className="block text-sm font-semibold text-brand-forest">{labels[name]}{must?" *":""}<input name={name} required={must} type={name==="edad"?"number":name==="telefono"||name.toLowerCase().includes("telefono")?"tel":"text"} min={name==="edad"?1:undefined} max={name==="edad"?99:undefined} maxLength={200} className={input}/></label>;
}
function Select({name,options}:{name:string;options:string[]}){
 return <label className="block text-sm font-semibold text-brand-forest">{labels[name]}<select name={name} className={input}>{options.map(v=><option key={v} value={v}>{v||"Seleccionar"}</option>)}</select></label>;
}
export default function NuevoAcampante(){
 if(!hasAdminSession())redirect("/admin/login");
 return <main className="p-5 sm:p-8 lg:p-10"><div className="mx-auto max-w-4xl"><Link href="/admin/participantes" className="text-sm font-semibold text-brand-forest">← Volver a inscripciones</Link><p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-gold">Gestión · Inscripciones</p><h1 className="mt-2 text-3xl font-bold text-brand-forest">Agregar acampante</h1><p className="mt-2 text-sm text-brand-muted">Carga manual desde administración. Los campos con * son obligatorios. No se exige foto ni comprobante.</p>
 <form action={createManual} className="mt-6 space-y-6">
 <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7"><h2 className="mb-5 text-xl font-bold text-brand-forest">Datos del participante</h2><div className="grid gap-4 sm:grid-cols-2">{["nombre","apellido","edad","cedula","telefono","iglesia"].map(k=><Field key={k} name={k} required={required.includes(k)}/>)}<Select name="sexo" options={["","Masculino","Femenino"]}/><Select name="esInvitado" options={["No","Sí"]}/><Field name="invitadoPor"/></div></section>
 <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7"><h2 className="mb-5 text-xl font-bold text-brand-forest">Responsable y salud</h2><div className="grid gap-4 sm:grid-cols-2">{["nombrePadreMadre","telefonoPadreMadre","contactoEmergenciaNombre","contactoEmergenciaTelefono","alergias","medicamentos","enfermedadBase"].map(k=><Field key={k} name={k}/>)}</div></section>
 <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7"><h2 className="mb-5 text-xl font-bold text-brand-forest">Merch y pago</h2><p className="mb-4 text-sm text-brand-muted">El sistema calcula los importes vigentes. El comprobante se podrá gestionar posteriormente.</p><div className="grid gap-4 sm:grid-cols-2"><Select name="deseaRemera" options={["No","Sí"]}/><Select name="talleRemera" options={["","XS","S","M","L","XL","XXL","XXXL"]}/><Field name="colorRemera"/><Select name="deseaGorra" options={["No","Sí"]}/><Field name="colorGorra"/></div></section>
 <div className="flex flex-wrap justify-end gap-3"><Link href="/admin/participantes" className="rounded-xl border border-brand-border px-6 py-3 font-semibold text-brand-forest">Cancelar</Link><button type="submit" className="rounded-xl bg-brand-forest px-7 py-3 font-bold text-white hover:opacity-90">Guardar acampante</button></div></form></div></main>;
}
