"use client";

import {useEffect,useState} from "react";

type BannerSettings={bannerEnabled:boolean;bannerDesktopUrl:string;bannerMobileUrl:string;bannerAlt:string};

export default function RegistrationBanner(){
  const[s,setS]=useState<BannerSettings|null>(null);
  useEffect(()=>{let active=true;fetch('/api/registration-settings',{cache:'no-store'}).then(r=>r.ok?r.json():null).then(data=>{if(active&&data)setS(data)}).catch(()=>undefined);return()=>{active=false}},[]);
  if(s&&!s.bannerEnabled)return null;
  const desktop=s?.bannerDesktopUrl||'/campamento/banner-inscripcion.webp';
  const mobile=s?.bannerMobileUrl||desktop;
  const alt=s?.bannerAlt||'Merch oficial Gracia Camp: remeras y gorras';
  return <div className="overflow-hidden rounded-3xl border border-brand-border bg-white shadow-sm">
    <picture>
      <source media="(max-width: 767px)" srcSet={mobile}/>
      <img src={desktop} alt={alt} className="block h-auto w-full" decoding="async"/>
    </picture>
  </div>;
}
