import { NextResponse } from "next/server";

import { ADMIN_COOKIE, createAdminSessionToken, validateAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const result = validateAdminCredentials(email, password);
  if (!result.configured) {
    return NextResponse.json({ error: "El acceso administrativo todavía no está configurado en Vercel." }, { status: 503 });
  }
  if (!result.ok) {
    return NextResponse.json({ error: "Correo o contraseña incorrectos." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
