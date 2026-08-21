import Link from "next/link";
import { revalidatePath } from "next/cache";
import { assignMemberToTeam, createTeam, listTeamMembers, listTeams, type TeamMember } from "@/lib/camp-management";
import { getSignedSelfieUrl } from "@/lib/registration-db";

export const dynamic="force-dynamic";
const field="min-h-11 rounded-xl border border-brand-border bg-white px-3 text-sm text-brand-forest placeholder:text-brand-muted/70 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20";

type View="all"|"unassigned"|"general";

async function createTeamAction(formData:FormData){"use server";const name=String(formData.get("name")||"").trim();if(!name)return;await createTeam({name,colorName:String(formData.get("colorName")||name).trim(),colorHex:String(formData.get("colorHex")||"#0E3B31")});revalidatePath("/admin/equipos");}

async function assignTeamAction(formData:FormData){"use server";const registrationId=String(formData.get("registrationId")||"");const teamId=String(formData.get("teamId")||"")||null;if(!registrationId)return;await assignMemberToTeam(registrationId,teamId);revalidatePath("/admin/equipos");}

function formatDate(value?:string|null){if(!value)return "";const date=new Date(value);if(Number.isNaN(date.getTime()))return "";return new Intl.DateTimeFormat("es-PY",{day:"2-digit",month:"2-digit",year:"numeric"}).format(date);}

function Tab({href,active,children}:{href:string;active:boolean;children:React.ReactNode}){return <Link href={href} className={`border-b-2 px-1 py-4 text-sm font-semibold transition ${active?"border-brand-forest text-brand-forest":"border-transparent text-brand-muted hover:text-brand-forest"}`}>{children}</Link>}

