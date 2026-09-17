import type {
  AlgorithmType,
  CodeLanguage,
} from "../types/Algorithm";

/**
 * Representa un ejemplo de código de un algoritmo.
 */
export interface CodeExample {
  algorithm: AlgorithmType;
  language: CodeLanguage;
  code: string;
}

/**
 * Código de ejemplo de Bubble Sort.
 */
const bubbleSortCpp = `#include <vector>
using namespace std;

void bubbleSort(vector<int>& pedidos) {
    int n = pedidos.size();

    for (int i = 0; i < n - 1; i++) {
        bool intercambio = false;

        for (int j = 0; j < n - i - 1; j++) {
            if (pedidos[j] > pedidos[j + 1]) {
                swap(pedidos[j], pedidos[j + 1]);
                intercambio = true;
            }
        }

        if (!intercambio) {
            break;
        }
    }
}`;

const bubbleSortPython = `def bubble_sort(pedidos):
    n = len(pedidos)

    for i in range(n - 1):
        intercambio = False

        for j in range(n - i - 1):
            if pedidos[j] > pedidos[j + 1]:
                pedidos[j], pedidos[j + 1] = (
                    pedidos[j + 1],
                    pedidos[j]
                )
                intercambio = True

        if not intercambio:
            break

    return pedidos`;

/**
 * Código de ejemplo de Selection Sort.
 */
const selectionSortCpp = `#include <vector>
using namespace std;

void selectionSort(vector<int>& pedidos) {
    int n = pedidos.size();

    for (int i = 0; i < n - 1; i++) {
        int minimo = i;

        for (int j = i + 1; j < n; j++) {
            if (pedidos[j] < pedidos[minimo]) {
                minimo = j;
            }
        }

        if (minimo != i) {
            swap(pedidos[i], pedidos[minimo]);
        }
    }
}`;

const selectionSortPython = `def selection_sort(pedidos):
    n = len(pedidos)

    for i in range(n - 1):
        minimo = i

        for j in range(i + 1, n):
            if pedidos[j] < pedidos[minimo]:
                minimo = j

        if minimo != i:
            pedidos[i], pedidos[minimo] = (
                pedidos[minimo],
                pedidos[i]
            )

    return pedidos`;

/**
 * Código de ejemplo de Insertion Sort.
 */
const insertionSortCpp = `#include <vector>
using namespace std;

void insertionSort(vector<int>& pedidos) {
    int n = pedidos.size();

    for (int i = 1; i < n; i++) {
        int actual = pedidos[i];
        int j = i - 1;

        while (j >= 0 && pedidos[j] > actual) {
            pedidos[j + 1] = pedidos[j];
            j--;
        }

        pedidos[j + 1] = actual;
    }
}`;

const insertionSortPython = `def insertion_sort(pedidos):
    for i in range(1, len(pedidos)):
        actual = pedidos[i]
        j = i - 1

        while j >= 0 and pedidos[j] > actual:
            pedidos[j + 1] = pedidos[j]
            j -= 1

        pedidos[j + 1] = actual

    return pedidos`;

/**
 * Código de ejemplo de Merge Sort.
 */
const mergeSortCpp = `#include <vector>
using namespace std;

void merge(vector<int>& pedidos, int izquierda,
           int medio, int derecha) {
    vector<int> temporal;

    int i = izquierda;
    int j = medio + 1;

    while (i <= medio && j <= derecha) {
        if (pedidos[i] <= pedidos[j]) {
            temporal.push_back(pedidos[i]);
            i++;
        } else {
            temporal.push_back(pedidos[j]);
            j++;
        }
    }

    while (i <= medio) {
        temporal.push_back(pedidos[i]);
        i++;
    }

    while (j <= derecha) {
        temporal.push_back(pedidos[j]);
        j++;
    }

    for (int k = 0; k < temporal.size(); k++) {
        pedidos[izquierda + k] = temporal[k];
    }
}

void mergeSort(vector<int>& pedidos,
               int izquierda, int derecha) {
    if (izquierda >= derecha) {
        return;
    }

    int medio = izquierda +
                (derecha - izquierda) / 2;

    mergeSort(pedidos, izquierda, medio);
    mergeSort(pedidos, medio + 1, derecha);

    merge(pedidos, izquierda, medio, derecha);
}`.trim();

