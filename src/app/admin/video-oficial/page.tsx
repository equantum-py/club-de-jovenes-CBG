import VideoOfficialForm from "@/components/admin/VideoOfficialForm";
import { campVideoUrl, getCampVideoSettings } from "@/lib/camp-video-settings";

export const dynamic = "force-dynamic";

export default async function VideoOficialAdmin({ searchParams }: { searchParams?: { guardado?: string } }) {
  const settings = await getCampVideoSettings();
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-gold">Contenido del sitio</p>
      <h1 className="mt-2 text-4xl font-semibold text-brand-forest">Video oficial</h1>
      <p className="mt-2 max-w-3xl text-brand-muted">
        Administrá el video que aparece en la sección “Así se vive Gracia Camp”. Podés cargar el archivo directamente desde tu computadora y editar los textos sin tocar código.
      </p>
      <VideoOfficialForm
        enabled={settings.enabled}
        eyebrow={settings.eyebrow}
        title={settings.title}
        description={settings.description}
        sourceType={settings.sourceType}
        youtubeUrl={settings.youtubeUrl}
        videoUrl={campVideoUrl(settings.videoPath)}
        saved={searchParams?.guardado === "1"}
      />
    </main>
  );
}
