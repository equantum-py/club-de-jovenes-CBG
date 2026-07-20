import type { Metadata } from "next";

const title = "Gracia Camp 2026 | Jóvenes CBG";
const description =
  "Campamento 2026 de Jóvenes CBG. Por gracia somos salvos — Efesios 2:8.";
const siteUrl = "https://jovenescbg.vercel.app";
const pageUrl = `${siteUrl}/campamento`;
const imageUrl = `${siteUrl}/og/gracia-camp-2026-whatsapp.jpg`;

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
    siteName: "Jóvenes CBG",
    type: "website",
    locale: "es_PY",
    images: [
      {
        url: imageUrl,
        secureUrl: imageUrl,
        width: 1200,
        height: 630,
        alt: "Gracia Camp 2026 - Jóvenes CBG",
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
