import { OrbitControls } from 'three/examples/jsm/Addons.js'

import Game from './init/Game.js';
//import scene from './scene.js'
//import camera from './camera.js'
//import renderer from './renderer.js'


const game = new Game();
const controls = new OrbitControls(game.camera, game.renderer.domElement);

export default game
