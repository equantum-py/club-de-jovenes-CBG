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
 return <main style={{fontFamily:"Inter, Arial, sans-serif"}} className="grid min-h-screen place-items-center bg-[#f8f6f1] p-5 text-[#09264b]">
  <section className="w-full max-w-md rounded-xl border border-[#e0ddd5] bg-white p-8 shadow-lg sm:p-10">
   <p className="text-xs font-black uppercase tracking-[.22em] text-[#9d7112]">Conferencia de Jóvenes · 2026</p>
   <h1 className="mt-4 text-4xl font-black">Ruleta bíblica</h1>
   <p className="mt-3 text-[#526176]">Acceso exclusivo para quien dirige el sorteo.</p>
   <form onSubmit={submit} className="mt-8 grid gap-4">
    <label className="grid gap-2 text-sm font-semibold">Correo del organizador<input type="email" name="email" autoComplete="username" required className="min-h-12 rounded-lg border border-[#cbd3dd] bg-white px-4 text-[#09264b]"/></label>
    <label className="grid gap-2 text-sm font-semibold">Contraseña<input type="password" name="password" autoComplete="current-password" required className="min-h-12 rounded-xl bg-white px-4 text-[#102a4a]"/></label>
    {error&&<p role="alert" className="text-sm text-red-700">{error}</p>}
    <button disabled={busy} className="mt-2 min-h-14 rounded-lg bg-[#c89b23] text-lg font-black text-[#102a4a] disabled:opacity-60">{busy?"Ingresando…":"Entrar a la ruleta"}</button>
   </form>
  </section>
 </main>;
}
