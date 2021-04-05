import { CompiledProgram, Program } from './program'
import { CompiledVertexShader } from '../shaders/vertex/vertexShader'
import { CompiledFragmentShader } from '../shaders/fragment/fragmentShader'
import { PreparedModel } from '../models/model'
import { PreparedActor } from '../world/actor'
import { Matrix4 } from '../../math/matrix'
import { Texture } from '../../assets/texture'

/**
 * Already compiled shader program for 3D models.
 */
export class CompiledProgram3D implements CompiledProgram {
  /**
   * Returns already compiled shader program for 3D models.
   * @param program WebGL program.
   * @param position Position buffer index.
   * @param diffuseTexBuffer Diffuse texture buffer index.
   * @param specularTexBuffer Specular texture buffer index.
   */
  constructor (
    private readonly program: WebGLProgram,
    private readonly position: number,
    private readonly normal: number,
    private readonly uv: number,
    public readonly diffuseTexture: Texture,
    public readonly specularTexture: Texture,
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

    gl.vertexAttribPointer(this.position, 3, gl.FLOAT, false, 8 * 4, 0)
    gl.enableVertexAttribArray(this.position)

    gl.vertexAttribPointer(this.normal, 3, gl.FLOAT, false, 8 * 4, 3 * 4)
    gl.enableVertexAttribArray(this.normal)

    gl.vertexAttribPointer(this.uv, 2, gl.FLOAT, false, 8 * 4, 6 * 4)
    gl.enableVertexAttribArray(this.uv)

    gl.activeTexture(gl.TEXTURE0 + 0)
    gl.bindTexture(gl.TEXTURE_2D, this.diffuseTexture.load(gl))
    gl.uniform1i(this.diffuseTexBuffer, 0)

    gl.activeTexture(gl.TEXTURE0 + 1)
    gl.bindTexture(gl.TEXTURE_2D, this.specularTexture.load(gl))
    gl.uniform1i(this.specularTexBuffer, 1)

    gl.drawElements(gl.TRIANGLES, model.indexCount, gl.UNSIGNED_SHORT, 0)
  }

  drawActor (gl: WebGLRenderingContext, actor: PreparedActor, v: Matrix4, p: Matrix4) {
    const m = actor.transform.asMatrix()
    const mv = v.inverse().multiply(m)
    const mvp = p.multiply(mv)
    const n = mv.toMatrix3().inverse().transpose()

    gl.useProgram(this.program)

    gl.bindBuffer(gl.ARRAY_BUFFER, actor.model.vertices)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, actor.model.indices)

    if (this.position >= 0) {
      gl.vertexAttribPointer(this.position, 3, gl.FLOAT, false, 8 * 4, 0)
      gl.enableVertexAttribArray(this.position)
    }

    if (this.normal >= 0) {
      gl.vertexAttribPointer(this.normal, 3, gl.FLOAT, false, 8 * 4, 3 * 4)
      gl.enableVertexAttribArray(this.normal)
    }

    if (this.uv >= 0) {
      gl.vertexAttribPointer(this.uv, 2, gl.FLOAT, false, 8 * 4, 6 * 4)
      gl.enableVertexAttribArray(this.uv)
    }

    gl.uniformMatrix4fv(this.mv, false, mv.transpose().values)
    gl.uniformMatrix4fv(this.mvp, false, mvp.transpose().values)
    gl.uniformMatrix3fv(this.n, false, n.transpose().values)

    gl.activeTexture(gl.TEXTURE0 + 0)
    gl.bindTexture(gl.TEXTURE_2D, this.diffuseTexture.load(gl))
    gl.uniform1i(this.diffuseTexBuffer, 0)

    gl.activeTexture(gl.TEXTURE0 + 1)
    gl.bindTexture(gl.TEXTURE_2D, this.specularTexture.load(gl))
    gl.uniform1i(this.specularTexBuffer, 1)

    gl.drawElements(gl.TRIANGLES, actor.model.indexCount, gl.UNSIGNED_SHORT, 0)
  }
}

/**
 * Shader program for 3D models ready to be compiled.
 */
export class Program3D implements Program {
  /**
   *
   */
  constructor (
    private readonly diffuseTexture: Texture,
    private readonly specularTexture: Texture
  ) {
  }

  private cachedProgram: CompiledProgram | null = null
  private cachedVertex: CompiledVertexShader | null = null
  private cachedFragment: CompiledFragmentShader | null = null

  /**
   * Returns already compiled shader program for 3D models.
   * @param gl WebGL context.
   * @param vertex Vertex shader to use.
   * @param fragment Fragment shader to use.
   */
  compile (
    gl: WebGLRenderingContext,
    vertex: CompiledVertexShader,
    fragment: CompiledFragmentShader
  ): CompiledProgram {
    if (!this.cachedProgram ||
      vertex !== this.cachedVertex ||
      fragment !== this.cachedFragment) {
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
      const normal = gl.getAttribLocation(shaderProgram, 'a_normal')
      const uv = gl.getAttribLocation(shaderProgram, 'a_uv')

      const mvp = gl.getUniformLocation(shaderProgram, 'u_mvp')
      const mv = gl.getUniformLocation(shaderProgram, 'u_mv')
      const n = gl.getUniformLocation(shaderProgram, 'u_n')
      const diffuseTexBuffer = gl.getUniformLocation(shaderProgram, 'u_diffuseColor')
      const specularTexBuffer = gl.getUniformLocation(shaderProgram, 'u_specularColor')

      this.cachedVertex = vertex
      this.cachedFragment = fragment
      this.cachedProgram = new CompiledProgram3D(shaderProgram, position, normal, uv,
        this.diffuseTexture, this.specularTexture,
        diffuseTexBuffer, specularTexBuffer, mvp, mv, n)
    }

    return this.cachedProgram
  }
}
