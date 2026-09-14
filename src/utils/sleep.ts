/**
 * Pausa la ejecución durante un tiempo determinado.
 *
 * @param milliseconds - Tiempo de espera en milisegundos.
 * @returns Promise que se resuelve después del tiempo indicado.
 */
export function sleep(milliseconds: number): Promise<void> {
  const delay =
    Number.isFinite(milliseconds) && milliseconds >= 0
      ? milliseconds
      : 0;

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/**
 * Pausa la ejecución durante un número determinado de segundos.
 *
 * @param seconds - Cantidad de segundos de espera.
 * @returns Promise que se resuelve después del tiempo indicado.
 */
export function sleepSeconds(seconds: number): Promise<void> {
  const delay =
    Number.isFinite(seconds) && seconds >= 0
      ? seconds * 1000
      : 0;

  return sleep(delay);
}