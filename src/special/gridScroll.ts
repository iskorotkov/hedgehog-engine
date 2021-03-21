import { SimpleModel } from '../engine/models/simpleModel'
import { Vector3 } from '../math/vector'

/**
 * Utility for scrolling (animating) previously created grid.
 */
export class GridScroll {
  /**
   * Returns GridScroll.
   * @param model Model to scroll.
   * @param componentsPerVertex Number of components per vertex.
   * @param heightIndex Index of height component to scroll.
   */
  constructor (
      private readonly model: SimpleModel,
      private readonly componentsPerVertex: number,
      private readonly heightIndex: number,
      private readonly normalStartIndex: number
  ) {
  }

  /**
   * Scroll grid and use provided values for edge row.
   * @param data Data to use in edge row.
   */
  scroll (data: number[]) {
    const columns = data.length
    const rows = this.model.vertices.length / columns / this.componentsPerVertex

    const vertices = this.model.vertices

    // Reassign (shift) heights and normals.
    for (let row = 0; row < rows - 1; row++) {
      const curRowStart = row * columns * this.componentsPerVertex
      const nextRowStart = (row + 1) * columns * this.componentsPerVertex
      for (let col = 0; col < columns; col++) {
        const curColStart = curRowStart + col * this.componentsPerVertex
        const nextColStart = nextRowStart + col * this.componentsPerVertex

        const curIndex = curColStart + this.heightIndex
        const nextIndex = nextColStart + this.heightIndex
        vertices[curIndex] = vertices[nextIndex] ?? -1
      }
    }

    // Assign heights to "new" vertices.
    const lastRowStart = (rows - 2) * columns * this.componentsPerVertex
    for (let col = 0; col < columns; col++) {
      const index = lastRowStart + col * this.componentsPerVertex + this.heightIndex
      vertices[index] = data[col] ?? -1
    }

    // Recalculate normals.
    // Imagine going from top to bottom (rows), left to right (columns).
    for (let row = 1; row < rows - 1; row++) {
      const topStart = (row - 1) * columns * this.componentsPerVertex
      const bottomStart = (row + 1) * columns * this.componentsPerVertex

      const currentRowStart = row * columns * this.componentsPerVertex
      for (let col = 1; col < columns - 1; col++) {
        const leftStart = currentRowStart + (col - 1) * this.componentsPerVertex
        const rightStart = currentRowStart + (col + 1) * this.componentsPerVertex

        const currentNormal = currentRowStart + col * this.componentsPerVertex + this.normalStartIndex

        const topV = new Vector3(vertices[topStart] ?? 0, vertices[topStart + 1] ?? 0, vertices[topStart + 2] ?? 0)
        const bottomV = new Vector3(vertices[bottomStart] ?? 0, vertices[bottomStart + 1] ?? 0, vertices[bottomStart + 2] ?? 0)

        const leftV = new Vector3(vertices[leftStart] ?? 0, vertices[leftStart + 1] ?? 0, vertices[leftStart + 2] ?? 0)
        const rightV = new Vector3(vertices[rightStart] ?? 0, vertices[rightStart + 1] ?? 0, vertices[rightStart + 2] ?? 0)

        const topToBottom = topV.subtract(bottomV)
        const leftToRight = leftV.subtract(rightV)

        const normals = leftToRight.cross(topToBottom)

        vertices[currentNormal] = normals.x
        vertices[currentNormal + 1] = normals.y
        vertices[currentNormal + 2] = normals.z
      }
    }
  }
}
