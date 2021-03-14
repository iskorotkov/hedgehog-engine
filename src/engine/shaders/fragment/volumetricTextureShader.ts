import { Vector3 } from '../../../math/vector'
import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'
import { Matrix4, translate } from '../../../math/matrix'

/**
 * Fragment shader that draws textured 3D mesh.
 * @param lightPosition Position of the light source.
 * @param view View matrix.
 * @param specular Specular level.
 */
export function volumetricTextureShader (lightPosition: Vector3, view: Matrix4, specular: number) {
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
varying vec2 v_uv;

uniform sampler2D u_diffuseColor;
uniform sampler2D u_specularColor;

void main()
{
    vec3 normals = normalize(v_normal);
    vec3 E = vec3(0.0, 0.0, 0.0);
    vec3 lightDirection = normalize(${light} - v_position);

    float diffuseStrength = max(dot(normals, lightDirection), 0.01);

    vec3 e = normalize(E - v_position);
    vec3 halfVector = normalize(e + lightDirection);
    float specularStrength = pow(max(dot(normals, halfVector), 0.0), ${stringify(specular)});

    vec4 diffuseColor = texture2D(u_diffuseColor, v_uv);
    vec4 specularColor = texture2D(u_specularColor, v_uv);
    gl_FragColor = vec4(diffuseColor.xyz * diffuseStrength + specularColor.xyz * specularStrength, 1.0);
}
`.trim())
}
