import { Model } from './model'

export class PreparedSimpleModel {
  constructor (public readonly vertices: WebGLBuffer, public readonly indices: WebGLBuffer, public readonly indexCount: number) {}
}

export class SimpleModel implements Model {
  constructor (private readonly vertices: number[], private readonly indices: number[]) {}

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
