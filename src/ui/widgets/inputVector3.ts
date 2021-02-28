import { Vector3 } from '../../math/vector'
import { Range, RangeOpts } from './range'
import { Widget } from './widget'

/**
 * Setup input elements for Vector3.
 * @param label Label to use for created elements.
 * @param sliderOptions Options for sliders.
 * @param initial Initial value.
 * @param onchange Callback that executes on change.
 */
export function inputVector3 (
  label: string,
  sliderOptions: RangeOpts,
  initial: Vector3,
  onchange: (value: Vector3) => void
): Widget {
  return new Widget('div', [], [
    new Widget('h4', [], [label]),
    new Widget('div', [], [
      new Widget('label', [], [
        'X',
        new Range(initial.x, sliderOptions, x => {
          initial.x = x
          onchange(initial)
        })
      ]),
      new Widget('label', [], [
        'Y',
        new Range(initial.y, sliderOptions, y => {
          initial.y = y
          onchange(initial)
        })
      ]),
      new Widget('label', [], [
        'Z',
        new Range(initial.z, sliderOptions, z => {
          initial.z = z
          onchange(initial)
        })
      ])
    ])
  ])
}
