import type { Order } from "../../types/Order";

interface BarChartProps {
  orders: Order[];
  maxValue?: number;
}

function getBarHeight(
  priority: number,
  maxPriority: number
): number {
  if (maxPriority <= 0) {
    return 20;
  }

  const normalized =
    ((maxPriority - priority + 1) / maxPriority) * 100;

  return Math.max(20, Math.min(normalized, 100));
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

function getBarClass(priority: number): string {
  switch (priority) {
    case 1:
      return "order-bar-high";
    case 2:
      return "order-bar-medium-high";
    case 3:
      return "order-bar-medium";
    case 4:
      return "order-bar-low";
    default:
      return "order-bar-default";
  }
}

export function BarChart({
  orders,
  maxValue = 4,
}: BarChartProps) {
  const maxPriority = Math.max(
    maxValue,
    ...orders.map((order) => order.nivelPrioridad)
  );

  if (orders.length === 0) {
    return (
      <div className="bar-chart-empty">
        <p>No hay pedidos para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="bar-chart">
      <div className="bar-chart-y-axis">
        <span>Alta</span>
        <span>Media</span>
        <span>Baja</span>
      </div>

      <div className="bar-chart-content">
        <div className="bar-chart-grid">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="bar-chart-bars">
          {orders.map((order, index) => {
            const height = getBarHeight(
              order.nivelPrioridad,
              maxPriority
            );

            const barClass = getBarClass(
              order.nivelPrioridad
            );

            return (
              <div
                className="bar-chart-column"
                key={order.id}
              >
                <div className="bar-chart-value">
                  {order.nivelPrioridad}
                </div>

                <div
                  className={`bar-chart-bar ${barClass} ${
                    order.comparando
                      ? "bar-comparing"
                      : ""
                  } ${
                    order.intercambiando
                      ? "bar-swapping"
                      : ""
                  } ${
                    order.ordenado
                      ? "bar-sorted"
                      : ""
                  }`}
                  style={{
                    height: `${height}%`,
                  }}
                  title={`${order.codigo} - Prioridad ${order.nivelPrioridad} (${getPriorityLabel(
                    order.nivelPrioridad
                  )})`}
                >
                  <span className="bar-chart-bar-value">
                    {order.valor.toLocaleString("es-MX", {
                      style: "currency",
                      currency: "MXN",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>

                <span className="bar-chart-label">
                  {index + 1}
                </span>

                <span className="bar-chart-order-code">
                  {order.codigo}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BarChart;