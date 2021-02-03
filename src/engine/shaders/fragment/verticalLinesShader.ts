import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'

/**
 * Returns a fragment shader with a vertical lines effect.
 * @param lines Number of lines.
 * @param offset Horizontal offset.
 */
export function verticalLinesShader (lines: number, offset: number = 0): FragmentShader {
  const arg = `2.0 * 3.14 * v_color.x * ${stringify(lines)} - ${stringify(offset)}`
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
