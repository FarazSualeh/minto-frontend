import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minto.example";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/home", "/categories", "/search"],
      disallow: ["/account", "/admin", "/cart", "/login", "/partner", "/register", "/orders", "/saved"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
