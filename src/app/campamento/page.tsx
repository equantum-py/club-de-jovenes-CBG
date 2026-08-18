"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Header from "@/components/Header";
import PreacherSection from "@/components/PreacherSection";
import MerchSectionPublic from "@/components/MerchSectionPublic";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/design";

const MAPS_URL = "https://maps.app.goo.gl/bVdDJtbaZFsJN7Eo7";
const YOUTUBE_VIDEO_ID = "_EpTnktKT-o";
const WHATSAPP_NUMBER = "595985194953";

function QuickNav() {
  return (
    <div className="hidden sticky top-[68px] z-30 border-y border-brand-border bg-brand-warmWhite/95 backdrop-blur md:block">
      <Container className="flex gap-2 overflow-x-auto py-2 text-sm [scrollbar-width:none]">
        <a href="#inscripcion" className="whitespace-nowrap rounded-full border border-brand-border bg-white px-4 py-2 font-semibold text-brand-forest">Inscripción</a>
        <a href="#predicador" className="whitespace-nowrap rounded-full border border-brand-border bg-white px-4 py-2 font-semibold text-brand-forest">Predicador</a>
        <a href="#remera" className="whitespace-nowrap rounded-full border border-brand-border bg-white px-4 py-2 font-semibold text-brand-forest">Merch</a>
        <a href="#video" className="whitespace-nowrap rounded-full border border-brand-border bg-white px-4 py-2 font-semibold text-brand-forest">Video</a>
      </Container>
    </div>
  );
}

function RegistrationFocus() {
  return (
    <section id="inscripcion" className="scroll-mt-24 bg-brand-cream py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>Inscripciones abiertas</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-[-.04em] text-brand-forest sm:text-5xl lg:text-6xl">Tu lugar en Gracia Camp empieza acá.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-brand-muted sm:text-lg">Cuatro días para desconectarte de la rutina, compartir y vivir una experiencia con propósito.</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold text-brand-forest sm:text-base">
            <span>03–06 diciembre</span><span className="text-brand-gold">•</span><span>Rancho Alegre · San Bernardino</span><span className="text-brand-gold">•</span><span>Gs. 400.000</span><span className="text-brand-gold">•</span><span>Cupos limitados</span>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/registro" className="min-h-12 px-8 text-base">Inscribirme ahora</ButtonLink>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-forest px-8 text-sm font-semibold text-brand-forest transition hover:bg-brand-forest hover:text-white">Ver ubicación</a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function VideoSection() {
  const [showPlayer, setShowPlayer] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
  return (
    <section id="video" className="scroll-mt-24 bg-brand-warmWhite py-10 sm:py-14 lg:py-16">
      <Container>
        <article className="mx-auto max-w-5xl overflow-hidden rounded-[1.6rem] bg-brand-forestDark text-white">
          <div className="p-5 pb-3 text-center sm:p-7 sm:pb-4">
            <Eyebrow className="text-brand-gold">Video</Eyebrow>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-.03em] sm:text-3xl">Así se vive Gracia Camp.</h2>
          </div>
          <div className="aspect-video">
            {showPlayer ? (
              <iframe src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`} title="Video Gracia Camp" className="h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
            ) : (
              <button type="button" onClick={() => setShowPlayer(true)} className="group relative h-full w-full" aria-label="Reproducir video Gracia Camp">
                <Image src={thumbnail} alt="Video Gracia Camp" fill sizes="(min-width:1024px)70vw,100vw" className="object-cover opacity-70" />
                <span className="absolute inset-0 flex items-center justify-center"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg text-brand-forest shadow-xl">▶</span></span>
              </button>
            )}
          </div>
        </article>
      </Container>
    </section>
  );
}

function FAQ() {
  const items = [["¿Cómo me inscribo?", "Completá el formulario de registro y seguí las indicaciones del equipo."],["¿Qué incluye?", "La organización comunicará el detalle completo y las recomendaciones antes del campamento."],["¿Dónde veo el reglamento?", "Podés abrirlo desde el botón al final de esta página."]];
  return (
    <section className="bg-brand-cream py-10 sm:py-14">
      <Container className="grid gap-6 lg:grid-cols-[.65fr_1.35fr]">
        <div><Eyebrow>Antes de inscribirte</Eyebrow><h2 className="mt-2 text-3xl font-semibold text-brand-forest sm:text-4xl">Preguntas rápidas.</h2></div>
        <div className="grid gap-1">{items.map(([q,a])=><details key={q} className="group border-b border-brand-border py-4"><summary className="cursor-pointer list-none text-sm font-semibold text-brand-forest sm:text-base">{q}<span className="float-right text-brand-gold group-open:rotate-45">+</span></summary><p className="mt-3 pr-5 text-sm leading-6 text-brand-muted">{a}</p></details>)}</div>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-brand-forest py-11 text-white sm:py-14">
      <Container className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-brand-gold">Gracia Camp 2026</p><h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-[1.04] sm:text-4xl lg:text-5xl">Reservá tu lugar.</h2><p className="mt-3 text-sm text-white/70">03–06 de diciembre · Gs. 400.000 · cupos limitados.</p></div>
        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col"><ButtonLink href="/registro" variant="light" className="min-h-11 px-6 text-sm">Inscribirme</ButtonLink><ButtonLink href="/reglamento" variant="secondary" className="min-h-11 border-white/25 px-6 text-sm text-white">Reglamento</ButtonLink></div>
      </Container>
    </section>
  );
}

function WhatsAppFloating() {
  const message = encodeURIComponent("Hola, quiero más información sobre Gracia Camp 2026.");
  return <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`} target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp" className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-xl transition hover:scale-105 md:bottom-6 md:right-6"><span aria-hidden="true">✆</span></a>;
}

function Footer() {
  return <footer className="bg-brand-forestDark py-6 text-white"><Container className="flex flex-col gap-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-white">Ministerio de Jóvenes CBG</p><p className="mt-1">Gracia Camp 2026</p></div><p>© 2026 Ministerio de Jóvenes CBG.</p></Container></footer>;
}

function StickyMobileActions() {
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-brand-warmWhite/95 p-2.5 backdrop-blur md:hidden"><Link href="/registro" className="flex min-h-11 items-center justify-center rounded-full bg-brand-forest px-4 text-sm font-semibold text-white">Inscribirme</Link></div>;
}

export default function CampamentoPage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite pb-16 text-brand-ink antialiased md:pb-0">
      <Header />
      <main>
        <QuickNav />
        <RegistrationFocus />
        <PreacherSection />
        <MerchSectionPublic />
        <VideoSection />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloating />
      <StickyMobileActions />
    </div>
  );
}
