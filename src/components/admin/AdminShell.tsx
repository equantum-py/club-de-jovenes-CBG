"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const managementItems = [
  ["Resumen", "/admin"],
  ["Inscripciones", "/admin/participantes"],
] as const;

const siteItems = [
  ["Predicador", "/admin/predicador"],
  ["Merch oficial", "/admin/merch"],
  ["Apariencia / Header", "/admin/apariencia"],
  ["Música de fondo", "/admin/musica"],
] as const;

function MenuGroup({
  title,
  items,
  open,
  onToggle,
}: {
  title: string;
  items: readonly (readonly [string, string])[];
  open: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-semibold uppercase tracking-[.14em] text-white/55 transition hover:bg-white/[0.04] hover:text-white"
      >
        <span>{title}</span>
        <span className={`text-base transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {open ? (
        <div className="border-t border-white/10 p-2">
          {items.map(([label, href]) => {
            const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`mb-1 flex min-h-11 items-center rounded-xl px-3 text-sm transition last:mb-0 ${
                  active
                    ? "bg-brand-gold text-brand-forest font-semibold"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isManagement = managementItems.some(([, href]) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href),
  );
  const isSite = siteItems.some(([, href]) => pathname.startsWith(href));

  const [managementOpen, setManagementOpen] = useState(isManagement || !isSite);
  const [siteOpen, setSiteOpen] = useState(isSite);

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-brand-ink lg:grid lg:grid-cols-[270px_1fr]">
      <aside className="border-b border-brand-border bg-brand-forestDark p-5 text-white lg:min-h-screen lg:border-b-0 lg:border-r lg:p-6">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Jóvenes CBG" width={54} height={54} className="h-12 w-12 object-contain" />
          <div>
            <p className="text-sm font-semibold">Jóvenes CBG</p>
            <p className="text-xs text-white/45">Administración</p>
          </div>
        </Link>

        <nav className="mt-7 grid gap-3">
          <MenuGroup
            title="Gestión"
            items={managementItems}
            open={managementOpen}
            onToggle={() => setManagementOpen((value) => !value)}
          />
          <MenuGroup
            title="Contenido del sitio"
            items={siteItems}
            open={siteOpen}
            onToggle={() => setSiteOpen((value) => !value)}
          />
        </nav>

        <form action="/api/admin/logout" method="post" className="mt-6 lg:mt-10">
          <button className="text-sm text-white/45 hover:text-white">Cerrar sesión</button>
        </form>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
