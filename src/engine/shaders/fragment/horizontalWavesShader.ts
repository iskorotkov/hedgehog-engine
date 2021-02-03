import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'

/**
 * Returns a fragment shader with a horizontal waves effect.
 * @param lines Number of horizontal lines.
 * @param density Number of waves.
 * @param height Max amplitude of vertical offset of the waves.
 * @param horizontalOffset Horizontal offset of the shader effect.
 * @param verticalOffset Vertical offset of the shader effect.
 */
export function horizontalWavesShader (lines: number, density: number, height: number, horizontalOffset: number = 0, verticalOffset: number = 0): FragmentShader {
  const wavesArg = `2.0 * 3.14 * v_color.x * ${stringify(density)}`
  const wavesEffect = `(sin(${wavesArg}) * ${stringify(height)} - ${stringify(horizontalOffset)})`

  const linesArg = `2.0 * 3.14 * v_color.y * ${stringify(lines)} - ${stringify(verticalOffset)} + ${wavesEffect}`
  const scaledLines = `(sin(${linesArg}) + 1.0) / 2.0`

  return new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_color;

void main()
{
    gl_FragColor = vec4(${scaledLines}, 0.0, 0.0, 1.0);
}
`)
}
