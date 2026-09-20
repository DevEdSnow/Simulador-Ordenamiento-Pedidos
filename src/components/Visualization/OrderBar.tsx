import type { CSSProperties } from "react";
import type { Order } from "../../types/Order";

interface OrderBarProps {
  order: Order;
  index: number;
  maxPriority?: number;
  showValue?: boolean;
  showCode?: boolean;
  animated?: boolean;
}

function getBarHeight(
  priority: number,
  maxPriority: number
): number {
  if (maxPriority <= 0) {
    return 25;
  }

  const height =
    ((maxPriority - priority + 1) / maxPriority) * 100;

  return Math.max(20, Math.min(height, 100));
}

function getPriorityLabel(priority: number): string {
  switch (priority) {
    case 1:
      return "Alta";
    case 2:
      return "Media-alta";
    case 3:
      return "Media";
    case 4:
      return "Baja";
    default:
      return "Normal";
  }
}

function getPriorityClass(priority: number): string {
  switch (priority) {
    case 1:
      return "order-bar-priority-high";
    case 2:
      return "order-bar-priority-medium-high";
    case 3:
      return "order-bar-priority-medium";
    case 4:
      return "order-bar-priority-low";
    default:
      return "order-bar-priority-default";
  }
}

function getStateClass(order: Order): string {
  if (order.intercambiando) {
    return "order-bar-swapping";
  }

  if (order.comparando) {
    return "order-bar-comparing";
  }

  if (order.ordenado) {
    return "order-bar-sorted";
  }

  return "";
}

export function OrderBar({
  order,
  index,
  maxPriority = 4,
  showValue = true,
  showCode = true,
  animated = true,
}: OrderBarProps) {
  const height = getBarHeight(
    order.nivelPrioridad,
    maxPriority
  );

  const priorityClass = getPriorityClass(
    order.nivelPrioridad
  );

  const stateClass = getStateClass(order);

  const animationClass = animated
    ? "order-bar-animated"
    : "";

  const barStyle: CSSProperties = {
    height: `${height}%`,
  };

  const formattedValue = order.valor.toLocaleString(
    "es-MX",
    {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }
  );

  return (
    <div
      className={`order-bar-container ${stateClass}`}
      title={`${order.codigo} - ${order.cliente}`}
    >
      <div className="order-bar-value">
        {showValue && formattedValue}
      </div>

      <div className="order-bar-wrapper">
        <div
          className={`order-bar ${priorityClass} ${animationClass}`}
          style={barStyle}
          aria-label={`Pedido ${
            order.codigo
          }, prioridad ${
            order.nivelPrioridad
          }, ${getPriorityLabel(
            order.nivelPrioridad
          )}`}
        >
          <span className="order-bar-priority">
            {order.nivelPrioridad}
          </span>

          {order.comparando && (
            <span
              className="order-bar-state"
              aria-label="Comparando"
            >
              ⚖
            </span>
          )}

          {order.intercambiando && (
            <span
              className="order-bar-state"
              aria-label="Intercambiando"
            >
              ↔
            </span>
          )}

          {order.ordenado && (
            <span
              className="order-bar-state"
              aria-label="Ordenado"
            >
              ✓
            </span>
          )}
        </div>
      </div>

      <div className="order-bar-index">
        {index + 1}
      </div>

      {showCode && (
        <div
          className="order-bar-code"
          title={order.codigo}
        >
          {order.codigo}
        </div>
      )}

      <div className="order-bar-client">
        {order.cliente}
      </div>
    </div>
  );
}

export default OrderBar;