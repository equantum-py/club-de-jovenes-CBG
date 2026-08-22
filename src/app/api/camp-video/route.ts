import { NextResponse } from "next/server";
import { getCampVideoSettings, youtubeVideoId } from "@/lib/camp-video-settings";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getCampVideoSettings();
  const videoId = youtubeVideoId(settings.youtubeUrl);
  return NextResponse.json(
    {
      ...settings,
      videoId,
      thumbnailUrl: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "",
      embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : "",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
