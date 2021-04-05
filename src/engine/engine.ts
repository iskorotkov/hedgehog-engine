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
    this.renderer.clear(this.context)

    this.actors = []

    for (const actor of actors) {
      const vertexShader = actor.vertex.compile(this.context)
      const fragmentShader = actor.fragment.compile(this.context)

      const compiledProgram = actor.program.compile(this.context, vertexShader, fragmentShader)

      const preparedModel = actor.model.prepare(this.context)
      const preparedActor = new PreparedActor(preparedModel, actor.transform, compiledProgram)

      this.actors.push(preparedActor)
    }
  }

  render () {
    this.renderer.clear(this.context)

    for (const actor of this.actors) {
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
    const canvas = document.getElementById(this.id) as HTMLCanvasElement
    if (!canvas) {
      throw new Error('couldn\'t find canvas element')
    }

    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width *= devicePixelRatio
    canvas.height *= devicePixelRatio

    const gl = canvas.getContext('webgl2', {
      powerPreference: 'high-performance'
    })
    if (!gl) {
      throw new Error('couldn\'t create WebGL context')
    }

    gl.viewport(0, 0, canvas.width, canvas.height)
    return new InitializedEngine(gl, this.renderer)
  }
}
