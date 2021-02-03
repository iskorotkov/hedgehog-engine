import { SimpleModel } from './simpleModel'

/**
 * Rectangular model consisting of two triangles and 4 vertices.
 */
export const rectangleModel = new SimpleModel(
  [
    -0.5, -0.5, 0.0, 0.0, 0.0,
    0.5, -0.5, 1.0, 0.0, 0.0,
    0.5, 0.5, 1.0, 1.0, 0.0,
    -0.5, 0.5, 0.0, 1.0, 0.0
  ], [
    0, 1, 2, 2, 3, 0
  ])
