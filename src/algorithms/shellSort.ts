import type { Order } from "../types/Order";
import type { SimulationStep } from "../types/Simulation";

/**
 * Resultado de la ejecución de Shell Sort.
 */
export interface ShellSortResult {
  orders: Order[];
  steps: SimulationStep[];
  comparisons: number;
  swaps: number;
}

/**
 * Shell Sort aplicado a los pedidos.
 *
 * Ordena los pedidos según su nivel de prioridad:
 *
 * 1 = mayor prioridad
 * 2 = alta
 * 3 = media
 * 4 = baja
 *
 * Utiliza una secuencia de intervalos que se reduce
 * progresivamente hasta llegar a 1.
 */
export function shellSort(
  orders: Order[]
): ShellSortResult {
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
   * Agrega un nuevo paso a la simulación.
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
      orders: array.map((order) => ({
        ...order,
      })),
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
   * Calcula el intervalo inicial.
   *
   * Se utiliza la secuencia de Shell:
   *
   * n / 2
   * n / 4
   * n / 8
   * ...
   * 1
   */
  let gap = Math.floor(array.length / 2);

  while (gap > 0) {
    clearVisualState();

    addStep(
      "SELECT",
      undefined,
      undefined,
      `Iniciando una pasada de Shell Sort con intervalo ${gap}.`
    );

    /**
     * Recorremos los elementos comenzando
     * desde la posición correspondiente al intervalo.
     */
    for (let i = gap; i < array.length; i++) {
      const currentIndex = i;

      clearVisualState();

      array[currentIndex].intercambiando = true;

      addStep(
        "INSERT",
        currentIndex,
        undefined,
        `Seleccionando ${array[currentIndex].codigo} para compararlo con elementos separados por ${gap} posiciones.`
      );

      let j = i;

      /**
       * Comparamos elementos separados por el intervalo.
       */
      while (j >= gap) {
        const previousIndex = j - gap;

        clearVisualState();

        array[previousIndex].comparando = true;
        array[j].intercambiando = true;

        comparisons++;

        addStep(
          "COMPARE",
          previousIndex,
          j,
          `Comparando ${array[previousIndex].codigo} con ${array[j].codigo} usando intervalo ${gap}.`
        );

        /**
         * Si el elemento anterior tiene menor o igual
         * prioridad numérica, ya están en el orden correcto.
         */
        if (
          array[previousIndex].nivelPrioridad <=
          array[j].nivelPrioridad
        ) {
          clearVisualState();

          addStep(
            "SELECT",
            previousIndex,
            j,
            `${array[previousIndex].codigo} ya está en la posición correcta respecto a ${array[j].codigo}.`
          );

          break;
        }

        /**
         * Intercambiamos los elementos.
         */
        swap(previousIndex, j);

        j -= gap;
      }

      clearVisualState();
    }

    /**
     * Reducimos el intervalo a la mitad.
     */
    gap = Math.floor(gap / 2);

    if (gap > 0) {
      addStep(
        "MERGE",
        undefined,
        undefined,
        `Reduciendo el intervalo. El siguiente intervalo será ${gap}.`
      );
    }
  }

  /**
   * Una vez terminado el algoritmo,
   * todos los pedidos están ordenados.
   */
  clearVisualState();

  array.forEach((order) => {
    order.ordenado = true;
  });

  addStep(
    "SORTED",
    undefined,
    undefined,
    "Todos los pedidos han sido ordenados correctamente mediante Shell Sort."
  );

  return {
    orders: array,
    steps,
    comparisons,
    swaps,
  };
}

/**
 * Versión simplificada de Shell Sort.
 *
 * Ordena una copia de los pedidos sin generar
 * pasos de simulación.
 */
export function shellSortSimple(
  orders: Order[]
): Order[] {
  const array = [...orders];

  let gap = Math.floor(array.length / 2);

  while (gap > 0) {
    for (let i = gap; i < array.length; i++) {
      let j = i;

      while (
        j >= gap &&
        array[j - gap].nivelPrioridad >
          array[j].nivelPrioridad
      ) {
        [array[j - gap], array[j]] = [
          array[j],
          array[j - gap],
        ];

        j -= gap;
      }
    }

    gap = Math.floor(gap / 2);
  }

  return array;
}