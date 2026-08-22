import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { saveCampVideoSettings, youtubeVideoId } from "@/lib/camp-video-settings";

const text = (form: FormData, key: string, max = 300) => String(form.get(key) || "").trim().slice(0, max);

export async function POST(request: Request) {
  if (!hasAdminSession()) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const youtubeUrl = text(form, "youtube_url", 500);
    if (!youtubeVideoId(youtubeUrl)) {
      return NextResponse.json({ error: "Ingresá un enlace válido de YouTube." }, { status: 400 });
    }

    await saveCampVideoSettings({
      enabled: form.get("enabled") === "on",
      eyebrow: text(form, "eyebrow", 80),
      title: text(form, "title", 140),
      description: text(form, "description", 320),
      source_type: "youtube",
      youtube_url: youtubeUrl,
    });

    return NextResponse.redirect(new URL("/admin/video-oficial?guardado=1", request.url), 303);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo guardar el video oficial." }, { status: 500 });
  }
}
