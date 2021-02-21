import { Vector3 } from './vector'
import { Angle } from './angle'

/**
 * 2D square matrix.
 */
export class Matrix2 {
  constructor (public readonly values: number[]) {
    if (values.length !== 4) {
      throw new Error('incorrect number of elements')
    }
  }

  /**
   * Creates a copy of the matrix.
   */
  clone (): Matrix2 {
    return new Matrix2(this.values.slice())
  }

  /**
   * Returns a new matrix as a result of a multiplication between this matrix and another one.
   * @param m Second matrix.
   */
  multiply (m: Matrix2): Matrix2 {
    return new Matrix2(multiply(this.values, m.values, 2))
  }

  /**
   * Returns a new matrix as a sum of this matrix and another one.
   * @param m Second matrix.
   */
  add (m: Matrix2): Matrix2 {
    return new Matrix2(add(this.values, m.values))
  }

  /**
   * Returns a new matrix as a difference between this matrix and another one.
   * @param m Second matrix.
   */
  subtract (m: Matrix2): Matrix2 {
    return new Matrix2(subtract(this.values, m.values))
  }

  /**
   * Returns a new transposed matrix.
   */
  transpose (): Matrix2 {
    return new Matrix2(transpose(this.values, 2))
  }

  /**
   * Returns a determinant of the matrix.
   */
  determinant (): number {
    return this.at(0, 0) * this.at(1, 1) - this.at(0, 1) * this.at(1, 0)
  }

  /**
   * Returns an inverse matrix if determinant is not 0.
   * Throws exception is determinant is 0 and inverse matrix doesn't exist.
   */
  inverse (): Matrix2 {
    return new Matrix2(inverse(this.values, 2))
  }

  /**
   * Returns a value in a specified position in the matrix.
   * @param row Row of the value.
   * @param col Columns of the value.
   */
  at (row: number, col: number): number {
    return this.values[row * 2 + col] ?? 0
  }

  /**
   * Sets a value in a specified position in the matrix.
   * @param row Row of the value.
   * @param col Columns of the value.
   * @param n Value to set.
   */
  set (row: number, col: number, n: number): void {
    this.values[row * 2 + col] = n
  }
}

/**
 * 3D square matrix.
 */
export class Matrix3 {
  constructor (public readonly values: number[]) {
    if (values.length !== 9) {
      throw new Error('incorrect number of elements')
    }
  }

  /**
   * Creates a copy of the matrix.
   */
  clone (): Matrix3 {
    return new Matrix3(this.values.slice())
  }

  /**
   * Returns a new matrix as a result of a multiplication between this matrix and another one.
   * @param m Second matrix.
   */
  multiply (m: Matrix3): Matrix3 {
    return new Matrix3(multiply(this.values, m.values, 3))
  }

  /**
   * Returns a new matrix as a sum of this matrix and another one.
   * @param m Second matrix.
   */
  add (m: Matrix3): Matrix3 {
    return new Matrix3(add(this.values, m.values))
  }

  /**
   * Returns a new matrix as a difference between this matrix and another one.
   * @param m Second matrix.
   */
  subtract (m: Matrix3): Matrix3 {
    return new Matrix3(subtract(this.values, m.values))
  }

  /**
   * Returns a new transposed matrix.
   */
  transpose (): Matrix3 {
    return new Matrix3(transpose(this.values, 3))
  }

  /**
   * Returns a determinant of the matrix.
   */
  determinant (): number {
    return this.at(0, 0) * (this.at(1, 1) * this.at(2, 2) - this.at(2, 1) * this.at(1, 2)) -
      this.at(0, 1) * (this.at(1, 0) * this.at(2, 2) - this.at(1, 2) * this.at(2, 0)) +
      this.at(0, 2) * (this.at(1, 0) * this.at(2, 1) - this.at(1, 1) * this.at(2, 0))
  }

  /**
   * Returns an inverse matrix if determinant is not 0.
   * Throws exception is determinant is 0 and inverse matrix doesn't exist.
   */
  inverse (): Matrix3 {
    return new Matrix3(inverse(this.values, 3))
  }

  /**
   * Returns a value in a specified position in the matrix.
   * @param row Row of the value.
   * @param col Columns of the value.
   */
  at (row: number, col: number): number {
    return this.values[row * 3 + col] ?? 0
  }

