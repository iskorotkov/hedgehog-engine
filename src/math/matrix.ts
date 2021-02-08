import { normalize3, Vector3 } from './vector'
import { Angle } from './angle'

// Interfaces

interface Matrix {
  readonly values: number[]
}

export interface Matrix2 extends Matrix {}

export interface Matrix3 extends Matrix, Matrix2 {}

export interface Matrix4 extends Matrix, Matrix2, Matrix3 {}

// Implementation

class MatrixImpl {
  constructor (public readonly values: number[]) {}
}

// Creation

export function mat2 (
  x1: number, y1: number,
  x2: number, y2: number
): Matrix2 {
  return new MatrixImpl([
    x1, y1,
    x2, y2
  ])
}

export function mat3 (
  x1: number, y1: number, z1: number,
  x2: number, y2: number, z2: number,
  x3: number, y3: number, z3: number
): Matrix3 {
  return new MatrixImpl([
    x1, y1, z1,
    x2, y2, z2,
    x3, y3, z3
  ])
}

export function mat4 (
  x1: number, y1: number, z1: number, w1: number,
  x2: number, y2: number, z2: number, w2: number,
  x3: number, y3: number, z3: number, w3: number,
  x4: number, y4: number, z4: number, w4: number
): Matrix4 {
  return new MatrixImpl([
    x1, y1, z1, w1,
    x2, y2, z2, w2,
    x3, y3, z3, w3,
    x4, y4, z4, w4
  ])
}

// From number

export function num2 (value: number): Matrix2 {
  return mat2(
    value, 0,
    0, value
  )
}

export function num3 (value: number): Matrix3 {
  return mat3(
    value, 0, 0,
    0, value, 0,
    0, 0, value
  )
}

export function num4 (value: number): Matrix4 {
  return mat4(
    value, 0, 0, 0,
    0, value, 0, 0,
    0, 0, value, 0,
    0, 0, 0, value
  )
}

// Copying

export function copy2 (original: Matrix2): Matrix2 {
  return new MatrixImpl(original.values.slice())
}

export function copy3 (original: Matrix3): Matrix3 {
  return new MatrixImpl(original.values.slice())
}

export function copy4 (original: Matrix4): Matrix4 {
  return new MatrixImpl(original.values.slice())
}

// Special matrices

export function translate (offset: Vector3): Matrix4 {
  return mat4(
    1, 0, 0, offset.x,
    0, 1, 0, offset.y,
    0, 0, 1, offset.z,
    0, 0, 0, 1
  )
}

export function rotate (axis: Vector3, angle: Angle): Matrix4 {
  axis = normalize3(axis)

  const c = Math.cos(angle.radians)
  const s = Math.sin(angle.radians)
  const mc = 1 - c

  const x = axis.x
  const y = axis.y
  const z = axis.z
  return mat4(
    x * x * mc + c, x * y * mc - z * s, x * z * mc + y * s, 0,
    y * x * mc + z * s, y * y * mc + c, y * z * mc - x * s, 0,
    x * z * mc - y * s, y * z * mc + x * s, z * z * mc + c, 0,
    0, 0, 0, 1
  )
}

export function scale (scale: Vector3): Matrix4 {
  return mat4(
    scale.x, 0, 0, 0,
    0, scale.y, 0, 0,
    0, 0, scale.z, 0,
    0, 0, 0, 1
  )
}

export function parallelProject (
  left: number,
  right: number,
  top: number,
  bottom: number,
  far: number,
  near: number
): Matrix4 {
  return mat4(
    2 / (right - left), 0, 0, -(right + left) / (right - left),
    0, 2 / (top - bottom), 0, -(top + bottom) / (top - bottom),
    0, 0, -2 / (far - near), -(far + near) / (far - near),
    0, 0, 0, 1
  )
}

export function perspectiveProject (
  left: number,
  right: number,
  top: number,
  bottom: number,
  far: number,
  near: number
): Matrix4 {
  return mat4(
    2 * near / (right - left), 0, (right + left) / (right - left), 0,
    0, 2 * near / (top - bottom), (top + bottom) / (top - bottom), 0,
    0, 0, -(far + near) / (far - near), -2 * far * near / (far - near),
    0, 0, -1, 0
  )
}

// Multiplication

function multiply (a: number[], b: number[], dim: number): number[] {
  const res: number[] = []

  for (let row = 0; row < dim; row++) {
    for (let col = 0; col < dim; col++) {
      let value = 0
      for (let iter = 0; iter < dim; iter++) {
        // i,j * j,k
        value += (a[row * dim + col] ?? 0) * (b[col * dim + iter] ?? 0)
      }

      res.push(value)
    }
  }

  return res
}

export function multiply2 (left: Matrix2, right: Matrix2): Matrix2 {
  return new MatrixImpl(multiply(left.values, right.values, 2))
}

export function multiply3 (left: Matrix3, right: Matrix3): Matrix3 {
  return new MatrixImpl(multiply(left.values, right.values, 3))
}

export function multiply4 (left: Matrix4, right: Matrix4): Matrix4 {
  return new MatrixImpl(multiply(left.values, right.values, 4))
}

// Addition

function sum (a: number[], b: number[]): number[] {
  let res = []
  for (let i = 0; i < a.length; i++) {
    res.push((a[i] ?? 0) + (b[i] ?? 0))
  }

  return res
}

export function add2 (left: Matrix2, right: Matrix2): Matrix2 {
  return new MatrixImpl(sum(left.values, right.values))
}

export function add3 (left: Matrix3, right: Matrix3): Matrix3 {
  return new MatrixImpl(sum(left.values, right.values))
}

export function add4 (left: Matrix4, right: Matrix4): Matrix4 {
  return new MatrixImpl(sum(left.values, right.values))
}

// Subtraction

function subtract (a: number[], b: number[]): number[] {
  let res = []
  for (let i = 0; i < a.length; i++) {
    res.push((a[i] ?? 0) - (b[i] ?? 0))
  }

  return res
}

export function subtract2 (left: Matrix2, right: Matrix2): Matrix2 {
  return new MatrixImpl(subtract(left.values, right.values))
}

export function subtract3 (left: Matrix3, right: Matrix3): Matrix3 {
  return new MatrixImpl(subtract(left.values, right.values))
}

export function subtract4 (left: Matrix4, right: Matrix4): Matrix4 {
  return new MatrixImpl(subtract(left.values, right.values))
}
