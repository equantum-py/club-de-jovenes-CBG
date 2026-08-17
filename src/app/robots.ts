import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/registro/confirmacion"] }, sitemap: "https://campamentocbg.vercel.app/sitemap.xml", host: "https://campamentocbg.vercel.app" };
}
