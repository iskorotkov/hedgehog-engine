import { init } from './init'
import { Program2D } from './programs/program2d'
import { planeShader } from './shaders/vertex/planeShader'
import { keepColorShader } from './shaders/fragment/keepColorShader'
import { Triangle } from './models/triangle'
import { clear, draw } from './graphics'

export function run () {
  console.log('Initializing WebGL rendering context')
  const gl = init()

  console.log('Compile shaders')
  const vertexShader = planeShader.compile(gl)
  const fragmentShader = keepColorShader.compile(gl)

  console.log('Compile shader program')
  const program = new Program2D(vertexShader, fragmentShader)
  const compiled = program.compile(gl)

  console.log('Creating model')
  const model = new Triangle()
  const prepared = model.prepare(gl)

  console.log('Drawing')
  clear(gl)
  draw(gl, compiled, prepared)
}
