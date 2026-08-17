import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Container, Eyebrow } from "@/components/ui/design";

const photos = [
  { src: "/campamento-bg.jpg", alt: "Actividad nocturna de jóvenes", wide: true },
  { src: "/bienvenida-bg..jpg", alt: "Jóvenes compartiendo en comunidad", wide: false },
  { src: "/campamento-hero.jpg", alt: "Encuentro del Club de Jóvenes CBG", wide: false },
];

export default function GaleriaPage() {
  return (
    <div className="min-h-screen bg-brand-warmWhite text-brand-ink">
      <Header />
      <main>
        <section className="py-16 sm:py-24">
          <Container>
            <Eyebrow>Galería</Eyebrow>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-brand-forest sm:text-6xl lg:text-7xl">Momentos que forman parte de nuestra historia.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-muted">Encuentros, campamentos y experiencias compartidas por los jóvenes de CBG.</p>
            <div className="mt-12 grid auto-rows-[300px] gap-4 md:grid-cols-2 lg:auto-rows-[360px]">
              {photos.map((photo, index) => (
                <div key={`${photo.src}-${index}`} className={`relative overflow-hidden rounded-[2rem] ${photo.wide ? "md:col-span-2" : ""}`}>
                  <Image src={photo.src} alt={photo.alt} fill sizes={photo.wide ? "100vw" : "50vw"} className="object-cover transition duration-500 hover:scale-[1.02]" />
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-brand-muted">Esta galería podrá crecer con nuevas fotografías desde el futuro panel administrativo.</p>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
