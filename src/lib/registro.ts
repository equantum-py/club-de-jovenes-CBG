export const MAX_REQUEST_BYTES = 20_000;
export const MAX_FIELD_LENGTH = 200;

export const textFields = ["nombre", "apellido", "telefono", "cedula", "sexo", "iglesia", "esInvitado", "invitadoPor", "alergias", "medicamentos", "enfermedadBase", "contactoEmergenciaNombre", "contactoEmergenciaTelefono", "observaciones", "formaPago", "nombrePadreMadre", "telefonoPadreMadre"] as const;

export type RegistroPayload = Record<(typeof textFields)[number], string> & {
  edad: string;
  aceptaPrivacidad: boolean;
  aceptaReglamento: boolean;
  autorizacionResponsable: boolean;
  turnstileToken: string;
  website?: string;
};

export function clean(value: string, fallback = "-") {
  let result = value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, MAX_FIELD_LENGTH);
  if (/^[=+\-@]/.test(result)) result = `'${result}`;
  return result || fallback;
}

export function normalizeCedula(value: string) {
  return value.replace(/\D/g, "");
}

export function validateRegistro(input: unknown): string[] {
  if (!input || typeof input !== "object" || Array.isArray(input)) return ["Revisá los datos enviados."];
  const p = input as Partial<RegistroPayload>;
  const errors: string[] = [];
  for (const field of textFields) {
    const value = p[field];
    if (value !== undefined && (typeof value !== "string" || value.length > MAX_FIELD_LENGTH)) errors.push("Uno de los campos es demasiado largo.");
  }
  const required = ["nombre", "apellido", "telefono", "cedula", "sexo", "esInvitado", "formaPago", "contactoEmergenciaNombre", "contactoEmergenciaTelefono"] as const;
  if (required.some((field) => typeof p[field] !== "string" || !p[field]?.trim())) errors.push("Completá todos los campos obligatorios.");
  const age = Number(p.edad);
  if (!Number.isInteger(age) || age < 10 || age > 100) errors.push("La edad debe estar entre 10 y 100 años.");
  if (p.nombre && !/^[\p{L} .'-]{2,80}$/u.test(p.nombre.trim()) || p.apellido && !/^[\p{L} .'-]{2,80}$/u.test(p.apellido.trim())) errors.push("Revisá el nombre y apellido.");
  if (p.telefono && !/^[+()\d\s-]{6,25}$/.test(p.telefono) || p.contactoEmergenciaTelefono && !/^[+()\d\s-]{6,25}$/.test(p.contactoEmergenciaTelefono)) errors.push("Revisá los números de teléfono.");
  if (!p.cedula || !/^\d{5,10}$/.test(normalizeCedula(p.cedula))) errors.push("Ingresá una cédula válida.");
  if (!p.sexo || !["masculino", "femenino"].includes(p.sexo)) errors.push("Seleccioná una opción válida para sexo.");
  if (!p.esInvitado || !["si", "no"].includes(p.esInvitado)) errors.push("Indicá si sos invitado.");
  if (p.esInvitado === "si" && !p.invitadoPor?.trim()) errors.push("Ingresá quién te invitó.");
  if (!p.formaPago || !["efectivo", "transferencia"].includes(p.formaPago)) errors.push("Seleccioná una forma de pago válida.");
  if (age < 18 && (!p.nombrePadreMadre?.trim() || !p.telefonoPadreMadre || !/^[+()\d\s-]{6,25}$/.test(p.telefonoPadreMadre))) errors.push("Completá los datos del padre, madre o tutor.");
  if (age < 18 && p.autorizacionResponsable !== true) errors.push("El responsable debe autorizar la inscripción.");
  if (p.aceptaPrivacidad !== true || p.aceptaReglamento !== true) errors.push("Debés aceptar la privacidad y el reglamento.");
  return [...new Set(errors)];
}
