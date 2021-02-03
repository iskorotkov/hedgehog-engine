import { CompiledProgram } from '../programs/program'
import { PreparedModel } from '../models/model'

export function clear (gl: WebGLRenderingContext) {
  gl.clearColor(0.8, 0.8, 0.8, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
}

export function draw (gl: WebGLRenderingContext, program: CompiledProgram, model: PreparedModel) {
  program.draw(gl, model)
}
