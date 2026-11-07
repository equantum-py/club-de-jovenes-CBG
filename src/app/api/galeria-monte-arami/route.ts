import {NextResponse} from "next/server";
import {getSiteSettings,publicAssetUrl} from "@/lib/site-settings";
export const dynamic="force-dynamic";
export async function GET(){
 const settings=await getSiteSettings();
 const entry=(settings.pageBanners as unknown as Record<string,{images?:string[]}>)[ "/monte-arami-gallery" ];
 const images=Array.isArray(entry?.images)?entry.images.filter(x=>typeof x==="string"&&/^monte-arami-[a-zA-Z0-9.-]+\.(jpg|png|webp)$/.test(x)).slice(0,12).map(publicAssetUrl):[];
 return NextResponse.json({images},{headers:{"Cache-Control":"no-store"}});
}
