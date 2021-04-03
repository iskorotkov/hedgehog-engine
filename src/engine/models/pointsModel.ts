import { Model } from './model'
import { SimpleModel } from './simpleModel'
import { Vector2 } from '../../math/vector'
import { getPointsOnBezierCurves, simplifyPoints } from '../../special/bezierCurve'

export class PointsModel {
    private _points: Vector2[]

    constructor (points?: Vector2[]) {
      this._points = points ?? []
    }

    addPoint (p: Vector2) {
      this._points.push(p)
    }

    removePoint (p: Vector2) {
      const index = this._points.lastIndexOf(p)
      if (index >= 0) {
        this._points = this._points.splice(index, 1)
      }
    }

    points () {
      return this._points
    }

    bezierCurve (tolerance: number, distance: number, size: number): Model {
      if (this._points.length < 4) {
        return new SimpleModel([], [])
      }

      const points = this._points.slice(0, 4)

      for (let realPointIndex = 4; realPointIndex < this._points.length; realPointIndex++) {
        const lastSupportPoint2 = this._points[realPointIndex - 3] ?? new Vector2(0, 0)
        const lastSupportPoint1 = this._points[realPointIndex - 2] ?? new Vector2(0, 0)
        const previousPoint = this._points[realPointIndex - 1] ?? new Vector2(0, 0)
        const thisPoint = this._points[realPointIndex] ?? new Vector2(0, 0)

        const nextSupportPoint1 = previousPoint.add(previousPoint.subtract(lastSupportPoint1))
        const nextSupportPoint2 = previousPoint.add(previousPoint.subtract(lastSupportPoint2))

        points.push(nextSupportPoint1, nextSupportPoint2, thisPoint)
      }

      const curve = getPointsOnBezierCurves(points, tolerance)
      const simplified = simplifyPoints(curve, 0, curve.length, distance)

      return new PointsModel(simplified).squares(size)
    }

    squares (size: number): Model {
      const vertices: number[] = []
      const indices: number[] = []

      let verticesInserted = 0

      for (const point of this._points) {
        vertices.push(
          point.x - size / 2, point.y - size / 2, 0, 0,
          point.x - size / 2, point.y + size / 2, 0, 1,
          point.x + size / 2, point.y + size / 2, 1, 1,
          point.x + size / 2, point.y - size / 2, 1, 0
        )

        indices.push(
          verticesInserted + 0, verticesInserted + 1, verticesInserted + 2,
          verticesInserted + 2, verticesInserted + 3, verticesInserted + 0
        )

        verticesInserted += 4
      }

      return new SimpleModel(vertices, indices)
    }
}
