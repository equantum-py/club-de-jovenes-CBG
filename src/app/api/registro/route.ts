import { NextResponse } from "next/server";
import { saveRegistration, uploadParticipantSelfie, uploadPaymentProof, type RegistrationPayload } from "@/lib/registration-db";

const MAX_FIELD_LENGTH = 500;
const MAX_SELFIE_BYTES = 5 * 1024 * 1024;
const MAX_PROOF_BYTES = 10 * 1024 * 1024;
const ALLOWED_SELFIE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_PROOF_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
const COLORS = new Set(["blanco", "negro", "gris", "azul"]);
const SIZES = new Set(["S", "M", "L", "XL", "XXL", "XXXL"]);

function clean(value: unknown) { if (typeof value !== "string") return ""; return value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, MAX_FIELD_LENGTH); }
function normalizePayload(payload: Partial<RegistrationPayload>): RegistrationPayload {
  return { nombre: clean(payload.nombre), apellido: clean(payload.apellido), edad: clean(payload.edad), telefono: clean(payload.telefono), cedula: clean(payload.cedula), sexo: clean(payload.sexo), iglesia: clean(payload.iglesia), esInvitado: clean(payload.esInvitado), invitadoPor: clean(payload.invitadoPor), alergias: clean(payload.alergias), medicamentos: clean(payload.medicamentos), enfermedadBase: clean(payload.enfermedadBase), contactoEmergenciaNombre: clean(payload.contactoEmergenciaNombre), contactoEmergenciaTelefono: clean(payload.contactoEmergenciaTelefono), formaPago: "transferencia", nombrePadreMadre: clean(payload.nombrePadreMadre), telefonoPadreMadre: clean(payload.telefonoPadreMadre), deseaRemera: clean(payload.deseaRemera), talleRemera: clean(payload.talleRemera), colorRemera: clean(payload.colorRemera), deseaGorra: clean(payload.deseaGorra), colorGorra: clean(payload.colorGorra) };
}
function validatePayload(payload: RegistrationPayload) {
  const missing: string[] = [];
  const required: Array<keyof RegistrationPayload> = ["nombre", "apellido", "edad", "telefono", "cedula", "sexo", "esInvitado", "deseaRemera", "deseaGorra"];
  for (const field of required) if (!payload[field]) missing.push(field);
  const age = Number(payload.edad);
  if (!Number.isFinite(age) || age < 1 || age > 100) missing.push("edad");
  if (Number.isFinite(age) && age < 18) { if (!payload.nombrePadreMadre) missing.push("nombrePadreMadre"); if (!payload.telefonoPadreMadre) missing.push("telefonoPadreMadre"); }
  if (["si", "sí"].includes(payload.esInvitado.toLowerCase()) && !payload.invitadoPor) missing.push("invitadoPor");
  if (["si", "sí"].includes(payload.deseaRemera.toLowerCase())) { if (!SIZES.has(payload.talleRemera.toUpperCase())) missing.push("talleRemera"); if (!COLORS.has(payload.colorRemera.toLowerCase())) missing.push("colorRemera"); }
  if (["si", "sí"].includes(payload.deseaGorra.toLowerCase()) && !COLORS.has(payload.colorGorra.toLowerCase())) missing.push("colorGorra");
  return Array.from(new Set(missing));
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "El formulario enviado no es válido." }, { status: 400 });
  const raw: Partial<RegistrationPayload> = {};
  for (const key of ["nombre","apellido","edad","telefono","cedula","sexo","iglesia","esInvitado","invitadoPor","alergias","medicamentos","enfermedadBase","contactoEmergenciaNombre","contactoEmergenciaTelefono","formaPago","nombrePadreMadre","telefonoPadreMadre","deseaRemera","talleRemera","colorRemera","deseaGorra","colorGorra"] as Array<keyof RegistrationPayload>) raw[key] = clean(form.get(key));
  const payload = normalizePayload(raw);
  const missingFields = validatePayload(payload);
  if (missingFields.length) return NextResponse.json({ ok: false, error: "Faltan datos obligatorios o hay datos inválidos.", missingFields }, { status: 400 });
  const aceptaReglamento = clean(form.get("aceptaReglamento"));
  const autorizaResponsable = clean(form.get("autorizaResponsable"));
  if (aceptaReglamento !== "si") return NextResponse.json({ ok: false, error: "Debés aceptar el reglamento, las normas de convivencia y las políticas del campamento." }, { status: 400 });
  if (Number(payload.edad) < 18 && autorizaResponsable !== "si") return NextResponse.json({ ok: false, error: "El responsable del menor debe autorizar su participación y aceptar las normas del campamento." }, { status: 400 });
    const selfie = form.get("selfie");
  if (!(selfie instanceof File) || selfie.size === 0) return NextResponse.json({ ok: false, error: "Necesitamos una selfie del participante para completar la inscripción." }, { status: 400 });
  if (selfie.size > MAX_SELFIE_BYTES || !ALLOWED_SELFIE_TYPES.has(selfie.type)) return NextResponse.json({ ok: false, error: "La selfie debe ser JPG, PNG o WebP y pesar menos de 5 MB." }, { status: 400 });
  const paymentProof = form.get("paymentProof");
  if (!(paymentProof instanceof File) || paymentProof.size === 0) return NextResponse.json({ ok: false, error: "Adjuntá el comprobante de transferencia para completar la inscripción." }, { status: 400 });
  if (paymentProof.size > MAX_PROOF_BYTES || !ALLOWED_PROOF_TYPES.has(paymentProof.type)) return NextResponse.json({ ok: false, error: "El comprobante debe ser JPG, PNG, WebP o PDF y pesar menos de 10 MB." }, { status: 400 });
  try { const selfiePath = await uploadParticipantSelfie(selfie, payload.cedula); const paymentProofPath = await uploadPaymentProof(paymentProof, payload.cedula); await saveRegistration(payload, selfiePath, paymentProofPath); return NextResponse.json({ ok: true, message: "Registro guardado correctamente." }); }
  catch (error) { const message = error instanceof Error ? error.message : ""; console.error("Error en /api/registro:", message || error); if (message === "DUPLICATE_CEDULA") return NextResponse.json({ ok: false, error: "Ya existe una inscripción registrada con esta cédula." }, { status: 409 }); return NextResponse.json({ ok: false, error: "No pudimos guardar tu inscripción. Intentá nuevamente en unos minutos." }, { status: 503 }); }
}
