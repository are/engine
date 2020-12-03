import { EntityUpdateContext } from '../entity/Entity'
import { Key } from '../inputManager/Key'
import { Vector2 } from '../math/Vector2'
import { Widget } from './Widget'

export type PathStartedCallback = (start: Vector2, key: Key) => void
export type PathEndedCallback = (path: Array<Vector2>, key: Key) => void

export class MousePathWidget extends Widget {
  public isTracking = false
  public state: Array<Vector2> = []

  constructor(public keys: Key[]) {
    super()
  }

  private shouldNotifyPathStarted: boolean = false
  private shouldNotifyPathEnded: boolean = false
  private key: Key | null = null

  willUpdate({ inputState }: EntityUpdateContext) {
    if (this.isTracking === false) {
      const key = this.keys.find(inputState.isJustPressed.bind(inputState))

      if (key) {
        this.state = []
        this.isTracking = true

        this.key = key
        this.shouldNotifyPathStarted = true
      }
    }

    if (
      this.isTracking === true &&
      this.key &&
      inputState.isPressed(this.key)
    ) {
      this.state.push(inputState.mouse.clone())
    }

    if (
      this.isTracking === true &&
      this.key &&
      inputState.isJustReleased(this.key)
    ) {
      this.isTracking = false
      this.shouldNotifyPathEnded = true
    }
  }

  onPathStarted(callback: PathStartedCallback) {
    if (this.shouldNotifyPathStarted) {
      this.shouldNotifyPathStarted = false

      callback(this.state[0], this.key!)
    }
  }

  onPathEnded(callback: PathEndedCallback) {
    if (this.shouldNotifyPathEnded) {
      this.shouldNotifyPathEnded = false

      const state = this.state
      this.state = []

      callback(state, this.key!)
    }
  }
}
