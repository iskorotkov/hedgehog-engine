import { Renderer } from './renderer'
import { PreparedModel } from '../models/model'
import { CompiledProgram } from '../programs/program'
import { PreparedActor } from '../world/actor'

/**
 * PrimitiveRenderer draws a model without using a depth buffer.
 */
export class PrimitiveRenderer implements Renderer {
  drawActor (_gl: WebGLRenderingContext, _actor: PreparedActor): void {
    throw new Error('This renderer doesn\'t support rendering actors.')
  }

  drawModel (gl: WebGLRenderingContext, model: PreparedModel, program: CompiledProgram) {
    program.drawModel(gl, model)
  }

  clear (gl: WebGLRenderingContext) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }
}
