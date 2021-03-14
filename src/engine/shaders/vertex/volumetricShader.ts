import { VertexShader } from './vertexShader'

/**
 * Vertex shader that displays vertices as a 3D mesh.
 */
export const volumetricShader = new VertexShader(`
precision highp float;
precision lowp int;

attribute vec3 a_position;
attribute vec3 a_diffuse_color;
attribute vec3 a_specular_color;

uniform mat4 u_mvp;
uniform mat4 u_mv;
uniform mat3 u_n;

varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_diffuseColor;
varying vec3 v_specularColor;

void main()
{
    vec4 p0 = vec4(a_position, 1.0);

    v_normal = u_n * normalize(a_position);
    v_position = vec3(u_mv * p0);
    v_diffuseColor = a_diffuse_color;
    v_specularColor = a_specular_color;
    gl_Position = u_mvp * p0;
}
`.trim())
