"use client";

import Link from "next/link";
import Countdown from "@/components/Countdown";
import PreacherSection from "@/components/PreacherSection";
import MerchSectionPublic from "@/components/MerchSectionPublic";

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
    <div className="mx-auto grid min-h-[auto] max-w-[1480px] items-center gap-8 px-5 py-9 sm:px-8 sm:py-12 lg:min-h-[620px] lg:grid-cols-[.88fr_1.12fr] lg:gap-14 lg:py-10 xl:min-h-[650px] xl:py-12">
      <div className="relative z-10 max-w-2xl lg:self-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0b493d]/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] text-[#0b493d]">
          <span className="h-2 w-2 rounded-full bg-[#b39a54]"/>
          Ministerio de Jóvenes CBG
        </div>
        <h1 className="mt-5 text-[clamp(3rem,13vw,4.2rem)] font-black uppercase leading-[.86] tracking-[-.055em] text-[#0b493d] sm:mt-7 sm:text-[clamp(4rem,8vw,8rem)] sm:leading-[.82] sm:tracking-[-.065em]">
          Gracia
          <span className="block text-[#b39a54]">Camp 2026</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[#4e625d] sm:mt-8 sm:text-xl sm:leading-8">
          3 días para salir de la rutina y vivir lo que realmente importa.
        </p>
        <div className="mt-6 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:gap-3">
          <Link href="/registro" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0b493d] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#083d34] sm:min-h-13 sm:px-7">
            Inscribirme ahora
          </Link>
          <a href="#experiencia" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0b493d]/15 bg-white px-6 text-sm font-semibold text-[#0b493d] transition hover:bg-[#efe8d9] sm:min-h-13 sm:px-7">
            Ver experiencia
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#d8c987]/35 blur-3xl"/>
        <div className="absolute -bottom-12 right-8 h-48 w-48 rounded-full bg-[#77a892]/25 blur-3xl"/>
        <div className="relative overflow-hidden rounded-[2rem] border border-[#0b493d]/10 bg-[#0b493d] shadow-[0_40px_100px_rgba(11,73,61,.18)] sm:rounded-[2.6rem]">
          <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#0a332c] sm:aspect-[16/10] lg:min-h-[500px] xl:min-h-[540px]">
            <iframe
              src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1418411315349210&show_text=false&autoplay=true&width=1280"
              title="Video Gracia Camp"
              className="absolute inset-0 h-full w-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#071f1a]/75 via-transparent to-transparent"/>
          <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-8">
            <div className="grid grid-cols-3 gap-2 rounded-[1.1rem] border border-white/15 bg-black/30 p-2.5 text-white backdrop-blur-xl sm:rounded-[1.4rem] sm:p-4">
              <div><p className="text-[10px] uppercase tracking-[.15em] text-white/55">Fecha</p><p className="mt-1 text-sm font-semibold sm:text-base">04–06 Dic</p></div>
              <div><p className="text-[10px] uppercase tracking-[.15em] text-white/55">Lugar</p><p className="mt-1 text-base font-black leading-none text-white sm:text-lg">Monte Aramí</p><p className="mt-1 text-[10px] font-medium text-white/65 sm:text-xs">Paraguarí</p></div>
              <div><p className="text-[10px] uppercase tracking-[.15em] text-white/55">Precio</p><p className="mt-1 inline-flex rounded-full bg-[#d8be70] px-2.5 py-1 text-sm font-black text-[#0a332c] shadow-sm sm:text-base">Gs. 380.000</p></div>
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
    ["02","Lugar","Monte Aramí","Paraguarí"],
    ["03","Precio","Gs. 380.000","Por persona · nuevo valor"],
    ["04","Cupos","Limitados","Inscripciones abiertas"]
  ];
  return <section id="experiencia" className="bg-white py-10 sm:py-28">
    <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
      <div className="mb-5 max-w-3xl sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#b39a54]">Todo en un mismo lugar</p>
        <h2 className="mt-2 text-[1.65rem] font-semibold leading-[1.08] tracking-[-.03em] text-[#0b493d] sm:mt-4 sm:text-6xl sm:tracking-[-.045em]">Una experiencia pensada para desconectarte y encontrarte con lo esencial.</h2>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map(([n,label,value,sub])=><article key={label} className="group rounded-[1.1rem] border border-[#0b493d]/10 bg-[#f7f3e9] p-3.5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b493d]/8 sm:rounded-[1.6rem] sm:p-7">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#b39a54]">{n}</span>
            <span className="h-2 w-2 rounded-full bg-[#0b493d]/20 transition group-hover:bg-[#0b493d]"/>
          </div>
          <p className="mt-4 text-[9px] font-semibold uppercase tracking-[.14em] text-[#698078] sm:mt-10 sm:text-xs">{label}</p>
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
  return <section id="propositos" className="overflow-hidden bg-[#082f29] py-10 text-white sm:py-28">
    <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
      <div className="grid gap-4 sm:gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#d7be70]">Tres propósitos</p>
          <h2 className="mt-3 text-[1.7rem] font-semibold leading-[1.05] tracking-[-.035em] sm:mt-4 sm:text-6xl sm:tracking-[-.045em]">Lo que sostiene cada momento del campamento.</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7 lg:justify-self-end">
          Palabra, comunión y propósito en una experiencia de tres días.
        </p>
      </div>
      <div className="mt-6 grid gap-2 sm:mt-14 sm:gap-3 lg:grid-cols-3">
        {items.map(([n,title,text])=><article key={title} className="rounded-[1rem] border border-white/10 bg-white/[.05] px-4 py-3.5 backdrop-blur-sm sm:rounded-[1.6rem] sm:p-8">
          <p className="text-xs font-semibold text-[#d7be70]">{n}</p>
          <h3 className="mt-3 max-w-sm text-base font-semibold tracking-[-.01em] sm:mt-14 sm:text-3xl sm:tracking-[-.03em]">{title}</h3>
          {text?<p className="mt-1 max-w-sm text-xs leading-5 text-white/55 sm:mt-4 sm:text-sm sm:leading-6">{text}</p>:null}
        </article>)}
      </div>
    </div>
  </section>
}

