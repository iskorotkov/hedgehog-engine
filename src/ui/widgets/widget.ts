/**
 * Base class for all HTML element wrappers.
 */
export class Widget {
  /**
   * Return a new widget.
   * @param tag Widget tag (div, span, h3, etc).
   * @param classNames List of CSS classes.
   * @param children Children widgets.
   */
  constructor (
      public tag: string,
      public classNames: string[] = [],
      public children: (Widget|string)[] = []
  ) {}

  /**
   * Convert the widget to HTML elements hierarchy.
   * @returns Returns an HTMLElement with children.
   */
  toHTML (): HTMLElement {
    const element = document.createElement(this.tag)

    if (this.classNames.length > 0) {
      element.classList.add(...this.classNames)
    }

    for (const child of this.children) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child))
      } else {
        element.appendChild(child.toHTML())
      }
    }

    this.onElementCreated(element)
    return element
  }

  /**
   * Execute custom logic after HTML element is created.
   * @param _element Created HTML element.
   */
  protected onElementCreated (_element: HTMLElement): void {}
}
