import { NextRequest,NextResponse } from "next/server";
import {hasAdminSession} from "@/lib/admin-auth";
import {listPrelista,insertPrelista,updatePrelista,deletePrelista} from "@/lib/prelista-db";
export const runtime="nodejs";
const unauthorized=()=>NextResponse.json({error:"No autorizado"},{status:401});
function failure(e:unknown){return NextResponse.json({error:e instanceof Error?e.message:"Error inesperado"},{status:500})}
export async function GET(){if(!hasAdminSession())return unauthorized();try{return NextResponse.json({rows:await listPrelista()},{headers:{"Cache-Control":"no-store"}})}catch(e){return failure(e)}}
export async function POST(req:NextRequest){if(!hasAdminSession())return unauthorized();try{const body=await req.json();if(!body||!Array.isArray(body.rows)||!body.rows.length||body.rows.length>300)return NextResponse.json({error:"Entre 1 y 300 registros por carga"},{status:400});const rows=await insertPrelista(body.rows);return NextResponse.json({rows})}catch(e){return failure(e)}}
export async function PATCH(req:NextRequest){if(!hasAdminSession())return unauthorized();try{const body=await req.json();if(!/^[0-9a-f-]{36}$/i.test(body.id||""))return NextResponse.json({error:"ID inválido"},{status:400});return NextResponse.json({rows:await updatePrelista(body.id,body.row)})}catch(e){return failure(e)}}
export async function DELETE(req:NextRequest){if(!hasAdminSession())return unauthorized();try{const body=await req.json();if(!/^[0-9a-f-]{36}$/i.test(body.id||""))return NextResponse.json({error:"ID inválido"},{status:400});await deletePrelista(body.id);return NextResponse.json({ok:true})}catch(e){return failure(e)}}
