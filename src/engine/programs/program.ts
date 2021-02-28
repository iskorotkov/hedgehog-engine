import { Matrix4 } from '../../math/matrix'
import { PreparedModel } from '../models/model'
import { CompiledFragmentShader } from '../shaders/fragment/fragmentShader'
import { CompiledVertexShader } from '../shaders/vertex/vertexShader'
import { Actor } from '../world/actor'

/**
 * Already compiled shader program.
 */
export interface CompiledProgram {
  /**
   * Draw model using WebGL context.
   * @param gl WebGL context.
   * @param model Model to draw.
   */
  drawModel (gl: WebGLRenderingContext, model: PreparedModel): void

  /**
   * Draw actor using WebGL context.
   * @param gl WebGL context.
   * @param actor Actor to draw.
   * @param v View matrix.
   * @param p Projection matrix.
   */
  drawActor (gl: WebGLRenderingContext, actor: Actor, v: Matrix4, p: Matrix4): void
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
