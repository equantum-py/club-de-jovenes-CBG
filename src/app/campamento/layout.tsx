import type { Metadata } from "next";
export const metadata: Metadata = { title: "Campamento", description: "Gracia Camp 2026, el 11 de diciembre en Campamento Kavaju, Atyrá.", alternates: { canonical: "/campamento" }, openGraph: { title: "Gracia Camp 2026", description: "Campamento del Club de Jóvenes CBG en Atyrá, Paraguay.", url: "/campamento" } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
