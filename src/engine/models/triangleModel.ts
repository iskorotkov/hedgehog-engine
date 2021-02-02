import { Model } from './model'

export class PreparedTriangleModel {
  constructor (public vertices: WebGLBuffer, public indices: WebGLBuffer, public indexCount: number) {}
}

export class TriangleModel implements Model {
  private vertices = [
    -0.5, -0.5, 1.0, 0.0, 0.0,
    0.5, -0.5, 0.0, 1.0, 0.0,
    0.0, 0.5, 0.0, 0.0, 1.0
  ]

  private indices = [
    0, 1, 2
  ]

  prepare (gl: WebGLRenderingContext): PreparedTriangleModel {
    const vbo = gl.createBuffer()
    if (!vbo) {
      throw new Error('couldn\'t create vbo buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW)

    const ibo = gl.createBuffer()
    if (!ibo) {
      throw new Error('couldn\'t create ibo buffer')
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW)

    return new PreparedTriangleModel(vbo, ibo, 3)
  }
}
