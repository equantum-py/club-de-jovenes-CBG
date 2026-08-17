import { NextResponse } from "next/server";

import { saveRegistration, type RegistrationPayload } from "@/lib/registration-db";

const MAX_FIELD_LENGTH = 500;
const MAX_REQUEST_BYTES = 20_000;

function clean(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, MAX_FIELD_LENGTH);
}

function normalizePayload(payload: Partial<RegistrationPayload>): RegistrationPayload {
  return {
    nombre: clean(payload.nombre),
    apellido: clean(payload.apellido),
    edad: clean(payload.edad),
    telefono: clean(payload.telefono),
    cedula: clean(payload.cedula),
    sexo: clean(payload.sexo),
    iglesia: clean(payload.iglesia),
    esInvitado: clean(payload.esInvitado),
    invitadoPor: clean(payload.invitadoPor),
    alergias: clean(payload.alergias),
    medicamentos: clean(payload.medicamentos),
    enfermedadBase: clean(payload.enfermedadBase),
    contactoEmergenciaNombre: clean(payload.contactoEmergenciaNombre),
    contactoEmergenciaTelefono: clean(payload.contactoEmergenciaTelefono),
    observaciones: clean(payload.observaciones),
    formaPago: clean(payload.formaPago),
    nombrePadreMadre: clean(payload.nombrePadreMadre),
    telefonoPadreMadre: clean(payload.telefonoPadreMadre),
  };
}

function validatePayload(payload: RegistrationPayload) {
  const missing: string[] = [];
  const required: Array<keyof RegistrationPayload> = [
    "nombre",
    "apellido",
    "edad",
    "telefono",
    "cedula",
    "sexo",
    "esInvitado",
    "formaPago",
  ];

  for (const field of required) {
    if (!payload[field]) missing.push(field);
  }

  const age = Number(payload.edad);
  if (Number.isFinite(age) && age < 18) {
    if (!payload.nombrePadreMadre) missing.push("nombrePadreMadre");
    if (!payload.telefonoPadreMadre) missing.push("telefonoPadreMadre");
  }

  if (payload.esInvitado.toLowerCase() === "si" && !payload.invitadoPor) {
    missing.push("invitadoPor");
  }

  return missing;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { ok: false, error: "El formulario excede el tamaño máximo permitido." },
      { status: 413 },
    );
  }

  const raw = (await request.json().catch(() => null)) as Partial<RegistrationPayload> | null;
  if (!raw) {
    return NextResponse.json(
      { ok: false, error: "El formulario enviado no es válido." },
      { status: 400 },
    );
  }

  const payload = normalizePayload(raw);
  const missingFields = validatePayload(payload);

  if (missingFields.length) {
    return NextResponse.json(
      { ok: false, error: "Faltan campos obligatorios en el formulario.", missingFields },
      { status: 400 },
    );
  }

  try {
    await saveRegistration(payload);
    return NextResponse.json({ ok: true, message: "Registro guardado correctamente." });
  } catch (error) {
    console.error("Error en /api/registro:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { ok: false, error: "No pudimos guardar tu inscripción. Intentá nuevamente en unos minutos." },
      { status: 503 },
    );
  }
}
