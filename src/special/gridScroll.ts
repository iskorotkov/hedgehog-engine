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

    // Reassign (shift) heights of all rows except the last one.
    for (let row = 0; row < rows - 1; row++) {
      const curRowStart = row * columns * this.componentsPerVertex
      const nextRowStart = (row + 1) * columns * this.componentsPerVertex
      for (let col = 0; col < columns; col++) {
        const curColStart = curRowStart + col * this.componentsPerVertex
        const nextColStart = nextRowStart + col * this.componentsPerVertex

        vertices[curColStart + this.positionIndex + 1] = vertices[nextColStart + this.positionIndex + 1] ?? 0
      }
    }

    // Reassign (shift) normals of all rows except the last two.
    for (let row = 0; row < rows - 2; row++) {
      const curRowStart = row * columns * this.componentsPerVertex
      const nextRowStart = (row + 1) * columns * this.componentsPerVertex
      for (let col = 0; col < columns; col++) {
        const curColStart = curRowStart + col * this.componentsPerVertex
        const nextColStart = nextRowStart + col * this.componentsPerVertex

        vertices[curColStart + this.normalIndex + 0] = vertices[nextColStart + this.normalIndex] ?? 0
        vertices[curColStart + this.normalIndex + 1] = vertices[nextColStart + this.normalIndex + 1] ?? 0
        vertices[curColStart + this.normalIndex + 2] = vertices[nextColStart + this.normalIndex + 2] ?? 0
      }
    }

    // Assign heights to "new" vertices.
    const prePreLastRowStart = (rows - 3) * columns * this.componentsPerVertex
    const preLastRowStart = (rows - 2) * columns * this.componentsPerVertex
    const lastRowStart = (rows - 1) * columns * this.componentsPerVertex
    for (let col = 0; col < columns; col++) {
      const colStart = lastRowStart + col * this.componentsPerVertex
      vertices[colStart + this.positionIndex + 1] = data[col] ?? 0
    }

    // Calculate normals for new points and recalculate normals for previous row.
    for (let col = 0; col < columns; col++) {
      const prevPositionStart = prePreLastRowStart + col * this.componentsPerVertex + this.positionIndex
      const curPositionStart = preLastRowStart + col * this.componentsPerVertex + this.positionIndex
      const nextPositionStart = lastRowStart + col * this.componentsPerVertex + this.positionIndex

      const leftPositionStart = col !== 0
        ? preLastRowStart + (col - 1) * this.componentsPerVertex + this.positionIndex
        : preLastRowStart + col * this.componentsPerVertex + this.positionIndex

      const rightPositionStart = col !== columns - 1
        ? preLastRowStart + (col + 1) * this.componentsPerVertex + this.positionIndex
        : preLastRowStart + col * this.componentsPerVertex + this.positionIndex

      const prevV = new Vector3(vertices[prevPositionStart] ?? 0, vertices[prevPositionStart + 1] ?? 0, vertices[prevPositionStart + 2] ?? 0)
      const curV = new Vector3(vertices[curPositionStart] ?? 0, vertices[curPositionStart + 1] ?? 0, vertices[curPositionStart + 2] ?? 0)
      const nextV = new Vector3(vertices[nextPositionStart] ?? 0, vertices[nextPositionStart + 1] ?? 0, vertices[nextPositionStart + 2] ?? 0)
      const leftV = new Vector3(vertices[leftPositionStart] ?? 0, vertices[leftPositionStart + 1] ?? 0, vertices[leftPositionStart + 2] ?? 0)
      const rightV = new Vector3(vertices[rightPositionStart] ?? 0, vertices[rightPositionStart + 1] ?? 0, vertices[rightPositionStart + 2] ?? 0)

      const curToNext = nextV.subtract(curV)
      const prevToNext = nextV.subtract(prevV)
      const leftToRight = rightV.subtract(leftV)

      const curNormals = leftToRight.cross(prevToNext).normalize()
      const nextNormals = leftToRight.cross(curToNext).normalize()

      const curNormalsStart = preLastRowStart + col * this.componentsPerVertex + this.normalIndex
      const nextNormalsStart = lastRowStart + col * this.componentsPerVertex + this.normalIndex

      // Recalculated normals for previous row.
      vertices[curNormalsStart] = curNormals.x
      vertices[curNormalsStart + 1] = curNormals.y
      vertices[curNormalsStart + 2] = curNormals.z

      // Normals for new row.
      vertices[nextNormalsStart] = nextNormals.x
      vertices[nextNormalsStart + 1] = nextNormals.y
      vertices[nextNormalsStart + 2] = nextNormals.z
    }
  }
}
