import { CompiledProgram } from '../programs/program'
import { PreparedModel } from '../models/model'

export interface Renderer {
  draw (gl: WebGLRenderingContext, model: PreparedModel, program: CompiledProgram): void

  clear (gl: WebGLRenderingContext): void
}
