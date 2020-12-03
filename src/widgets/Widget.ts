import { EntityDrawContext, EntityUpdateContext } from '../entity/Entity'

export abstract class Widget {
  willUpdate(_context: EntityUpdateContext): void {}
  didUpdate(_context: EntityUpdateContext): void {}

  willDraw(_context: EntityDrawContext): void {}
  didDraw(_context: EntityDrawContext): void {}
}
