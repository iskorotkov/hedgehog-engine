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

function calculateUV (nPoints: number, nSegments: number, point: number, segment: number, cap: boolean): Vector2 {
  if (cap) {
    return new Vector2(segment / nSegments, (point + 1) / (nPoints + 1))
  } else {
    return new Vector2(segment / nSegments, point / (nPoints - 1))
  }
}

function calculateNormals (points: Vector3[], nSegments: number, point: number, segment: number): Vector3 {
  const nPoints = points.length / (nSegments + 1)

  // TODO: Use top vertex used for capping.
  const findTopVertex = () => point > 0
    ? points[segment * nPoints + point - 1]
    : points[segment * nPoints + point]

  // TODO: Use bottom vertex used for capping.
  const findBottomVertex = () => point < nPoints - 1
    ? points[segment * nPoints + point + 1]
    : points[segment * nPoints + point]

  const findLeftVertex = () => segment > 0
    ? points[(segment - 1) * nPoints + point]
    : points[(nSegments - 2) * nPoints + point]

  const findRightVertex = () => segment < nSegments - 1
    ? points[(segment + 1) * nPoints + point]
    : points[point]

  const top = findTopVertex()
  const bottom = findBottomVertex()
  const left = findLeftVertex()
  const right = findRightVertex()

  if (!top || !bottom || !left || !right) throw Error()

  const topToBottom = bottom.subtract(top).normalize()
  const leftToRight = right.subtract(left).normalize()

  const normal = topToBottom.cross(leftToRight)
  return normal
}

export function revolutionBody (points: Vector2[], axis: Vector3, nSegments: number, cap: boolean) {
  if (points.length < 4) {
    return new SimpleModel([], [])
  }

  axis = axis.normalize()

  const shape = pointsOnShape(points, axis, nSegments)

  const vertices = []
  const indices = []

  // Add vertices.
  for (let segment = 0; segment <= nSegments; segment++) {
    for (let pt = 0; pt < points.length; pt++) {
      const point = shape[segment * points.length + pt]
      if (!point) {
        throw Error()
      }

      const uv = calculateUV(points.length, nSegments, pt, segment, cap)
      const normal = calculateNormals(shape, nSegments, pt, segment)

      vertices.push(
        point.x, point.y, point.z,
        normal.x, normal.y, normal.z,
        uv.x, uv.y
      )
    }
  }

  // Add indices.
  for (let segment = 0; segment < nSegments; segment++) {
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
    for (let segment = 0; segment < nSegments; segment++) {
      const v0 = segment * points.length
      const v1 = (segment + 1) * points.length

      // Top vertex.
      const v2 = (nSegments + 1) * points.length

      indices.push(v0, v1, v2)
    }

    // Bottom trianges.
    vertices.push(bottomVertex.x, bottomVertex.y, bottomVertex.z, -normal.x, -normal.y, -normal.z, 0, 1)
    for (let segment = 0; segment < nSegments; segment++) {
      const v0 = (segment + 1) * points.length - 1
      const v1 = (segment + 2) * points.length - 1

      // Bottom vertex.
      const v2 = (nSegments + 1) * points.length + 1

      indices.push(v0, v1, v2)
    }
  }

  return new SimpleModel(vertices, indices)
}
