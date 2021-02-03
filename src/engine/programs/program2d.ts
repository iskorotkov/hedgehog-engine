import { CompiledProgram, Program } from './program'
import { CompiledVertexShader } from '../shaders/vertex/vertexShader'
import { CompiledFragmentShader } from '../shaders/fragment/fragmentShader'
import { PreparedModel } from '../models/model'

/**
 * Already compiled shader program for 2D models.
 */
export class CompiledProgram2D implements CompiledProgram {
  /**
   * Returns already compiled shader program for 2D models.
   * @param program WebGL program.
   * @param position Position buffer index.
   * @param color Color buffer index.
   */
  constructor (private readonly program: WebGLProgram, private readonly position: number, private readonly color: number) {
  }

  /**
   * Draw model using provided WebGL context.
   * @param gl WebGL context.
   * @param model Model to draw.
   */
  draw (gl: WebGLRenderingContext, model: PreparedModel) {
    gl.useProgram(this.program)

    gl.bindBuffer(gl.ARRAY_BUFFER, model.vertices)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indices)

    gl.vertexAttribPointer(this.position, 2, gl.FLOAT, false, 5 * 4, 0)
    gl.vertexAttribPointer(this.color, 3, gl.FLOAT, false, 5 * 4, 2 * 4)

    gl.drawElements(gl.TRIANGLES, model.indexCount, gl.UNSIGNED_SHORT, 0)
  }
}

/**
 * Shader program for 2D models ready to be compiled.
 */
export class Program2D implements Program {
  /**
   * Returns shader program for 2D models ready to be compiled.
   * @param vertex Vertex shader to use.
   * @param fragment Fragment shader to use.
   */
  constructor (private readonly vertex: CompiledVertexShader, private readonly fragment: CompiledFragmentShader) {}

  /**
   * Returns already compiled shader program for 2D models.
   * @param gl WebGL context.
   */
  compile (gl: WebGLRenderingContext): CompiledProgram {
    const shaderProgram = gl.createProgram()
    if (!shaderProgram) {
      throw new Error('couldn\'t create shader program')
    }

    gl.attachShader(shaderProgram, this.vertex.shader)
    gl.attachShader(shaderProgram, this.fragment.shader)
    gl.linkProgram(shaderProgram)

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      throw new Error('couldn\'t link shader program')
    }

    const position = gl.getAttribLocation(shaderProgram, 'a_position')
    const color = gl.getAttribLocation(shaderProgram, 'a_color')

    gl.enableVertexAttribArray(position)
    gl.enableVertexAttribArray(color)

    return new CompiledProgram2D(shaderProgram, position, color)
  }
}
