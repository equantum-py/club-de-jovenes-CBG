"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CBG_NAVY = "#1e3a5c";

function getTimeRemaining() {
  const target = new Date("2026-12-11T00:00:00-03:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    expired: false,
  };
}

export default function Header() {
  const pathname = usePathname();

  const [time, setTime] = useState(() => getTimeRemaining());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "INICIO", href: "/campamento" },
    { label: "BIENVENIDA", href: "/bienvenida" },
    { label: "REGISTRO", href: "/registro" },
    { label: "REGLAMENTO", href: "/reglamento" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e5e5] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link
          href="/campamento"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/logo.png"
            alt="Gracia Camp"
            width={80}
            height={80}
            priority
            className="object-contain"
          />
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-wider lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="transition"
                style={{
                  color: isActive ? CBG_NAVY : "#666666",
                  fontWeight: isActive ? 800 : 600,
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* DERECHA */}
        <div className="flex items-center gap-3">

          {!time.expired && (
            <div className="hidden items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-lg md:inline-flex">

              {/* ICONO */}
              <div className="flex flex-col items-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    stroke="#dc2626"
                    strokeWidth="3"
                    fill="none"
                  />

                  <circle
                    cx="20"
                    cy="20"
                    r="14"
                    fill="#fef3c7"
                  />

                  <line
                    x1="20"
                    y1="20"
                    x2="20"
                    y2="10"
                    stroke="#1a1a1a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  <line
                    x1="20"
                    y1="20"
                    x2="26"
                    y2="20"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="20"
                    cy="20"
                    r="2"
                    fill="#dc2626"
                  />

                  <path
                    d="M28 28 Q30 24 32 26 Q34 22 30 20 Q28 18 26 22 Q24 26 28 28Z"
                    fill="#f59e0b"
                  />

                  <path
                    d="M29 27 Q30 24 31 25 Q32 23 30 22 Q29 21 28 23 Q27 25 29 27Z"
                    fill="#ef4444"
                  />
                </svg>

                <span className="mt-1 text-[10px] font-black uppercase tracking-tight text-red-600">
                  ¡¡INSCRIBITE YA!!
                </span>
              </div>

              <div className="h-12 w-px bg-gray-200" />

              {/* COUNTDOWN */}
              <div className="flex items-center gap-2">
                {[
                  { value: time.days, label: "días" },
                  { value: time.hours, label: "horas" },
                  { value: time.minutes, label: "mins." },
                  { value: time.seconds, label: "segs." },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold leading-none tabular-nums text-[#1a1a1a]">
                        {String(item.value).padStart(2, "0")}
                      </div>

                      <div className="mt-1 text-[10px] font-medium lowercase text-red-600">
                        {item.label}
                      </div>
                    </div>

                    {index < 3 && (
                      <span className="text-2xl font-light text-gray-400">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOTON */}
          <Link
            href="/registro"
            className="hidden rounded-sm px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:opacity-90 sm:inline-flex"
            style={{ backgroundColor: CBG_NAVY }}
          >
            Inscribirme
          </Link>

          {/* MENU MOBILE */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#e5e5e5] text-[#1e3a5c] lg:hidden"
            aria-label="Abrir menú"
          >
            <span className="text-xl leading-none">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <div className="border-t border-[#e5e5e5] bg-white px-4 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">

            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-sm border border-[#e5e5e5] px-4 py-3 text-sm font-bold uppercase tracking-wider transition"
                  style={{
                    backgroundColor: isActive ? CBG_NAVY : "#ffffff",
                    color: isActive ? "#ffffff" : "#666666",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/registro"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-sm px-4 py-3 text-center text-sm font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: CBG_NAVY }}
            >
              Inscribirme
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
