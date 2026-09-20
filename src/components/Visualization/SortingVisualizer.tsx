import type { Order } from "../../types/Order";

import BarChart from "./BarChart";
import VisualizationLegend from "./VisualizationLegend";

interface SortingVisualizerProps {
  orders: Order[];
  currentStep?: number;
  totalSteps?: number;
  isRunning?: boolean;
  title?: string;
}

export function SortingVisualizer({
  orders,
  currentStep = 0,
  totalSteps = 0,
  isRunning = false,
  title = "Visualización del ordenamiento",
}: SortingVisualizerProps) {
  const progress =
    totalSteps > 0
      ? Math.min((currentStep / totalSteps) * 100, 100)
      : 0;

  return (
    <section className="sorting-visualizer">
      <div className="sorting-visualizer-header">
        <div>
          <h2 className="sorting-visualizer-title">
            {title}
          </h2>

          <p className="sorting-visualizer-description">
            Visualización en tiempo real del algoritmo aplicado
            a los pedidos.
          </p>
        </div>

        <div className="sorting-visualizer-status">
          <span
            className={`visualizer-status-indicator ${
              isRunning
                ? "visualizer-status-running"
                : "visualizer-status-idle"
            }`}
          />

          <span>
            {isRunning
              ? "Ordenando..."
              : "Listo"}
          </span>
        </div>
      </div>

      <div className="sorting-visualizer-content">
        {orders.length > 0 ? (
          <BarChart orders={orders} />
        ) : (
          <div className="sorting-visualizer-empty">
            <span className="sorting-visualizer-empty-icon">
              📊
            </span>

            <h3>
              No hay pedidos para visualizar
            </h3>

            <p>
              Genera algunos pedidos para comenzar
              la simulación.
            </p>
          </div>
        )}
      </div>

      <div className="sorting-visualizer-footer">
        <div className="visualizer-progress-info">
          <span>
            Paso {currentStep} de {totalSteps}
          </span>

          <span>
            {Math.round(progress)}%
          </span>
        </div>

        <div className="visualizer-progress">
          <div
            className="visualizer-progress-bar"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <VisualizationLegend />
      </div>
    </section>
  );
}

export default SortingVisualizer;