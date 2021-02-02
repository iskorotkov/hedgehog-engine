export function init (): WebGLRenderingContext {
  const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement
  const devicePixelRatio = window.devicePixelRatio || 1
  canvas.width = canvas.clientWidth * devicePixelRatio
  canvas.height = canvas.clientHeight * devicePixelRatio

  const gl = canvas.getContext('webgl')
  if (!gl) {
    throw new Error('couldn\'t create WebGL context')
  }

  gl.viewport(0, 0, canvas.width, canvas.height)
  return gl
}