const mergeSortPython = `def merge_sort(pedidos):
    if len(pedidos) <= 1:
        return pedidos

    medio = len(pedidos) // 2

    izquierda = merge_sort(pedidos[:medio])
    derecha = merge_sort(pedidos[medio:])

    resultado = []
    i = 0
    j = 0

    while i < len(izquierda) and j < len(derecha):
        if izquierda[i] <= derecha[j]:
            resultado.append(izquierda[i])
            i += 1
        else:
            resultado.append(derecha[j])
            j += 1

    resultado.extend(izquierda[i:])
    resultado.extend(derecha[j:])

    return resultado`;

/**
 * Código de ejemplo de Quick Sort.
 */
const quickSortCpp = `#include <vector>
using namespace std;

int particion(vector<int>& pedidos,
              int izquierda, int derecha) {
    int pivote = pedidos[derecha];
    int i = izquierda - 1;

    for (int j = izquierda; j < derecha; j++) {
        if (pedidos[j] <= pivote) {
            i++;

            swap(pedidos[i], pedidos[j]);
        }
    }

    swap(pedidos[i + 1], pedidos[derecha]);

    return i + 1;
}

void quickSort(vector<int>& pedidos,
               int izquierda, int derecha) {
    if (izquierda >= derecha) {
        return;
    }

    int pivote = particion(
        pedidos,
        izquierda,
        derecha
    );

    quickSort(
        pedidos,
        izquierda,
        pivote - 1
    );

    quickSort(
        pedidos,
        pivote + 1,
        derecha
    );
}`.trim();

const quickSortPython = `def quick_sort(pedidos):
    def particion(izquierda, derecha):
        pivote = pedidos[derecha]
        i = izquierda - 1

        for j in range(izquierda, derecha):
            if pedidos[j] <= pivote:
                i += 1
                pedidos[i], pedidos[j] = (
                    pedidos[j],
                    pedidos[i]
                )

        pedidos[i + 1], pedidos[derecha] = (
            pedidos[derecha],
            pedidos[i + 1]
        )

        return i + 1

    def ordenar(izquierda, derecha):
        if izquierda >= derecha:
            return

        pivote = particion(
            izquierda,
            derecha
        )

        ordenar(izquierda, pivote - 1)
        ordenar(pivote + 1, derecha)

    ordenar(0, len(pedidos) - 1)

    return pedidos`;

/**
 * Código de ejemplo de Heap Sort.
 */
const heapSortCpp = `#include <vector>
using namespace std;

void heapify(vector<int>& pedidos,
             int tamano, int raiz) {
    int menor = raiz;

    int izquierda = 2 * raiz + 1;
    int derecha = 2 * raiz + 2;

    if (
        izquierda < tamano &&
        pedidos[izquierda] < pedidos[menor]
    ) {
        menor = izquierda;
    }

    if (
        derecha < tamano &&
        pedidos[derecha] < pedidos[menor]
    ) {
        menor = derecha;
    }

    if (menor != raiz) {
        swap(pedidos[raiz], pedidos[menor]);

        heapify(
            pedidos,
            tamano,
            menor
        );
    }
}

void heapSort(vector<int>& pedidos) {
    int n = pedidos.size();

    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(pedidos, n, i);
    }

    for (int i = n - 1; i > 0; i--) {
        swap(pedidos[0], pedidos[i]);

        heapify(pedidos, i, 0);
    }
}`.trim();

const heapSortPython = `def heap_sort(pedidos):
    def heapify(tamano, raiz):
        menor = raiz

        izquierda = 2 * raiz + 1
        derecha = 2 * raiz + 2

        if (
            izquierda < tamano
            and pedidos[izquierda] < pedidos[menor]
        ):
            menor = izquierda

        if (
            derecha < tamano
            and pedidos[derecha] < pedidos[menor]
        ):
            menor = derecha

        if menor != raiz:
            pedidos[raiz], pedidos[menor] = (
                pedidos[menor],
                pedidos[raiz]
            )

            heapify(tamano, menor)

    n = len(pedidos)

    for i in range(n // 2 - 1, -1, -1):
        heapify(n, i)

    for i in range(n - 1, 0, -1):
        pedidos[0], pedidos[i] = (
            pedidos[i],
            pedidos[0]
        )

        heapify(i, 0)

    return pedidos`;

/**
 * Código de ejemplo de Shell Sort.
 */
