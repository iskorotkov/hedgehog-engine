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
   * @param positionIndex Index of the first position component (x) to scroll.
   * @param normalIndex Index of the first normal component (x) to scroll.
   */
  constructor (
      private readonly model: SimpleModel,
      private readonly componentsPerVertex: number,
      private readonly positionIndex: number,
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

        vertices[curColStart + this.positionIndex + 1] = vertices[nextColStart + this.positionIndex + 1] ?? 0
        vertices[curColStart + this.normalIndex + 0] = vertices[nextColStart + this.normalIndex] ?? 0
        vertices[curColStart + this.normalIndex + 1] = vertices[nextColStart + this.normalIndex + 1] ?? 0
        vertices[curColStart + this.normalIndex + 2] = vertices[nextColStart + this.normalIndex + 2] ?? 0
      }
    }

    // Assign heights to "new" vertices.
    const preLastRowStart = (rows - 2) * columns * this.componentsPerVertex
    const lastRowStart = (rows - 1) * columns * this.componentsPerVertex
    for (let col = 0; col < columns; col++) {
      const colStart = lastRowStart + col * this.componentsPerVertex
      vertices[colStart + this.positionIndex + 1] = data[col] ?? 0
    }

    // Calculate normals for new points.
    for (let col = 0; col < columns; col++) {
      const prevStart = preLastRowStart + col * this.componentsPerVertex + this.positionIndex
      const thisStart = lastRowStart + col * this.componentsPerVertex + this.positionIndex

      const leftStart = col !== 0
        ? lastRowStart + (col - 1) * this.componentsPerVertex + this.positionIndex
        : lastRowStart + col * this.componentsPerVertex + this.positionIndex

      const rightStart = col !== columns - 1
        ? lastRowStart + (col + 1) * this.componentsPerVertex + this.positionIndex
        : lastRowStart + col * this.componentsPerVertex + this.positionIndex

      const colStart = lastRowStart + col * this.componentsPerVertex

      const prevV = new Vector3(vertices[prevStart] ?? 0, vertices[prevStart + 1] ?? 0, vertices[prevStart + 2] ?? 0)
      const thisV = new Vector3(vertices[thisStart] ?? 0, vertices[thisStart + 1] ?? 0, vertices[thisStart + 2] ?? 0)
      const prevToThis = prevV.subtract(thisV)

      const leftV = new Vector3(vertices[leftStart] ?? 0, vertices[leftStart + 1] ?? 0, vertices[leftStart + 2] ?? 0)
      const rightV = new Vector3(vertices[rightStart] ?? 0, vertices[rightStart + 1] ?? 0, vertices[rightStart + 2] ?? 0)
      const leftToRight = leftV.subtract(rightV)

      const normals = leftToRight.cross(prevToThis).normalize()

      vertices[colStart + this.normalIndex] = normals.x
      vertices[colStart + this.normalIndex + 1] = normals.y
      vertices[colStart + this.normalIndex + 2] = normals.z
    }
  }
}
