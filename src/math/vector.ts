/**
 * 2D vector.
 */
export class Vector2 {
  public constructor (public x: number, public y: number) {}

  /**
   * Creates a copy of the vector.
   */
  clone (): Vector2 {
    return new Vector2(this.x, this.y)
  }

  /**
   * Returns squared vector size (squared length).
   */
  sizeSquared (): number {
    return this.x ** 2 + this.y ** 2
  }

  /**
   * Returns vector size (length).
   */
  size (): number {
    return Math.sqrt(this.sizeSquared())
  }

  /**
   * Returns a normalized copy of the vector.
   */
  normalize (): Vector2 {
    const size = this.size()
    return new Vector2(this.x / size, this.y / size)
  }

  /**
   * Returns a sum of vector components.
   */
  sum (): number {
    return this.x + this.y
  }

  /**
   * Returns a new vector representing a sum of two vectors.
   * @param v Vector to add.
   */
  add (v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y)
  }

  /**
   * Returns a new vector representing a difference between two vectors.
   * @param v Vector to subtract.
   */
  subtract (v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y)
  }

  /**
   * Returns a new vector where each component is a product of
   * corresponding components in original vectors.
   * @param v Second vector.
   */
  multiply (v: Vector2): Vector2 {
    return new Vector2(this.x * v.x, this.y * v.y)
  }

  /**
   * Returns a new vector where each component is a ratio of
   * corresponding components in original vectors.
   * @param v Second vector.
   */
  divide (v: Vector2): Vector2 {
    return new Vector2(this.x / v.x, this.y / v.y)
  }

  /**
   * Returns a dot product of two vectors.
   * @param v Second vector.
   */
  dot (v: Vector2): number {
    return this.x * v.x + this.y * v.y
  }
}

/**
 * 3D vector.
 */
export class Vector3 {
  public constructor (public x: number, public y: number, public z: number) {}

  /**
   * Creates a copy of the vector.
   */
  clone (): Vector3 {
    return new Vector3(this.x, this.y, this.z)
  }

  /**
   * Returns squared vector size (squared length).
   */
  sizeSquared (): number {
    return this.x ** 2 + this.y ** 2 + this.z ** 2
  }

  /**
   * Returns vector size (length).
   */
  size (): number {
    return Math.sqrt(this.sizeSquared())
  }

  /**
   * Returns a normalized copy of the vector.
   */
  normalize (): Vector3 {
    const size = this.size()
    return new Vector3(this.x / size, this.y / size, this.z / size)
  }

  /**
   * Returns a sum of vector components.
   */
  sum (): number {
    return this.x + this.y + this.z
  }

  /**
   * Returns a new vector representing a sum of two vectors.
   * @param v Vector to add.
   */
  add (v: Vector3): Vector3 {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
  }

  /**
   * Returns a new vector representing a difference between two vectors.
   * @param v Vector to subtract.
   */
  subtract (v: Vector3): Vector3 {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
  }

  /**
   * Returns a new vector where each component is a product of
   * corresponding components in original vectors.
   * @param v Second vector.
   */
  multiply (v: Vector3): Vector3 {
    return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z)
  }

  /**
   * Returns a new vector where each component is a ratio of
   * corresponding components in original vectors.
   * @param v Second vector.
   */
  divide (v: Vector3): Vector3 {
    return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z)
  }

  /**
   * Returns a dot product of two vectors.
   * @param v Second vector.
   */
  dot (v: Vector3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  /**
   * Returns a cross product of two vectors.
   * @param v Second vector.
   */
  cross (v: Vector3): Vector3 {
    return new Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    )
  }
}

/**
 * 4D vector.
 */
export class Vector4 {
  public constructor (public x: number, public y: number, public z: number, public w: number) {}

  /**
   * Creates a copy of the vector.
   */
  clone (): Vector4 {
    return new Vector4(this.x, this.y, this.z, this.w)
  }

  /**
   * Returns squared vector size (squared length).
   */
  sizeSquared (): number {
    return this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2
  }

  /**
   * Returns vector size (length).
   */
  size (): number {
    return Math.sqrt(this.sizeSquared())
  }

  /**
   * Returns a normalized copy of the vector.
   */
  normalize (): Vector4 {
    const size = this.size()
    return new Vector4(this.x / size, this.y / size, this.z / size, this.w / size)
  }

  /**
   * Returns a sum of vector components.
   */
  sum (): number {
    return this.x + this.y + this.z + this.w
  }

  /**
   * Returns a new vector representing a sum of two vectors.
   * @param v Vector to add.
   */
  add (v: Vector4): Vector4 {
    return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w)
  }

  /**
   * Returns a new vector representing a difference between two vectors.
   * @param v Vector to subtract.
   */
  subtract (v: Vector4): Vector4 {
    return new Vector4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w)
  }

  /**
   * Returns a new vector where each component is a product of
   * corresponding components in original vectors.
   * @param v Second vector.
   */
  multiply (v: Vector4): Vector4 {
    return new Vector4(this.x * v.x, this.y * v.y, this.z * v.z, this.w * v.w)
  }

  /**
   * Returns a new vector where each component is a ratio of
   * corresponding components in original vectors.
   * @param v Second vector.
   */
  divide (v: Vector4): Vector4 {
    return new Vector4(this.x / v.x, this.y / v.y, this.z / v.z, this.w / v.w)
  }

  /**
   * Returns a dot product of two vectors.
   * @param v Second vector.
   */
  dot (v: Vector4): number {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w
  }
}
