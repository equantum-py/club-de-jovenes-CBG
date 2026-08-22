"use client";

import { FormEvent, useState } from "react";

type Props = {
  enabled: boolean;
  eyebrow: string;
  title: string;
  description: string;
  sourceType: "youtube" | "upload";
  youtubeUrl: string;
  videoUrl: string;
  saved?: boolean;
};

export default function VideoOfficialForm(props: Props) {
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("video_file");

    try {
      setStatus("");
      setUploading(true);

      if (file instanceof File && file.size > 0) {
        if (!["video/mp4", "video/webm"].includes(file.type)) throw new Error("Usá un video MP4 o WebM.");
        if (file.size > 50 * 1024 * 1024) throw new Error("El video no puede superar 50 MB.");

        const signResponse = await fetch("/api/admin/video-oficial/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: file.name, mimeType: file.type }),
        });
        const signData = await signResponse.json();
        if (!signResponse.ok) throw new Error(signData?.error || "No se pudo preparar la carga.");

        const uploadBody = new FormData();
        uploadBody.append("cacheControl", "3600");
        uploadBody.append("", file);
        const uploadResponse = await fetch(signData.signedUrl, {
          method: "PUT",
          body: uploadBody,
        });
        if (!uploadResponse.ok) throw new Error("No se pudo cargar el video a Supabase.");

        formData.set("video_path", signData.path);
        formData.set("source_type", "upload");
      }

      formData.delete("video_file");
      const saveResponse = await fetch("/api/admin/video-oficial", { method: "POST", body: formData, redirect: "follow" });
      if (!saveResponse.ok) throw new Error("No se pudo guardar la configuración.");
      window.location.href = "/admin/video-oficial?guardado=1";
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Ocurrió un error.");
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {props.saved ? <p className="rounded-xl bg-green-50 p-4 text-sm text-green-800">Video oficial actualizado correctamente.</p> : null}
      {status ? <p className="rounded-xl bg-red-50 p-4 text-sm text-red-800">{status}</p> : null}

      <section className="rounded-2xl border border-brand-border bg-white p-6">
        <label className="flex items-center justify-between gap-4 rounded-xl border border-brand-border bg-brand-cream/40 px-4 py-4">
          <span><b className="block text-brand-forest">Mostrar sección</b><small className="mt-1 block text-brand-muted">Podés ocultarla temporalmente sin borrar la configuración.</small></span>
          <input type="checkbox" name="enabled" defaultChecked={props.enabled} className="h-5 w-5 accent-[#123f31]" />
        </label>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Etiqueta superior</span><input name="eyebrow" defaultValue={props.eyebrow} className="min-h-12 w-full rounded-xl border border-brand-border px-4" /></label>
          <label className="block"><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Título</span><input name="title" defaultValue={props.title} className="min-h-12 w-full rounded-xl border border-brand-border px-4" /></label>
          <label className="md:col-span-2 block"><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Descripción</span><textarea name="description" defaultValue={props.description} rows={3} className="w-full rounded-xl border border-brand-border p-4" /></label>
        </div>
      </section>

      <section className="rounded-2xl border border-brand-border bg-white p-6">
        <h2 className="text-2xl font-semibold text-brand-forest">Cargar video oficial</h2>
        <p className="mt-1 text-sm text-brand-muted">Subí el archivo directamente desde tu computadora. Recomendado: MP4, máximo 50 MB.</p>
        <label className="mt-5 block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Archivo de video</span>
          <input name="video_file" type="file" accept="video/mp4,video/webm" className="block w-full rounded-xl border border-brand-border bg-white p-3" />
        </label>
        {props.videoUrl && props.sourceType === "upload" ? (
          <div className="mt-5 overflow-hidden rounded-2xl border border-brand-border bg-black">
            <video src={props.videoUrl} controls preload="metadata" className="aspect-video w-full object-cover" />
          </div>
        ) : null}
      </section>

      <details className="rounded-2xl border border-brand-border bg-white p-6">
        <summary className="cursor-pointer text-lg font-semibold text-brand-forest">Alternativa: usar enlace de YouTube</summary>
        <p className="mt-2 text-sm text-brand-muted">Solo usá esta opción si no querés cargar un archivo.</p>
        <label className="mt-4 block"><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-brand-muted">Enlace de YouTube</span><input name="youtube_url" type="url" defaultValue={props.youtubeUrl} className="min-h-12 w-full rounded-xl border border-brand-border px-4" /></label>
        <label className="mt-4 flex items-center gap-2 text-sm"><input type="radio" name="source_type" value="youtube" defaultChecked={props.sourceType === "youtube"} /> Usar YouTube</label>
        <input type="hidden" name="video_path" value="" />
      </details>

      <div className="flex justify-end"><button disabled={uploading} className="rounded-xl bg-brand-gold px-8 py-4 font-semibold text-brand-forest shadow-sm disabled:opacity-60">{uploading ? "Cargando video..." : "Guardar video oficial"}</button></div>
    </form>
  );
}
