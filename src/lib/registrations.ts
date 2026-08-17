import { listRegistrations } from "@/lib/registration-db";

export type Registration = Record<string, string>;

export async function getRegistrations(): Promise<Registration[]> {
  const rows = await listRegistrations();

  return rows.map((registration) => ({
    ID: registration.id,
    Fecha: registration.fecha,
    Nombre: registration.nombre,
    Apellido: registration.apellido,
    Edad: registration.edad,
    Telefono: registration.telefono,
    Cedula: registration.cedula,
    Sexo: registration.sexo,
    Iglesia: registration.iglesia,
    EsInvitado: registration.esInvitado,
    InvitadoPor: registration.invitadoPor,
    NombrePadreMadre: registration.nombrePadreMadre,
    TelefonoPadreMadre: registration.telefonoPadreMadre,
    Alergias: registration.alergias,
    Medicamentos: registration.medicamentos,
    EnfermedadBase: registration.enfermedadBase,
    ContactoEmergenciaNombre: registration.contactoEmergenciaNombre,
    ContactoEmergenciaTelefono: registration.contactoEmergenciaTelefono,
    FormaPago: registration.formaPago,
    Observaciones: registration.observaciones,
  }));
}

export function findValue(registration: Registration, candidates: string[]) {
  const entries = Object.entries(registration);

  for (const candidate of candidates) {
    const found = entries.find(([key]: [string, string]) =>
      key.toLowerCase().includes(candidate.toLowerCase()),
    );

    if (found?.[1]) return found[1];
  }

  return "—";
}
