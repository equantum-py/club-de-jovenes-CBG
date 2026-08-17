"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.error ?? "No se pudo iniciar sesión.");
      setLoading(false);
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <main className="grid min-h-screen bg-brand-cream lg:grid-cols-2">
      <section className="hidden bg-brand-forestDark p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Jóvenes CBG" width={64} height={64} className="h-14 w-14 object-contain" />
          <div><p className="font-semibold">Jóvenes CBG</p><p className="text-sm text-white/50">Administración</p></div>
        </div>
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Panel administrativo</p>
          <h1 className="mt-5 text-6xl font-semibold leading-[1.02]">Todo el campamento, en un solo lugar.</h1>
          <p className="mt-6 text-lg leading-8 text-white/60">Inscripciones, participantes y seguimiento operativo del Club de Jóvenes CBG.</p>
        </div>
        <p className="text-xs text-white/30">Acceso exclusivo para administradores autorizados.</p>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <Image src="/logo.png" alt="Jóvenes CBG" width={56} height={56} className="h-12 w-12 object-contain" />
            <div><p className="font-semibold text-brand-forest">Jóvenes CBG</p><p className="text-xs text-brand-muted">Administración</p></div>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Bienvenido</p>
          <h2 className="mt-3 text-4xl font-semibold text-brand-forest">Iniciar sesión</h2>
          <p className="mt-3 text-brand-muted">Ingresá con las credenciales administrativas.</p>

          <form onSubmit={submit} className="mt-9 grid gap-5">
            <label className="grid gap-2 text-sm font-medium text-brand-forest">Correo electrónico<input name="email" type="email" required autoComplete="username" className="min-h-12 rounded-xl border border-brand-border bg-white px-4 outline-none focus:border-brand-forest" placeholder="admin@ejemplo.com" /></label>
            <label className="grid gap-2 text-sm font-medium text-brand-forest">Contraseña<input name="password" type="password" required autoComplete="current-password" className="min-h-12 rounded-xl border border-brand-border bg-white px-4 outline-none focus:border-brand-forest" placeholder="••••••••" /></label>
            {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
            <button disabled={loading} className="mt-2 min-h-12 rounded-xl bg-brand-forest px-5 font-semibold text-white transition hover:bg-brand-forestLight disabled:opacity-60">{loading ? "Ingresando..." : "Ingresar al panel"}</button>
          </form>
        </div>
      </section>
    </main>
  );
}
