import { NextResponse } from "next/server";
import { saveMerchReservation } from "@/lib/merch-reservations";

const COLORS=new Set(["blanco","negro","gris","azul"]); const SIZES=new Set(["S","M","L","XL","XXL","XXXL"]);
const PROOF_TYPES=new Set(["image/jpeg","image/png","image/webp","application/pdf"]);
const clean=(v:FormDataEntryValue|null)=>String(v||"").replace(/[\u0000-\u001F\u007F]/g," ").trim().slice(0,180);

export async function POST(request:Request){
  const form=await request.formData().catch(()=>null); if(!form)return NextResponse.json({error:"Formulario inválido."},{status:400});
  const nombre=clean(form.get("nombre")), apellido=clean(form.get("apellido")), telefono=clean(form.get("telefono"));
  const deseaRemera=clean(form.get("deseaRemera"))==="si", talleRemera=clean(form.get("talleRemera")).toUpperCase(), colorRemera=clean(form.get("colorRemera")).toLowerCase();
  const deseaGorra=clean(form.get("deseaGorra"))==="si", colorGorra=clean(form.get("colorGorra")).toLowerCase();
  if(!nombre||!apellido||!telefono)return NextResponse.json({error:"Completá nombre, apellido y teléfono."},{status:400});
  if(!deseaRemera&&!deseaGorra)return NextResponse.json({error:"Elegí al menos una remera o una gorra."},{status:400});
  if(deseaRemera&&(!SIZES.has(talleRemera)||!COLORS.has(colorRemera)))return NextResponse.json({error:"Elegí talle y color válidos para la remera."},{status:400});
  if(deseaGorra&&!COLORS.has(colorGorra))return NextResponse.json({error:"Elegí un color válido para la gorra."},{status:400});
  const comprobante=form.get("comprobante"); if(!(comprobante instanceof File)||!comprobante.size)return NextResponse.json({error:"Adjuntá el comprobante de pago."},{status:400});
  if(comprobante.size>10*1024*1024||!PROOF_TYPES.has(comprobante.type))return NextResponse.json({error:"El comprobante debe ser JPG, PNG, WebP o PDF y pesar menos de 10 MB."},{status:400});
  try{await saveMerchReservation({nombre,apellido,telefono,deseaRemera,talleRemera,colorRemera,deseaGorra,colorGorra,comprobante});return NextResponse.json({ok:true});}
  catch(error){console.error(error);return NextResponse.json({error:"No pudimos guardar tu reserva. Intentá nuevamente."},{status:503});}
}
