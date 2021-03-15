import { CompiledProgram, Program } from './program'
import { CompiledVertexShader } from '../shaders/vertex/vertexShader'
import { CompiledFragmentShader } from '../shaders/fragment/fragmentShader'
import { PreparedModel } from '../models/model'
import { PreparedActor } from '../world/actor'
import { Matrix4 } from '../../math/matrix'
import { Texture } from '../../assets/texture'

/**
 * Already compiled shader program for 2D models.
 */
export class CompiledProgram2D implements CompiledProgram {
  /**
   * Returns already compiled shader program for 2D models.
   * @param program WebGL program.
   * @param position Position buffer index.
   * @param diffuseColor Diffuse color buffer index.
   * @param specularColor Specular color buffer index.
   */
  constructor (
    private readonly program: WebGLProgram,
    private readonly position: number,
    private readonly uv: number,
    public readonly diffuseTexture: WebGLTexture | null,
    public readonly specularTexture: WebGLTexture | null,
    public readonly diffuseTexBuffer: WebGLUniformLocation | null,
    public readonly specularTexBuffer: WebGLUniformLocation | null,
    public readonly mvp: WebGLUniformLocation | null,
    public readonly mv: WebGLUniformLocation | null,
    public readonly n: WebGLUniformLocation | null
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

    gl.vertexAttribPointer(this.position, 2, gl.FLOAT, false, 4 * 4, 0)
    gl.enableVertexAttribArray(this.position)

    gl.vertexAttribPointer(this.uv, 2, gl.FLOAT, false, 4 * 4, 2 * 4)
    gl.enableVertexAttribArray(this.uv)

    gl.activeTexture(gl.TEXTURE0 + 0)
    gl.bindTexture(gl.TEXTURE_2D, this.diffuseTexture)
    gl.uniform1i(this.diffuseTexBuffer, 0)

    gl.activeTexture(gl.TEXTURE0 + 1)
    gl.bindTexture(gl.TEXTURE_2D, this.specularTexture)
    gl.uniform1i(this.specularTexBuffer, 1)

    gl.drawElements(gl.TRIANGLES, model.indexCount, gl.UNSIGNED_SHORT, 0)
  }

  drawActor (gl: WebGLRenderingContext, actor: PreparedActor, v: Matrix4, p: Matrix4) {
    const m = actor.transform.asMatrix()
    const mv = v.inverse().multiply(m)
    const mvp = p.multiply(mv)
    const n = mv.toMatrix3().inverse() // Transposed normals matrix.

    gl.useProgram(this.program)

    gl.bindBuffer(gl.ARRAY_BUFFER, actor.model.vertices)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, actor.model.indices)

    if (this.position >= 0) {
      gl.vertexAttribPointer(this.position, 2, gl.FLOAT, false, 4 * 4, 0)
      gl.enableVertexAttribArray(this.position)
    }

    if (this.uv >= 0) {
      gl.vertexAttribPointer(this.uv, 2, gl.FLOAT, false, 4 * 4, 2 * 4)
      gl.enableVertexAttribArray(this.uv)
    }

    gl.uniformMatrix4fv(this.mv, false, mv.transpose().values)
    gl.uniformMatrix4fv(this.mvp, false, mvp.transpose().values)
    gl.uniformMatrix3fv(this.n, false, n.values)

    gl.activeTexture(gl.TEXTURE0 + 0)
    gl.bindTexture(gl.TEXTURE_2D, this.diffuseTexture)
    gl.uniform1i(this.diffuseTexBuffer, 0)

    gl.activeTexture(gl.TEXTURE0 + 1)
    gl.bindTexture(gl.TEXTURE_2D, this.specularTexture)
    gl.uniform1i(this.specularTexBuffer, 1)

    gl.drawElements(gl.TRIANGLES, actor.model.indexCount, gl.UNSIGNED_SHORT, 0)
  }
}

/**
 * Shader program for 2D models ready to be compiled.
 */
export class Program2D implements Program {
  /**
   *
   */
  constructor (
    public readonly diffuseTexture: Texture,
    public readonly specularTexture: Texture
  ) {
  }

  /**
   * Returns already compiled shader program for 2D models with specular color.
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

    const diffuseTexture = this.diffuseTexture.load(gl)
    const specularTexture = this.specularTexture.load(gl)

    const position = gl.getAttribLocation(shaderProgram, 'a_position')
    const uv = gl.getAttribLocation(shaderProgram, 'u_uv')

    const mvp = gl.getUniformLocation(shaderProgram, 'u_mvp')
    const mv = gl.getUniformLocation(shaderProgram, 'u_mv')
    const n = gl.getUniformLocation(shaderProgram, 'u_n')
    const diffuseTexBuffer = gl.getUniformLocation(shaderProgram, 'u_diffuseColor')
    const specularTexBuffer = gl.getUniformLocation(shaderProgram, 'u_specularColor')

    return new CompiledProgram2D(shaderProgram, position, uv,
      diffuseTexture, specularTexture,
      diffuseTexBuffer, specularTexBuffer, mvp, mv, n)
  }
}
