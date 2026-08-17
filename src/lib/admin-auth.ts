import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "cbg_admin_session";
const SESSION_VALUE = "club-jovenes-cbg-admin";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function sign(value: string) {
  const secret = getSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createAdminSessionToken() {
  const signature = sign(SESSION_VALUE);
  return signature ? `${SESSION_VALUE}.${signature}` : "";
}

export function isValidAdminSession(token?: string | null) {
  if (!token) return false;
  const [value, signature] = token.split(".");
  if (value !== SESSION_VALUE || !signature) return false;

  const expected = sign(value);
  if (!expected || expected.length !== signature.length) return false;

  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function hasAdminSession() {
  return isValidAdminSession(cookies().get(ADMIN_COOKIE)?.value);
}

export function validateAdminCredentials(email: string, password: string) {
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredEmail || !configuredPassword || !getSecret()) {
    return { ok: false, configured: false };
  }

  const emailMatches = email.trim().toLowerCase() === configuredEmail;
  const passwordMatches = password === configuredPassword;

  return { ok: emailMatches && passwordMatches, configured: true };
}
