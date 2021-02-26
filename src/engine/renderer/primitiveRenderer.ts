import { Renderer } from './renderer'
import { PreparedModel } from '../models/model'
import { CompiledProgram } from '../programs/program'

/**
 * PrimitiveRenderer draws a model without using a depth buffer.
 */
export class PrimitiveRenderer implements Renderer {
  draw (gl: WebGLRenderingContext, model: PreparedModel, program: CompiledProgram) {
    program.draw(gl, model)
  }

  clear (gl: WebGLRenderingContext) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }
}
