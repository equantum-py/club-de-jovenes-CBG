import type { Metadata } from "next";

const title = "Gracia Camp 2026";
const description =
  "Gracia Camp 2026: 04–06 de diciembre en Monte Aramí, Paraguarí. Tres días de palabra, aventura, juegos y comunión.";
const siteUrl = "https://graciacamp.vercel.app";
const pageUrl = `${siteUrl}/inicio`;
const imageUrl = `${siteUrl}/og/gracia-camp-social-2026-v6.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: "Gracia Camp 2026",
    type: "website",
    locale: "es_PY",
    images: [{
      url: imageUrl,
      secureUrl: imageUrl,
      alt: "Gracia Camp 2026 - Campamento de Jóvenes",
      type: "image/jpeg",
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  },
};

export default function InicioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
