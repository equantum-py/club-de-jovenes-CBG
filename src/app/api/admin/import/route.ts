import { NextRequest, NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { listRegistrations, saveRegistration, type RegistrationPayload } from "@/lib/registration-db";
export const runtime="nodejs";
const clean=(x:unknown)=>String(x??"").trim().slice(0,200);
const normalize=(x:string)=>x.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"");
const aliases:Record<string,string[]>={nombre:["nombre","nombres"],apellido:["apellido","apellidos"],edad:["edad"],telefono:["telefono","celular","whatsapp"],cedula:["cedula","ci","documento"],sexo:["sexo","genero"],iglesia:["iglesia","congregacion"],esInvitado:["esinvitado","invitado"],invitadoPor:["invitadopor"],alergias:["alergias"],medicamentos:["medicamentos"],enfermedadBase:["enfermedadbase"],contactoEmergenciaNombre:["contactoemergencianombre"],contactoEmergenciaTelefono:["contactoemergenciatelefono"],nombrePadreMadre:["nombrepadremadre"],telefonoPadreMadre:["telefonopadremadre"],deseaRemera:["desearemera"],talleRemera:["talleremera"],colorRemera:["colorremera"],deseaGorra:["deseagorra"],colorGorra:["colorgorra"]};
export async function POST(req:NextRequest){
 if(!hasAdminSession())return NextResponse.json({error:"No autorizado"},{status:401});
 let data:unknown;try{data=await req.json()}catch{return NextResponse.json({error:"Archivo inválido"},{status:400})}
 if(!data||typeof data!=="object"||!Array.isArray((data as {rows?:unknown}).rows))return NextResponse.json({error:"Formato inválido"},{status:400});
 const rows=(data as {rows:unknown[]}).rows;
 if(!rows.length||rows.length>300)return NextResponse.json({error:"Se admiten entre 1 y 300 filas por importación."},{status:400});
 const existing=await listRegistrations().catch(()=>null);
 if(!existing)return NextResponse.json({error:"No se pudo verificar los registros existentes."},{status:503});
 const seen=new Set(existing.filter(r=>r.cedula).map(r=>r.cedula.replace(/\D/g,"")));
 const names=new Set(existing.map(r=>normalize(r.nombre+" "+r.apellido+" "+r.iglesia)));
 let imported=0;const errors:string[]=[];let skipped=0;
 for(let i=0;i<rows.length;i++){
 const row=rows[i];if(!row||typeof row!=="object"||Array.isArray(row)){errors.push("Fila "+(i+2)+": formato incorrecto");continue}
 const source=Object.fromEntries(Object.entries(row as Record<string,unknown>).map(([k,v])=>[normalize(k),clean(v)]));
 const get=(key:string)=>aliases[key]?.map(k=>source[k]).find(v=>v!==undefined)??"";
 const nombre=get("nombre"),apellido=get("apellido"),cedula=get("cedula").replace(/[.\s]/g,""),edad=get("edad");
 if(!nombre||!apellido){errors.push("Fila "+(i+2)+": falta nombre o apellido");continue}
 if((cedula&&!/^\d{3,12}$/.test(cedula))||(edad&&(!/^\d{1,2}$/.test(edad)||+edad<1||+edad>99))){errors.push("Fila "+(i+2)+": edad o cédula inválida");continue}
 const nameKey=normalize(nombre+" "+apellido+" "+get("iglesia"));
 if((cedula&&seen.has(cedula))||names.has(nameKey)){skipped++;continue}
 const payload={} as RegistrationPayload;
 for(const key of Object.keys(aliases) as Array<keyof RegistrationPayload>){payload[key]=get(key)}
 payload.cedula=cedula;payload.formaPago="transferencia";payload.esInvitado=payload.esInvitado||"No";payload.deseaRemera=payload.deseaRemera||"No";payload.deseaGorra=payload.deseaGorra||"No";
 try{await saveRegistration(payload);imported++;if(cedula)seen.add(cedula);names.add(nameKey)}catch{errors.push("Fila "+(i+2)+": no se pudo guardar (posible duplicado o validación de base de datos)")}
 }
 return NextResponse.json({imported,skipped,errors});
}