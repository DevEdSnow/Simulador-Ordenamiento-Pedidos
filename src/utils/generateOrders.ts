import type {
  EstadoPedido,
  Order,
  PrioridadPedido,
} from "../types/Order";
import { generateId, generateShortId } from "./generateId";

/**
 * Lista de clientes utilizados para generar
 * pedidos de prueba.
 */
const CLIENTES = [
  "Carlos Hernández",
  "María López",
  "Juan Pérez",
  "Ana Martínez",
  "Luis García",
  "Sofía Ramírez",
  "Diego Torres",
  "Valeria Sánchez",
  "Miguel Flores",
  "Daniela Cruz",
];

/**
 * Lista de productos utilizados para generar
 * pedidos de prueba.
 */
const PRODUCTOS = [
  "Laptop",
  "Monitor",
  "Teclado mecánico",
  "Mouse inalámbrico",
  "Audífonos",
  "SSD 1TB",
  "Memoria RAM 16GB",
  "Tarjeta gráfica",
  "Webcam",
  "Silla gamer",
  "Smartphone",
  "Tablet",
  "Disco duro externo",
  "Micrófono",
  "Hub USB",
];

/**
 * Estados disponibles para los pedidos generados.
 */
const ESTADOS: EstadoPedido[] = [
  "PENDIENTE",
  "PROCESANDO",
  "ENVIADO",
  "ENTREGADO",
];

/**
 * Genera un número entero aleatorio
 * entre un mínimo y un máximo.
 *
 * @param min - Valor mínimo.
 * @param max - Valor máximo.
 * @returns Número entero aleatorio.
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Selecciona un elemento aleatorio de un arreglo.
 *
 * @param items - Arreglo de elementos.
 * @returns Elemento seleccionado.
 */
function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Genera una prioridad aleatoria del pedido.
 *
 * 1 = Muy alta
 * 2 = Alta
 * 3 = Media
 * 4 = Baja
 *
 * @returns Nivel de prioridad.
 */
function generatePriority(): PrioridadPedido {
  const value = randomInt(1, 4);

  return value as PrioridadPedido;
}

/**
 * Genera un pedido individual.
 *
 * @param index - Posición del pedido dentro de la generación.
 * @returns Pedido generado.
 */
export function generateOrder(index = 0): Order {
  const cantidad = randomInt(1, 10);
  const precio = randomInt(100, 25000);
  const nivelPrioridad = generatePriority();

  return {
    id: generateId(),
    codigo: generateShortId("ORD"),
    cliente: randomItem(CLIENTES),
    producto: randomItem(PRODUCTOS),
    cantidad,
    precio,
    prioridad: nivelPrioridad,
    nivelPrioridad,
    estado: randomItem(ESTADOS),
    valor: cantidad * precio,

    comparando: false,
    intercambiando: false,
    ordenado: false,

    ...(index > 0 && {
      codigo: `${generateShortId("ORD")}-${index}`,
    }),
  };
}

/**
 * Genera múltiples pedidos.
 *
 * @param count - Cantidad de pedidos a generar.
 * @returns Arreglo de pedidos.
 */
export function generateOrders(count = 10): Order[] {
  if (!Number.isFinite(count) || count <= 0) {
    return [];
  }

  const total = Math.floor(count);

  return Array.from({ length: total }, (_, index) =>
    generateOrder(index + 1)
  );
}

/**
 * Genera una cantidad aleatoria de pedidos
 * dentro de un rango.
 *
 * @param min - Cantidad mínima.
 * @param max - Cantidad máxima.
 * @returns Arreglo de pedidos generados.
 */
export function generateRandomOrders(
  min = 5,
  max = 20
): Order[] {
  const count = randomInt(min, max);

  return generateOrders(count);
}