import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/design";

const activities = [
  ["01", "Encuentros", "Palabra, conversación y oración en un ambiente donde podés ser vos mismo.", "Durante el año"],
  ["02", "Gracia Camp", "Días para salir de la rutina, profundizar en la fe y crear recuerdos juntos.", "Experiencia especial"],
  ["03", "Comunidad", "Actividades, amistad y espacios para conocernos mejor y acompañarnos de verdad.", "Siempre conectados"],
  ["04", "Servicio", "Oportunidades para involucrarte y poner tus dones al servicio de Dios y de otros.", "Fe en acción"],
];

export default function ActividadesPage() {
  return <div className="min-h-screen bg-brand-warmWhite text-brand-ink"><Header/><main>
    <section className="relative overflow-hidden bg-brand-forestDark py-16 text-white sm:py-24 lg:py-28">
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />
      <Container className="relative"><Eyebrow className="text-brand-gold">Vida del Ministerio</Eyebrow><h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-7xl">Hay momentos que se viven mejor juntos.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">No somos solamente un evento. Somos una comunidad que se encuentra, aprende, sirve, se divierte y crece durante todo el año.</p></Container>
    </section>
    <section className="py-16 sm:py-20 lg:py-24"><Container><div className="grid gap-4 md:grid-cols-2">{activities.map(([number,title,text,label])=><article key={title} className="group rounded-[2rem] border border-brand-border bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-forest/5 sm:p-9"><div className="flex items-center justify-between"><span className="text-sm font-semibold text-brand-gold">{number}</span><span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-forest">{label}</span></div><h2 className="mt-12 text-3xl font-semibold tracking-[-.025em] text-brand-forest sm:text-4xl">{title}</h2><p className="mt-4 max-w-lg text-lg leading-8 text-brand-muted">{text}</p></article>)}</div></Container></section>
    <section className="bg-brand-gold py-14 text-brand-forest"><Container className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em]">Próximo gran encuentro</p><h2 className="mt-2 text-3xl font-semibold sm:text-4xl">¿Nos vemos en Gracia Camp 2026?</h2></div><ButtonLink href="/campamento" variant="dark" className="min-h-12 px-7">Quiero saber más →</ButtonLink></Container></section>
  </main><Footer/></div>;
}
