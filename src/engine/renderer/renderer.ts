import { CompiledProgram } from '../programs/program'
import { PreparedModel } from '../models/model'
import { Actor } from '../world/actor'

/**
 * Renderer draws models onto a canvas using shader programs.
 */
export interface Renderer {
  /**
   * Draw model using a shader program.
   * @param gl WebGL context.
   * @param model Model to draw.
   * @param program Shader program to use for drawing.
   */
  drawModel (gl: WebGLRenderingContext, model: PreparedModel, program: CompiledProgram): void

  /**
   * Draw model using a shader program.
   * @param gl WebGL context.
   * @param actor Actor to draw.
   * @param program Shader program to use for drawing.
   */
  drawActor (gl: WebGLRenderingContext, actor: Actor, program: CompiledProgram): void

  /**
   * Clear drawing canvas.
   * @param gl WebGL context.
   */
  clear (gl: WebGLRenderingContext): void
}
