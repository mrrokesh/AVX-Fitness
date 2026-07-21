"use client";

import ProfileCard from "@/components/bits/ProfileCard";
import { primaryChatUrl } from "@/lib/utils";

type Props = {
  name: string;
  title: string;
  handle: string;
  status: string;
  photo: string;
};

export function TrainerProfileCard({
  name,
  title,
  handle,
  status,
  photo,
}: Props) {
  return (
    <ProfileCard
      name={name}
      title={title}
      handle={handle}
      status={status}
      contactText="WhatsApp"
      avatarUrl={photo}
      miniAvatarUrl={photo}
      showUserInfo
      enableTilt
      enableMobileTilt={false}
      behindGlowEnabled={false}
      onContactClick={() => {
        window.open(primaryChatUrl(), "_blank", "noopener,noreferrer");
      }}
      className="w-full max-w-[380px]"
    />
  );
}
