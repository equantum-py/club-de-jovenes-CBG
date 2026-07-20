"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";

const CBG = {
  navy: "#183A2B",
  gold: "#7A835C",
  cream: "#F7F5EF",
  text: "#1F241F",
  textMuted: "#66705E",
  border: "#D9DDD1",
};

type Remera = {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
};

const TALLAS = ["S", "M", "L", "XL", "XXL"];

const REMERAS: Remera[] = [
  {
    id: "oficial-1",
    nombre: "Remera oficial Gracia Camp 2026",
    precio: 100000,
    imagen: "/campamento/remera-nueva.png",
  },
];

const WHATSAPP_NUMBER = "595985194953";

const MAPS_URL = "https://maps.app.goo.gl/S4kDff6SKFJpFPh78";

const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Campamento%20Kavaju%20Palabra%20de%20Vida%20Atyra%20Paraguay&output=embed";

const YOUTUBE_VIDEO_ID = "_EpTnktKT-o";
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`;

type HeroImageSlide = {
  type: "image";
  desktopSrc: string;
  mobileSrc?: string;
  alt: string;
};

type HeroVideoSlide = {
  type: "video";
  src: string;
  poster: string;
  alt: string;
};

type HeroSlide = HeroImageSlide | HeroVideoSlide;

const HERO_SLIDES: HeroSlide[] = [
  {
    type: "image",
    desktopSrc: "/banners/gracia-camp-banner-desktop.png",
    mobileSrc: "/banners/gracia-camp-banner-mobile.png",
    alt: "Gracia Camp - Por gracia somos salvos - Efesios 2:8",
  },
];

function getWhatsAppUrl(producto: string, talla: string): string {
  const message = `Hola! Quiero reservar la ${producto} en talla ${talla} para el Campamento CBG 2026.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatPrice(gs: number): string {
  return "Gs. " + gs.toLocaleString("es-PY");
}

function HeroBanner() {
  const activeSlide = HERO_SLIDES[0];

  if (!activeSlide || activeSlide.type !== "image") {
    return null;
  }

  return (
    <section
      className="w-full overflow-hidden border-b border-[#D9DDD1] bg-[#F7F5EF]"
      aria-label="Banner principal del Campamento de Jóvenes CBG"
    >
      <picture className="block w-full">
        {activeSlide.mobileSrc ? (
          <source media="(max-width: 767px)" srcSet={activeSlide.mobileSrc} />
        ) : null}

        <img
          src={activeSlide.desktopSrc}
          alt={activeSlide.alt}
          className="block h-auto w-full object-contain object-center"
          loading="eager"
        />
      </picture>
    </section>
  );
}

