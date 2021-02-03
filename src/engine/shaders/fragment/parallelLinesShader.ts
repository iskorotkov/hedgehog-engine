import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'
import { Angle, radians } from '../../../math/angle'

interface ParallelLinesShaderParams {
  lines?: number
  angle?: Angle
  sharp?: boolean
  balance?: number
  offset?: number
}

/**
 * Returns a fragment shader with a horizontal lines effect.
 * @param lines Number of lines.
 * @param angle Angle between parallel lines and X axis (in radians).
 * @param sharp Whether rings must be sharp.
 * @param balance Balance between black (0) and selected color (1).
 * @param offset Vertical offset.
 */
export function parallelLinesShader ({
  lines = 1,
  angle = radians(0),
  sharp = false,
  balance = 0.5,
  offset = 0
}: ParallelLinesShaderParams): FragmentShader {
  return new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_color;

void main()
{
    float distance = v_color.x * sin(${stringify(angle?.radians)}) - v_color.y * cos(${stringify(angle?.radians)});
    float arg = 2.0 * 3.14 * distance * ${stringify(lines)} - ${stringify(offset)};
    float scaled = (sin(arg) + 1.0) / 2.0 + ${stringify(balance)} - 0.5;
    gl_FragColor = vec4(${sharp ? 'step(0.5, scaled)' : 'scaled'}, 0.0, 0.0, 1.0);
}
`)
}
