import { PreparedModel } from '../models/model'
import { CompiledFragmentShader } from '../shaders/fragment/fragmentShader'
import { CompiledVertexShader } from '../shaders/vertex/vertexShader'

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
   * @param vertex Vertex shader to use.
   * @param fragment Fragment shader to use.
   */
  compile (gl: WebGLRenderingContext, vertex: CompiledVertexShader, fragment: CompiledFragmentShader): CompiledProgram
}
