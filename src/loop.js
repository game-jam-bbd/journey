import { OrbitControls } from 'three/examples/jsm/Addons.js'

import { Game } from './init/game.js';
//import scene from './scene.js'
//import camera from './camera.js'
//import renderer from './renderer.js'


const game = new Game();
// const controls = new OrbitControls(game.camera, renderer.domElement)

game.renderer.setAnimationLoop(time => {
  game.update(time)
  // controls.update()
  renderer.render(game.scene, game.camera)
})

export default game