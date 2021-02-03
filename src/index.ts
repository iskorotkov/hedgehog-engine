import { Engine } from './engine/engine'
import { planeShader } from './engine/shaders/vertex/planeShader'
import { wavesShader } from './engine/shaders/fragment/wavesShader'
import { rectangleModel } from './engine/models/rectangleModel'
import { ringsShader } from './engine/shaders/fragment/ringsShader'
import { parallelLinesShader } from './engine/shaders/fragment/parallelLinesShader'
import { degrees, radians } from './math/angle'

console.log('Starting WebGL app')
new Engine('canvas1').init().run(rectangleModel, planeShader, parallelLinesShader({
  lines: 5,
  sharp: false
}))
new Engine('canvas2').init().run(rectangleModel, planeShader, parallelLinesShader({
  lines: 10,
  angle: degrees(90),
  sharp: true
}))
new Engine('canvas3').init().run(rectangleModel, planeShader, parallelLinesShader({
  lines: 5,
  angle: degrees(60),
  balance: 0.2
}))
new Engine('canvas4').init().run(rectangleModel, planeShader, parallelLinesShader({
  lines: 10,
  angle: degrees(135),
  balance: 0.7
}))
new Engine('canvas5').init().run(rectangleModel, planeShader, ringsShader({
  rings: 5,
  sharp: false,
  balance: 0.2,
  offset: 0.12
}))
new Engine('canvas6').init().run(rectangleModel, planeShader, ringsShader({
  rings: 5,
  sharp: true,
  balance: 0.8
}))
new Engine('canvas7').init().run(rectangleModel, planeShader, wavesShader({
  lines: 5,
  density: 5,
  height: 3,
  sharp: false,
  balance: 0.5
}))
new Engine('canvas8').init().run(rectangleModel, planeShader, wavesShader({
  lines: 5,
  density: 5,
  height: 3,
  sharp: true,
  balance: 0.7,
  angle: radians(Math.PI * 0.55)
}))
new Engine('canvas9').init().run(rectangleModel, planeShader, wavesShader({
  lines: 5,
  density: 5,
  height: 3,
  sharp: false,
  balance: 0.5,
  angle: radians(Math.PI * 0.33)
}))
new Engine('canvas10').init().run(rectangleModel, planeShader, wavesShader({
  lines: 5,
  density: 5,
  height: 3,
  sharp: true,
  balance: 0.7,
  angle: radians(Math.PI * 0.75)
}))
