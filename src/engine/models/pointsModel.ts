import { Model } from './model'
import { SimpleModel } from './simpleModel'
import { Vector2, Vector3 } from '../../math/vector'
import { bezierCurve } from '../../special/bezierCurve'
import { revolutionBody } from '../../special/revolutionBody'

export class PointsModel {
    private points: Vector2[]

    constructor (points?: Vector2[]) {
      this.points = points ?? []
    }

    addPoint (p: Vector2) {
      this.points.push(p)
    }

    removePoint (p: Vector2) {
      const index = this.points.lastIndexOf(p)
      if (index >= 0) {
        this.points = this.points.splice(index, 1)
      }
    }

    bezierCurveAsSquares (tolerance: number, distance: number, size: number) {
      const curve = bezierCurve(this.points, tolerance, distance)
      return new PointsModel(curve).squares(size)
    }

    bezierCurveAsLines (tolerance: number, distance: number, size: number) {
      const curve = bezierCurve(this.points, tolerance, distance)
      return new PointsModel(curve).lines(size)
    }

    lines (width: number): Model {
      if (this.points.length < 2) {
        return new SimpleModel([], [])
      }

      const vertices = []
      const indices = []

      for (let i = 0; i < this.points.length - 1; i++) {
        const thisPoint = this.points[i]
        const nextPoint = this.points[i + 1]

        if (!thisPoint || !nextPoint) {
          throw Error()
        }

        const direction = nextPoint.subtract(thisPoint)
        const normal = new Vector2(-direction.y, direction.x)
          .normalize()
          .multiply(new Vector2(width / 2, width / 2))

        const thisLeft = thisPoint.add(normal)
        const thisRight = thisPoint.subtract(normal)
        const nextLeft = nextPoint.add(normal)
        const nextRight = nextPoint.subtract(normal)

        for (const vec of [thisLeft, thisRight, nextRight, nextLeft]) {
          vertices.push(vec.x, vec.y, 0, 0)
        }

        const base = i * 4
        indices.push(
          base, base + 1, base + 2,
          base + 2, base + 3, base
        )
      }

      return new SimpleModel(vertices, indices)
    }

    squares (size: number): Model {
      const vertices = []
      const indices = []

      let verticesInserted = 0

      for (const point of this.points) {
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

    revolutionBody (tolerance: number, distance: number, axis: Vector3, segments: number, cap: boolean) {
      const curve = bezierCurve(this.points, tolerance, distance)
      return revolutionBody(curve, axis, segments, cap)
    }
}
