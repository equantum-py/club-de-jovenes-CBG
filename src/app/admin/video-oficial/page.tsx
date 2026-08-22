import { getCampVideoSettings, youtubeVideoId } from "@/lib/camp-video-settings";

export const dynamic = "force-dynamic";

export default async function VideoOficialAdmin({ searchParams }: { searchParams?: { guardado?: string } }) {
  const settings = await getCampVideoSettings();
  const videoId = youtubeVideoId(settings.youtubeUrl);
  const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-gold">Contenido del sitio</p>
      <h1 className="mt-2 text-4xl font-semibold text-brand-forest">Video oficial</h1>
      <p className="mt-2 max-w-3xl text-brand-muted">
        Administrá el video que aparece en la sección “Así se vive Gracia Camp”. Podés cambiar el enlace de YouTube y los textos sin tocar código.
      </p>

      {searchParams?.guardado ? (
        <p className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-800">Video oficial actualizado correctamente.</p>
      ) : null}

      <form action="/api/admin/video-oficial" method="post" className="mt-8 space-y-6">
        <section className="rounded-2xl border border-brand-border bg-white p-6">
          <label className="flex items-center justify-between gap-4 rounded-xl border border-brand-border bg-brand-cream/40 px-4 py-4">
            <span>
              <b className="block text-brand-forest">Mostrar sección</b>
              <small className="mt-1 block text-brand-muted">Podés ocultarla temporalmente sin borrar la configuración.</small>
            </span>
            <input type="checkbox" name="enabled" defaultChecked={settings.enabled} className="h-5 w-5 accent-[#123f31]" />
          </label>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Etiqueta superior</span>
              <input name="eyebrow" defaultValue={settings.eyebrow} className="min-h-12 w-full rounded-xl border border-brand-border px-4" />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Título</span>
              <input name="title" defaultValue={settings.title} className="min-h-12 w-full rounded-xl border border-brand-border px-4" />
            </label>
            <label className="md:col-span-2 block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Descripción</span>
              <textarea name="description" defaultValue={settings.description} rows={3} className="w-full rounded-xl border border-brand-border p-4" />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-brand-border bg-white p-6">
          <h2 className="text-2xl font-semibold text-brand-forest">Video de YouTube</h2>
          <p className="mt-1 text-sm text-brand-muted">Pegá el enlace normal de YouTube, youtu.be, Shorts o Live. La miniatura se actualiza automáticamente.</p>

          <label className="mt-5 block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Enlace del video</span>
            <input name="youtube_url" type="url" required defaultValue={settings.youtubeUrl} placeholder="https://www.youtube.com/watch?v=..." className="min-h-12 w-full rounded-xl border border-brand-border px-4" />
          </label>

          <div className="mt-6 overflow-hidden rounded-2xl border border-brand-border bg-brand-forestDark">
            {thumbnail ? (
              <div className="grid lg:grid-cols-[.42fr_.58fr]">
                <div className="flex flex-col justify-center p-6 text-white sm:p-8">
                  <p className="text-sm font-medium tracking-[.18em] text-brand-gold">{settings.eyebrow}</p>
                  <h3 className="mt-3 text-3xl font-semibold">{settings.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/65">{settings.description}</p>
                </div>
                <img src={thumbnail} alt="Miniatura actual del video oficial" className="aspect-video h-full w-full object-cover opacity-80" />
              </div>
            ) : (
              <div className="p-8 text-sm text-white/60">El enlace actual no permite generar una vista previa.</div>
            )}
          </div>
        </section>

        <div className="flex justify-end">
          <button className="rounded-xl bg-brand-gold px-8 py-4 font-semibold text-brand-forest shadow-sm">Guardar video oficial</button>
        </div>
      </form>
    </main>
  );
}
