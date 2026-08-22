import { publicAssetUrl } from "@/lib/site-settings";

export type CampVideoSettings = {
  enabled: boolean;
  showText: boolean;
  eyebrow: string;
  title: string;
  description: string;
  sourceType: "youtube" | "upload" | "drive";
  youtubeUrl: string;
  videoPath: string;
  driveFileId: string;
  driveUrl: string;
  autoplay: boolean;
  soundEnabled: boolean;
  loop: boolean;
};

const defaults: CampVideoSettings = {
  enabled: true,
  showText: true,
  eyebrow: "Reviví la experiencia",
  title: "Así se vive Gracia Camp.",
  description: "Un vistazo real a los momentos que hacen especial al campamento.",
  sourceType: "youtube",
  youtubeUrl: "https://www.youtube.com/watch?v=_EpTnktKT-o",
  videoPath: "",
  driveFileId: "",
  driveUrl: "",
  autoplay: true,
  soundEnabled: true,
  loop: false,
};

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_NOT_CONFIGURED");
  return { url, key };
}

export function youtubeVideoId(value: string) {
  const input = value.trim();
  if (!input) return "";
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input;
  try {
    const url = new URL(input);
    if (url.hostname === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] || "";
    if (url.hostname.endsWith("youtube.com")) {
      const queryId = url.searchParams.get("v");
      if (queryId) return queryId;
      const parts = url.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live"].includes(parts[0])) return parts[1] || "";
    }
  } catch {}
  return "";
}

export function campVideoUrl(path: string) { return path ? publicAssetUrl(path) : ""; }
export function drivePreviewUrl(fileId: string) { return fileId ? `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview` : ""; }

export async function createCampVideoSignedUpload(fileName: string, mimeType: string) {
  const { url, key } = config();
  const lowerName = fileName.toLowerCase();
  let ext = "mp4";
  if (mimeType === "video/webm" || lowerName.endsWith(".webm")) ext = "webm";
  else if (["video/quicktime", "video/mov", "video/x-quicktime"].includes(mimeType) || lowerName.endsWith(".mov")) ext = "mov";
  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/\.[^.]+$/, "").slice(0, 50) || "video";
  const path = `camp-video-${safe}-${Date.now()}.${ext}`;
  const response = await fetch(`${url}/storage/v1/object/upload/sign/site-assets/${path}`, { method: "POST", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: "{}", cache: "no-store" });
  if (!response.ok) throw new Error("SIGNED_UPLOAD_URL_FAILED");
  const data = await response.json();
  return { path, signedUrl: new URL(`/storage/v1${data.url}`, url).toString() };
}

export async function getCampVideoSettings(): Promise<CampVideoSettings> {
  try {
    const { url, key } = config();
    const response = await fetch(`${url}/rest/v1/camp_video_settings?id=eq.1&select=*`, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" });
    if (!response.ok) return defaults;
    const [row] = await response.json();
    if (!row) return defaults;
    const sourceType: CampVideoSettings["sourceType"] = row.source_type === "drive" ? "drive" : row.source_type === "upload" ? "upload" : "youtube";
    return { enabled: true, showText: row.show_text ?? true, eyebrow: row.eyebrow ?? defaults.eyebrow, title: row.title ?? defaults.title, description: row.description ?? defaults.description, sourceType, youtubeUrl: row.youtube_url ?? defaults.youtubeUrl, videoPath: row.video_path || "", driveFileId: row.drive_file_id || "", driveUrl: row.drive_url || "", autoplay: row.autoplay ?? true, soundEnabled: row.sound_enabled ?? true, loop: row.loop ?? false };
  } catch { return defaults; }
}

export async function saveCampVideoSettings(data: Record<string, unknown>) {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/camp_video_settings?id=eq.1`, { method: "PATCH", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify({ ...data, enabled: true, updated_at: new Date().toISOString() }), cache: "no-store" });
  if (!response.ok) throw new Error("CAMP_VIDEO_SAVE_FAILED");
}
