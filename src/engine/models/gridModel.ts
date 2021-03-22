import { SimpleModel } from './simpleModel'

/**
 * Dimensions for 2D/3D grid.
 */
export interface Dimensions {
  rows: number,
  cols: number
}

/**
 * Creates a 2D/3D grid.
 * @param dimensions Grid dimensions.
 * @param mode 2D or 3D mode.
 * @param normals Add normals for vertices.
 * @returns Returns a model representing a 2D/3D grid.
 */
export function gridModel (
  { rows, cols }: Dimensions,
  mode: '2d' | '3d' = '2d',
  normals: 'add' | 'ignore' = 'add'
): SimpleModel {
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
      const z = start + size * col / (cols - 1)

      if (mode === '3d') {
      // Add world coordinates (x, y, z).
        vertices.push(x, 0, z)
      } else {
      // Add world coordinates (x, z).
        vertices.push(x, z)
      }

      if (normals === 'add') {
        // Add normals (x, y, z).
        vertices.push(0, 1, 0)
      }

      // Add texture coordinates (u, v).
      vertices.push(row / (rows - 1), col / (cols - 1))

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

  return new SimpleModel(vertices, indices)
}