function ExperienceGallery(){
  const photos=[
    "https://scontent.fasu4-1.fna.fbcdn.net/v/t51.75761-15/467728634_18249175168287245_6217892445326613116_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1200&ctp=s1200x1200&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_ohc=yK05HHTHFx8Q7kNvwGVfFui&_nc_oc=Ado61goERFm_Oq5bufeH5cS53mc1Dv7kOQ2jg8bsmwMsdTy_1EX8iXNWpwF4TJT0xns&_nc_zt=23&_nc_ht=scontent.fasu4-1.fna&_nc_gid=kMOeFokJEz3g2Z9XbIgFwg&_nc_ss=7d2a8&oh=00_AQOmuLO9g9QiS98PlRNN_-9V6d5AwA6PmnHX2ZObWR72tA&oe=6AE15520",
    "https://scontent.fasu3-1.fna.fbcdn.net/v/t51.75761-15/463774154_18244619797287245_7491826258637776928_n.jpg?stp=dst-jpg_tt6&cstp=mx1440x1440&ctp=s1440x1440&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_ohc=SHfcV39MjZMQ7kNvwFHOV2W&_nc_oc=AdoRb8ONXrqWfInS6pIb8SIJ1cKHkikw6dhJ3on3SC9cp9_gb_cWA2hcNewjtiWxEHQ&_nc_zt=23&_nc_ht=scontent.fasu3-1.fna&_nc_gid=03XXqzRtdnaMCnhgSoz-Uw&_nc_ss=7d2a8&oh=00_AQO3pP330vE7INSIslwP_e6N9bMWw_UOBpOs9_MoFaRDTw&oe=6AE15FD5",
    "https://scontent.fasu3-1.fna.fbcdn.net/v/t39.30808-6/469590539_18251106427287245_1973854245760209958_n.jpg?stp=dst-jpg_tt6&cstp=mx1284x1283&ctp=s1284x1283&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3Q2DAVlNnv8Q7kNvwGCL5T7&_nc_oc=AdomTf15BPqyz2q95Kluqi_tK93oVW7GxqsImI7KlAS0NrWM-53zfshWWU9FEyv_b3U&_nc_zt=23&_nc_ht=scontent.fasu3-1.fna&_nc_gid=qtvseKPnZcSUj_9sPK2ukQ&_nc_ss=7d2a8&oh=00_AQOLE6RsvvhT_yf2D3mXZGFhEiuMFGLQDiNnX6y2jmMk6A&oe=6AE13315",
    "https://scontent.fasu4-1.fna.fbcdn.net/v/t1.6435-9/81429482_825571651204645_4906395361335050240_n.jpg?stp=dst-jpg_tt6&cstp=mx1656x630&ctp=s1656x630&_nc_cat=101&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=KPgQZDiZ8hcQ7kNvwHHaGDs&_nc_oc=AdqCM75r2XmxsTk6qagFBtNGBCxsjLA3tDZc102q3x6UY7IjhwzTkpMkaF5kH0kHqtY&_nc_zt=23&_nc_ht=scontent.fasu4-1.fna&_nc_gid=-2-_pdH64M6FZOjIFivfUQ&_nc_ss=7d2a8&oh=00_AQNjQKltoBf3CSgGBj6xfPs2Ez3CanZTKmEMlzMxlusrFQ&oe=6B02CB57",
    "https://scontent.fasu4-1.fna.fbcdn.net/v/t51.82787-15/791144195_18334056082287245_7369366710206220414_n.jpg?stp=dst-jpg_tt6&cstp=mx1600x2004&ctp=s1600x2004&_nc_cat=109&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Mhu_igZWCx8Q7kNvwGiAEhB&_nc_oc=AdqPezs1Z-qB0uWSRxf5cbJbvsMlfPjBpJsEX7MZLks9VJP8yiiqBXy1QbRwGJaA1sA&_nc_zt=23&_nc_ht=scontent.fasu4-1.fna&_nc_gid=r9Fm6w7D5v59Itgm2nGgxA&_nc_ss=7d2a8&oh=00_AQPZduU6vF-kWs8fLW07ujzrgBFxIPQzcMxyHWVIVOOI2A&oe=6AE15453"
  ];
  return <section id="momentos" className="bg-white py-10 sm:py-20">
    <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
      <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#b39a54]">Conocé el lugar</p>
          <h2 className="mt-2 text-[1.7rem] font-semibold leading-[1.05] tracking-[-.035em] text-[#0b493d] sm:mt-4 sm:text-5xl">Monte Aramí, Paraguarí.</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[#667a74] sm:justify-self-end sm:text-base sm:leading-7">El espacio donde vamos a vivir Gracia Camp 2026 durante tres días.</p>
      </div>

      <div className="mt-6 grid gap-3 sm:mt-10 sm:grid-cols-12">
        <article className="overflow-hidden rounded-[1.3rem] sm:col-span-7 sm:row-span-2 sm:rounded-[2rem]">
          <img src={photos[0]} alt="Monte Aramí, Paraguarí" loading="lazy" className="h-full min-h-[280px] w-full object-cover sm:min-h-[560px]"/>
        </article>
        <article className="overflow-hidden rounded-[1.3rem] sm:col-span-5 sm:rounded-[2rem]">
          <img src={photos[1]} alt="Monte Aramí" loading="lazy" className="aspect-[16/10] h-full w-full object-cover"/>
        </article>
        <article className="overflow-hidden rounded-[1.3rem] sm:col-span-5 sm:rounded-[2rem]">
          <img src={photos[2]} alt="Monte Aramí" loading="lazy" className="aspect-[16/10] h-full w-full object-cover"/>
        </article>
        <article className="overflow-hidden rounded-[1.3rem] sm:col-span-4 sm:rounded-[2rem]">
          <img src={photos[3]} alt="Monte Aramí" loading="lazy" className="aspect-[16/10] h-full w-full object-cover"/>
        </article>
        <article className="overflow-hidden rounded-[1.3rem] sm:col-span-4 sm:rounded-[2rem]">
          <img src={photos[4]} alt="Monte Aramí" loading="lazy" className="aspect-[16/10] h-full w-full object-cover"/>
        </article>
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
function FAQ(){
  const items=[
    ["¿Cómo me inscribo?","Completá el formulario de registro y seguí las indicaciones del equipo."],
    ["¿Qué incluye?","La organización comunicará el detalle completo y las recomendaciones antes del campamento."],
    ["¿Dónde veo el reglamento?","Podés abrirlo desde el botón al final de esta página."]
  ];
  return <section className="bg-white py-10 sm:py-28">
    <div className="mx-auto grid max-w-[1380px] gap-6 px-5 sm:gap-12 sm:px-8 lg:grid-cols-[.72fr_1.28fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#b39a54]">Preguntas frecuentes</p>
        <h2 className="mt-2 text-[1.65rem] font-semibold leading-[1.08] tracking-[-.03em] text-[#0b493d] sm:mt-4 sm:text-6xl sm:tracking-[-.045em]">Todo lo que necesitás saber.</h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-[#667a74] sm:mt-5 sm:text-base sm:leading-7">Encontrá rápido las respuestas antes de reservar tu lugar.</p>
      </div>
      <div className="divide-y divide-[#0b493d]/10 border-y border-[#0b493d]/10">
        {items.map(([q,a],i)=><details key={q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-[#0b493d] sm:py-6 sm:text-xl">
            <span><span className="mr-5 text-xs font-medium text-[#b39a54]">0{i+1}</span>{q}</span>
            <span className="text-2xl font-light transition group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-2xl pb-4 pl-8 text-xs leading-5 text-[#667a74] sm:pb-7 sm:pl-10 sm:text-base sm:leading-7">{a}</p>
        </details>)}
      </div>
    </div>
  </section>
}

function CTA(){
  return <section className="bg-[#f7f3e9] px-5 py-7 sm:px-8 sm:py-16">
    <div className="mx-auto max-w-[1380px] overflow-hidden rounded-[1.4rem] bg-[#0b493d] px-5 py-7 text-white sm:rounded-[2.7rem] sm:px-10 sm:py-16 lg:px-16">
      <div className="grid gap-5 sm:gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#d7be70]">Gracia Camp 2026</p>
          <h2 className="mt-3 max-w-4xl text-[1.7rem] font-semibold leading-[1.05] tracking-[-.035em] sm:mt-4 sm:text-6xl sm:tracking-[-.05em] lg:text-7xl">Inscribite hoy y asegurá tu lugar.</h2>
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

function Footer(){
  return <footer className="bg-[#082f29] py-8 text-white">
    <div className="mx-auto flex max-w-[1380px] flex-col gap-5 px-5 text-xs text-white/45 sm:px-8 md:flex-row md:items-center md:justify-between">
      <div><p className="font-semibold text-white">Ministerio de Jóvenes CBG</p><p className="mt-1">Gracia Camp 2026</p></div>
      <p>© 2026 Ministerio de Jóvenes CBG.</p>
    </div>
  </footer>
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
      <FAQ/>
      <CTA/>
    </main>
    <Footer/>
    <StickyMobileActions/>
  </div>
}
