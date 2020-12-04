import { EntityUpdateContext, Widget } from '../../../src'

import { Tween, Group, Easing } from '@tweenjs/tween.js'

export class AnimatedValueWidget<T> extends Widget {
  private group: Group = new Group()

  private tween: Tween<T>

  constructor(public state: T) {
    super()
    this.state = state
  }

  set(newState: T) {
    this.group.removeAll()
    for (let tween of this.group.getAll()) {
      tween.stop().stopChainedTweens()
    }

    this.state = newState
  }

  update(newState: T, time: number) {
    this.group.removeAll()
    for (let tween of this.group.getAll()) {
      tween.stop().stopChainedTweens()
    }

    this.tween = new Tween(this.state, this.group)
      .easing(Easing.Quadratic.Out)
      .to(newState, time)
      .start()
      .onComplete(result => {
        this.state = result
        this.tween = null
      })
      .onStop(result => {
        this.state = newState
        this.tween = null
      })

    return this.tween
  }

  willUpdate({ tickerState }: EntityUpdateContext) {
    this.group.update(tickerState.currentTimestamp)
  }
}
