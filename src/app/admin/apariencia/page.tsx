import { getSiteSettings, publicAssetUrl } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

const Toggle = ({ name, label, checked }: { name: string; label: string; checked: boolean }) => (
  <label className="flex items-center justify-between gap-4 rounded-xl border border-brand-border bg-white px-4 py-3">
    <span className="text-sm font-medium">{label}</span>
    <input type="checkbox" name={name} defaultChecked={checked} className="h-5 w-5 accent-[#123f31]" />
  </label>
);

const Input = ({ name, label, value, type = "text", helper }: { name: string; label: string; value: string | number; type?: string; helper?: string }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">{label}</span>
    <input name={name} type={type} defaultValue={value} className="min-h-12 w-full rounded-xl border border-brand-border bg-white px-4" />
    {helper ? <span className="mt-2 block text-xs leading-5 text-brand-muted">{helper}</span> : null}
  </label>
);

export default async function Apariencia({ searchParams }: { searchParams?: { guardado?: string } }) {
  const s = await getSiteSettings();
  const logoUrl = s.logoPath ? publicAssetUrl(s.logoPath) : "";

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Sitio web</p>
      <h1 className="mt-2 text-4xl font-semibold text-brand-forest">Apariencia y Header</h1>
      <p className="mt-2 max-w-3xl text-brand-muted">Configurá cómo se ve la cabecera en computadora, tablet y celular. Los cambios se aplican sin tocar código.</p>
      {searchParams?.guardado ? <p className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-800">Cambios guardados correctamente.</p> : null}

      <form action="/api/admin/apariencia" method="post" encType="multipart/form-data" className="mt-8 space-y-7">
        <section className="rounded-2xl border border-brand-border bg-white p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-brand-forest">Identidad del Header</h2>
              <p className="mt-1 text-sm text-brand-muted">Logo, nombre y lema que aparecen arriba de la página.</p>
            </div>
            <span className="w-fit rounded-full bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-forest">Recomendado: logo horizontal</span>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input name="site_name" label="Nombre (opcional)" value={s.siteName} helper="Podés dejarlo vacío si el logo ya contiene el nombre." />
            <Input name="site_tagline" label="Lema (opcional)" value={s.siteTagline} helper="Ejemplo: Crecer · Compartir · Servir. También puede quedar vacío." />
            <Toggle name="show_logo" label="Mostrar logo" checked={s.showLogo} />
            <Toggle name="show_site_text" label="Mostrar nombre y lema" checked={s.showSiteText} />
          </div>

          <div className="mt-7 rounded-2xl border border-brand-border bg-brand-cream/60 p-5">
            <h3 className="font-semibold text-brand-forest">Archivo del logo</h3>
            <p className="mt-2 text-sm leading-6 text-brand-muted"><strong>Formato ideal:</strong> PNG o WebP con fondo transparente. <strong>Tamaño recomendado:</strong> 900 × 300 px o 600 × 200 px (relación 3:1). Evitá imágenes cuadradas si el logo es horizontal.</p>
            <p className="mt-1 text-sm leading-6 text-brand-muted">Peso recomendado: menos de 500 KB. El sistema acepta hasta 10 MB.</p>
            <label className="mt-4 block text-sm font-semibold">Cambiar logo
              <input name="logo" type="file" accept="image/jpeg,image/png,image/webp" className="mt-2 block w-full rounded-xl border border-brand-border bg-white p-3" />
            </label>

            {logoUrl ? (
              <div className="mt-5 rounded-xl border border-brand-border bg-white p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-muted">Vista previa del logo actual</p>
                <img src={logoUrl} alt="Logo actual" className="max-h-24 max-w-[320px] object-contain" />
              </div>
            ) : null}
          </div>

          <div className="mt-7">
            <h3 className="font-semibold text-brand-forest">Ancho del logo por dispositivo</h3>
            <p className="mt-1 text-sm text-brand-muted">Estas medidas controlan el <strong>ancho</strong>. La altura se ajusta sola para conservar la proporción del logo.</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Input name="logo_size_mobile" label="Móvil · ancho (px)" value={s.logoSizeMobile} type="number" helper="Sugerido: 90–140 px" />
              <Input name="logo_size_tablet" label="Tablet · ancho (px)" value={s.logoSizeTablet} type="number" helper="Sugerido: 110–160 px" />
              <Input name="logo_size_desktop" label="Desktop · ancho (px)" value={s.logoSizeDesktop} type="number" helper="Sugerido: 130–190 px" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-brand-border bg-white p-6">
          <h2 className="text-xl font-semibold text-brand-forest">Navegación</h2>
          <p className="mt-1 text-sm text-brand-muted">Elegí qué accesos querés mostrar. En celular se agrupan automáticamente dentro del menú.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[["nav_inicio", "Inicio", "inicio"], ["nav_nosotros", "Nosotros", "nosotros"], ["nav_actividades", "Actividades", "actividades"], ["nav_eventos", "Eventos", "eventos"], ["nav_galeria", "Galería", "galeria"], ["nav_campamento", "Campamento", "campamento"], ["nav_contacto", "Contacto", "contacto"]].map(([name, label, key]) => (
              <Toggle key={name} name={name} label={`Mostrar ${label}`} checked={s.nav[key]} />
            ))}
          </div>
          <div className="mt-4"><Toggle name="sticky_header" label="Mantener el Header fijo al hacer scroll" checked={s.stickyHeader} /></div>
        </section>

        <section className="rounded-2xl border border-brand-border bg-white p-6">
          <h2 className="text-xl font-semibold text-brand-forest">Cuenta regresiva y botón</h2>
          <p className="mt-1 text-sm text-brand-muted">En desktop se muestran a la derecha. En mobile aparecen dentro del menú para no ocupar espacio innecesario.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Toggle name="show_countdown" label="Mostrar cuenta regresiva" checked={s.showCountdown} />
            <Toggle name="show_cta" label="Mostrar botón principal" checked={s.showCta} />
            <Input name="countdown_label" label="Texto de la cuenta regresiva" value={s.countdownLabel} />
            <Input name="cta_text" label="Texto del botón" value={s.ctaText} />
            <Input name="cta_href" label="Enlace del botón" value={s.ctaHref} helper="Ejemplo: /registro" />
          </div>
        </section>

        <section className="rounded-2xl border border-brand-border bg-white p-6">
          <h2 className="text-xl font-semibold text-brand-forest">Banner debajo del Header</h2>
          <p className="mt-1 text-sm text-brand-muted">Usá una creatividad diferente para desktop y mobile para que el texto siempre se lea bien.</p>
          <div className="mt-5"><Toggle name="show_banner" label="Mostrar banner en la página" checked={s.showBanner} /></div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="rounded-2xl border border-brand-border p-4 text-sm font-semibold">Banner desktop
              <span className="mt-1 block text-xs font-normal leading-5 text-brand-muted">Recomendado: 1920 × 600 px. También sirve 1920 × 500 px.</span>
              <input name="banner_desktop" type="file" accept="image/jpeg,image/png,image/webp" className="mt-3 block w-full rounded-xl border border-brand-border p-3" />
              {s.bannerDesktopPath ? <img src={publicAssetUrl(s.bannerDesktopPath)} alt="Banner desktop" className="mt-3 max-h-44 w-full rounded-lg object-cover" /> : null}
            </label>

            <label className="rounded-2xl border border-brand-border p-4 text-sm font-semibold">Banner mobile
              <span className="mt-1 block text-xs font-normal leading-5 text-brand-muted">Recomendado: 750 × 900 px o 750 × 750 px. Evitá reutilizar el banner horizontal de desktop.</span>
              <input name="banner_mobile" type="file" accept="image/jpeg,image/png,image/webp" className="mt-3 block w-full rounded-xl border border-brand-border p-3" />
              {s.bannerMobilePath ? <img src={publicAssetUrl(s.bannerMobilePath)} alt="Banner móvil" className="mt-3 max-h-44 w-full rounded-lg object-cover" /> : null}
            </label>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input name="banner_href" label="Enlace al tocar el banner" value={s.bannerHref} helper="Opcional. Ejemplo: /registro" />
            <Input name="banner_alt" label="Descripción SEO / accesibilidad" value={s.bannerAlt} />
            <Input name="banner_max_height_desktop" label="Alto máximo desktop (px)" value={s.bannerMaxHeightDesktop} type="number" helper="Sugerido: 420–600 px" />
            <Input name="banner_max_height_mobile" label="Alto máximo mobile (px)" value={s.bannerMaxHeightMobile} type="number" helper="Sugerido: 420–700 px" />
          </div>
        </section>

        <div className="sticky bottom-5 flex justify-end">
          <button className="rounded-xl bg-brand-forest px-7 py-4 font-semibold text-white shadow-lg">Guardar cambios</button>
        </div>
      </form>
    </main>
  );
}
