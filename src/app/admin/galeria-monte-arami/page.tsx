import {getSiteSettings,publicAssetUrl} from "@/lib/site-settings";
export const dynamic="force-dynamic";
export default async function GaleriaMonteArami({searchParams}:{searchParams?:{guardado?:string}}){
 const settings=await getSiteSettings();
 const entry=(settings.pageBanners as unknown as Record<string,{images?:string[]}>)[ "/monte-arami-gallery" ];
 const images=Array.isArray(entry?.images)?entry.images.filter(x=>typeof x==="string"&&x.startsWith("monte-arami-")):[];
 return <main className="p-5 sm:p-8 lg:p-10">
  <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-gold">Contenido del sitio</p>
  <h1 className="mt-2 text-3xl font-bold text-brand-forest">Fotografías de Monte Aramí</h1>
  <p className="mt-2 max-w-2xl text-sm text-brand-muted">Subí las fotografías originales del lugar. Se mostrarán automáticamente en la sección «Monte Aramí, Paraguarí» de la página principal. No uses enlaces temporales de Facebook.</p>
  {searchParams?.guardado&&<p role="status" className="mt-5 rounded-lg bg-green-50 p-4 text-sm text-green-800">Galería actualizada correctamente.</p>}
  <form action="/api/admin/galeria-monte-arami" method="post" encType="multipart/form-data" className="mt-7 rounded-xl border border-brand-border bg-white p-5 sm:p-7">
   <label htmlFor="images" className="block text-base font-bold text-brand-forest">Agregar fotografías</label>
   <p className="mt-1 text-xs text-brand-muted">JPG, PNG o WebP · hasta 8 MB por archivo · máximo 12 fotografías.</p>
   <input id="images" type="file" name="images" accept="image/jpeg,image/png,image/webp" multiple required className="mt-4 block w-full rounded-lg border border-brand-border p-3 text-sm"/>
   <button className="mt-4 rounded-lg bg-brand-forest px-6 py-3 font-semibold text-white">Subir fotografías</button>
  </form>
  <h2 className="mt-9 text-xl font-bold text-brand-forest">Fotografías publicadas ({images.length})</h2>
  {images.length===0?<p className="mt-4 rounded-lg border border-brand-border bg-white p-6 text-sm text-brand-muted">No hay fotografías cargadas. La galería pública permanecerá oculta hasta que subas imágenes.</p>:<div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{images.map(path=><article key={path} className="overflow-hidden rounded-xl border border-brand-border bg-white"><img src={publicAssetUrl(path)} alt="Monte Aramí" className="aspect-[4/3] w-full object-cover"/><form action="/api/admin/galeria-monte-arami" method="post" className="p-3"><input type="hidden" name="remove" value={path}/><button className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700">Eliminar fotografía</button></form></article>)}</div>}
 </main>;
}
