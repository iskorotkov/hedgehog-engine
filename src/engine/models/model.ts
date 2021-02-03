/**
 * Model prepared to be drawn.
 */
export interface PreparedModel {
  /**
   * Vertices buffer.
   */
  vertices: WebGLBuffer

  /**
   * Indices buffer.
   */
  indices: WebGLBuffer

  /**
   * Number of indices.
   */
  indexCount: number
}

/**
 * Model to draw.
 */
export interface Model {
  /**
   * Returns prepared model.
   * @param gl
   */
  prepare (gl: WebGLRenderingContext): PreparedModel
}
