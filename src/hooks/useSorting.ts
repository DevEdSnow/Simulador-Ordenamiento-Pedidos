import { useCallback, useMemo, useState } from "react";

import type { AlgorithmType } from "../types/Algorithm";
import type { Order } from "../types/Order";
import type { SimulationStep } from "../types/Simulation";

import { bubbleSort } from "../algorithms/bubbleSort";
import { selectionSort } from "../algorithms/selectionSort";
import { insertionSort } from "../algorithms/insertionSort";
import { mergeSort } from "../algorithms/mergeSort";
import { quickSort } from "../algorithms/quickSort";
import { heapSort } from "../algorithms/heapSort";
import { shellSort } from "../algorithms/shellSort";

export interface SortingResult {
  orders: Order[];
  steps: SimulationStep[];
  comparisons: number;
  swaps: number;
}

export interface UseSortingReturn {
  result: SortingResult | null;

  orders: Order[];
  steps: SimulationStep[];

  comparisons: number;
  swaps: number;
  totalSteps: number;

  isSorted: boolean;

  sort: (
    orders: Order[],
    algorithm?: AlgorithmType
  ) => SortingResult;

  sortOrders: (
    orders: Order[],
    algorithm?: AlgorithmType
  ) => void;

  clear: () => void;
}

/**
 * Ejecuta el algoritmo de ordenamiento seleccionado.
 */
function executeSortingAlgorithm(
  algorithm: AlgorithmType,
  orders: Order[]
): SortingResult {
  const cleanOrders = orders.map((order) => ({
    ...order,
    comparando: false,
    intercambiando: false,
    ordenado: false,
  }));

  switch (algorithm) {
    case "BUBBLE_SORT":
      return bubbleSort(cleanOrders);

    case "SELECTION_SORT":
      return selectionSort(cleanOrders);

    case "INSERTION_SORT":
      return insertionSort(cleanOrders);

    case "MERGE_SORT":
      return mergeSort(cleanOrders);

    case "QUICK_SORT":
      return quickSort(cleanOrders);

    case "HEAP_SORT":
      return heapSort(cleanOrders);

    case "SHELL_SORT":
      return shellSort(cleanOrders);

    default:
      return bubbleSort(cleanOrders);
  }
}

/**
 * Hook para ejecutar y controlar algoritmos
 * de ordenamiento sobre los pedidos.
 */
export function useSorting(
  defaultAlgorithm: AlgorithmType = "BUBBLE_SORT"
): UseSortingReturn {
  const [result, setResult] =
    useState<SortingResult | null>(null);

  const [algorithm, setAlgorithm] =
    useState<AlgorithmType>(
      defaultAlgorithm
    );

  /**
   * Ejecuta un algoritmo y devuelve
   * inmediatamente el resultado.
   */
  const sort = useCallback(
    (
      orders: Order[],
      selectedAlgorithm?: AlgorithmType
    ): SortingResult => {
      const algorithmToUse =
        selectedAlgorithm ?? algorithm;

      return executeSortingAlgorithm(
        algorithmToUse,
        orders
      );
    },
    [algorithm]
  );

  /**
   * Ejecuta el algoritmo y guarda
   * el resultado dentro del hook.
   */
  const sortOrders = useCallback(
    (
      orders: Order[],
      selectedAlgorithm?: AlgorithmType
    ): void => {
      const algorithmToUse =
        selectedAlgorithm ?? algorithm;

      const sortingResult =
        executeSortingAlgorithm(
          algorithmToUse,
          orders
        );

      setResult(sortingResult);
      setAlgorithm(algorithmToUse);
    },
    [algorithm]
  );

  /**
   * Limpia el resultado actual.
   */
  const clear = useCallback(() => {
    setResult(null);
  }, []);

  const orders = useMemo(
    () => result?.orders ?? [],
    [result]
  );

  const steps = useMemo(
    () => result?.steps ?? [],
    [result]
  );

  const comparisons =
    result?.comparisons ?? 0;

  const swaps = result?.swaps ?? 0;

  const totalSteps = steps.length;

  const isSorted =
    result !== null &&
    result.orders.length > 0 &&
    result.orders.every(
      (order, index, array) => {
        if (index === 0) {
          return true;
        }

        return (
          array[index - 1]
            .nivelPrioridad <=
          order.nivelPrioridad
        );
      }
    );

  return {
    result,

    orders,
    steps,

    comparisons,
    swaps,
    totalSteps,

    isSorted,

    sort,
    sortOrders,

    clear,
  };
}

export default useSorting;