import { NextResponse } from "next/server";
import { saveRegistration, uploadParticipantSelfie, uploadPaymentProof, type RegistrationPayload } from "@/lib/registration-db";

const MAX_FIELD_LENGTH = 500;
const MAX_SELFIE_BYTES = 5 * 1024 * 1024;
const MAX_PROOF_BYTES = 10 * 1024 * 1024;
const MAX_REQUEST_BYTES = 17 * 1024 * 1024;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;
const ALLOWED_SELFIE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_PROOF_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
const COLORS = new Set(["blanco", "negro", "gris", "azul"]);
const SIZES = new Set(["S", "M", "L", "XL", "XXL", "XXXL"]);

type RateEntry = { count: number; resetAt: number };
const rateEntries = new Map<string, RateEntry>();

function clean(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, MAX_FIELD_LENGTH);
}

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(key: string) {
  const now = Date.now();
  const entry = rateEntries.get(key);
  if (!entry || entry.resetAt <= now) {
    rateEntries.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return true;
  entry.count += 1;
  rateEntries.set(key, entry);
  return false;
}

function hasAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const requestUrl = new URL(request.url);
    const originUrl = new URL(origin);
    return requestUrl.host === originUrl.host;
  } catch {
    return false;
  }
}

function normalizePayload(payload: Partial<RegistrationPayload>): RegistrationPayload {
  return { nombre: clean(payload.nombre), apellido: clean(payload.apellido), edad: clean(payload.edad), telefono: clean(payload.telefono), cedula: clean(payload.cedula), sexo: clean(payload.sexo), iglesia: clean(payload.iglesia), esInvitado: clean(payload.esInvitado), invitadoPor: clean(payload.invitadoPor), alergias: clean(payload.alergias), medicamentos: clean(payload.medicamentos), enfermedadBase: clean(payload.enfermedadBase), contactoEmergenciaNombre: clean(payload.contactoEmergenciaNombre), contactoEmergenciaTelefono: clean(payload.contactoEmergenciaTelefono), formaPago: "transferencia", nombrePadreMadre: clean(payload.nombrePadreMadre), telefonoPadreMadre: clean(payload.telefonoPadreMadre), deseaRemera: clean(payload.deseaRemera), talleRemera: clean(payload.talleRemera), colorRemera: clean(payload.colorRemera), deseaGorra: clean(payload.deseaGorra), colorGorra: clean(payload.colorGorra) };
}

