import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'
import { Angle, radians } from '../../../math/angle'

interface WavesShaderParams {
  lines?: number
  density?: number
  height?: number
  sharp?: boolean
  balance?: number
  angle?: Angle
  horizontalOffset?: number
  verticalOffset?: number
}

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
export function wavesShader ({
  lines = 1,
  density = 1,
  height = 1,
  sharp = false,
  balance = 0.5,
  angle = radians(0),
  horizontalOffset = 0,
  verticalOffset = 0
}: WavesShaderParams): FragmentShader {
  return new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_color;

void main()
{
    // Waves
    float wavesNormal = v_color.x * cos(${stringify(angle?.radians)}) + v_color.y * sin(${stringify(angle?.radians)});
    float wavesArg = 2.0 * 3.14 * wavesNormal * ${stringify(density)};
    float wavesEffect = sin(wavesArg) * ${stringify(height)} - ${stringify(horizontalOffset)};
    
    // Parallel lines
    float distance = v_color.x * sin(${stringify(angle?.radians)}) - v_color.y * cos(${stringify(angle?.radians)});
    float linesArg = 2.0 * 3.14 * distance * ${stringify(lines)} - ${stringify(verticalOffset)} + wavesEffect;
    float scaledLines = (sin(linesArg) + 1.0) / 2.0 + ${stringify(balance)} - 0.5;
    
    gl_FragColor = vec4(${sharp ? 'step(0.5, scaledLines)' : 'scaledLines'}, 0.0, 0.0, 1.0);
}
`)
}
