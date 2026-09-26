import type { EstadoPedido } from "../../types/Order";

interface OrderStatusProps {
  status: EstadoPedido;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
}

interface StatusConfig {
  label: string;
  icon: string;
  className: string;
}

const statusConfig: Record<EstadoPedido, StatusConfig> = {
  PENDIENTE: {
    label: "Pendiente",
    icon: "○",
    className: "order-status-pending",
  },
  PROCESANDO: {
    label: "Procesando",
    icon: "◌",
    className: "order-status-processing",
  },
  ENVIADO: {
    label: "Enviado",
    icon: "→",
    className: "order-status-shipped",
  },
  ENTREGADO: {
    label: "Entregado",
    icon: "✓",
    className: "order-status-delivered",
  },
  CANCELADO: {
    label: "Cancelado",
    icon: "×",
    className: "order-status-cancelled",
  },
};

export function OrderStatus({
  status,
  size = "md",
  showIcon = true,
  showLabel = true,
  className = "",
}: OrderStatusProps) {
  const config = statusConfig[status];

  const classes = [
    "order-status",
    config.className,
    `order-status-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      title={config.label}
      aria-label={`Estado del pedido: ${config.label}`}
    >
      {showIcon && (
        <span
          className="order-status-icon"
          aria-hidden="true"
        >
          {config.icon}
        </span>
      )}

      {showLabel && (
        <span className="order-status-label">
          {config.label}
        </span>
      )}
    </span>
  );
}

export default OrderStatus;