  /**
   * Sets a value in a specified position in the matrix.
   * @param row Row of the value.
   * @param col Columns of the value.
   * @param n Value to set.
   */
  set (row: number, col: number, n: number): void {
    this.values[row * 3 + col] = n
  }
}

/**
 * 4D square matrix.
 */
export class Matrix4 {
  constructor (public readonly values: number[]) {
    if (values.length !== 16) {
      throw new Error('incorrect number of elements')
    }
  }

  /**
   * Creates a copy of the matrix.
   */
  clone (): Matrix4 {
    return new Matrix4(this.values.slice())
  }

  /**
   * Returns a new matrix as a result of a multiplication between this matrix and another one.
   * @param m Second matrix.
   */
  multiply (m: Matrix4): Matrix4 {
    return new Matrix4(multiply(this.values, m.values, 4))
  }

  /**
   * Returns a new matrix as a sum of this matrix and another one.
   * @param m Second matrix.
   */
  add (m: Matrix4): Matrix4 {
    return new Matrix4(add(this.values, m.values))
  }

  /**
   * Returns a new matrix as a difference between this matrix and another one.
   * @param m Second matrix.
   */
  subtract (m: Matrix4): Matrix4 {
    return new Matrix4(subtract(this.values, m.values))
  }

  /**
   * Returns a new transposed matrix.
   */
  transpose (): Matrix4 {
    return new Matrix4(transpose(this.values, 4))
  }

  /**
   * Returns a determinant of the matrix.
   */
  determinant (): number {
    return determinant(this.values, 4)
  }

  /**
   * Returns an inverse matrix if determinant is not 0.
   * Throws exception is determinant is 0 and inverse matrix doesn't exist.
   */
  inverse (): Matrix4 {
    return new Matrix4(inverse(this.values, 4))
  }

  /**
   * Returns a value in a specified position in the matrix.
   * @param row Row of the value.
   * @param col Columns of the value.
   */
  at (row: number, col: number): number {
    return this.values[row * 4 + col] ?? 0
  }

  /**
   * Sets a value in a specified position in the matrix.
   * @param row Row of the value.
   * @param col Columns of the value.
   * @param n Value to set.
   */
  set (row: number, col: number, n: number): void {
    this.values[row * 4 + col] = n
  }
}

/**
 * Returns a 2D identity matrix.
 */
export function identity2 (): Matrix2 {
  return new Matrix2([
    1, 0,
    0, 1
  ])
}

/**
 * Returns a 3D identity matrix.
 */
export function identity3 (): Matrix3 {
  return new Matrix3([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ])
}

/**
 * Returns a 4D identity matrix.
 */
export function identity4 (): Matrix4 {
  return new Matrix4([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ])
}

/**
 * Returns a translation matrix.
 * @param offset Translation to apply.
 */
export function translate (offset: Vector3): Matrix4 {
  return new Matrix4([
    1, 0, 0, offset.x,
    0, 1, 0, offset.y,
    0, 0, 1, offset.z,
    0, 0, 0, 1
  ])
}

/**
 * Returns a rotation matrix.
 * @param axis Axis along which to rotate.
 * @param angle Angle of rotation.
 */
export function rotate (axis: Vector3, angle: Angle): Matrix4 {
  axis = axis.normalize()

  const c = Math.cos(angle.radians)
  const s = Math.sin(angle.radians)
  const mc = 1 - c

  const x = axis.x
  const y = axis.y
  const z = axis.z
  return new Matrix4([
    x * x * mc + c, x * y * mc - z * s, x * z * mc + y * s, 0,
    y * x * mc + z * s, y * y * mc + c, y * z * mc - x * s, 0,
    x * z * mc - y * s, y * z * mc + x * s, z * z * mc + c, 0,
    0, 0, 0, 1
  ])
}

/**
 * Returns a scale matrix.
 * @param scale Scale to apply.
 */
export function scale (scale: Vector3): Matrix4 {
  return new Matrix4([
    scale.x, 0, 0, 0,
    0, scale.y, 0, 0,
    0, 0, scale.z, 0,
    0, 0, 0, 1
  ])
}

/**
 * Returns a parallel projection matrix.
 * @param left Left plane.
 * @param right Right plane.
 * @param top Top plane.
 * @param bottom Bottom plane.
 * @param far Far plane.
 * @param near Near plane.
 */
