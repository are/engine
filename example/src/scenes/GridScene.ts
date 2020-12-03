import {
  Entity,
  EntityDrawContext,
  EntityUpdateContext,
  Key,
  Scene,
  vec2,
  Vector2,
} from '../../../src'

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
const invert = (v: Vector2) => v.div(100).add(6, 4)

class TrackEntity extends Entity {
  widgets = []
  constructor(private path: Vector2[]) {
    super()
  }

  update() {}

  draw({ ctx }: EntityDrawContext) {
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 100
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    ctx.moveTo(...this.path[0].pipe(prepare).e)

    for (let point of this.path.slice(1)) {
      ctx.lineTo(...point.pipe(prepare).e)
    }

    ctx.stroke()
  }
}

class CreateTrackEntity extends Entity {
  widgets = []

  private isTracking = false

  private startingPoint: Vector2 | null = null
  private nextPoint: Vector2 | null = null
  private path: Vector2[] = []

  update({ inputState, ctx }: EntityUpdateContext) {
    if (this.isTracking === false && inputState.isJustPressed(Key.LMB)) {
      const candidate = inputState.mouse
        .transform(ctx.getTransform().inverse())
        .snapToGrid(vec2(100))
        .pipe(invert)

      if (
        candidate.x >= 0 &&
        candidate.x <= 12 &&
        candidate.y >= 0 &&
        candidate.y <= 8
      ) {
        this.isTracking = true
        this.startingPoint = candidate
        this.path.push(candidate)
      }
    } else if (this.isTracking === true && inputState.isPressed(Key.LMB)) {
      const candidate = inputState.mouse
        .transform(ctx.getTransform().inverse())
        .snapToGrid(vec2(100))
        .pipe(invert)

      if (
        candidate.x >= 0 &&
        candidate.x <= 12 &&
        candidate.y >= 0 &&
        candidate.y <= 8
      ) {
        if (
          !this.path[this.path.length - 1].equals(candidate) &&
          this.path[this.path.length - 1].distance(candidate) === 1
        ) {
          const index = this.path.findIndex(v => v.equals(candidate))

          if (index === -1) {
            this.nextPoint = candidate
            this.path.push(candidate)
          } else if (index === this.path.length - 2) {
            this.nextPoint = candidate
            this.path = this.path.slice(0, index)
            this.path.push(candidate)
          }
        }
      }
    }

    if (this.isTracking === true && inputState.isJustReleased(Key.LMB)) {
      this.startingPoint = null
      this.nextPoint = null
      this.path = []
      this.isTracking = false
    }
  }
  draw({ ctx }: EntityDrawContext) {
    if (this.path.length > 1) {
      ctx.beginPath()
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 50
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      ctx.moveTo(...this.path[0].pipe(prepare).e)

      for (let point of this.path.slice(1)) {
        ctx.lineTo(...point.pipe(prepare).e)
      }

      ctx.stroke()
    }

    if (this.startingPoint) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.4)'
      ctx.beginPath()
      ctx.arc(...this.startingPoint.pipe(prepare).e, 10, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }

    if (this.nextPoint) {
      ctx.fillStyle = 'rgba(0, 255, 0, 0.4)'
      ctx.beginPath()
      ctx.arc(...this.nextPoint.pipe(prepare).e, 10, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
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

  willUpdate({ ctx, canvasSize }: EntityDrawContext) {
    ctx.save()
    const half = canvasSize.div(2)

    ctx.translate(half.x, half.y)
  }

  didDraw({ ctx }: EntityDrawContext) {
    ctx.restore()
  }
}
