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
   * @param normalIndex Index of the first normal component (x) to scroll.
   */
  constructor (
      private readonly model: SimpleModel,
      private readonly componentsPerVertex: number,
      private readonly heightIndex: number,
      private readonly normalIndex: number
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

        vertices[curColStart + this.heightIndex] = vertices[nextColStart + this.heightIndex] ?? -1
        vertices[curColStart + this.normalIndex + 0] = vertices[nextColStart + this.normalIndex] ?? -1
        vertices[curColStart + this.normalIndex + 1] = vertices[nextColStart + this.normalIndex + 1] ?? -1
        vertices[curColStart + this.normalIndex + 2] = vertices[nextColStart + this.normalIndex + 2] ?? -1
      }
    }

    // Assign heights to "new" vertices.
    const lastRow = rows - 1
    const lastRowStart = lastRow * columns * this.componentsPerVertex
    for (let col = 0; col < columns; col++) {
      const colStart = lastRowStart + col * this.componentsPerVertex
      vertices[colStart + this.heightIndex] = data[col] ?? -1
    }

    // Recalculate normals.
    // Imagine going from top to bottom (rows), left to right (columns).
    const prevStart = (lastRow - 1) * columns * this.componentsPerVertex
    const thisStart = lastRow * columns * this.componentsPerVertex

    for (let col = 0; col < columns; col++) {
      const leftStart = col !== 0
        ? lastRowStart + (col - 1) * this.componentsPerVertex
        : lastRowStart + col * this.componentsPerVertex

      const rightStart = col !== columns - 1
        ? lastRowStart + (col + 1) * this.componentsPerVertex
        : lastRowStart + col * this.componentsPerVertex

      const colStart = lastRowStart + col * this.componentsPerVertex

      const topV = new Vector3(vertices[prevStart] ?? 0, vertices[prevStart + 1] ?? 0, vertices[prevStart + 2] ?? 0)
      const thisV = new Vector3(vertices[thisStart] ?? 0, vertices[thisStart + 1] ?? 0, vertices[thisStart + 2] ?? 0)
      const topToThis = topV.subtract(thisV)

      const leftV = new Vector3(vertices[leftStart] ?? 0, vertices[leftStart + 1] ?? 0, vertices[leftStart + 2] ?? 0)
      const rightV = new Vector3(vertices[rightStart] ?? 0, vertices[rightStart + 1] ?? 0, vertices[rightStart + 2] ?? 0)
      const leftToRight = leftV.subtract(rightV)

      const normals = leftToRight.cross(topToThis).normalize()

      vertices[colStart + this.normalIndex] = normals.x
      vertices[colStart + this.normalIndex + 1] = normals.y
      vertices[colStart + this.normalIndex + 2] = normals.z
    }
  }
}
