import type { ChangeEvent } from "react";
import type { SimulationSpeed } from "../../types/Simulation";

interface SpeedOption {
  value: SimulationSpeed;
  label: string;
  description: string;
}

interface SpeedControlProps {
  value: SimulationSpeed;
  onChange: (speed: SimulationSpeed) => void;
  disabled?: boolean;
  label?: string;
}

const speedOptions: SpeedOption[] = [
  {
    value: 1000,
    label: "Muy lento",
    description: "1 segundo por paso",
  },
  {
    value: 500,
    label: "Lento",
    description: "0.5 segundos por paso",
  },
  {
    value: 250,
    label: "Normal",
    description: "0.25 segundos por paso",
  },
  {
    value: 100,
    label: "Rápido",
    description: "0.1 segundos por paso",
  },
  {
    value: 25,
    label: "Muy rápido",
    description: "0.025 segundos por paso",
  },
];

export function SpeedControl({
  value,
  onChange,
  disabled = false,
  label = "Velocidad de simulación",
}: SpeedControlProps) {
  const selectedSpeed = speedOptions.find(
    (option) => option.value === value,
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(event.target.value) as SimulationSpeed);
  };

  return (
    <div className="speed-control">
      <label htmlFor="speed-select" className="speed-control-label">
        {label}
      </label>

      <div className="speed-control-content">
        <select
          id="speed-select"
          className="speed-control-select"
          value={value}
          onChange={handleChange}
          disabled={disabled}
        >
          {speedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="speed-control-info">
          <span className="speed-control-value">
            {selectedSpeed?.label ?? "Normal"}
          </span>

          <span className="speed-control-description">
            {selectedSpeed?.description ?? "0.25 segundos por paso"}
          </span>
        </div>
      </div>

      <div className="speed-control-scale">
        {speedOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`speed-control-marker ${
              option.value === value ? "speed-control-marker-active" : ""
            }`}
            onClick={() => onChange(option.value)}
            disabled={disabled}
            aria-label={`Seleccionar velocidad ${option.label}`}
            title={option.description}
          >
            <span className="speed-control-marker-dot" />
            <span className="speed-control-marker-label">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SpeedControl;