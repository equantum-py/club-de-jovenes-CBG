import { NextResponse } from "next/server";
import { getPaymentSettings } from "@/lib/payment-settings";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getPaymentSettings();
  return NextResponse.json(settings, {
    headers: { "Cache-Control": "no-store" },
  });
}
