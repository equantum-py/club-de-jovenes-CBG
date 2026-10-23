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

  return <section id="predicador" className="relative scroll-mt-24 overflow-hidden bg-[#0a332c] py-20 text-white sm:py-28">
    <div className="pointer-events-none absolute inset-0"><div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#b39a54]/10 blur-3xl"/><div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#6fa58f]/10 blur-3xl"/></div><div className="relative mx-auto max-w-[1380px] px-5 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#d8be70]">{s.eyebrow||"Predicador invitado"}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] text-white sm:text-6xl">{s.name}</h2>
          <p className="mt-3 text-lg font-medium text-[#d8be70]">{s.role||"Pastor"}</p>
          {(s.church||s.cityCountry)?<div className="mt-6 flex flex-wrap gap-2">
            {s.church?<span className="rounded-full border border-white/12 bg-white/[.06] px-4 py-2 text-xs font-medium text-white/70">{s.church}</span>:null}
            {s.cityCountry?<span className="rounded-full border border-white/12 bg-white/[.06] px-4 py-2 text-xs font-medium text-white/70">{s.cityCountry}</span>:null}
            {s.dayLabel?<span className="rounded-full border border-white/12 bg-white/[.06] px-4 py-2 text-xs font-medium text-white/70">{s.dayLabel}</span>:null}
          </div>:null}
          {s.description?<p className="mt-7 text-base leading-7 text-white/65">{s.description}</p>:null}
          {s.ctaEnabled&&s.ctaHref?<a href={s.ctaHref} className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#d8be70] px-6 text-sm font-semibold text-[#0a332c] transition hover:-translate-y-0.5">{s.ctaText} →</a>:null}
        </div>

        <div className="relative">
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[#d8be70]/15 blur-3xl"/>
          <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#efe8d9] shadow-[0_35px_90px_rgba(0,0,0,.2)] sm:rounded-[2.5rem]">
            {s.showProfileCard&&s.photoUrl?<div className="relative min-h-[480px] bg-[#e9e2d3] sm:min-h-[620px]">
              <img src={s.photoUrl} alt={s.name} className="absolute inset-0 h-full w-full object-contain object-bottom"/>
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b493d]/75 to-transparent"/>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-white sm:bottom-8 sm:left-8 sm:right-8">
                <div><p className="text-xs uppercase tracking-[.16em] text-white/60">{s.role||"Pastor"}</p><p className="mt-1 text-2xl font-semibold">{s.name}</p></div>
                {s.dayLabel?<span className="rounded-full border border-white/20 bg-black/15 px-3 py-2 text-xs backdrop-blur">{s.dayLabel}</span>:null}
              </div>
            </div>:<div className="flex min-h-[480px] items-center justify-center p-8 text-center text-sm text-[#6f7f7a]">Perfil del predicador</div>}
          </article>
        </div>
      </div>
    </div>
  </section>
}
