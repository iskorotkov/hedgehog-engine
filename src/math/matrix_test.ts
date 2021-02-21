import { describe, it } from 'mocha'
import { expect } from 'chai'
import { Matrix2, Matrix3, Matrix4 } from './matrix'

describe('matrices', () => {
  describe('number of inputs', () => {
    it('2d matrices', () => {
      expect(() => {
        return new Matrix2([])
      }).to.throw()

      expect(() => {
        return new Matrix2([1, 2])
      }).to.throw()

      expect(() => {
        return new Matrix2([1, 2, 3])
      }).to.throw()

      expect(() => {
        return new Matrix2([1, 2, 3, 4, 5])
      }).to.throw()
    })

    it('3d matrices', () => {
      expect(() => {
        return new Matrix2([])
      }).to.throw()

      expect(() => {
        return new Matrix2([1, 2])
      }).to.throw()

      expect(() => {
        return new Matrix2([
          1, 2, 3,
          4, 5, 6,
          7, 8
        ])
      }).to.throw()

      expect(() => {
        return new Matrix2([
          1, 2, 3,
          4, 5, 6,
          7, 8, 9,
          10
        ])
      }).to.throw()
    })

    it('4d matrices', () => {
      expect(() => {
        return new Matrix2([])
      }).to.throw()

      expect(() => {
        return new Matrix2([1, 2])
      }).to.throw()

      expect(() => {
        return new Matrix2([
          1, 2, 3, 4,
          5, 6, 7, 8,
          9, 10, 11, 12,
          13, 14, 15
        ])
      }).to.throw()

      expect(() => {
        return new Matrix2([
          1, 2, 3, 4,
          5, 6, 7, 8,
          9, 10, 11, 12,
          13, 14, 15, 16,
          17
        ])
      }).to.throw()
    })
  })

  describe('indexing', () => {
    it('2d matrices', () => {
      const m = new Matrix2([1, 2, 3, 4])

      expect(m.at(0, 0)).to.equal(1)
      expect(m.at(1, 1)).to.equal(4)

      m.set(0, 0, 8)
      m.set(1, 1, -2)

      expect(m.at(0, 0)).to.equal(8)
      expect(m.at(1, 1)).to.equal(-2)
    })

    it('3d matrices', () => {
      const m = new Matrix3([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ])

      expect(m.at(0, 0)).to.equal(1)
      expect(m.at(1, 1)).to.equal(5)
      expect(m.at(2, 1)).to.equal(8)

      m.set(0, 0, -5)
      m.set(1, 1, 100)
      m.set(2, 1, 3)

      expect(m.at(0, 0)).to.equal(-5)
      expect(m.at(1, 1)).to.equal(100)
      expect(m.at(2, 1)).to.equal(3)
    })

    it('4d matrices', () => {
      const m = new Matrix4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
      ])

      expect(m.at(0, 0)).to.equal(1)
      expect(m.at(1, 1)).to.equal(6)
      expect(m.at(2, 1)).to.equal(10)
      expect(m.at(2, 3)).to.equal(12)
      expect(m.at(3, 3)).to.equal(16)

      m.set(0, 0, 14)
      m.set(1, 1, 90)
      m.set(2, 1, 12)
      m.set(2, 3, 123)
      m.set(3, 3, -18)

      expect(m.at(0, 0)).to.equal(14)
      expect(m.at(1, 1)).to.equal(90)
      expect(m.at(2, 1)).to.equal(12)
      expect(m.at(2, 3)).to.equal(123)
      expect(m.at(3, 3)).to.equal(-18)
    })
  })

  describe('operations', () => {
    it('2d matrices', () => {
      const m = new Matrix2([
        1, 2,
        3, 4
      ])
      const m2 = new Matrix2([
        -2, -5,
        0, 12
      ])

      expect(m.clone()).to.deep.equal(m)
      expect(m.multiply(m2)).to.deep.equal(new Matrix2([
        -2, -5 + 24,
        -2 * 3, -3 * 5 + 4 * 12
      ]))
      expect(m.add(m2)).to.deep.equal(new Matrix2([
        1 - 2, 2 - 5,
        3, 4 + 12
      ]))
      expect(m.subtract(m2)).to.deep.equal(new Matrix2([
        1 + 2, 2 + 5,
        3, 4 - 12
      ]))
      expect(m.transpose()).to.deep.equal(new Matrix2([
        1, 3,
        2, 4
      ]))
    })

    it('3d matrices', () => {
      const m = new Matrix3([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ])
      const m2 = new Matrix3([
        -2, -5, 9,
        0, 12, 12,
        -1, 2, 1
      ])

      expect(m.clone()).to.deep.equal(m)
      expect(m.multiply(m2)).to.deep.equal(new Matrix3([
        -2 + -3, -5 + 2 * 12 + 3 * 2, 9 + 2 * 12 + 3,
        -2 * 4 - 6, -4 * 5 + 5 * 12 + 6 * 2, 4 * 9 + 5 * 12 + 6,
        -7 * 2 - 9, -7 * 5 + 8 * 12 + 9 * 2, 7 * 9 + 8 * 12 + 9
      ]))
      expect(m.add(m2)).to.deep.equal(new Matrix3([
        -1, -3, 12,
        4, 17, 18,
        6, 10, 10
      ]))
      expect(m.subtract(m2)).to.deep.equal(new Matrix3([
        3, 7, -6,
        4, -7, -6,
        8, 6, 8
      ]))
      expect(m.transpose()).to.deep.equal(new Matrix3([
        1, 4, 7,
        2, 5, 8,
        3, 6, 9
      ]))
    })

    it('4d matrices', () => {
      const m = new Matrix4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
      ])
      const m2 = new Matrix4([
        -2, -5, 9, 0,
        0, 12, 12, 1,
        -1, 2, 1, 2,
        3, 4, -1, 2
      ])

      expect(m.clone()).to.deep.equal(m)
      expect(m.multiply(m2)).to.deep.equal(new Matrix4([
        7, 41, 32, 16,
        7, 93, 116, 36,
        7, 145, 200, 56,
        7, 197, 284, 76
      ]))
      expect(m.add(m2)).to.deep.equal(new Matrix4([
        -1, -3, 12, 4,
        5, 18, 19, 9,
        8, 12, 12, 14,
        16, 18, 14, 18
      ]))
      expect(m.subtract(m2)).to.deep.equal(new Matrix4([
        3, 7, -6, 4,
        5, -6, -5, 7,
        10, 8, 10, 10,
        10, 10, 16, 14
      ]))
      expect(m.transpose()).to.deep.equal(new Matrix4([
        1, 5, 9, 13,
        2, 6, 10, 14,
        3, 7, 11, 15,
        4, 8, 12, 16
      ]))
    })
  })

  describe('determinant', () => {
    it('2d matrices', () => {
      expect(new Matrix2([1, 2, 3, 4]).determinant()).to.equal(4 - 2 * 3)
      expect(new Matrix2([0, 10, 0, 100]).determinant()).to.equal(0)
      expect(new Matrix2([-2, 3, 8, 0]).determinant()).to.equal(-3 * 8)
      expect(new Matrix2([10, 2, 3, -2]).determinant()).to.equal(-10 * 2 - 2 * 3)
      expect(new Matrix2([-1, -2, 3, 4]).determinant()).to.equal(-1 * 4 + 2 * 3)
    })

    it('3d matrices', () => {
      expect(new Matrix3([
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
      ]).determinant()).to.equal(0)

      expect(new Matrix3([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ]).determinant()).to.equal(0)

      expect(new Matrix3([
        1, 2, 3,
        4, 5, 6,
        7, 8, 19
      ]).determinant()).to.equal(-30)
    })

    it('4d matrices', () => {
      expect(new Matrix4([
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
      ]).determinant()).to.equal(0)

      expect(new Matrix4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
      ]).determinant()).to.equal(0)

      expect(new Matrix4([
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        132, 149, 158, 161
      ]).determinant()).to.equal(0)

      expect(new Matrix4([
        1, 2, 3, 4,
        52, 65, 71, 84,
        9, 10, 11, 12,
        132, 149, 158, 161
      ]).determinant()).to.equal(784)
    })
  })

  describe('inverse matrices', () => {
    it('2d matrices', () => {
      expect(() => {
        return new Matrix2([
          0, 0,
          0, 0
        ]).inverse()
      }).to.throw()

      expect(new Matrix2([
        1, 2,
        3, 4
      ]).inverse()).to.deep.equal(new Matrix2([
        -2, 1,
        3 / 2, -1 / 2
      ]))

      expect(new Matrix2([
        -10, 12,
        8, 7
      ]).inverse()).to.deep.equal(new Matrix2([
        -7 / 166, 6 / 83,
        4 / 83, 5 / 83
      ]))
    })

    it('3d matrices', () => {
      expect(() => {
        return new Matrix3([
          0, 0, 0,
          0, 0, 0,
          0, 0, 0
        ]).inverse()
      }).to.throw()

      expect(new Matrix3([
        1, 2, 3,
        4, 5, 6,
        7, 8, 91
      ]).inverse()).to.deep.equal(new Matrix3([
        -407 / 246, 79 / 123, 1 / 82,
        161 / 123, -35 / 123, -1 / 41,
        1 / 82, -1 / 41, 1 / 82
      ]))

      expect(new Matrix3([
        -10, 12, 11,
        8, 7, 1,
        5, -2, 1
      ]).inverse()).to.deep.equal(new Matrix3([
        -3 / 229, 34 / 687, 65 / 687,
        1 / 229, 65 / 687, -98 / 687,
        17 / 229, -40 / 687, 166 / 687
      ]))
    })

    it('4d matrices', () => {
      expect(() => {
        return new Matrix4([
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0
        ]).inverse()
      }).to.throw()

      expect(new Matrix4([
        12, 21, 35, 42,
        5, 6, 7, 8,
        91, 109, 112, 128,
        13, 14, 15, 16
      ]).inverse()).to.deep.equal(new Matrix4([
        -13 / 40, 903 / 160, -7 / 40, -91 / 160,
        11 / 40, -961 / 160, 9 / 40, 77 / 160,
        17 / 40, -1107 / 160, 3 / 40, 279 / 160,
        -3 / 8, 229 / 32, -1 / 8, -49 / 32
      ]))

      expect(new Matrix4([
        -10, 12, 11, 34,
        8, 7, 1, 1,
        5, -2, 1, -9,
        12, 23, 1, 0
      ]).inverse()).to.deep.equal(new Matrix4([
        -169 / 14043, 3019 / 14043, -101 / 4681, -857 / 14043,
        43 / 14043, -1516 / 14043, -2 / 4681, 1049 / 14043,
        1039 / 14043, -1360 / 14043, 1258 / 4681, 200 / 14043,
        4 / 4681, 621 / 4681, -436 / 4681, -229 / 4681
      ]))
    })
  })
})
