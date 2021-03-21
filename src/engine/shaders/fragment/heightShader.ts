import { Vector3, Vector4 } from '../../../math/vector'
import { FragmentShader } from './fragmentShader'
import { stringify } from '../functions/stringify'
import { Matrix4, translate } from '../../../math/matrix'

export interface Heights {
  min: number,
  max: number
}

export interface Colors {
  min: Vector4,
  max: Vector4
}

/**
 * Fragment shader that draws 3D mesh and paints it based on height.
 * @param lightPosition Position of the light source.
 * @param view View matrix.
 * @param specular Specular level.
 * @param heights Min and max height.
 * @param colors Colors for min and max heights.
 */
export function heightShader (
  lightPosition: Vector3,
  view: Matrix4,
  specular: number,
  heights: Heights,
  colors: Colors
) {
  const globalLightPosition = view.multiply(translate(lightPosition)).toPosition()

  const light = {
    x: stringify(globalLightPosition.x),
    y: stringify(globalLightPosition.y),
    z: stringify(globalLightPosition.z),
    toString () {
      return `vec3(${this.x}, ${this.y}, ${this.z})`
    }
  }

  function vectorStringify (v: Vector4) {
    return `vec4(${stringify(v.x / 255)}, ${stringify(v.y / 255)}, ${stringify(v.z / 255)}, ${stringify(v.w / 255)})`
  }

  return new FragmentShader(`
precision highp float;
precision lowp int;

varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_original_position;
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

    vec4 minColor = ${vectorStringify(colors.min)};
    vec4 maxColor = ${vectorStringify(colors.max)};
    float minHeight = ${stringify(heights.min)};
    float maxHeight = ${stringify(heights.max)};
    float alpha = (v_original_position.y - minHeight) / (maxHeight - minHeight);
    vec4 diffuseColor = mix(minColor, maxColor, clamp(alpha, 0.0, 1.0));

    vec4 specularColor = texture2D(u_specularColor, v_uv);
    gl_FragColor = vec4(diffuseColor.xyz * diffuseStrength + specularColor.xyz * specularStrength, 1.0);
}
`.trim())
}
