/**
 * Returns a number as a string using fixed-point notation for using in a shader.
 * Preserves only 6 fraction digits in the result.
 * @param n Number to convert.
 */
export function stringify (n: number): string {
  return n.toFixed(6)
}
