"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteRegistrationButton({
  id,
  name,
  redirectAfterDelete = false,
  compact = false,
}: {
  id: string;
  name: string;
  redirectAfterDelete?: boolean;
  compact?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (loading) return;
    const confirmed = window.confirm(`¿Eliminar la inscripción de ${name}?\n\nEsta acción no se puede deshacer.`);
    if (!confirmed) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/inscripciones/${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "No se pudo eliminar.");

      if (redirectAfterDelete) {
        router.push("/admin/participantes");
      } else {
        router.refresh();
      }
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo eliminar la inscripción.");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      title={`Eliminar inscripción de ${name}`}
      aria-label={`Eliminar inscripción de ${name}`}
      className={compact
        ? "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-700 transition hover:bg-red-100 disabled:cursor-wait disabled:opacity-50"
        : "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-wait disabled:opacity-50"}
    >
      <span aria-hidden="true" className="text-lg leading-none">🗑</span>
      {!compact ? <span>{loading ? "Eliminando..." : "Eliminar inscripción"}</span> : null}
    </button>
  );
}