export function parallelProject (
  left: number,
  right: number,
  top: number,
  bottom: number,
  far: number,
  near: number
): Matrix4 {
  return new Matrix4([
    2 / (right - left), 0, 0, -(right + left) / (right - left),
    0, 2 / (top - bottom), 0, -(top + bottom) / (top - bottom),
    0, 0, -2 / (far - near), -(far + near) / (far - near),
    0, 0, 0, 1
  ])
}

/**
 * Returns a perspective projection matrix.
 * @param left Left plane.
 * @param right Right plane.
 * @param top Top plane.
 * @param bottom Bottom plane.
 * @param far Far plane.
 * @param near Near plane.
 */
export function perspectiveProject (
  left: number,
  right: number,
  top: number,
  bottom: number,
  far: number,
  near: number
): Matrix4 {
  return new Matrix4([
    2 * near / (right - left), 0, (right + left) / (right - left), 0,
    0, 2 * near / (top - bottom), (top + bottom) / (top - bottom), 0,
    0, 0, -(far + near) / (far - near), -2 * far * near / (far - near),
    0, 0, -1, 0
  ])
}

/**
 * Returns a result of multiplication of two square matrices stored as arrays.
 * @param a First matrix.
 * @param b Second matrix.
 * @param dim Dimension of the matrices.
 */
function multiply (a: number[], b: number[], dim: number): number[] {
  const res: number[] = []

  for (let row = 0; row < dim; row++) {
    for (let col = 0; col < dim; col++) {
      let value = 0
      for (let iter = 0; iter < dim; iter++) {
        // i,k * k,j
        value += (a[row * dim + iter] ?? 0) * (b[iter * dim + col] ?? 0)
      }

      res.push(value)
    }
  }

  return res
}

/**
 * Returns a sum of two square matrices stored as arrays.
 * @param a First matrix.
 * @param b Second matrix.
 */
function add (a: number[], b: number[]): number[] {
  const res = []
  for (let i = 0; i < a.length; i++) {
    res.push((a[i] ?? 0) + (b[i] ?? 0))
  }

  return res
}

/**
 * Returns a difference between two square matrices stored as arrays.
 * @param a First matrix.
 * @param b Second matrix.
 */
function subtract (a: number[], b: number[]): number[] {
  const res = []
  for (let i = 0; i < a.length; i++) {
    res.push((a[i] ?? 0) - (b[i] ?? 0))
  }

  return res
}

/**
 * Returns a transposed square matrix stored as an array.
 * @param values Original matrix as an array.
 * @param dim Matrix dimension.
 */
function transpose (values: number[], dim: number): number[] {
  const result = []
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      result.push(values[j * dim + i] ?? 0)
    }
  }

  return result
}

/**
 * Returns a determinant of square matrix stored as an array.
 * @param values Matrix as an array.
 * @param dim Matrix dimension.
 */
function determinant (values: number[], dim: number): number {
  return cofactor(values, dim, [], [])
}

/**
 * Returns an inverse matrix stored as an array.
 * @param values Original matrix stored as an array.
 * @param dim Original matrix dimension.
 */
function inverse (values: number[], dim: number): number[] {
  const determinant = cofactor(values, dim, [], [])
  if (Math.abs(determinant) < 1e-6) {
    throw new Error('can\'t inverse the matrix because its determinant is zero')
  }

  const result = []
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      const multiplier = (i + j) % 2 === 0 ? 1 : -1
      const elem = cofactor(values, dim, [j], [i])
      result.push(multiplier * elem / determinant)
    }
  }

  return result
}

/**
 * Returns a cofactor of a matrix stored as an array.
 * @param values Original matrix as an array.
 * @param dim Original matrix dimension.
 * @param ignoreRows Rows that were excluded in previous steps.
 * @param ignoreCols Columns that were excluded in previous steps.
 */
function cofactor (values: number[], dim: number, ignoreRows: number[], ignoreCols: number[]): number {
  for (let row = 0; row < dim; row++) {
    if (ignoreRows.indexOf(row) !== -1) {
      continue
    }

    let result = 0
    let colNum = 0
    for (let col = 0; col < dim; col++) {
      if (ignoreCols.indexOf(col) !== -1) {
        continue
      }

      const cellValue = values[row * dim + col] ?? 0
      if (ignoreRows.length === dim - 1) {
        return cellValue
      }

      const multiplier = colNum % 2 === 0 ? 1 : -1
      const adj = cofactor(values, dim, [...ignoreRows, row], [...ignoreCols, col])
      result += multiplier * cellValue * adj

      colNum++
    }

    return result
  }

  return 0
}
