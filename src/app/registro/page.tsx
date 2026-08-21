"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Header from "@/components/Header";

type FormData = {
  nombre:string; apellido:string; edad:string; telefono:string; cedula:string; sexo:string;
  iglesia:string; esInvitado:string; invitadoPor:string; alergias:string; medicamentos:string;
  enfermedadBase:string; contactoEmergenciaNombre:string; contactoEmergenciaTelefono:string;
  formaPago:string; nombrePadreMadre:string; telefonoPadreMadre:string;
  deseaRemera:string; talleRemera:string;
};

type PaymentSettings = { bankName:string; accountHolder:string; accountNumber:string; documentNumber:string };

const CAMP_PRICE=400000;
const SHIRT_PRICE=100000;
const initialForm:FormData={nombre:"",apellido:"",edad:"",telefono:"",cedula:"",sexo:"",iglesia:"",esInvitado:"",invitadoPor:"",alergias:"",medicamentos:"",enfermedadBase:"",contactoEmergenciaNombre:"",contactoEmergenciaTelefono:"",formaPago:"transferencia",nombrePadreMadre:"",telefonoPadreMadre:"",deseaRemera:"",talleRemera:""};
const emptyPayment:PaymentSettings={bankName:"",accountHolder:"",accountNumber:"",documentNumber:""};
const DRAFT_KEY="gracia-camp-registro-draft";
const formatGs=(value:number)=>`Gs. ${value.toLocaleString("es-PY")}`;

