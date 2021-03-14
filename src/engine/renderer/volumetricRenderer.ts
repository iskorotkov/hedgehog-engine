import { Renderer } from './renderer'
import { PreparedModel } from '../models/model'
import { CompiledProgram } from '../programs/program'
import { PreparedActor } from '../world/actor'
import { Camera } from '../camera/camera'
import { Vector3 } from '../../math/vector'

/**
 * VolumetricRenderer draws with a depth buffer.
 */
export class VolumetricRenderer implements Renderer {
  constructor (private readonly camera: Camera, private readonly clearColor: Vector3) {
  }

  drawActor (gl: WebGLRenderingContext, actor: PreparedActor): void {
    actor.program.drawActor(gl, actor, this.camera.view(), this.camera.projection())
  }

  drawModel (gl: WebGLRenderingContext, model: PreparedModel, program: CompiledProgram) {
    program.drawModel(gl, model)
  }

  clear (gl: WebGLRenderingContext) {
    gl.clearColor(this.clearColor.x, this.clearColor.y, this.clearColor.z, 1)
    gl.clearDepth(1)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }
}
