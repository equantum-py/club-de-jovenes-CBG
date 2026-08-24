import HighQualityImageInput from "@/components/admin/HighQualityImageInput";
import {getMerchSettings,merchImageUrl}from '@/lib/merch-settings';

export const dynamic='force-dynamic';

const Input=({name,label,value,type='text'}:{name:string;label:string;value:string|number;type?:string})=><label className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">{label}</span><input name={name} type={type} defaultValue={value} className="min-h-12 w-full rounded-xl border border-brand-border bg-white px-4 text-brand-forest placeholder:text-brand-muted/60"/></label>;
const Toggle=({name,label,checked}:{name:string;label:string;checked:boolean})=><label className="flex items-center justify-between gap-4 rounded-xl border border-brand-border bg-white px-4 py-3"><span className="text-sm font-semibold text-brand-forest">{label}</span><input type="checkbox" name={name} defaultChecked={checked} className="h-5 w-5 accent-[#123f31]"/></label>;
const textareaClass="w-full rounded-xl border border-brand-border bg-white p-4 text-brand-forest placeholder:text-brand-muted/60";

export default async function MerchAdmin({searchParams}:{searchParams?:{guardado?:string}}){
  const s=await getMerchSettings();
  const desktop=merchImageUrl(s.bannerDesktopPath,'');
  const mobile=merchImageUrl(s.bannerMobilePath,'');
  return <main className="p-5 sm:p-8 lg:p-10">
    <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-gold">Gracia Camp 2026</p>
    <h1 className="mt-2 text-4xl font-semibold text-brand-forest">Merch oficial</h1>
    <p className="mt-2 max-w-3xl text-brand-muted">Administrá el banner promocional y, cuando quieras, activá también la sección completa de remera, gorra y combo.</p>
    {searchParams?.guardado?<p className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-800">Cambios guardados correctamente.</p>:null}

    <form action="/api/admin/merch" method="post" encType="multipart/form-data" className="mt-8 space-y-6">
      <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-gold">Banner promocional</p><h2 className="mt-1 text-2xl font-semibold text-brand-forest">Banner de Merch</h2><p className="mt-1 text-sm text-brand-muted">Podés mostrar solo este banner sin mostrar las tarjetas de productos.</p></div>
          <Toggle name="banner_enabled" label="Mostrar banner" checked={s.bannerEnabled}/>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-border bg-brand-cream/50 p-4">
            <div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold text-brand-forest">Banner Desktop</h3><p className="mt-1 text-xs text-brand-muted">Recomendado: 1920 × 600 px · JPG, PNG o WebP.</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-muted">Desktop</span></div>
            <div className="mt-4 overflow-hidden rounded-xl border border-brand-border bg-white">{desktop?<img src={desktop} alt={s.bannerAlt} className="aspect-[16/5] w-full object-cover"/>:<div className="flex aspect-[16/5] items-center justify-center p-6 text-center text-sm text-brand-muted">Todavía no cargaste el banner para escritorio.</div>}</div>
            <HighQualityImageInput name="banner_desktop" minWidth={1920} minHeight={600} recommended="2560 × 800 px" className="mt-4 block w-full rounded-xl border border-brand-border bg-white p-3 text-sm text-brand-forest"/>
          </div>
          <div className="rounded-2xl border border-brand-border bg-brand-cream/50 p-4">
            <div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold text-brand-forest">Banner Mobile</h3><p className="mt-1 text-xs text-brand-muted">Recomendado: 1080 × 1080 px o 1080 × 1350 px.</p></div><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-muted">Mobile</span></div>
            <div className="mx-auto mt-4 max-w-sm overflow-hidden rounded-xl border border-brand-border bg-white">{mobile?<img src={mobile} alt={s.bannerAlt} className="aspect-square w-full object-cover"/>:<div className="flex aspect-square items-center justify-center p-6 text-center text-sm text-brand-muted">Todavía no cargaste el banner para celular.</div>}</div>
            <HighQualityImageInput name="banner_mobile" minWidth={1080} minHeight={1080} recommended="1080 × 1350 px" className="mt-4 block w-full rounded-xl border border-brand-border bg-white p-3 text-sm text-brand-forest"/>
          </div>
        </div>
        <div className="mt-5"><Input name="banner_alt" label="Descripción del banner" value={s.bannerAlt}/></div>
      </section>

      <details className="rounded-2xl border border-brand-border bg-white" open={s.sectionEnabled}>
        <summary className="cursor-pointer list-none p-5 sm:p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-brand-gold">Opcional</p><h2 className="mt-1 text-xl font-semibold text-brand-forest">Sección completa de productos</h2><p className="mt-1 text-sm text-brand-muted">Abrí este bloque solamente cuando quieras mostrar remera, gorra y combo en la página.</p></div><span className="text-sm font-semibold text-brand-forest">Editar</span></div></summary>
        <div className="border-t border-brand-border p-5 sm:p-6">
          <Toggle name="section_enabled" label="Mostrar sección completa" checked={s.sectionEnabled}/>
          <div className="mt-5 grid gap-4 md:grid-cols-2"><Input name="section_eyebrow" label="Etiqueta" value={s.sectionEyebrow}/><Input name="section_title" label="Título principal" value={s.sectionTitle}/><label className="md:col-span-2"><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Descripción</span><textarea name="section_description" defaultValue={s.sectionDescription} rows={3} className={textareaClass}/></label><Input name="whatsapp_number" label="WhatsApp para reservas" value={s.whatsappNumber}/></div>

          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            <section className="rounded-2xl border border-brand-border p-5"><div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold text-brand-forest">Remera oficial</h3><Toggle name="shirt_enabled" label="Mostrar" checked={s.shirtEnabled}/></div><div className="mt-5 grid gap-4"><Input name="shirt_name" label="Nombre" value={s.shirtName}/><Input name="shirt_price" label="Precio (Gs.)" value={s.shirtPrice} type="number"/><Input name="shirt_badge" label="Etiqueta / badge" value={s.shirtBadge}/><Input name="shirt_sizes" label="Talles separados por coma" value={s.shirtSizes.join(', ')}/><label><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Descripción</span><textarea name="shirt_description" defaultValue={s.shirtDescription} rows={3} className={textareaClass}/></label><label className="text-sm font-semibold text-brand-forest">Imagen de la remera<HighQualityImageInput name="shirt_image" minWidth={1200} minHeight={1200} recommended="1600 × 1600 px o superior" className="mt-2 block w-full rounded-xl border border-brand-border bg-white p-3"/></label><img src={merchImageUrl(s.shirtImagePath,'/campamento/remera-nueva.png')} alt="Remera actual" className="max-h-64 rounded-xl border border-brand-border object-contain"/></div></section>
            <section className="rounded-2xl border border-brand-border p-5"><div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold text-brand-forest">Gorra oficial</h3><Toggle name="cap_enabled" label="Mostrar" checked={s.capEnabled}/></div><div className="mt-5 grid gap-4"><Input name="cap_name" label="Nombre" value={s.capName}/><Input name="cap_price" label="Precio (Gs.)" value={s.capPrice} type="number"/><Input name="cap_badge" label="Etiqueta / badge" value={s.capBadge}/><label><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Descripción</span><textarea name="cap_description" defaultValue={s.capDescription} rows={3} className={textareaClass}/></label><label className="text-sm font-semibold text-brand-forest">Imagen de la gorra<HighQualityImageInput name="cap_image" minWidth={1200} minHeight={1200} recommended="1600 × 1600 px o superior" className="mt-2 block w-full rounded-xl border border-brand-border bg-white p-3"/></label>{s.capImagePath?<img src={merchImageUrl(s.capImagePath,'')} alt="Gorra actual" className="max-h-64 rounded-xl border border-brand-border object-contain"/>:null}</div></section>
          </div>

          <section className="mt-5 rounded-2xl bg-brand-forest p-5 text-white"><div className="flex items-center justify-between gap-3"><h3 className="text-lg font-semibold">Combo Gracia Camp</h3><label className="flex items-center gap-2 text-sm">Mostrar <input type="checkbox" name="combo_enabled" defaultChecked={s.comboEnabled}/></label></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Input name="combo_name" label="Nombre del combo" value={s.comboName}/><Input name="combo_price" label="Precio combo (Gs.)" value={s.comboPrice} type="number"/><Input name="combo_old_price" label="Precio anterior (Gs.)" value={s.comboOldPrice} type="number"/><label className="md:col-span-2"><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/60">Descripción</span><textarea name="combo_description" defaultValue={s.comboDescription} rows={3} className="w-full rounded-xl border border-white/20 bg-white p-4 text-brand-forest"/></label></div></section>
        </div>
      </details>

      <div className="flex justify-end"><button className="rounded-xl bg-brand-gold px-7 py-4 font-semibold text-brand-forest shadow-sm">Guardar cambios</button></div>
    </form>
  </main>;
}
