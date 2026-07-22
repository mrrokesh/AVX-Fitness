"use client";

import ProfileCard from "@/components/bits/ProfileCard";
import { useHasMouseHover } from "@/lib/hooks/useHasMouseHover";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  title: string;
  handle: string;
  status: string;
  photo: string;
  contactText?: string;
  onContactClick?: () => void;
  className?: string;
};

/**
 * Desktop (mouse): ProfileCard tilt + holo hover.
 * Mobile / tablet (touch): daisyUI-style aura-rainbow — no tilt.
 */
export function AdaptiveCoachCard({
  name,
  title,
  handle,
  status,
  photo,
  contactText = "WhatsApp",
  onContactClick,
  className = "w-full max-w-[380px]",
}: Props) {
  const hasMouse = useHasMouseHover();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const card = (
    <ProfileCard
      name={name}
      title={title}
      handle={handle}
      status={status}
      contactText={contactText}
      avatarUrl={photo}
      iconUrl="/images/profile-icon-pattern.svg"
      showUserInfo
      showDetails={false}
      enableTilt={ready && hasMouse}
      enableMobileTilt={false}
      behindGlowEnabled={ready && hasMouse}
      behindGlowColor="rgba(224, 18, 54, 0.55)"
      onContactClick={onContactClick}
      className={ready && !hasMouse ? "w-full" : className}
    />
  );

  // Touch / tablet only — rainbow aura
  if (ready && !hasMouse) {
    return (
      <div className={`aura aura-rainbow aura-lg ${className}`.trim()}>
        <div className="aura-card w-full overflow-hidden rounded-[30px]">
          {card}
        </div>
      </div>
    );
  }

  // Desktop mouse (or pre-hydration static card)
  return card;
}
