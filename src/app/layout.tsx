import type { Metadata } from "next";
import "./globals.css";

const socialDescription =
  "Campamento de Jóvenes Gracia Camp 2026: palabra, aventura, juegos y comunión.";
const socialImage = "/og/gracia-camp-oficial-2026-v2.png";

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
        width: 1920,
        height: 1080,
        alt: "Gracia Camp 2026 - Campamento de Jóvenes",
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
