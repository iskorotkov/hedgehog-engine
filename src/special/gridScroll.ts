import { SimpleModel } from '../engine/models/simpleModel'

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
      private readonly componentsPerVertex: number = 8,
      private readonly heightIndex: number = 4
  ) {
  }

  /**
   * Scroll grid and use provided values for edge row.
   * @param data Data to use in edge row.
   */
  scroll (data: number[]) {
    const columns = data.length
    const rows = this.model.vertices.length / columns / this.componentsPerVertex

    // Reassign (shift) heights.
    for (let row = 0; row < rows - 1; row++) {
      const rowStart = row * columns * this.componentsPerVertex
      const nextRowStart = (row + 1) * columns * this.componentsPerVertex
      for (let col = 0; col < columns; col++) {
        const colStart = rowStart + col * this.componentsPerVertex
        const nextColStart = nextRowStart + col * this.componentsPerVertex

        const curIndex = colStart + this.heightIndex
        const nextIndex = nextColStart + this.heightIndex
        this.model.vertices[curIndex] = this.model.vertices[nextIndex] ?? -1
      }
    }

    // Assign heights to "new" vertices.
    const lastRowStart = (rows - 2) * columns * this.componentsPerVertex
    for (let col = 0; col < columns; col++) {
      const index = lastRowStart + col * this.componentsPerVertex
      this.model.vertices[index] = data[col] ?? -1
    }
  }
}
