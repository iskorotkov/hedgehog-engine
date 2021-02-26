import { CompiledProgram } from '../programs/program'
import { PreparedModel } from '../models/model'

/**
 * Renderer draws models onto a canvas using shader programs.
 */
export interface Renderer {
  /**
   * Draw model using a shader program.
   * @param gl WebGL context.
   * @param program Shader program to use for drawing.
   * @param model Model to draw.
   */
  draw (gl: WebGLRenderingContext, model: PreparedModel, program: CompiledProgram): void

  /**
   * Clear drawing canvas.
   * @param gl WebGL context.
   */
  clear (gl: WebGLRenderingContext): void
}
