"use client";

import { useEffect, useRef, useState } from "react";

type CampVideoPayload={enabled:boolean;showText:boolean;eyebrow:string;title:string;description:string;sourceType:"youtube"|"upload"|"drive";videoId:string;videoUrl:string;driveEmbedUrl:string;thumbnailUrl:string;embedUrl:string;autoplay:boolean;soundEnabled:boolean;loop:boolean};

export default function CampVideoSection(){
 const[settings,setSettings]=useState<CampVideoPayload|null>(null);const[showPlayer,setShowPlayer]=useState(false);const[audioBlocked,setAudioBlocked]=useState(false);const videoRef=useRef<HTMLVideoElement>(null);
 useEffect(()=>{fetch("/api/camp-video",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(setSettings).catch(()=>{})},[]);
 useEffect(()=>{const video=videoRef.current;if(!video||!settings?.autoplay)return;video.muted=!settings.soundEnabled;const attempt=video.play();if(attempt)attempt.catch(async()=>{if(settings.soundEnabled){video.muted=true;setAudioBlocked(true);try{await video.play()}catch{}}});},[settings]);
 if(!settings)return null;
 const isUpload=settings.sourceType==="upload"&&Boolean(settings.videoUrl),isYoutube=settings.sourceType==="youtube"&&Boolean(settings.videoId),isDrive=settings.sourceType==="drive"&&Boolean(settings.driveEmbedUrl);
 if(!isUpload&&!isYoutube&&!isDrive)return null;
 const youtubeParams=`autoplay=${settings.autoplay?1:0}&mute=${settings.soundEnabled?0:1}&loop=${settings.loop?1:0}${settings.loop?`&playlist=${settings.videoId}`:""}`;

 const player=<div className="relative aspect-video w-full overflow-hidden rounded-[1.6rem] bg-black sm:rounded-[2rem]">
 {isDrive?<iframe src={settings.driveEmbedUrl} title={settings.title||"Video oficial Gracia Camp"} className="absolute inset-0 h-full w-full border-0" allow="autoplay; fullscreen" allowFullScreen/>:isUpload?<><video ref={videoRef} src={settings.videoUrl} controls playsInline preload="metadata" loop={settings.loop} className="h-full w-full bg-black object-contain">Tu navegador no puede reproducir este video.</video>{audioBlocked&&settings.soundEnabled?<button type="button" onClick={()=>{const v=videoRef.current;if(v){v.muted=false;v.play().catch(()=>{});setAudioBlocked(false)}}} className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0b493d] shadow-lg">🔊 Activar sonido</button>:null}</>:showPlayer||settings.autoplay?<iframe src={`${settings.embedUrl}?${youtubeParams}`} title={settings.title||"Video oficial Gracia Camp"} className="h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/>:<button type="button" onClick={()=>setShowPlayer(true)} className="group relative h-full w-full overflow-hidden" aria-label="Reproducir video oficial de Gracia Camp"><img src={settings.thumbnailUrl} alt="Video oficial Gracia Camp" className="absolute inset-0 h-full w-full object-cover opacity-75"/><span className="absolute inset-0 flex items-center justify-center"><span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/60 bg-black/30 text-xl text-white backdrop-blur transition group-hover:scale-105">▶</span></span></button>}
 </div>;

 return <section id="video-completo" className="scroll-mt-24 bg-white py-20 sm:py-28">
  <div className="mx-auto max-w-[1380px] px-5 sm:px-8">
    {settings.showText?<div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#b39a54]">{settings.eyebrow}</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] text-[#0b493d] sm:text-6xl">{settings.title}</h2>
        <p className="mt-5 max-w-md text-base leading-7 text-[#667a74]">{settings.description}</p>
      </div>
      <div className="rounded-[2rem] border border-[#0b493d]/10 bg-[#f7f3e9] p-3 shadow-[0_30px_80px_rgba(11,73,61,.1)] sm:rounded-[2.5rem] sm:p-4">{player}</div>
    </div>:<div className="rounded-[2rem] border border-[#0b493d]/10 bg-[#f7f3e9] p-3 sm:rounded-[2.5rem] sm:p-4">{player}</div>}
  </div>
 </section>;
}
