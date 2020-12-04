import { InputState } from '../inputManager/InputState'
import { Vector2 } from '../math/Vector2'
import { Scene } from '../scene/Scene'
import { TickerState } from '../ticker/Ticker'
import { Widget } from '../widgets/Widget'

export type EntityUpdateContext = {
  matrix: DOMMatrix
  inputState: InputState
  tickerState: TickerState
  canvasSize: Vector2
}
export type EntityDrawContext = {
  ctx: CanvasRenderingContext2D
  tickerState: TickerState
  canvasSize: Vector2
}

export abstract class Entity {
  abstract widgets: Widget[]

  protected scene: Scene | null = null

  _mount(scene: Scene) {
    this.scene = scene
  }

  _unmount() {
    this.scene = null
  }

  _update(context: EntityUpdateContext) {
    for (let widget of Object.values(this.widgets)) {
      widget.willUpdate(context)
    }

    this.update(context)

    for (let widget of Object.values(this.widgets)) {
      widget.didUpdate(context)
    }
  }

  _draw(context: EntityDrawContext) {
    for (let widget of Object.values(this.widgets)) {
      widget.willDraw(context)
    }

    this.draw(context)

    for (let widget of Object.values(this.widgets)) {
      widget.didDraw(context)
    }
  }

  abstract update(context: EntityUpdateContext): void
  abstract draw(context: EntityDrawContext): void
}
