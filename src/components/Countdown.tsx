"use client";

import { useEffect, useState } from "react";

function getTimeRemaining() {
  const target = new Date("2026-12-03T08:00:00-03:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired: false };
}

export default function Countdown({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState(() => getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (time.expired)
    return <p className="text-sm font-medium text-brand-forest">Gracia Camp ya comenzó.</p>;

  const items = [
    { value: time.days, label: "días" },
    { value: time.hours, label: "hs" },
    { value: time.minutes, label: "min" },
    { value: time.seconds, label: "seg" },
  ];

  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3 sm:gap-5"}`} aria-label="Cuenta regresiva para Gracia Camp 2026">
      {items.map((item) => (
        <div key={item.label} className="min-w-10 text-center">
          <div className={`${compact ? "text-base" : "text-2xl sm:text-3xl"} font-semibold leading-none tabular-nums text-brand-forest`}>
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[11px] font-medium text-brand-muted">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
