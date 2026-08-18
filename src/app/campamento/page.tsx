"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/design";

const TALLAS = ["S", "M", "L", "XL", "XXL"];
const WHATSAPP_NUMBER = "595985194953";
const MAPS_URL = "https://maps.app.goo.gl/bVdDJtbaZFsJN7Eo7";
const YOUTUBE_VIDEO_ID = "_EpTnktKT-o";
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`;
const CAMP_PRICE = 400000;

const remera = { nombre: "Remera oficial Gracia Camp 2026", precio: 100000, imagen: "/campamento/remera-nueva.png" };

function getWhatsAppUrl(producto: string, talla: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`¡Hola! Quiero reservar la ${producto} en talla ${talla} para Gracia Camp 2026.`)}`;
}

function formatPrice(value: number) {
  return `Gs. ${value.toLocaleString("es-PY")}`;
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-brand-forestDark text-white">
      <div className="absolute -right-20 top-10 h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96" />
      <Container className="relative grid gap-10 py-14 sm:py-18 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-20">
        <div>
          <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-brand-gold backdrop-blur-sm">Ministerio de Jóvenes CBG</div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[.92] tracking-[-.05em] sm:text-6xl lg:text-7xl xl:text-8xl">4 días para salir de la rutina y volver a lo esencial.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">Gracia Camp 2026 es un espacio para escuchar la Palabra, compartir en comunidad, hacer nuevas amistades y vivir una experiencia con propósito.</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/registro" variant="light" className="min-h-12 px-7">Inscribirme ahora</ButtonLink>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-semibold text-white transition hover:bg-white/10">Ver ubicación →</a>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {[['03–06 DIC','4 días · 2026'],['GS. 400.000','Por persona'],['NUEVO LUGAR','Ver ubicación'],['CUPOS','Limitados']].map(([value,label]) => (
            <div key={value} className="rounded-[1.6rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm sm:p-6">
              <p className="text-2xl font-semibold text-white sm:text-3xl">{value}</p>
              <p className="mt-2 text-sm text-white/60">{label}</p>
            </div>
          ))}
          <div className="rounded-[1.6rem] border border-white/15 bg-brand-gold p-5 text-brand-forest sm:col-span-2 sm:p-6 lg:col-span-1 xl:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[.16em]">Falta para Gracia Camp</p>
            <div className="mt-3"><Countdown /></div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function QuickNav() {
  return (
    <section className="sticky top-[68px] z-30 border-y border-brand-border bg-brand-warmWhite/95 backdrop-blur">
      <Container className="flex gap-2 overflow-x-auto py-3 text-sm [scrollbar-width:none]">
        {[["Resumen","#resumen"],["Experiencia","#experiencia"],["Tema","#tema"],["Remera","#remera"],["Lugar","#lugar"],["Video","#video"],["Reglamento","#reglamento"]].map(([label,href]) => (
          <a key={href} href={href} className="whitespace-nowrap rounded-full border border-brand-border bg-white px-4 py-2 font-semibold text-brand-forest hover:border-brand-forest">{label}</a>
        ))}
      </Container>
    </section>
  );
}

