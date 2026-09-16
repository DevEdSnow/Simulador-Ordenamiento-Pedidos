import type { Order } from "../types/Order";
import type { SimulationStep } from "../types/Simulation";

/**
 * Resultado de la ejecución de Selection Sort.
 */
export interface SelectionSortResult {
  orders: Order[];
  steps: SimulationStep[];
  comparisons: number;
  swaps: number;
}

/**
 * Selection Sort aplicado a los pedidos.
 *
 * Ordena los pedidos según su nivel de prioridad:
 *
 * 1 = mayor prioridad
 * 2 = alta
 * 3 = media
 * 4 = baja
 *
 * En cada iteración busca el pedido con mayor
 * prioridad dentro de la parte no ordenada.
 *
 * @param orders - Pedidos que se desean ordenar.
 * @returns Pedidos ordenados y pasos de la simulación.
 */
export function selectionSort(
  orders: Order[]
): SelectionSortResult {
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
   * Intercambia dos pedidos.
   */
  const swap = (
    indexA: number,
    indexB: number
  ) => {
    if (indexA === indexB) {
      return;
    }

    clearVisualState();

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
   * Recorremos la parte no ordenada del arreglo.
   */
  for (let i = 0; i < array.length - 1; i++) {
    let minimumIndex = i;

    clearVisualState();

    array[minimumIndex].intercambiando = true;

    addStep(
      "SELECT",
      minimumIndex,
      undefined,
      `Seleccionando ${array[minimumIndex].codigo} como candidato para la posición ${i}.`
    );

    /**
     * Buscamos el pedido con mayor prioridad.
     */
    for (let j = i + 1; j < array.length; j++) {
      clearVisualState();

      array[minimumIndex].intercambiando = true;
      array[j].comparando = true;

      comparisons++;

      addStep(
        "COMPARE",
        minimumIndex,
        j,
        `Comparando ${array[minimumIndex].codigo} con ${array[j].codigo}.`
      );

      /**
       * Una prioridad numéricamente menor significa
       * una prioridad más alta.
       */
      if (
        array[j].nivelPrioridad <
        array[minimumIndex].nivelPrioridad
      ) {
        minimumIndex = j;

        clearVisualState();

        array[minimumIndex].intercambiando = true;

        addStep(
          "SELECT",
          minimumIndex,
          undefined,
          `${array[minimumIndex].codigo} es ahora el candidato con mayor prioridad.`
        );
      }
    }

    /**
     * Colocamos el elemento seleccionado
     * en su posición definitiva.
     */
    if (minimumIndex !== i) {
      swap(i, minimumIndex);
    } else {
      clearVisualState();

      addStep(
        "SELECT",
        i,
        undefined,
        `${array[i].codigo} ya se encuentra en la posición correcta.`
      );
    }

    clearVisualState();

    markSorted(i);

    addStep(
      "SORTED",
      i,
      undefined,
      `${array[i].codigo} quedó en su posición definitiva.`
    );
  }

  /**
   * El último elemento queda automáticamente ordenado.
   */
  if (array.length > 0) {
    const lastIndex = array.length - 1;

    clearVisualState();

    markSorted(lastIndex);

    addStep(
      "SORTED",
      lastIndex,
      undefined,
      `${array[lastIndex].codigo} quedó en su posición definitiva.`
    );
  }

  /**
   * Finalizamos marcando todos los pedidos como ordenados.
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
 * Versión simplificada de Selection Sort.
 *
 * Ordena una copia de los pedidos sin generar
 * pasos de simulación.
 *
 * @param orders - Pedidos que se desean ordenar.
 * @returns Pedidos ordenados.
 */
export function selectionSortSimple(
  orders: Order[]
): Order[] {
  const array = [...orders];

  for (let i = 0; i < array.length - 1; i++) {
    let minimumIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (
        array[j].nivelPrioridad <
        array[minimumIndex].nivelPrioridad
      ) {
        minimumIndex = j;
      }
    }

    if (minimumIndex !== i) {
      [array[i], array[minimumIndex]] = [
        array[minimumIndex],
        array[i],
      ];
    }
  }

  return array;
}