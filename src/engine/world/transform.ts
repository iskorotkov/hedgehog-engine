import { degrees } from '../../math/angle'
import { Matrix4, rotate, scale, translate } from '../../math/matrix'
import { Vector3 } from '../../math/vector'

/**
 * Transform values of the actor.
 */
export class Transform {
  constructor (private pos: Vector3, private rot: Vector3, private sc: Vector3) {}

  getPosition (): Vector3 {
    return this.pos
  }

  getRotation (): Vector3 {
    return this.rot
  }

  getScale (): Vector3 {
    return this.sc
  }

  asMatrix (): Matrix4 {
    return translate(this.pos)
      .multiply(rotate(new Vector3(1, 0, 0), degrees(this.rot.x)))
      .multiply(rotate(new Vector3(0, 1, 0), degrees(this.rot.y)))
      .multiply(rotate(new Vector3(0, 0, 1), degrees(this.rot.z)))
      .multiply(scale(this.sc))
  }

  /**
   * Change transform position by specified delta vector.
   * @param delta Movement vector.
   */
  move (delta: Vector3): void {
    this.pos = this.pos.add(delta)
  }

  /**
   * Change transform rotation by specified delta vector.
   * @param delta Euler rotation.
   */
  rotate (delta: Vector3): void {
    this.rot = this.rot.add(delta)
  }

  /**
   * Change transform scale by specified multiplier vector.
   * @param multiplier Scale multiplier.
   */
  scale (multiplier: Vector3): void {
    this.sc = this.sc.add(multiplier)
  }
}
