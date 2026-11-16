"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import Countdown from "@/components/Countdown";
import Footer from "@/components/Footer";
import PreacherSection from "@/components/PreacherSection";
import MerchSectionPublic from "@/components/MerchSectionPublic";

const LOGO_URL="https://tiqvcxasaqboxyydwzhz.supabase.co/storage/v1/object/public/site-assets/logo-1787424725781.png";

function LandingHeader(){
  return <header className="sticky top-0 z-50 border-b border-[#123f36]/10 bg-[#f7f3e9]/92 backdrop-blur-xl">
    <div className="mx-auto flex h-[68px] max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:h-[76px]">
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
  return <section className="relative isolate flex min-h-[510px] items-center overflow-hidden bg-[#092f29] text-white sm:min-h-[580px]">
    <video autoPlay muted loop playsInline preload="metadata" aria-label="Vista de Monte Aramí" className="absolute inset-0 -z-20 h-full w-full object-cover">
      <source src="/videos/monte-arami.mp4" type="video/mp4"/>
    </video>
    <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,33,29,.94),rgba(5,40,35,.72)_55%,rgba(5,40,35,.45))]"/>
    <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
      <div className="max-w-[720px]">
        <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[.16em] text-white/90 backdrop-blur-sm">Inscripciones abiertas · Gracia Camp 2026</span>
        <p className="mt-7 text-xs font-bold uppercase tracking-[.25em] text-[#e2c77c]">Ministerio de Jóvenes CBG</p>
        <h1 className="mt-3 text-[clamp(3rem,10vw,6.5rem)] font-black uppercase leading-[.92] tracking-[-.055em]">Vivir es <span className="text-[#e2c77c]">Cristo</span></h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-lg">«Porque habéis muerto, y vuestra vida está escondida con Cristo en Dios». <strong className="text-white">Colosenses 3:3</strong></p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/registro" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-bold text-[#0b493d] transition hover:bg-[#f3e8c9]">Inscribirme ahora</Link>
          <a href="#experiencia" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 text-sm font-semibold text-white transition hover:bg-white/20">Conocer el campamento</a>
        </div>
        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/20 pt-5 text-xs text-white/85 sm:text-sm">
          <span><strong className="text-white">04–06 dic.</strong> · 2026</span>
          <span><strong className="text-white">Monte Aramí</strong> · Paraguarí</span>
          <span><strong className="text-white">Gs. 380.000</strong> · por persona</span>
        </div>
      </div>
    </div>
  </section>
}

