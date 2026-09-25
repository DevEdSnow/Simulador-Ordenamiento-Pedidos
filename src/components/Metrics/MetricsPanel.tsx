import type { Algorithm } from "../../types/Algorithm";
import type { SimulationMetrics } from "../../types/Simulation";
import ComplexityCard from "./ComplexityCard";
import MetricCard from "./MetricCard";

interface MetricsPanelProps {
  algorithm: Algorithm;
  metrics: SimulationMetrics;
  title?: string;
  showComplexity?: boolean;
  compact?: boolean;
}

function formatExecutionTime(milliseconds: number): string {
  if (milliseconds < 1) {
    return `${milliseconds.toFixed(3)} ms`;
  }

  if (milliseconds < 1000) {
    return `${milliseconds.toFixed(2)} ms`;
  }

  return `${(milliseconds / 1000).toFixed(2)} s`;
}

export function MetricsPanel({
  algorithm,
  metrics,
  title = "Métricas de simulación",
  showComplexity = true,
  compact = false,
}: MetricsPanelProps) {
  const {
    comparisons,
    swaps,
    steps,
    executionTime,
    elements,
  } = metrics;

  return (
    <section className="metrics-panel">
      <div className="metrics-panel-header">
        <div>
          <span className="metrics-panel-eyebrow">
            Análisis
          </span>

          <h2 className="metrics-panel-title">
            {title}
          </h2>

          <p className="metrics-panel-description">
            Resultados obtenidos durante la ejecución de{" "}
            <strong>{algorithm.name}</strong>.
          </p>
        </div>

        <div className="metrics-panel-algorithm">
          <span className="metrics-panel-algorithm-label">
            Algoritmo
          </span>

          <strong className="metrics-panel-algorithm-name">
            {algorithm.name}
          </strong>
        </div>
      </div>

      <div className="metrics-panel-grid">
        <MetricCard
          title="Comparaciones"
          value={comparisons}
          description="Elementos comparados"
          variant="primary"
        />

        <MetricCard
          title="Intercambios"
          value={swaps}
          description="Operaciones realizadas"
          variant="warning"
        />

        <MetricCard
          title="Pasos"
          value={steps}
          description="Pasos de simulación"
          variant="info"
        />

        <MetricCard
          title="Tiempo"
          value={formatExecutionTime(executionTime)}
          description="Tiempo de ejecución"
          variant="success"
        />

        <MetricCard
          title="Elementos"
          value={elements}
          description="Pedidos procesados"
          variant="purple"
        />
      </div>

      {showComplexity && (
        <div className="metrics-panel-complexity">
          <ComplexityCard
            algorithm={algorithm}
            compact={compact}
          />
        </div>
      )}
    </section>
  );
}

export default MetricsPanel;