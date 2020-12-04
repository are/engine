export class Vector2 {
  constructor(private _x: number = 0, private _y: number = 0) {}

  get x(): number {
    return this._x
  }

  get y(): number {
    return this._y
  }

  get e(): [number, number] {
    return [this._x, this._y]
  }

  get o(): { x: number; y: number } {
    return { x: this._x, y: this._y }
  }

  static from({ x, y }: { x: number; y: number }) {
    return Vector2.of(x, y)
  }

  clone = () => Vector2.of(this.x, this.y)
  simpleProduct = () => this.x * this.y
  asStride = (index: number) =>
    Vector2.of(index % this.x, (index - (index % this.x)) / this.x)

  add(other: Vector2): Vector2
  add(x: number, y?: number): Vector2
  add(x: number | Vector2, y?: number): Vector2 {
    if (x instanceof Vector2) {
      return Vector2.of(this._x + x._x, this._y + x._y)
    }

    return Vector2.of(this._x + x, this._y + (y ?? x))
  }

  mul = (x: number, y?: number) => Vector2.of(this.x * x, this.y * (y ?? x))

  div(other: Vector2): Vector2
  div(x: number, y?: number): Vector2
  div(x: number | Vector2, y?: number): Vector2 {
    if (x instanceof Vector2) {
      return Vector2.of(this._x / x._x, this._y / x._y)
    }

    return Vector2.of(this._x / x, this._y / (y ?? x))
  }

  pipe = (fn: (value: Vector2) => Vector2) => fn(this)

  equals = (other: Vector2) => this.x === other.x && this.y === other.y

  distance = (other: Vector2) =>
    Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2))

  snapToGrid = (size: Vector2) =>
    Vector2.of(
      Math.round(this.x / size.x) * size.x,
      Math.round(this.y / size.y) * size.y
    )

  transform = (matrix: DOMMatrix) =>
    Vector2.fromDOMPoint(matrix.transformPoint({ x: this._x, y: this._y }))

  floor = () => Vector2.of(Math.floor(this._x), Math.floor(this._y))

  static fromDOMPoint(point: DOMPoint) {
    return new Vector2(point.x, point.y)
  }

  static zero(): Vector2 {
    return new Vector2(0, 0)
  }

  static of(x: number, y?: number) {
    return new Vector2(x, y ?? x)
  }
}

export const vec2 = (x: number, y?: number) => Vector2.of(x, y ?? x)
