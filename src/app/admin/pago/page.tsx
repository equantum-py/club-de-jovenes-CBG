import { redirect } from "next/navigation";
import { getPaymentSettings, updatePaymentSettings } from "@/lib/payment-settings";

export const dynamic = "force-dynamic";

async function savePaymentSettings(formData: FormData) {
  "use server";
  await updatePaymentSettings({
    bankName: String(formData.get("bankName") || ""),
    accountHolder: String(formData.get("accountHolder") || ""),
    accountNumber: String(formData.get("accountNumber") || ""),
    documentNumber: String(formData.get("documentNumber") || ""),
  });
  redirect("/admin/pago?guardado=1");
}

const inputClass = "min-h-12 w-full rounded-xl border border-brand-border bg-white px-4 text-brand-forest outline-none focus:border-brand-gold";

export default async function PaymentAdminPage({ searchParams }: { searchParams?: { guardado?: string } }) {
  const settings = await getPaymentSettings();

  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-brand-gold">Contenido del sitio</p>
        <h1 className="mt-2 text-4xl font-semibold text-brand-forest">Datos de transferencia</h1>
        <p className="mt-3 max-w-2xl text-brand-muted">Estos datos aparecen automáticamente en la inscripción. Podés cambiarlos cuando quieras sin tocar el código.</p>

        {searchParams?.guardado === "1" ? (
          <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">Datos guardados correctamente.</div>
        ) : null}

        <form action={savePaymentSettings} className="mt-8 rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-forest">Banco</span>
              <input name="bankName" defaultValue={settings.bankName} required placeholder="Ej. Banco Familiar" className={inputClass} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-forest">Titular</span>
              <input name="accountHolder" defaultValue={settings.accountHolder} required placeholder="Nombre del titular" className={inputClass} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-forest">Cuenta / Alias</span>
              <input name="accountNumber" defaultValue={settings.accountNumber} required placeholder="Número de cuenta o alias" className={inputClass} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-brand-forest">CI / RUC <span className="font-normal text-brand-muted">(opcional)</span></span>
              <input name="documentNumber" defaultValue={settings.documentNumber} placeholder="Dejar vacío si no aplica" className={inputClass} />
            </label>
          </div>

          <div className="mt-7 flex justify-end">
            <button className="min-h-12 rounded-xl bg-brand-forest px-7 font-semibold text-white">Guardar datos</button>
          </div>
        </form>
      </div>
    </main>
  );
}
