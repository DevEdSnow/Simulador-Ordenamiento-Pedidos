/**
 * Genera un identificador numérico único basado en
 * la fecha actual y un componente aleatorio.
 *
 * @returns Identificador numérico.
 */
export function generateId(): number {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);

  return timestamp * 1000 + random;
}

/**
 * Genera un identificador corto para mostrar
 * visualmente en la interfaz.
 *
 * @param prefix - Prefijo del identificador.
 * @returns Identificador en formato de texto.
 */
export function generateShortId(prefix = "ORD"): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${prefix}-${timestamp}-${random}`;
}