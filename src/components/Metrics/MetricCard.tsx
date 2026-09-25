import type { ReactNode } from "react";

export type MetricCardVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "purple";

export type MetricCardSize = "sm" | "md" | "lg";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  variant?: MetricCardVariant;
  size?: MetricCardSize;
  trend?: string;
  trendPositive?: boolean;
  footer?: ReactNode;
  className?: string;
}

const variantClasses: Record<MetricCardVariant, string> = {
  default: "metric-card-default",
  primary: "metric-card-primary",
  success: "metric-card-success",
  warning: "metric-card-warning",
  danger: "metric-card-danger",
  info: "metric-card-info",
  purple: "metric-card-purple",
};

const sizeClasses: Record<MetricCardSize, string> = {
  sm: "metric-card-sm",
  md: "metric-card-md",
  lg: "metric-card-lg",
};

export function MetricCard({
  title,
  value,
  description,
  icon,
  variant = "default",
  size = "md",
  trend,
  trendPositive,
  footer,
  className = "",
}: MetricCardProps) {
  const classes = [
    "metric-card",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      <div className="metric-card-header">
        <div className="metric-card-title-container">
          <span className="metric-card-title">{title}</span>

          {description && (
            <span className="metric-card-description">
              {description}
            </span>
          )}
        </div>

        {icon && (
          <div className="metric-card-icon" aria-hidden="true">
            {icon}
          </div>
        )}
      </div>

      <div className="metric-card-content">
        <strong className="metric-card-value">
          {value}
        </strong>

        {trend && (
          <span
            className={`metric-card-trend ${
              trendPositive === true
                ? "metric-card-trend-positive"
                : trendPositive === false
                  ? "metric-card-trend-negative"
                  : "metric-card-trend-neutral"
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {footer && (
        <div className="metric-card-footer">
          {footer}
        </div>
      )}
    </article>
  );
}

export default MetricCard;