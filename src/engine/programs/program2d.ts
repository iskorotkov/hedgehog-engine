import { CompiledProgram, Program } from './program'
import { CompiledVertexShader } from '../shaders/vertex/vertexShader'
import { CompiledFragmentShader } from '../shaders/fragment/fragmentShader'
import { PreparedModel } from '../models/model'

export class CompiledProgram2D implements CompiledProgram {
  constructor (private program: WebGLProgram, private position: number, private color: number) {
  }

  draw (gl: WebGLRenderingContext, model: PreparedModel) {
    gl.useProgram(this.program)

    gl.bindBuffer(gl.ARRAY_BUFFER, model.vertices)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indices)

    gl.vertexAttribPointer(this.position, 2, gl.FLOAT, false, 5 * 4, 0)
    gl.vertexAttribPointer(this.color, 3, gl.FLOAT, false, 5 * 4, 2 * 4)

    gl.drawElements(gl.TRIANGLES, model.indexCount, gl.UNSIGNED_SHORT, 0)
  }
}

export class Program2D implements Program {
  constructor (private vertex: CompiledVertexShader, private fragment: CompiledFragmentShader) {}

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
