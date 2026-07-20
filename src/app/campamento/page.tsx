"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import Countdown from "@/components/Countdown";
import {
  ButtonLink,
  Container,
  Eyebrow,
  SectionHeader,
} from "@/components/ui/design";

const TALLAS = ["S", "M", "L", "XL", "XXL"];
const WHATSAPP_NUMBER = "595985194953";
const MAPS_URL = "https://maps.app.goo.gl/S4kDff6SKFJpFPh78";
const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Campamento%20Kavaju%20Palabra%20de%20Vida%20Atyra%20Paraguay&output=embed";
const YOUTUBE_VIDEO_ID = "_EpTnktKT-o";
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`;
const remera = {
  id: "oficial-1",
  nombre: "Remera oficial Gracia Camp 2026",
  precio: 100000,
  imagen: "/campamento/remera-nueva.png",
};

function getWhatsAppUrl(producto: string, talla: string): string {
  const message = `Hola! Quiero reservar la ${producto} en talla ${talla} para el Campamento CBG 2026.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatPrice(gs: number): string {
  return "Gs. " + gs.toLocaleString("es-PY");
}

function Hero() {
  return (
    <section className="bg-brand-cream">
      <Container className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
        <div className="order-2 lg:order-1">
          <Eyebrow>Club de Jóvenes CBG</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] text-brand-forest sm:text-6xl lg:text-7xl">
            Gracia Camp 2026
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-muted sm:text-xl">
            Una experiencia para escuchar la Palabra, examinar la fe y compartir
            un tiempo de comunión con propósito.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/registro">Inscribirme</ButtonLink>
            <ButtonLink href="/bienvenida" variant="secondary">
              Leer bienvenida
            </ButtonLink>
          </div>
          <div className="mt-9 border-l-2 border-brand-gold pl-5">
            <p className="mb-3 text-sm font-medium text-brand-muted">
              11 de diciembre de 2026 · Cuenta regresiva
            </p>
            <Countdown />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] bg-brand-warmWhite lg:rounded-[3rem]">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/banners/gracia-camp-banner-mobile.png"
              />
              <Image
                src="/banners/gracia-camp-banner-desktop.png"
                alt="Gracia Camp - Por gracia somos salvos - Efesios 2:8"
                width={1920}
                height={640}
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </picture>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TemaSection() {
  return (
    <section className="bg-brand-warmWhite py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Tema central"
            title="Una fe examinada, una vida rendida a Cristo"
          >
            <p>
              El campamento está pensado como un espacio de reflexión bíblica,
              comunión y respuesta sincera al evangelio.
            </p>
          </SectionHeader>
          <blockquote className="mt-8 border-l-2 border-brand-gold pl-5 text-xl leading-9 text-brand-forest sm:text-2xl">
            &ldquo;Examinaos a vosotros mismos si estáis en la fe.&rdquo;
            <footer className="mt-3 text-sm font-medium text-brand-muted">
              1 Corintios 13:5
            </footer>
          </blockquote>
        </div>
        <div className="relative min-h-[260px] overflow-hidden rounded-[2rem] sm:min-h-[380px] lg:min-h-[520px]">
          <Image
            src="/campamento-bg.jpg"
            alt="Imagen del campamento"
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}

function RemeraSection() {
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <section id="remeras" className="bg-brand-cream py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-xl bg-brand-warmWhite px-6 pt-8 sm:px-10 sm:pt-10">
          <Image
            src={remera.imagen}
            alt={remera.nombre}
            width={840}
            height={1040}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="mx-auto h-auto w-full max-w-[440px] object-contain"
          />
        </div>
        <div>
          <Eyebrow>Edición limitada</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
            Remera oficial del campamento
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-brand-muted">
            Elegí tu talle y reservá la remera oficial de Gracia Camp por
            WhatsApp. Diseño oficial del campamento, disponible por tiempo
            limitado.
          </p>
          <div className="my-8 h-px bg-brand-border" />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-3xl font-semibold text-brand-forest">
              {formatPrice(remera.precio)}
            </p>
            <p className="text-sm font-medium text-brand-muted">Precio único</p>
          </div>
          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-brand-ink">
              Elegí tu talle
            </p>
            <div className="flex flex-wrap gap-2">
              {TALLAS.map((talla) => (
                <button
                  key={talla}
                  type="button"
                  onClick={() => setSelectedSize(talla)}
                  aria-pressed={selectedSize === talla}
                  className={`min-h-11 min-w-12 rounded-full border px-4 text-sm font-semibold transition ${selectedSize === talla ? "border-brand-forest bg-brand-forest text-white" : "border-brand-border bg-brand-warmWhite text-brand-muted hover:border-brand-forest hover:text-brand-forest"}`}
                >
                  {talla}
                </button>
              ))}
            </div>
          </div>
          <a
            href={
              selectedSize ? getWhatsAppUrl(remera.nombre, selectedSize) : "#"
            }
            target={selectedSize ? "_blank" : undefined}
            rel={selectedSize ? "noopener noreferrer" : undefined}
            onClick={(event) => {
              if (!selectedSize) {
                event.preventDefault();
                alert("Elegí un talle antes de reservar por WhatsApp.");
              }
            }}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-forestLight sm:w-auto"
          >
            Reservar por WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}

function LugarSection() {
  return (
    <section id="lugar" className="bg-brand-warmWhite py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
        <div>
          <SectionHeader eyebrow="Ubicación" title="Lugar del campamento">
            <p>Campamento Kavaju - Palabra de Vida, en Atyrá, Paraguay.</p>
          </SectionHeader>
          <dl className="mt-8 space-y-5 text-brand-ink">
            <div>
              <dt className="text-sm font-medium text-brand-muted">Nombre</dt>
              <dd className="mt-1 text-lg">
                Campamento Kavaju - Palabra de Vida
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-brand-muted">
                Dirección
              </dt>
              <dd className="mt-1 text-lg">
                Ver ubicación exacta en Google Maps
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-brand-muted">Ciudad</dt>
              <dd className="mt-1 text-lg">Atyrá, Paraguay</dd>
            </div>
          </dl>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-brand-forest px-6 py-3 text-sm font-semibold text-brand-forest transition hover:bg-brand-forest hover:text-white sm:w-auto"
          >
            Ver en Google Maps
          </a>
        </div>
        <div className="overflow-hidden rounded-[2rem] bg-brand-cream">
          <iframe
            src={MAPS_EMBED_URL}
            title="Mapa del Campamento Kavaju - Palabra de Vida"
            className="h-[320px] w-full sm:h-[420px] lg:h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>
    </section>
  );
}

function VideoSection() {
  const [showPlayer, setShowPlayer] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;

  return (
    <section id="video" className="bg-brand-cream py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow="Video"
          title="Video informativo"
          className="mb-8"
        >
          <p>
            Una mirada breve para conocer mejor el espíritu y la preparación del
            campamento.
          </p>
        </SectionHeader>
        <div className="aspect-video w-full overflow-hidden rounded-[2rem] bg-brand-forestDark">
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
              className="group relative h-full w-full overflow-hidden text-white"
              aria-label="Reproducir video informativo"
            >
              <Image
                src={thumbnailUrl}
                alt="Miniatura del video informativo del campamento"
                fill
                sizes="100vw"
                className="object-cover opacity-80 transition group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-warmWhite text-2xl text-brand-forest transition group-hover:scale-105">
                  ▶
                </span>
              </span>
              <span className="absolute bottom-5 left-5 text-sm font-medium">
                Tocar para ver el video
              </span>
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-brand-forest py-16 text-white sm:py-20">
      <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-medium text-brand-sageSoft">
            Antes de continuar
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
            Leé cuidadosamente el reglamento del campamento.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">
            Estas normas nos ayudarán a vivir este tiempo con orden, respeto y
            propósito.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <ButtonLink href="/registro" variant="light">
            Registrarme
          </ButtonLink>
          <ButtonLink
            href="/reglamento"
            variant="secondary"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            Leer reglamento
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  const message = "Hola! Quiero consultar sobre el Campamento CBG 2026.";
  return (
    <footer className="bg-brand-forestDark py-10 text-white">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h2 className="text-xl font-semibold">Jóvenes CBG</h2>
            <p className="mt-2 text-sm text-white/60">Gracia Camp 2026</p>
          </div>
          <nav
            aria-label="Navegación del footer"
            className="grid gap-2 text-sm text-white/70"
          >
            <a href="/campamento" className="hover:text-white">
              Inicio
            </a>
            <a href="/bienvenida" className="hover:text-white">
              Bienvenida
            </a>
            <a href="/registro" className="hover:text-white">
              Registro
            </a>
            <a href="/reglamento" className="hover:text-white">
              Reglamento
            </a>
          </nav>
          <div className="text-sm text-white/70">
            <p>WhatsApp: 0985 194953</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-white underline-offset-4 hover:underline"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-white/40">
          © 2026 Jóvenes CBG. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}

function StickyMobileActions() {
  const message = "Hola! Quiero consultar sobre el Campamento CBG 2026.";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-brand-warmWhite/95 p-3 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a
          href="/registro"
          className="flex min-h-11 items-center justify-center rounded-full bg-brand-forest px-4 text-sm font-semibold text-white"
        >
          Inscribirme
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center justify-center rounded-full border border-brand-forest px-4 text-sm font-semibold text-brand-forest"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function CampamentoPage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite pb-20 text-brand-ink antialiased md:pb-0">
      <Header />
      <main>
        <Hero />
        <TemaSection />
        <RemeraSection />
        <LugarSection />
        <VideoSection />
        <CTASection />
      </main>
      <Footer />
      <StickyMobileActions />
    </div>
  );
}
