"use client";

import Script from "next/script";
import { useId } from "react";

declare global {
  interface Window { turnstile?: { render: (selector: string, options: Record<string, unknown>) => void } }
}

export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const id = `turnstile-${useId().replace(/:/g, "")}`;
  const render = () => window.turnstile?.render(`#${id}`, {
    sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
    callback: onToken,
    "expired-callback": () => onToken(""),
    language: "es",
  });
  return <>
    <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={render} />
    <div id={id} aria-label="Verificación de seguridad" />
  </>;
}
