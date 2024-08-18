import { OrbitControls } from 'three/examples/jsm/Addons.js'

import Game from './types/Game'
import scene from './scene'
import camera from './camera'
import renderer from './renderer'


const game = new Game({ scene, camera, renderer })
// const controls = new OrbitControls(game.camera, renderer.domElement)

game.renderer.setAnimationLoop(time => {
  game.update(time)
  // controls.update()
  renderer.render(game.scene, game.camera)
})

export default game