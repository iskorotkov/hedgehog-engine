import { Program2D } from './programs/program2d'
import { clear, draw } from './modules/graphics'
import { VertexShader } from './shaders/vertex/vertexShader'
import { FragmentShader } from './shaders/fragment/fragmentShader'
import { Model } from './models/model'

export class InitializedEngine {
  constructor (private readonly context: WebGLRenderingContext) {}

  run (model: Model, vertex: VertexShader, fragment: FragmentShader) {
    console.log('Compiling shaders')
    const vertexShader = vertex.compile(this.context)
    const fragmentShader = fragment.compile(this.context)

    console.log('Compiling shader program')
    const program = new Program2D(vertexShader, fragmentShader)
    const compiled = program.compile(this.context)

    console.log('Creating model')
    const prepared = model.prepare(this.context)

    console.log('Drawing')
    clear(this.context)
    draw(this.context, compiled, prepared)
  }
}

export class Engine {
  constructor (private id: string) {}

  init (): InitializedEngine {
    console.log('Getting canvas')
    const canvas = document.getElementById(this.id) as HTMLCanvasElement
    if (!canvas) {
      throw new Error('couldn\'t find canvas element')
    }

    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = canvas.clientWidth * devicePixelRatio
    canvas.height = canvas.clientHeight * devicePixelRatio

    console.log('Initializing WebGL rendering context')
    const gl = canvas.getContext('webgl')
    if (!gl) {
      throw new Error('couldn\'t create WebGL context')
    }

    console.log('Initializing WebGL viewport')
    gl.viewport(0, 0, canvas.width, canvas.height)
    return new InitializedEngine(gl)
  }
}
