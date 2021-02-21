/**
 * Angle between two vectors.
 */
export interface Angle {
  radians: number
  degrees: number
}

/**
 * Returns a new angle in degrees.
 * @param x Number of degrees.
 */
export function degrees (x: number): Angle {
  return new Degrees(x)
}

/**
 * Returns a new angle in radians.
 * @param x Number of radians.
 */
export function radians (x: number): Angle {
  return new Radians(x)
}

/**
 * Angle representation in degrees.
 */
class Degrees implements Angle {
  constructor (public readonly degrees: number) {}

  get radians (): number {
    return this.degrees * Math.PI / 180
  }
}

/**
 * Angle representation in radians.
 */
class Radians implements Angle {
  constructor (public readonly radians: number) {}

  get degrees (): number {
    return this.radians * 180 / Math.PI
  }
}
