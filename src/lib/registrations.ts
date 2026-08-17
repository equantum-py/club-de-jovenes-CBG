import { google } from "googleapis";

export type Registration = Record<string, string>;

function normalizePrivateKey(value: string) {
  return value.replace(/\\n/g, "\n");
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
    range: "Registros!A:AZ",
  });

  const rows = response.data.values ?? [];
  if (rows.length < 2) return [];

  const headers = rows[0].map((header) => String(header).trim());
  return rows.slice(1).filter((row) => row.some(Boolean)).map((row) => {
    const record: Registration = {};
    headers.forEach((header, index) => {
      record[header || `Campo ${index + 1}`] = String(row[index] ?? "");
    });
    return record;
  });
}

export function findValue(registration: Registration, candidates: string[]) {
  const entries = Object.entries(registration);
  for (const candidate of candidates) {
    const found = entries.find(([key]) => key.toLowerCase().includes(candidate.toLowerCase()));
    if (found?.[1]) return found[1];
  }
  return "—";
}
