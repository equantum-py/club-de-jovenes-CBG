"use client";
import Link from "next/link";
import {useCallback,useEffect,useState} from "react";
import type {ConferenceParticipant} from "@/lib/conferencia-ruleta";

export default function ConferenceRegistrations(){
 const [people,setPeople]=useState<ConferenceParticipant[]>([]);
 const [loading,setLoading]=useState(true);
 const [deleting,setDeleting]=useState<string|null>(null);
 const [error,setError]=useState("");
 const [notice,setNotice]=useState("");
 const refresh=useCallback(async()=>{
  try{const response=await fetch("/api/admin/conferencia",{cache:"no-store"});if(!response.ok)throw new Error("No se pudieron cargar los registros.");
   const data=await response.json();setPeople(data.participantes??[]);setError("");
  }catch(e){setError(e instanceof Error?e.message:"Error de conexión.");}
  finally{setLoading(false);}
 },[]);
 useEffect(()=>{void refresh();const timer=window.setInterval(()=>void refresh(),5000);return()=>clearInterval(timer);},[refresh]);
 async function remove(p:ConferenceParticipant){
  if(deleting||!window.confirm(`¿Eliminar definitivamente a ${p.nombre} ${p.apellido} de la ruleta?`))return;
  setDeleting(p.id);setNotice("");setError("");
  try{const response=await fetch("/api/admin/conferencia",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:p.id})});
   const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.error||"No se pudo eliminar.");
   setPeople(previous=>previous.filter(item=>item.id!==p.id));setNotice("Registro eliminado correctamente.");
   await refresh();
  }catch(e){setError(e instanceof Error?e.message:"No se pudo eliminar.");}
  finally{setDeleting(null);}
 }
 const available=people.filter(p=>!p.sorteado).length;
 return <main className="min-h-screen bg-[#f6f7f9] p-5 text-[#173452] sm:p-8">
  <div className="mx-auto max-w-6xl">
   <div className="flex flex-wrap items-start justify-between gap-4">
    <div><p className="text-xs font-bold uppercase tracking-widest text-[#9a6d21]">Conferencia de Jóvenes · 2026</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Registros de la ruleta</h1><p className="mt-2 text-[#60758d]">Administrá los participantes sin salir del panel.</p></div>
    <div className="flex flex-wrap gap-2"><button onClick={()=>void refresh()} className="rounded-xl border border-[#ccd9e7] bg-white px-4 py-3 text-sm font-bold">Actualizar</button><Link href="/conferencia/ruleta" target="_blank" className="rounded-xl bg-[#194b83] px-4 py-3 text-sm font-bold text-white">Abrir ruleta ↗</Link></div>
   </div>
   <div className="mt-7 grid gap-3 sm:grid-cols-3">
    {[[people.length,"Registrados"],[available,"Disponibles"],[people.length-available,"Ya elegidos"]].map(([value,label])=><div key={label} className="rounded-2xl border border-[#dce5ef] bg-white p-5"><strong className="block text-3xl">{value}</strong><span className="text-sm text-[#637a91]">{label}</span></div>)}
   </div>
   <section className="mt-6 overflow-hidden rounded-2xl border border-[#dce5ef] bg-white">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e4ebf3] p-5"><h2 className="text-lg font-black">Participantes</h2><span className="text-xs text-[#6a8098]">Actualización automática cada 5 segundos</span></div>
    {error&&<p role="alert" className="m-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    {notice&&<p role="status" className="m-4 rounded-xl bg-green-50 p-3 text-sm text-green-800">{notice}</p>}
    <div className="overflow-x-auto"><table className="w-full min-w-[580px] text-left text-sm">
     <thead className="bg-[#f0f5fb] text-[#506780]"><tr><th className="px-5 py-3">Nombre y apellido</th><th className="px-5 py-3">Iglesia</th><th className="px-5 py-3">Estado</th><th className="px-5 py-3 text-right">Acción</th></tr></thead>
     <tbody>{people.map(p=><tr key={p.id} className="border-t border-[#e8eef5]"><td className="px-5 py-4 font-bold">{p.nombre} {p.apellido}</td><td className="px-5 py-4">{p.iglesia}</td><td className="px-5 py-4">{p.sorteado?"Ya elegido":"Disponible"}</td><td className="px-5 py-4 text-right"><button disabled={!!deleting} onClick={()=>void remove(p)} className="rounded-lg border border-red-200 px-3 py-2 font-bold text-red-700 hover:bg-red-50 disabled:opacity-40">{deleting===p.id?"Eliminando…":"Eliminar"}</button></td></tr>)}</tbody>
    </table></div>
    {!loading&&!people.length&&<p className="p-8 text-center text-[#6a8098]">Todavía no hay registros.</p>}
    {loading&&<p className="p-8 text-center text-[#6a8098]">Cargando registros…</p>}
   </section>
  </div>
 </main>;
}
