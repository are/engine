import { EntityDrawContext } from '../../src/entity/Entity'
import { Scene } from '../../src/scene/Scene'
import { DrawingEntity } from './DrawingEntity'

export class DrawingScene extends Scene {
  willMount() {
    this.add(new DrawingEntity())
  }

  willDraw({ ctx }: EntityDrawContext) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }
}
