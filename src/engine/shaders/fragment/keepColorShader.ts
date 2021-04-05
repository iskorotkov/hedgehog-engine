import { FragmentShader } from './fragmentShader'

/**
 * Fragment shader that preserves original color.
 */
export const keepColorShader = new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_normal;
varying vec3 v_position;
varying vec2 v_uv;

uniform sampler2D u_diffuseColor;
uniform sampler2D u_specularColor;

void main()
{
    gl_FragColor = texture2D(u_diffuseColor, v_uv);
}
`)
