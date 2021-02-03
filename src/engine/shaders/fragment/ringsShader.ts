import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'

/**
 * Returns a fragment shader with a rings effect.
 * @param rings Number of rings.
 * @param offset Offset from center.
 */
export function ringsShader (rings: number, offset: number = 0): FragmentShader {
  const distance = `(2.0 * sqrt(pow(v_color.x - 0.5, 2.0) + pow(v_color.y - 0.5, 2.0)) - ${stringify(offset)})`

  const arg = `2.0 * 3.14 * ${distance} * ${stringify(rings)}`
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
