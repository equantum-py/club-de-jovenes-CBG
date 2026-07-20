"use client";

import { useEffect, useState } from "react";

function getTimeRemaining() {
  const target = new Date("2026-12-11T00:00:00-03:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired: false };
}

export default function Countdown() {
  const [time, setTime] = useState(() => getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { value: time.days, label: "días" },
    { value: time.hours, label: "horas" },
    { value: time.minutes, label: "mins." },
    { value: time.seconds, label: "segs." },
  ];

  return (
    <div className="inline-flex items-center gap-4 rounded-2xl bg-white px-6 py-4 shadow-lg">
      {/* Icon + Text */}
      <div className="flex flex-col items-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-1">
          <circle cx="20" cy="20" r="18" stroke="#dc2626" strokeWidth="3" fill="none"/>
          <circle cx="20" cy="20" r="14" fill="#fef3c7"/>
          <line x1="20" y1="20" x2="20" y2="10" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="20" y1="20" x2="26" y2="20" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="20" cy="20" r="2" fill="#dc2626"/>
          {/* Fire */}
          <path d="M28 28 Q30 24 32 26 Q34 22 30 20 Q28 18 26 22 Q24 26 28 28Z" fill="#f59e0b"/>
          <path d="M29 27 Q30 24 31 25 Q32 23 30 22 Q29 21 28 23 Q27 25 29 27Z" fill="#ef4444"/>
        </svg>
        <span className="text-xs font-black uppercase tracking-tight" style={{ color: "#dc2626" }}>
          ¡¡INSCRIBITE YA!!
        </span>
      </div>

      {/* Divider */}
      <div className="h-12 w-px bg-gray-200" />

      {/* Numbers */}
      <div className="flex items-center gap-3">
        {items.map((item, index) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-3xl font-bold tabular-nums leading-none" style={{ color: "#1a1a1a" }}>
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-xs font-medium lowercase" style={{ color: "#dc2626" }}>
                {item.label}
              </div>
            </div>
            {index < items.length - 1 && (
              <span className="text-2xl font-light" style={{ color: "#9ca3af" }}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
