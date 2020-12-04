import {
  Entity,
  EntityDrawContext,
  EntityUpdateContext,
} from '../entity/Entity'

export abstract class Scene {
  private entities: Set<Entity> = new Set()

  protected add(entity: Entity) {
    this.entities.add(entity)
  }

  protected addAll(entities: Entity[]) {
    for (let entity of entities) {
      this.entities.add(entity)
    }
  }

  protected remove(entity: Entity) {
    this.entities.delete(entity)
  }

  willMount(): void {}
  didUnmount(): void {}

  prepare(
    _updateContext: EntityUpdateContext,
    _drawContext: EntityDrawContext
  ): void {}

  cleanup(
    _updateContext: EntityUpdateContext,
    _drawContext: EntityDrawContext
  ): void {}

  willUpdate(_context: EntityUpdateContext): void {}
  didUpdate(_context: EntityUpdateContext): void {}
  willDraw(_context: EntityDrawContext): void {}
  didDraw(_context: EntityDrawContext): void {}

  update(context: EntityUpdateContext) {
    this.willUpdate(context)

    for (let entity of this.entities) {
      entity._update(context)
    }

    this.didUpdate(context)
  }

  draw(context: EntityDrawContext) {
    this.willDraw(context)

    for (let entity of this.entities) {
      context.ctx.save()
      entity._draw(context)
      context.ctx.restore()
    }

    this.didDraw(context)
  }

  mount(): void {
    this.willMount()

    for (let entity of this.entities) {
      entity._mount(this)
    }
  }

  unmount(): void {
    for (let entity of this.entities) {
      entity._unmount()
    }

    this.entities.clear()

    this.didUnmount()
  }
}
