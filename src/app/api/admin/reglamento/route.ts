import{NextResponse}from'next/server';import{hasAdminSession}from'@/lib/admin-auth';import{createCampRule,deleteCampRule,moveCampRule,saveCampRulesSettings,toggleCampRule,updateCampRule}from'@/lib/camp-rules';
const t=(f:FormData,k:string)=>String(f.get(k)||'').trim();
export async function POST(req:Request){if(!hasAdminSession())return NextResponse.json({error:'No autorizado'},{status:401});try{const f=await req.formData();const action=t(f,'action');const id=Number(t(f,'id'));
if(action==='settings')await saveCampRulesSettings({title:t(f,'title'),subtitle:t(f,'subtitle'),pageEnabled:f.get('page_enabled')==='on',showInRegistration:f.get('show_in_registration')==='on'});
else if(action==='create')await createCampRule(t(f,'title'),t(f,'description'));
else if(action==='update'&&id)await updateCampRule(id,t(f,'title'),t(f,'description'));
else if(action==='toggle'&&id)await toggleCampRule(id,t(f,'is_active')==='true');
else if(action==='delete'&&id)await deleteCampRule(id);
else if(action==='move-up'&&id)await moveCampRule(id,'up');
else if(action==='move-down'&&id)await moveCampRule(id,'down');
else return NextResponse.json({error:'Acción inválida'},{status:400});
return NextResponse.redirect(new URL('/admin/reglamento?guardado=1',req.url),303)}catch(e){console.error(e);return NextResponse.json({error:'No se pudo actualizar el reglamento.'},{status:500})}}
