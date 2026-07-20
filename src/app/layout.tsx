import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://club-de-jovenes-cbg.vercel.app"),
  title: {
    default: "Jóvenes CBG | Campamento 2026",
    template: "%s | Jóvenes CBG",
  },
  description:
    "Información y registro del Campamento 2026 del Club de Jóvenes CBG.",
  openGraph: {
    title: "Jóvenes CBG | Campamento 2026",
    description:
      "Información y registro del Campamento 2026 del Club de Jóvenes CBG.",
    images: ["/og/gracia-camp-2026-whatsapp.jpg"],
    locale: "es_PY",
    type: "website",
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
