/**
 * Already compiled fragment shader.
 */
export class CompiledFragmentShader {
  /**
   * Returns compiled fragment shader.
   * @param shader WebGL fragment shader.
   */
  constructor (public readonly shader: WebGLShader) {}
}

/**
 * Fragment shader ready to compile.
 */
export class FragmentShader {
  /**
   * Returns fragment shader ready to be compiled.
   * @param text Shader text.
   */
  constructor (private readonly text: string) {
  }

  private cache: CompiledFragmentShader | null = null

  /**
   * Returns compiled fragment shader.
   * @param gl
   */
  compile (gl: WebGLRenderingContext): CompiledFragmentShader {
    if (this.cache === null) {
      const shader = gl.createShader(gl.FRAGMENT_SHADER)

      if (!shader) {
        throw new Error('couldn\'t create shader')
      }

      gl.shaderSource(shader, this.text)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error('shader couldn\'t be compiled')
      }

      this.cache = new CompiledFragmentShader(shader)
    }

    return this.cache
  }
}
