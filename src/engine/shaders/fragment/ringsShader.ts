import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'

/**
 * Returns a fragment shader with a rings effect.
 * @param rings Number of rings.
 * @param sharp Whether rings must be sharp.
 * @param balance Balance between black (0) and selected color (1).
 * @param offset Offset from center.
 */
export function ringsShader (rings: number, sharp: boolean, balance: number = 0.5, offset: number = 0): FragmentShader {
  const distance = `(2.0 * sqrt(pow(v_color.x - 0.5, 2.0) + pow(v_color.y - 0.5, 2.0)) - ${stringify(offset)})`

  const ringsArg = `2.0 * 3.14 * ${distance} * ${stringify(rings)}`
  const scaledRings = `((sin(${ringsArg}) + 1.0) / 2.0 + ${stringify(balance - 0.5)})`

  const sharpRings = sharp ? `step(0.5, ${scaledRings})` : scaledRings

  return new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_color;

void main()
{
    gl_FragColor = vec4(${sharpRings}, 0.0, 0.0, 1.0);
}
`)
}
