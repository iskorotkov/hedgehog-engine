import { Program2D } from './programs/program2d'
import { VertexShader } from './shaders/vertex/vertexShader'
import { FragmentShader } from './shaders/fragment/fragmentShader'
import { Model } from './models/model'
import { Renderer } from './renderer/renderer'

/**
 * Provides methods to draw a scene.
 */
export class InitializedEngine {
  /**
   * Returns an initialized engine for working with a provided WebGL context.
   * @param context WebGL context to work with.
   * @param renderer Graphics renderer to use.
   */
  constructor (private readonly context: WebGLRenderingContext, private readonly renderer: Renderer) {}

  /**
   * Displays model using vertex and fragment shaders.
   * @param model Model to show.
   * @param vertex Vertex shader to use.
   * @param fragment Fragment shader to use.
   */
  run (model: Model, vertex: VertexShader, fragment: FragmentShader) {
    console.log('Compiling shaders')
    const vertexShader = vertex.compile(this.context)
    const fragmentShader = fragment.compile(this.context)

    console.log('Compiling shader program')
    const program = new Program2D(vertexShader, fragmentShader)
    const compiledProgram = program.compile(this.context)

    console.log('Creating model')
    const preparedModel = model.prepare(this.context)

    console.log('Drawing')
    this.renderer.clear(this.context)
    this.renderer.draw(this.context, preparedModel, compiledProgram)
  }
}

/**
 * Provides methods to initialize WebGL engine.
 */
export class Engine {
  /**
   * Returns an engine associated with a HTML canvas element.
   * @param id ID of the HTML canvas element to attach to.
   * @param renderer Graphics renderer to use.
   */
  constructor (private readonly id: string, private readonly renderer: Renderer) {}

  /**
   * Returns initialized WebGL engine.
   */
  init (): InitializedEngine {
    console.log('Getting canvas')
    const canvas = document.getElementById(this.id) as HTMLCanvasElement
    if (!canvas) {
      throw new Error('couldn\'t find canvas element')
    }

    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width *= devicePixelRatio
    canvas.height *= devicePixelRatio

    console.log('Initializing WebGL rendering context')
    const gl = canvas.getContext('webgl')
    if (!gl) {
      throw new Error('couldn\'t create WebGL context')
    }

    console.log('Initializing WebGL viewport')
    gl.viewport(0, 0, canvas.width, canvas.height)
    return new InitializedEngine(gl, this.renderer)
  }
}
