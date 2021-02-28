import { Vector3 } from '../../math/vector'
import { VolumetricModel } from './volumetricModel'

/**
 * Dimensions for 2D grid.
 */
export interface Dimensions {
  rows: number,
  cols: number
}

/**
 * Set of colors for a model.
 */
export interface Colors {
  diffuse: Vector3,
  specular: Vector3
}

/**
 * Creates a 2D grid.
 * @param transform Grid transform.
 * @param dimensions Grid dimensions.
 * @param colors Grid colors.
 * @returns Returns a model representing a 2D grid.
 */
export function gridModel ({ rows, cols }: Dimensions, { diffuse, specular }: Colors): VolumetricModel {
  if (rows <= 1 || cols <= 1) {
    throw new Error(`can't create grid model with ${rows} rows and ${cols} columns; rows and columns must be more than 2`)
  }

  const start = -0.5
  const size = 1

  const vertices = []
  const indices = []
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = start + size * row / (rows - 1)
      const y = start + size * col / (cols - 1)

      // Two coordinates, 3 components of diffuse color, 3 components of specular color.
      vertices.push(x, y, diffuse.x, diffuse.y, diffuse.z, specular.x, specular.y, specular.z)

      if (row === 0 || col === 0) {
        continue
      }

      // Find all vertices of a polygon:
      // LRTB - left/right/top/bottom.
      const rt = row * cols + col
      const lt = rt - 1
      const rb = rt - cols
      const lb = rb - 1

      // Add bottom right triangle.
      indices.push(lb, rb, rt)

      // Add top left triangle.
      indices.push(lb, rt, lt)
    }
  }

  return new VolumetricModel(vertices, indices)
}
