"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Countdown from "@/components/Countdown";
import Header from "@/components/Header";
import PreacherSection from "@/components/PreacherSection";
import MerchSectionPublic from "@/components/MerchSectionPublic";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/design";

const MAPS_URL = "https://maps.app.goo.gl/bVdDJtbaZFsJN7Eo7";
const YOUTUBE_VIDEO_ID = "_EpTnktKT-o";
const CAMP_PRICE = 400000;

function formatPrice(value: number) {
  return `Gs. ${value.toLocaleString("es-PY")}`;
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-brand-forestDark text-white">
      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full border border-white/10" />
      <Container className="relative grid gap-8 py-10 sm:py-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:py-16">
        <div>
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-brand-gold">Ministerio de Jóvenes CBG</span>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.7rem,7vw,5.8rem)] font-semibold leading-[.92] tracking-[-.05em]">4 días para salir de la rutina y volver a lo esencial.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">Palabra, comunidad, actividades y nuevas amistades en una experiencia pensada para volver a poner a Cristo en el centro.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/registro" variant="light" className="min-h-11 px-6">Inscribirme ahora</ButtonLink>
            <a href="#info" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold">Ver información →</a>
          </div>
        </div>

        <div className="rounded-[1.7rem] border border-white/12 bg-white/8 p-5 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-brand-gold">Falta para Gracia Camp</p>
          <div className="mt-3"><Countdown /></div>
          <p className="mt-4 text-sm leading-6 text-white/60">Toda la información importante está reunida en una sola sección más abajo.</p>
        </div>
      </Container>
    </section>
  );
}

function QuickNav() {
  return (
    <div className="sticky top-[68px] z-30 border-y border-brand-border bg-brand-warmWhite/95 backdrop-blur">
      <Container className="flex gap-2 overflow-x-auto py-2.5 text-xs [scrollbar-width:none] sm:text-sm">
        {[["Información","#info"],["Predicador","#predicador"],["Merch","#remera"],["Lugar + Video","#lugar"],["Inscripción","#inscripcion"]].map(([label,href]) => (
          <a key={href} href={href} className="whitespace-nowrap rounded-full border border-brand-border bg-white px-4 py-2 font-semibold text-brand-forest">{label}</a>
        ))}
      </Container>
    </div>
  );
}

