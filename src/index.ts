import { Engine } from './engine/engine'
import { Vector2, Vector3, Vector4 } from './math/vector'
import { VolumetricRenderer } from './engine/renderer/volumetricRenderer'
import { ParallelProjectionCamera } from './engine/camera/parallelProjectionCamera'
import { Transform } from './engine/world/transform'
import { BoundingBox, rotate, translate } from './math/matrix'
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
import { keepColorShader } from './engine/shaders/fragment/keepColorShader'

const keyboard = new Keyboard()

const cameraPosition = new Vector3(0, 0, 20)
const cameraMovementSpeed = 1

keyboard.addEventListener('KeyW', () => {
  cameraPosition.y += cameraMovementSpeed
})

keyboard.addEventListener('KeyS', () => {
  cameraPosition.y -= cameraMovementSpeed
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
  // TODO: Get rid of (1 / (aspect ratio)) for perspective projection.
  aspectRatio: 1 / aspectRatio,
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

const orbitDegrees = 15
const orbitAxis = new Vector3(0, 1, 0)

let lightPosition = new Vector3(50, 10, 0)
keyboard.addEventListener('KeyE', () => {
  lightPosition = rotate(orbitAxis, degrees(orbitDegrees)).multiply(translate(lightPosition)).toPosition()
  compose()
})

keyboard.addEventListener('KeyQ', () => {
  lightPosition = rotate(orbitAxis, degrees(-orbitDegrees)).multiply(translate(lightPosition)).toPosition()
  compose()
})

const lightMovementSpeed = 1
keyboard.addEventListener('KeyR', () => {
  lightPosition.y += lightMovementSpeed
  compose()
})

keyboard.addEventListener('KeyF', () => {
  lightPosition.y -= lightMovementSpeed
  compose()
})

const minDistanceBetweenPoints = 0.2

const mouse = new Mouse('canvas')
mouse.addEventListener(pos => {
  if (activeCamera !== 'parallel') {
    return
  }

  // Scale positions.
  pos.x *= (box.right - box.left) / 2
  pos.y *= (box.top - box.bottom) / 2

  // Negate camera offset.
  pos.y += cameraPosition.y

  // Mirror positions along X axis.
  pos.x = Math.abs(pos.x)

  const closePoints = bezierCurveModel.getPoints().filter(p => pos.subtract(p).size() < minDistanceBetweenPoints)

  if (closePoints.length > 0) {
    bezierCurveModel.removePoint(closePoints[0] ?? new Vector2(0, 0))
  } else {
    bezierCurveModel.addPoint(pos)
  }

  compose()
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
    bezierCurveModel.bezierCurveAsLines(tolerance, distance, 0.01),
    new Transform(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(1, 1, 1)),
    new Program2D(new Texture('', new Vector4(0, 0, 255, 255)), new Texture('')),
    vertexShader,
    keepColorShader
  )

  const squares = new Actor(
    bezierCurveModel.squares(0.05),
    new Transform(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(1, 1, 1)),
    new Program2D(new Texture('', new Vector4(0, 0, 255, 255)), new Texture('')),
    vertexShader,
    keepColorShader
  )

  const shape = new Actor(
    bezierCurveModel.revolutionBody(tolerance, distance, new Vector3(0, 1, 0), 24, true),
    new Transform(new Vector3(0, 0, 0), shapeRotation, new Vector3(1, 1, 1)),
    new Program3D(shapeDiffuseTexture, new Texture('')),
    vertexShader,
    fragmentShader(lightPosition, parallelCamera.view(), 20)
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
