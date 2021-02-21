import { describe, it } from 'mocha'
import { expect } from 'chai'
import { degrees, radians } from './angle'

const precision = 1e-6

describe('angle tests', () => {
  it('degrees to radians', () => {
    expect(degrees(0).radians).to.approximately(0, precision)
    expect(degrees(90).radians).to.approximately(Math.PI / 2, precision)
    expect(degrees(180).radians).to.approximately(Math.PI, precision)
    expect(degrees(270).radians).to.approximately(1.5 * Math.PI, precision)
    expect(degrees(360).radians).to.approximately(2 * Math.PI, precision)
  })

  it('radians to degrees', () => {
    expect(radians(0).degrees).to.approximately(0, precision)
    expect(radians(Math.PI / 2).degrees).to.approximately(90, precision)
    expect(radians(Math.PI).degrees).to.approximately(180, precision)
    expect(radians(1.5 * Math.PI).degrees).to.approximately(270, precision)
    expect(radians(2 * Math.PI).degrees).to.approximately(360, precision)
  })
})
