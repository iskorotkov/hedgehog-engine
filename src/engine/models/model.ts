export interface PreparedModel {
  vertices: WebGLBuffer
  indices: WebGLBuffer
  indexCount: number
}

export interface Model {
  prepare (gl: WebGLRenderingContext): PreparedModel
}
