import type {
  EstadoPedido,
  Order,
  PrioridadPedido,
} from "../types/Order";

/**
 * Pedidos iniciales utilizados como datos de demostración.
 *
 * Los pedidos están deliberadamente desordenados
 * para que la simulación pueda mostrar claramente
 * el funcionamiento de los algoritmos.
 */
export const INITIAL_ORDERS: Order[] = [
  {
    id: 1,
    codigo: "ORD-001",
    cliente: "Carlos Hernández",
    producto: "Laptop",
    cantidad: 1,
    precio: 18500,
    prioridad: 3,
    nivelPrioridad: 3,
    estado: "PENDIENTE",
    valor: 18500,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  },

  {
    id: 2,
    codigo: "ORD-002",
    cliente: "María López",
    producto: "Monitor",
    cantidad: 2,
    precio: 6500,
    prioridad: 1,
    nivelPrioridad: 1,
    estado: "PROCESANDO",
    valor: 13000,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  },

  {
    id: 3,
    codigo: "ORD-003",
    cliente: "Juan Pérez",
    producto: "Teclado mecánico",
    cantidad: 1,
    precio: 1800,
    prioridad: 4,
    nivelPrioridad: 4,
    estado: "ENVIADO",
    valor: 1800,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  },

  {
    id: 4,
    codigo: "ORD-004",
    cliente: "Ana Martínez",
    producto: "Mouse inalámbrico",
    cantidad: 3,
    precio: 950,
    prioridad: 2,
    nivelPrioridad: 2,
    estado: "PENDIENTE",
    valor: 2850,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  },

  {
    id: 5,
    codigo: "ORD-005",
    cliente: "Luis García",
    producto: "SSD 1TB",
    cantidad: 2,
    precio: 2100,
    prioridad: 3,
    nivelPrioridad: 3,
    estado: "PROCESANDO",
    valor: 4200,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  },

  {
    id: 6,
    codigo: "ORD-006",
    cliente: "Sofía Ramírez",
    producto: "Tarjeta gráfica",
    cantidad: 1,
    precio: 12500,
    prioridad: 1,
    nivelPrioridad: 1,
    estado: "PENDIENTE",
    valor: 12500,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  },

  {
    id: 7,
    codigo: "ORD-007",
    cliente: "Diego Torres",
    producto: "Audífonos",
    cantidad: 2,
    precio: 2400,
    prioridad: 4,
    nivelPrioridad: 4,
    estado: "ENTREGADO",
    valor: 4800,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  },

  {
    id: 8,
    codigo: "ORD-008",
    cliente: "Valeria Sánchez",
    producto: "Memoria RAM 16GB",
    cantidad: 4,
    precio: 1450,
    prioridad: 2,
    nivelPrioridad: 2,
    estado: "ENVIADO",
    valor: 5800,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  },

  {
    id: 9,
    codigo: "ORD-009",
    cliente: "Miguel Flores",
    producto: "Webcam",
    cantidad: 1,
    precio: 1750,
    prioridad: 3,
    nivelPrioridad: 3,
    estado: "PENDIENTE",
    valor: 1750,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  },

  {
    id: 10,
    codigo: "ORD-010",
    cliente: "Daniela Cruz",
    producto: "Silla gamer",
    cantidad: 1,
    precio: 7200,
    prioridad: 2,
    nivelPrioridad: 2,
    estado: "PROCESANDO",
    valor: 7200,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  },
];

/**
 * Crea una copia independiente de los pedidos iniciales.
 *
 * Se utiliza para evitar modificar directamente
 * el arreglo original.
 *
 * @returns Copia de los pedidos iniciales.
 */
export function getInitialOrders(): Order[] {
  return INITIAL_ORDERS.map((order) => ({
    ...order,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  }));
}

/**
 * Obtiene los pedidos ordenados por prioridad.
 *
 * La prioridad 1 representa la prioridad más alta.
 *
 * @returns Pedidos ordenados de mayor a menor prioridad.
 */
export function getOrdersSortedByPriority(): Order[] {
  return [...INITIAL_ORDERS].sort(
    (a, b) =>
      a.nivelPrioridad - b.nivelPrioridad
  );
}

/**
 * Obtiene los pedidos de una prioridad específica.
 *
 * @param priority - Nivel de prioridad.
 * @returns Pedidos que tienen la prioridad indicada.
 */
export function getOrdersByPriority(
  priority: PrioridadPedido
): Order[] {
  return INITIAL_ORDERS.filter(
    (order) => order.nivelPrioridad === priority
  );
}

/**
 * Obtiene los pedidos de un estado específico.
 *
 * @param status - Estado del pedido.
 * @returns Pedidos que tienen el estado indicado.
 */
export function getOrdersByStatus(
  status: EstadoPedido
): Order[] {
  return INITIAL_ORDERS.filter(
    (order) => order.estado === status
  );
}

/**
 * Busca pedidos por cliente, producto o código.
 *
 * @param query - Texto que se desea buscar.
 * @returns Pedidos coincidentes.
 */
export function searchOrders(
  query: string
): Order[] {
  const normalizedQuery = query
    .trim()
    .toLowerCase();

  if (!normalizedQuery) {
    return getInitialOrders();
  }

  return INITIAL_ORDERS.filter((order) => {
    return (
      order.codigo
        .toLowerCase()
        .includes(normalizedQuery) ||
      order.cliente
        .toLowerCase()
        .includes(normalizedQuery) ||
      order.producto
        .toLowerCase()
        .includes(normalizedQuery)
    );
  });
}

/**
 * Calcula el valor total de todos los pedidos.
 *
 * @returns Valor total de los pedidos.
 */
export function getTotalOrdersValue(): number {
  return INITIAL_ORDERS.reduce(
    (total, order) => total + order.valor,
    0
  );
}

/**
 * Calcula la cantidad total de productos
 * incluidos en los pedidos.
 *
 * @returns Cantidad total de productos.
 */
export function getTotalProducts(): number {
  return INITIAL_ORDERS.reduce(
    (total, order) => total + order.cantidad,
    0
  );
}

/**
 * Obtiene la cantidad de pedidos de cada prioridad.
 *
 * @returns Objeto con el número de pedidos
 * por cada nivel de prioridad.
 */
export function getPrioritySummary(): Record<
  PrioridadPedido,
  number
> {
  return INITIAL_ORDERS.reduce(
    (summary, order) => {
      summary[order.nivelPrioridad]++;
      return summary;
    },
    {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    } as Record<PrioridadPedido, number>
  );
}

/**
 * Obtiene la cantidad de pedidos de cada estado.
 *
 * @returns Objeto con el número de pedidos
 * por estado.
 */
export function getStatusSummary(): Record<
  EstadoPedido,
  number
> {
  return INITIAL_ORDERS.reduce(
    (summary, order) => {
      summary[order.estado]++;
      return summary;
    },
    {
      PENDIENTE: 0,
      PROCESANDO: 0,
      ENVIADO: 0,
      ENTREGADO: 0,
      CANCELADO: 0,
    } as Record<EstadoPedido, number>
  );
}

/**
 * Cantidad de pedidos que aparecen inicialmente
 * en el simulador.
 */
export const INITIAL_ORDER_COUNT =
  INITIAL_ORDERS.length;

/**
 * Número mínimo de pedidos permitidos
 * en una simulación.
 */
export const MIN_ORDER_COUNT = 5;

/**
 * Número máximo de pedidos permitidos
 * en una simulación.
 */
export const MAX_ORDER_COUNT = 50;