import { Engine } from './engine/engine'
import { planeShader } from './engine/shaders/vertex/planeShader'
import { wavesShader } from './engine/shaders/fragment/wavesShader'
import { rectangleModel } from './engine/models/rectangleModel'
import { ringsShader } from './engine/shaders/fragment/ringsShader'
import { parallelLinesShader } from './engine/shaders/fragment/parallelLinesShader'

console.log('Starting WebGL app')
new Engine('canvas1').init().run(rectangleModel, planeShader, parallelLinesShader(5, 0))
new Engine('canvas2').init().run(rectangleModel, planeShader, parallelLinesShader(10, Math.PI * 0.5))
new Engine('canvas3').init().run(rectangleModel, planeShader, parallelLinesShader(5, Math.PI * 0.33))
new Engine('canvas4').init().run(rectangleModel, planeShader, parallelLinesShader(10, Math.PI * 0.75))
new Engine('canvas5').init().run(rectangleModel, planeShader, ringsShader(5, false, 0.2, 0.12))
new Engine('canvas6').init().run(rectangleModel, planeShader, ringsShader(5, true, 0.8))
new Engine('canvas7').init().run(rectangleModel, planeShader, wavesShader(5, 5, 3, false, 0.5, 0))
new Engine('canvas8').init().run(rectangleModel, planeShader, wavesShader(5, 5, 3, true, 0.7, Math.PI * 0.55))
new Engine('canvas9').init().run(rectangleModel, planeShader, wavesShader(5, 5, 3, false, 0.5, Math.PI * 0.33))
new Engine('canvas10').init().run(rectangleModel, planeShader, wavesShader(5, 5, 3, true, 0.7, Math.PI * 0.75))
