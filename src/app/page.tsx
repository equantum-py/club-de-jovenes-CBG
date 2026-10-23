import type { Metadata } from "next";
import CampamentoPage from "./campamento/page";

const siteUrl = "https://graciacamp.vercel.app";
const imageUrl = `${siteUrl}/api/social-card?v=20261023-3`;
const title = "Gracia Camp 2026";
const description =
  "Gracia Camp 2026: 04–06 de diciembre en Monte Aramí, Paraguarí. Tres días de palabra, aventura, juegos y comunión.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: siteUrl },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Gracia Camp 2026",
    type: "website",
    locale: "es_PY",
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        alt: "Gracia Camp 2026 - Campamento de Jóvenes",
        type: "image/png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  },
};

export default CampamentoPage;
