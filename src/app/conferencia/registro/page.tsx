import type { Metadata } from "next";
import ConferenceRegistration from "@/components/conferencia/ConferenceRegistration";

export const metadata: Metadata = {
  title: "Conferencia de Jóvenes — Registro",
  description: "Registrate con tu nombre, apellido e iglesia para participar de la dinámica bíblica.",
  robots: { index: false, follow: false },
};

export default function ConferenceRegistrationPage() {
  return <ConferenceRegistration />;
}
