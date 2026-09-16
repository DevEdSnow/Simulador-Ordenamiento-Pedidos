import type { Order } from "../types/Order";
import type { SimulationStep } from "../types/Simulation";

/**
 * Resultado de la ejecución de Insertion Sort.
 */
export interface InsertionSortResult {
  orders: Order[];
  steps: SimulationStep[];
  comparisons: number;
  swaps: number;
}

/**
 * Insertion Sort aplicado a los pedidos.
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
export function insertionSort(
  orders: Order[]
): InsertionSortResult {
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
   * Marca un elemento como ordenado.
   */
  const markSorted = (index: number) => {
    if (array[index]) {
      array[index].ordenado = true;
    }
  };

  /**
   * Recorremos el arreglo desde el segundo elemento.
   */
  for (let i = 1; i < array.length; i++) {
    clearVisualState();

    const current = array[i];
    let j = i - 1;

    current.intercambiando = true;

    addStep(
      "INSERT",
      i,
      undefined,
      `Seleccionando ${current.codigo} para insertarlo en la posición correcta.`
    );

    /**
     * Desplazamos hacia la derecha los elementos
     * que tienen una prioridad menor.
     */
    while (j >= 0) {
      clearVisualState();

      array[j].comparando = true;
      current.intercambiando = true;

      comparisons++;

      addStep(
        "COMPARE",
        j,
        i,
        `Comparando ${array[j].codigo} con ${current.codigo}.`
      );

      if (
        array[j].nivelPrioridad <=
        current.nivelPrioridad
      ) {
        break;
      }

      array[j].intercambiando = true;

      addStep(
        "INSERT",
        j,
        j + 1,
        `Desplazando ${array[j].codigo} una posición hacia la derecha.`
      );

      array[j + 1] = array[j];

      swaps++;

      clearVisualState();

      j--;
    }

    /**
     * Insertamos el elemento en su posición.
     */
    array[j + 1] = current;

    clearVisualState();

    addStep(
      "INSERT",
      j + 1,
      undefined,
      `${current.codigo} fue insertado en la posición ${j + 1}.`
    );

    /**
     * Todos los elementos desde el inicio hasta i
     * forman la parte ordenada.
     */
    for (let k = 0; k <= i; k++) {
      markSorted(k);
    }

    addStep(
      "SORTED",
      j + 1,
      undefined,
      `La sección hasta la posición ${i} está ordenada.`
    );
  }

  /**
   * Marcamos todos los pedidos como ordenados.
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
 * Versión simplificada de Insertion Sort.
 *
 * Ordena una copia de los pedidos sin generar
 * pasos de simulación.
 *
 * @param orders - Pedidos que se desean ordenar.
 * @returns Pedidos ordenados.
 */
export function insertionSortSimple(
  orders: Order[]
): Order[] {
  const array = [...orders];

  for (let i = 1; i < array.length; i++) {
    const current = array[i];
    let j = i - 1;

    while (
      j >= 0 &&
      array[j].nivelPrioridad >
        current.nivelPrioridad
    ) {
      array[j + 1] = array[j];
      j--;
    }

    array[j + 1] = current;
  }

  return array;
}