import { Renderer } from './renderer/renderer'
import { PreparedActor, Actor } from './world/actor'

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

  private actors: PreparedActor[] = []

  /**
   * Places given actors in a scene.
   * @param actors List of actors to draw.
   */
  compose (actors: Actor[]) {
    console.log('Clearing canvas')
    this.renderer.clear(this.context)

    this.actors = []

    for (const actor of actors) {
      console.log('Compiling shaders')
      const vertexShader = actor.vertex.compile(this.context)
      const fragmentShader = actor.fragment.compile(this.context)

      console.log('Compiling shader program')
      const compiledProgram = actor.program.compile(this.context, vertexShader, fragmentShader)

      console.log('Creating model')
      const preparedModel = actor.model.prepare(this.context)
      const preparedActor = new PreparedActor(preparedModel, actor.transform, compiledProgram)

      this.actors.push(preparedActor)
    }
  }

  render () {
    console.log('Clearing canvas')
    this.renderer.clear(this.context)

    for (const actor of this.actors) {
      console.log('Drawing')
      this.renderer.drawActor(this.context, actor)
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
