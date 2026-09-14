
/**
 * Formatea un tiempo expresado en milisegundos.
 *
 * @param milliseconds - Tiempo en milisegundos.
 * @returns Tiempo formateado para mostrar en la interfaz.
 */
export function formatTime(milliseconds: number): string {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) {
    return "0 ms";
  }

  if (milliseconds < 1000) {
    return `${milliseconds.toFixed(2)} ms`;
  }

  const seconds = milliseconds / 1000;

  if (seconds < 60) {
    return `${seconds.toFixed(2)} s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes} min ${remainingSeconds.toFixed(2)} s`;
}

/**
 * Formatea un tiempo en milisegundos sin cambiar la unidad.
 *
 * Útil para las métricas internas del simulador.
 *
 * @param milliseconds - Tiempo en milisegundos.
 * @returns Tiempo con dos decimales.
 */
export function formatMilliseconds(milliseconds: number): string {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) {
    return "0.00 ms";
  }

  return `${milliseconds.toFixed(2)} ms`;
}

/**
 * Convierte milisegundos a segundos.
 *
 * @param milliseconds - Tiempo en milisegundos.
 * @returns Tiempo en segundos.
 */
export function millisecondsToSeconds(milliseconds: number): number {
  if (!Number.isFinite(milliseconds) || milliseconds < 0) {
    return 0;
  }

  return milliseconds / 1000;
}

