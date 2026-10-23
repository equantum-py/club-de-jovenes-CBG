"use client";

import Link from "next/link";
import Countdown from "@/components/Countdown";
import PreacherSection from "@/components/PreacherSection";
import MerchSectionPublic from "@/components/MerchSectionPublic";
import CampVideoSection from "@/components/CampVideoSection";

const LOGO_URL="https://tiqvcxasaqboxyydwzhz.supabase.co/storage/v1/object/public/site-assets/logo-1787424725781.png";

function LandingHeader(){
  return <header className="sticky top-0 z-50 border-b border-[#123f36]/10 bg-[#f7f3e9]/92 backdrop-blur-xl">
    <div className="mx-auto flex h-[74px] max-w-[1380px] items-center justify-between px-5 sm:px-8 lg:h-[86px]">
      <Link href="/inicio" className="flex items-center">
        <img src={LOGO_URL} alt="Gracia Camp" fetchPriority="high" className="h-12 w-auto object-contain sm:h-14"/>
      </Link>
      <nav className="hidden items-center gap-8 text-sm font-medium text-[#49635c] lg:flex">
        <a href="#propositos" className="transition hover:text-[#0d493e]">Propósitos</a>
        <a href="#predicador" className="transition hover:text-[#0d493e]">Predicador</a>
        <a href="#video-completo" className="transition hover:text-[#0d493e]">Experiencia</a>
        <Link href="/reglamento" className="transition hover:text-[#0d493e]">Reglamento</Link>
      </nav>
      <div className="flex items-center gap-4">
        <div className="hidden xl:block"><Countdown compact/></div>
        <Link href="/registro" className="inline-flex min-h-11 items-center rounded-full bg-[#0b493d] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#083d34]">
          Inscribirme
        </Link>
      </div>
    </div>
  </header>
}

