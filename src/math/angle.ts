export interface Angle {
  radians: number
  degrees: number
}

export function degrees (x: number): Angle {
  return new Degrees(x)
}

export function radians (x: number): Angle {
  return new Radians(x)
}

class Degrees implements Angle {
  constructor (public readonly degrees: number) {}

  get radians (): number {
    return this.degrees * Math.PI / 180
  }
}

class Radians implements Angle {
  constructor (public readonly radians: number) {}

  get degrees (): number {
    return this.radians * 180 / Math.PI
  }
}
