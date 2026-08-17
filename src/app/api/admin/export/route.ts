import { NextResponse } from "next/server";

import { hasAdminSession } from "@/lib/admin-auth";
import { getRegistrations } from "@/lib/registrations";

const COLUMNS = [
  "ID",
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
  "Estado",
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cell(value: string, style = "") {
  const styleAttr = style ? ` ss:StyleID="${style}"` : "";
  return `<Cell${styleAttr}><Data ss:Type="String">${escapeXml(value)}</Data></Cell>`;
}

export async function GET() {
  if (!hasAdminSession()) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  try {
    const registrations = await getRegistrations();
    const headerRow = `<Row>${COLUMNS.map((column) => cell(column, "Header")).join("")}</Row>`;
    const rows = registrations
      .map(
        (registration) =>
          `<Row>${COLUMNS.map((column) => cell(registration[column] ?? "")).join("")}</Row>`,
      )
      .join("");

    const workbook = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal"><Alignment ss:Vertical="Bottom"/><Font ss:FontName="Arial" ss:Size="10"/></Style>
  <Style ss:ID="Header"><Font ss:FontName="Arial" ss:Size="10" ss:Bold="1"/><Interior ss:Color="#E7E9DE" ss:Pattern="Solid"/></Style>
 </Styles>
 <Worksheet ss:Name="Inscriptos">
  <Table>
   ${headerRow}
   ${rows}
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><FreezePanes/><FrozenNoSplit/><SplitHorizontal>1</SplitHorizontal><TopRowBottomPane>1</TopRowBottomPane></WorksheetOptions>
 </Worksheet>
</Workbook>`;

    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(workbook, {
      headers: {
        "Content-Type": "application/vnd.ms-excel; charset=utf-8",
        "Content-Disposition": `attachment; filename="inscriptos-gracia-camp-${date}.xls"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error exportando inscriptos:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "No se pudo generar el archivo Excel." },
      { status: 500 },
    );
  }
}