export default function RegistroPage(){
  const router=useRouter();
  const[formData,setFormData]=useState<FormData>(initialForm);
  const[selfie,setSelfie]=useState<File|null>(null);
  const[paymentProof,setPaymentProof]=useState<File|null>(null);
  const[payment,setPayment]=useState<PaymentSettings>(emptyPayment);
  const[preview,setPreview]=useState("");
  const[cameraOpen,setCameraOpen]=useState(false);
  const[cameraError,setCameraError]=useState("");
  const[submitError,setSubmitError]=useState("");
  const[isSubmitting,setIsSubmitting]=useState(false);
  const videoRef=useRef<HTMLVideoElement>(null);
  const streamRef=useRef<MediaStream|null>(null);

  useEffect(()=>{try{const saved=sessionStorage.getItem(DRAFT_KEY);if(saved)setFormData({...initialForm,...JSON.parse(saved),formaPago:"transferencia"});}catch{}},[]);
  useEffect(()=>{try{sessionStorage.setItem(DRAFT_KEY,JSON.stringify(formData));}catch{}},[formData]);
  useEffect(()=>{fetch("/api/payment-settings",{cache:"no-store"}).then(r=>r.ok?r.json():emptyPayment).then(setPayment).catch(()=>setPayment(emptyPayment));},[]);
  useEffect(()=>()=>streamRef.current?.getTracks().forEach(track=>track.stop()),[]);

  const esMenor=useMemo(()=>formData.edad!==""&&Number(formData.edad)<18,[formData.edad]);
  const wantsShirt=formData.deseaRemera==="si";
  const total=useMemo(()=>CAMP_PRICE+(wantsShirt?SHIRT_PRICE:0),[wantsShirt]);
  const paymentReady=Boolean(payment.bankName&&payment.accountHolder&&payment.accountNumber);

  function handleChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>){const{name,value}=event.target;setFormData(current=>({...current,[name]:value,...(name==="deseaRemera"&&value!=="si"?{talleRemera:""}: {})}));setSubmitError("");}

  async function openCamera(){setCameraError("");try{if(!navigator.mediaDevices?.getUserMedia){setCameraError("Este navegador no permite usar la cámara dentro de la página.");return;}const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user",width:{ideal:720},height:{ideal:720}},audio:false});streamRef.current=stream;setCameraOpen(true);requestAnimationFrame(()=>{if(videoRef.current){videoRef.current.srcObject=stream;videoRef.current.play().catch(()=>undefined);}});}catch{setCameraError("No pudimos abrir la cámara. Revisá el permiso e intentá nuevamente.");}}
  function stopCamera(){streamRef.current?.getTracks().forEach(track=>track.stop());streamRef.current=null;setCameraOpen(false);}
  function takeSelfie(){const video=videoRef.current;if(!video||!video.videoWidth||!video.videoHeight){setCameraError("La cámara todavía está cargando.");return;}const size=Math.min(video.videoWidth,video.videoHeight);const canvas=document.createElement("canvas");canvas.width=720;canvas.height=720;const context=canvas.getContext("2d");if(!context)return;const sx=(video.videoWidth-size)/2;const sy=(video.videoHeight-size)/2;context.translate(720,0);context.scale(-1,1);context.drawImage(video,sx,sy,size,size,0,0,720,720);canvas.toBlob(blob=>{if(!blob)return;const file=new File([blob],`selfie-${Date.now()}.jpg`,{type:"image/jpeg"});setSelfie(file);setPreview(canvas.toDataURL("image/jpeg",.88));setSubmitError("");stopCamera();},"image/jpeg",.88);}

  async function handleSubmit(event:FormEvent<HTMLFormElement>){event.preventDefault();if(wantsShirt&&!formData.talleRemera){setSubmitError("Elegí el talle de tu remera para continuar.");return;}if(!selfie){setSubmitError("Necesitamos que te saques una selfie para completar la inscripción.");return;}if(!paymentProof){setSubmitError(`Adjuntá el comprobante de transferencia por ${formatGs(total)} para completar la inscripción.`);return;}if(isSubmitting)return;setIsSubmitting(true);setSubmitError("");try{const body=new FormData();Object.entries(formData).forEach(([key,value])=>body.append(key,value));body.append("selfie",selfie);body.append("paymentProof",paymentProof);const response=await fetch("/api/registro",{method:"POST",body});const result=await response.json().catch(()=>({}));if(!response.ok){setSubmitError(result.error??"No se pudo guardar tu inscripción.");return;}try{sessionStorage.removeItem(DRAFT_KEY);}catch{}router.push("/reglamento");}catch{setSubmitError("No se pudo conectar con el servidor. Intentá nuevamente.");}finally{setIsSubmitting(false);}}

  return <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
    <Header/>
    <section className="bg-brand-cream py-14 sm:py-20"><div className="mx-auto max-w-5xl px-5"><p className="text-sm font-medium tracking-[.18em] text-brand-gold">Club de Jóvenes CBG</p><h1 className="mt-4 text-4xl font-semibold text-brand-forest sm:text-6xl">Registro Campamento 2026</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-brand-muted">Completá tus datos y confirmá tu inscripción con la transferencia.</p><div className="mt-5 inline-flex items-center gap-3 rounded-full border border-brand-border bg-white px-5 py-3"><span className="text-sm text-brand-muted">Valor del campamento</span><strong className="text-lg text-brand-forest">{formatGs(CAMP_PRICE)}</strong></div></div></section>

    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-10 px-5 py-12">
      <Section number="01" title="Datos personales"/>
      <div className="grid gap-5 md:grid-cols-2"><Field label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange}/><Field label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange}/><Field label="Edad" name="edad" value={formData.edad} onChange={handleChange} type="number"/><Field label="Número de teléfono" name="telefono" value={formData.telefono} onChange={handleChange}/><Field label="Cédula" name="cedula" value={formData.cedula} onChange={handleChange}/><Select label="Sexo" name="sexo" value={formData.sexo} onChange={handleChange} options={[["","Seleccionar"],["masculino","Masculino"],["femenino","Femenino"]]}/></div>

      <section className="rounded-3xl border border-brand-border bg-brand-cream p-5 sm:p-8"><div className="grid gap-7 md:grid-cols-[1fr_280px] md:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-gold">Identificación</p><h2 className="mt-2 text-2xl font-semibold text-brand-forest">Selfie del participante *</h2><p className="mt-2 max-w-xl leading-7 text-brand-muted">Abrí la cámara, mirá de frente y tomá una foto clara.</p>{!cameraOpen?<div className="mt-5"><button type="button" onClick={openCamera} className="w-full rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white sm:w-auto">{preview?"Volver a sacar selfie":"Abrir cámara"}</button></div>:<div className="mt-5 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={takeSelfie} className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white">Tomar selfie</button><button type="button" onClick={stopCamera} className="rounded-full border border-brand-border bg-white px-6 py-3 text-sm font-semibold text-brand-forest">Cancelar</button></div>}{cameraError?<p className="mt-3 text-sm text-red-700">{cameraError}</p>:null}</div><div className="aspect-square overflow-hidden rounded-3xl border border-brand-border bg-white">{cameraOpen?<video ref={videoRef} autoPlay playsInline muted className="h-full w-full scale-x-[-1] object-cover"/>:preview?<img src={preview} alt="Vista previa de la selfie" className="h-full w-full object-cover"/>:<div className="flex h-full items-center justify-center p-5 text-center text-sm text-brand-muted">Tu selfie aparecerá acá</div>}</div></div></section>

      <Section number="02" title="Información adicional"/>
      <div className="grid gap-5 md:grid-cols-2"><Field label="Iglesia / congregación" name="iglesia" value={formData.iglesia} onChange={handleChange} required={false}/><Select label="¿Sos invitado?" name="esInvitado" value={formData.esInvitado} onChange={handleChange} options={[["","Seleccionar"],["no","No"],["si","Sí"]]}/>{formData.esInvitado==="si"?<Field label="Nombre de quien te invitó" name="invitadoPor" value={formData.invitadoPor} onChange={handleChange}/>:null}</div>

      {esMenor?<><Section number="03" title="Responsable"/><div className="grid gap-5 md:grid-cols-2"><Field label="Nombre del padre, madre o tutor" name="nombrePadreMadre" value={formData.nombrePadreMadre} onChange={handleChange}/><Field label="Teléfono del responsable" name="telefonoPadreMadre" value={formData.telefonoPadreMadre} onChange={handleChange}/></div></>:null}

      <Section number="04" title="Salud"/>
      <div className="grid gap-5 md:grid-cols-2"><Field label="¿Tiene alguna alergia?" name="alergias" value={formData.alergias} onChange={handleChange} required={false}/><Field label="¿Qué medicamento toma?" name="medicamentos" value={formData.medicamentos} onChange={handleChange} required={false}/><Field label="¿Tiene enfermedad de base?" name="enfermedadBase" value={formData.enfermedadBase} onChange={handleChange} required={false}/></div>

      <Section number="05" title="Emergencia"/>
      <div className="grid gap-5 md:grid-cols-2"><Field label="Contacto de emergencia" name="contactoEmergenciaNombre" value={formData.contactoEmergenciaNombre} onChange={handleChange} required={false}/><Field label="Teléfono de emergencia" name="contactoEmergenciaTelefono" value={formData.contactoEmergenciaTelefono} onChange={handleChange} required={false}/></div>

      <Section number="06" title="Remera oficial"/>
      <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7"><div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-gold">Merch oficial</p><h3 className="mt-2 text-xl font-semibold text-brand-forest">¿Querés adquirir la remera oficial del campamento?</h3><p className="mt-2 text-sm text-brand-muted">Podés agregarla a tu inscripción por <strong className="text-brand-forest">{formatGs(SHIRT_PRICE)}</strong>.</p></div><div className="w-full md:w-56"><Select label="Remera oficial" name="deseaRemera" value={formData.deseaRemera} onChange={handleChange} options={[["","Seleccionar"],["no","No, gracias"],["si","Sí, quiero"]]}/></div></div>{wantsShirt?<div className="mt-5 border-t border-brand-border pt-5"><Select label="Talle de remera" name="talleRemera" value={formData.talleRemera} onChange={handleChange} options={[["","Seleccionar talle"],["S","S"],["M","M"],["L","L"],["XL","XL"],["XXL","XXL"]]}/></div>:null}</section>

      <Section number="07" title="Pago"/>
      <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
        <div className="flex flex-col gap-2 border-b border-brand-border pb-5"><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-gold">Transferencia bancaria</p><h3 className="text-xl font-semibold text-brand-forest">Revisá el total antes de transferir</h3><p className="text-sm text-brand-muted">La inscripción solo se completa cuando adjuntás el comprobante.</p></div>
        <div className="my-5 rounded-2xl bg-brand-cream p-5"><div className="flex items-center justify-between gap-4 border-b border-brand-border pb-3"><span className="text-sm text-brand-muted">Campamento</span><strong className="text-brand-forest">{formatGs(CAMP_PRICE)}</strong></div>{wantsShirt?<div className="flex items-center justify-between gap-4 border-b border-brand-border py-3"><span className="text-sm text-brand-muted">Remera oficial · talle {formData.talleRemera||"—"}</span><strong className="text-brand-forest">{formatGs(SHIRT_PRICE)}</strong></div>:null}<div className="flex items-end justify-between gap-4 pt-4"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-gold">Total a transferir</p><p className="mt-1 text-xs text-brand-muted">Este es el monto que debe figurar en tu comprobante.</p></div><strong className="text-2xl text-brand-forest sm:text-3xl">{formatGs(total)}</strong></div></div>
        {paymentReady?<div className="divide-y divide-brand-border"><PaymentRow label="Banco" value={payment.bankName}/><PaymentRow label="Titular" value={payment.accountHolder}/><PaymentRow label="Cuenta / Alias" value={payment.accountNumber}/>{payment.documentNumber?<PaymentRow label="CI / RUC" value={payment.documentNumber}/>:null}</div>:<div className="py-5 text-sm text-brand-muted">Los datos bancarios todavía no fueron configurados por administración.</div>}
        <div className="border-t border-brand-border pt-5"><label className="block"><span className="text-sm font-semibold text-brand-forest">Adjuntar comprobante *</span><span className="mt-1 block text-xs font-medium text-red-400">Sujeto a verificación*</span><input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" required onChange={e=>{setPaymentProof(e.target.files?.[0]??null);setSubmitError("");}} className="mt-4 block w-full rounded-xl border border-brand-border bg-white p-3 text-sm"/></label>{paymentProof?<p className="mt-3 text-sm font-medium text-brand-forest">✓ {paymentProof.name}</p>:null}</div>
      </section>

      {submitError?<p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{submitError}</p>:null}
      <div className="flex flex-col-reverse gap-3 border-t border-brand-border pt-8 sm:flex-row sm:justify-between"><Link href="/bienvenida" className="rounded-full border border-brand-border px-6 py-3 text-center text-sm font-semibold">Volver</Link><button disabled={isSubmitting||!paymentProof} className="rounded-full bg-brand-forest px-8 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{isSubmitting?"Enviando...":paymentProof?"Enviar registro":"Adjuntá el comprobante para finalizar"}</button></div>
    </form>
  </div>;
}

