import { Vector2 } from '../math/vector'

/**
 * Calculates flatness for 4 points.
 * @param points Array of all points.
 * @param firstPoint Index of point to start calculating flatness.
 * @returns Flatness for 4 points.
 */
function flatness (points: Vector2[], firstPoint: number) {
  const p1 = points[firstPoint + 0] ?? new Vector2(0, 0)
  const p2 = points[firstPoint + 1] ?? new Vector2(0, 0)
  const p3 = points[firstPoint + 2] ?? new Vector2(0, 0)
  const p4 = points[firstPoint + 3] ?? new Vector2(0, 0)

  let ux = Math.pow(3 * p2.x - 2 * p1.x - p4.x, 2)
  let uy = Math.pow(3 * p2.y - 2 * p1.y - p4.y, 2)

  const vx = Math.pow(3 * p3.x - 2 * p4.x - p1.x, 2)
  const vy = Math.pow(3 * p3.y - 2 * p4.y - p1.y, 2)

  if (ux < vx) {
    ux = vx
  }

  if (uy < vy) {
    uy = vy
  }

  return ux + uy
}

/**
 * Returns points on Bezier curves splitting it in several subcurves if necessary.
 * @param points Array of all points.
 * @param firstPoint Index of first point to start drawing from.
 * @param tolerance Flatness tolerance for splitting curve on two subcurves.
 * @param newPoints Points that will be used as return value.
 * @returns Points on Bezier curve.
 */
function getPointsOnBezierCurveWithSplitting (points: Vector2[], firstPoint: number, tolerance: number, newPoints?: Vector2[]) {
  const outPoints = newPoints || []

  if (flatness(points, firstPoint) < tolerance) {
    // Add start point of the curve.
    if (outPoints.length === 0) {
      outPoints.push(points[firstPoint + 0] ?? new Vector2(0, 0))
    }

    // Add end point of the curve.
    outPoints.push(points[firstPoint + 3] ?? new Vector2(0, 0))
  } else {
    const lerp = (v1: Vector2, v2: Vector2, alpha: number) => {
      return new Vector2(
        v1.x * alpha + v2.x * (1 - alpha),
        v1.y * alpha + v2.y * (1 - alpha)
      )
    }

    // subdivide
    const t = 0.5
    const p1 = points[firstPoint + 0] ?? new Vector2(0, 0)
    const p2 = points[firstPoint + 1] ?? new Vector2(0, 0)
    const p3 = points[firstPoint + 2] ?? new Vector2(0, 0)
    const p4 = points[firstPoint + 3] ?? new Vector2(0, 0)

    const q1 = lerp(p1, p2, t)
    const q2 = lerp(p2, p3, t)
    const q3 = lerp(p3, p4, t)

    const r1 = lerp(q1, q2, t)
    const r2 = lerp(q2, q3, t)

    const red = lerp(r1, r2, t)

    // do 1st half
    getPointsOnBezierCurveWithSplitting([p1, q1, r1, red], 0, tolerance, outPoints)

    // do 2nd half
    getPointsOnBezierCurveWithSplitting([red, r2, q3, p4], 0, tolerance, outPoints)
  }

  return outPoints
}

/**
 * Returns points on Bezier curves removing extra points.
 * @param points Array of all points.
 * @param start First point index.
 * @param end Last point index.
 * @param epsilon Epsilon value.
 * @param newPoints Points that will be used as return value.
 * @returns Points on Bezier curve.
 */
function simplifyPoints (points: Vector2[], start: number, end: number, epsilon: number, newPoints?: Vector2[]) {
  const outPoints = newPoints || []

  // find the most distance point from the endpoints
  const s = points[start] ?? new Vector2(0, 0)
  const e = points[end - 1] ?? new Vector2(0, 0)

  let maxDistSq = 0
  let maxNdx = 1

  // More info: https://github.com/Luftare/typed-vector/blob/master/src/Vector.ts
  const distanceToSegmentSq = (coord: Vector2, start: Vector2, end: Vector2) => {
    const segment = end.subtract(start)
    const segmentLengthSquared = segment.sizeSquared()

    const segmentStartToCoordinate = coord.subtract(start)

    if (segmentLengthSquared === 0) {
      return coord.subtract(start).sizeSquared()
    }

    const t = segmentStartToCoordinate.dot(segment) / segmentLengthSquared
    const clampedT = Math.max(0, Math.min(1, t))

    const perpendicularPointAtSegment = new Vector2(clampedT, clampedT).multiply(segment).add(start)

    return coord.subtract(perpendicularPointAtSegment).sizeSquared()
  }

  for (let i = start + 1; i < end - 1; ++i) {
    const p = points[i] ?? new Vector2(0, 0)
    const distSq = distanceToSegmentSq(p, s, e)

    if (distSq > maxDistSq) {
      maxDistSq = distSq
      maxNdx = i
    }
  }

  // if that point is too far
  if (Math.sqrt(maxDistSq) > epsilon) {
    // split
    simplifyPoints(points, start, maxNdx + 1, epsilon, outPoints)
    simplifyPoints(points, maxNdx, end, epsilon, outPoints)
  } else {
    // Add start point of the curve.
    if (outPoints.length === 0) {
      outPoints.push(s)
    }

    // Add end point of the curve.
    outPoints.push(e)
  }

  return outPoints
}

/**
 * Returns points on Bezier curves subdividing it if necessary.
 * @param points Array of all points.
 * @param tolerance Curve splitting tolerance.
 * @returns Points on Bezier curves.
 */
function getPointsOnBezierCurves (points: Vector2[], tolerance: number) {
  const newPoints: Vector2[] = []
  const numSegments = (points.length - 1) / 3

  for (let i = 0; i < numSegments; ++i) {
    const offset = i * 3
    getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints)
  }

  return newPoints
}

/**
 * Find points laying on Bezier curve.
 * @param points Array of all points.
 * @param tolerance Curve splitting tolerance.
 * @param distance Min distance between points.
 * @returns Returns array of points laying on Bezier curve.
 */
export function bezierCurve (points: Vector2[], tolerance: number, distance: number) {
  if (points.length < 4) {
    return []
  }

  const finished = points.slice(0, points.length - (points.length - 1) % 3)
  const curve = getPointsOnBezierCurves(finished, tolerance)
  const simplified = simplifyPoints(curve, 0, curve.length, distance)

  return simplified
}
