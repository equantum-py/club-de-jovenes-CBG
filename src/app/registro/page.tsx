"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

import Header from "@/components/Header";

const CBG = {
  navy: "#1e3a5c",
  gold: "#b8860b",
};

type FormData = {
  nombre: string;
  apellido: string;
  edad: string;
  telefono: string;
  cedula: string;
  sexo: string;
  iglesia: string;
  esInvitado: string;
  invitadoPor: string;
  alergias: string;
  medicamentos: string;
  enfermedadBase: string;
  contactoEmergenciaNombre: string;
  contactoEmergenciaTelefono: string;
  observaciones: string;
  formaPago: string;
  nombrePadreMadre: string;
  telefonoPadreMadre: string;
};

type ApiErrorResponse = {
  ok?: boolean;
  error?: string;
  missingFields?: string[];
};

const initialForm: FormData = {
  nombre: "",
  apellido: "",
  edad: "",
  telefono: "",
  cedula: "",
  sexo: "",
  iglesia: "",
  esInvitado: "",
  invitadoPor: "",
  alergias: "",
  medicamentos: "",
  enfermedadBase: "",
  contactoEmergenciaNombre: "",
  contactoEmergenciaTelefono: "",
  observaciones: "",
  formaPago: "",
  nombrePadreMadre: "",
  telefonoPadreMadre: "",
};

