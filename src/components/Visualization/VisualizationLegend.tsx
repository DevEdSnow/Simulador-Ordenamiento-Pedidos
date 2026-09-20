interface LegendItem {
  label: string;
  className: string;
}

const legendItems: LegendItem[] = [
  {
    label: "Normal",
    className: "legend-normal",
  },
  {
    label: "Comparando",
    className: "legend-comparing",
  },
  {
    label: "Intercambiando",
    className: "legend-swapping",
  },
  {
    label: "Ordenado",
    className: "legend-sorted",
  },
];

export function VisualizationLegend() {
  return (
    <div className="visualization-legend">
      <span className="visualization-legend-title">Estados:</span>

      <div className="visualization-legend-items">
        {legendItems.map((item) => (
          <div className="visualization-legend-item" key={item.label}>
            <span
              className={`visualization-legend-indicator ${item.className}`}
              aria-hidden="true"
            />

            <span className="visualization-legend-label">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisualizationLegend;