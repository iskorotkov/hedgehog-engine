// Interfaces

interface Vector {
  readonly values: number[]
}

export interface Vector2 extends Vector {
  readonly x: number
  readonly y: number
  readonly r: number

  readonly g: number
  readonly s: number
  readonly t: number
}

export interface Vector3 extends Vector, Vector2 {
  readonly z: number
  readonly b: number
  readonly p: number
}

export interface Vector4 extends Vector, Vector2, Vector3 {
  readonly w: number
  readonly a: number
  readonly q: number
}

// Implementation

class VectorImpl implements Vector, Vector2, Vector3, Vector4 {
  public constructor (public readonly values: number[]) {}

  get x (): number {
    return this.values[0] ?? 0
  }

  get r (): number {
    return this.values[0] ?? 0
  }

  get s (): number {
    return this.values[0] ?? 0
  }

  get y (): number {
    return this.values[1] ?? 0
  }

  get g (): number {
    return this.values[1] ?? 0
  }

  get t (): number {
    return this.values[1] ?? 0
  }

  get z (): number {
    return this.values[2] ?? 0
  }

  get b (): number {
    return this.values[2] ?? 0
  }

  get p (): number {
    return this.values[2] ?? 0
  }

  get w (): number {
    return this.values[3] ?? 0
  }

  get a (): number {
    return this.values[3] ?? 0
  }

  get q (): number {
    return this.values[3] ?? 0
  }
}

// Creation

export function vec2 (x: number, y: number): Vector2 {
  return new VectorImpl([x, y])
}

export function vec3 (x: number, y: number, z: number): Vector3 {
  return new VectorImpl([x, y, z])
}

export function vec4 (x: number, y: number, z: number, w: number): Vector4 {
  return new VectorImpl([x, y, z, w])
}

// From number

export function num2 (value: number): Vector2 {
  return vec2(value, value)
}

export function num3 (value: number): Vector3 {
  return vec3(value, value, value)
}

export function num4 (value: number): Vector4 {
  return vec4(value, value, value, value)
}

// Copying

export function copy2 (original: Vector2): Vector2 {
  return new VectorImpl(original.values.slice())
}

export function copy3 (original: Vector3): Vector3 {
  return new VectorImpl(original.values.slice())
}

export function copy4 (original: Vector4): Vector4 {
  return new VectorImpl(original.values.slice())
}

// Properties

export function sizeSquared (vector: Vector): number {
  let sum = 0
  for (const elem of vector.values) {
    sum += Math.pow(elem, 2)
  }

  return sum
}

export function size (vector: Vector): number {
  return Math.sqrt(sizeSquared(vector))
}

export function sum (vector: Vector): number {
  let sum = 0
  for (const elem of vector.values) {
    sum += elem
  }
  return sum
}

// Normalization

export function normalize2 (vector: Vector2): Vector2 {
  return divide2(vector, num2(size(vector)))
}

export function normalize3 (vector: Vector3): Vector3 {
  return divide3(vector, num3(size(vector)))
}

export function normalize4 (vector: Vector4): Vector4 {
  return divide4(vector, num4(size(vector)))
}

// Multiplication

export function multiply2 (left: Vector2, right: Vector2): Vector2 {
  return vec2(left.x * right.x, left.y * right.y)
}

export function multiply3 (left: Vector3, right: Vector3): Vector3 {
  return vec3(left.x * right.x, left.y * right.y, left.z * right.z)
}

export function multiply4 (left: Vector4, right: Vector4): Vector4 {
  return vec4(left.x * right.x, left.y * right.y, left.z * right.z, left.w * right.w)
}

// Division

export function divide2 (left: Vector2, right: Vector2): Vector2 {
  return vec2(left.x / right.x, left.y / right.y)
}

export function divide3 (left: Vector3, right: Vector3): Vector3 {
  return vec3(left.x / right.x, left.x / right.y, left.z / right.z)
}

export function divide4 (left: Vector4, right: Vector4): Vector4 {
  return vec4(left.x / right.x, left.y / right.y, left.z / right.z, left.w / right.w)
}

// Addition

export function add2 (left: Vector2, right: Vector2): Vector2 {
  return vec2(left.x + right.x, left.y + right.y)
}

export function add3 (left: Vector3, right: Vector3): Vector3 {
  return vec3(left.x + right.x, left.x + right.y, left.z + right.z)
}

export function add4 (left: Vector4, right: Vector4): Vector4 {
  return vec4(left.x + right.x, left.y + right.y, left.z + right.z, left.w + right.w)
}

// Subtraction

export function subtract2 (left: Vector2, right: Vector2): Vector2 {
  return vec2(left.x - right.x, left.y - right.y)
}

export function subtract3 (left: Vector3, right: Vector3): Vector3 {
  return vec3(left.x - right.x, left.x - right.y, left.z - right.z)
}

export function subtract4 (left: Vector4, right: Vector4): Vector4 {
  return vec4(left.x - right.x, left.y - right.y, left.z - right.z, left.w - right.w)
}

// Dot product

export function dot<T extends Vector> (left: T, right: T): number {
  let sum = 0
  for (let i = 0; i < left.values.length; i++) {
    sum += (left.values[i] ?? 0) * (right.values[i] ?? 0)
  }
  return sum
}
