
import type { Order } from "./Order";

/**
 * Estados posibles de la simulación.
 */
export enum SimulationStatus {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  COMPLETED = "COMPLETED",
}

/**
 * Velocidades disponibles para la animación.
 */
export enum SimulationSpeed {
  VERY_SLOW = 1000,
  SLOW = 500,
  NORMAL = 250,
  FAST = 100,
  VERY_FAST = 25,
}

/**
 * Tipo de operación realizada por el algoritmo.
 */
export enum SimulationOperation {
  COMPARE = "COMPARE",
  SWAP = "SWAP",
  INSERT = "INSERT",
  MERGE = "MERGE",
  SELECT = "SELECT",
  PIVOT = "PIVOT",
  SORTED = "SORTED",
}

/**
 * Representa un paso individual de la simulación.
 */
export interface SimulationStep {
  /**
   * Número del paso.
   */
  step: number;

  /**
   * Tipo de operación realizada.
   */
  operation: SimulationOperation;

  /**
   * Índice del primer elemento involucrado.
   */
  indexA?: number;

  /**
   * Índice del segundo elemento involucrado.
   */
  indexB?: number;

  /**
   * Línea del código que se está ejecutando.
   */
  codeLine?: number;

  /**
   * Descripción del paso actual.
   */
  description: string;

  /**
   * Estado de los pedidos después del paso.
   */
  orders: Order[];
}

/**
 * Métricas generadas durante la ejecución.
 */
export interface SimulationMetrics {
  /**
   * Número total de comparaciones.
   */
  comparisons: number;

  /**
   * Número total de intercambios.
   */
  swaps: number;

  /**
   * Número total de pasos.
   */
  steps: number;

  /**
   * Tiempo de ejecución en milisegundos.
   */
  executionTime: number;

  /**
   * Cantidad de elementos procesados.
   */
  elements: number;
}

/**
 * Información completa de una simulación.
 */
export interface Simulation {
  /**
   * Estado actual.
   */
  status: SimulationStatus;

  /**
   * Velocidad de la animación.
   */
  speed: SimulationSpeed;

  /**
   * Algoritmo seleccionado.
   */
  algorithm: string;

  /**
   * Pedidos originales antes de ordenar.
   */
  originalOrders: Order[];

  /**
   * Pedidos en el estado actual.
   */
  orders: Order[];

  /**
   * Todos los pasos generados por el algoritmo.
   */
  steps: SimulationStep[];

  /**
   * Índice del paso que se está ejecutando.
   */
  currentStep: number;

  /**
   * Métricas de la ejecución.
   */
  metrics: SimulationMetrics;
}

/**
 * Configuración utilizada para iniciar
 * una nueva simulación.
 */
export interface SimulationConfig {
  /**
   * Algoritmo que se utilizará.
   */
  algorithm: string;

  /**
   * Velocidad de ejecución.
   */
  speed: SimulationSpeed;

  /**
   * Cantidad de pedidos.
   */
  orderCount: number;
}

/**
 * Estado inicial de las métricas.
 */
export const initialSimulationMetrics: SimulationMetrics = {
  comparisons: 0,
  swaps: 0,
  steps: 0,
  executionTime: 0,
  elements: 0,
};

