import { BoundingBox, Matrix4 } from '../../math/matrix'
import { Transform } from '../world/transform'

export interface Camera {
    transform: Transform
    box: BoundingBox

    view(): Matrix4
    projection(): Matrix4
}
