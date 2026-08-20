export type PaymentSettings = {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  documentNumber: string;
};

const defaults: PaymentSettings = {
  bankName: "",
  accountHolder: "",
  accountNumber: "",
  documentNumber: "",
};

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_NOT_CONFIGURED");
  return { url, key };
}

function requestHeaders(key: string) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export async function getPaymentSettings(): Promise<PaymentSettings> {
  try {
    const { url, key } = config();
    const response = await fetch(
      `${url}/rest/v1/payment_settings?id=eq.1&select=bank_name,account_holder,account_number,document_number`,
      { headers: requestHeaders(key), cache: "no-store" },
    );
    if (!response.ok) return defaults;
    const [row] = await response.json();
    if (!row) return defaults;
    return {
      bankName: row.bank_name || "",
      accountHolder: row.account_holder || "",
      accountNumber: row.account_number || "",
      documentNumber: row.document_number || "",
    };
  } catch {
    return defaults;
  }
}

export async function updatePaymentSettings(settings: PaymentSettings) {
  const { url, key } = config();
  const response = await fetch(`${url}/rest/v1/payment_settings?id=eq.1`, {
    method: "PATCH",
    headers: { ...requestHeaders(key), Prefer: "return=minimal" },
    body: JSON.stringify({
      bank_name: settings.bankName.trim(),
      account_holder: settings.accountHolder.trim(),
      account_number: settings.accountNumber.trim(),
      document_number: settings.documentNumber.trim(),
      updated_at: new Date().toISOString(),
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("PAYMENT_SETTINGS_SAVE_FAILED");
}
