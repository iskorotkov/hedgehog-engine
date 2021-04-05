import { Vector2 } from '../math/vector'

export type Callback = (position: Vector2) => void

export class Mouse {
    private listeners: Callback[] = []

    constructor (elementID: string) {
      const canvas = document.getElementById(elementID) as HTMLCanvasElement
      if (!canvas) {
        throw new Error('No element was found with provided ID')
      }

      canvas.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const clipX = x / rect.width * 2 - 1
        const clipY = y / rect.height * -2 + 1

        const position = new Vector2(clipX, clipY)

        this.listeners.forEach(callback => callback(position))
      })
    }

    addEventListener (callback: Callback) {
      this.listeners.push(callback)
    }

    removeEventListener (callback: Callback) {
      this.listeners = this.listeners.filter(c => c !== callback)
    }
}
