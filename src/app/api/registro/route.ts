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
const SHEET_TAB_NAME = "Registros";

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

  return requiredFields.filter((field) => {
    const value = payload[field];
    return typeof value !== "string" || value.trim().length === 0;
  });
}

function getRowValues(payload: RegistroPayload) {
  const edadNumero = Number(payload.edad);
  const esMenor = !Number.isNaN(edadNumero) && edadNumero < 18;
  const esInvitado = payload.esInvitado === "si";

  return [
    new Date().toLocaleString("es-PY", {
      hour12: false,
      timeZone: "America/Asuncion",
    }),
    normalizeValue(payload.nombre),
    normalizeValue(payload.apellido),
    normalizeValue(payload.edad),
    normalizeValue(payload.telefono),
    normalizeValue(payload.cedula),
    normalizeValue(payload.sexo),
    normalizeValue(payload.iglesia),
    normalizeValue(payload.esInvitado),
    esInvitado
      ? normalizeValue(payload.invitadoPor, "No aplica")
      : "No aplica",
    esMenor
      ? normalizeValue(payload.nombrePadreMadre, "-")
      : "No aplica",
    esMenor
      ? normalizeValue(payload.telefonoPadreMadre, "-")
      : "No aplica",
    normalizeValue(payload.alergias),
    normalizeValue(payload.medicamentos),
    normalizeValue(payload.enfermedadBase),
    normalizeValue(payload.contactoEmergenciaNombre),
    normalizeValue(payload.contactoEmergenciaTelefono),
    normalizeValue(payload.formaPago),
    normalizeValue(payload.observaciones),
  ];
}

function getGoogleErrorMessage(error: unknown) {
  const googleError = error as {
    code?: number;
    message?: string;
    response?: {
      status?: number;
      data?: {
        error?: {
          message?: string;
        };
      };
    };
    errors?: Array<{
      message?: string;
    }>;
  };

  const apiMessage =
    googleError.response?.data?.error?.message ??
    googleError.errors?.[0]?.message ??
    googleError.message ??
    "";

  const statusCode =
    googleError.code ?? googleError.response?.status;

  const message = apiMessage.toLowerCase();

  if (
    message.includes("invalid_grant") ||
    message.includes("invalid jwt signature") ||
    message.includes("private key")
  ) {
    return {
      status: 502,
      error:
        "No se pudo autenticar con Google Sheets. Revisá GOOGLE_PRIVATE_KEY y GOOGLE_CLIENT_EMAIL.",
    };
  }

  if (
    message.includes("requested entity was not found") ||
    message.includes("unable to parse range")
  ) {
    if (
      message.includes(SHEET_TAB_NAME.toLowerCase()) ||
      message.includes("unable to parse range")
    ) {
      return {
        status: 404,
        error: `La pestaña "${SHEET_TAB_NAME}" no existe o tiene otro nombre en Google Sheets.`,
      };
    }

    return {
      status: 404,
      error:
        "El GOOGLE_SHEET_ID no corresponde a una hoja accesible.",
    };
  }

  if (
    statusCode === 403 ||
    message.includes("permission denied") ||
    message.includes("caller does not have permission")
  ) {
    return {
      status: 403,
      error:
        "La cuenta de servicio no tiene acceso a la hoja. Compartí el spreadsheet con GOOGLE_CLIENT_EMAIL y otorgale permiso de Editor.",
    };
  }

  return {
    status: 502,
    error:
      "Error al guardar en Google Sheets. Verificá la configuración y los permisos.",
  };
}

export async function POST(request: Request) {
  try {
    const payload =
      (await request.json()) as Partial<RegistroPayload>;

    const missingFields = validatePayload(payload);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "Faltan campos obligatorios en el formulario.",
          missingFields,
        },
        {
          status: 400,
        }
      );
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!clientEmail || !privateKeyRaw || !spreadsheetId) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Faltan variables de entorno de Google Sheets.",
          details: {
            GOOGLE_CLIENT_EMAIL: Boolean(clientEmail),
            GOOGLE_PRIVATE_KEY: Boolean(privateKeyRaw),
            GOOGLE_SHEET_ID: Boolean(spreadsheetId),
          },
        },
        {
          status: 500,
        }
      );
    }

    const privateKey = privateKeyRaw
      .replace(/\\n/g, "\n")
      .trim();

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    await auth.authorize();

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const rowValues = getRowValues(
      payload as RegistroPayload
    );

    const result =
      await sheets.spreadsheets.values.append({
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
      updatedRange:
        result.data.updates?.updatedRange ?? null,
    });
  } catch (error: unknown) {
    const mappedError = getGoogleErrorMessage(error);

    console.error("Error en /api/registro:", {
      mappedError,
      rawError: error,
    });

    return NextResponse.json(
      {
        ok: false,
        error: mappedError.error,
      },
      {
        status: mappedError.status,
      }
    );
  }
}