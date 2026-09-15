import type { Order } from "../types/Order";
import type { SimulationStep } from "../types/Simulation";

/**
 * Resultado de la ejecución de Heap Sort.
 */
export interface HeapSortResult {
  orders: Order[];
  steps: SimulationStep[];
  comparisons: number;
  swaps: number;
}

/**
 * Heap Sort aplicado a los pedidos.
 *
 * Utiliza un Max Heap para ordenar los pedidos
 * según su nivel de prioridad.
 *
 * 1 = mayor prioridad
 * 4 = menor prioridad
 *
 * @param orders - Pedidos que se desean ordenar.
 * @returns Pedidos ordenados y pasos de la simulación.
 */
export function heapSort(orders: Order[]): HeapSortResult {
  const array = orders.map((order) => ({
    ...order,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  }));

  const steps: SimulationStep[] = [];

  let comparisons = 0;
  let swaps = 0;
  let stepNumber = 0;

  /**
   * Registra un paso de la simulación.
   */
  const addStep = (
    operation: SimulationStep["operation"],
    indexA: number | undefined,
    indexB: number | undefined,
    description: string
  ) => {
    stepNumber++;

    steps.push({
      step: stepNumber,
      operation,
      indexA,
      indexB,
      description,
      orders: array.map((order) => ({ ...order })),
    });
  };

  /**
   * Limpia los estados visuales temporales.
   */
  const clearVisualState = () => {
    array.forEach((order) => {
      order.comparando = false;
      order.intercambiando = false;
    });
  };

  /**
   * Marca un pedido como ordenado.
   */
  const markSorted = (index: number) => {
    if (array[index]) {
      array[index].ordenado = true;
    }
  };

  /**
   * Intercambia dos elementos del arreglo.
   */
  const swap = (indexA: number, indexB: number) => {
    array[indexA].intercambiando = true;
    array[indexB].intercambiando = true;

    addStep(
      "SWAP",
      indexA,
      indexB,
      `Intercambiando ${array[indexA].codigo} con ${array[indexB].codigo}.`
    );

    [array[indexA], array[indexB]] = [
      array[indexB],
      array[indexA],
    ];

    swaps++;

    clearVisualState();

    addStep(
      "SWAP",
      indexA,
      indexB,
      "Intercambio realizado."
    );
  };

  /**
   * Mantiene la propiedad del Max Heap.
   *
   * @param heapSize - Tamaño actual del heap.
   * @param rootIndex - Índice de la raíz.
   */
  const heapify = (heapSize: number, rootIndex: number) => {
    let largest = rootIndex;

    const left = rootIndex * 2 + 1;
    const right = rootIndex * 2 + 2;

    if (left < heapSize) {
      clearVisualState();

      array[rootIndex].comparando = true;
      array[left].comparando = true;

      comparisons++;

      addStep(
        "COMPARE",
        rootIndex,
        left,
        `Comparando ${array[rootIndex].codigo} con ${array[left].codigo}.`
      );

      if (
        array[left].nivelPrioridad <
        array[largest].nivelPrioridad
      ) {
        largest = left;
      }
    }

    if (right < heapSize) {
      clearVisualState();

      array[largest].comparando = true;
      array[right].comparando = true;

      comparisons++;

      addStep(
        "COMPARE",
        largest,
        right,
        `Comparando ${array[largest].codigo} con ${array[right].codigo}.`
      );

      if (
        array[right].nivelPrioridad <
        array[largest].nivelPrioridad
      ) {
        largest = right;
      }
    }

    clearVisualState();

    if (largest !== rootIndex) {
      swap(rootIndex, largest);

      heapify(heapSize, largest);
    }
  };

  /**
   * Construye el Max Heap.
   */
  for (
    let index = Math.floor(array.length / 2) - 1;
    index >= 0;
    index--
  ) {
    heapify(array.length, index);
  }

  /**
   * Extrae progresivamente el elemento máximo
   * y lo coloca al final del arreglo.
   */
  for (
    let heapSize = array.length - 1;
    heapSize > 0;
    heapSize--
  ) {
    clearVisualState();

    swap(0, heapSize);

    markSorted(heapSize);

    addStep(
      "SORTED",
      heapSize,
      undefined,
      `El pedido ${array[heapSize].codigo} quedó en su posición definitiva.`
    );

    heapify(heapSize, 0);
  }

  /**
   * Si existe un solo elemento, también queda ordenado.
   */
  if (array.length === 1) {
    markSorted(0);

    addStep(
      "SORTED",
      0,
      undefined,
      `El pedido ${array[0].codigo} quedó en su posición definitiva.`
    );
  }

  clearVisualState();

  array.forEach((order) => {
    order.ordenado = true;
  });

  return {
    orders: array,
    steps,
    comparisons,
    swaps,
  };
}

/**
 * Versión simplificada de Heap Sort.
 *
 * Ordena una copia de los pedidos sin generar
 * pasos de simulación.
 *
 * @param orders - Pedidos que se desean ordenar.
 * @returns Pedidos ordenados.
 */
export function heapSortSimple(orders: Order[]): Order[] {
  const array = [...orders];

  const heapify = (heapSize: number, rootIndex: number) => {
    let largest = rootIndex;

    const left = rootIndex * 2 + 1;
    const right = rootIndex * 2 + 2;

    if (
      left < heapSize &&
      array[left].nivelPrioridad <
        array[largest].nivelPrioridad
    ) {
      largest = left;
    }

    if (
      right < heapSize &&
      array[right].nivelPrioridad <
        array[largest].nivelPrioridad
    ) {
      largest = right;
    }

    if (largest !== rootIndex) {
      [array[rootIndex], array[largest]] = [
        array[largest],
        array[rootIndex],
      ];

      heapify(heapSize, largest);
    }
  };

  for (
    let index = Math.floor(array.length / 2) - 1;
    index >= 0;
    index--
  ) {
    heapify(array.length, index);
  }

  for (
    let heapSize = array.length - 1;
    heapSize > 0;
    heapSize--
  ) {
    [array[0], array[heapSize]] = [
      array[heapSize],
      array[0],
    ];

    heapify(heapSize, 0);
  }

  return array;
}