"use client";

import type { SVGProps } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

type InstagramIconProps = SVGProps<SVGSVGElement> & {
  variant?: "outline" | "brand";
};

export function InstagramIcon({
  className,
  variant = "outline",
  ...props
}: InstagramIconProps) {
  const gradientId = useId();

  if (variant === "brand") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden {...props}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f58529" />
            <stop offset="35%" stopColor="#dd2a7b" />
            <stop offset="70%" stopColor="#8134af" />
            <stop offset="100%" stopColor="#515bd4" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" fill={`url(#${gradientId})`} />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.75" />
        <circle cx="17.35" cy="6.65" r="1.15" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      aria-hidden
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
