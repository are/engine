import { AnimationFrameTicker, Engine, vec2 } from '../../src'
import { GridScene } from './scenes/GridScene'

const canvas = document.querySelector<HTMLCanvasElement>('#app')

const engine = new Engine({
  canvas: canvas,
  size: vec2(window.innerWidth, window.innerHeight),
  ticker: new AnimationFrameTicker(),
})

engine.registerScene('grid', GridScene)

engine.start()

engine.pushScene('grid')
