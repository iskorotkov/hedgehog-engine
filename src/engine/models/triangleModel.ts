import { SimpleModel } from './simpleModel'

/**
 * Triangular model consisting of a single triangle and 3 vertices.
 */
export const triangleModel = new SimpleModel(
  [
    -0.5, -0.5, 1.0, 0.0, 0.0,
    0.5, -0.5, 0.0, 1.0, 0.0,
    0.0, 0.5, 0.0, 0.0, 1.0
  ], [
    0, 1, 2
  ])
