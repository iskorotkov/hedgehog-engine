import { Engine } from './engine/engine'
import { Vector3, Vector4 } from './math/vector'
import { VolumetricRenderer } from './engine/renderer/volumetricRenderer'
import { ParallelProjectionCamera } from './engine/camera/parallelProjectionCamera'
import { Transform } from './engine/world/transform'
import { BoundingBox } from './math/matrix'
import { Actor } from './engine/world/actor'
import { Texture } from './assets/texture'
import { volumetricTextureGammaCorrectedShader as fragmentShader } from './engine/shaders/fragment/volumetricTextureGammaCorrectedShader'
import { volumetricTextureShader as vertexShader } from './engine/shaders/vertex/volumetricTextureShader'
import { Mouse } from './input/mouse'
import { PointsModel } from './engine/models/pointsModel'
import { Program2D } from './engine/programs/program2d'
import { Program3D } from './engine/programs/program3d'
import { Keyboard } from './input/keyboard'

const keyboard = new Keyboard()

// TODO: When moving on editor screen, new points appear in wrong coordinates.
const cameraPosition = new Vector3(0, 0, 10)
const movementSpeed = 1

keyboard.addEventListener('KeyW', () => {
  cameraPosition.y += movementSpeed
})

keyboard.addEventListener('KeyS', () => {
  cameraPosition.y -= movementSpeed
})

// TODO: Rotate camera, not shape (light must keep its position relative to shape).
const shapeRotation = new Vector3(0, 0, 0)
const rotationSpeed = 15

keyboard.addEventListener('KeyA', () => {
  shapeRotation.y += rotationSpeed
})

keyboard.addEventListener('KeyD', () => {
  shapeRotation.y -= rotationSpeed
})

const mouse = new Mouse('canvas')
mouse.addEventListener(pos => {
  // Scale positions.
  pos.x *= (box.right - box.left) / 2
  pos.y *= (box.top - box.bottom) / 2

  // Mirror positions along X axis.
  pos.x = Math.abs(pos.x)
  bezierCurveModel.addPoint(pos)

  compose()
})

const box: BoundingBox = { near: 0.001, far: 100, left: -6.4, right: 6.4, bottom: -4.8, top: 4.8 }
const cameraTransform = new Transform(cameraPosition, new Vector3(0, 0, 0), new Vector3(1, 1, 1))

// Switch cameras.

const parallelCamera = new ParallelProjectionCamera(cameraTransform, box)

let activeCamera: 'parallel' | 'perspective' = 'parallel'
keyboard.addEventListener('KeyC', () => {
  activeCamera = activeCamera === 'parallel' ? 'perspective' : 'parallel'

  if (activeCamera === 'parallel') {
    renderer.camera = parallelCamera
  } else {
    console.log('Perspective camera not implemented')
  }
})

const renderer = new VolumetricRenderer(parallelCamera, new Vector3(0.5, 0.5, 0.5))
const engine = new Engine('canvas', renderer).init()

const bezierCurveModel = new PointsModel()

/**
 * Create and compose the scene.
 */
function compose () {
  const curve = new Actor(
    bezierCurveModel.bezierCurveAsLines(0.01, 0.01, 0.05),
    new Transform(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(1, 1, 1)),
    new Program2D(new Texture('', new Vector4(0, 0, 255, 255)), new Texture('')),
    vertexShader,
    fragmentShader(new Vector3(0, 0, 0), parallelCamera.view(), 20)
  )

  const squares = new Actor(
    bezierCurveModel.squares(0.05),
    new Transform(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(1, 1, 1)),
    new Program2D(new Texture('', new Vector4(255, 0, 0, 255)), new Texture('')),
    vertexShader,
    fragmentShader(new Vector3(0, 0, 0), parallelCamera.view(), 20)
  )

  const shape = new Actor(
    bezierCurveModel.revolutionBody(0.01, 0.01, new Vector3(0, 1, 0), 10, true),
    new Transform(new Vector3(0, 0, 0), shapeRotation, new Vector3(1, 1, 1)),
    new Program3D(new Texture('', new Vector4(255, 0, 0, 255)), new Texture('')),
    vertexShader,
    fragmentShader(new Vector3(4, 4, 4), parallelCamera.view(), 20)
  )

  engine.compose([curve, squares, shape])
}

/**
 * Render composed scene.
 */
function render () {
  engine.render()
  requestAnimationFrame(render)
}

compose()
render()
