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
};

function getConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("SUPABASE_NOT_CONFIGURED");
  }

  return { url, key };
}

function headers(key: string) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export async function saveRegistration(payload: RegistrationPayload) {
  const { url, key } = getConfig();
  const response = await fetch(`${url}/rest/v1/cbg_registrations`, {
    method: "POST",
    headers: {
      ...headers(key),
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ payload }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Error guardando inscripción:", response.status, detail);
    throw new Error("REGISTRATION_SAVE_FAILED");
  }
}

export async function listRegistrations(): Promise<StoredRegistration[]> {
  const { url, key } = getConfig();
  const response = await fetch(
    `${url}/rest/v1/cbg_registrations?select=id,created_at,payload&order=created_at.desc`,
    {
      headers: headers(key),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Error leyendo inscripciones:", response.status, detail);
    throw new Error("REGISTRATION_READ_FAILED");
  }

  const rows = (await response.json()) as Array<{
    id: string;
    created_at: string;
    payload: RegistrationPayload;
  }>;

  return rows.map((row) => ({
    id: row.id,
    fecha: row.created_at,
    ...row.payload,
  }));
}
