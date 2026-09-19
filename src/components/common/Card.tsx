import type { HTMLAttributes, ReactNode } from "react";

export type CardVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default: "card-default",
  primary: "card-primary",
  success: "card-success",
  warning: "card-warning",
  danger: "card-danger",
  info: "card-info",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "card-padding-none",
  sm: "card-padding-sm",
  md: "card-padding-md",
  lg: "card-padding-lg",
};

export function Card({
  children,
  variant = "default",
  padding = "md",
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  const classes = [
    "card",
    variantClasses[variant],
    paddingClasses[padding],
    hoverable ? "card-hoverable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export default Card;