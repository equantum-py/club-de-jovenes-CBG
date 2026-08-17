import { randomBytes } from "crypto";
import { google } from "googleapis";
import { NextResponse } from "next/server";
import { clean, MAX_REQUEST_BYTES, normalizeCedula, type RegistroPayload, validateRegistro } from "@/lib/registro";

const RANGE = "Registros!A:W";
const attempts = new Map<string, { count: number; reset: number }>();

function response(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function allowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const requestOrigin = new URL(request.url).origin;
    const officialOrigin = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin : requestOrigin;
    return new URL(origin).origin === requestOrigin || new URL(origin).origin === officialOrigin;
  } catch { return false; }
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, cache: "no-store" });
  const data = await result.json() as { success?: boolean };
  return data.success === true;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) return response("Enviá el formulario en formato JSON.", 415);
  if (!allowedOrigin(request)) return response("No pudimos verificar el origen de la solicitud.", 403);
  const declaredSize = Number(request.headers.get("content-length") || 0);
  if (declaredSize > MAX_REQUEST_BYTES) return response("El formulario es demasiado grande.", 413);

  const ip = clientIp(request);
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.reset > now && current.count >= 5) return response("Demasiados intentos. Esperá unos minutos.", 429);
  attempts.set(ip, !current || current.reset <= now ? { count: 1, reset: now + 10 * 60_000 } : { ...current, count: current.count + 1 });

  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_REQUEST_BYTES) return response("El formulario es demasiado grande.", 413);
    const payload = JSON.parse(raw) as RegistroPayload;
    if (payload.website) return NextResponse.json({ ok: true, codigo: "RECIBIDO" });
    const errors = validateRegistro(payload);
    if (errors.length) return response(errors[0], 400);
    if (!(await verifyTurnstile(payload.turnstileToken, ip))) return response("Completá la verificación de seguridad.", 400);

    const { GOOGLE_CLIENT_EMAIL: email, GOOGLE_PRIVATE_KEY: key, GOOGLE_SHEET_ID: spreadsheetId } = process.env;
    if (!email || !key || !spreadsheetId) return response("El registro no está disponible por el momento.", 503);
    const auth = new google.auth.JWT({ email, key: key.replace(/\\n/g, "\n").trim(), scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
    const sheets = google.sheets({ version: "v4", auth });
    const existing = await sheets.spreadsheets.values.get({ spreadsheetId, range: "Registros!F:F" });
    const cedula = normalizeCedula(payload.cedula);
    if ((existing.data.values || []).some((row: unknown[]) => normalizeCedula(String(row[0] || "")) === cedula)) return response("Ya existe una inscripción con esta cédula.", 409);

    const age = Number(payload.edad), minor = age < 18, invited = payload.esInvitado === "si";
    const codigo = `GC26-${randomBytes(4).toString("hex").toUpperCase()}`;
    const values = [new Date().toLocaleString("es-PY", { hour12: false, timeZone: "America/Asuncion" }), clean(payload.nombre), clean(payload.apellido), String(age), clean(payload.telefono), cedula, payload.sexo, clean(payload.iglesia), payload.esInvitado, invited ? clean(payload.invitadoPor) : "No aplica", minor ? clean(payload.nombrePadreMadre) : "No aplica", minor ? clean(payload.telefonoPadreMadre) : "No aplica", clean(payload.alergias), clean(payload.medicamentos), clean(payload.enfermedadBase), clean(payload.contactoEmergenciaNombre), clean(payload.contactoEmergenciaTelefono), payload.formaPago, clean(payload.observaciones), "Sí", "Sí", minor ? "Sí" : "No aplica", codigo];
    await sheets.spreadsheets.values.append({ spreadsheetId, range: RANGE, valueInputOption: "RAW", insertDataOption: "INSERT_ROWS", requestBody: { values: [values] } });
    return NextResponse.json({ ok: true, codigo });
  } catch {
    return response("No pudimos guardar tu inscripción. Intentá nuevamente.", 500);
  }
}
