export type CampVideoSettings = {
  enabled: boolean;
  eyebrow: string;
  title: string;
  description: string;
  youtubeUrl: string;
};

const defaults: CampVideoSettings = {
  enabled: true,
  eyebrow: "Reviví la experiencia",
  title: "Así se vive Gracia Camp.",
  description: "Un vistazo real a los momentos que hacen especial al campamento.",
  youtubeUrl: "https://www.youtube.com/watch?v=_EpTnktKT-o",
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

export async function getCampVideoSettings(): Promise<CampVideoSettings> {
  try {
    const { url, key } = config();
    const response = await fetch(`${url}/rest/v1/camp_video_settings?id=eq.1&select=*`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    if (!response.ok) return defaults;
    const [row] = await response.json();
    if (!row) return defaults;
    return {
      enabled: row.enabled ?? true,
      eyebrow: row.eyebrow ?? defaults.eyebrow,
      title: row.title ?? defaults.title,
      description: row.description ?? defaults.description,
      youtubeUrl: row.youtube_url ?? defaults.youtubeUrl,
    };
  } catch {
    return defaults;
  }
}

export async function saveCampVideoSettings(data: Record<string, unknown>) {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/camp_video_settings?id=eq.1`, {
    method: "PATCH",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ ...data, updated_at: new Date().toISOString() }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("CAMP_VIDEO_SAVE_FAILED");
}
