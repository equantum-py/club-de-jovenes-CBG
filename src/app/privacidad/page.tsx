import type { Metadata } from "next";
import Header from "@/components/Header";
import { Container, Eyebrow } from "@/components/ui/design";
export const metadata: Metadata = { title: "Privacidad", description: "Cómo cuidamos los datos de participantes de Gracia Camp 2026.", alternates: { canonical: "/privacidad" } };
const sections = [
  ["Información que recopilamos", "Datos personales y de contacto, cédula, información del responsable, contacto de emergencia, salud, pago y consentimientos."],
  ["Para qué usamos los datos", "Para gestionar la inscripción, cuidar a cada participante, responder en emergencias y confirmar el pago."],
  ["Quién puede acceder", "Solo el equipo organizador autorizado y los responsables que deban atender una emergencia."],
  ["Datos médicos", "Alergias, medicamentos y enfermedades se usan únicamente para cuidar al participante durante el campamento."],
  ["Información de menores", "La inscripción de un menor requiere autorización de su padre, madre o tutor. Sus datos reciben el mismo cuidado y acceso limitado."],
  ["Tiempo de conservación", "Conservamos los datos solo durante el tiempo necesario para organizar el campamento y cumplir obligaciones aplicables; luego se eliminan de forma segura."],
  ["Corrección o eliminación", "Podés solicitar revisar, corregir o eliminar tus datos escribiendo por WhatsApp al 0985 194953."],
];
export default function PrivacidadPage() { return <div className="min-h-screen bg-brand-warmWhite text-brand-ink"><Header/><main className="py-16"><Container><Eyebrow>Gracia Camp 2026</Eyebrow><h1 className="mt-4 text-4xl font-semibold text-brand-forest sm:text-6xl">Política de Privacidad</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-brand-muted">Cuidamos tu información y la usamos solamente para organizar el campamento.</p><div className="mt-12 grid gap-8 md:grid-cols-2">{sections.map(([title,text])=><section key={title} className="border-t border-brand-border pt-6"><h2 className="text-2xl font-semibold text-brand-forest">{title}</h2><p className="mt-3 leading-7 text-brand-muted">{text}</p></section>)}</div><a className="mt-10 inline-flex min-h-12 items-center rounded-full bg-brand-forest px-6 text-white" href="https://wa.me/595985194953" target="_blank" rel="noreferrer">Contactar por WhatsApp</a></Container></main></div> }
