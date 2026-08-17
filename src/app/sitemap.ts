import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["campamento", "bienvenida", "registro", "reglamento", "privacidad"].map((route) => ({ url: `https://campamentocbg.vercel.app/${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route === "campamento" ? 1 : 0.7 }));
}
