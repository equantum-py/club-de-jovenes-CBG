"use client";

import { useEffect, useState } from "react";
import MerchSection from "@/components/MerchSection";
import type { MerchSettings } from "@/lib/merch-settings";

type Payload = MerchSettings & {
  shirtImageUrl: string;
  capImageUrl: string;
};

export default function MerchSectionPublic() {
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/api/merch", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  const { shirtImageUrl, capImageUrl, ...settings } = data;
  return (
    <MerchSection
      settings={settings}
      shirtImageUrl={shirtImageUrl}
      capImageUrl={capImageUrl}
    />
  );
}
