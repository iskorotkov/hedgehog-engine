import { Engine } from './engine/engine'
import { Vector3 } from './math/vector'
import { VolumetricRenderer } from './engine/renderer/volumetricRenderer'
import { ParallelProjectionCamera } from './engine/camera/parallelProjectionCamera'
import { Transform } from './engine/world/transform'
import { BoundingBox } from './math/matrix'
import { Actor } from './engine/world/actor'
import { defaultCubeModel } from './engine/models/cubeModel'
import { Program3D } from './engine/programs/program3d'
import { volumetricShader as volumetricVertexShader } from './engine/shaders/vertex/volumetricShader'
import { volumetricShader as volumetricFragmentShader } from './engine/shaders/fragment/volumetricShader'
import { keepColorShader } from './engine/shaders/fragment/keepColorShader'
import { waterWavesShader } from './engine/shaders/vertex/waterWavesShader'
import { Program2DSpecular } from './engine/programs/program2dSpecular'
import { gridModel } from './engine/models/gridModel'
import { inputTransform } from './ui/widgets/inputTransform'
import { Widget } from './ui/widgets/widget'
import { inputVector3 } from './ui/widgets/inputVector3'

const paramsOpts = { step: 0.1 }
const positionOpts = { step: 1 }
const rotationOpts = { step: 10 }
const scaleOpts = { min: 0.1, step: 0.1 }

let params = { a: 0.2, b: 4, c: 0.1 }
const lightPosition = new Vector3(0, -10, 0)

const grid = { rows: 200, cols: 200 }
const gridColor = { diffuse: new Vector3(1, 0, 0), specular: new Vector3(1, 1, 1) }

const specular = 1

const graphTransform = new Transform(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(1, 1, 1))

const cube = new Actor(
  defaultCubeModel,
  new Transform(new Vector3(0, -10, 0), new Vector3(30, -30, 0), new Vector3(0.5, 0.5, 0.5)),
  new Program3D(),
  volumetricVertexShader,
  keepColorShader)

const box: BoundingBox = { near: 0.01, far: 100, left: -6.4, right: 6.4, bottom: -4.8, top: 4.8 }
const cameraTransform = new Transform(new Vector3(0, 0, -10), new Vector3(50, -30, 0), new Vector3(1, 1, 1))
const camera = new ParallelProjectionCamera(cameraTransform, box)

const renderer = new VolumetricRenderer(camera)
const engine = new Engine('canvas', renderer).init()

/**
 * Setup menu.
 */
function setupMenu () {
  const menu = new Widget('div', [], [
    inputVector3('Function params', paramsOpts, new Vector3(params.a, params.b, params.c), value => {
      params = {
        a: value.x,
        b: value.y,
        c: value.z
      }
      render()
    }),
    new Widget('hr'),
    inputTransform('Camera', positionOpts, rotationOpts, scaleOpts, camera.transform, render),
    new Widget('hr'),
    inputTransform('Graph', positionOpts, rotationOpts, scaleOpts, graphTransform, render),
    new Widget('hr'),
    inputTransform('Cube', positionOpts, rotationOpts, scaleOpts, cube.transform, render),
    new Widget('hr'),
    inputVector3('Light position', positionOpts, lightPosition, render)
  ])

  const root = document.getElementById('root')
  if (!root) {
    throw new Error('couldn\'t find root element to attach hierarchy to')
  }

  root.appendChild(menu.toHTML())
}

/**
 * Render scene.
 */
function render () {
  const graph = new Actor(
    gridModel(grid, gridColor, 5),
    graphTransform,
    new Program2DSpecular(),
    waterWavesShader(params),
    volumetricFragmentShader(lightPosition, specular)
  )

  engine.run([cube, graph])
}

setupMenu()
render()
