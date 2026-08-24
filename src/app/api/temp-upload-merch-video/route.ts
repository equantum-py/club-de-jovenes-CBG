import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TOKEN="gc-merch-2026-8c7f2e5a";
const BASE="https://raw.githubusercontent.com/equantum-py/club-de-jovenes-CBG/fix/merch-video-asset/.tmp-video";
const EXPECTED_SIZE=230686;

export async function GET(req:Request){
 const url=new URL(req.url);
 if(url.searchParams.get("token")!==TOKEN)return NextResponse.json({error:"Forbidden"},{status:403});
 const chunks:string[]=[];
 for(let i=0;i<=6;i++){
  const name=`chunk-${String(i).padStart(2,"0")}.b64`;
  const r=await fetch(`${BASE}/${name}`,{cache:"no-store"});
  if(!r.ok)return NextResponse.json({error:`chunk ${name}: ${r.status}`},{status:502});
  chunks.push((await r.text()).replace(/\s+/g,""));
 }
 const bytes=Buffer.from(chunks.join(""),"base64");
 if(bytes.length!==EXPECTED_SIZE)return NextResponse.json({error:`size ${bytes.length}`},{status:500});
 const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!);
 const path="gracia-merch-2026.mp4";
 const {error}=await supabase.storage.from("site-assets").upload(path,bytes,{contentType:"video/mp4",cacheControl:"3600",upsert:true});
 if(error)return NextResponse.json({error:error.message},{status:500});
 const {data}=supabase.storage.from("site-assets").getPublicUrl(path);
 return NextResponse.json({ok:true,size:bytes.length,url:data.publicUrl});
}
