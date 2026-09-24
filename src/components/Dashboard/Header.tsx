interface HeaderProps {
  title?: string;
  subtitle?: string;
  algorithmName?: string;
  status?: "IDLE" | "RUNNING" | "PAUSED" | "COMPLETED";
}

export function Header({
  title = "Simulador de Ordenamiento de Pedidos",
  subtitle = "Visualiza y analiza algoritmos de ordenamiento paso a paso.",
  algorithmName = "Bubble Sort",
  status = "IDLE",
}: HeaderProps) {
  const statusLabels: Record<HeaderProps["status"], string> = {
    IDLE: "Listo",
    RUNNING: "Ejecutando",
    PAUSED: "Pausado",
    COMPLETED: "Completado",
  };

  const statusLabel = statusLabels[status];

  return (
    <header className="dashboard-header-bar">
      <div className="dashboard-header-brand">
        <div className="dashboard-header-logo" aria-hidden="true">
          SO
        </div>

        <div className="dashboard-header-text">
          <h1 className="dashboard-header-title">
            {title}
          </h1>

          <p className="dashboard-header-subtitle">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="dashboard-header-info">
        <div className="dashboard-header-algorithm">
          <span className="dashboard-header-info-label">
            Algoritmo
          </span>

          <strong className="dashboard-header-info-value">
            {algorithmName}
          </strong>
        </div>

        <div className="dashboard-header-status">
          <span
            className={`dashboard-header-status-dot dashboard-header-status-${status.toLowerCase()}`}
            aria-hidden="true"
          />

          <div>
            <span className="dashboard-header-info-label">
              Estado
            </span>

            <strong className="dashboard-header-info-value">
              {statusLabel}
            </strong>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;