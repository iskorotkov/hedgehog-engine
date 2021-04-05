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
import { PerspectiveProjectionCamera } from './engine/camera/perspectiveProjectionCamera'
import { degrees } from './math/angle'

const keyboard = new Keyboard()

const cameraPosition = new Vector3(0, 0, 10)
const movementSpeed = 1

keyboard.addEventListener('KeyW', () => {
  cameraPosition.y += movementSpeed
})

keyboard.addEventListener('KeyS', () => {
  cameraPosition.y -= movementSpeed
})

keyboard.addEventListener('KeyR', () => {
  cameraPosition.z -= movementSpeed
  if (cameraPosition.z < 1) {
    cameraPosition.z = 1
  }
})

keyboard.addEventListener('KeyF', () => {
  cameraPosition.z += movementSpeed
})

let showShape = true
keyboard.addEventListener('KeyV', () => {
  showShape = !showShape
  compose()
})

let showBezierCurve = true
keyboard.addEventListener('KeyB', () => {
  showBezierCurve = !showBezierCurve
  compose()
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

  // Negate camera offset.
  pos.y += cameraPosition.y

  // Mirror positions along X axis.
  pos.x = Math.abs(pos.x)

  bezierCurveModel.addPoint(pos)

  compose()
})

let aspectRatio = 16 / 9

const canvas = document.getElementById('canvas') as HTMLCanvasElement
if (canvas) {
  aspectRatio = canvas.width / canvas.height
}

const boxSize = 5
const box: BoundingBox = {
  near: 0.001,
  far: 100,
  left: -boxSize * aspectRatio,
  right: boxSize * aspectRatio,
  bottom: -boxSize,
  top: boxSize
}

const cameraTransform = new Transform(cameraPosition, new Vector3(0, 0, 0), new Vector3(1, 1, 1))
const parallelCamera = new ParallelProjectionCamera(cameraTransform, box)

const perspectiveCamera = new PerspectiveProjectionCamera(cameraTransform, {
  viewAngle: degrees(60),
  // TODO: Get rid of multiplication by 0.5 when calculating aspect ratio for perspective projection.
  aspectRatio: 0.5 * aspectRatio,
  near: 0.001,
  far: 100
})

// Switch cameras.
let activeCamera: 'parallel' | 'perspective' = 'parallel'
keyboard.addEventListener('KeyC', () => {
  activeCamera = activeCamera === 'parallel' ? 'perspective' : 'parallel'

  if (activeCamera === 'parallel') {
    renderer.camera = parallelCamera
  } else {
    renderer.camera = perspectiveCamera
  }
})

const renderer = new VolumetricRenderer(parallelCamera, new Vector3(0.5, 0.5, 0.5))
const engine = new Engine('canvas', renderer).init()

const bezierCurveModel = new PointsModel()

const shapeDiffuseTexture = new Texture('./resources/textures/frog.jpg', new Vector4(255, 0, 0, 255))

const tolerance = 0.0001
const distance = 0.0001

/**
 * Create and compose the scene.
 */
function compose () {
  const curve = new Actor(
    bezierCurveModel.bezierCurveAsLines(tolerance, distance, 0.05),
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
    bezierCurveModel.revolutionBody(tolerance, distance, new Vector3(0, 1, 0), 10, true),
    new Transform(new Vector3(0, 0, 0), shapeRotation, new Vector3(1, 1, 1)),
    new Program3D(shapeDiffuseTexture, new Texture('')),
    vertexShader,
    fragmentShader(new Vector3(4, 4, 4), parallelCamera.view(), 20)
  )

  const actorsToDraw = []

  if (showBezierCurve) {
    actorsToDraw.push(curve, squares)
  }

  if (showShape) {
    actorsToDraw.push(shape)
  }

  engine.compose(actorsToDraw)
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
