import type { Order } from "../../types/Order";
import OrderRow from "./OrderRow";

interface OrdersTableProps {
  orders: Order[];
  onOrderClick?: (order: Order) => void;
  onOrderRemove?: (order: Order) => void;
  selectedOrderId?: number;
  showIndex?: boolean;
  showActions?: boolean;
  title?: string;
  description?: string;
  emptyMessage?: string;
}

export function OrdersTable({
  orders,
  onOrderClick,
  onOrderRemove,
  selectedOrderId,
  showIndex = true,
  showActions = false,
  title = "Pedidos",
  description = "Lista de pedidos utilizados en la simulación.",
  emptyMessage = "No hay pedidos disponibles.",
}: OrdersTableProps) {
  return (
    <section className="orders-table">
      <div className="orders-table-header">
        <div className="orders-table-heading">
          <span className="orders-table-eyebrow">
            Gestión de pedidos
          </span>

          <h2 className="orders-table-title">
            {title}
          </h2>

          <p className="orders-table-description">
            {description}
          </p>
        </div>

        <div className="orders-table-count">
          <span className="orders-table-count-label">
            Total
          </span>

          <strong className="orders-table-count-value">
            {orders.length}
          </strong>
        </div>
      </div>

      <div className="orders-table-container">
        {orders.length === 0 ? (
          <div className="orders-table-empty">
            <div
              className="orders-table-empty-icon"
              aria-hidden="true"
            >
              📦
            </div>

            <h3 className="orders-table-empty-title">
              {emptyMessage}
            </h3>

            <p className="orders-table-empty-description">
              Genera nuevos pedidos para comenzar la simulación.
            </p>
          </div>
        ) : (
          <div className="orders-table-scroll">
            <table className="orders-table-element">
              <thead className="orders-table-head">
                <tr>
                  {showIndex && (
                    <th scope="col" className="orders-table-th orders-table-th-index">
                      #
                    </th>
                  )}

                  <th scope="col" className="orders-table-th">
                    Código
                  </th>

                  <th scope="col" className="orders-table-th">
                    Cliente
                  </th>

                  <th scope="col" className="orders-table-th">
                    Producto
                  </th>

                  <th scope="col" className="orders-table-th orders-table-th-center">
                    Cantidad
                  </th>

                  <th scope="col" className="orders-table-th orders-table-th-right">
                    Precio
                  </th>

                  <th scope="col" className="orders-table-th orders-table-th-right">
                    Valor
                  </th>

                  <th scope="col" className="orders-table-th">
                    Prioridad
                  </th>

                  <th scope="col" className="orders-table-th">
                    Estado
                  </th>

                  {showActions && (
                    <th
                      scope="col"
                      className="orders-table-th orders-table-th-actions"
                    >
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="orders-table-body">
                {orders.map((order, index) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    index={index}
                    onClick={onOrderClick}
                    onRemove={onOrderRemove}
                    selected={selectedOrderId === order.id}
                    showIndex={showIndex}
                    showActions={showActions}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {orders.length > 0 && (
        <div className="orders-table-footer">
          <span className="orders-table-footer-text">
            Mostrando{" "}
            <strong>{orders.length}</strong>{" "}
            {orders.length === 1 ? "pedido" : "pedidos"}
          </span>

          <div className="orders-table-footer-status">
            <span
              className="orders-table-footer-indicator"
              aria-hidden="true"
            />

            <span>
              Pedidos disponibles para simulación
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrdersTable;