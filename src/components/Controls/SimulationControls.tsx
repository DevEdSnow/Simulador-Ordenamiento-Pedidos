import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Square,
} from "lucide-react";
import type { SimulationStatus } from "../../types/Simulation";
import Button from "../common/Button";

interface SimulationControlsProps {
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
  disabled?: boolean;
}

export function SimulationControls({
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
  disabled = false,
}: SimulationControlsProps) {
  const isIdle = status === "IDLE";
  const isRunning = status === "RUNNING";
  const isPaused = status === "PAUSED";
  const isCompleted = status === "COMPLETED";

  const canGoPrevious = currentStep > 0;
  const canGoNext = currentStep < totalSteps;

  const progress =
    totalSteps > 0
      ? Math.min((currentStep / totalSteps) * 100, 100)
      : 0;

  const statusLabel = (() => {
    switch (status) {
      case "RUNNING":
        return "Ejecutando";
      case "PAUSED":
        return "Pausada";
      case "COMPLETED":
        return "Completada";
      default:
        return "Lista";
    }
  })();

  return (
    <section className="simulation-controls">
      <div className="simulation-controls-header">
        <div>
          <h2 className="simulation-controls-title">
            Controles de simulación
          </h2>

          <p className="simulation-controls-description">
            Controla la ejecución paso a paso del algoritmo de ordenamiento.
          </p>
        </div>

        <span
          className={`simulation-status simulation-status-${status.toLowerCase()}`}
        >
          <span
            className="simulation-status-indicator"
            aria-hidden="true"
          />
          {statusLabel}
        </span>
      </div>

      <div className="simulation-controls-progress">
        <div className="simulation-progress-header">
          <span>Progreso</span>

          <span>
            Paso {currentStep} de {totalSteps}
          </span>
        </div>

        <div
          className="simulation-progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-valuenow={currentStep}
          aria-label="Progreso de la simulación"
        >
          <div
            className="simulation-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="simulation-controls-actions">
        <div className="simulation-controls-navigation">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviousStep}
            disabled={
              disabled ||
              isRunning ||
              !canGoPrevious
            }
            leftIcon={<ChevronLeft size={17} />}
          >
            Anterior
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onNextStep}
            disabled={
              disabled ||
              isRunning ||
              !canGoNext
            }
            rightIcon={<ChevronRight size={17} />}
          >
            Siguiente
          </Button>
        </div>

        <div className="simulation-controls-main">
          {isIdle && (
            <Button
              variant="primary"
              size="md"
              onClick={onStart}
              disabled={disabled || totalSteps === 0}
              leftIcon={<Play size={18} />}
            >
              Iniciar
            </Button>
          )}

          {isRunning && (
            <Button
              variant="warning"
              size="md"
              onClick={onPause}
              disabled={disabled}
              leftIcon={<Pause size={18} />}
            >
              Pausar
            </Button>
          )}

          {isPaused && (
            <Button
              variant="success"
              size="md"
              onClick={onResume}
              disabled={disabled}
              leftIcon={<Play size={18} />}
            >
              Reanudar
            </Button>
          )}

          {isCompleted && (
            <Button
              variant="success"
              size="md"
              onClick={onReset}
              disabled={disabled}
              leftIcon={<RotateCcw size={18} />}
            >
              Reiniciar
            </Button>
          )}

          {(isRunning || isPaused) && (
            <Button
              variant="danger"
              size="md"
              onClick={onStop}
              disabled={disabled}
              leftIcon={<Square size={17} />}
            >
              Detener
            </Button>
          )}

          {!isIdle && !isCompleted && (
            <Button
              variant="ghost"
              size="md"
              onClick={onReset}
              disabled={disabled}
              leftIcon={<RotateCcw size={17} />}
            >
              Reiniciar
            </Button>
          )}
        </div>
      </div>

      <div className="simulation-controls-summary">
        <span>
          Estado: <strong>{statusLabel}</strong>
        </span>

        <span>
          {totalSteps > 0
            ? `${Math.round(progress)}% completado`
            : "Sin pasos disponibles"}
        </span>
      </div>
    </section>
  );
}

export default SimulationControls;