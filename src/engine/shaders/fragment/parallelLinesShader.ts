import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'

/**
 * Returns a fragment shader with a horizontal lines effect.
 * @param lines Number of lines.
 * @param angle Angle between parallel lines and X axis (in radians).
 * @param offset Vertical offset.
 */
export function parallelLinesShader (lines: number, angle: number, offset: number = 0): FragmentShader {
  const distance = `(v_color.x * sin(${stringify(angle)}) - v_color.y * cos(${stringify(angle)}))`

  const arg = `2.0 * 3.14 * ${distance} * ${stringify(lines)} - ${stringify(offset)}`
  const scaled = `(sin(${arg}) + 1.0) / 2.0`

  return new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_color;

void main()
{
    gl_FragColor = vec4(${scaled}, 0.0, 0.0, 1.0);
}
`)
}
