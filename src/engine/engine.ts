import { CompiledProgram } from './programs/program'
import { Renderer } from './renderer/renderer'
import { PreparedActor, Actor } from './world/actor'

class Entity {
  /**
   *
   */
  constructor (
    public readonly actor: PreparedActor,
    public readonly program: CompiledProgram
  ) {
  }
}

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

  private readonly entities: Entity[] = []

  /**
   * Draws list of actors in a scene.
   * @param actors List of actors to draw.
   */
  run (actors: Actor[]) {
    console.log('Clearing canvas')
    this.renderer.clear(this.context)

    for (const entity of actors) {
      console.log('Compiling shaders')
      const vertexShader = entity.vertex.compile(this.context)
      const fragmentShader = entity.fragment.compile(this.context)

      console.log('Compiling shader program')
      const compiledProgram = entity.program.compile(this.context, vertexShader, fragmentShader)

      console.log('Creating model')
      const preparedModel = entity.model.prepare(this.context)
      const actor = new PreparedActor(preparedModel, entity.transform)

      this.entities.push(new Entity(actor, compiledProgram))
    }
  }

  render () {
    console.log('Clearing canvas')
    this.renderer.clear(this.context)

    for (const entity of this.entities) {
      console.log('Drawing')
      this.renderer.drawActor(this.context, entity.actor, entity.program)
    }
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
