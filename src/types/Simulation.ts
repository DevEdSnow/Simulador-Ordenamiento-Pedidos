
import type { Order } from "./Order";
import type { AlgorithmType } from "./Algorithm";

/**
 * Estados posibles de la simulación.
 */
export type SimulationStatus =
  | "IDLE"
  | "RUNNING"
  | "PAUSED"
  | "COMPLETED";

/**
 * Velocidades disponibles para la simulación.
 * El valor representa los milisegundos entre cada paso.
 */
export type SimulationSpeed =
  | 1000
  | 500
  | 250
  | 100
  | 25;

/**
 * Operaciones realizadas por los algoritmos
 * durante la simulación.
 */
export type SimulationOperation =
  | "COMPARE"
  | "SWAP"
  | "INSERT"
  | "MERGE"
  | "SELECT"
  | "PIVOT"
  | "SORTED";

/**
 * Representa un paso de la simulación.
 */
export interface SimulationStep {
  /**
   * Número del paso.
   */
  step: number;

  /**
   * Operación realizada.
   */
  operation: SimulationOperation;

  /**
   * Índice del primer elemento.
   */
  indexA?: number;

  /**
   * Índice del segundo elemento.
   */
  indexB?: number;

  /**
   * Línea del código que se está ejecutando.
   */
  codeLine?: number;

  /**
   * Explicación del paso actual.
   */
  description: string;

  /**
   * Estado de los pedidos después del paso.
   */
  orders: Order[];
}

/**
 * Métricas de la simulación.
 */
export interface SimulationMetrics {
  /**
   * Cantidad de comparaciones.
   */
  comparisons: number;

  /**
   * Cantidad de intercambios.
   */
  swaps: number;

  /**
   * Cantidad total de pasos.
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
 * Estado completo de una simulación.
 */
export interface Simulation {
  /**
   * Estado actual de la simulación.
   */
  status: SimulationStatus;

  /**
   * Velocidad de ejecución.
   */
  speed: SimulationSpeed;

  /**
   * Algoritmo seleccionado.
   */
  algorithm: AlgorithmType;

  /**
   * Pedidos originales.
   */
  originalOrders: Order[];

  /**
   * Pedidos actuales.
   */
  orders: Order[];

  /**
   * Pasos generados por el algoritmo.
   */
  steps: SimulationStep[];

  /**
   * Paso que se está ejecutando actualmente.
   */
  currentStep: number;

  /**
   * Métricas actuales.
   */
  metrics: SimulationMetrics;
}

/**
 * Configuración necesaria para iniciar
 * una nueva simulación.
 */
export interface SimulationConfig {
  /**
   * Algoritmo seleccionado.
   */
  algorithm: AlgorithmType;

  /**
   * Velocidad seleccionada.
   */
  speed: SimulationSpeed;

  /**
   * Cantidad de pedidos.
   */
  orderCount: number;
}

/**
 * Métricas iniciales de la simulación.
 */
export const initialSimulationMetrics: SimulationMetrics = {
  comparisons: 0,
  swaps: 0,
  steps: 0,
  executionTime: 0,
  elements: 0,
};

