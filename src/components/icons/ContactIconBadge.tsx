import type { ComponentType, SVGProps } from "react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { LocationIcon } from "@/components/icons/LocationIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";

export type ContactIconKind = "whatsapp" | "phone" | "instagram" | "location";

const iconMap: Record<ContactIconKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  whatsapp: WhatsAppIcon,
  phone: PhoneIcon,
  instagram: InstagramIcon,
  location: LocationIcon,
};

type ContactIconBadgeProps = {
  kind: ContactIconKind;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function ContactIconBadge({ kind, size = "md", className }: ContactIconBadgeProps) {
  return (
    <span
      className={cn(
        "contact-icon-badge",
        `contact-icon-badge--${kind}`,
        size === "sm" && "contact-icon-badge--sm",
        size === "lg" && "contact-icon-badge--lg",
        className
      )}
    >
      {kind === "instagram" ? (
        <InstagramIcon variant="brand" className="contact-icon-badge__svg contact-icon-badge__ig" />
      ) : (
        (() => {
          const Icon = iconMap[kind];
          return <Icon className="contact-icon-badge__svg" />;
        })()
      )}
    </span>
  );
}

type ContactLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  kind: ContactIconKind;
  external?: boolean;
};

export function ContactLink({
  kind,
  external,
  className,
  children,
  ...props
}: ContactLinkProps) {
  return (
    <a
      className={cn("contact-link", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <ContactIconBadge kind={kind} size="sm" />
      <span>{children}</span>
    </a>
  );
}
