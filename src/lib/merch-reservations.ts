import { getSignedPaymentProofUrl, uploadPaymentProof } from "@/lib/registration-db";

export type MerchReservation = {
  id:string; createdAt:string; nombre:string; apellido:string; telefono:string;
  deseaRemera:boolean; talleRemera:string; colorRemera:string; precioRemera:number;
  deseaGorra:boolean; colorGorra:string; precioGorra:number; total:number;
  comprobantePath:string; comprobanteUrl?:string; estado:string;
};

const SHIRT_PRICE=100000; const SHIRT_XL_PRICE=120000; const CAP_PRICE=30000;
function config(){const url=process.env.SUPABASE_URL?.replace(/\/$/,"");const key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!url||!key)throw new Error("SUPABASE_NOT_CONFIGURED");return{url,key};}
function headers(key:string){return{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json"};}

export async function saveMerchReservation(input:{nombre:string;apellido:string;telefono:string;deseaRemera:boolean;talleRemera:string;colorRemera:string;deseaGorra:boolean;colorGorra:string;comprobante:File}){
  const shirtPrice=input.deseaRemera?(["XL","XXL","XXXL"].includes(input.talleRemera.toUpperCase())?SHIRT_XL_PRICE:SHIRT_PRICE):0;
  const capPrice=input.deseaGorra?CAP_PRICE:0; const total=shirtPrice+capPrice;
  const comprobantePath=await uploadPaymentProof(input.comprobante, input.telefono);
  const {url,key}=config();
  const r=await fetch(`${url}/rest/v1/merch_reservations`,{method:"POST",headers:{...headers(key),Prefer:"return=minimal"},body:JSON.stringify({nombre:input.nombre,apellido:input.apellido,telefono:input.telefono,desea_remera:input.deseaRemera,talle_remera:input.deseaRemera?input.talleRemera:null,color_remera:input.deseaRemera?input.colorRemera:null,precio_remera:shirtPrice,desea_gorra:input.deseaGorra,color_gorra:input.deseaGorra?input.colorGorra:null,precio_gorra:capPrice,total,comprobante_path:comprobantePath}),cache:"no-store"});
  if(!r.ok)throw new Error("MERCH_RESERVATION_SAVE_FAILED");
}

export async function listMerchReservations():Promise<MerchReservation[]>{const{url,key}=config();const r=await fetch(`${url}/rest/v1/merch_reservations?select=*&order=created_at.desc`,{headers:headers(key),cache:"no-store"});if(!r.ok)throw new Error("MERCH_RESERVATION_READ_FAILED");const rows=await r.json() as Record<string,unknown>[];return Promise.all(rows.map(async row=>({id:String(row.id||""),createdAt:String(row.created_at||""),nombre:String(row.nombre||""),apellido:String(row.apellido||""),telefono:String(row.telefono||""),deseaRemera:Boolean(row.desea_remera),talleRemera:String(row.talle_remera||""),colorRemera:String(row.color_remera||""),precioRemera:Number(row.precio_remera||0),deseaGorra:Boolean(row.desea_gorra),colorGorra:String(row.color_gorra||""),precioGorra:Number(row.precio_gorra||0),total:Number(row.total||0),comprobantePath:String(row.comprobante_path||""),comprobanteUrl:await getSignedPaymentProofUrl(String(row.comprobante_path||""),3600),estado:String(row.estado||"pendiente")})));}
