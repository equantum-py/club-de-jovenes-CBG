import { NextResponse } from "next/server";
import { cleanField, registerConferenceParticipant } from "@/lib/conferencia-ruleta";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return NextResponse.json({error: "Solicitud no permitida."}, {status: 403});
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({error: "Formato inválido."}, {status: 415});
  }
  if (Number(request.headers.get("content-length") ?? 0) > 2048) {
    return NextResponse.json({error: "Solicitud demasiado grande."}, {status: 413});
  }
  const body = await request.json().catch(() => null);
  if (body?.website) return NextResponse.json({ok: true});
  const nombre = cleanField(body?.nombre, 60);
  const apellido = cleanField(body?.apellido, 60);
  const iglesia = cleanField(body?.iglesia, 100);
  if (!nombre || !apellido || !iglesia) {
    return NextResponse.json({error: "Completá correctamente los tres campos."}, {status: 400});
  }
  try {
    await registerConferenceParticipant(nombre, apellido, iglesia);
    return NextResponse.json({ok: true}, {status: 201, headers: {"Cache-Control": "no-store"}});
  } catch (error) {
    if ((error as {code?: string}).code === "23505") {
      return NextResponse.json({error: "Ya existe ese registro. ¡Ya estás participando!"}, {status: 409});
    }
    console.error("CONFERENCIA_REGISTRO_FAILED");
    return NextResponse.json({error: "No se pudo registrar. Intentá nuevamente."}, {status: 503});
  }
}
