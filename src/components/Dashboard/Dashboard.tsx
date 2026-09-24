import type { AlgorithmType, CodeLanguage } from "../../types/Algorithm";
import type { Order } from "../../types/Order";
import type {
  SimulationSpeed,
  SimulationStatus,
} from "../../types/Simulation";

import AlgorithmSelector from "../Controls/AlgorithmSelector";
import SimulationControls from "../Controls/SimulationControls";
import SpeedControl from "../Controls/SpeedControl";

import SortingVisualizer from "../Visualization/SortingVisualizer";

import CodeViewer from "../CodeViewer/CodeViewer";
import LanguageTabs from "../CodeViewer/LanguageTabs";

interface DashboardProps {
  orders: Order[];

  algorithm: AlgorithmType;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;

  speed: SimulationSpeed;
  onSpeedChange: (speed: SimulationSpeed) => void;

  status: SimulationStatus;
  currentStep: number;
  totalSteps: number;

  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onReset: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;

  language: CodeLanguage;
  onLanguageChange: (language: CodeLanguage) => void;

  currentCodeLine?: number;

  comparisons?: number;
  swaps?: number;
  executionTime?: number;
}

export function Dashboard({
  orders,
  algorithm,
  onAlgorithmChange,
  speed,
  onSpeedChange,
  status,
  currentStep,
  totalSteps,
  onStart,
  onPause,
  onResume,
  onStop,
  onReset,
  onNextStep,
  onPreviousStep,
  language,
  onLanguageChange,
  currentCodeLine,
  comparisons = 0,
  swaps = 0,
  executionTime = 0,
}: DashboardProps) {
  const isRunning = status === "RUNNING";

  const formattedExecutionTime = `${executionTime.toFixed(2)} ms`;

  return (
    <main className="dashboard">
      <div className="dashboard-container">
        {/* Encabezado */}
        <section className="dashboard-header">
          <div>
            <span className="dashboard-eyebrow">
              Simulador de algoritmos
            </span>

            <h1 className="dashboard-title">
              Ordenamiento de pedidos
            </h1>

            <p className="dashboard-description">
              Visualiza paso a paso cómo diferentes algoritmos
              organizan los pedidos según su prioridad.
            </p>
          </div>

          <div className="dashboard-summary">
            <div className="dashboard-summary-item">
              <span className="dashboard-summary-label">
                Pedidos
              </span>

              <strong className="dashboard-summary-value">
                {orders.length}
              </strong>
            </div>

            <div className="dashboard-summary-item">
              <span className="dashboard-summary-label">
                Comparaciones
              </span>

              <strong className="dashboard-summary-value">
                {comparisons}
              </strong>
            </div>

            <div className="dashboard-summary-item">
              <span className="dashboard-summary-label">
                Intercambios
              </span>

              <strong className="dashboard-summary-value">
                {swaps}
              </strong>
            </div>

            <div className="dashboard-summary-item">
              <span className="dashboard-summary-label">
                Tiempo
              </span>

              <strong className="dashboard-summary-value">
                {formattedExecutionTime}
              </strong>
            </div>
          </div>
        </section>

        {/* Configuración */}
        <section className="dashboard-configuration">
          <div className="dashboard-configuration-header">
            <div>
              <h2 className="dashboard-section-title">
                Configuración
              </h2>

              <p className="dashboard-section-description">
                Selecciona el algoritmo y la velocidad de la simulación.
              </p>
            </div>
          </div>

          <div className="dashboard-configuration-grid">
            <AlgorithmSelector
              value={algorithm}
              onChange={onAlgorithmChange}
              disabled={isRunning}
            />

            <SpeedControl
              value={speed}
              onChange={onSpeedChange}
              disabled={isRunning}
            />
          </div>
        </section>

        {/* Controles */}
        <SimulationControls
          status={status}
          currentStep={currentStep}
          totalSteps={totalSteps}
          onStart={onStart}
          onPause={onPause}
          onResume={onResume}
          onStop={onStop}
          onReset={onReset}
          onNextStep={onNextStep}
          onPreviousStep={onPreviousStep}
        />

        {/* Visualización */}
        <SortingVisualizer
          orders={orders}
          currentStep={currentStep}
          totalSteps={totalSteps}
          isRunning={isRunning}
        />

        {/* Código */}
        <section className="dashboard-code-section">
          <div className="dashboard-code-header">
            <div>
              <h2 className="dashboard-section-title">
                Implementación del algoritmo
              </h2>

              <p className="dashboard-section-description">
                Consulta el código utilizado durante la simulación.
              </p>
            </div>

            <LanguageTabs
              language={language}
              onChange={onLanguageChange}
              disabled={isRunning}
            />
          </div>

          <CodeViewer
            algorithm={algorithm}
            language={language}
            currentLine={currentCodeLine}
          />
        </section>
      </div>
    </main>
  );
}

export default Dashboard;