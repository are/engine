import { Key } from './Key'
import { Vector2 } from '../math/Vector2'

export interface KeyState {
  re: boolean
  fe: boolean

  pressed: boolean
}

const emptyKeyState: KeyState = { re: false, fe: false, pressed: false }

export class InputState {
  constructor(
    private keyState: Map<Key, KeyState>,
    private mousePosition: Vector2
  ) {}

  private getKeyState(keyCode: Key): KeyState {
    return this.keyState.get(keyCode) ?? emptyKeyState
  }

  isPressed(keyCode: Key): boolean {
    return this.getKeyState(keyCode).pressed
  }

  isReleased(keyCode: Key): boolean {
    return !this.getKeyState(keyCode).pressed
  }

  isJustPressed(keyCode: Key): boolean {
    return this.getKeyState(keyCode).re
  }

  isJustReleased(keyCode: Key): boolean {
    return this.getKeyState(keyCode).fe
  }

  get mouse(): Vector2 {
    return this.mousePosition
  }
}
