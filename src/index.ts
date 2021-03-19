import { Engine } from './engine/engine'
import { Vector3, Vector4 } from './math/vector'
import { VolumetricRenderer } from './engine/renderer/volumetricRenderer'
import { ParallelProjectionCamera } from './engine/camera/parallelProjectionCamera'
import { Transform } from './engine/world/transform'
import { BoundingBox } from './math/matrix'
import { Actor } from './engine/world/actor'
import { cubeModelWithNormals } from './engine/models/cubeModel'
import { Program3D } from './engine/programs/program3d'
import { gridModel } from './engine/models/gridModel'
import { inputTransform } from './ui/widgets/inputTransform'
import { Widget } from './ui/widgets/widget'
import { inputVector3 } from './ui/widgets/inputVector3'
import { Texture } from './assets/texture'
import { volumetricTextureShader as fragmentShader } from './engine/shaders/fragment/volumetricTextureShader'
import { volumetricTextureShader as vertexShader } from './engine/shaders/vertex/volumetricTextureShader'
import { MicrophoneInput } from './media/microphoneInput'
import { GridScroll } from './special/gridScroll'

const paramsOpts = { step: 0.1 }
const positionOpts = { step: 1 }
const rotationOpts = { step: 10 }
const scaleOpts = { min: 0.1, step: 0.1 }

let params = { a: 0.2, b: 30, c: 0.1 }

const dimensions = { rows: 128, cols: 128 }

const graphHeight = 3
const graphSmoothing = 0.4
const scrollInterval = 20

const specular = 15

const graphTransform = new Transform(new Vector3(0, 0, 0), new Vector3(20, -50, 0), new Vector3(5, 1, 5))
const cubeTransform = new Transform(new Vector3(0, 5, 0), new Vector3(30, -30, 0), new Vector3(0.05, 0.05, 0.05))

const box: BoundingBox = { near: 0.001, far: 100, left: -6.4, right: 6.4, bottom: -4.8, top: 4.8 }
const cameraTransform = new Transform(new Vector3(0, 3, 3), new Vector3(-40, 0, 0), new Vector3(1, 1, 1))
const camera = new ParallelProjectionCamera(cameraTransform, box)

const renderer = new VolumetricRenderer(camera, new Vector3(1, 1, 1))
const engine = new Engine('canvas', renderer).init()

const graphDiffuse = new Texture('', new Vector4(0, 0, 128, 255))
const graphSpecular = new Texture('', new Vector4(64, 64, 64, 255))

const cubeColor = new Texture('', new Vector4(255, 255, 0, 255))

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
      compose()
    }),
    inputTransform('Camera', positionOpts, rotationOpts, scaleOpts, camera.transform, compose),
    inputTransform('Graph', positionOpts, rotationOpts, scaleOpts, graphTransform, compose),
    inputTransform('Light source (cube)', positionOpts, rotationOpts, scaleOpts, cubeTransform, compose)
  ])

  const root = document.getElementById('root')
  if (!root) {
    throw new Error('couldn\'t find root element to attach hierarchy to')
  }

  root.appendChild(menu.toHTML())
}

const graphModel = gridModel(dimensions, '3d', 'add')
const gridScroll = new GridScroll(graphModel, 8, 1)

let microphoneInput: MicrophoneInput | null = null
MicrophoneInput.create(dimensions.cols * 2, graphSmoothing).then(input => {
  console.log('Microphone input is being captured')
  microphoneInput = input
}).catch(error => {
  console.error(error)
  alert('Couldn\'t start recording')
})

/**
 * Create and compose the scene.
 */
function compose () {
  const cube = new Actor(
    cubeModelWithNormals,
    cubeTransform,
    new Program3D(cubeColor, cubeColor),
    vertexShader,
    fragmentShader(new Vector3(0, 0, 0), camera.view(), 0))

  const graph = new Actor(
    graphModel,
    graphTransform,
    new Program3D(graphDiffuse, graphSpecular),
    vertexShader,
    fragmentShader(cube.transform.position, camera.view(), specular)
  )

  engine.compose([cube, graph])
}

/**
 * Render composed scene.
 */
function render () {
  engine.render()
  requestAnimationFrame(render)
}

setInterval(() => {
  if (microphoneInput) {
    const bytes = microphoneInput.next()
    const array = Array.prototype.slice.call(bytes).map(x => x / 256 * graphHeight)

    console.log(`${bytes.length} read`)

    gridScroll.scroll(array)
    graphModel.markDirty()

    compose()
  }
}, scrollInterval)

setupMenu()
compose()
render()
