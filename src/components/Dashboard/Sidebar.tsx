interface SidebarItem {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface SidebarProps {
  activeItem?: string;
  onItemChange?: (itemId: string) => void;
  collapsed?: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "simulation",
    label: "Simulación",
    description: "Ejecuta el algoritmo",
    icon: "▶",
  },
  {
    id: "orders",
    label: "Pedidos",
    description: "Gestiona los pedidos",
    icon: "▦",
  },
  {
    id: "algorithms",
    label: "Algoritmos",
    description: "Consulta los algoritmos",
    icon: "↕",
  },
  {
    id: "metrics",
    label: "Métricas",
    description: "Analiza los resultados",
    icon: "▥",
  },
  {
    id: "code",
    label: "Código",
    description: "Consulta la implementación",
    icon: "</>",
  },
];

export function Sidebar({
  activeItem = "simulation",
  onItemChange,
  collapsed = false,
}: SidebarProps) {
  const handleItemClick = (itemId: string) => {
    onItemChange?.(itemId);
  };

  return (
    <aside
      className={`dashboard-sidebar ${
        collapsed ? "dashboard-sidebar-collapsed" : ""
      }`}
    >
      <div className="dashboard-sidebar-header">
        <div className="dashboard-sidebar-logo" aria-hidden="true">
          SO
        </div>

        {!collapsed && (
          <div className="dashboard-sidebar-brand">
            <strong className="dashboard-sidebar-title">
              Sorting Orders
            </strong>

            <span className="dashboard-sidebar-subtitle">
              Simulador
            </span>
          </div>
        )}
      </div>

      <nav
        className="dashboard-sidebar-navigation"
        aria-label="Navegación principal"
      >
        <span className="dashboard-sidebar-section-title">
          MENÚ
        </span>

        <div className="dashboard-sidebar-items">
          {sidebarItems.map((item) => {
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`dashboard-sidebar-item ${
                  isActive ? "dashboard-sidebar-item-active" : ""
                }`}
                onClick={() => handleItemClick(item.id)}
                aria-current={isActive ? "page" : undefined}
                title={collapsed ? item.label : undefined}
              >
                <span
                  className="dashboard-sidebar-item-icon"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                {!collapsed && (
                  <span className="dashboard-sidebar-item-content">
                    <span className="dashboard-sidebar-item-label">
                      {item.label}
                    </span>

                    <span className="dashboard-sidebar-item-description">
                      {item.description}
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="dashboard-sidebar-footer">
        {!collapsed && (
          <>
            <div className="dashboard-sidebar-footer-divider" />

            <div className="dashboard-sidebar-version">
              <span>Simulador de Ordenamiento</span>
              <span>v1.0.0</span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;