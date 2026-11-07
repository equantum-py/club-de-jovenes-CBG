import {NextResponse} from "next/server";
import {hasAdminSession} from "@/lib/admin-auth";
import {getSiteSettings,updateSiteSettings,uploadSiteAsset} from "@/lib/site-settings";
const KEY="/monte-arami-gallery";
function sameOrigin(req:Request){const origin=req.headers.get("origin");return !!origin&&new URL(origin).host===new URL(req.url).host;}
export async function POST(req:Request){
 if(!hasAdminSession())return NextResponse.json({error:"Acceso no autorizado"},{status:401});
 if(!sameOrigin(req))return NextResponse.json({error:"Origen no permitido"},{status:403});
 try{
  const form=await req.formData();
  const settings=await getSiteSettings();
  const current=settings.pageBanners as unknown as Record<string,unknown>;
  const entry=current[KEY] as {images?:string[]}|undefined;
  const images=Array.isArray(entry?.images)?entry.images.filter(x=>typeof x==="string"&&x.startsWith("monte-arami-")):[];
  const remove=form.get("remove");
  if(typeof remove==="string"&&images.includes(remove))images.splice(images.indexOf(remove),1);
  const uploads=form.getAll("images").filter((x):x is File=>x instanceof File&&x.size>0);
  if(uploads.length>8||images.length+uploads.length>12)return NextResponse.json({error:"Máximo 12 imágenes por galería."},{status:400});
  for(const file of uploads){
   if(file.size>8*1024*1024)return NextResponse.json({error:"Cada imagen debe pesar menos de 8 MB."},{status:400});
   if(!["image/jpeg","image/png","image/webp"].includes(file.type))return NextResponse.json({error:"Solo JPG, PNG o WebP."},{status:400});
   const bytes=new Uint8Array(await file.slice(0,12).arrayBuffer());
   const jpeg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
   const png=bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71;
   const webp=String.fromCharCode(...bytes.slice(0,4))==="RIFF"&&String.fromCharCode(...bytes.slice(8,12))==="WEBP";
   if(!(file.type==="image/jpeg"&&jpeg||file.type==="image/png"&&png||file.type==="image/webp"&&webp))return NextResponse.json({error:"Archivo de imagen inválido."},{status:400});
   images.push(await uploadSiteAsset(file,"monte-arami"));
  }
  await updateSiteSettings({page_banners:{...current,[KEY]:{images}}});
  return NextResponse.redirect(new URL("/admin/galeria-monte-arami?guardado=1",req.url),303);
 }catch{return NextResponse.json({error:"No se pudieron guardar las fotografías."},{status:500});}
}
