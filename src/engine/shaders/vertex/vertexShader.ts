/**
 * Already compiled vertex shader.
 */
export class CompiledVertexShader {
  /**
   * Returns compiled vertex shader.
   * @param shader WebGL vertex shader.
   */
  constructor (public readonly shader: WebGLShader) {}
}

/**
 * Vertex shader ready to be compiled.
 */
export class VertexShader {
  /**
   * Returns vertex shader ready to be compiled.
   * @param text Shader text.
   */
  constructor (private readonly text: string) {
  }

  /**
   * Returns compiled vertex shader.
   * @param gl WebGL context
   */
  compile (gl: WebGLRenderingContext): CompiledVertexShader {
    const shader = gl.createShader(gl.VERTEX_SHADER)

    if (!shader) {
      throw new Error('couldn\'t create shader')
    }

    gl.shaderSource(shader, this.text)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error('shader couldn\'t be compiled')
    }

    return new CompiledVertexShader(shader)
  }
}
