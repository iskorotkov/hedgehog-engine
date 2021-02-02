export class CompiledFragmentShader {
  constructor (public shader: WebGLShader) {}
}

export class FragmentShader {
  constructor (private text: string) {
  }

  compile (gl: WebGLRenderingContext): CompiledFragmentShader {
    const shader = gl.createShader(gl.FRAGMENT_SHADER)

    if (!shader) {
      throw new Error('couldn\'t create shader')
    }

    gl.shaderSource(shader, this.text)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error('shader couldn\'t be compiled')
    }

    return new CompiledFragmentShader(shader)
  }
}
