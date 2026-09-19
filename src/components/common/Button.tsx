import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "ghost"
  | "outline";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "button-primary",
  secondary: "button-secondary",
  success: "button-success",
  danger: "button-danger",
  warning: "button-warning",
  info: "button-info",
  ghost: "button-ghost",
  outline: "button-outline",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "button-sm",
  md: "button-md",
  lg: "button-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "button",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "button-full-width" : "",
    loading ? "button-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="button-spinner" aria-hidden="true" />
      ) : (
        leftIcon && (
          <span className="button-icon button-icon-left">
            {leftIcon}
          </span>
        )
      )}

      <span className="button-content">
        {loading ? "Procesando..." : children}
      </span>

      {!loading && rightIcon && (
        <span className="button-icon button-icon-right">
          {rightIcon}
        </span>
      )}
    </button>
  );
}

export default Button;