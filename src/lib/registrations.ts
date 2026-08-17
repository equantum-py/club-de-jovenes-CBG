import { google } from "googleapis";

export type Registration = Record<string, string>;
type SheetRow = unknown[];

const DEFAULT_HEADERS = [
  "Fecha",
  "Nombre",
  "Apellido",
  "Edad",
  "Telefono",
  "Cedula",
  "Sexo",
  "Iglesia",
  "EsInvitado",
  "InvitadoPor",
  "NombrePadreMadre",
  "TelefonoPadreMadre",
  "Alergias",
  "Medicamentos",
  "EnfermedadBase",
  "ContactoEmergenciaNombre",
  "ContactoEmergenciaTelefono",
  "FormaPago",
  "Observaciones",
];

function normalizePrivateKey(value: string) {
  return value.replace(/\\n/g, "\n");
}

function looksLikeHeaderRow(row: SheetRow) {
  const normalized = row.map((value) => String(value ?? "").trim().toLowerCase());
  return normalized.some((value) =>
    ["nombre", "apellido", "edad", "telefono", "teléfono", "cedula", "cédula", "fecha"].includes(value),
  );
}

export async function getRegistrations(): Promise<Registration[]> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) return [];

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: normalizePrivateKey(privateKey),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Registros!A:S",
  });

  const rows = (response.data.values ?? []) as SheetRow[];
  if (!rows.length) return [];

  const firstRowIsHeader = looksLikeHeaderRow(rows[0]);
  const headers = firstRowIsHeader
    ? rows[0].map((header: unknown, index: number) =>
        String(header ?? "").trim() || DEFAULT_HEADERS[index] || `Campo ${index + 1}`,
      )
    : DEFAULT_HEADERS;

  const dataRows = firstRowIsHeader ? rows.slice(1) : rows;

  return dataRows
    .filter((row: SheetRow) =>
      row.some((value: unknown) => String(value ?? "").trim().length > 0),
    )
    .map((row: SheetRow) => {
      const record: Registration = {};

      headers.forEach((header: string, index: number) => {
        record[header] = String(row[index] ?? "").trim();
      });

      return record;
    });
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
