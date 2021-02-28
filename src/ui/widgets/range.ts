import { Widget } from './widget'

export interface RangeOpts {
    min?: number
    max?: number
    step?: number
}

/**
 * Input-range HTML element.
 */
export class Range extends Widget {
  /**
   * Returns an input-range HTML element.
   * @param initial Initial value.
   * @param opts Optional range values.
   * @param onchange On change callback.
   * @param classNames List of CSS classes.
   * @param children Children widgets.
   */
  constructor (
    public initial: number,
    public opts: RangeOpts,
    private onchange: (value: number) => void,
    classNames: string[] = [],
    children: (Widget|string)[] = []
  ) {
    super('input', classNames, children)
  }

  onElementCreated (element: HTMLElement) {
    const input = element as HTMLInputElement
    input.type = 'range'
    input.valueAsNumber = this.initial

    input.addEventListener('input', () => {
      this.onchange(input.valueAsNumber)
    })

    if (this.opts.min !== undefined) {
      input.min = this.opts.min.toString()
    }

    if (this.opts.max !== undefined) {
      input.max = this.opts.max.toString()
    }

    if (this.opts.step !== undefined) {
      input.step = this.opts.step.toString()
    }
  }
}
