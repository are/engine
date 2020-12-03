export type TickerState = {
  frameNumber: number

  startTimestamp: number
  lastTimestamp: number
  currentTimestamp: number

  delta: number
}

export type TickerListener = (state: TickerState) => void

export type CancelTickerListener = () => void

export abstract class Ticker {
  abstract start(): void
  abstract stop(): void

  abstract get isRunning(): boolean

  abstract listen(listener: TickerListener): CancelTickerListener
}
