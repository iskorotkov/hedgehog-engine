import { CompiledProgram, Program } from './program'
import { CompiledVertexShader } from '../shaders/vertex/vertexShader'
import { CompiledFragmentShader } from '../shaders/fragment/fragmentShader'
import { PreparedModel } from '../models/model'
import { PreparedActor } from '../world/actor'
import { Matrix4 } from '../../math/matrix'

/**
 * Already compiled shader program for 2D models with colors.
 */
export class CompiledProgram2DSpecular implements CompiledProgram {
  /**
   * Returns already compiled shader program for 2D models with colors.
   * @param program WebGL program.
   * @param position Position buffer index.
   * @param diffuseColor Diffuse color buffer index.
   * @param specularColor Specular color buffer index.
   */
  constructor (
    private readonly program: WebGLProgram,
    private readonly position: number,
    private readonly diffuseColor: number,
    private readonly specularColor: number,
    public readonly mvp: WebGLUniformLocation,
    public readonly mv: WebGLUniformLocation,
    public readonly n: WebGLUniformLocation
  ) {
  }

  /**
   * Draw model using provided WebGL context.
   * @param gl WebGL context.
   * @param model Model to draw.
   */
  drawModel (gl: WebGLRenderingContext, model: PreparedModel) {
    gl.useProgram(this.program)

    gl.bindBuffer(gl.ARRAY_BUFFER, model.vertices)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indices)

    gl.vertexAttribPointer(this.position, 2, gl.FLOAT, false, 8 * 4, 0)
    gl.vertexAttribPointer(this.diffuseColor, 3, gl.FLOAT, false, 8 * 4, 2 * 4)
    gl.vertexAttribPointer(this.specularColor, 3, gl.FLOAT, false, 8 * 4, 5 * 4)

    gl.drawElements(gl.TRIANGLES, model.indexCount, gl.UNSIGNED_SHORT, 0)
  }

  drawActor (gl: WebGLRenderingContext, actor: PreparedActor, v: Matrix4, p: Matrix4) {
    const m = actor.transform.asMatrix()
    const mv = m.multiply(v)
    const mvp = mv.multiply(p)
    const n = mv.toMatrix3().inverse().transpose()

    gl.useProgram(this.program)

    gl.bindBuffer(gl.ARRAY_BUFFER, actor.model.vertices)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, actor.model.indices)

    gl.vertexAttribPointer(this.position, 2, gl.FLOAT, false, 8 * 4, 0)
    gl.vertexAttribPointer(this.diffuseColor, 3, gl.FLOAT, false, 8 * 4, 2 * 4)
    gl.vertexAttribPointer(this.specularColor, 3, gl.FLOAT, false, 8 * 4, 5 * 4)

    gl.uniformMatrix4fv(this.mv, false, mv.values)
    gl.uniformMatrix4fv(this.mvp, false, mvp.values)
    gl.uniformMatrix3fv(this.n, false, n.values)

    gl.drawElements(gl.TRIANGLES, actor.model.indexCount, gl.UNSIGNED_SHORT, 0)
  }
}

/**
 * Shader program for 2D models with colors ready to be compiled.
 */
export class Program2DSpecular implements Program {
  /**
   * Returns already compiled shader program for 2D models with colors.
   * @param gl WebGL context.
   * @param vertex Vertex shader to use.
   * @param fragment Fragment shader to use.
   */
  compile (gl: WebGLRenderingContext, vertex: CompiledVertexShader, fragment: CompiledFragmentShader): CompiledProgram {
    const shaderProgram = gl.createProgram()
    if (!shaderProgram) {
      throw new Error('couldn\'t create shader program')
    }

    gl.attachShader(shaderProgram, vertex.shader)
    gl.attachShader(shaderProgram, fragment.shader)
    gl.linkProgram(shaderProgram)

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      throw new Error('couldn\'t link shader program')
    }

    const position = gl.getAttribLocation(shaderProgram, 'a_position')
    const diffuseColor = gl.getAttribLocation(shaderProgram, 'a_diffuse_color')
    const specularColor = gl.getAttribLocation(shaderProgram, 'a_specular_color')

    const mvp = gl.getUniformLocation(shaderProgram, 'u_mvp')
    const mv = gl.getUniformLocation(shaderProgram, 'u_mv')
    const n = gl.getUniformLocation(shaderProgram, 'u_n')
    if (!mvp || !mv || !n) {
      throw new Error('Couldn\'t get uniform locations')
    }

    gl.enableVertexAttribArray(position)
    gl.enableVertexAttribArray(diffuseColor)
    gl.enableVertexAttribArray(specularColor)

    return new CompiledProgram2DSpecular(shaderProgram, position, diffuseColor, specularColor, mvp, mv, n)
  }
}
