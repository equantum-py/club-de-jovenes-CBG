import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { deleteConferenceParticipant, listConferenceParticipants, pickConferenceParticipant, resetConferenceDraw } from "@/lib/conferencia-ruleta";

export const dynamic = "force-dynamic";

function denied() { return NextResponse.json({error: "Acceso no autorizado."}, {status: 401}); }
function validOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !!origin && new URL(origin).host === new URL(request.url).host;
}

export async function GET() {
  if (!hasAdminSession()) return denied();
  try {return NextResponse.json({participantes: await listConferenceParticipants()}, {headers: {"Cache-Control": "no-store"}});}
  catch {return NextResponse.json({error: "No se pudo consultar la lista."}, {status: 503});}
}

export async function POST(request: Request) {
  if (!hasAdminSession()) return denied();
  if (!validOrigin(request)) return NextResponse.json({error: "Origen inválido."}, {status: 403});
  if (!request.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({error: "Formato inválido."}, {status: 415});
  const body = await request.json().catch(() => null);
  try {
    if (body?.action === "spin") {
      const ganador = await pickConferenceParticipant();
      if (!ganador) return NextResponse.json({error: "No quedan participantes por sortear."}, {status: 409});
      return NextResponse.json({ganador}, {headers: {"Cache-Control": "no-store"}});
    }
    if (body?.action === "reset" && body?.confirm === "REINICIAR") {
      await resetConferenceDraw();
      return NextResponse.json({ok: true});
    }
    return NextResponse.json({error: "Acción no válida."}, {status: 400});
  } catch {return NextResponse.json({error: "No se pudo completar la operación."}, {status: 503});}
}

export async function DELETE(request:Request) {
 if(!hasAdminSession())return denied();
 if(!validOrigin(request))return NextResponse.json({error:"Origen inválido."},{status:403});
 if(!request.headers.get("content-type")?.startsWith("application/json"))return NextResponse.json({error:"Formato inválido."},{status:415});
 const body=await request.json().catch(()=>null);
 const id=body?.id;
 if(typeof id!=="string"||!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))return NextResponse.json({error:"ID inválido."},{status:400});
 try{await deleteConferenceParticipant(id);return NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});}
 catch{return NextResponse.json({error:"No se pudo eliminar el registro."},{status:503});}
}