export default function RegistroPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>(initialForm);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const edadNumero = Number(formData.edad);

  const esMenor = useMemo(() => {
    if (!formData.edad.trim()) {
      return false;
    }

    return !Number.isNaN(edadNumero) && edadNumero < 18;
  }, [edadNumero, formData.edad]);

  const mostrarInvitado = formData.esInvitado === "si";

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (submitError) {
      setSubmitError("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responsePayload = (await response
        .json()
        .catch(() => null)) as ApiErrorResponse | null;

      if (!response.ok) {
        setSubmitError(
          responsePayload?.error ??
            "No se pudo guardar tu registro. Intentá nuevamente.",
        );

        return;
      }

      router.push("/reglamento");
    } catch (error) {
      console.error("Error al enviar el registro:", error);

      setSubmitError(
        "No se pudo conectar con el servidor. Revisá tu conexión e intentá nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
      <Header />

      <main>
        <section className="bg-brand-cream py-14 sm:py-20">
          <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
            <p className="text-sm font-medium tracking-[0.18em] text-brand-gold">
              Club de Jóvenes CBG
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-brand-forest sm:text-6xl">
              Registro Campamento 2026
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-muted">
              Completá este formulario con los datos necesarios para tu
              inscripción. Queremos cuidar cada detalle del campamento y contar
              con la información importante de cada participante.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="space-y-12">
              <section className="border-t border-brand-border pt-8">
                <FormSectionHeader
                  number="01"
                  title="Datos personales"
                  description="Información básica del participante."
                />
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <Field
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    autoComplete="given-name"
                    required
                  />
                  <Field
                    label="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    autoComplete="family-name"
                    required
                  />
                  <Field
                    label="Edad"
                    name="edad"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.edad}
                    onChange={handleChange}
                    required
                  />
                  <Field
                    label="Número de teléfono"
                    name="telefono"
                    type="tel"
                    inputMode="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />
                  <Field
                    label="Cédula"
                    name="cedula"
                    inputMode="numeric"
                    value={formData.cedula}
                    onChange={handleChange}
                    required
                  />
                  <SelectField
                    label="Sexo"
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    required
                    options={[
                      { value: "", label: "Seleccionar" },
                      { value: "masculino", label: "Masculino" },
                      { value: "femenino", label: "Femenino" },
                    ]}
                  />
                </div>
              </section>

              <section className="border-t border-brand-border pt-8">
                <FormSectionHeader
                  number="02"
                  title="Información adicional"
                  description="Datos de congregación e invitación."
                />
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <Field
                    label="Iglesia / congregación"
                    name="iglesia"
                    value={formData.iglesia}
                    onChange={handleChange}
                  />
                  <SelectField
                    label="¿Sos invitado?"
                    name="esInvitado"
                    value={formData.esInvitado}
                    onChange={handleChange}
                    required
                    options={[
                      { value: "", label: "Seleccionar" },
                      { value: "no", label: "No" },
                      { value: "si", label: "Sí" },
                    ]}
                  />
                </div>
              </section>

              {mostrarInvitado && (
                <section className="border-l-2 border-brand-sage bg-brand-sageSoft/60 px-5 py-6 sm:px-7">
                  <FormSectionHeader
                    number="03"
                    title="Información de invitación"
                    description="Como marcaste que sos invitado, necesitamos saber quién te invitó."
                    compact
                  />
                  <div className="mt-5">
                    <Field
                      label="Nombre de quien te invitó"
                      name="invitadoPor"
                      value={formData.invitadoPor}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </section>
              )}

              {esMenor && (
                <section className="border-l-2 border-brand-gold bg-brand-cream px-5 py-6 sm:px-7">
                  <FormSectionHeader
                    number="04"
                    title="Responsable"
                    description="Necesitamos los datos del padre, madre o tutor responsable."
                    compact
                  />
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <Field
                      label="Nombre del padre, madre o tutor"
                      name="nombrePadreMadre"
                      value={formData.nombrePadreMadre}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Teléfono del padre, madre o tutor"
                      name="telefonoPadreMadre"
                      type="tel"
                      inputMode="tel"
                      value={formData.telefonoPadreMadre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </section>
              )}

              <section className="border-t border-brand-border pt-8">
                <FormSectionHeader
                  number="05"
                  title="Salud"
                  description="Estos datos nos ayudan a acompañarte y cuidarte mejor durante el campamento."
                />
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <Field
                    label="¿Tiene algún tipo de alergia?"
                    name="alergias"
                    value={formData.alergias}
                    onChange={handleChange}
                    placeholder="Ej.: penicilina, maní, picaduras, etc."
                  />
                  <Field
                    label="¿Qué medicamento toma?"
                    name="medicamentos"
                    value={formData.medicamentos}
                    onChange={handleChange}
                    placeholder="Ej.: antialérgicos o medicación diaria"
                  />
                  <Field
                    label="¿Tiene enfermedad de base?"
                    name="enfermedadBase"
                    value={formData.enfermedadBase}
                    onChange={handleChange}
                    placeholder="Ej.: asma, diabetes, hipertensión"
                  />
                </div>
              </section>

              <section className="border-t border-brand-border pt-8">
                <FormSectionHeader
                  number="06"
                  title="Emergencia"
                  description="Contacto para cualquier situación importante durante el campamento."
                />
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <Field
                    label="Contacto de emergencia"
                    name="contactoEmergenciaNombre"
                    value={formData.contactoEmergenciaNombre}
                    onChange={handleChange}
                    placeholder="Nombre y apellido"
                  />
                  <Field
                    label="Teléfono de emergencia"
                    name="contactoEmergenciaTelefono"
                    type="tel"
                    inputMode="tel"
                    value={formData.contactoEmergenciaTelefono}
                    onChange={handleChange}
                    placeholder="Número de contacto"
                  />
                </div>
              </section>

              <section className="border-t border-brand-border pt-8">
                <FormSectionHeader number="07" title="Pago y observaciones" />
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <SelectField
                    label="Forma de pago"
                    name="formaPago"
                    value={formData.formaPago}
                    onChange={handleChange}
                    required
                    options={[
                      { value: "", label: "Seleccionar" },
                      { value: "efectivo", label: "Efectivo" },
                      { value: "transferencia", label: "Transferencia" },
                    ]}
                  />
                </div>
                <div className="mt-5">
                  <TextAreaField
                    label="Observaciones"
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                    placeholder="Agregá cualquier información adicional que sea importante para el equipo organizador."
                  />
                </div>
              </section>

              <div className="border-t border-brand-border pt-8">
                {submitError && (
                  <p
                    role="alert"
                    className="mb-5 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800"
                  >
                    {submitError}
                  </p>
                )}
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href="/bienvenida"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-brand-border px-6 text-sm font-semibold text-brand-forest transition hover:border-brand-forest hover:bg-brand-forest/5 sm:w-auto"
                  >
                    Volver
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-forest px-8 text-sm font-semibold text-white transition hover:bg-brand-forestLight disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar registro"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

type FormSectionHeaderProps = {
  number: string;
  title: string;
  description?: string;
  compact?: boolean;
};

function FormSectionHeader({
  number,
  title,
  description,
  compact = false,
}: FormSectionHeaderProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-[64px_1fr]">
      <span
        className={`${compact ? "text-2xl" : "text-3xl"} font-semibold text-brand-gold`}
      >
        {number}
      </span>
      <div>
        <h2
          className={`${compact ? "text-2xl" : "text-3xl"} font-semibold leading-tight text-brand-forest`}
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl leading-7 text-brand-muted">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

type BaseFieldProps = {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
};

type FieldProps = BaseFieldProps & {
  type?: string;
  min?: string;
  max?: string;
  autoComplete?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
};

function Field({
  label,
  name,
  value,
  required = false,
  placeholder,
  onChange,
  type = "text",
  min,
  max,
  autoComplete,
  inputMode,
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-brand-ink">
        {label}

        {required && (
          <span className="ml-1 text-red-700" aria-hidden="true">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="min-h-12 w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-base text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/15"
      />
    </label>
  );
}

type SelectFieldProps = BaseFieldProps & {
  options: Array<{
    value: string;
    label: string;
  }>;
};

function SelectField({
  label,
  name,
  value,
  required = false,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-brand-ink">
        {label}

        {required && (
          <span className="ml-1 text-red-700" aria-hidden="true">
            *
          </span>
        )}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="min-h-12 w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-base text-brand-ink outline-none transition focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/15"
      >
        {options.map((option) => (
          <option
            key={option.value || option.label}
            value={option.value}
            className="bg-white"
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  name,
  value,
  placeholder,
  onChange,
}: BaseFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-brand-ink">
        {label}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        className="min-h-12 w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-base text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-brand-forest focus:ring-2 focus:ring-brand-forest/15"
      />
    </label>
  );
}
