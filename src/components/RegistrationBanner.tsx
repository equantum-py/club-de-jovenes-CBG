"use client";

import {useEffect,useState} from "react";

type BannerSettings={bannerEnabled:boolean;bannerDesktopUrl:string;bannerMobileUrl:string;bannerAlt:string};
type RulesSettings={pageEnabled:boolean;showInRegistration:boolean};

export default function RegistrationBanner(){
  const[s,setS]=useState<BannerSettings|null>(null);const[rules,setRules]=useState<RulesSettings|null>(null);
  useEffect(()=>{let active=true;fetch('/api/registration-settings',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(data=>{if(active&&data)setS(data)}).catch(()=>undefined);fetch('/api/rules-settings',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(data=>{if(active&&data)setRules(data)}).catch(()=>undefined);return()=>{active=false}},[]);
  const bannerVisible=!s||s.bannerEnabled;
  const desktop=s?.bannerDesktopUrl||'/campamento/banner-inscripcion.webp';const mobile=s?.bannerMobileUrl||desktop;const alt=s?.bannerAlt||'Merch oficial Gracia Camp: remeras y gorras';
  return <div className="space-y-4">{rules?.showInRegistration&&rules.pageEnabled?<div className="rounded-2xl border border-brand-border bg-brand-cream p-4 text-sm leading-6 text-brand-ink"><strong className="text-brand-forest">Reglamento y normas de convivencia</strong><span className="ml-2 text-brand-muted">Podés consultarlo sin perder los datos que ya completaste.</span><a href="/reglamento" target="_blank" rel="noopener noreferrer" className="ml-2 font-semibold text-brand-forest underline underline-offset-4">Ver reglamento completo ↗</a></div>:null}{bannerVisible?<div className="overflow-hidden rounded-3xl border border-brand-border bg-white shadow-sm"><picture><source media="(max-width: 767px)" srcSet={mobile}/><img src={desktop} alt={alt} className="block h-auto w-full" decoding="async"/></picture></div>:null}</div>;
}
