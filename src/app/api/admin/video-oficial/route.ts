import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { getCampVideoSettings, saveCampVideoSettings, youtubeVideoId } from "@/lib/camp-video-settings";

const text = (form: FormData, key: string, max = 300) => String(form.get(key) || "").trim().slice(0, max);

export async function POST(request: Request) {
  if (!hasAdminSession()) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  try {
    const form = await request.formData();
    const current = await getCampVideoSettings();
    const requestedSource = text(form, "source_type", 20);
    const uploadedPath = text(form, "video_path", 500);
    const youtubeUrl = text(form, "youtube_url", 500) || current.youtubeUrl;
    const sourceType = requestedSource === "upload" || uploadedPath ? "upload" : requestedSource === "youtube" ? "youtube" : current.sourceType;
    if (sourceType === "youtube" && !youtubeVideoId(youtubeUrl)) return NextResponse.json({ error: "Ingresá un enlace válido de YouTube o cargá un archivo de video." }, { status: 400 });
    const videoPath = uploadedPath || current.videoPath;
    if (sourceType === "upload" && !videoPath) return NextResponse.json({ error: "Seleccioná un archivo MP4 o WebM." }, { status: 400 });

    await saveCampVideoSettings({
      show_text: form.get("show_text") === "on",
      eyebrow: text(form, "eyebrow", 80),
      title: text(form, "title", 140),
      description: text(form, "description", 320),
      source_type: sourceType,
      youtube_url: youtubeUrl,
      video_path: videoPath,
      autoplay: form.get("autoplay") === "on",
      sound_enabled: form.get("sound_enabled") === "on",
      loop: form.get("loop") === "on",
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo guardar el video oficial." }, { status: 500 });
  }
}
