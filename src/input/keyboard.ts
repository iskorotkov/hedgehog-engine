export type Callback = (key: string, ctrl: boolean, alt: boolean) => void

interface Map {
    [key: string]: Callback[]
}

export class Keyboard {
  private listeners: Map = {}

  constructor () {
    document.addEventListener('keydown', e => {
      const callbacks = this.listeners[e.code]

      if (callbacks) {
        callbacks.forEach(c => c(e.code, e.ctrlKey, e.altKey))
      }
    })
  }

  addEventListener (key: string, callback: Callback) {
    this.listeners[key] = this.listeners[key] ?? []
    this.listeners[key]?.push(callback)
  }

  removeEventListener (key: string, callback: Callback) {
    if (this.listeners[key]) {
      this.listeners[key] = this.listeners[key]?.filter(c => c !== callback) ?? []
    }
  }
}
