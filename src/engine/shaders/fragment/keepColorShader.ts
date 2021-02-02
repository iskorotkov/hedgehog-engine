import { FragmentShader } from './fragmentShader'

export const keepColorShader = new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_color;

void main()
{
    gl_FragColor = vec4(v_color, 1.0);
}
`)
