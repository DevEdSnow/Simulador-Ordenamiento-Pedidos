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

export type BadgeSize =
  | "sm"
  | "md"
  | "lg";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  outlined?: boolean;
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<
  BadgeVariant,
  {
    solid: string;
    outlined: string;
    dot: string;
  }
> = {
  default: {
    solid: "badge-default",
    outlined: "badge-default-outline",
    dot: "badge-default-dot",
  },

  primary: {
    solid: "badge-primary",
    outlined: "badge-primary-outline",
    dot: "badge-primary-dot",
  },

  success: {
    solid: "badge-success",
    outlined: "badge-success-outline",
    dot: "badge-success-dot",
  },

  warning: {
    solid: "badge-warning",
    outlined: "badge-warning-outline",
    dot: "badge-warning-dot",
  },

  danger: {
    solid: "badge-danger",
    outlined: "badge-danger-outline",
    dot: "badge-danger-dot",
  },

  info: {
    solid: "badge-info",
    outlined: "badge-info-outline",
    dot: "badge-info-dot",
  },

  purple: {
    solid: "badge-purple",
    outlined: "badge-purple-outline",
    dot: "badge-purple-dot",
  },

  gray: {
    solid: "badge-gray",
    outlined: "badge-gray-outline",
    dot: "badge-gray-dot",
  },
};

const sizeClasses: Record<
  BadgeSize,
  string
> = {
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
  const selectedVariant =
    variantClasses[variant];

  const classes = [
    "badge",
    sizeClasses[size],
    outlined
      ? selectedVariant.outlined
      : selectedVariant.solid,
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

    {children}
  </span>
);
}

export default Badge;