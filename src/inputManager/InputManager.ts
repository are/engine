import { InputState, KeyState } from './InputState'
import { Key } from './Key'
import { vec2, Vector2 } from '../math/Vector2'

export class InputManager {
  private state: Map<Key, KeyState> = new Map()
  private mousePosition: Vector2 = vec2(0, 0)

  private element: HTMLElement | null = null

  getState(): InputState {
    return new InputState(
      new Map(this.state.entries()),
      this.mousePosition.clone()
    )
  }

  processTick(): void {
    for (let key of this.state.keys()) {
      const state = this.state.get(key)!

      this.state.set(key, {
        pressed: state.pressed,
        fe: false,
        re: false,
      })
    }
  }

  mount(element: HTMLElement): void {
    this.element = element
    window.addEventListener('keydown', this.handleKeydown)
    window.addEventListener('keyup', this.handleKeyup)
    window.addEventListener('mousedown', this.handleMousedown)
    window.addEventListener('mouseup', this.handleMouseup)
    window.addEventListener('mousemove', this.handleMousemove)
  }

  unmount(): void {
    this.element = null
    window.removeEventListener('keydown', this.handleKeydown)
    window.removeEventListener('keyup', this.handleKeyup)
    window.removeEventListener('mousedown', this.handleMousedown)
    window.removeEventListener('mouseup', this.handleMouseup)
    window.removeEventListener('mousemove', this.handleMousemove)
  }

  private handleKeydown = (event: KeyboardEvent) => {
    const state = this.state.get(event.keyCode)

    if (!state?.pressed) {
      this.state.set(event.keyCode, {
        re: true,
        fe: false,
        pressed: true,
      })
    }
  }

  private handleKeyup = (event: KeyboardEvent) => {
    this.state.set(event.keyCode, {
      re: false,
      fe: true,
      pressed: false,
    })
  }

  private handleMousedown = (event: MouseEvent) => {
    const state = this.state.get(event.button)

    if (!state?.pressed) {
      this.state.set(event.button, {
        re: true,
        fe: false,
        pressed: true,
      })
    }
  }
  private handleMouseup = (event: MouseEvent) => {
    this.state.set(event.button, {
      re: false,
      fe: true,
      pressed: false,
    })
  }
  private handleMousemove = (event: MouseEvent) => {
    const boundingRect = this.element?.getBoundingClientRect()

    this.mousePosition = vec2(
      event.clientX - (boundingRect?.left ?? 0),
      event.clientY - (boundingRect?.top ?? 0)
    )
  }
}
