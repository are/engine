import {
  CancelTickerListener,
  Ticker,
  TickerListener,
  TickerState,
} from './Ticker'

export class AnimationFrameTicker extends Ticker {
  private listeners: Set<TickerListener> = new Set()

  private afId: number | null = null

  private frameNumber: number = 0
  private startTimestamp: number = 0
  private lastTimestamp: number = 0

  get isRunning(): boolean {
    return this.afId !== null
  }

  start(): void {
    if (this.afId === null) {
      this.frameNumber = 0

      this.scheduleNextAnimationFrame()
    }
  }

  stop(): void {
    if (this.afId !== null) {
      cancelAnimationFrame(this.afId)
      this.afId = null
    }
  }

  private scheduleNextAnimationFrame(): void {
    this.afId = requestAnimationFrame(this.tick.bind(this))
  }

  private tick(currentTimestamp: number): void {
    this.scheduleNextAnimationFrame()

    if (this.frameNumber === 0) {
      this.startTimestamp = currentTimestamp
      this.lastTimestamp = currentTimestamp
    }

    const tickerState: TickerState = {
      frameNumber: this.frameNumber,
      startTimestamp: this.startTimestamp,
      lastTimestamp: this.lastTimestamp,
      currentTimestamp: currentTimestamp,
      delta: currentTimestamp - this.lastTimestamp,
    }

    for (let listener of this.listeners) {
      listener(tickerState)
    }

    this.lastTimestamp = currentTimestamp
    this.frameNumber += 1
  }

  listen(listener: TickerListener): CancelTickerListener {
    this.listeners.add(listener)

    return () => {
      this.listeners.delete(listener)
    }
  }
}
