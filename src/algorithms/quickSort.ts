import type { Order } from "../types/Order";
import type { SimulationStep } from "../types/Simulation";

/**
 * Resultado de la ejecución de Quick Sort.
 */
export interface QuickSortResult {
  orders: Order[];
  steps: SimulationStep[];
  comparisons: number;
  swaps: number;
}

/**
 * Quick Sort aplicado a los pedidos.
 *
 * Ordena los pedidos según su nivel de prioridad:
 *
 * 1 = mayor prioridad
 * 2 = alta
 * 3 = media
 * 4 = baja
 *
 * Utiliza el último elemento de cada partición
 * como pivote.
 *
 * @param orders - Pedidos que se desean ordenar.
 * @returns Pedidos ordenados y pasos de la simulación.
 */
export function quickSort(
  orders: Order[]
): QuickSortResult {
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
   * Intercambia dos elementos del arreglo.
   */
  const swap = (
    indexA: number,
    indexB: number
  ) => {
    if (indexA === indexB) {
      return;
    }

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
   * Particiona una sección del arreglo alrededor
   * de un pivote.
   */
  const partition = (
    low: number,
    high: number
  ): number => {
    const pivot = array[high];

    clearVisualState();

    array[high].intercambiando = true;

    addStep(
      "PIVOT",
      high,
      undefined,
      `Seleccionando ${pivot.codigo} como pivote.`
    );

    let i = low - 1;

    for (let j = low; j < high; j++) {
      clearVisualState();

      array[j].comparando = true;
      array[high].intercambiando = true;

      comparisons++;

      addStep(
        "COMPARE",
        j,
        high,
        `Comparando ${array[j].codigo} con el pivote ${pivot.codigo}.`
      );

      /**
       * Los pedidos con prioridad menor o igual
       * al pivote se colocan antes de él.
       */
      if (
        array[j].nivelPrioridad <=
        pivot.nivelPrioridad
      ) {
        i++;

        if (i !== j) {
          swap(i, j);
        } else {
          clearVisualState();

          addStep(
            "SELECT",
            j,
            undefined,
            `${array[j].codigo} ya se encuentra en la posición correcta respecto al pivote.`
          );
        }
      }
    }

    /**
     * Colocamos el pivote en su posición definitiva.
     */
    const pivotIndex = i + 1;

    clearVisualState();

    if (pivotIndex !== high) {
      swap(pivotIndex, high);
    } else {
      addStep(
        "SELECT",
        pivotIndex,
        undefined,
        `El pivote ${array[pivotIndex].codigo} ya está en su posición correcta.`
      );
    }

    clearVisualState();

    array[pivotIndex].ordenado = true;

    addStep(
      "SORTED",
      pivotIndex,
      undefined,
      `El pivote ${array[pivotIndex].codigo} quedó en su posición definitiva.`
    );

    return pivotIndex;
  };

  /**
   * Ejecuta Quick Sort recursivamente.
   */
  const quickSortRecursive = (
    low: number,
    high: number
  ): void => {
    if (low > high) {
      return;
    }

    if (low === high) {
      clearVisualState();

      array[low].ordenado = true;

      addStep(
        "SORTED",
        low,
        undefined,
        `${array[low].codigo} ocupa una posición individual y ya está ordenado.`
      );

      return;
    }

    const pivotIndex = partition(low, high);

    quickSortRecursive(low, pivotIndex - 1);
    quickSortRecursive(pivotIndex + 1, high);
  };

  /**
   * Ejecutamos Quick Sort solamente si existen pedidos.
   */
  if (array.length > 0) {
    quickSortRecursive(0, array.length - 1);
  }

  /**
   * Todos los elementos quedan marcados como ordenados.
   */
  clearVisualState();

  array.forEach((order) => {
    order.ordenado = true;
  });

  addStep(
    "SORTED",
    undefined,
    undefined,
    "Todos los pedidos han sido ordenados correctamente."
  );

  return {
    orders: array,
    steps,
    comparisons,
    swaps,
  };
}

/**
 * Versión simplificada de Quick Sort.
 *
 * Ordena una copia de los pedidos sin generar
 * pasos de simulación.
 *
 * @param orders - Pedidos que se desean ordenar.
 * @returns Pedidos ordenados.
 */
export function quickSortSimple(
  orders: Order[]
): Order[] {
  const array = [...orders];

  /**
   * Particiona el arreglo.
   */
  const partition = (
    low: number,
    high: number
  ): number => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (
        array[j].nivelPrioridad <=
        pivot.nivelPrioridad
      ) {
        i++;

        [array[i], array[j]] = [
          array[j],
          array[i],
        ];
      }
    }

    [array[i + 1], array[high]] = [
      array[high],
      array[i + 1],
    ];

    return i + 1;
  };

  /**
   * Quick Sort recursivo.
   */
  const sort = (
    low: number,
    high: number
  ): void => {
    if (low >= high) {
      return;
    }

    const pivotIndex = partition(low, high);

    sort(low, pivotIndex - 1);
    sort(pivotIndex + 1, high);
  };

  if (array.length > 1) {
    sort(0, array.length - 1);
  }

  return array;
}