import { Engine } from './engine/engine'
import { gridModel } from './engine/models/gridModel'
import { Vector3 } from './math/vector'
import { volumetricShader } from './engine/shaders/fragment/volumetricShader'
import { waterWavesShader } from './engine/shaders/vertex/waterWavesShader'
import { Program2DSpecular } from './engine/programs/program2dSpecular'
import { VolumetricRenderer } from './engine/renderer/volumetricRenderer'
import { ParallelProjectionCamera } from './engine/camera/parallelCamera'
import { Transform } from './engine/world/transform'
import { BoundingBox } from './math/matrix'
import { Actor } from './engine/world/actor'

const grid = { rows: 10, cols: 10 }
const gridColor = { diffuse: new Vector3(1, 0, 0), specular: new Vector3(1, 1, 1) }
const lightPosition = new Vector3(5, 0, 0)
const specular = 20
const params = {
  a: 0.2,
  b: 4,
  c: 0.1
}

const cameraTransform = new Transform(new Vector3(-5, 0, 0), new Vector3(45, 45, 0), new Vector3(1, 1, 1))
const box: BoundingBox = {
  near: 0.01,
  far: 100,
  left: -10,
  right: 10,
  bottom: -10,
  top: 10
}
const camera = new ParallelProjectionCamera(cameraTransform, box)
const renderer = new VolumetricRenderer(camera)

const actor = new Actor(
  gridModel(grid, gridColor),
  new Transform(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(1, 1, 1)),
  new Program2DSpecular(),
  waterWavesShader(params),
  volumetricShader(lightPosition, specular))

new Engine('canvas', renderer).init().run([actor])
