import { Entity, EntityUpdateContext, Key, Vector2, Widget } from '../../../src'

export class TrackingPathOnGridWidget extends Widget {
  public isTracking = false

  constructor(public gridSize: Vector2, public tileSize: Vector2) {
    super()
  }

  public startPoint: Vector2 | null = null
  public endPoint: Vector2 | null = null

  public path: Vector2[] = []

  private shouldNotifyPathStart = false
  private shouldNotifyPathUpdated = false
  private shouldNotifyPathEnd = false

  willUpdate(context: EntityUpdateContext) {
    const { inputState } = context

    if (this.isTracking === false && inputState.isJustPressed(Key.LMB)) {
      return this.handlePathStart(context)
    } else if (this.isTracking === true && inputState.isPressed(Key.LMB)) {
      return this.handlePath(context)
    } else if (this.isTracking === true && inputState.isJustReleased(Key.LMB)) {
      return this.handlePathEnd(context)
    }
  }

  whenPathStarts(callback: () => void): void {
    if (this.shouldNotifyPathStart) {
      this.shouldNotifyPathStart = false
      callback()
    }
  }

  whenPathEnds(callback: () => void): void {
    if (this.shouldNotifyPathEnd) {
      this.shouldNotifyPathEnd = false
      callback()
    }
  }

  whenPathUpdates(callback: () => void): void {
    if (this.shouldNotifyPathUpdated) {
      this.shouldNotifyPathUpdated = false
      callback()
    }
  }

  clear(): void {
    this.isTracking = false
    this.path = []
    this.startPoint = null
    this.endPoint = null
  }

  private handlePathStart({ inputState, matrix }: EntityUpdateContext) {
    const candidate = this.transformMousePosition(inputState.mouse, matrix)

    if (this.isPointContainedInTheGrid(candidate)) {
      this.isTracking = true
      this.path = [candidate]
      this.startPoint = candidate
      this.shouldNotifyPathStart = true
    }
  }

  private handlePath({ inputState, matrix }: EntityUpdateContext) {
    const candidate = this.transformMousePosition(inputState.mouse, matrix)

    if (
      this.isPointContainedInTheGrid(candidate) &&
      !this.lastPathPoint.equals(candidate) &&
      this.lastPathPoint.distance(candidate) === 1
    ) {
      const index = this.path.findIndex(candidate.equals, candidate)

      const isPenultimate = index === this.path.length - 2

      if (isPenultimate && index !== -1) {
        this.path = this.path.slice(0, index)
      }

      if (index === -1 || isPenultimate) {
        this.endPoint = candidate
        this.path.push(candidate)
        this.shouldNotifyPathUpdated = true
      }
    }
  }

  private handlePathEnd(_context: EntityUpdateContext) {
    this.isTracking = false
    this.shouldNotifyPathEnd = true
  }

  private get lastPathPoint(): Vector2 {
    return this.path[this.path.length - 1]
  }

  private isPointContainedInTheGrid(point: Vector2) {
    return (
      point.x >= 0 &&
      point.x < this.gridSize.x &&
      point.y >= 0 &&
      point.y < this.gridSize.y
    )
  }

  private transformMousePosition(initial: Vector2, matrix: DOMMatrix) {
    return initial
      .transform(matrix.inverse())
      .snapToGrid(this.tileSize)
      .div(this.tileSize)
      .add(this.gridSize.div(2).floor())
  }
}
