import { NextResponse } from "next/server";
import { google } from "googleapis";

type RegistroPayload = {
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

const SHEET_RANGE = "Registros!A:S";

function normalizeValue(value: string, fallback = "-") {
  const trimmed = (value ?? "").trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function validatePayload(payload: Partial<RegistroPayload>) {
  const requiredFields: (keyof RegistroPayload)[] = [
    "nombre",
    "apellido",
    "edad",
    "telefono",
    "cedula",
    "sexo",
    "esInvitado",
    "formaPago",
  ];

  const missingFields = requiredFields.filter((field) => {
    const value = payload[field];
    return typeof value !== "string" || value.trim().length === 0;
  });

  return missingFields;
}

function getRowValues(payload: RegistroPayload) {
  const edadNumero = Number(payload.edad);
  const esMenor = !Number.isNaN(edadNumero) && edadNumero < 18;
  const esInvitado = payload.esInvitado === "si";

  return [
    new Date().toLocaleString("es-PY", { hour12: false }),
    normalizeValue(payload.nombre),
    normalizeValue(payload.apellido),
    normalizeValue(payload.edad),
    normalizeValue(payload.telefono),
    normalizeValue(payload.cedula),
    normalizeValue(payload.sexo),
    normalizeValue(payload.iglesia),
    normalizeValue(payload.esInvitado),
    esInvitado ? normalizeValue(payload.invitadoPor, "No aplica") : "No aplica",
    esMenor ? normalizeValue(payload.nombrePadreMadre, "-") : "No aplica",
    esMenor ? normalizeValue(payload.telefonoPadreMadre, "-") : "No aplica",
    normalizeValue(payload.alergias),
    normalizeValue(payload.medicamentos),
    normalizeValue(payload.enfermedadBase),
    normalizeValue(payload.contactoEmergenciaNombre),
    normalizeValue(payload.contactoEmergenciaTelefono),
    normalizeValue(payload.formaPago),
    normalizeValue(payload.observaciones),
  ];
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<RegistroPayload>;
    const missingFields = validatePayload(payload);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Faltan campos obligatorios en el formulario.",
          missingFields,
        },
        { status: 400 }
      );
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKeyRaw || !spreadsheetId) {
      return NextResponse.json(
        {
          ok: false,
          error: "Faltan variables de entorno de Google Sheets.",
          details: {
            GOOGLE_CLIENT_EMAIL: !!clientEmail,
            GOOGLE_PRIVATE_KEY: !!privateKeyRaw,
            GOOGLE_SHEET_ID: !!spreadsheetId,
          },
        },
        { status: 500 }
      );
    }

    // Normalizar la private key
    let privateKey = privateKeyRaw;
    if (privateKey.includes("\\n")) {
      privateKey = privateKey.replace(/\\n/g, "\n");
    }

    const rowValues = getRowValues(payload as RegistroPayload);

    // Auth
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await auth.authorize();

    const sheets = google.sheets({ version: "v4", auth });

    // ESCRIBIR DIRECTAMENTE (sin verificar primero)
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowValues],
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Registro guardado correctamente.",
      updatedRange: result.data.updates?.updatedRange,
    });

  } catch (error: any) {
    console.error("❌ ERROR COMPLETO:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Error desconocido",
        details: error.response?.data || error,
      },
      { status: 500 }
    );
  }
}
