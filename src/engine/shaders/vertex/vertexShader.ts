export class CompiledVertexShader {
  constructor (public shader: WebGLShader) {}
}

export class VertexShader {
  constructor (private text: string) {
  }

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
