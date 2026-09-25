import type { Algorithm } from "../../types/Algorithm";

interface ComplexityCardProps {
  algorithm: Algorithm;
  compact?: boolean;
}

export function ComplexityCard({
  algorithm,
  compact = false,
}: ComplexityCardProps) {
  const { timeComplexity, spaceComplexity, stable, inPlace } = algorithm;

  return (
    <article
      className={`complexity-card ${
        compact ? "complexity-card-compact" : ""
      }`}
    >
      <div className="complexity-card-header">
        <div>
          <span className="complexity-card-eyebrow">
            Complejidad
          </span>

          <h3 className="complexity-card-title">
            {algorithm.name}
          </h3>
        </div>

        <span className="complexity-card-badge">
          {inPlace ? "In-place" : "No in-place"}
        </span>
      </div>

      <div className="complexity-card-content">
        <div className="complexity-section">
          <span className="complexity-section-title">
            Complejidad temporal
          </span>

          <div className="complexity-grid">
            <div className="complexity-item">
              <span className="complexity-item-label">
                Mejor caso
              </span>

              <strong className="complexity-item-value">
                {timeComplexity.best}
              </strong>
            </div>

            <div className="complexity-item">
              <span className="complexity-item-label">
                Caso promedio
              </span>

              <strong className="complexity-item-value">
                {timeComplexity.average}
              </strong>
            </div>

            <div className="complexity-item">
              <span className="complexity-item-label">
                Peor caso
              </span>

              <strong className="complexity-item-value">
                {timeComplexity.worst}
              </strong>
            </div>
          </div>
        </div>

        <div className="complexity-section">
          <span className="complexity-section-title">
            Complejidad espacial
          </span>

          <div className="complexity-space">
            <strong className="complexity-space-value">
              {spaceComplexity}
            </strong>

            <span className="complexity-space-description">
              Memoria adicional
            </span>
          </div>
        </div>

        {!compact && (
          <div className="complexity-properties">
            <div className="complexity-property">
              <span className="complexity-property-label">
                Estable
              </span>

              <span
                className={`complexity-property-value ${
                  stable
                    ? "complexity-property-positive"
                    : "complexity-property-negative"
                }`}
              >
                {stable ? "Sí" : "No"}
              </span>
            </div>

            <div className="complexity-property">
              <span className="complexity-property-label">
                In-place
              </span>

              <span
                className={`complexity-property-value ${
                  inPlace
                    ? "complexity-property-positive"
                    : "complexity-property-negative"
                }`}
              >
                {inPlace ? "Sí" : "No"}
              </span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default ComplexityCard;