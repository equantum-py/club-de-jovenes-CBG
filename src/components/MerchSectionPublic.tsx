"use client";

import {useEffect,useState} from "react";
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
  if(!settings.bannerEnabled||!(bannerDesktopUrl||bannerMobileUrl))return null;
  return <section id="merch-banner" className="bg-[#f0e9d7]">
    <a href="/reservar-merch" aria-label="Ver productos oficiales de Gracia Camp" className="block w-full overflow-hidden">
      <picture className="block w-full">
        {bannerMobileUrl?<source media="(max-width: 767px)" srcSet={bannerMobileUrl}/>:null}
        <img src={bannerDesktopUrl||bannerMobileUrl} alt={settings.bannerAlt||"Merch oficial Gracia Camp"} className="block w-full aspect-square object-cover sm:aspect-[16/5]" decoding="async"/>
      </picture>
    </a>
  </section>;
}
