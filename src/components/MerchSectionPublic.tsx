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
    {settings.bannerEnabled&&(bannerDesktopUrl||bannerMobileUrl)?<section id="merch-banner" className="bg-brand-cream py-4 sm:py-6">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <Link href="/reservar-merch" aria-label="Reservar merch oficial Gracia Camp" className="group block overflow-hidden rounded-[1.4rem] focus:outline-none focus:ring-4 focus:ring-brand-gold/30 sm:rounded-[1.8rem]">
          <picture>
            {bannerMobileUrl?<source media="(max-width: 767px)" srcSet={bannerMobileUrl}/>:null}
            <img src={bannerDesktopUrl||bannerMobileUrl} alt={settings.bannerAlt} className="block h-auto w-full object-cover shadow-sm [image-rendering:auto]" decoding="async"/>
          </picture>
        </Link>
      </div>
    </section>:null}
    {settings.sectionEnabled?<MerchSection settings={settings} shirtImageUrl={shirtImageUrl} capImageUrl={capImageUrl}/>:null}
  </>;
}
