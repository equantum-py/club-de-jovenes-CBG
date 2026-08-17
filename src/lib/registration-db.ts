export type RegistrationPayload = {
  nombre: string;
  apellido: string;
  edad: string;
  telefono: string;
  cedula: string;
  sexo: string;
  iglesia: string;
  esInvitado: string;
  invitadoPor: string;
  alergias: string;
  medicamentos: string;
  enfermedadBase: string;
  contactoEmergenciaNombre: string;
  contactoEmergenciaTelefono: string;
  observaciones: string;
  formaPago: string;
  nombrePadreMadre: string;
  telefonoPadreMadre: string;
};

export type StoredRegistration = RegistrationPayload & {
  id: string;
  fecha: string;
  estado: string;
  selfiePath: string;
};

function getConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_NOT_CONFIGURED");
  return { url, key };
}

function authHeaders(key: string, contentType = "application/json") {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": contentType,
  };
}

function mapRow(row: Record<string, unknown>): StoredRegistration {
  return {
    id: String(row.id ?? ""),
    fecha: String(row.created_at ?? ""),
    nombre: String(row.nombre ?? ""),
    apellido: String(row.apellido ?? ""),
    edad: String(row.edad ?? ""),
    telefono: String(row.telefono ?? ""),
    cedula: String(row.cedula ?? ""),
    sexo: String(row.sexo ?? ""),
    iglesia: String(row.iglesia ?? ""),
    esInvitado: row.es_invitado ? "Sí" : "No",
    invitadoPor: String(row.invitado_por ?? ""),
    alergias: String(row.alergias ?? ""),
    medicamentos: String(row.medicamentos ?? ""),
    enfermedadBase: String(row.enfermedad_base ?? ""),
    contactoEmergenciaNombre: String(row.contacto_emergencia_nombre ?? ""),
    contactoEmergenciaTelefono: String(row.contacto_emergencia_telefono ?? ""),
    observaciones: String(row.observaciones ?? ""),
    formaPago: String(row.forma_pago ?? ""),
    nombrePadreMadre: String(row.nombre_padre_madre ?? ""),
    telefonoPadreMadre: String(row.telefono_padre_madre ?? ""),
    estado: String(row.estado ?? "registrado"),
    selfiePath: String(row.selfie_path ?? ""),
  };
}

export async function uploadParticipantSelfie(file: File, cedula: string) {
  const { url, key } = getConfig();
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const safeCedula = cedula.replace(/\D/g, "") || "participante";
  const path = `${safeCedula}-${Date.now()}.${extension}`;

  const response = await fetch(`${url}/storage/v1/object/participant-selfies/${path}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": file.type,
      "x-upsert": "false",
    },
    body: await file.arrayBuffer(),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("SELFIE_UPLOAD_FAILED");
  return path;
}

export async function getSignedSelfieUrl(path: string, expiresIn = 900) {
  if (!path) return "";
  const { url, key } = getConfig();
  const response = await fetch(
    `${url}/storage/v1/object/sign/participant-selfies/${encodeURIComponent(path)}`,
    {
      method: "POST",
      headers: authHeaders(key),
      body: JSON.stringify({ expiresIn }),
      cache: "no-store",
    },
  );
  if (!response.ok) return "";
  const data = (await response.json()) as { signedURL?: string; signedUrl?: string };
  const signedPath = data.signedURL ?? data.signedUrl ?? "";
  if (!signedPath) return "";
  return signedPath.startsWith("http") ? signedPath : `${url}/storage/v1${signedPath}`;
}

export async function saveRegistration(payload: RegistrationPayload, selfiePath = "") {
  const { url, key } = getConfig();
  const age = Number(payload.edad);
  const response = await fetch(`${url}/rest/v1/registrations`, {
    method: "POST",
    headers: { ...authHeaders(key), Prefer: "return=minimal" },
    body: JSON.stringify({
      nombre: payload.nombre,
      apellido: payload.apellido,
      edad: Number.isFinite(age) ? age : null,
      telefono: payload.telefono,
      cedula: payload.cedula,
      sexo: payload.sexo,
      iglesia: payload.iglesia || null,
      es_invitado: ["si", "sí", "yes"].includes(payload.esInvitado.trim().toLowerCase()),
      invitado_por: payload.invitadoPor || null,
      alergias: payload.alergias || null,
      medicamentos: payload.medicamentos || null,
      enfermedad_base: payload.enfermedadBase || null,
      contacto_emergencia_nombre: payload.contactoEmergenciaNombre || null,
      contacto_emergencia_telefono: payload.contactoEmergenciaTelefono || null,
      observaciones: payload.observaciones || null,
      forma_pago: payload.formaPago,
      nombre_padre_madre: payload.nombrePadreMadre || null,
      telefono_padre_madre: payload.telefonoPadreMadre || null,
      selfie_path: selfiePath || null,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    if (response.status === 409 || detail.includes("registrations_cedula_unique")) {
      throw new Error("DUPLICATE_CEDULA");
    }
    throw new Error("REGISTRATION_SAVE_FAILED");
  }
}

export async function listRegistrations(): Promise<StoredRegistration[]> {
  const { url, key } = getConfig();
  const response = await fetch(`${url}/rest/v1/registrations?select=*&order=created_at.desc`, {
    headers: authHeaders(key),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("REGISTRATION_READ_FAILED");
  const rows = (await response.json()) as Array<Record<string, unknown>>;
  return rows.map(mapRow);
}

export async function getRegistrationById(id: string): Promise<StoredRegistration | null> {
  const { url, key } = getConfig();
  const response = await fetch(
    `${url}/rest/v1/registrations?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
    { headers: authHeaders(key), cache: "no-store" },
  );
  if (!response.ok) throw new Error("REGISTRATION_READ_FAILED");
  const rows = (await response.json()) as Array<Record<string, unknown>>;
  return rows[0] ? mapRow(rows[0]) : null;
}
