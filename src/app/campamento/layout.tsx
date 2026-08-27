import type { Metadata } from "next";

const title = "Gracia Camp 2026";
const description =
  "Campamento de Jóvenes Gracia Camp 2026: palabra, aventura, juegos y comunión.";
const siteUrl = "https://graciacamp.vercel.app";
const pageUrl = `${siteUrl}/campamento`;
const imageUrl = `${siteUrl}/og/gracia-camp-oficial-2026-v2.jpeg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: "Gracia Camp 2026",
    type: "website",
    locale: "es_PY",
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        alt: "Gracia Camp 2026 - Campamento de Jóvenes",
        type: "image/jpeg",
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

export default function CampamentoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
