import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'

/**
 * Returns a fragment shader with a horizontal waves effect.
 * @param lines Number of horizontal lines.
 * @param density Number of waves.
 * @param height Max amplitude of vertical offset of the waves.
 * @param sharp Whether rings must be sharp.
 * @param balance Balance between black (0) and selected color (1).
 * @param angle Angle between waves and X axis (in radians).
 * @param horizontalOffset Horizontal offset of the shader effect.
 * @param verticalOffset Vertical offset of the shader effect.
 */
export function wavesShader (lines: number, density: number, height: number, sharp: boolean, balance: number,
  angle: number, horizontalOffset: number = 0, verticalOffset: number = 0): FragmentShader {
  const wavesNormal = `(v_color.x * cos(${stringify(angle)}) + v_color.y * sin(${stringify(angle)}))`
  const wavesArg = `2.0 * 3.14 * ${wavesNormal} * ${stringify(density)}`
  const wavesEffect = `(sin(${wavesArg}) * ${stringify(height)} - ${stringify(horizontalOffset)})`

  const distance = `(v_color.x * sin(${stringify(angle)}) - v_color.y * cos(${stringify(angle)}))`
  const linesArg = `2.0 * 3.14 * ${distance} * ${stringify(lines)} - ${stringify(verticalOffset)} + ${wavesEffect}`
  const scaledLines = `(sin(${linesArg}) + 1.0) / 2.0 + ${stringify(balance - 0.5)}`

  const sharpScaledLines = sharp ? `step(0.5, ${scaledLines})` : scaledLines

  return new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_color;

void main()
{
    gl_FragColor = vec4(${sharpScaledLines}, 0.0, 0.0, 1.0);
}
`)
}
