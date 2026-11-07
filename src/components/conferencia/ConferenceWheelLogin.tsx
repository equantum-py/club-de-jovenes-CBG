"use client";
import {FormEvent,useState} from "react";
export default function ConferenceWheelLogin(){
 const[error,setError]=useState("");const[busy,setBusy]=useState(false);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setBusy(true);setError("");
  const data=new FormData(event.currentTarget);
  try{
   const response=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:data.get("email"),password:data.get("password")})});
   const result=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(result.error||"No se pudo iniciar sesión.");
   window.location.reload();
  }catch(e){setError(e instanceof Error?e.message:"Error al ingresar.");setBusy(false);}
 }
 return <main className="grid min-h-screen place-items-center bg-[#0b2140] p-5 text-white">
  <section className="w-full max-w-md rounded-3xl border border-white/15 bg-[#142f52] p-8 shadow-2xl sm:p-10">
   <p className="text-xs font-black uppercase tracking-[.22em] text-[#efbc66]">Conferencia de Jóvenes · 2026</p>
   <h1 className="mt-4 text-4xl font-black">Ruleta bíblica</h1>
   <p className="mt-3 text-white/70">Acceso exclusivo para quien dirige el sorteo.</p>
   <form onSubmit={submit} className="mt-8 grid gap-4">
    <label className="grid gap-2 text-sm font-semibold">Correo del organizador<input type="email" name="email" autoComplete="username" required className="min-h-12 rounded-xl bg-white px-4 text-[#102a4a]"/></label>
    <label className="grid gap-2 text-sm font-semibold">Contraseña<input type="password" name="password" autoComplete="current-password" required className="min-h-12 rounded-xl bg-white px-4 text-[#102a4a]"/></label>
    {error&&<p role="alert" className="text-sm text-[#ffc8c8]">{error}</p>}
    <button disabled={busy} className="mt-2 min-h-14 rounded-xl bg-[#e8ab49] text-lg font-black text-[#102a4a] disabled:opacity-60">{busy?"Ingresando…":"Entrar a la ruleta"}</button>
   </form>
  </section>
 </main>;
}
