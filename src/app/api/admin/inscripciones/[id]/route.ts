import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { deleteRegistration, getRegistrationById } from "@/lib/registration-db";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (!hasAdminSession()) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const registration = await getRegistrationById(params.id).catch(() => null);
  if (!registration) {
    return NextResponse.json({ error: "La inscripción no existe." }, { status: 404 });
  }

  try {
    await deleteRegistration(registration.id, registration.selfiePath);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "No se pudo eliminar la inscripción." }, { status: 500 });
  }
}
