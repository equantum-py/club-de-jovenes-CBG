import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { createCampVideoSignedUpload } from "@/lib/camp-video-settings";

const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/mov", "video/x-quicktime"];

export async function POST(request: Request) {
  if (!hasAdminSession()) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  try {
    const body = await request.json();
    const fileName = String(body?.fileName || "video.mp4");
    const mimeType = String(body?.mimeType || "");
    const isMovByName = fileName.toLowerCase().endsWith(".mov");
    if (!ALLOWED_VIDEO_TYPES.includes(mimeType) && !isMovByName) {
      return NextResponse.json({ error: "Formato no válido. Usá MP4, WebM o MOV." }, { status: 400 });
    }
    const data = await createCampVideoSignedUpload(fileName, mimeType);
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo preparar la carga del video." }, { status: 500 });
  }
}
