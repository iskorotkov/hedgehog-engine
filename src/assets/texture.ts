import { Vector4 } from '../math/vector'

/**
 * Texture for model.
 */
export class Texture {
  /**
   * Returns new texture.
   * @param path Path to load image.
   * @param fallback Fallback color to use if image is not available.
   */
  constructor (
    public readonly path: string,
    public readonly fallback: Vector4 = new Vector4(255, 192, 203, 255)
  ) {
  }

  private cached: WebGLTexture | null = null

  /**
   * Load texture and prepare it for rendering.
   * @param gl WebGL rendering context.
   * @returns Loaded texture.
   */
  load (gl: WebGLRenderingContext) {
    if (this.cached === null) {
      this.cached = prepareTexture(gl, this)
    }
    return this.cached
  }

  /**
   * Unload texture and free memory.
   * @param gl WebGL rendering context.
   */
  unload (gl: WebGLRenderingContext) {
    if (this.cached !== null) {
      gl.deleteTexture(this.cached)
    }
  }
}

/**
 * Load texture and prepare it for rendering.
 * @param gl WebGL rendering context.
 * @param texture Texture to load.
 * @returns Returns prepared WebGLTexture.
 */
function prepareTexture (gl: WebGLRenderingContext, texture: Texture) {
  const glTexture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, glTexture)

  const color = texture.fallback
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
    new Uint8Array([color.x, color.y, color.z, color.w]))

  const image = new Image()
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, glTexture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

    if (isPowerOfTwo(image.width) && isPowerOfTwo(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D)
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    }
  }

  image.src = texture.path
  return glTexture
}

function isPowerOfTwo (x: number): boolean {
  return (x & (x - 1)) === 0
}
