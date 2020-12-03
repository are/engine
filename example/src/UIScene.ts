import { Scene } from '../../src/scene/Scene'
import { TextEntity } from '../../src/entity/TextEntity'
import { vec2 } from '../../src/math/Vector2'

export class UIScene extends Scene {
  willMount() {
    this.add(
      new TextEntity({
        text: 'Hello world!',
        position: vec2(100, 100),
        style: 'black',
        font: '16px monospace',
      })
    )
  }
}
