import { BoundingBox, Matrix4, parallelProject } from '../../math/matrix'
import { Transform } from '../world/transform'
import { Camera } from './camera'

export class ParallelProjectionCamera implements Camera {
  constructor (public readonly transform: Transform, public readonly box: BoundingBox) {
  }

  view (): Matrix4 {
    return this.transform.asMatrix()
  }

  projection (): Matrix4 {
    return parallelProject(this.box)
  }
}
