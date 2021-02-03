import { CompiledProgram } from '../programs/program'
import { PreparedModel } from '../models/model'

/**
 * Clear drawing canvas.
 * @param gl WebGL context.
 */
export function clear (gl: WebGLRenderingContext) {
  gl.clearColor(0.8, 0.8, 0.8, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
}

/**
 * Draw model using a shader program.
 * @param gl WebGL context.
 * @param program Shader program to use for drawing.
 * @param model Model to draw.
 */
export function draw (gl: WebGLRenderingContext, program: CompiledProgram, model: PreparedModel) {
  program.draw(gl, model)
}
