import { PreparedModel } from '../models/model'
import { Transform } from './transform'

export class Actor {
  constructor (public readonly model: PreparedModel, public readonly transform: Transform) {
  }
}
