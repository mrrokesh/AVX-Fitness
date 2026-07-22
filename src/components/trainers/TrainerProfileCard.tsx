"use client";

import { AdaptiveCoachCard } from "@/components/trainers/AdaptiveCoachCard";
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
    <AdaptiveCoachCard
      name={name}
      title={title}
      handle={handle}
      status={status}
      photo={photo}
      onContactClick={() => {
        window.open(primaryChatUrl(), "_blank", "noopener,noreferrer");
      }}
    />
  );
}
