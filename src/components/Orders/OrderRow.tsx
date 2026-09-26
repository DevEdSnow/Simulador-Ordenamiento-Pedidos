import type { Order } from "../../types/Order";
import OrderStatus from "./OrderStatus";

interface OrderRowProps {
  order: Order;
  index?: number;
  onClick?: (order: Order) => void;
  onRemove?: (order: Order) => void;
  showIndex?: boolean;
  showActions?: boolean;
  selected?: boolean;
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
      return "order-row-priority-high";
    case 2:
      return "order-row-priority-medium-high";
    case 3:
      return "order-row-priority-medium";
    case 4:
      return "order-row-priority-low";
    default:
      return "order-row-priority-default";
  }
}

export function OrderRow({
  order,
  index = 0,
  onClick,
  onRemove,
  showIndex = true,
  showActions = false,
  selected = false,
}: OrderRowProps) {
  const handleRowClick = () => {
    onClick?.(order);
  };

  const handleRemove = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    onRemove?.(order);
  };

  const priorityClass = getPriorityClass(order.nivelPrioridad);
  const priorityLabel = getPriorityLabel(order.nivelPrioridad);

  const formattedPrice = order.precio.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });

  const formattedValue = order.valor.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });

  return (
    <tr
      className={[
        "order-row",
        selected ? "order-row-selected" : "",
        order.comparando ? "order-row-comparing" : "",
        order.intercambiando ? "order-row-swapping" : "",
        order.ordenado ? "order-row-sorted" : "",
        onClick ? "order-row-clickable" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleRowClick}
    >
      {showIndex && (
        <td className="order-row-index">
          {index + 1}
        </td>
      )}

      <td className="order-row-code">
        <span className="order-row-code-value">
          {order.codigo}
        </span>
      </td>

      <td className="order-row-client">
        <div className="order-row-client-content">
          <span className="order-row-client-name">
            {order.cliente}
          </span>
        </div>
      </td>

      <td className="order-row-product">
        <span className="order-row-product-name">
          {order.producto}
        </span>
      </td>

      <td className="order-row-quantity">
        {order.cantidad}
      </td>

      <td className="order-row-price">
        {formattedPrice}
      </td>

      <td className="order-row-value">
        <strong>{formattedValue}</strong>
      </td>

      <td className="order-row-priority">
        <span
          className={`order-row-priority-badge ${priorityClass}`}
          title={`Prioridad ${order.nivelPrioridad}: ${priorityLabel}`}
        >
          <span className="order-row-priority-number">
            {order.nivelPrioridad}
          </span>

          <span className="order-row-priority-label">
            {priorityLabel}
          </span>
        </span>
      </td>

      <td className="order-row-status">
        <OrderStatus status={order.estado} />
      </td>

      {showActions && (
        <td className="order-row-actions">
          {onRemove && (
            <button
              type="button"
              className="order-row-remove"
              onClick={handleRemove}
              aria-label={`Eliminar pedido ${order.codigo}`}
              title="Eliminar pedido"
            >
              ×
            </button>
          )}
        </td>
      )}
    </tr>
  );
}

export default OrderRow;