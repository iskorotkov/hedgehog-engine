import { Model } from './model'
import { SimpleModel } from './simpleModel'
import { Vector2 } from '../../math/vector'
import { getPointsOnBezierCurves, simplifyPoints } from '../../special/bezierCurve'

export class PointsModel {
    private point: Vector2[]

    constructor (points?: Vector2[]) {
      this.point = points ?? []
    }

    addPoint (p: Vector2) {
      this.point.push(p)
    }

    removePoint (p: Vector2) {
      const index = this.point.lastIndexOf(p)
      if (index >= 0) {
        this.point = this.point.splice(index, 1)
      }
    }

    count () {
      return this.point.length
    }

    bezierCurve (tolerance: number, distance: number, size: number): Model {
      if (this.point.length < 4) {
        return new SimpleModel([], [])
      }

      const points = this.point.slice(0, this.point.length - (this.point.length - 1) % 3)
      const curve = getPointsOnBezierCurves(points, tolerance)
      const simplified = simplifyPoints(curve, 0, curve.length, distance)

      return new PointsModel(simplified).lines(size)
    }

    lines (width: number): Model {
      if (this.point.length < 2) {
        return new SimpleModel([], [])
      }

      const vertices = []
      const indices = []

      for (let i = 0; i < this.point.length - 1; i++) {
        const thisPoint = this.point[i]
        const nextPoint = this.point[i + 1]

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

      for (const point of this.point) {
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
