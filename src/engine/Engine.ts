import { vec2, Vector2 } from '../math/Vector2'
import { Scene } from '../scene/Scene'
import { Ticker, TickerState } from '../ticker/Ticker'
import { InputManager } from '../inputManager/InputManager'
import { EntityDrawContext, EntityUpdateContext } from '../entity/Entity'

type SceneConstructor = { new (): Scene }

type EngineOptions = {
  canvas: HTMLCanvasElement
  size: Vector2
  ticker: Ticker
}

export class Engine {
  public ticker: Ticker

  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  private canvasSize!: Vector2
  private input = new InputManager()

  private scenes: Map<string, SceneConstructor> = new Map()
  private stack: Scene[] = []

  constructor({ canvas, size, ticker }: EngineOptions) {
    this.ticker = ticker

    this.canvas = canvas
    this.context = this.canvas.getContext('2d')!
    this.resize(size)

    this.input.mount(canvas)
    ticker.listen(this.tick.bind(this))

    window.addEventListener('resize', () => {
      this.resize(vec2(window.innerWidth, window.innerHeight))
    })
  }

  registerScene(name: string, Constructor: SceneConstructor) {
    this.scenes.set(name, Constructor)
  }

  getScene(name: string) {
    const Scene = this.scenes.get(name)

    if (!Scene) {
      throw new Error(`Requested to mount unregistered scene '${name}'`)
    }

    return new Scene()
  }

  pushScene(name: string) {
    const scene = this.getScene(name)

    this.stack.unshift(scene)

    scene.mount()
  }

  resize(newSize: Vector2) {
    this.canvasSize = newSize

    this.canvas.width = newSize.x
    this.canvas.height = newSize.y
  }

  private tick(tickerState: TickerState): void {
    this.context.clearRect(0, 0, this.canvasSize.x, this.canvasSize.y)

    const inputState = this.input.getState()

    let updateContext: EntityUpdateContext = {
      matrix: this.context.getTransform(),
      inputState: inputState,
      tickerState: tickerState,
      canvasSize: this.canvasSize,
    }

    let drawContext: EntityDrawContext = {
      ctx: this.context,
      tickerState: tickerState,
      canvasSize: this.canvasSize,
    }

    for (let scene of this.stack) {
      scene.prepare(updateContext, drawContext)
    }

    for (let scene of this.stack) {
      scene.update(updateContext)
    }

    for (let scene of this.stack) {
      scene.draw(drawContext)
    }

    for (let scene of this.stack) {
      scene.cleanup(updateContext, drawContext)
    }

    this.input.processTick()
  }

  start(): void {
    this.ticker.start()
  }

  stop(): void {
    this.ticker.stop()
  }
}
