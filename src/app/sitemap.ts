import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";
import { trainers } from "@/data/trainers";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/programs",
    "/trainers",
    "/transformations",
    "/consultation",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/cancellation",
    "/portal",
    "/locations/personal-trainer",
    "/locations/best-gym",
    "/locations/weight-loss-coaching",
    "/locations/muscle-building-program",
    "/locations/online-fitness-coaching",
    "/locations/womens-fitness-program",
    "/locations/beginner-gym-program",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...programs.map((p) => ({
      url: `${base}/programs/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...trainers.map((t) => ({
      url: `${base}/trainers/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
