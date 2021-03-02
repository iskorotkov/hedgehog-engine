import { Model, PreparedModel } from './model'

/**
 * Volumetric model prepared to be drawn.
 */
export class PreparedVolumetricModel implements PreparedModel {
  /**
   * Returns simple model prepared to be drawn.
   * @param vertices Vertices buffer.
   * @param indices Indices buffer.
   * @param indexCount Number of indices.
   */
  constructor (
    public readonly vertices: WebGLBuffer,
    public readonly indices: WebGLBuffer,
    public readonly indexCount: number
  ) {}
}

/**
 * Volumetric model with a single vertices buffer and a single indices buffer.
 */
export class VolumetricModel implements Model {
  /**
   * Returns a volumetric model with a single vertices buffer and a single indices buffer.
   * @param vertices Vertices of the model.
   * @param indices Indices of the model.
   */
  constructor (private readonly vertices: number[], private readonly indices: number[]) {}

  /**
   * Returns volumetric model prepared to be drawn.
   * @param gl WebGL context.
   */
  prepare (gl: WebGLRenderingContext): PreparedVolumetricModel {
    const verticesBuffer = gl.createBuffer()
    if (!verticesBuffer) {
      throw new Error('couldn\'t create vertices buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW)

    const indicesBuffer = gl.createBuffer()
    if (!indicesBuffer) {
      throw new Error('couldn\'t create indices buffer')
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW)

    return new PreparedVolumetricModel(verticesBuffer, indicesBuffer, this.indices.length)
  }
}