function validatePayload(payload: RegistrationPayload) {
  const missing: string[] = [];
  const required: Array<keyof RegistrationPayload> = ["nombre", "apellido", "edad", "telefono", "cedula", "sexo", "esInvitado", "deseaRemera", "deseaGorra"];
  for (const field of required) if (!payload[field]) missing.push(field);
  const age = Number(payload.edad);
  if (!Number.isFinite(age) || age < 1 || age > 100) missing.push("edad");
  if (!/^[0-9.\-]{4,20}$/.test(payload.cedula)) missing.push("cedula");
  if (!/^[+0-9 ()\-]{6,30}$/.test(payload.telefono)) missing.push("telefono");
  if (Number.isFinite(age) && age < 18) {
    if (!payload.nombrePadreMadre) missing.push("nombrePadreMadre");
    if (!payload.telefonoPadreMadre || !/^[+0-9 ()\-]{6,30}$/.test(payload.telefonoPadreMadre)) missing.push("telefonoPadreMadre");
  }
  if (["si", "sí"].includes(payload.esInvitado.toLowerCase()) && !payload.invitadoPor) missing.push("invitadoPor");
  if (["si", "sí"].includes(payload.deseaRemera.toLowerCase())) {
    if (!SIZES.has(payload.talleRemera.toUpperCase())) missing.push("talleRemera");
    if (!COLORS.has(payload.colorRemera.toLowerCase())) missing.push("colorRemera");
  }
  if (["si", "sí"].includes(payload.deseaGorra.toLowerCase()) && !COLORS.has(payload.colorGorra.toLowerCase())) missing.push("colorGorra");
  return Array.from(new Set(missing));
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("multipart/form-data")) {
    return NextResponse.json({ ok: false, error: "Formato de solicitud no válido." }, { status: 415 });
  }
  if (!hasAllowedOrigin(request)) {
    return NextResponse.json({ ok: false, error: "Origen de solicitud no permitido." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ ok: false, error: "Los archivos enviados superan el tamaño permitido." }, { status: 413 });
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Se realizaron demasiados intentos. Esperá unos minutos y volvé a intentar." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "El formulario enviado no es válido." }, { status: 400 });

  if (clean(form.get("website"))) return NextResponse.json({ ok: true, message: "Registro recibido." });

  const raw: Partial<RegistrationPayload> = {};
  for (const key of ["nombre","apellido","edad","telefono","cedula","sexo","iglesia","esInvitado","invitadoPor","alergias","medicamentos","enfermedadBase","contactoEmergenciaNombre","contactoEmergenciaTelefono","formaPago","nombrePadreMadre","telefonoPadreMadre","deseaRemera","talleRemera","colorRemera","deseaGorra","colorGorra"] as Array<keyof RegistrationPayload>) raw[key] = clean(form.get(key));
  const payload = normalizePayload(raw);
  const missingFields = validatePayload(payload);
  if (missingFields.length) return NextResponse.json({ ok: false, error: "Faltan datos obligatorios o hay datos inválidos.", missingFields }, { status: 400 });

  const aceptaReglamento = clean(form.get("aceptaReglamento"));
  const autorizaResponsable = clean(form.get("autorizaResponsable"));
  if (aceptaReglamento !== "si") return NextResponse.json({ ok: false, error: "Debés aceptar el reglamento, las normas de convivencia y las políticas del campamento." }, { status: 400 });
  if (Number(payload.edad) < 18 && autorizaResponsable !== "si") return NextResponse.json({ ok: false, error: "El responsable del menor debe autorizar su participación y aceptar las normas del campamento." }, { status: 400 });

  const selfieValue = form.get("selfie");
  const selfie = selfieValue instanceof File && selfieValue.size > 0 ? selfieValue : null;
  if (selfie && (selfie.size > MAX_SELFIE_BYTES || !ALLOWED_SELFIE_TYPES.has(selfie.type))) {
    return NextResponse.json({ ok: false, error: "La selfie debe ser JPG, PNG o WebP y pesar menos de 5 MB." }, { status: 400 });
  }

  const paymentProofValue = form.get("paymentProof");
  const paymentProof = paymentProofValue instanceof File && paymentProofValue.size > 0 ? paymentProofValue : null;
  if (paymentProof && (paymentProof.size > MAX_PROOF_BYTES || !ALLOWED_PROOF_TYPES.has(paymentProof.type))) {
    return NextResponse.json({ ok: false, error: "El comprobante debe ser JPG, PNG, WebP o PDF y pesar menos de 10 MB." }, { status: 400 });
  }

  try {
    const selfiePath = selfie ? await uploadParticipantSelfie(selfie, payload.cedula) : "";
    const paymentProofPath = paymentProof ? await uploadPaymentProof(paymentProof, payload.cedula) : "";
    await saveRegistration(payload, selfiePath, paymentProofPath);
    return NextResponse.json({ ok: true, message: "Registro guardado correctamente." }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    console.error("Error en /api/registro:", message || "REGISTRATION_ERROR");
    if (message === "DUPLICATE_CEDULA") return NextResponse.json({ ok: false, error: "Ya existe una inscripción registrada con esta cédula." }, { status: 409 });
    return NextResponse.json({ ok: false, error: "No pudimos guardar tu inscripción. Intentá nuevamente en unos minutos." }, { status: 503 });
  }
}
