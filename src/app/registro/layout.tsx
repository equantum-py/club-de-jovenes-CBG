import type { Metadata } from "next";
export const metadata: Metadata = { title: "Registro", description: "Formulario de inscripción a Gracia Camp 2026.", alternates: { canonical: "/registro" }, openGraph: { title: "Registro | Gracia Camp 2026", description: "Inscribite a Gracia Camp 2026.", url: "/registro" } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
