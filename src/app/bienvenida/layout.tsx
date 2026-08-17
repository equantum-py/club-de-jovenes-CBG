import type { Metadata } from "next";
export const metadata: Metadata = { title: "Bienvenida", description: "Conocé el propósito de Gracia Camp 2026.", alternates: { canonical: "/bienvenida" } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
