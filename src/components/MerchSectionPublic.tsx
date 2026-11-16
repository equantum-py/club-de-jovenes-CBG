"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import MerchSection from "@/components/MerchSection";
import type {MerchSettings} from "@/lib/merch-settings";

type Payload=MerchSettings&{
  bannerDesktopUrl:string;
  bannerMobileUrl:string;
  shirtImageUrl:string;
  capImageUrl:string;
};

export default function MerchSectionPublic(){
  const[data,setData]=useState<Payload|null>(null);
  useEffect(()=>{fetch("/api/merch",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(setData).catch(()=>{});},[]);
  if(!data)return null;
  const{bannerDesktopUrl,bannerMobileUrl,shirtImageUrl,capImageUrl,...settings}=data;
  return <>
    {settings.bannerEnabled&&(bannerDesktopUrl||bannerMobileUrl)?<section id="merch-banner" className="bg-[#f0e9d7] py-8 sm:py-10">
      <div className="mx-auto grid max-w-[1240px] items-center gap-6 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
        <Link href="/reservar-merch" aria-label="Ver merchandising oficial de Gracia Camp" className="group flex h-[215px] items-center justify-center overflow-hidden rounded-2xl bg-[#f9f6ee] sm:h-[280px] lg:h-[310px]">
          <picture className="flex h-full w-full items-center justify-center">
            {bannerMobileUrl?<source media="(max-width: 767px)" srcSet={bannerMobileUrl}/>:null}
            <img src={bannerDesktopUrl||bannerMobileUrl} alt={settings.bannerAlt||"Remeras y gorra oficial Gracia Camp"} className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.025]" decoding="async"/>
          </picture>
        </Link>
        <div className="max-w-md">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#9a8145]">Merch oficial · Gracia Camp 2026</p>
          <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-[#0b493d] sm:text-3xl">Llevá Gracia Camp con vos.</h2>
          <p className="mt-3 text-sm leading-6 text-[#51655e]">Remera y gorra oficial de la edición 2026. Elegí tus productos y reservá antes del campamento.</p>
          <Link href="/reservar-merch" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0b493d] px-6 text-sm font-semibold text-white transition hover:bg-[#176451]">Ver productos y reservar →</Link>
        </div>
      </div>
    </section>:null}
    {settings.sectionEnabled?<MerchSection settings={settings} shirtImageUrl={shirtImageUrl} capImageUrl={capImageUrl} hideIntro={Boolean(settings.bannerEnabled&&(bannerDesktopUrl||bannerMobileUrl))}/>:null}
  </>;
}
