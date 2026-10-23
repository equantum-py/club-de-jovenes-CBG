import type { Metadata } from "next";
import "./globals.css";

const socialDescription =
  "Gracia Camp 2026: 04–06 de diciembre en Monte Aramí, Paraguarí. Tres días de palabra, aventura, juegos y comunión.";
const socialImage = "/og/gracia-camp-social-2026-v5.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://graciacamp.vercel.app"),
  title: {
    default: "Gracia Camp 2026",
    template: "%s | Gracia Camp 2026",
  },
  description: socialDescription,
  openGraph: {
    title: "Gracia Camp 2026",
    description: socialDescription,
    type: "website",
    locale: "es_PY",
    images: [
      {
        url: socialImage,
        alt: "Gracia Camp 2026 - Campamento de Jóvenes",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gracia Camp 2026",
    description: socialDescription,
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