function PaymentRow({label,value}:{label:string;value:string}){return <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:items-center"><span className="text-xs font-semibold uppercase tracking-[.12em] text-brand-gold">{label}</span><span className="break-words font-semibold text-brand-forest">{value}</span></div>;}
function Section({number,title}:{number:string;title:string}){return <div className="grid gap-3 border-t border-brand-border pt-8 sm:grid-cols-[64px_1fr]"><span className="text-3xl font-semibold text-brand-gold">{number}</span><h2 className="text-3xl font-semibold text-brand-forest">{title}</h2></div>;}
function Field({label,name,value,onChange,type="text",required=true}:{label:string;name:string;value:string;onChange:(event:ChangeEvent<HTMLInputElement>)=>void;type?:string;required?:boolean}){return <label><span className="mb-2 block text-sm font-semibold">{label}{required?" *":""}</span><input name={name} type={type} value={value} onChange={onChange} required={required} className="min-h-12 w-full rounded-xl border border-brand-border bg-white px-4"/></label>;}
function Select({label,name,value,onChange,options}:{label:string;name:string;value:string;onChange:(event:ChangeEvent<HTMLSelectElement>)=>void;options:string[][]}){return <label className="block"><span className="mb-2 block text-sm font-semibold">{label} *</span><select name={name} value={value} onChange={onChange} required className="min-h-12 w-full rounded-xl border border-brand-border bg-white px-4">{options.map(([optionValue,optionLabel])=><option key={optionValue} value={optionValue}>{optionLabel}</option>)}</select></label>;}
