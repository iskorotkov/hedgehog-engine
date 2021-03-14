import { Vector3 } from '../../../math/vector'
import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'
import { Matrix4, translate } from '../../../math/matrix'

/**
 * Fragment shader that draws 3D mesh with diffuse and specular color and reflections.
 * @param lightPosition Position of the light source.
 * @param view View matrix.
 * @param specular Specular level.
 */
export function volumetricShader (lightPosition: Vector3, view: Matrix4, specular: number) {
  const globalLightPosition = view.multiply(translate(lightPosition)).toPosition()

  const light = {
    x: stringify(globalLightPosition.x),
    y: stringify(globalLightPosition.y),
    z: stringify(globalLightPosition.z),
    toString () {
      return `vec3(${this.x}, ${this.y}, ${this.z})`
    }
  }
  return new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_diffuseColor;
varying vec3 v_specularColor;

void main()
{
    vec3 normals = normalize(v_normal);
    vec3 E = vec3(0.0, 0.0, 0.0);
    vec3 lightDirection = normalize(${light} - v_position);

    float diffuse = max(dot(normals, lightDirection), 0.01);

    vec3 e = normalize(E - v_position);
    vec3 halfVector = normalize(e + lightDirection);
    float specular = pow(max(dot(normals, halfVector), 0.0), ${stringify(specular)});

    gl_FragColor = vec4(v_diffuseColor * diffuse + v_specularColor * specular, 1.0);
}
`.trim())
}
