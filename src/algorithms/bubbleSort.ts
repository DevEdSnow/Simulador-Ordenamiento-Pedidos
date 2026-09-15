import type { Order } from "../types/Order";
import type { SimulationStep } from "../types/Simulation";

/**
 * Resultado de la ejecución de Bubble Sort.
 */
export interface BubbleSortResult {
  orders: Order[];
  steps: SimulationStep[];
  comparisons: number;
  swaps: number;
}

/**
 * Bubble Sort aplicado a los pedidos.
 *
 * Ordena los pedidos según su nivel de prioridad:
 * 1 = mayor prioridad
 * 4 = menor prioridad
 *
 * @param orders - Pedidos que se desean ordenar.
 * @returns Pedidos ordenados y pasos de la simulación.
 */
export function bubbleSort(orders: Order[]): BubbleSortResult {
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

  const clearVisualState = () => {
    array.forEach((order) => {
      order.comparando = false;
      order.intercambiando = false;
    });
  };

  const markSorted = (index: number) => {
    if (array[index]) {
      array[index].ordenado = true;
    }
  };

  for (let i = 0; i < array.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < array.length - 1 - i; j++) {
      clearVisualState();

      array[j].comparando = true;
      array[j + 1].comparando = true;

      comparisons++;

      addStep(
        "COMPARE",
        j,
        j + 1,
        `Comparando ${array[j].codigo} con ${array[j + 1].codigo}.`
      );

      if (array[j].nivelPrioridad > array[j + 1].nivelPrioridad) {
        array[j].comparando = false;
        array[j + 1].comparando = false;

        array[j].intercambiando = true;
        array[j + 1].intercambiando = true;

        addStep(
          "SWAP",
          j,
          j + 1,
          `Intercambiando ${array[j].codigo} con ${array[j + 1].codigo}.`
        );

        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        swaps++;
        swapped = true;

        clearVisualState();

        addStep(
          "SWAP",
          j,
          j + 1,
          `Intercambio realizado. ${array[j].codigo} queda antes que ${array[j + 1].codigo}.`
        );
      }
    }

    clearVisualState();

    const sortedIndex = array.length - 1 - i;
    markSorted(sortedIndex);

    addStep(
      "SORTED",
      sortedIndex,
      undefined,
      `El pedido ${array[sortedIndex].codigo} quedó en su posición definitiva.`
    );

    if (!swapped) {
      for (let k = 0; k <= array.length - 1 - i; k++) {
        markSorted(k);
      }

      addStep(
        "SORTED",
        undefined,
        undefined,
        "No se realizaron intercambios. El arreglo ya está ordenado."
      );

      break;
    }
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
 * Ordena una copia de los pedidos utilizando Bubble Sort
 * sin generar pasos de simulación.
 *
 * @param orders - Pedidos que se desean ordenar.
 * @returns Pedidos ordenados.
 */
export function bubbleSortSimple(orders: Order[]): Order[] {
  const array = [...orders];

  for (let i = 0; i < array.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j].nivelPrioridad > array[j + 1].nivelPrioridad) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }

    if (!swapped) {
      break;
    }
  }

  return array;
}