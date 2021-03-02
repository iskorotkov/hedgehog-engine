import { FragmentShader } from './fragmentShader'

/**
 * Fragment shader that preserves original color.
 */
export const keepColorShader = new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_diffuse_color;

void main()
{
    gl_FragColor = vec4(v_diffuse_color, 1.0);
}
`)