const shellSortCpp = `#include <vector>
using namespace std;

void shellSort(vector<int>& pedidos) {
    int n = pedidos.size();

    for (int intervalo = n / 2;
         intervalo > 0;
         intervalo /= 2) {

        for (int i = intervalo;
             i < n;
             i++) {

            int actual = pedidos[i];
            int j = i;

            while (
                j >= intervalo &&
                pedidos[j - intervalo] > actual
            ) {
                pedidos[j] =
                    pedidos[j - intervalo];

                j -= intervalo;
            }

            pedidos[j] = actual;
        }
    }
}`.trim();

const shellSortPython = `def shell_sort(pedidos):
    n = len(pedidos)

    intervalo = n // 2

    while intervalo > 0:
        for i in range(intervalo, n):
            actual = pedidos[i]
            j = i

            while (
                j >= intervalo
                and pedidos[j - intervalo] > actual
            ):
                pedidos[j] = (
                    pedidos[j - intervalo]
                )

                j -= intervalo

            pedidos[j] = actual

        intervalo //= 2

    return pedidos`;

/**
 * Todos los ejemplos de código disponibles.
 */
export const CODE_EXAMPLES: CodeExample[] = [
  {
    algorithm: "BUBBLE_SORT",
    language: "CPP",
    code: bubbleSortCpp,
  },
  {
    algorithm: "BUBBLE_SORT",
    language: "PYTHON",
    code: bubbleSortPython,
  },

  {
    algorithm: "SELECTION_SORT",
    language: "CPP",
    code: selectionSortCpp,
  },
  {
    algorithm: "SELECTION_SORT",
    language: "PYTHON",
    code: selectionSortPython,
  },

  {
    algorithm: "INSERTION_SORT",
    language: "CPP",
    code: insertionSortCpp,
  },
  {
    algorithm: "INSERTION_SORT",
    language: "PYTHON",
    code: insertionSortPython,
  },

  {
    algorithm: "MERGE_SORT",
    language: "CPP",
    code: mergeSortCpp,
  },
  {
    algorithm: "MERGE_SORT",
    language: "PYTHON",
    code: mergeSortPython,
  },

  {
    algorithm: "QUICK_SORT",
    language: "CPP",
    code: quickSortCpp,
  },
  {
    algorithm: "QUICK_SORT",
    language: "PYTHON",
    code: quickSortPython,
  },

  {
    algorithm: "HEAP_SORT",
    language: "CPP",
    code: heapSortCpp,
  },
  {
    algorithm: "HEAP_SORT",
    language: "PYTHON",
    code: heapSortPython,
  },

  {
    algorithm: "SHELL_SORT",
    language: "CPP",
    code: shellSortCpp,
  },
  {
    algorithm: "SHELL_SORT",
    language: "PYTHON",
    code: shellSortPython,
  },
];

/**
 * Obtiene el código correspondiente a un algoritmo
 * y lenguaje determinados.
 *
 * @param algorithm - Algoritmo seleccionado.
 * @param language - Lenguaje seleccionado.
 * @returns Ejemplo de código o undefined.
 */
export function getCodeExample(
  algorithm: AlgorithmType,
  language: CodeLanguage
): CodeExample | undefined {
  return CODE_EXAMPLES.find(
    (example) =>
      example.algorithm === algorithm &&
      example.language === language
  );
}

/**
 * Obtiene solamente el código de un algoritmo.
 *
 * @param algorithm - Algoritmo seleccionado.
 * @param language - Lenguaje seleccionado.
 * @returns Código fuente o cadena vacía.
 */
export function getAlgorithmCode(
  algorithm: AlgorithmType,
  language: CodeLanguage
): string {
  return (
    getCodeExample(algorithm, language)?.code ?? ""
  );
}

/**
 * Obtiene los ejemplos de código de un algoritmo
 * en todos los lenguajes disponibles.
 *
 * @param algorithm - Algoritmo seleccionado.
 * @returns Ejemplos de código.
 */
export function getAlgorithmExamples(
  algorithm: AlgorithmType
): CodeExample[] {
  return CODE_EXAMPLES.filter(
    (example) => example.algorithm === algorithm
  );
}

/**
 * Obtiene todos los lenguajes disponibles
 * para un algoritmo.
 *
 * @param algorithm - Algoritmo seleccionado.
 * @returns Lenguajes disponibles.
 */
export function getAvailableLanguages(
  algorithm: AlgorithmType
): CodeLanguage[] {
  return getAlgorithmExamples(algorithm).map(
    (example) => example.language
  );
}

/**
 * Lenguaje utilizado inicialmente por
 * el visor de código.
 */
export const DEFAULT_CODE_LANGUAGE: CodeLanguage =
  "CPP";