import { BoundingBox, Matrix4 } from '../../math/matrix'
import { Transform } from '../world/transform'

/**
 * Camera used for visualization.
 */
export interface Camera {
    transform: Transform
    box: BoundingBox

    /**
     * Returns view matrix.
     */
    view(): Matrix4

    /**
     * Returns projection matrix.
     */
    projection(): Matrix4
}
