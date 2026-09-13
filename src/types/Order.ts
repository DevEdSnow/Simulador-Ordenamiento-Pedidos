
/**
 * Estados posibles de un pedido.
 */
export type EstadoPedido =
  | "PENDIENTE"
  | "PROCESANDO"
  | "ENVIADO"
  | "ENTREGADO"
  | "CANCELADO";

/**
 * Niveles de prioridad de un pedido.
 */
export type PrioridadPedido = 1 | 2 | 3 | 4;

/**
 * Representa un pedido dentro del simulador.
 */
export interface Order {
  /**
   * Identificador numérico utilizado
   * por los algoritmos.
   */
  id: number;

  /**
   * Identificador visible del pedido.
   * Ejemplo: PED-001
   */
  codigo: string;

  /**
   * Nombre del cliente.
   */
  cliente: string;

  /**
   * Producto solicitado.
   */
  producto: string;

  /**
   * Cantidad de productos.
   */
  cantidad: number;

  /**
   * Precio unitario del producto.
   */
  precio: number;

  /**
   * Prioridad numérica utilizada
   * para ordenar los pedidos.
   */
  prioridad: number;

  /**
   * Nivel descriptivo de prioridad.
   */
  nivelPrioridad: PrioridadPedido;

  /**
   * Estado actual del pedido.
   */
  estado: EstadoPedido;

  /**
   * Valor utilizado para representar
   * el pedido en las barras.
   */
  valor: number;

  /**
   * Indica si el pedido está siendo comparado.
   */
  comparando?: boolean;

  /**
   * Indica si el pedido está siendo intercambiado.
   */
  intercambiando?: boolean;

  /**
   * Indica si el pedido ya está ordenado.
   */
  ordenado?: boolean;
}

/**
 * Estados visuales durante la simulación.
 */
export type OrderVisualState =
  | "normal"
  | "comparando"
  | "intercambiando"
  | "ordenado";

/**
 * Pedido acompañado de su estado visual.
 */
export interface VisualOrder extends Order {
  visualState: OrderVisualState;
}

