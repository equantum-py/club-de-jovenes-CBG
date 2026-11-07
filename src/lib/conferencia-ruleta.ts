import { randomInt } from "node:crypto";

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

export async function pickConferenceParticipant(): Promise<ConferenceParticipant | null> {
  // La selección y la exclusión se ejecutan en una sola transacción en PostgreSQL.
  const participant = await query("rpc/conferencia_elegir_2026", { method: "POST", body: {} });
  return (participant ?? null) as ConferenceParticipant | null;
}

export async function resetConferenceDraw() {
  await query("rpc/conferencia_reiniciar_2026", { method: "POST", body: {} });
}
