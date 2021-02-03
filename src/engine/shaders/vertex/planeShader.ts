import { VertexShader } from './vertexShader'

/**
 * Vertex shader that displays vertices on a plane.
 */
export const planeShader = new VertexShader(`
precision highp float;
precision lowp int;

attribute vec2 a_position;
attribute vec3 a_color;

varying vec3 v_color;

void main()
{
    v_color = a_color;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`)
