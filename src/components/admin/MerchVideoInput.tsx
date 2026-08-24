"use client";

import { ChangeEvent, useState } from "react";

type Props={currentPath:string;currentUrl:string};
const ALLOWED_TYPES=["video/mp4"];

export default function MerchVideoInput({currentPath,currentUrl}:Props){
  const[path,setPath]=useState(currentPath);
  const[preview,setPreview]=useState(currentUrl);
  const[status,setStatus]=useState("");
  const[uploading,setUploading]=useState(false);

  async function onFile(event:ChangeEvent<HTMLInputElement>){
    const file=event.target.files?.[0];
    if(!file)return;
    try{
      setStatus("");
      if(!ALLOWED_TYPES.includes(file.type)&&!file.name.toLowerCase().endsWith('.mp4'))throw new Error('Usá un video MP4.');
      if(file.size>50*1024*1024)throw new Error('El video debe pesar menos de 50 MB.');
      setUploading(true);
      const signed=await fetch('/api/admin/video-oficial/upload-url',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fileName:`merch-${file.name}`,mimeType:'video/mp4'})});
      const data=await signed.json();
      if(!signed.ok)throw new Error(data?.error||'No se pudo preparar la carga.');
      const body=new FormData();
      body.append('cacheControl','31536000');
      body.append('',file);
      const uploaded=await fetch(data.signedUrl,{method:'PUT',headers:{'x-upsert':'false'},body});
      if(!uploaded.ok)throw new Error('No se pudo cargar el video.');
      setPath(data.path);
      setPreview(URL.createObjectURL(file));
      setStatus('Video listo. Ahora hacé clic en “Guardar cambios”.');
    }catch(error){
      setStatus(error instanceof Error?error.message:'No se pudo cargar el video.');
      event.target.value='';
    }finally{
      setUploading(false);
    }
  }

  return <div className="rounded-2xl border border-brand-border bg-brand-cream/50 p-4">
    <div className="flex items-start justify-between gap-3">
      <div><h3 className="font-semibold text-brand-forest">Video promocional</h3><p className="mt-1 text-xs text-brand-muted">MP4 vertical · recomendado 1080 × 1920 px (9:16).</p></div>
      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-muted">9:16</span>
    </div>
    <div className="mx-auto mt-4 max-w-[240px] overflow-hidden rounded-2xl border border-brand-border bg-white">
      {preview?<video src={preview} controls muted playsInline preload="metadata" className="aspect-[9/16] w-full object-contain"/>:<div className="flex aspect-[9/16] items-center justify-center p-6 text-center text-sm text-brand-muted">Todavía no cargaste el video promocional.</div>}
    </div>
    <input type="hidden" name="video_path" value={path}/>
    <input onChange={onFile} disabled={uploading} type="file" accept="video/mp4,.mp4" className="mt-4 block w-full rounded-xl border border-brand-border bg-white p-3 text-sm text-brand-forest disabled:opacity-60"/>
    <p className={`mt-2 text-xs ${status.startsWith('Video listo')?'text-green-700':'text-brand-muted'}`}>{uploading?'Cargando video...':status||'El archivo se sube directamente al almacenamiento del sitio.'}</p>
  </div>;
}
