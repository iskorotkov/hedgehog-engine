import { init } from './init'
import { Program2D } from './programs/program2d'
import { planeShader } from './shaders/vertex/planeShader'
import { clear, draw } from './graphics'
import { rectangleModel } from './models/rectangleModel'
import { horizontalWavesShader } from './shaders/fragment/horizontalWavesShader'

export function run () {
  console.log('Initializing WebGL rendering context')
  const gl = init()

  console.log('Compile shaders')
  const vertexShader = planeShader.compile(gl)
  const fragmentShader = horizontalWavesShader(10, 5, 3).compile(gl)

  console.log('Compile shader program')
  const program = new Program2D(vertexShader, fragmentShader)
  const compiled = program.compile(gl)

  console.log('Creating model')
  const prepared = rectangleModel.prepare(gl)

  console.log('Drawing')
  clear(gl)
  draw(gl, compiled, prepared)
}