function Hero(){
  return <section className="overflow-hidden bg-[#f7f3e9]">
    <div className="mx-auto grid min-h-[760px] max-w-[1480px] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[.88fr_1.12fr] lg:gap-16 lg:py-20">
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0b493d]/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-[#0b493d]">
          <span className="h-2 w-2 rounded-full bg-[#b39a54]"/>
          Ministerio de Jóvenes CBG
        </div>
        <h1 className="mt-7 text-[clamp(4rem,8vw,8rem)] font-black uppercase leading-[.82] tracking-[-.065em] text-[#0b493d]">
          Gracia
          <span className="block text-[#b39a54]">Camp 2026</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-[#4e625d] sm:text-xl">
          3 días para salir de la rutina y vivir lo que realmente importa.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/registro" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#0b493d] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#083d34]">
            Inscribirme ahora
          </Link>
          <a href="#experiencia" className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#0b493d]/15 bg-white px-7 text-sm font-semibold text-[#0b493d] transition hover:bg-[#efe8d9]">
            Ver experiencia
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#d8c987]/35 blur-3xl"/>
        <div className="absolute -bottom-12 right-8 h-48 w-48 rounded-full bg-[#77a892]/25 blur-3xl"/>
        <div className="relative overflow-hidden rounded-[2rem] border border-[#0b493d]/10 bg-[#0b493d] shadow-[0_40px_100px_rgba(11,73,61,.18)] sm:rounded-[2.6rem]">
          <video autoPlay muted loop playsInline preload="metadata" className="aspect-[4/5] w-full object-cover sm:aspect-[16/10] lg:min-h-[610px]" aria-hidden="true">
            <source src="/videos/video%20detras.mp4" type="video/mp4"/>
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#071f1a]/75 via-transparent to-transparent"/>
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <div className="grid grid-cols-3 gap-2 rounded-[1.4rem] border border-white/15 bg-black/30 p-3 text-white backdrop-blur-xl sm:p-4">
              <div><p className="text-[10px] uppercase tracking-[.15em] text-white/55">Fecha</p><p className="mt-1 font-semibold">04–06 Dic</p></div>
              <div><p className="text-[10px] uppercase tracking-[.15em] text-white/55">Lugar</p><p className="mt-1 font-semibold">Paraguarí</p></div>
              <div><p className="text-[10px] uppercase tracking-[.15em] text-white/55">Precio</p><p className="mt-1 font-semibold">Gs. 450.000</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

function KeyInfo(){
  const items=[
    ["01","Fecha","04–06","Diciembre 2026"],
    ["02","Lugar","Paraguarí","Monte Aramí"],
    ["03","Precio","Gs. 450.000","Por persona"],
    ["04","Cupos","Limitados","Inscripciones abiertas"]
  ];
  return <section id="experiencia" className="bg-white py-20 sm:py-28">
    <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#b39a54]">Todo en un mismo lugar</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] text-[#0b493d] sm:text-6xl">Una experiencia pensada para desconectarte y encontrarte con lo esencial.</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map(([n,label,value,sub])=><article key={label} className="group rounded-[1.6rem] border border-[#0b493d]/10 bg-[#f7f3e9] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b493d]/8 sm:p-7">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#b39a54]">{n}</span>
            <span className="h-2 w-2 rounded-full bg-[#0b493d]/20 transition group-hover:bg-[#0b493d]"/>
          </div>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[.15em] text-[#698078]">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-[-.03em] text-[#0b493d]">{value}</p>
          <p className="mt-2 text-sm text-[#6f7f7a]">{sub}</p>
        </article>)}
      </div>
    </div>
  </section>
}

function Pillars(){
  const items=[
    ["01","Exaltar a Dios",""],
    ["02","Predicar el evangelio",""],
    ["03","Edificar a los creyentes","con la enseñanza de Su Palabra."]
  ];
  return <section id="propositos" className="overflow-hidden bg-[#082f29] py-20 text-white sm:py-28">
    <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#d7be70]">Tres propósitos</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] sm:text-6xl">Lo que sostiene cada momento del campamento.</h2>
        </div>
        <p className="max-w-xl text-base leading-7 text-white/60 lg:justify-self-end">
          Palabra, comunión y propósito en una experiencia de tres días.
        </p>
      </div>
      <div className="mt-14 grid gap-3 lg:grid-cols-3">
        {items.map(([n,title,text])=><article key={title} className="rounded-[1.6rem] border border-white/10 bg-white/[.05] p-6 backdrop-blur-sm sm:p-8">
          <p className="text-xs font-semibold text-[#d7be70]">{n}</p>
          <h3 className="mt-14 max-w-sm text-2xl font-semibold tracking-[-.03em] sm:text-3xl">{title}</h3>
          {text?<p className="mt-4 max-w-sm text-sm leading-6 text-white/55">{text}</p>:null}
        </article>)}
      </div>
    </div>
  </section>
}

function FAQ(){
  const items=[
    ["¿Cómo me inscribo?","Completá el formulario de registro y seguí las indicaciones del equipo."],
    ["¿Qué incluye?","La organización comunicará el detalle completo y las recomendaciones antes del campamento."],
    ["¿Dónde veo el reglamento?","Podés abrirlo desde el botón al final de esta página."]
  ];
  return <section className="bg-white py-20 sm:py-28">
    <div className="mx-auto grid max-w-[1380px] gap-12 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#b39a54]">Preguntas frecuentes</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] text-[#0b493d] sm:text-6xl">Todo lo que necesitás saber.</h2>
        <p className="mt-5 max-w-md text-base leading-7 text-[#667a74]">Encontrá rápido las respuestas antes de reservar tu lugar.</p>
      </div>
      <div className="divide-y divide-[#0b493d]/10 border-y border-[#0b493d]/10">
        {items.map(([q,a],i)=><details key={q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-lg font-semibold text-[#0b493d] sm:text-xl">
            <span><span className="mr-5 text-xs font-medium text-[#b39a54]">0{i+1}</span>{q}</span>
            <span className="text-2xl font-light transition group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-2xl pb-7 pl-10 text-sm leading-7 text-[#667a74] sm:text-base">{a}</p>
        </details>)}
      </div>
    </div>
  </section>
}

function CTA(){
  return <section className="bg-[#f7f3e9] px-5 py-10 sm:px-8 sm:py-16">
    <div className="mx-auto max-w-[1380px] overflow-hidden rounded-[2rem] bg-[#0b493d] px-6 py-12 text-white sm:rounded-[2.7rem] sm:px-10 sm:py-16 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#d7be70]">Gracia Camp 2026</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-.05em] sm:text-6xl lg:text-7xl">Inscribite hoy y asegurá tu lugar.</h2>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">04–06 de diciembre · Monte Aramí, Paraguarí · Gs. 450.000 · cupos limitados.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link href="/registro" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f7f3e9] px-7 text-sm font-semibold text-[#0b493d]">Inscribirme ahora</Link>
          <Link href="/reglamento" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white">Reglamento</Link>
        </div>
      </div>
    </div>
  </section>
}

function Footer(){
  return <footer className="bg-[#082f29] py-8 text-white">
    <div className="mx-auto flex max-w-[1380px] flex-col gap-5 px-5 text-xs text-white/45 sm:px-8 md:flex-row md:items-center md:justify-between">
      <div><p className="font-semibold text-white">Ministerio de Jóvenes CBG</p><p className="mt-1">Gracia Camp 2026</p></div>
      <p>© 2026 Ministerio de Jóvenes CBG.</p>
    </div>
  </footer>
}

function StickyMobileActions(){
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#0b493d]/10 bg-[#f7f3e9]/95 p-2.5 backdrop-blur md:hidden">
    <Link href="/registro" className="flex min-h-11 items-center justify-center rounded-full bg-[#0b493d] px-4 text-sm font-semibold text-white">Inscribirme</Link>
  </div>
}

export default function CampamentoPage(){
  return <div className="min-h-screen bg-[#f7f3e9] pb-16 text-[#16322c] antialiased md:pb-0">
    <LandingHeader/>
    <main>
      <Hero/>
      <KeyInfo/>
      <Pillars/>
      <PreacherSection/>
      <MerchSectionPublic/>
      <CampVideoSection/>
      <FAQ/>
      <CTA/>
    </main>
    <Footer/>
    <StickyMobileActions/>
  </div>
}