function SummarySection() {
  return (
    <section id="resumen" className="scroll-mt-32 bg-brand-cream py-14 sm:py-18 lg:py-20">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Todo lo importante</Eyebrow>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-.035em] text-brand-forest sm:text-5xl">Entendé Gracia Camp en menos de un minuto.</h2>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Fecha","03, 04, 05 y 06 de diciembre","Cuatro días completos para vivir la experiencia."],
            ["Inversión",formatPrice(CAMP_PRICE),"Precio por persona."],
            ["Ubicación","Nuevo lugar 2026","Accedé a la ubicación exacta desde Google Maps."],
            ["Inscripción","Cupos limitados","Completá tus datos y asegurá tu lugar."],
          ].map(([title,value,text]) => (
            <article key={title} className="rounded-[1.7rem] border border-brand-border bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[.15em] text-brand-gold">{title}</p>
              <h3 className="mt-5 text-2xl font-semibold text-brand-forest">{value}</h3>
              <p className="mt-3 text-sm leading-6 text-brand-muted">{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ExperienceSection() {
  const items = [
    ["Palabra","Tiempo para escuchar, preguntar, reflexionar y llevar la fe a la vida real.","01"],
    ["Comunidad","Amistades, conversaciones, actividades y momentos que se viven mejor juntos.","02"],
    ["Aventura","Salir de la rutina, disfrutar el lugar y crear recuerdos que duren mucho más que cuatro días.","03"],
  ];
  return (
    <section id="experiencia" className="scroll-mt-32 bg-brand-warmWhite py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>La experiencia</Eyebrow>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-.035em] text-brand-forest sm:text-5xl lg:text-6xl">No es solamente ir a un campamento.</h2>
          <p className="mt-5 text-lg leading-8 text-brand-muted">Es desconectarte unos días para conectar mejor con Dios, con otros y con lo que de verdad importa.</p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {items.map(([title,text,number]) => (
            <article key={title} className="group min-h-[300px] rounded-[2rem] border border-brand-border bg-brand-cream p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-forest/5 sm:p-8">
              <span className="text-sm font-semibold text-brand-gold">{number}</span>
              <h3 className="mt-14 text-3xl font-semibold text-brand-forest sm:text-4xl">{title}</h3>
              <p className="mt-4 text-base leading-7 text-brand-muted">{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TemaSection() {
  return (
    <section id="tema" className="scroll-mt-32 bg-brand-forest text-white py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-[.88fr_1.12fr] lg:items-center">
        <div>
          <Eyebrow className="text-brand-gold">Tema central</Eyebrow>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.03] tracking-[-.035em] sm:text-5xl">Una fe examinada, una vida rendida a Cristo.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">Un espacio para bajar el ritmo, escuchar la Palabra, hacer preguntas sinceras y responder al evangelio con una fe propia.</p>
          <blockquote className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-5 text-xl leading-8">“Examinaos a vosotros mismos si estáis en la fe.”<footer className="mt-2 text-sm font-semibold text-brand-gold">1 Corintios 13:5</footer></blockquote>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] sm:min-h-[440px] lg:min-h-[520px]">
          <Image src="/campamento-bg.jpg" alt="Campamento juvenil durante la noche" fill sizes="(min-width:1024px)55vw,100vw" className="object-cover" />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-brand-forestDark/82 p-5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-gold">Lo que vas a vivir</p>
            <p className="mt-2 text-lg">Palabra · Comunidad · Reflexión · Actividades · Amistad</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function RemeraSection() {
  const [selectedSize,setSelectedSize] = useState("");
  const reservationUrl = selectedSize ? getWhatsAppUrl(remera.nombre,selectedSize) : "#";
  return (
    <section id="remera" className="scroll-mt-32 bg-brand-cream py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] bg-white p-5 sm:p-8">
          <Image src={remera.imagen} alt={remera.nombre} width={840} height={1040} sizes="(min-width:1024px)45vw,100vw" className="mx-auto h-auto w-full max-w-[440px] object-contain" />
          <span className="absolute left-5 top-5 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-brand-forest">Edición limitada</span>
        </div>
        <div>
          <Eyebrow>Remera oficial</Eyebrow>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-brand-forest sm:text-5xl">Llevate un recuerdo de Gracia Camp.</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-brand-muted">Elegí tu talle y reservá por WhatsApp. La remera oficial está disponible por tiempo limitado.</p>
          <div className="my-7 h-px bg-brand-border" />
          <div className="flex items-end justify-between"><p className="text-3xl font-semibold text-brand-forest">{formatPrice(remera.precio)}</p><p className="text-sm text-brand-muted">Precio único</p></div>
          <p className="mb-3 mt-7 text-sm font-semibold">Elegí tu talle</p>
          <div className="flex flex-wrap gap-2">{TALLAS.map(talla => <button key={talla} type="button" onClick={() => setSelectedSize(talla)} className={`min-h-11 min-w-12 rounded-full border px-4 text-sm font-semibold ${selectedSize===talla?'border-brand-forest bg-brand-forest text-white':'border-brand-border bg-white text-brand-muted hover:border-brand-forest'}`}>{talla}</button>)}</div>
          <a href={reservationUrl} target={selectedSize?"_blank":undefined} rel={selectedSize?"noopener noreferrer":undefined} onClick={e=>{if(!selectedSize){e.preventDefault();window.alert('Elegí un talle antes de reservar por WhatsApp.')}}} className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-forest px-6 text-sm font-semibold text-white sm:w-auto">Reservar por WhatsApp</a>
        </div>
      </Container>
    </section>
  );
}

function LugarSection() {
  return (
    <section id="lugar" className="scroll-mt-32 bg-brand-warmWhite py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-[.55fr_.45fr] lg:items-center">
        <div>
          <Eyebrow>Nueva ubicación 2026</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-.03em] text-brand-forest sm:text-5xl lg:text-6xl">Este año nos encontramos en un nuevo lugar.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-muted">La ubicación oficial ya está definida. Abrí Google Maps para ver el punto exacto, calcular tu recorrido y guardar el lugar antes del campamento.</p>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-forest px-7 text-sm font-semibold text-white sm:w-auto">Ver ubicación exacta →</a>
        </div>
        <div className="rounded-[2rem] border border-brand-border bg-brand-cream p-7 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-gold">Cuándo</p>
          <p className="mt-3 text-3xl font-semibold text-brand-forest">03–06 diciembre</p>
          <div className="my-6 h-px bg-brand-border" />
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-gold">Inversión</p>
          <p className="mt-3 text-3xl font-semibold text-brand-forest">{formatPrice(CAMP_PRICE)}</p>
          <div className="my-6 h-px bg-brand-border" />
          <p className="text-sm leading-6 text-brand-muted">Guardá el enlace de Google Maps para tener siempre a mano la nueva ubicación del campamento.</p>
        </div>
      </Container>
    </section>
  );
}

function VideoSection() {
  const [showPlayer,setShowPlayer] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
  return (
    <section id="video" className="scroll-mt-32 bg-brand-cream py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mb-8 max-w-3xl"><Eyebrow>Sentí la experiencia</Eyebrow><h2 className="mt-4 text-4xl font-semibold tracking-[-.03em] text-brand-forest sm:text-5xl">Mirá lo que se vive en Gracia Camp.</h2><p className="mt-3 text-lg leading-8 text-brand-muted">Un vistazo al ambiente, la comunidad y todo lo que estamos preparando para este año.</p></div>
        <div className="aspect-video overflow-hidden rounded-[2rem] bg-brand-forestDark">{showPlayer ? <iframe src={`${YOUTUBE_EMBED_URL}?autoplay=1`} title="Video informativo Gracia Camp 2026" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <button type="button" onClick={() => setShowPlayer(true)} className="group relative h-full w-full overflow-hidden text-white"><Image src={thumbnailUrl} alt="Video informativo del campamento" fill sizes="100vw" className="object-cover opacity-75 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-90"/><span className="absolute inset-0 flex items-center justify-center"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-brand-forest shadow-xl">▶</span></span><span className="absolute bottom-5 left-5 rounded-full bg-black/40 px-4 py-2 text-sm font-semibold backdrop-blur">Tocar para ver</span></button>}</div>
      </Container>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    ["¿Cuándo es?","Del 03 al 06 de diciembre de 2026."],
    ["¿Cuánto cuesta?",`${formatPrice(CAMP_PRICE)} por persona.`],
    ["¿Dónde es?","En la nueva ubicación oficial 2026. Podés abrirla directamente en Google Maps desde esta página."],
    ["¿Cómo me inscribo?","Completá el formulario de registro y seguí las indicaciones del equipo organizador."],
  ];
  return (
    <section className="bg-brand-warmWhite py-16 sm:py-20">
      <Container>
        <Eyebrow>Preguntas rápidas</Eyebrow>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-.03em] text-brand-forest sm:text-5xl">Antes de inscribirte.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{faqs.map(([q,a]) => <article key={q} className="rounded-[1.6rem] border border-brand-border bg-white p-6"><h3 className="text-xl font-semibold text-brand-forest">{q}</h3><p className="mt-3 leading-7 text-brand-muted">{a}</p></article>)}</div>
      </Container>
    </section>
  );
}

function CTASection() {
  return (
    <section id="reglamento" className="scroll-mt-32 bg-brand-forest py-16 text-white sm:py-20">
      <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-gold">Tu lugar puede empezar acá</p><h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.03] sm:text-5xl">Leé el reglamento y asegurá tu lugar en Gracia Camp 2026.</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">03–06 de diciembre · {formatPrice(CAMP_PRICE)} por persona · cupos limitados.</p></div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><ButtonLink href="/registro" variant="light" className="min-h-12 px-7">Inscribirme ahora</ButtonLink><ButtonLink href="/reglamento" variant="secondary" className="min-h-12 border-white/30 px-7 text-white hover:bg-white/10 hover:text-white">Leer reglamento</ButtonLink></div>
      </Container>
    </section>
  );
}

function Footer() {
  const message = "¡Hola! Quiero consultar sobre Gracia Camp 2026.";
  return <footer className="bg-brand-forestDark py-10 text-white"><Container><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]"><div><h2 className="text-xl font-semibold">Ministerio de Jóvenes CBG</h2><p className="mt-2 text-sm text-white/60">Gracia Camp 2026 · 03–06 diciembre</p></div><nav className="grid gap-2 text-sm text-white/70"><a href="#inicio">Inicio</a><a href="#experiencia">Experiencia</a><a href="#tema">Tema</a><a href="#remera">Remera</a><a href="#lugar">Lugar</a><Link href="/reglamento">Reglamento</Link></nav><div className="text-sm text-white/70"><p>WhatsApp: 0985 194953</p><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-white underline-offset-4 hover:underline">Escribir por WhatsApp</a></div></div><div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/40">© 2026 Ministerio de Jóvenes CBG.</div></Container></footer>;
}

function StickyMobileActions() {
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-brand-warmWhite/95 p-3 backdrop-blur md:hidden"><div className="grid grid-cols-[auto_1fr] items-center gap-3"><div className="px-2"><p className="text-[10px] uppercase tracking-wider text-brand-muted">Por persona</p><p className="font-semibold text-brand-forest">Gs. 400.000</p></div><Link href="/registro" className="flex min-h-12 items-center justify-center rounded-full bg-brand-forest px-4 text-sm font-semibold text-white">Inscribirme</Link></div></div>;
}

export default function CampamentoPage() {
  return <div className="min-h-screen bg-brand-warmWhite pb-20 text-brand-ink antialiased md:pb-0"><Header/><main><Hero/><QuickNav/><SummarySection/><ExperienceSection/><TemaSection/><RemeraSection/><LugarSection/><VideoSection/><FAQSection/><CTASection/></main><Footer/><StickyMobileActions/></div>;
}
