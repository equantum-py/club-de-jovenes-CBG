

export type ConferenceParticipant = {
  id: string;
  nombre: string;
  apellido: string;
  iglesia: string;
  sorteado: boolean;
  created_at: string;
};

const TABLE = "conferencia_ruleta_2026";

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_NOT_CONFIGURED");
  return { url, key };
}

async function query(path: string, options?: {method?: string; body?: unknown; prefer?: string}) {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    method: options?.method ?? "GET",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(options?.prefer ? { Prefer: options.prefer } : {}),
    },
    ...(options?.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
    cache: "no-store",
    signal: AbortSignal.timeout(9000),
  });
  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { code?: string };
    const error = new Error("CONFERENCIA_DB_ERROR") as Error & { code?: string };
    error.code = data.code;
    throw error;
  }
  return response.status === 204 ? null : response.json().catch(() => null);
}

export function cleanField(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  const text = value.normalize("NFC").trim().replace(/\s+/g, " ");
  if (text.length < 2 || text.length > max || /[<>\u0000-\u001f\u007f]/u.test(text)) return "";
  return text;
}

export async function registerConferenceParticipant(nombre: string, apellido: string, iglesia: string) {
  await query(TABLE, { method: "POST", prefer: "return=minimal", body: { nombre, apellido, iglesia } });
}

export async function listConferenceParticipants(): Promise<ConferenceParticipant[]> {
  const rows = await query(`${TABLE}?select=id,nombre,apellido,iglesia,sorteado,created_at&order=created_at.asc&limit=1000`);
  return (rows ?? []) as ConferenceParticipant[];
}

// Turnos por inicial de iglesia: R → I → C → R…
// Cuando una letra no tiene participantes disponibles, se salta a la siguiente.
const CHURCH_ORDER = ["R", "I", "C"] as const;
function churchGroup(iglesia: string): number {
  const initial = iglesia.trim().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toUpperCase()[0];
  return CHURCH_ORDER.indexOf(initial as (typeof CHURCH_ORDER)[number]);
}

type DrawRow = ConferenceParticipant & { sorteado_at?: string | null };
export async function pickConferenceParticipant(): Promise<ConferenceParticipant | null> {
  // El último sorteo determina la siguiente inicial. Las actualizaciones
  // condicionales evitan elegir dos veces a una misma persona.
  for (let attempt = 0; attempt < 5; attempt++) {
    const rows = (await query(`${TABLE}?select=id,nombre,apellido,iglesia,sorteado,created_at,sorteado_at&order=created_at.asc&limit=1000`)) as DrawRow[];
    const available = rows.filter(p => !p.sorteado);
    if (!available.length) return null;
    const last = rows.filter(p => p.sorteado && p.sorteado_at)
      .sort((a,b) => (b.sorteado_at ?? "").localeCompare(a.sorteado_at ?? ""))[0];
    const lastGroup = last ? churchGroup(last.iglesia) : -1;
    let candidates: DrawRow[] = [];
    for (let offset = 1; offset <= CHURCH_ORDER.length; offset++) {
      const nextGroup = (lastGroup + offset) % CHURCH_ORDER.length;
      candidates = available.filter(p => churchGroup(p.iglesia) === nextGroup);
      if (candidates.length) break;
    }
    // Iglesias con otras iniciales también participan, cuando no hay R/I/C.
    if (!candidates.length) candidates = available;
    const selected = candidates[Math.floor(Math.random() * candidates.length)];
    const updated = (await query(`${TABLE}?id=eq.${encodeURIComponent(selected.id)}&sorteado=eq.false&select=id,nombre,apellido,iglesia,sorteado,created_at`, {
      method: "PATCH", prefer: "return=representation",
      body: {sorteado: true, sorteado_at: new Date().toISOString()},
    })) as ConferenceParticipant[] | null;
    if (updated?.length) return updated[0];
  }
  throw new Error("CONFERENCIA_CONCURRENT_DRAW");
}

export async function resetConferenceDraw() {
  await query("rpc/conferencia_reiniciar_2026", { method: "POST", body: {} });
}

export async function deleteConferenceParticipant(id:string) {
 await query(`${TABLE}?id=eq.${encodeURIComponent(id)}`,{method:"DELETE",prefer:"return=minimal"});
}
