import { NextResponse } from "next/server";

const TOKEN="gc-merch-2026-8c7f2e5a";
const BASE="https://raw.githubusercontent.com/equantum-py/club-de-jovenes-CBG/fix/merch-video-asset/.tmp-video";
const EXPECTED_SIZE=230686;

export async function GET(req:Request){
 const requestUrl=new URL(req.url);
 if(requestUrl.searchParams.get("token")!==TOKEN)return NextResponse.json({error:"Forbidden"},{status:403});
 const chunks:string[]=[];
 for(let i=0;i<=6;i++){
  const name=`chunk-${String(i).padStart(2,"0")}.b64`;
  const r=await fetch(`${BASE}/${name}`,{cache:"no-store"});
  if(!r.ok)return NextResponse.json({error:`chunk ${name}: ${r.status}`},{status:502});
  chunks.push((await r.text()).replace(/\s+/g,""));
 }
 const bytes=Buffer.from(chunks.join(""),"base64");
 if(bytes.length!==EXPECTED_SIZE)return NextResponse.json({error:`size ${bytes.length}`},{status:500});
 const supabaseUrl=process.env.SUPABASE_URL?.replace(/\/$/,"");
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!supabaseUrl||!key)return NextResponse.json({error:"storage config"},{status:500});
 const path="gracia-merch-2026.mp4";
 const upload=await fetch(`${supabaseUrl}/storage/v1/object/site-assets/${path}`,{method:"POST",headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"video/mp4","x-upsert":"true","cache-control":"3600"},body:bytes,cache:"no-store"});
 if(!upload.ok)return NextResponse.json({error:`upload ${upload.status}: ${await upload.text()}`},{status:500});
 return NextResponse.json({ok:true,size:bytes.length,url:`${supabaseUrl}/storage/v1/object/public/site-assets/${path}`});
}
