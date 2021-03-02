import { Vector3 } from '../../math/vector'
import { VolumetricModel } from './volumetricModel'

export interface Colors {
    front: Vector3,
    back: Vector3,
    right: Vector3,
    left: Vector3,
    top:Vector3,
    bottom: Vector3
}

export const defaultCubeModel = cubeModel({
  front: new Vector3(1, 0, 0),
  back: new Vector3(0, 1, 1),
  right: new Vector3(0, 1, 0),
  left: new Vector3(1, 0, 1),
  top: new Vector3(0, 0, 1),
  bottom: new Vector3(1, 1, 0)
})

export function cubeModel ({ front, back, right, left, top, bottom }: Colors) {
  return new VolumetricModel([
    // Front face
    -1.0, -1.0, 1.0, front.x, front.y, front.z, front.x, front.y, front.z,
    1.0, -1.0, 1.0, front.x, front.y, front.z, front.x, front.y, front.z,
    1.0, 1.0, 1.0, front.x, front.y, front.z, front.x, front.y, front.z,
    -1.0, 1.0, 1.0, front.x, front.y, front.z, front.x, front.y, front.z,

    // Back face
    -1.0, -1.0, -1.0, back.x, back.y, back.z, back.x, back.y, back.z,
    -1.0, 1.0, -1.0, back.x, back.y, back.z, back.x, back.y, back.z,
    1.0, 1.0, -1.0, back.x, back.y, back.z, back.x, back.y, back.z,
    1.0, -1.0, -1.0, back.x, back.y, back.z, back.x, back.y, back.z,

    // Top face
    -1.0, 1.0, -1.0, top.x, top.y, top.z, top.x, top.y, top.z,
    -1.0, 1.0, 1.0, top.x, top.y, top.z, top.x, top.y, top.z,
    1.0, 1.0, 1.0, top.x, top.y, top.z, top.x, top.y, top.z,
    1.0, 1.0, -1.0, top.x, top.y, top.z, top.x, top.y, top.z,

    // Bottom face
    -1.0, -1.0, -1.0, bottom.x, bottom.y, bottom.z, bottom.x, bottom.y, bottom.z,
    1.0, -1.0, -1.0, bottom.x, bottom.y, bottom.z, bottom.x, bottom.y, bottom.z,
    1.0, -1.0, 1.0, bottom.x, bottom.y, bottom.z, bottom.x, bottom.y, bottom.z,
    -1.0, -1.0, 1.0, bottom.x, bottom.y, bottom.z, bottom.x, bottom.y, bottom.z,

    // Right face
    1.0, -1.0, -1.0, right.x, right.y, right.z, right.x, right.y, right.z,
    1.0, 1.0, -1.0, right.x, right.y, right.z, right.x, right.y, right.z,
    1.0, 1.0, 1.0, right.x, right.y, right.z, right.x, right.y, right.z,
    1.0, -1.0, 1.0, right.x, right.y, right.z, right.x, right.y, right.z,

    // Left face
    -1.0, -1.0, -1.0, left.x, left.y, left.z, left.x, left.y, left.z,
    -1.0, -1.0, 1.0, left.x, left.y, left.z, left.x, left.y, left.z,
    -1.0, 1.0, 1.0, left.x, left.y, left.z, left.x, left.y, left.z,
    -1.0, 1.0, -1.0, left.x, left.y, left.z, left.x, left.y, left.z
  ], [
    0, 1, 2, 0, 2, 3, // front
    4, 5, 6, 4, 6, 7, // back
    8, 9, 10, 8, 10, 11, // top
    12, 13, 14, 12, 14, 15, // bottom
    16, 17, 18, 16, 18, 19, // right
    20, 21, 22, 20, 22, 23 // left
  ])
}
