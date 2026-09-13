
/**
 * Algoritmos de ordenamiento disponibles
 * en el simulador.
 */
export enum AlgorithmType {
  BUBBLE_SORT = "BUBBLE_SORT",
  SELECTION_SORT = "SELECTION_SORT",
  INSERTION_SORT = "INSERTION_SORT",
  MERGE_SORT = "MERGE_SORT",
  QUICK_SORT = "QUICK_SORT",
  HEAP_SORT = "HEAP_SORT",
  SHELL_SORT = "SHELL_SORT",
}

/**
 * Lenguajes disponibles para visualizar
 * el código de los algoritmos.
 */
export enum CodeLanguage {
  CPP = "CPP",
  PYTHON = "PYTHON",
}

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
   * Indica si el algoritmo mantiene
   * el orden relativo de elementos iguales.
   */
  stable: boolean;

  /**
   * Indica si trabaja principalmente
   * sobre el mismo arreglo.
   */
  inPlace: boolean;
}

/**
 * Información de los algoritmos disponibles.
 */
export const ALGORITHM_INFO: Record<AlgorithmType, Algorithm> = {
  [AlgorithmType.BUBBLE_SORT]: {
    type: AlgorithmType.BUBBLE_SORT,
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

  [AlgorithmType.SELECTION_SORT]: {
    type: AlgorithmType.SELECTION_SORT,
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

  [AlgorithmType.INSERTION_SORT]: {
    type: AlgorithmType.INSERTION_SORT,
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

  [AlgorithmType.MERGE_SORT]: {
    type: AlgorithmType.MERGE_SORT,
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

  [AlgorithmType.QUICK_SORT]: {
    type: AlgorithmType.QUICK_SORT,
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

  [AlgorithmType.HEAP_SORT]: {
    type: AlgorithmType.HEAP_SORT,
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

  [AlgorithmType.SHELL_SORT]: {
    type: AlgorithmType.SHELL_SORT,
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
 * Obtiene la información de un algoritmo.
 */
export const getAlgorithmInfo = (
  algorithm: AlgorithmType
): Algorithm => {
  return ALGORITHM_INFO[algorithm];
};

/**
 * Lista de todos los algoritmos disponibles.
 */
export const ALGORITHMS: Algorithm[] = Object.values(ALGORITHM_INFO);

