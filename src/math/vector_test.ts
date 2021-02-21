import { Vector2, Vector3, Vector4 } from './vector'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('vectors', () => {
  it('2d vectors', () => {
    const v = new Vector2(10, 12)
    const v2 = new Vector2(14, 1)

    expect(v.clone()).to.deep.equal(v)
    expect(v.sizeSquared()).to.equal(10 ** 2 + 12 ** 2)
    expect(v.size()).to.equal(Math.sqrt(10 ** 2 + 12 ** 2))
    expect(v.normalize()).to.deep.equal(new Vector2(
      10 / Math.sqrt(10 ** 2 + 12 ** 2),
      12 / Math.sqrt(10 ** 2 + 12 ** 2)))
    expect(v.sum()).to.equal(10 + 12)
    expect(v.add(v2)).to.deep.equal(new Vector2(10 + 14, 12 + 1))
    expect(v.subtract(v2)).to.deep.equal(new Vector2(10 - 14, 12 - 1))
    expect(v.multiply(v2)).to.deep.equal(new Vector2(10 * 14, 12))
    expect(v.divide(v2)).to.deep.equal(new Vector2(10 / 14, 12))
    expect(v.dot(v2)).to.equal(10 * 14 + 12)
  })

  it('3d vectors', () => {
    const v = new Vector3(10, 12, 7)
    const v2 = new Vector3(14, 1, 3)

    expect(v.clone()).to.deep.equal(v)
    expect(v.sizeSquared()).to.equal(10 ** 2 + 12 ** 2 + 7 ** 2)
    expect(v.size()).to.equal(Math.sqrt(10 ** 2 + 12 ** 2 + 7 ** 2))
    expect(v.normalize()).to.deep.equal(new Vector3(
      10 / Math.sqrt(10 ** 2 + 12 ** 2 + 7 ** 2),
      12 / Math.sqrt(10 ** 2 + 12 ** 2 + 7 ** 2),
      7 / Math.sqrt(10 ** 2 + 12 ** 2 + 7 ** 2)))
    expect(v.sum()).to.equal(10 + 12 + 7)
    expect(v.add(v2)).to.deep.equal(new Vector3(10 + 14, 12 + 1, 7 + 3))
    expect(v.subtract(v2)).to.deep.equal(new Vector3(10 - 14, 12 - 1, 7 - 3))
    expect(v.multiply(v2)).to.deep.equal(new Vector3(10 * 14, 12, 7 * 3))
    expect(v.divide(v2)).to.deep.equal(new Vector3(10 / 14, 12, 7 / 3))
    expect(v.dot(v2)).to.equal(10 * 14 + 12 + 7 * 3)
    expect(v.cross(v2)).to.deep.equal(new Vector3(29, 68, -158))
  })

  it('4d vectors', () => {
    const v = new Vector4(10, 12, 7, 2)
    const v2 = new Vector4(14, 1, 3, -5)

    expect(v.clone()).to.deep.equal(v)
    expect(v.sizeSquared()).to.equal(10 ** 2 + 12 ** 2 + 7 ** 2 + 2 ** 2)
    expect(v.size()).to.equal(Math.sqrt(10 ** 2 + 12 ** 2 + 7 ** 2 + 2 ** 2))
    expect(v.normalize()).to.deep.equal(new Vector4(
      10 / Math.sqrt(10 ** 2 + 12 ** 2 + 7 ** 2 + 2 ** 2),
      12 / Math.sqrt(10 ** 2 + 12 ** 2 + 7 ** 2 + 2 ** 2),
      7 / Math.sqrt(10 ** 2 + 12 ** 2 + 7 ** 2 + 2 ** 2),
      2 / Math.sqrt(10 ** 2 + 12 ** 2 + 7 ** 2 + 2 ** 2)))
    expect(v.sum()).to.equal(10 + 12 + 7 + 2)
    expect(v.add(v2)).to.deep.equal(new Vector4(10 + 14, 12 + 1, 7 + 3, 2 - 5))
    expect(v.subtract(v2)).to.deep.equal(new Vector4(10 - 14, 12 - 1, 7 - 3, 2 + 5))
    expect(v.multiply(v2)).to.deep.equal(new Vector4(10 * 14, 12, 7 * 3, -2 * 5))
    expect(v.divide(v2)).to.deep.equal(new Vector4(10 / 14, 12, 7 / 3, -2 / 5))
    expect(v.dot(v2)).to.equal(10 * 14 + 12 + 7 * 3 - 2 * 5)
  })
})
