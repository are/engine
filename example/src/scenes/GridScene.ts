import { Easing } from '@tweenjs/tween.js'
import {
  Entity,
  EntityDrawContext,
  EntityUpdateContext,
  Key,
  Scene,
  vec2,
  Vector2,
} from '../../../src'
import { AnimatedValueWidget } from '../widgets/AnimationWidget'
import { TrackingPathOnGridWidget } from '../widgets/PathOnGridWidget'

export class GridEntity extends Entity {
  widgets = []

  constructor(private position: Vector2) {
    super()
  }

  update() {}

  draw({ ctx }: EntityDrawContext) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }
}

const prepare = (v: Vector2) => v.add(-6, -4).mul(100)

class CreateTrackEntity extends Entity {
  trackWidget = new TrackingPathOnGridWidget(vec2(13, 9), vec2(100))

  tween = new AnimatedValueWidget({ size: 0 })
  lastPoint = new AnimatedValueWidget({ x: 0, y: 0 })

  widgets = [this.trackWidget, this.tween, this.lastPoint]

  path: Vector2[] = []

  update({ inputState, matrix }: EntityUpdateContext) {
    this.trackWidget.whenPathStarts(() => {
      console.log('tarl')
      this.lastPoint.set(this.trackWidget.path[0].o)
    })

    this.trackWidget.whenPathUpdates(() => {
      const oldPath = this.path
      const newPath = this.trackWidget.path.slice(0)
      if (newPath.length > 1) {
        this.tween.update({ size: 26 }, 250)

        if (oldPath.length > newPath.length) {
          this.lastPoint.set(oldPath[oldPath.length - 1].o)
          this.lastPoint
            .update(newPath[newPath.length - 1].o, 50)
            .onComplete(() => {
              this.path = newPath
            })
            .onStop(() => {
              this.path = newPath
            })
        } else if (oldPath.length < newPath.length) {
          this.path = newPath
          this.lastPoint.set(newPath[newPath.length - 2].o)
          this.lastPoint.update(newPath[newPath.length - 1].o, 150)
        }
      }
    })

    this.trackWidget.whenPathEnds(() => {
      this.tween.update({ size: 0 }, 150).onComplete(() => {
        this.trackWidget.clear()
        this.path = []
      })
    })
  }
  draw({ ctx }: EntityDrawContext) {
    if (this.path.length > 1) {
      const path = this.path.slice(0, this.path.length - 1)
      ctx.beginPath()
      ctx.strokeStyle = 'black'
      ctx.lineWidth = this.tween.state.size * 2
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      ctx.moveTo(...path[0].pipe(prepare).e)

      for (let point of path.slice(1)) {
        ctx.lineTo(...point.pipe(prepare).e)
      }

      const lastPoint = Vector2.from(this.lastPoint.state).pipe(prepare)

      ctx.lineTo(...lastPoint.e)

      ctx.stroke()
    }
  }
}

export class GridScene extends Scene {
  gridSize = 100
  grid: GridEntity[] = []
  size: Vector2 = vec2(13, 9)

  willMount() {
    for (let i = 0; i < this.size.simpleProduct(); i++) {
      const position = this.size.asStride(i).pipe(prepare)

      const entity = new GridEntity(position)

      this.grid.push(entity)
    }

    this.addAll(this.grid)

    this.add(new CreateTrackEntity())
  }

  prepare(
    updateContext: EntityUpdateContext,
    { ctx, canvasSize }: EntityDrawContext
  ) {
    ctx.save()
    const half = canvasSize.div(2)

    ctx.translate(half.x, half.y)

    updateContext.matrix = ctx.getTransform()
  }

  cleanup(updateContext: EntityUpdateContext, { ctx }: EntityDrawContext) {
    ctx.restore()

    updateContext.matrix = ctx.getTransform()
  }
}
