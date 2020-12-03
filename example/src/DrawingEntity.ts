import {
  Entity,
  EntityDrawContext,
  EntityUpdateContext,
} from '../../src/entity/Entity'
import { Key } from '../../src/inputManager/Key'
import { vec2, Vector2 } from '../../src/math/Vector2'
import { MousePathWidget } from '../../src/widgets/MousePath'

import simplify from 'simplify-js'

function shakey(path: Vector2[], amount: number = 2): Vector2[] {
  return path.map(point =>
    vec2(
      point.x + (Math.random() - 0.5) * amount,
      point.y + (Math.random() - 0.5) * amount
    )
  )
}

function distance(a: Vector2, b: Vector2): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)
}

export class DrawingEntity extends Entity {
  path = new MousePathWidget([Key.Q, Key.W, Key.E])

  paths: { color: string; path: Vector2[]; closed: boolean }[] = []

  point: [string, Vector2] | null

  getColor(key: Key): string {
    let color: string
    switch (key) {
      case Key.Q:
        color = 'black'
        break
      case Key.W:
        color = 'darkgreen'
        break
      case Key.E:
        color = 'blue'
        break
    }
    return color
  }

  update(_context: EntityUpdateContext): void {
    this.path.onPathStarted((point, key) => {
      const color = this.getColor(key)
      this.point = [color, point]
    })

    this.path.onPathEnded((path, key) => {
      this.point = null

      const color = this.getColor(key)

      this.paths.push({
        color: color,
        path: simplify(path, 2).map(point => vec2(point.x, point.y)),
        closed: distance(path[path.length - 1], path[0]) < 10,
      })
    })
  }

  draw({ ctx }: EntityDrawContext): void {
    ctx.lineWidth = 2

    for (let { path, color, closed } of this.paths) {
      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(path[0].x, path[0].y)

      for (let point of shakey(path.slice(1) as Vector2[], 2)) {
        ctx.lineTo(point.x, point.y)
      }

      if (closed) {
        ctx.closePath()
        ctx.fill()
      } else {
        ctx.stroke()
      }
    }

    if (this.point) {
      ctx.save()
      ctx.globalAlpha = 0.4
      ctx.beginPath()
      ctx.fillStyle = this.point[0]
      ctx.arc(this.point[1].x, this.point[1].y, 10, 0, Math.PI * 2)

      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    if (this.path.isTracking) {
      ctx.strokeStyle = 'red'

      ctx.beginPath()
      ctx.moveTo(this.path.state[0].x, this.path.state[0].y)

      for (let point of shakey(simplify(this.path.state.slice(1), 2), 2)) {
        ctx.lineTo(point.x, point.y)
      }

      ctx.stroke()
    }
  }

  widgets = [this.path]
}
