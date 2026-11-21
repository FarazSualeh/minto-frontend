import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minto.example";
  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/home`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];
}
