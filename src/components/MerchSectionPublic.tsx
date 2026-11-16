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
    {settings.bannerEnabled&&(bannerDesktopUrl||bannerMobileUrl)?<section id="merch-banner" className="bg-[#f0e9d7] py-5 sm:py-7">
      <div className="mx-auto grid max-w-[1240px] items-center gap-4 px-5 sm:px-8 md:grid-cols-[1.15fr_.85fr] md:gap-8">
        <Link href="/reservar-merch" aria-label="Ver merchandising oficial de Gracia Camp" className="group block h-[220px] overflow-hidden rounded-xl sm:h-[290px] lg:h-[340px]">
          <picture className="block h-full w-full">
            {bannerMobileUrl?<source media="(max-width: 767px)" srcSet={bannerMobileUrl}/>:null}
            <img src={bannerDesktopUrl||bannerMobileUrl} alt={settings.bannerAlt||"Remeras y gorra oficial Gracia Camp"} className="block h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.015]" decoding="async"/>
          </picture>
        </Link>
        <div className="max-w-md py-1">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#9a8145]">Merch oficial · Gracia Camp 2026</p>
          <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-[#0b493d] sm:text-3xl">Llevá Gracia Camp con vos.</h2>
          <p className="mt-3 text-sm leading-6 text-[#51655e]">Remera y gorra oficial de la edición 2026. Elegí tus productos y reservá antes del campamento.</p>
          <Link href="/reservar-merch" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0b493d] px-6 text-sm font-semibold text-white transition hover:bg-[#176451]">Ver productos y reservar →</Link>
        </div>
      </div>
    </section>:null}
    {settings.sectionEnabled&&!settings.bannerEnabled?<MerchSection settings={settings} shirtImageUrl={shirtImageUrl} capImageUrl={capImageUrl}/>:null}
  </>;
}
