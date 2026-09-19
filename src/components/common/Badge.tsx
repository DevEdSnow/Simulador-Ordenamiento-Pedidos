import type { ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple"
  | "gray";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  outlined?: boolean;
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "badge-default",
  primary: "badge-primary",
  success: "badge-success",
  warning: "badge-warning",
  danger: "badge-danger",
  info: "badge-info",
  purple: "badge-purple",
  gray: "badge-gray",
};

const outlineClasses: Record<BadgeVariant, string> = {
  default: "badge-default-outline",
  primary: "badge-primary-outline",
  success: "badge-success-outline",
  warning: "badge-warning-outline",
  danger: "badge-danger-outline",
  info: "badge-info-outline",
  purple: "badge-purple-outline",
  gray: "badge-gray-outline",
};

const dotClasses: Record<BadgeVariant, string> = {
  default: "badge-default-dot",
  primary: "badge-primary-dot",
  success: "badge-success-dot",
  warning: "badge-warning-dot",
  danger: "badge-danger-dot",
  info: "badge-info-dot",
  purple: "badge-purple-dot",
  gray: "badge-gray-dot",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "badge-sm",
  md: "badge-md",
  lg: "badge-lg",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  outlined = false,
  dot = false,
  className = "",
}: BadgeProps) {
  const badgeVariant = outlined
    ? outlineClasses[variant]
    : variantClasses[variant];

  const classes = [
    "badge",
    sizeClasses[size],
    badgeVariant,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {dot && (
        <span
          className={`badge-dot ${dotClasses[variant]}`}
          aria-hidden="true"
        />
      )}

      <span className="badge-content">
        {children}
      </span>
    </span>
  );
}

export default Badge;