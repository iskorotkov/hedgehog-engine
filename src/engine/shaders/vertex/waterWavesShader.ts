import { functionShader } from './functionShader'
import { stringify } from '../functions/stringify'

/**
 * Vertex shader for drawing function
 * f(x, z, a, b, c) = a * cos(b * (x * x + z * z)) * exp(c * (x * x + z * z))
 * @param a Function parameter a.
 * @param b Function parameter b.
 * @param c Function parameter c.
 */
export function waterWavesShader ({ a, b, c }: { a: number, b: number, c: number }) {
  const f = `
float f(vec2 p)
{
    float a = ${stringify(a)};
    float b = ${stringify(b)};
    float c = ${stringify(c)};

    float x = p.x;
    float z = p.y;

    float s = x * x + z * z;
    return a * cos(b * s) * exp(c * s);
}`.trim()
  const grad = `
vec3 grad(vec2 p)
{
    float a = ${stringify(a)};
    float b = ${stringify(b)};
    float c = ${stringify(c)};

    float x = p.x;
    float z = p.y;

    float s = x * x + z * z;
    float dx = 2.0 * a * x * exp(c * s) * (c * cos(b * s) - b * sin(b * s));
    float dz = 2.0 * a * z * exp(c * s) * (c * cos(b * s) - b * sin(b * s));
    return vec3(dx, 1.0, dz);
}`.trim()
  return functionShader(f, grad)
}