function InfoSection() {
  const facts = [
    ["Fecha","03 al 06 de diciembre"],
    ["Precio",formatPrice(CAMP_PRICE)],
    ["Lugar","Nueva ubicación 2026"],
    ["Cupos","Limitados"],
  ];
  const experience = [
    ["Palabra","Escuchar, preguntar y llevar la fe a la vida real."],
    ["Comunidad","Amistades, conversaciones y momentos que se viven juntos."],
    ["Aventura","Salir de la rutina y crear recuerdos con propósito."],
  ];

  return (
    <section id="info" className="scroll-mt-28 bg-brand-cream py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Información clave</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold leading-[1.02] tracking-[-.035em] text-brand-forest sm:text-4xl lg:text-5xl">Todo lo que necesitás saber, en un solo lugar.</h2>
          <p className="mt-4 max-w-xl leading-7 text-brand-muted">Fecha, precio, ubicación y cupos sin repetir la misma información en toda la página.</p>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {facts.map(([label,value]) => (
            <div key={label} className="rounded-2xl border border-brand-border bg-white p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-brand-gold">{label}</p>
              <p className="mt-2 text-base font-semibold text-brand-forest sm:text-lg">{value}</p>
              {label === "Lugar" ? <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex text-xs font-semibold text-brand-forest underline underline-offset-4">Abrir Maps</a> : null}
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {experience.map(([title,text],index) => (
            <article key={title} className="rounded-[1.4rem] border border-brand-border bg-white p-5">
              <span className="text-xs font-semibold text-brand-gold">0{index+1}</span>
              <h3 className="mt-4 text-xl font-semibold text-brand-forest sm:text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PlaceAndVideo() {
  const [showPlayer,setShowPlayer] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
  return (
    <section id="lugar" className="scroll-mt-28 bg-brand-warmWhite py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="flex flex-col rounded-[1.6rem] border border-brand-border bg-brand-cream p-6 sm:p-8">
            <Eyebrow>Lugar del campamento</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.03em] text-brand-forest sm:text-4xl">Conocé la nueva ubicación.</h2>
            <p className="mt-4 leading-7 text-brand-muted">Abrí Google Maps para ver el punto exacto, calcular tu recorrido y guardar el lugar.</p>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-forest px-6 text-sm font-semibold text-white">Ver ubicación exacta →</a>
          </article>

          <article className="overflow-hidden rounded-[1.6rem] border border-brand-border bg-brand-forestDark text-white">
            <div className="p-6 pb-4 sm:p-8 sm:pb-5"><Eyebrow className="text-brand-gold">Sentí la experiencia</Eyebrow><h2 className="mt-3 text-3xl font-semibold tracking-[-.03em] sm:text-4xl">Mirá lo que se vive en Gracia Camp.</h2></div>
            <div className="aspect-video">{showPlayer ? <iframe src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`} title="Video Gracia Camp" className="h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <button type="button" onClick={()=>setShowPlayer(true)} className="group relative h-full w-full"><Image src={thumbnail} alt="Video Gracia Camp" fill sizes="(min-width:1024px)50vw,100vw" className="object-cover opacity-70"/><span className="absolute inset-0 flex items-center justify-center"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl text-brand-forest shadow-xl">▶</span></span></button>}</div>
          </article>
        </div>
      </Container>
    </section>
  );
}

function FAQ() {
  const items = [
    ["¿Cómo me inscribo?","Completá el formulario de registro y seguí las indicaciones del equipo."],
    ["¿Qué incluye?","La organización comunicará el detalle completo de lo incluido y recomendaciones antes del campamento."],
    ["¿Dónde veo el reglamento?","Podés abrirlo desde el botón al final de esta página."],
  ];
  return (
    <section className="bg-brand-cream py-10 sm:py-14">
      <Container className="grid gap-7 lg:grid-cols-[.65fr_1.35fr]">
        <div><Eyebrow>Preguntas rápidas</Eyebrow><h2 className="mt-3 text-3xl font-semibold text-brand-forest sm:text-4xl">Antes de inscribirte.</h2></div>
        <div className="grid gap-2">{items.map(([q,a]) => <details key={q} className="group rounded-xl border border-brand-border bg-white px-5 py-4"><summary className="cursor-pointer list-none font-semibold text-brand-forest">{q}<span className="float-right text-brand-gold group-open:rotate-45">+</span></summary><p className="mt-3 pr-6 text-sm leading-6 text-brand-muted">{a}</p></details>)}</div>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section id="inscripcion" className="scroll-mt-28 bg-brand-forest py-12 text-white sm:py-16">
      <Container className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-gold">Tu lugar puede empezar acá</p><h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-[1.04] sm:text-4xl lg:text-5xl">¿Listo para vivir Gracia Camp 2026?</h2><p className="mt-3 text-white/60">Completá tu inscripción y asegurá tu lugar.</p></div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><ButtonLink href="/registro" variant="light" className="min-h-11 px-7">Inscribirme ahora</ButtonLink><ButtonLink href="/reglamento" variant="secondary" className="min-h-11 border-white/25 px-7 text-white">Leer reglamento</ButtonLink></div>
      </Container>
    </section>
  );
}

function Footer() {
  return <footer className="bg-brand-forestDark py-8 text-white"><Container className="flex flex-col gap-4 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-white">Ministerio de Jóvenes CBG</p><p className="mt-1">Gracia Camp 2026</p></div><p>© 2026 Ministerio de Jóvenes CBG.</p></Container></footer>;
}

function StickyMobileActions() {
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-brand-warmWhite/95 p-2.5 backdrop-blur md:hidden"><div className="grid grid-cols-[auto_1fr] items-center gap-3"><div className="px-2"><p className="text-[9px] uppercase tracking-wider text-brand-muted">Por persona</p><p className="text-sm font-semibold text-brand-forest">Gs. 400.000</p></div><Link href="/registro" className="flex min-h-11 items-center justify-center rounded-full bg-brand-forest px-4 text-sm font-semibold text-white">Inscribirme</Link></div></div>;
}

export default function CampamentoPage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite pb-16 text-brand-ink antialiased md:pb-0">
      <Header />
      <main>
        <Hero />
        <QuickNav />
        <InfoSection />
        <PreacherSection />
        <MerchSectionPublic />
        <PlaceAndVideo />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <StickyMobileActions />
    </div>
  );
}
