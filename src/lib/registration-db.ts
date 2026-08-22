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
  formaPago: string;
  nombrePadreMadre: string;
  telefonoPadreMadre: string;
  deseaRemera: string;
  talleRemera: string;
  colorRemera: string;
  deseaGorra: string;
  colorGorra: string;
};

export type StoredRegistration = RegistrationPayload & {
  id: string;
  fecha: string;
  estado: string;
  selfiePath: string;
  paymentProofPath: string;
  precioCampamento: number;
  precioRemera: number;
  precioGorra: number;
  totalTransferir: number;
};

const CAMP_PRICE = 400000;
const SHIRT_PRICE = 100000;
const SHIRT_XL_PRICE = 120000;
const CAP_PRICE = 30000;

function getConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_NOT_CONFIGURED");
  return { url, key };
}

function authHeaders(key: string, contentType = "application/json") {
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": contentType };
}

function mapRow(row: Record<string, unknown>): StoredRegistration {
  return {
    id: String(row.id ?? ""), fecha: String(row.created_at ?? ""), nombre: String(row.nombre ?? ""), apellido: String(row.apellido ?? ""), edad: String(row.edad ?? ""), telefono: String(row.telefono ?? ""), cedula: String(row.cedula ?? ""), sexo: String(row.sexo ?? ""), iglesia: String(row.iglesia ?? ""), esInvitado: row.es_invitado ? "Sí" : "No", invitadoPor: String(row.invitado_por ?? ""), alergias: String(row.alergias ?? ""), medicamentos: String(row.medicamentos ?? ""), enfermedadBase: String(row.enfermedad_base ?? ""), contactoEmergenciaNombre: String(row.contacto_emergencia_nombre ?? ""), contactoEmergenciaTelefono: String(row.contacto_emergencia_telefono ?? ""), formaPago: String(row.forma_pago ?? "transferencia"), nombrePadreMadre: String(row.nombre_padre_madre ?? ""), telefonoPadreMadre: String(row.telefono_padre_madre ?? ""), deseaRemera: row.desea_remera ? "Sí" : "No", talleRemera: String(row.talle_remera ?? ""), colorRemera: String(row.color_remera ?? ""), deseaGorra: row.desea_gorra ? "Sí" : "No", colorGorra: String(row.color_gorra ?? ""), precioCampamento: Number(row.precio_campamento ?? CAMP_PRICE), precioRemera: Number(row.precio_remera ?? 0), precioGorra: Number(row.precio_gorra ?? 0), totalTransferir: Number(row.total_transferir ?? CAMP_PRICE), estado: String(row.estado ?? "registrado"), selfiePath: String(row.selfie_path ?? ""), paymentProofPath: String(row.payment_proof_path ?? ""),
  };
}

