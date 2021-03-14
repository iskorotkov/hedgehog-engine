import { Model, PreparedModel } from '../models/model'
import { CompiledProgram, Program } from '../programs/program'
import { FragmentShader } from '../shaders/fragment/fragmentShader'
import { VertexShader } from '../shaders/vertex/vertexShader'
import { Transform } from './transform'

export class Actor {
  constructor (
    public readonly model: Model,
    public readonly transform: Transform,
    public readonly program: Program,
    public readonly vertex: VertexShader,
    public readonly fragment: FragmentShader
  ) {
  }
}

export class PreparedActor {
  constructor (
    public readonly model: PreparedModel,
    public readonly transform: Transform,
    public readonly program: CompiledProgram
  ) {
  }
}
