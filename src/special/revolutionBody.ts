import { SimpleModel } from '../engine/models/simpleModel'
import { degrees } from '../math/angle'
import { Matrix4, rotate, translate } from '../math/matrix'
import { Vector2, Vector3 } from '../math/vector'

function rotatePoint (point: Vector2, rotation: Matrix4) {
  const position = translate(new Vector3(point.x, point.y, 0))
  return rotation.multiply(position).toPosition()
}

function pointsOnShape (points: Vector2[], axis: Vector3, segments: number) {
  const shapePoints = []

  for (let i = 0; i <= segments; i++) {
    const angle = degrees(i * 360 / segments)
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

  axis = axis.normalize()

  const shape = pointsOnShape(points, axis, segments)

  const vertices = []
  const indices = []

  // Add vertices.
  for (let segment = 0; segment <= segments; segment++) {
    for (let pt = 0; pt < points.length; pt++) {
      const point = shape[segment * points.length + pt]
      if (!point) {
        throw Error()
      }

      // TODO: Calculate normals (cross product).
      // TODO: Calculate UV coordinates. Check for correctness.

      if (cap) {
        vertices.push(point.x, point.y, point.z, point.x, point.y, point.z, segment / segments, (pt + 1) / (points.length + 1))
      } else {
        vertices.push(point.x, point.y, point.z, point.x, point.y, point.z, segment / segments, pt / (points.length - 1))
      }
    }
  }

  // Add indices.
  for (let segment = 0; segment < segments; segment++) {
    for (let pt = 0; pt < points.length - 1; pt++) {
      const v0 = segment * points.length + pt
      const v1 = segment * points.length + pt + 1
      const v2 = (segment + 1) * points.length + pt + 1
      const v3 = (segment + 1) * points.length + pt

      indices.push(
        v0, v1, v2,
        v2, v3, v0
      )
    }
  }

  // Cap top and bottom.
  if (cap) {
    // Add top vertex.
    const topVertex = shape[0]
    const bottomVertex = shape[points.length - 1]
    if (!topVertex || !bottomVertex) {
      throw Error()
    }

    if (axis.x !== 0 || axis.y !== 1 || axis.z !== 0) {
      throw Error('Only capping on Y axis is supported')
    }

    topVertex.x = 0
    topVertex.z = 0
    bottomVertex.x = 0
    bottomVertex.z = 0

    const normal = new Vector3(0, 1, 0).multiply(axis)

    // Top triangles.
    vertices.push(topVertex.x, topVertex.y, topVertex.z, normal.x, normal.y, normal.z, 0, 0)
    for (let segment = 0; segment < segments; segment++) {
      const v0 = segment * points.length
      const v1 = (segment + 1) * points.length

      // Top vertex.
      const v2 = (segments + 1) * points.length

      indices.push(v0, v1, v2)
    }

    // Bottom trianges.
    vertices.push(bottomVertex.x, bottomVertex.y, bottomVertex.z, -normal.x, -normal.y, -normal.z, 0, 1)
    for (let segment = 0; segment < segments; segment++) {
      const v0 = (segment + 1) * points.length - 1
      const v1 = (segment + 2) * points.length - 1

      // Bottom vertex.
      const v2 = (segments + 1) * points.length + 1

      indices.push(v0, v1, v2)
    }
  }

  return new SimpleModel(vertices, indices)
}
