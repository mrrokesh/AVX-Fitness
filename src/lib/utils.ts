import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/data/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappUrl(phone: string, message: string) {
  const digits = phone.replace(/[^\d]/g, "");
  if (!digits) return siteConfig.instagramDmUrl;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function primaryChatUrl(message?: string) {
  if (siteConfig.whatsapp) {
    return whatsappUrl(siteConfig.whatsapp, message ?? siteConfig.whatsappPrefill);
  }
  return siteConfig.instagramDmUrl;
}

export function hasWhatsApp() {
  return Boolean(siteConfig.whatsapp?.replace(/[^\d]/g, ""));
}

export function telUrl(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function seatsRemaining(capacity: number, booked: number) {
  return Math.max(0, capacity - booked);
}

export function getUtmFromSearch(search: string) {
  const params = new URLSearchParams(search);
  return {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
  };
}

export function formatFollowers(n: number) {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "")}K+`;
  }
  return `${n}`;
}
