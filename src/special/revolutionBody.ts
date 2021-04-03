import { SimpleModel } from '../engine/models/simpleModel'
import { degrees } from '../math/angle'
import { Matrix4, rotate, translate } from '../math/matrix'
import { Vector2, Vector3 } from '../math/vector'

function rotatePoint (point: Vector2, rotation: Matrix4) {
  const position = translate(new Vector3(point.x, point.y, 0))
  return position.multiply(rotation).toPosition()
}

function pointsOnShape (points: Vector2[], axis: Vector3, segments: number) {
  const shapePoints = []

  for (let i = 0; i < segments; i++) {
    const angle = degrees(360 / segments)
    const rotation = rotate(axis, angle)

    const rotatedPoints = points.map(point => rotatePoint(point, rotation))
    shapePoints.push(...rotatedPoints)
  }

  return shapePoints
}

export function revolutionBody (points: Vector2[], axis: Vector3, segments: number, cap: boolean) {
  if (points.length < 4) {
    return new SimpleModel([], [])
  }

  const shape = pointsOnShape(points, axis, segments)

  const vertices = []
  const indices = []

  for (let segment = 0; segment < segments - 1; segment++) {
    for (let pt = 0; pt < points.length - 1; pt++) {
      const point = shape[segment * points.length + pt]
      if (!point) {
        throw Error()
      }

      // TODO: Calculate normals (cross product).
      // TODO: Calculate UV coordinates.
      // TODO: Cap shape.
      // TODO: Connect edge vertices.

      vertices.push(point.x, point.y, point.z, 0, 0, 0, 0, 0)

      indices.push(
        segment * points.length + pt, segment * points.length + pt + 1,
        (segment + 1) * points.length + pt, (segment + 1) * points.length + pt + 1
      )
    }
  }

  return new SimpleModel(vertices, indices)
}