function CategoryNav() {
  const pageLinks = [
    { label: "Bienvenida", href: "/bienvenida" },
    { label: "Registrarme", href: "/registro" },
    { label: "Reglamento", href: "/reglamento" },
  ];


  return (
    <div className="border-b border-[#D9DDD1] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
          {pageLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-sm bg-[#183A2B] px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white transition hover:opacity-90 sm:px-5 sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

function TemaSection() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: CBG.cream }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2">
          <div
            className="flex items-center px-5 py-8 sm:px-9 sm:py-11 lg:px-12"
            style={{ backgroundColor: CBG.navy }}
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/65 sm:text-sm">
                Tema Central
              </p>

              <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-4xl">
                Una fe examinada, una vida rendida a Cristo
              </h2>

              <blockquote className="mt-4 border-l-2 border-[#7A835C] pl-4 text-white/80">
                <p className="text-sm italic sm:text-base">
                  &ldquo;Examinaos a vosotros mismos si estáis en la fe.&rdquo;
                </p>
                <footer className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 sm:text-xs">
                  1 Corintios 13:5
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="relative min-h-[170px] overflow-hidden sm:min-h-[230px] lg:min-h-0">
            <img
              src="/campamento-bg.jpg"
              alt="Imagen del campamento"
              className="h-full min-h-[170px] w-full object-cover sm:min-h-[230px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function RemerasSection() {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const handleSizeChange = (productId: string, talla: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: talla }));
  };

  return (
    <section id="remeras" className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <p
            className="text-xs font-medium uppercase tracking-[0.25em] sm:text-sm"
            style={{ color: CBG.gold }}
          >
            Edición limitada
          </p>

          <h2
            className="mt-2 text-2xl font-semibold leading-tight sm:text-4xl"
            style={{ color: CBG.text }}
          >
            Remera oficial del campamento
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: CBG.textMuted }}>
            Elegí tu talle y reservá la remera oficial de Gracia Camp por WhatsApp.
          </p>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-[minmax(0,420px)_1fr] sm:items-start sm:overflow-visible sm:px-0 sm:pb-0">
          {REMERAS.map((remera) => {
            const selectedSize = selectedSizes[remera.id];

            return (
              <article
                key={remera.id}
                className="group min-w-[82%] max-w-[82%] snap-start rounded-sm border border-[#D9DDD1] bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:min-w-0 sm:w-full sm:max-w-[420px]"
              >
                <div className="relative h-[520px] overflow-hidden rounded-sm bg-[#F7F5EF]">
  <img
    src={remera.imagen}
    alt={remera.nombre}
    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
  />

                  <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#183A2B] shadow-sm">
                    Oficial
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-lg font-semibold leading-tight sm:text-xl" style={{ color: CBG.text }}>
                    {remera.nombre}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed" style={{ color: CBG.textMuted }}>
                    Diseño oficial del campamento, disponible por tiempo limitado.
                  </p>

                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="text-xl font-semibold sm:text-2xl" style={{ color: CBG.text }}>
                      {formatPrice(remera.precio)}
                    </p>
                    <p className="text-[10px] font-medium uppercase tracking-wider sm:text-xs" style={{ color: CBG.gold }}>
                      Precio único
                    </p>
                  </div>

                  <div className="mt-3">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider" style={{ color: CBG.textMuted }}>
                      Elegí tu talle
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {TALLAS.map((talla) => (
                        <button
                          key={talla}
                          type="button"
                          onClick={() => handleSizeChange(remera.id, talla)}
                          aria-pressed={selectedSize === talla}
                          className="h-9 min-w-9 rounded-sm border px-2 text-xs font-medium transition sm:h-10 sm:min-w-10 sm:px-3"
                          style={{
                            borderColor: selectedSize === talla ? CBG.navy : CBG.border,
                            backgroundColor: selectedSize === talla ? CBG.navy : "transparent",
                            color: selectedSize === talla ? "white" : CBG.textMuted,
                          }}
                        >
                          {talla}
                        </button>
                      ))}
                    </div>
                  </div>

                  <a
                    href={selectedSize ? getWhatsAppUrl(remera.nombre, selectedSize) : "#"}
                    target={selectedSize ? "_blank" : undefined}
                    rel={selectedSize ? "noopener noreferrer" : undefined}
                    onClick={(event) => {
                      if (!selectedSize) {
                        event.preventDefault();
                        alert("Elegí un talle antes de reservar por WhatsApp.");
                      }
                    }}
                    className="mt-4 flex w-full items-center justify-center rounded-sm py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:opacity-90 sm:mt-5 sm:py-3 sm:text-sm"
                    style={{ backgroundColor: CBG.navy }}
                  >
                    Reservar mi talle por WhatsApp
                  </a>
                </div>
              </article>
            );
          })}

          <div className="hidden min-h-[280px] rounded-sm border border-dashed border-[#D9DDD1] bg-[#F7F5EF]/60 p-6 sm:block">
            <p className="text-sm font-medium uppercase tracking-wider" style={{ color: CBG.gold }}>
              Próximamente
            </p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: CBG.textMuted }}>
              Este espacio queda reservado para agregar información adicional del campamento, beneficios, combos o avisos importantes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LugarSection() {
  return (
    <section id="lugar" className="py-10 sm:py-12" style={{ backgroundColor: CBG.cream }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm border border-[#D9DDD1] bg-white p-5 sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2
                className="text-2xl font-semibold leading-tight sm:text-4xl"
                style={{ color: CBG.text }}
              >
                Lugar del campamento
              </h2>

              <div className="mt-5 space-y-3">
                <div>
                  <p
                    className="text-[11px] font-medium uppercase tracking-wider sm:text-xs"
                    style={{ color: CBG.gold }}
                  >
                    Nombre
                  </p>
                  <p className="mt-1 text-sm font-medium sm:text-base" style={{ color: CBG.text }}>
                    Campamento Kavaju - Palabra de Vida
                  </p>
                </div>

                <div>
                  <p
                    className="text-[11px] font-medium uppercase tracking-wider sm:text-xs"
                    style={{ color: CBG.gold }}
                  >
                    Dirección
                  </p>
                  <p className="mt-1 text-sm font-medium sm:text-base" style={{ color: CBG.text }}>
                    Ver ubicación exacta en Google Maps
                  </p>
                </div>

                <div>
                  <p
                    className="text-[11px] font-medium uppercase tracking-wider sm:text-xs"
                    style={{ color: CBG.gold }}
                  >
                    Ciudad
                  </p>
                  <p className="mt-1 text-sm font-medium sm:text-base" style={{ color: CBG.text }}>
                    Atyrá, Paraguay
                  </p>
                </div>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-sm border border-[#183A2B] px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-[#183A2B] transition hover:bg-[#183A2B] hover:text-white sm:px-6 sm:text-sm"
              >
                Ver en Google Maps
              </a>
            </div>

            <div className="overflow-hidden rounded-sm bg-[#F7F5EF]">
              <iframe
                src={MAPS_EMBED_URL}
                title="Mapa del Campamento Kavaju - Palabra de Vida"
                className="h-[260px] w-full sm:h-[320px] lg:h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const [showPlayer, setShowPlayer] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;

  return (
    <section id="video" className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          className="mb-5 text-2xl font-semibold leading-tight sm:text-4xl"
          style={{ color: CBG.text }}
        >
          Video informativo
        </h2>

        <div className="aspect-video w-full overflow-hidden rounded-sm bg-black">
          {showPlayer ? (
            <iframe
              src={`${YOUTUBE_EMBED_URL}?autoplay=1`}
              title="Video informativo del Campamento CBG 2026"
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setShowPlayer(true)}
              className="group relative h-full w-full overflow-hidden bg-black text-white"
              aria-label="Reproducir video informativo"
            >
              <img
                src={thumbnailUrl}
                alt="Miniatura del video informativo del campamento"
                className="h-full w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-90"
                loading="lazy"
              />

              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white shadow-lg transition group-hover:scale-105">
                  ▶
                </span>
              </span>

              <span className="absolute bottom-4 left-4 rounded-sm bg-black/65 px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Tocar para ver el video
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-10 sm:py-12" style={{ backgroundColor: CBG.navy }}>
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold leading-tight text-white sm:text-4xl">
          Antes de continuar
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          Lee cuidadosamente el reglamento del campamento. Estas normas nos ayudarán a vivir este
          tiempo con orden, respeto y propósito.
        </p>

        <div className="mt-6 grid gap-3 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-3">
          <Link
            href="/registro"
            className="inline-flex items-center justify-center rounded-sm bg-white px-6 py-3 text-sm font-medium uppercase tracking-wider transition hover:bg-white/90 sm:px-8 sm:text-base"
            style={{ color: CBG.navy }}
          >
            Registrarme
          </Link>

          <Link
            href="/reglamento"
            className="inline-flex items-center justify-center rounded-sm border border-white/30 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-white/10 sm:px-8 sm:text-base"
          >
            Leer reglamento
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 sm:py-10" style={{ backgroundColor: "#10261D" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="sm:hidden">
          <h4 className="text-base font-semibold text-white">JÓVENES CBG</h4>
          <p className="mt-1 text-sm text-white/55">Campamento 2026</p>

          <div className="mt-5 space-y-2 text-sm text-white/55">
            <p>WhatsApp: 0985 194953</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                Instagram
              </a>
              <a href="#" className="hover:text-white">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <h4 className="text-lg font-semibold text-white sm:text-xl">JÓVENES CBG</h4>
            <p className="mt-2 text-sm text-white/50 sm:text-base">Campamento 2026</p>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-white/50 sm:text-base">
              Principal
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-white/50 sm:text-base">
              <li>
                <Link href="/" className="hover:text-white">
                  Portada
                </Link>
              </li>
              <li>
                <Link href="/campamento" className="hover:text-white">
                  Inicio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-white/50 sm:text-base">
              Páginas
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-white/50 sm:text-base">
              <li>
                <Link href="/bienvenida" className="hover:text-white">
                  Bienvenida
                </Link>
              </li>
              <li>
                <Link href="/registro" className="hover:text-white">
                  Registro
                </Link>
              </li>
              <li>
                <Link href="/reglamento" className="hover:text-white">
                  Reglamento
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-white/50 sm:text-base">
              Contacto
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-white/50 sm:text-base">
              <li>WhatsApp: 0985 194953</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-white/50 sm:text-base">
              Redes
            </h4>
            <div className="mt-3 flex gap-4 text-sm sm:text-base">
              <a href="#" className="text-white/50 hover:text-white">
                Instagram
              </a>
              <a href="#" className="text-white/50 hover:text-white">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/30 sm:mt-10 sm:pt-8 sm:text-sm">
          © 2026 Jóvenes CBG. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

function StickyMobileActions() {
  const message = "Hola! Quiero consultar sobre el Campamento CBG 2026.";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D9DDD1] bg-white/95 p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/registro"
          className="flex items-center justify-center rounded-sm bg-[#183A2B] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white"
        >
          Inscribirme
        </Link>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-sm border border-[#183A2B] px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#183A2B]"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function CampamentoPage() {
  return (
    <div className="min-h-screen bg-white pb-20 text-sm antialiased sm:text-[15px] md:pb-0">
      <Header />
      <HeroBanner />
      <CategoryNav />
      <TemaSection />
      <RemerasSection />
      <LugarSection />
      <VideoSection />
      <CTASection />
      <Footer />
      <StickyMobileActions />
    </div>
  );
}
