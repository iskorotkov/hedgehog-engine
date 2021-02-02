import { Model } from './model'

export class PreparedSimpleModel {
  constructor (public vertices: WebGLBuffer, public indices: WebGLBuffer, public indexCount: number) {}
}

export class SimpleModel implements Model {
  constructor (private vertices: number[], private indices: number[]) {}

  prepare (gl: WebGLRenderingContext): PreparedSimpleModel {
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

    return new PreparedSimpleModel(verticesBuffer, indicesBuffer, this.indices.length)
  }
}
