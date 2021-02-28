import { Renderer } from './renderer'
import { PreparedModel } from '../models/model'
import { CompiledProgram } from '../programs/program'
import { Actor } from '../world/actor'
import { Camera } from '../camera/camera'

/**
 * VolumetricRenderer draws with a depth buffer.
 */
export class VolumetricRenderer implements Renderer {
  constructor (private readonly camera: Camera) {
  }

  drawActor (gl: WebGLRenderingContext, actor: Actor, program: CompiledProgram): void {
    program.drawActor(gl, actor, this.camera.view(), this.camera.projection())
  }

  drawModel (gl: WebGLRenderingContext, model: PreparedModel, program: CompiledProgram) {
    program.drawModel(gl, model)
  }

  clear (gl: WebGLRenderingContext) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clearDepth(1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }
}
