import type {
  Algorithm,
  AlgorithmType,
} from "../types/Algorithm";

/**
 * Información de los algoritmos disponibles
 * en el simulador.
 */
export const algorithms: Algorithm[] = [
  {
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

  {
    type: "SELECTION_SORT",
    name: "Selection Sort",
    description:
      "Busca el pedido con mayor prioridad dentro de la parte no ordenada y lo coloca en su posición correspondiente.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
  },

  {
    type: "INSERTION_SORT",
    name: "Insertion Sort",
    description:
      "Construye progresivamente una sección ordenada insertando cada pedido en la posición que le corresponde.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stable: true,
    inPlace: true,
  },

  {
    type: "MERGE_SORT",
    name: "Merge Sort",
    description:
      "Divide los pedidos en segmentos más pequeños, los ordena y posteriormente combina los segmentos ordenados.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    stable: true,
    inPlace: false,
  },

  {
    type: "QUICK_SORT",
    name: "Quick Sort",
    description:
      "Selecciona un pivote y divide los pedidos según su prioridad para ordenar cada partición.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    stable: false,
    inPlace: true,
  },

  {
    type: "HEAP_SORT",
    name: "Heap Sort",
    description:
      "Utiliza una estructura Heap para organizar los pedidos y colocarlos progresivamente en su posición definitiva.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
  },

  {
    type: "SHELL_SORT",
    name: "Shell Sort",
    description:
      "Ordena los pedidos utilizando intervalos que se reducen progresivamente hasta realizar una ordenación final con intervalo 1.",
    timeComplexity: {
      best: "O(n log n)",
      average: "Depende de la secuencia",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
  },
];

/**
 * Obtiene la información de un algoritmo
 * mediante su identificador.
 *
 * @param type - Tipo de algoritmo.
 * @returns Información del algoritmo.
 */
export function getAlgorithm(
  type: AlgorithmType
): Algorithm {
  return (
    algorithms.find(
      (algorithm) => algorithm.type === type
    ) ?? algorithms[0]
  );
}

/**
 * Obtiene únicamente los algoritmos disponibles
 * para utilizarse en controles de selección.
 *
 * @returns Lista de algoritmos.
 */
export function getAvailableAlgorithms(): Algorithm[] {
  return [...algorithms];
}

/**
 * Obtiene los nombres de todos los algoritmos.
 *
 * @returns Lista de nombres.
 */
export function getAlgorithmNames(): string[] {
  return algorithms.map(
    (algorithm) => algorithm.name
  );
}

/**
 * Obtiene el identificador de un algoritmo
 * utilizando su nombre.
 *
 * @param name - Nombre del algoritmo.
 * @returns Tipo del algoritmo o undefined si no existe.
 */
export function getAlgorithmTypeByName(
  name: string
): AlgorithmType | undefined {
  return algorithms.find(
    (algorithm) => algorithm.name === name
  )?.type;
}

/**
 * Busca un algoritmo por texto.
 *
 * Permite encontrar algoritmos utilizando
 * parte de su nombre o descripción.
 *
 * @param query - Texto de búsqueda.
 * @returns Algoritmos coincidentes.
 */
export function searchAlgorithms(
  query: string
): Algorithm[] {
  const normalizedQuery = query
    .trim()
    .toLowerCase();

  if (!normalizedQuery) {
    return [...algorithms];
  }

  return algorithms.filter((algorithm) => {
    const name = algorithm.name.toLowerCase();
    const description =
      algorithm.description.toLowerCase();

    return (
      name.includes(normalizedQuery) ||
      description.includes(normalizedQuery)
    );
  });
}

/**
 * Obtiene los algoritmos estables.
 *
 * @returns Algoritmos que mantienen el orden relativo
 * de elementos equivalentes.
 */
export function getStableAlgorithms(): Algorithm[] {
  return algorithms.filter(
    (algorithm) => algorithm.stable
  );
}

/**
 * Obtiene los algoritmos que trabajan
 * directamente sobre el arreglo.
 *
 * @returns Algoritmos in-place.
 */
export function getInPlaceAlgorithms(): Algorithm[] {
  return algorithms.filter(
    (algorithm) => algorithm.inPlace
  );
}

/**
 * Algoritmo utilizado inicialmente
 * por el simulador.
 */
export const DEFAULT_ALGORITHM: AlgorithmType =
  "BUBBLE_SORT";

/**
 * Cantidad inicial de pedidos para
 * una nueva simulación.
 */
export const DEFAULT_ORDER_COUNT = 10;

/**
 * Lista de identificadores de algoritmos.
 *
 * Útil para generar dinámicamente selectores,
 * filtros y controles.
 */
export const ALGORITHM_TYPES: AlgorithmType[] =
  algorithms.map((algorithm) => algorithm.type);