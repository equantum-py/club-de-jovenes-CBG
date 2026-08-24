"use client";

import { useState, type ChangeEvent } from "react";

type Props={
  name:string;
  minWidth:number;
  minHeight:number;
  recommended:string;
  className?:string;
};

export default function HighQualityImageInput({name,minWidth,minHeight,recommended,className=""}:Props){
  const[message,setMessage]=useState("");
  const[ok,setOk]=useState(false);

  function validate(event:ChangeEvent<HTMLInputElement>){
    setMessage("");
    setOk(false);
    const file=event.target.files?.[0];
    if(!file)return;
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)){
      setMessage("Usá una imagen JPG, PNG o WebP.");
      event.target.value="";
      return;
    }
    const url=URL.createObjectURL(file);
    const image=new Image();
    image.onload=()=>{
      URL.revokeObjectURL(url);
      if(image.naturalWidth<minWidth||image.naturalHeight<minHeight){
        setMessage(`La imagen es muy chica (${image.naturalWidth} × ${image.naturalHeight}px). Mínimo: ${minWidth} × ${minHeight}px.`);
        event.target.value="";
        return;
      }
      setOk(true);
      setMessage(`Calidad correcta: ${image.naturalWidth} × ${image.naturalHeight}px.`);
    };
    image.onerror=()=>{
      URL.revokeObjectURL(url);
      setMessage("No pudimos leer esta imagen. Probá con otro archivo.");
      event.target.value="";
    };
    image.src=url;
  }

  return <div>
    <input
      name={name}
      type="file"
      accept="image/jpeg,image/png,image/webp"
      onChange={validate}
      className={className}
    />
    <p className="mt-2 text-xs text-brand-muted">Recomendado: {recommended}. Se conserva el archivo original sin reducir su resolución.</p>
    {message?<p className={`mt-2 text-xs font-medium ${ok?"text-green-700":"text-red-600"}`}>{message}</p>:null}
  </div>;
}
