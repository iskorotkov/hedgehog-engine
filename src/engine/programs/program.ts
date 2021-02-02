import { PreparedModel } from '../models/model'

export interface CompiledProgram {
  draw (gl: WebGLRenderingContext, model: PreparedModel): void
}

export interface Program {
  compile (gl: WebGLRenderingContext): CompiledProgram
}