function KeyInfo(){
  const items=[
    ["01","Fecha","04–06","Diciembre 2026"],
    ["02","Lugar","Monte Aramí","Paraguarí"],
    ["03","Precio","Gs. 380.000","Por persona · nuevo valor"],
    ["04","Cupos","Limitados","Inscripciones abiertas"]
  ];
  return <section id="experiencia" className="bg-[#faf9f6] py-12 sm:py-16">
    <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
      <div className="mb-5 max-w-3xl sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#b39a54]">Todo en un mismo lugar</p>
        <h2 className="mt-2 text-[1.65rem] font-semibold leading-[1.08] tracking-[-.03em] text-[#0b493d] sm:mt-4 sm:text-4xl sm:tracking-[-.045em]">Una experiencia pensada para desconectarte y encontrarte con lo esencial.</h2>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map(([n,label,value,sub])=><article key={label} className="group rounded-[1.1rem] border border-[#0b493d]/10 bg-white p-3.5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b493d]/8 sm:rounded-[1.6rem] sm:p-7">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#b39a54]">{n}</span>
            <span className="h-2 w-2 rounded-full bg-[#0b493d]/20 transition group-hover:bg-[#0b493d]"/>
          </div>
          <p className="mt-4 text-[9px] font-semibold uppercase tracking-[.14em] text-[#698078] sm:mt-6 sm:text-xs">{label}</p>
          <p className={`mt-1 font-semibold tracking-[-.02em] sm:mt-2 sm:tracking-[-.03em] ${label==="Precio"?"inline-flex rounded-full bg-[#0b493d] px-3 py-1.5 text-[1.1rem] font-black text-white sm:text-2xl":label==="Lugar"?"text-[1.2rem] font-black text-[#0b493d] sm:text-[1.9rem]":"text-[1.05rem] text-[#0b493d] sm:text-2xl"}`}>{value}</p>
          <p className={`mt-1 leading-4 text-[#6f7f7a] sm:mt-2 sm:text-sm ${label==="Lugar"?"text-xs font-semibold":"text-[11px]"}`}>{sub}</p>
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
  return <section id="propositos" className="overflow-hidden bg-[#0b493d] py-12 text-white sm:py-16">
    <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
      <div className="grid gap-4 sm:gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#d7be70]">Tres propósitos</p>
          <h2 className="mt-3 text-[1.7rem] font-semibold leading-[1.05] tracking-[-.035em] sm:mt-4 sm:text-4xl sm:tracking-[-.045em]">Lo que sostiene cada momento del campamento.</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7 lg:justify-self-end">
          Palabra, comunión y propósito en una experiencia de tres días.
        </p>
      </div>
      <div className="mt-6 grid gap-2 sm:mt-5 sm:gap-3 lg:grid-cols-3">
        {items.map(([n,title,text])=><article key={title} className="rounded-[1rem] border border-white/10 bg-white/[.05] px-4 py-3.5 backdrop-blur-sm sm:rounded-[1.6rem] sm:p-6">
          <p className="text-xs font-semibold text-[#d7be70]">{n}</p>
          <h3 className="mt-3 max-w-sm text-base font-semibold tracking-[-.01em] sm:mt-5 sm:text-2xl sm:tracking-[-.03em]">{title}</h3>
          {text?<p className="mt-1 max-w-sm text-xs leading-5 text-white/55 sm:mt-4 sm:text-sm sm:leading-6">{text}</p>:null}
        </article>)}
      </div>
    </div>
  </section>
}

function ExperienceGallery(){
  const [photos,setPhotos]=useState<string[]>([]);
  useEffect(()=>{let active=true;fetch("/api/galeria-monte-arami",{cache:"no-store"}).then(r=>r.json()).then(data=>{if(active&&Array.isArray(data.images))setPhotos(data.images)}).catch(()=>{});return()=>{active=false}},[]);
  if(!photos.length)return null;
  return <section id="momentos" className="bg-white py-10 sm:py-12">
    <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
      <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#b39a54]">Conocé el lugar</p>
          <h2 className="mt-2 text-[1.7rem] font-semibold leading-[1.05] tracking-[-.035em] text-[#0b493d] sm:mt-4 sm:text-3xl">Monte Aramí, Paraguarí.</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[#667a74] sm:justify-self-end sm:text-base sm:leading-7">El espacio donde vamos a vivir Gracia Camp 2026 durante tres días.</p>
      </div>

      <div className="mt-6 grid gap-3 sm:mt-6 sm:grid-cols-12">
        {photos.map((src,index)=><article key={src} className={`overflow-hidden rounded-[1.3rem] bg-[#f7f3e9] sm:rounded-[2rem] ${index===0?"sm:col-span-7 sm:row-span-2":"sm:col-span-5"}`}><img src={src} alt={`Monte Aramí, Paraguarí — fotografía ${index+1}`} loading="lazy" decoding="async" className={`block w-full object-cover ${index===0?"aspect-[4/3] sm:h-full sm:min-h-[320px]":"aspect-[16/10]"}`}/></article>)}
        <article className="flex items-center rounded-[1.3rem] bg-[#0b493d] p-5 text-white sm:col-span-4 sm:rounded-[2rem] sm:p-7">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#d8be70]">Monte Aramí · Paraguarí</p>
            <p className="mt-3 text-xl font-semibold tracking-[-.03em] sm:text-2xl">Palabra, comunión y propósito.</p>
            <p className="mt-2 text-sm leading-6 text-white/65">04–06 de diciembre · Gracia Camp 2026</p>
          </div>
        </article>
      </div>
    </div>
  </section>
}
function CTA(){
  return <section className="bg-[#f7f3e9] px-5 py-7 sm:px-8 sm:py-12">
    <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[1.4rem] bg-[#0b493d] px-5 py-7 text-white sm:rounded-[2.7rem] sm:px-10 sm:py-12 lg:px-16">
      <div className="grid gap-5 sm:gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#d7be70]">Gracia Camp 2026</p>
          <h2 className="mt-3 max-w-4xl text-[1.7rem] font-semibold leading-[1.05] tracking-[-.035em] sm:mt-4 sm:text-4xl sm:tracking-[-.05em] lg:text-5xl">Inscribite hoy y asegurá tu lugar.</h2>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-white/65 sm:mt-6 sm:text-base sm:leading-7">04–06 de diciembre · Monte Aramí, Paraguarí · Gs. 380.000 · cupos limitados.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link href="/registro" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f7f3e9] px-7 text-sm font-semibold text-[#0b493d]">Inscribirme ahora</Link>
          <Link href="/reglamento" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white">Reglamento</Link>
        </div>
      </div>
    </div>
  </section>
}

function StickyMobileActions(){
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#0b493d]/10 bg-[#f7f3e9]/95 px-3 py-1.5 backdrop-blur md:hidden">
    <Link href="/registro" className="flex min-h-9 items-center justify-center rounded-full bg-[#0b493d] px-4 text-xs font-semibold text-white">Inscribirme</Link>
  </div>
}

export default function CampamentoPage(){
  return <div className="min-h-screen bg-[#f7f3e9] pb-16 text-[#16322c] antialiased md:pb-0">
    <LandingHeader/>
    <main>
      <Hero/>
      <PreacherSection/>
      <KeyInfo/>
      <Pillars/>
      <MerchSectionPublic/>
      <ExperienceGallery/>
      <CTA/>
    </main>
    <Footer/>
    <StickyMobileActions/>
  </div>
}
