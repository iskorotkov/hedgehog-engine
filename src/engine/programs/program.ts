import { PreparedModel } from '../models/model'

/**
 * Already compiled shader program.
 */
export interface CompiledProgram {
  /**
   * Draw model using WebGL context.
   * @param gl WebGL context.
   * @param model Model to draw.
   */
  draw (gl: WebGLRenderingContext, model: PreparedModel): void
}

/**
 * Shader program ready to be compiled.
 */
export interface Program {
  /**
   * Returns compiled shader program.
   * @param gl WebGL context.
   */
  compile (gl: WebGLRenderingContext): CompiledProgram
}
