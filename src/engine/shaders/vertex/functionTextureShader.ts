import { VertexShader } from './vertexShader'

/**
 * Vertex shader that calculates function value y and draws a 3D mesh.
 * @param f Shader function f.
 * @param grad Shader function to calculate derivatives of f.
 */
export function functionTextureShader (f: string, grad: string) {
  return new VertexShader(`
precision highp float;
precision lowp int;

attribute vec2 a_position;
attribute vec2 a_uv;

uniform mat4 u_mvp;
uniform mat4 u_mv;
uniform mat3 u_n;

varying vec3 v_normal;
varying vec3 v_position;
varying vec2 v_uv;

${f}

${grad}

void main()
{
    float y = f(a_position);
    vec4 p0 = vec4(a_position.x, y, a_position.y, 1.0);

    v_normal = u_n * normalize(grad(a_position));
    v_position = vec3(u_mv * p0);
    v_uv = a_uv;
    gl_Position = u_mvp * p0;
}
`.trim())
}