async function uploadPrivateFile(bucket: string, file: File, cedula: string, prefix: string) {
  const { url, key } = getConfig();
  const byType: Record<string, string> = { "image/png": "png", "image/webp": "webp", "application/pdf": "pdf" };
  const extension = byType[file.type] ?? "jpg";
  const safeCedula = cedula.replace(/\D/g, "") || "participante";
  const path = `${prefix}-${safeCedula}-${Date.now()}.${extension}`;
  const response = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, { method: "POST", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": file.type, "x-upsert": "false" }, body: await file.arrayBuffer(), cache: "no-store" });
  if (!response.ok) throw new Error(`${bucket.toUpperCase().replace(/-/g, "_")}_UPLOAD_FAILED`);
  return path;
}

export async function uploadParticipantSelfie(file: File, cedula: string) { return uploadPrivateFile("participant-selfies", file, cedula, "selfie"); }
export async function uploadPaymentProof(file: File, cedula: string) { return uploadPrivateFile("payment-proofs", file, cedula, "comprobante"); }

async function getSignedPrivateUrl(bucket: string, path: string, expiresIn = 900) {
  if (!path) return "";
  const { url, key } = getConfig();
  const response = await fetch(`${url}/storage/v1/object/sign/${bucket}/${encodeURIComponent(path)}`, { method: "POST", headers: authHeaders(key), body: JSON.stringify({ expiresIn }), cache: "no-store" });
  if (!response.ok) return "";
  const data = (await response.json()) as { signedURL?: string; signedUrl?: string };
  const signedPath = data.signedURL ?? data.signedUrl ?? "";
  if (!signedPath) return "";
  return signedPath.startsWith("http") ? signedPath : `${url}/storage/v1${signedPath}`;
}

export async function getSignedSelfieUrl(path: string, expiresIn = 900) { return getSignedPrivateUrl("participant-selfies", path, expiresIn); }
export async function getSignedPaymentProofUrl(path: string, expiresIn = 900) { return getSignedPrivateUrl("payment-proofs", path, expiresIn); }

export async function saveRegistration(payload: RegistrationPayload, selfiePath = "", paymentProofPath = "") {
  const { url, key } = getConfig();
  const age = Number(payload.edad);
  const wantsShirt = ["si", "sí", "yes"].includes(payload.deseaRemera.trim().toLowerCase());
  const wantsCap = ["si", "sí", "yes"].includes(payload.deseaGorra.trim().toLowerCase());
  const shirtPrice = wantsShirt ? (["XL", "XXL", "XXXL"].includes(payload.talleRemera.toUpperCase()) ? SHIRT_XL_PRICE : SHIRT_PRICE) : 0;
  const capPrice = wantsCap ? CAP_PRICE : 0;
  const total = CAMP_PRICE + shirtPrice + capPrice;
  const response = await fetch(`${url}/rest/v1/registrations`, {
    method: "POST", headers: { ...authHeaders(key), Prefer: "return=minimal" },
    body: JSON.stringify({ nombre: payload.nombre, apellido: payload.apellido, edad: Number.isFinite(age) ? age : null, telefono: payload.telefono, cedula: payload.cedula, sexo: payload.sexo, iglesia: payload.iglesia || null, es_invitado: ["si", "sí", "yes"].includes(payload.esInvitado.trim().toLowerCase()), invitado_por: payload.invitadoPor || null, alergias: payload.alergias || null, medicamentos: payload.medicamentos || null, enfermedad_base: payload.enfermedadBase || null, contacto_emergencia_nombre: payload.contactoEmergenciaNombre || null, contacto_emergencia_telefono: payload.contactoEmergenciaTelefono || null, forma_pago: "transferencia", nombre_padre_madre: payload.nombrePadreMadre || null, telefono_padre_madre: payload.telefonoPadreMadre || null, desea_remera: wantsShirt, talle_remera: wantsShirt ? payload.talleRemera || null : null, color_remera: wantsShirt ? payload.colorRemera || null : null, desea_gorra: wantsCap, color_gorra: wantsCap ? payload.colorGorra || null : null, precio_campamento: CAMP_PRICE, precio_remera: shirtPrice, precio_gorra: capPrice, total_transferir: total, selfie_path: selfiePath || null, payment_proof_path: paymentProofPath || null }), cache: "no-store",
  });
  if (!response.ok) { const detail = await response.text().catch(() => ""); if (response.status === 409 || detail.includes("registrations_cedula_unique")) throw new Error("DUPLICATE_CEDULA"); throw new Error("REGISTRATION_SAVE_FAILED"); }
}

export async function listRegistrations(): Promise<StoredRegistration[]> { const { url, key } = getConfig(); const response = await fetch(`${url}/rest/v1/registrations?select=*&order=created_at.desc`, { headers: authHeaders(key), cache: "no-store" }); if (!response.ok) throw new Error("REGISTRATION_READ_FAILED"); const rows = (await response.json()) as Array<Record<string, unknown>>; return rows.map(mapRow); }
export async function getRegistrationById(id: string): Promise<StoredRegistration | null> { const { url, key } = getConfig(); const response = await fetch(`${url}/rest/v1/registrations?select=*&id=eq.${encodeURIComponent(id)}&limit=1`, { headers: authHeaders(key), cache: "no-store" }); if (!response.ok) throw new Error("REGISTRATION_READ_FAILED"); const rows = (await response.json()) as Array<Record<string, unknown>>; return rows[0] ? mapRow(rows[0]) : null; }
async function deletePrivateFile(bucket: string, path: string) { if (!path) return; const { url, key } = getConfig(); await fetch(`${url}/storage/v1/object/${bucket}/${encodeURIComponent(path)}`, { method: "DELETE", headers: authHeaders(key), cache: "no-store" }).catch(() => null); }
export async function deleteRegistration(id: string, selfiePath = "", paymentProofPath = "") { const { url, key } = getConfig(); const response = await fetch(`${url}/rest/v1/registrations?id=eq.${encodeURIComponent(id)}`, { method: "DELETE", headers: { ...authHeaders(key), Prefer: "return=minimal" }, cache: "no-store" }); if (!response.ok) throw new Error("REGISTRATION_DELETE_FAILED"); await Promise.all([deletePrivateFile("participant-selfies", selfiePath), deletePrivateFile("payment-proofs", paymentProofPath)]); }
