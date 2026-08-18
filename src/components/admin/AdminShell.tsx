import Image from "next/image";
import Link from "next/link";

const items = [
  ["Resumen", "/admin"],
  ["Participantes", "/admin/participantes"],
  ["Inscripciones", "/admin/inscripciones"],
  ["Merch oficial", "/admin/merch"],
  ["Apariencia / Header", "/admin/apariencia"],
  ["Música de fondo", "/admin/musica"],
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F6F5F0] text-brand-ink lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-brand-border bg-brand-forestDark p-5 text-white lg:min-h-screen lg:border-b-0 lg:border-r lg:p-6">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Jóvenes CBG" width={54} height={54} className="h-12 w-12 object-contain" />
          <div><p className="text-sm font-semibold">Jóvenes CBG</p><p className="text-xs text-white/45">Administración</p></div>
        </Link>
        <nav className="mt-7 flex gap-2 overflow-x-auto lg:grid lg:gap-1">
          {items.map(([label, href]) => <Link key={href} href={href} className="whitespace-nowrap rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">{label}</Link>)}
        </nav>
        <form action="/api/admin/logout" method="post" className="mt-5 lg:mt-10"><button className="text-sm text-white/45 hover:text-white">Cerrar sesión</button></form>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
