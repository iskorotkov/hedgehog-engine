import { Vector3 } from '../../../math/vector'
import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'

/**
 * Fragment shader that draws 3D mesh with diffuse and specular color and reflections.
 * @param lightPosition Position of the light source.
 * @param specular Specular level.
 */
export function volumetricShader (lightPosition: Vector3, specular: number) {
  const light = {
    x: stringify(lightPosition.x),
    y: stringify(lightPosition.y),
    z: stringify(lightPosition.z),
    toString () {
      return `vec3(${this.x}, ${this.y}, ${this.z})`
    }
  }
  return new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_diffuse_color;
varying vec3 v_specular_color;

void main()
{
    vec3 normals = normalize(v_normal);
    vec3 E = vec3(0, 0, 0);
    vec3 lightDirection = normalize(v_position - ${light});
    
    float diffuse = max(dot(normals, lightDirection), 0.01);
    
    vec3 e = normalize(E - v_position);
    vec3 halfVector = normalize(e - lightDirection);
    float specular = pow(max(dot(normals, halfVector), 0), ${stringify(specular)});
    
    gl_FragColor = vec4(v_diffuse_color * diffuse + v_specular_color * specular, 1);
}
`.trim())
}