async function MemberAvatar({member}:{member:TeamMember}){const url=member.selfie_path?await getSignedSelfieUrl(member.selfie_path,900).catch(()=>""):"";const initials=`${member.nombre?.[0]||""}${member.apellido?.[0]||""}`.toUpperCase();return <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-brand-border bg-brand-cream">{url?<img src={url} alt={`${member.nombre} ${member.apellido}`} className="h-full w-full object-cover"/>:<div className="flex h-full w-full items-center justify-center text-sm font-bold text-brand-forest">{initials||"?"}</div>}</div>}

function TeamDot({color}:{color:string}){return <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/10" style={{backgroundColor:color}}/>}

export default async function EquiposPage({searchParams}:{searchParams?:{view?:string}}){
  const [teams,members]=await Promise.all([listTeams().catch(()=>[]),listTeamMembers().catch(()=>[])]);
  const rawView=searchParams?.view;
  const view:View=rawView==="unassigned"||rawView==="general"?rawView:"all";
  const assigned=members.filter(m=>m.team_id).length;
  const unassigned=members.filter(m=>!m.team_id);
  const visibleMembers=view==="unassigned"?unassigned:members;

  return <main className="p-5 sm:p-8 lg:p-10">
    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-gold">Gestión</p><h1 className="mt-2 text-4xl font-semibold text-brand-forest">Equipos</h1><p className="mt-2 text-brand-muted">Asigná a cada inscripto a un equipo. Podés cambiarlo en cualquier momento.</p></div>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="rounded-xl border border-brand-border bg-white px-4 py-2 text-brand-muted">Sin equipo <strong className="ml-2 text-brand-forest">{unassigned.length}</strong></span>
        <span className="rounded-xl border border-brand-border bg-white px-4 py-2 text-brand-muted">Equipos <strong className="ml-2 text-brand-forest">{teams.length}</strong></span>
        <span className="rounded-xl border border-brand-border bg-white px-4 py-2 text-brand-muted">Asignados <strong className="ml-2 text-brand-forest">{assigned}</strong></span>
      </div>
    </div>

    <section className="mt-8 overflow-hidden rounded-2xl border border-brand-border bg-white">
      <nav className="flex gap-7 overflow-x-auto border-b border-brand-border px-5 sm:px-6">
        <Tab href="/admin/equipos?view=all" active={view==="all"}>Todos ({members.length})</Tab>
        <Tab href="/admin/equipos?view=unassigned" active={view==="unassigned"}>Sin equipo ({unassigned.length})</Tab>
        <Tab href="/admin/equipos?view=general" active={view==="general"}>Equipo General</Tab>
      </nav>

      {view!=="general"?<div>
        <div className="hidden grid-cols-[1fr_90px_310px] gap-4 border-b border-brand-border bg-brand-cream/35 px-5 py-3 text-xs font-semibold uppercase tracking-[.12em] text-brand-muted md:grid"><span>Inscripto</span><span>Edad</span><span>Equipo asignado</span></div>
        <div className="divide-y divide-brand-border">
          {visibleMembers.map(member=>{const currentTeam=teams.find(team=>team.id===member.team_id);return <div key={member.id} className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_90px_310px] md:items-center">
            <div className="flex items-center gap-3"><MemberAvatar member={member}/><div><p className="font-semibold text-brand-forest">{member.nombre} {member.apellido}</p><p className="mt-0.5 text-xs text-brand-muted">{member.cedula?`CI ${member.cedula}`:"Sin cédula"}{member.created_at?` · Inscripto ${formatDate(member.created_at)}`:""}</p></div></div>
            <p className="text-sm font-medium text-brand-forest">{member.edad??"—"}{member.edad?" años":""}</p>
            <form action={assignTeamAction} className="flex gap-2"><input type="hidden" name="registrationId" value={member.id}/><label className="relative min-w-0 flex-1"><select name="teamId" defaultValue={member.team_id||""} className={`${field} w-full pr-8`}><option value="">Sin equipo</option>{teams.map(team=><option key={team.id} value={team.id}>{team.name}</option>)}</select>{currentTeam?<span className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 sm:block"><TeamDot color={currentTeam.color_hex}/></span>:null}</label><button className="rounded-xl border border-brand-border bg-white px-4 text-sm font-semibold text-brand-forest hover:bg-brand-cream">Guardar</button></form>
          </div>})}
          {!visibleMembers.length?<div className="p-8 text-center text-sm text-brand-muted">No hay inscriptos en esta vista.</div>:null}
        </div>
      </div>:<div className="p-5 sm:p-6">
        <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-gold">Equipo General</p><h2 className="mt-1 text-2xl font-semibold text-brand-forest">Distribución por colores</h2><p className="mt-1 text-sm text-brand-muted">Acá ves solamente los equipos y sus integrantes.</p></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {teams.map(team=>{const teamMembers=members.filter(member=>member.team_id===team.id);return <section key={team.id} className="min-h-[320px] rounded-2xl border border-brand-border bg-brand-warmWhite p-5">
            <div className="flex flex-col items-center text-center"><div className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white shadow-sm" style={{backgroundColor:team.color_hex}}>{teamMembers.length}</div><h3 className="mt-3 text-lg font-semibold text-brand-forest">{team.name}</h3><p className="text-xs text-brand-muted">{teamMembers.length===1?"1 integrante":`${teamMembers.length} integrantes`}</p></div>
            <div className="mt-5 divide-y divide-brand-border rounded-xl border border-brand-border bg-white">
              {teamMembers.map(member=><div key={member.id} className="flex items-center gap-3 px-3 py-3"><MemberAvatar member={member}/><div className="min-w-0"><p className="truncate text-sm font-semibold text-brand-forest">{member.nombre} {member.apellido}</p><p className="text-xs text-brand-muted">{member.edad?`${member.edad} años`:"Edad sin definir"}</p></div></div>)}
              {!teamMembers.length?<div className="px-3 py-8 text-center text-sm text-brand-muted">Sin integrantes</div>:null}
            </div>
          </section>})}
        </div>
        {!teams.length?<div className="rounded-xl border border-brand-border bg-brand-cream p-6 text-sm text-brand-muted">Todavía no hay equipos creados.</div>:null}
      </div>}
    </section>

    <details className="mt-6 rounded-2xl border border-brand-border bg-white"><summary className="cursor-pointer list-none p-5 font-semibold text-brand-forest">+ Crear un equipo nuevo</summary><form action={createTeamAction} className="grid gap-4 border-t border-brand-border p-5 md:grid-cols-3"><label className="grid gap-2 text-sm font-semibold text-brand-forest">Nombre<input name="name" required placeholder="Ej. Violeta" className={field}/></label><label className="grid gap-2 text-sm font-semibold text-brand-forest">Nombre del color<input name="colorName" placeholder="Violeta" className={field}/></label><label className="grid gap-2 text-sm font-semibold text-brand-forest">Color<input name="colorHex" type="color" defaultValue="#0E3B31" className="h-11 w-full rounded-xl border border-brand-border bg-white p-1"/></label><button className="min-h-11 rounded-xl bg-brand-forest px-5 font-semibold text-white md:col-span-3">Crear equipo</button></form></details>
  </main>;
}
