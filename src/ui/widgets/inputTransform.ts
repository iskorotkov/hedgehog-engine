import { Transform } from '../../engine/world/transform'
import { inputVector3 } from './inputVector3'
import { RangeOpts } from './input'
import { Widget } from './widget'

/**
 * Setup input elements for Vector3.
 * @param label Label to use for created elements.
 * @param positionSliderOpts Options for position sliders.
 * @param rotationSliderOpts Options for rotation sliders.
 * @param scaleSliderOpts Options for scale sliders.
 * @param initial Initial value.
 * @param onchange Callback that executes on change.
 */
export function inputTransform (
  label: string,
  positionSliderOpts: RangeOpts,
  rotationSliderOpts: RangeOpts,
  scaleSliderOpts: RangeOpts,
  initial: Transform,
  onchange: (value: Transform) => void
): Widget {
  return new Widget('section', [], [
    new Widget('h4', [], [label]),
    inputVector3('Position', positionSliderOpts, initial.position, () => {
      onchange(initial)
    }),
    inputVector3('Rotation', rotationSliderOpts, initial.rotation, () => {
      onchange(initial)
    }),
    inputVector3('Scale', scaleSliderOpts, initial.scale, () => {
      onchange(initial)
    })
  ])
}
