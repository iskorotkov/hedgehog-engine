import { degrees } from '../../math/angle'
import { Matrix4, rotate, scale, translate } from '../../math/matrix'
import { Vector3 } from '../../math/vector'

/**
 * Transform values of the actor.
 */
export class Transform {
  constructor (public position: Vector3, public rotation: Vector3, public scale: Vector3) {}

  asMatrix (): Matrix4 {
    return translate(this.position)
      .multiply(rotate(new Vector3(1, 0, 0), degrees(this.rotation.x)))
      .multiply(rotate(new Vector3(0, 1, 0), degrees(this.rotation.y)))
      .multiply(rotate(new Vector3(0, 0, 1), degrees(this.rotation.z)))
      .multiply(scale(this.scale))
  }

  /**
   * Change transform position by specified delta vector.
   * @param delta Movement vector.
   */
  move (delta: Vector3): void {
    this.position = this.position.add(delta)
  }

  /**
   * Change transform rotation by specified delta vector.
   * @param delta Euler rotation.
   */
  rotate (delta: Vector3): void {
    this.rotation = this.rotation.add(delta)
  }

  /**
   * Change transform scale by specified multiplier vector.
   * @param multiplier Scale multiplier.
   */
  resize (multiplier: Vector3): void {
    this.scale = this.scale.add(multiplier)
  }
}
