"use client";

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
        <picture>
          {bannerMobileUrl?<source media="(max-width: 767px)" srcSet={bannerMobileUrl}/>:null}
          <img src={bannerDesktopUrl||bannerMobileUrl} alt={settings.bannerAlt} className="block w-full rounded-[1.4rem] object-cover shadow-sm sm:rounded-[1.8rem]"/>
        </picture>
      </div>
    </section>:null}
    {settings.sectionEnabled?<MerchSection settings={settings} shirtImageUrl={shirtImageUrl} capImageUrl={capImageUrl}/>:null}
  </>;
}
