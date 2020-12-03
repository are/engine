import { Entity, EntityDrawContext } from '../../src/entity/Entity'
import { Vector2 } from '../../src/math/Vector2'

interface TextOptions {
  text: string
  font: string
  style: string
  position: Vector2

  vertical?: CanvasTextBaseline
  horizontal?: CanvasTextAlign
}

export class TextEntity extends Entity {
  constructor(private options: TextOptions) {
    super()
  }

  update() {}

  draw({ ctx }: EntityDrawContext): void {
    const { font, style, horizontal, vertical, position, text } = this.options

    ctx.save()
    ctx.font = font
    ctx.fillStyle = style

    ctx.textAlign = horizontal ?? 'center'
    ctx.textBaseline = vertical ?? 'middle'

    ctx.fillText(text, position.x, position.y)

    ctx.restore()
  }

  widgets = []
}
