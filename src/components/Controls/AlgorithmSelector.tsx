import type { ChangeEvent } from "react";
import type { AlgorithmType } from "../../types/Algorithm";
import { ALGORITHMS } from "../../types/Algorithm";

interface AlgorithmSelectorProps {
  value: AlgorithmType;
  onChange: (algorithm: AlgorithmType) => void;
  disabled?: boolean;
  label?: string;
  showDescription?: boolean;
}

export function AlgorithmSelector({
  value,
  onChange,
  disabled = false,
  label = "Algoritmo de ordenamiento",
  showDescription = true,
}: AlgorithmSelectorProps) {
  const selectedAlgorithm = ALGORITHMS.find(
    (algorithm) => algorithm.type === value,
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as AlgorithmType);
  };

  return (
    <div className="algorithm-selector">
      <label htmlFor="algorithm-select" className="algorithm-selector-label">
        {label}
      </label>

      <select
        id="algorithm-select"
        className="algorithm-selector-select"
        value={value}
        onChange={handleChange}
        disabled={disabled}
      >
        {ALGORITHMS.map((algorithm) => (
          <option key={algorithm.type} value={algorithm.type}>
            {algorithm.name}
          </option>
        ))}
      </select>

      {showDescription && selectedAlgorithm && (
        <div className="algorithm-selector-info">
          <p className="algorithm-selector-description">
            {selectedAlgorithm.description}
          </p>

          <div className="algorithm-selector-complexity">
            <span>
              <strong>Mejor caso:</strong>{" "}
              {selectedAlgorithm.timeComplexity.best}
            </span>

            <span>
              <strong>Caso promedio:</strong>{" "}
              {selectedAlgorithm.timeComplexity.average}
            </span>

            <span>
              <strong>Peor caso:</strong>{" "}
              {selectedAlgorithm.timeComplexity.worst}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlgorithmSelector;