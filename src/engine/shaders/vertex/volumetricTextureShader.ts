import { VertexShader } from './vertexShader'

/**
 * Vertex shader that displays vertices as a 3D mesh.
 */
export const volumetricTextureShader = new VertexShader(`
precision highp float;
precision lowp int;

attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec2 a_uv;

uniform mat4 u_mvp;
uniform mat4 u_mv;
uniform mat3 u_n;

varying vec3 v_normal;
varying vec3 v_position;
varying vec2 v_uv;

void main()
{
    vec4 p0 = vec4(a_position, 1.0);

    v_normal = u_n * normalize(a_normal);
    v_position = vec3(u_mv * p0);
    v_uv = a_uv;
    gl_Position = u_mvp * p0;
}
`.trim())
