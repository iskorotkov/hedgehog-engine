import { Engine } from './engine/engine'
import { planeShader } from './engine/shaders/vertex/planeShader'
import { horizontalWavesShader } from './engine/shaders/fragment/horizontalWavesShader'
import { rectangleModel } from './engine/models/rectangleModel'
import { ringsShader } from './engine/shaders/fragment/ringsShader'
import { horizontalLinesShader } from './engine/shaders/fragment/horizontalLinesShader'
import { verticalLinesShader } from './engine/shaders/fragment/verticalLinesShader'

console.log('Starting WebGL app')
new Engine('canvas1').init().run(rectangleModel, planeShader, horizontalLinesShader(5))
new Engine('canvas2').init().run(rectangleModel, planeShader, verticalLinesShader(10))
new Engine('canvas3').init().run(rectangleModel, planeShader, ringsShader(10))
new Engine('canvas4').init().run(rectangleModel, planeShader, horizontalWavesShader(10, 5, 3))
