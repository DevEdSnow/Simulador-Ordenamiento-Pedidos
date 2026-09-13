
/**
 * Algoritmos de ordenamiento disponibles.
 */
export type AlgorithmType =
  | "BUBBLE_SORT"
  | "SELECTION_SORT"
  | "INSERTION_SORT"
  | "MERGE_SORT"
  | "QUICK_SORT"
  | "HEAP_SORT"
  | "SHELL_SORT";

/**
 * Lenguajes disponibles para visualizar
 * el código de los algoritmos.
 */
export type CodeLanguage = "CPP" | "PYTHON";

/**
 * Complejidad temporal de un algoritmo.
 */
export interface TimeComplexity {
  best: string;
  average: string;
  worst: string;
}

/**
 * Información completa de un algoritmo.
 */
export interface Algorithm {
  /**
   * Identificador del algoritmo.
   */
  type: AlgorithmType;

  /**
   * Nombre mostrado en la interfaz.
   */
  name: string;

  /**
   * Descripción del algoritmo.
   */
  description: string;

  /**
   * Complejidad temporal.
   */
  timeComplexity: TimeComplexity;

  /**
   * Complejidad espacial.
   */
  spaceComplexity: string;

  /**
   * Indica si el algoritmo es estable.
   */
  stable: boolean;

  /**
   * Indica si el algoritmo trabaja
   * sobre el mismo arreglo.
   */
  inPlace: boolean;
}

/**
 * Información de todos los algoritmos.
 */
export const ALGORITHM_INFO: Record<AlgorithmType, Algorithm> = {
  BUBBLE_SORT: {
    type: "BUBBLE_SORT",
    name: "Bubble Sort",
    description:
      "Compara elementos adyacentes y los intercambia cuando están en el orden incorrecto.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stable: true,
    inPlace: true,
  },

  SELECTION_SORT: {
    type: "SELECTION_SORT",
    name: "Selection Sort",
    description:
      "Busca el elemento mínimo de la parte no ordenada y lo coloca en su posición correspondiente.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
  },

  INSERTION_SORT: {
    type: "INSERTION_SORT",
    name: "Insertion Sort",
    description:
      "Construye el arreglo ordenado insertando cada elemento en su posición correspondiente.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stable: true,
    inPlace: true,
  },

  MERGE_SORT: {
    type: "MERGE_SORT",
    name: "Merge Sort",
    description:
      "Divide el arreglo en partes más pequeñas, las ordena y posteriormente las combina.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    stable: true,
    inPlace: false,
  },

  QUICK_SORT: {
    type: "QUICK_SORT",
    name: "Quick Sort",
    description:
      "Selecciona un pivote y divide los elementos según sean menores o mayores que él.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    stable: false,
    inPlace: true,
  },

  HEAP_SORT: {
    type: "HEAP_SORT",
    name: "Heap Sort",
    description:
      "Utiliza una estructura heap para seleccionar y colocar los elementos en su posición.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
  },

  SHELL_SORT: {
    type: "SHELL_SORT",
    name: "Shell Sort",
    description:
      "Ordena elementos separados por diferentes intervalos que progresivamente se reducen.",
    timeComplexity: {
      best: "O(n log n)",
      average: "Depende de la secuencia",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
  },
};

/**
 * Lista de todos los algoritmos disponibles.
 */
export const ALGORITHMS: Algorithm[] = Object.values(ALGORITHM_INFO);

/**
 * Obtiene la información de un algoritmo.
 */
export function getAlgorithmInfo(
  algorithm: AlgorithmType
): Algorithm {
  return ALGORITHM_INFO[algorithm];
}

