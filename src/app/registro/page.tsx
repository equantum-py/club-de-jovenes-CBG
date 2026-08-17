"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import Header from "@/components/Header";

type FormData = {
  nombre: string; apellido: string; edad: string; telefono: string; cedula: string;
  sexo: string; iglesia: string; esInvitado: string; invitadoPor: string;
  alergias: string; medicamentos: string; enfermedadBase: string;
  contactoEmergenciaNombre: string; contactoEmergenciaTelefono: string;
  observaciones: string; formaPago: string; nombrePadreMadre: string; telefonoPadreMadre: string;
};

const initialForm: FormData = {
  nombre: "", apellido: "", edad: "", telefono: "", cedula: "", sexo: "", iglesia: "",
  esInvitado: "", invitadoPor: "", alergias: "", medicamentos: "", enfermedadBase: "",
  contactoEmergenciaNombre: "", contactoEmergenciaTelefono: "", observaciones: "",
  formaPago: "", nombrePadreMadre: "", telefonoPadreMadre: "",
};

const DRAFT_KEY = "gracia-camp-registro-draft";

export default function RegistroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (saved) setFormData({ ...initialForm, ...JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(formData)); } catch {}
  }, [formData]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const esMenor = useMemo(() => formData.edad !== "" && Number(formData.edad) < 18, [formData.edad]);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setSubmitError("");
  }

  async function openCamera() {
    setCameraError("");
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Este navegador no permite usar la cámara dentro de la página. Probá con Chrome o Safari actualizado.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } },
        audio: false,
      });

      streamRef.current = stream;
      setCameraOpen(true);

      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => undefined);
        }
      });
    } catch {
      setCameraError("No pudimos abrir la cámara. Revisá el permiso de cámara del navegador e intentá nuevamente.");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOpen(false);
  }

  function takeSelfie() {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) {
      setCameraError("La cámara todavía está cargando. Esperá un segundo y volvé a intentar.");
      return;
    }

    const size = Math.min(video.videoWidth, video.videoHeight);
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 720;
    const context = canvas.getContext("2d");
    if (!context) return;

    const sx = (video.videoWidth - size) / 2;
    const sy = (video.videoHeight - size) / 2;
    context.translate(720, 0);
    context.scale(-1, 1);
    context.drawImage(video, sx, sy, size, size, 0, 0, 720, 720);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `selfie-${Date.now()}.jpg`, { type: "image/jpeg" });
      setSelfie(file);
      setPreview(canvas.toDataURL("image/jpeg", 0.88));
      setSubmitError("");
      stopCamera();
    }, "image/jpeg", 0.88);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selfie) {
      setSubmitError("Necesitamos que te saques una selfie para completar la inscripción.");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => body.append(key, value));
      body.append("selfie", selfie);

      const response = await fetch("/api/registro", { method: "POST", body });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitError(result.error ?? "No se pudo guardar tu inscripción.");
        return;
      }

      try { sessionStorage.removeItem(DRAFT_KEY); } catch {}
      router.push("/reglamento");
    } catch {
      setSubmitError("No se pudo conectar con el servidor. Intentá nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
      <Header />

      <section className="bg-brand-cream py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <p className="text-sm font-medium tracking-[.18em] text-brand-gold">Club de Jóvenes CBG</p>
          <h1 className="mt-4 text-4xl font-semibold text-brand-forest sm:text-6xl">Registro Campamento 2026</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-muted">Completá tus datos y sacate una selfie reciente para que el equipo pueda identificarte durante el campamento.</p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-10 px-5 py-12">
        <Section number="01" title="Datos personales" />
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
          <Field label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
          <Field label="Edad" name="edad" value={formData.edad} onChange={handleChange} type="number" />
          <Field label="Número de teléfono" name="telefono" value={formData.telefono} onChange={handleChange} />
          <Field label="Cédula" name="cedula" value={formData.cedula} onChange={handleChange} />
          <Select label="Sexo" name="sexo" value={formData.sexo} onChange={handleChange} options={[["","Seleccionar"],["masculino","Masculino"],["femenino","Femenino"]]} />
        </div>

        <section className="rounded-3xl border border-brand-border bg-brand-cream p-5 sm:p-8">
          <div className="grid gap-7 md:grid-cols-[1fr_280px] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-brand-gold">Identificación</p>
              <h2 className="mt-2 text-2xl font-semibold text-brand-forest">Selfie del participante *</h2>
              <p className="mt-2 max-w-xl leading-7 text-brand-muted">Abrí la cámara sin salir del formulario, mirá de frente y tomá una foto clara. Tus datos escritos se guardan automáticamente mientras completás el registro.</p>

              {!cameraOpen ? (
                <div className="mt-5">
                  <button type="button" onClick={openCamera} className="w-full rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white sm:w-auto">
                    {preview ? "Volver a sacar selfie" : "Abrir cámara"}
                  </button>
                </div>
              ) : (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={takeSelfie} className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white">Tomar selfie</button>
                  <button type="button" onClick={stopCamera} className="rounded-full border border-brand-border bg-white px-6 py-3 text-sm font-semibold text-brand-forest">Cancelar</button>
                </div>
              )}

              {cameraError ? <p className="mt-3 text-sm text-red-700">{cameraError}</p> : null}
              <p className="mt-3 text-xs text-brand-muted">La selfie queda guardada de forma privada y solo puede verla la administración.</p>
            </div>

            <div className="aspect-square overflow-hidden rounded-3xl border border-brand-border bg-white">
              {cameraOpen ? (
                <video ref={videoRef} autoPlay playsInline muted className="h-full w-full scale-x-[-1] object-cover" />
              ) : preview ? (
                <img src={preview} alt="Vista previa de la selfie" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center p-5 text-center text-sm text-brand-muted">Tu selfie aparecerá acá</div>
              )}
            </div>
          </div>
        </section>

        <Section number="02" title="Información adicional" />
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Iglesia / congregación" name="iglesia" value={formData.iglesia} onChange={handleChange} required={false} />
          <Select label="¿Sos invitado?" name="esInvitado" value={formData.esInvitado} onChange={handleChange} options={[["","Seleccionar"],["no","No"],["si","Sí"]]} />
          {formData.esInvitado === "si" ? <Field label="Nombre de quien te invitó" name="invitadoPor" value={formData.invitadoPor} onChange={handleChange} /> : null}
        </div>

        {esMenor ? (
          <>
            <Section number="03" title="Responsable" />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Nombre del padre, madre o tutor" name="nombrePadreMadre" value={formData.nombrePadreMadre} onChange={handleChange} />
              <Field label="Teléfono del responsable" name="telefonoPadreMadre" value={formData.telefonoPadreMadre} onChange={handleChange} />
            </div>
          </>
        ) : null}

        <Section number="04" title="Salud" />
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="¿Tiene alguna alergia?" name="alergias" value={formData.alergias} onChange={handleChange} required={false} />
          <Field label="¿Qué medicamento toma?" name="medicamentos" value={formData.medicamentos} onChange={handleChange} required={false} />
          <Field label="¿Tiene enfermedad de base?" name="enfermedadBase" value={formData.enfermedadBase} onChange={handleChange} required={false} />
        </div>

        <Section number="05" title="Emergencia" />
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Contacto de emergencia" name="contactoEmergenciaNombre" value={formData.contactoEmergenciaNombre} onChange={handleChange} required={false} />
          <Field label="Teléfono de emergencia" name="contactoEmergenciaTelefono" value={formData.contactoEmergenciaTelefono} onChange={handleChange} required={false} />
        </div>

        <Section number="06" title="Pago y observaciones" />
        <Select label="Forma de pago" name="formaPago" value={formData.formaPago} onChange={handleChange} options={[["","Seleccionar"],["efectivo","Efectivo"],["transferencia","Transferencia"]]} />
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Observaciones</span>
          <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} rows={4} className="w-full rounded-xl border border-brand-border bg-white p-4" />
        </label>

        {submitError ? <p role="alert" className="bg-red-50 px-4 py-3 text-sm text-red-800">{submitError}</p> : null}

        <div className="flex flex-col-reverse gap-3 border-t border-brand-border pt-8 sm:flex-row sm:justify-between">
          <Link href="/bienvenida" className="rounded-full border border-brand-border px-6 py-3 text-center text-sm font-semibold">Volver</Link>
          <button disabled={isSubmitting} className="rounded-full bg-brand-forest px-8 py-3 text-sm font-semibold text-white disabled:opacity-60">{isSubmitting ? "Enviando..." : "Enviar registro"}</button>
        </div>
      </form>
    </div>
  );
}

function Section({ number, title }: { number: string; title: string }) {
  return (
    <div className="grid gap-3 border-t border-brand-border pt-8 sm:grid-cols-[64px_1fr]">
      <span className="text-3xl font-semibold text-brand-gold">{number}</span>
      <h2 className="text-3xl font-semibold text-brand-forest">{title}</h2>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required = true }: { label: string; name: string; value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; type?: string; required?: boolean }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold">{label}{required ? " *" : ""}</span>
      <input name={name} type={type} value={value} onChange={onChange} required={required} className="min-h-12 w-full rounded-xl border border-brand-border bg-white px-4" />
    </label>
  );
}

function Select({ label, name, value, onChange, options }: { label: string; name: string; value: string; onChange: (event: ChangeEvent<HTMLSelectElement>) => void; options: string[][] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label} *</span>
      <select name={name} value={value} onChange={onChange} required className="min-h-12 w-full rounded-xl border border-brand-border bg-white px-4">
        {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
    </label>
  );
}
