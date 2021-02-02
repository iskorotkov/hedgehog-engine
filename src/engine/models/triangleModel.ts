import { SimpleModel } from './simpleModel'

export const triangleModel = new SimpleModel(
  [
    -0.5, -0.5, 1.0, 0.0, 0.0,
    0.5, -0.5, 0.0, 1.0, 0.0,
    0.0, 0.5, 0.0, 0.0, 1.0
  ], [
    0, 1, 2
  ])
