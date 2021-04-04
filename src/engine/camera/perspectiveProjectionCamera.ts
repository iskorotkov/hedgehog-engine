import { Angle } from '../../math/angle'
import { Matrix4, perspectiveProject } from '../../math/matrix'
import { Transform } from '../world/transform'
import { Camera } from './camera'

export interface PerspectiveParams {
  viewAngle: Angle,
  aspectRatio: number,
  near: number,
  far: number
}

/**
 * Camera that uses parallel projection.
 */
export class PerspectiveProjectionCamera implements Camera {
  constructor (public readonly transform: Transform, public params: PerspectiveParams) {
  }

  view (): Matrix4 {
    return this.transform.asMatrix()
  }

  projection (): Matrix4 {
    return perspectiveProject(this.params)
  }
}
