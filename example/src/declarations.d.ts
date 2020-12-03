declare module '*.png'
declare module '*.wav'

declare module 'simplify-js' {
  interface Point {
    x: number
    y: number
  }

  function simplify<T extends Point>(
    points: T[],
    tolerance?: number,
    highQuality?: boolean
  ): T[]
  namespace simplify {}

  export = simplify
}
