import type { Order } from "../types/Order";
import type { SimulationStep } from "../types/Simulation";

/**
 * Resultado de la ejecución de Merge Sort.
 */
export interface MergeSortResult {
  orders: Order[];
  steps: SimulationStep[];
  comparisons: number;
  swaps: number;
}

/**
 * Merge Sort aplicado a los pedidos.
 *
 * Ordena los pedidos según su nivel de prioridad:
 *
 * 1 = mayor prioridad
 * 2 = alta
 * 3 = media
 * 4 = baja
 *
 * @param orders - Pedidos que se desean ordenar.
 * @returns Pedidos ordenados y pasos de la simulación.
 */
export function mergeSort(
  orders: Order[]
): MergeSortResult {
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
   * Divide y ordena recursivamente una sección del arreglo.
   */
  const mergeSortRecursive = (
    left: number,
    right: number
  ): void => {
    if (left >= right) {
      if (left === right) {
        array[left].ordenado = true;

        addStep(
          "SORTED",
          left,
          undefined,
          `${array[left].codigo} es un elemento individual.`
        );
      }

      return;
    }

    const middle = Math.floor((left + right) / 2);

    addStep(
      "MERGE",
      left,
      right,
      `Dividiendo el rango de posiciones ${left} a ${right}.`
    );

    mergeSortRecursive(left, middle);
    mergeSortRecursive(middle + 1, right);

    merge(left, middle, right);
  };

  /**
   * Combina dos segmentos ordenados.
   */
  const merge = (
    left: number,
    middle: number,
    right: number
  ): void => {
    const leftPart = array
      .slice(left, middle + 1)
      .map((order) => ({ ...order }));

    const rightPart = array
      .slice(middle + 1, right + 1)
      .map((order) => ({ ...order }));

    let leftIndex = 0;
    let rightIndex = 0;
    let currentIndex = left;

    addStep(
      "MERGE",
      left,
      right,
      `Combinando los segmentos ${left}-${middle} y ${middle + 1}-${right}.`
    );

    while (
      leftIndex < leftPart.length &&
      rightIndex < rightPart.length
    ) {
      clearVisualState();

      const actualLeftIndex = left + leftIndex;
      const actualRightIndex =
        middle + 1 + rightIndex;

      array[actualLeftIndex].comparando = true;
      array[actualRightIndex].comparando = true;

      comparisons++;

      addStep(
        "COMPARE",
        actualLeftIndex,
        actualRightIndex,
        `Comparando ${leftPart[leftIndex].codigo} con ${rightPart[rightIndex].codigo}.`
      );

      if (
        leftPart[leftIndex].nivelPrioridad <=
        rightPart[rightIndex].nivelPrioridad
      ) {
        array[currentIndex] = {
          ...leftPart[leftIndex],
          comparando: false,
          intercambiando: true,
          ordenado: false,
        };

        addStep(
          "MERGE",
          currentIndex,
          undefined,
          `Insertando ${leftPart[leftIndex].codigo} en la posición ${currentIndex}.`
        );

        leftIndex++;
      } else {
        array[currentIndex] = {
          ...rightPart[rightIndex],
          comparando: false,
          intercambiando: true,
          ordenado: false,
        };

        addStep(
          "MERGE",
          currentIndex,
          undefined,
          `Insertando ${rightPart[rightIndex].codigo} en la posición ${currentIndex}.`
        );

        rightIndex++;
      }

      swaps++;
      clearVisualState();

      currentIndex++;
    }

    /**
     * Agrega los elementos restantes de la mitad izquierda.
     */
    while (leftIndex < leftPart.length) {
      clearVisualState();

      array[currentIndex] = {
        ...leftPart[leftIndex],
        intercambiando: true,
        ordenado: false,
      };

      addStep(
        "MERGE",
        currentIndex,
        undefined,
        `Agregando el elemento restante ${leftPart[leftIndex].codigo}.`
      );

      swaps++;

      leftIndex++;
      currentIndex++;
    }

    /**
     * Agrega los elementos restantes de la mitad derecha.
     */
    while (rightIndex < rightPart.length) {
      clearVisualState();

      array[currentIndex] = {
        ...rightPart[rightIndex],
        intercambiando: true,
        ordenado: false,
      };

      addStep(
        "MERGE",
        currentIndex,
        undefined,
        `Agregando el elemento restante ${rightPart[rightIndex].codigo}.`
      );

      swaps++;

      rightIndex++;
      currentIndex++;
    }

    clearVisualState();

    /**
     * Marca el segmento recién combinado.
     */
    for (let index = left; index <= right; index++) {
      array[index].ordenado = true;
    }

    addStep(
      "SORTED",
      left,
      right,
      `El segmento ${left}-${right} quedó ordenado.`
    );

    /**
     * Los elementos marcados como ordenados
     * siguen participando en futuras mezclas.
     */
    for (let index = left; index <= right; index++) {
      array[index].ordenado = false;
    }
  };

  /**
   * Ejecutamos Merge Sort solamente si hay elementos.
   */
  if (array.length > 0) {
    mergeSortRecursive(0, array.length - 1);
  }

  clearVisualState();

  /**
   * Al finalizar, todos los pedidos están ordenados.
   */
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
 * Versión simplificada de Merge Sort.
 *
 * Ordena una copia de los pedidos sin generar
 * pasos de simulación.
 *
 * @param orders - Pedidos que se desean ordenar.
 * @returns Pedidos ordenados.
 */
export function mergeSortSimple(
  orders: Order[]
): Order[] {
  if (orders.length <= 1) {
    return [...orders];
  }

  const middle = Math.floor(orders.length / 2);

  const left = mergeSortSimple(
    orders.slice(0, middle)
  );

  const right = mergeSortSimple(
    orders.slice(middle)
  );

  return mergeArrays(left, right);
}

/**
 * Combina dos arreglos de pedidos ordenados.
 */
function mergeArrays(
  left: Order[],
  right: Order[]
): Order[] {
  const result: Order[] = [];

  let leftIndex = 0;
  let rightIndex = 0;

  while (
    leftIndex < left.length &&
    rightIndex < right.length
  ) {
    if (
      left[leftIndex].nivelPrioridad <=
      right[rightIndex].nivelPrioridad
    ) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}