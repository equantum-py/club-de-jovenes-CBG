import { NextResponse } from "next/server";

import { ADMIN_COOKIE, createAdminSessionToken, validateAdminCredentials } from "@/lib/admin-auth";

const MAX_BODY_BYTES = 8 * 1024;
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

type Attempt = { count: number; resetAt: number };
const attempts = new Map<string, Attempt>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function isJsonRequest(request: Request) {
  return request.headers.get("content-type")?.toLowerCase().startsWith("application/json") ?? false;
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 0, resetAt: now + WINDOW_MS });
    return false;
  }
  return current.count >= MAX_ATTEMPTS;
}

function registerFailure(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  current.count += 1;
  attempts.set(key, current);
}

export async function POST(request: Request) {
  if (!isJsonRequest(request)) {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Solicitud demasiado grande." }, { status: 413 });
  }

  const key = clientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Esperá unos minutos antes de volver a intentar." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.slice(0, 254) : "";
  const password = typeof body?.password === "string" ? body.password.slice(0, 256) : "";

  if (!email || !password) {
    registerFailure(key);
    return NextResponse.json({ error: "Correo o contraseña incorrectos." }, { status: 401 });
  }

  const result = validateAdminCredentials(email, password);
  if (!result.configured) {
    return NextResponse.json({ error: "El acceso administrativo todavía no está configurado." }, { status: 503 });
  }
  if (!result.ok) {
    registerFailure(key);
    return NextResponse.json({ error: "Correo o contraseña incorrectos." }, { status: 401 });
  }

  attempts.delete(key);
  const token = createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: "No se pudo iniciar la sesión administrativa." }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
