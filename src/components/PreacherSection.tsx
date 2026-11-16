"use client";

import { useEffect, useState } from "react";

type S = {
  sectionEnabled:boolean; eyebrow:string; name:string; role:string; topic:string; description:string;
  dayLabel:string; church:string; cityCountry:string; showBanner:boolean; showProfileCard:boolean;
  ctaEnabled:boolean; ctaText:string; ctaHref:string; photoUrl:string; bannerDesktopUrl:string; bannerMobileUrl:string;
};

export default function PreacherSection(){
  const[settings,setSettings]=useState<S|null>(null);
  useEffect(()=>{fetch("/api/predicador",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(setSettings).catch(()=>{})},[]);
  if(!settings?.sectionEnabled)return null;
  const s=settings;

  return <section id="predicador" className="relative scroll-mt-24 overflow-hidden bg-[#f5f1e8] py-8 text-[#0b493d] sm:py-12">
    <div className="pointer-events-none absolute inset-0"><div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#b39a54]/8 blur-3xl"/><div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#6fa58f]/8 blur-3xl"/></div><div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
      <div className="grid gap-5 sm:gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a58b48]">{s.eyebrow||"Predicador invitado"}</p>
          <h2 className="mt-2 text-[1.8rem] font-semibold tracking-[-.035em] text-[#0b493d] sm:mt-4 sm:text-5xl sm:tracking-[-.045em]">{s.name}</h2>
          <p className="mt-1.5 text-sm font-medium text-[#8d7744] sm:mt-3 sm:text-lg">{s.role||"Pastor"}</p>
          {(s.church||s.cityCountry)?<div className="mt-3 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
            {s.church?<span className="rounded-full border border-[#0b493d]/15 bg-white/70 px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs font-medium text-[#46675e]">{s.church}</span>:null}
            {s.cityCountry?<span className="rounded-full border border-[#0b493d]/15 bg-white/70 px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs font-medium text-[#46675e]">{s.cityCountry}</span>:null}
            {s.dayLabel?<span className="rounded-full border border-[#0b493d]/15 bg-white/70 px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs font-medium text-[#46675e]">{s.dayLabel}</span>:null}
          </div>:null}
          {s.description?<p className="mt-4 text-sm leading-6 text-[#546b64] sm:mt-7 sm:text-base sm:leading-7">{s.description}</p>:null}
          {s.ctaEnabled&&s.ctaHref?<a href={s.ctaHref} className="mt-5 inline-flex min-h-10 items-center rounded-full bg-[#0b493d] px-5 text-xs font-semibold text-white transition hover:-translate-y-0.5 sm:mt-8 sm:min-h-12 sm:px-6 sm:text-sm">{s.ctaText} →</a>:null}
        </div>

        <div className="relative">
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#d8be70]/15 blur-3xl"/>
          <article className="relative overflow-hidden rounded-[1.35rem] border border-[#0b493d]/10 bg-[#efe8d9] shadow-[0_12px_35px_rgba(0,0,0,.10)] sm:rounded-[2.5rem] sm:shadow-[0_16px_45px_rgba(0,0,0,.13)]">
            {s.showProfileCard&&s.photoUrl?<div className="relative h-[290px] bg-[#e9e2d3] sm:h-[350px] lg:h-[390px]">
              <img src={s.photoUrl} alt={s.name} className="absolute inset-0 h-full w-full object-cover object-center"/>
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b493d]/75 to-transparent sm:h-40"/>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white sm:bottom-8 sm:left-8 sm:right-8 sm:gap-4">
                <div><p className="text-xs uppercase tracking-[.16em] text-white/60">{s.role||"Pastor"}</p><p className="mt-0.5 text-base font-semibold sm:mt-1 sm:text-2xl">{s.name}</p></div>
                {s.dayLabel?<span className="rounded-full border border-white/20 bg-black/15 px-3 py-2 text-xs backdrop-blur">{s.dayLabel}</span>:null}
              </div>
            </div>:<div className="flex min-h-[480px] items-center justify-center p-8 text-center text-sm text-[#6f7f7a]">Perfil del predicador</div>}
          </article>
        </div>
      </div>
    </div>
  </section>
}
