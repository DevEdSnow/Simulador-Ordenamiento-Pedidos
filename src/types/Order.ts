
/**
 * Estados posibles de un pedido.
 */
export enum EstadoPedido {
  PENDIENTE = "PENDIENTE",
  PROCESANDO = "PROCESANDO",
  ENVIADO = "ENVIADO",
  ENTREGADO = "ENTREGADO",
  CANCELADO = "CANCELADO",
}

/**
 * Niveles de prioridad de un pedido.
 */
export enum PrioridadPedido {
  BAJA = 1,
  MEDIA = 2,
  ALTA = 3,
  URGENTE = 4,
}

/**
 * Representa un pedido dentro del simulador.
 */
export interface Order {
  /**
   * Identificador numérico utilizado
   * principalmente por los algoritmos.
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
   * Valor utilizado por la visualización
   * de las barras del algoritmo.
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
   * Indica si el pedido ya encontró
   * su posición definitiva.
   */
  ordenado?: boolean;
}

/**
 * Estados visuales de un pedido durante
 * la ejecución del algoritmo.
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

