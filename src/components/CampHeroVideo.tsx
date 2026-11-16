"use client";

import { useEffect, useRef } from "react";

export default function CampHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1.5;
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Vista de Monte Aramí"
      className="absolute inset-0 -z-20 h-full w-full object-cover"
      onLoadedMetadata={(event) => { event.currentTarget.playbackRate = 1.5; }}
    >
      <source src="/videos/monte-arami.mp4" type="video/mp4" />
    </video>
  );
}
