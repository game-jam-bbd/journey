import { Scene } from 'three/src/scenes/Scene.js'
import { GLTFLoader, Sky, Water } from 'three/examples/jsm/Addons.js'
import { DirectionalLight } from 'three/src/lights/DirectionalLight.js'
import { MathUtils } from 'three/src/math/MathUtils.js'
import { initializeGame } from './init.js'
import { setupControls } from '../engine/controls.js'
import { createEnemy, createCoin, createDolphin } from '../engine/createObstacle.js'

import { PlaneGeometry, PMREMGenerator, RepeatWrapping, TextureLoader, Vector3 } from 'three'


export default class Game {
  scene;
  camera;
  renderer;
  controls;
  dolphin;
  ocean;
  audioManager;

  constructor () {
    this.gameInit = initializeGame();
    this._initializeScene()
  }

  update (time) {
    if (this.ship) {
      this.ship.position.z += 0.01
      this.camera.lookAt(this.ship.position)
    }
    this.water.material.uniforms['time'].value += 1 / (60 * 10)
    this.camera.position.z += 0.01

    performance.now()

    if (this.ship) {
      time = performance.now() * 0.001
      this.ship.position.y = Math.sin(2 * time) * 0.1 - 0.25
      // this.ship.rotation.x = time * 0.3
      // this.ship.rotation.z = time * 0.3
    }

    this._checkCollisions()
    this._updateStatistics()
  }

  _keydown (event) {
    switch (event.key) {
      case 'ArrowLeft':
        this.speedX = -1
        break
      case 'ArrowRight':
        this.speedX = 1
        break

      default:
        return
    }
  }

  _keyup () {
    this.speedX = 0
  }

  _updatePlane () {}

  _checkCollisions () {}
  _boxCollision = ({ box1, box2 }) => {
    const xCollision = box1.right >= box2.left && box1.left <= box2.right;
    const yCollision = box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;
    const zCollision = box1.front >= box2.back && box1.back <= box2.front;
    return xCollision && yCollision && zCollision;
  }

  _coinCollision = ({ box, coin }) => {
    const xCollision = box.right >= coin.position.x && box.left <= coin.position.x;
    const yCollision = box.bottom + box.velocity.y <= coin.position.y && box.top >= coin.position.y;
    const zCollision = box.front >= coin.position.z && box.back <= coin.position.z;
    return xCollision && yCollision && zCollision;
  }

  _updateStatistics () {}

  _endGame () {}


  _initializeScene = async () => {
    this.scene = this.gameInit.scene;
    this.camera = this.gameInit.camera;
    this.renderer = this.gameInit.renderer;
    this.controls = this.gameInit.controls;
    this.dolphin = this.gameInit.dolphin;
    this.ocean = this.gameInit.ocean;
    this.audioManager = this.gameInit.audioManager;

    setupControls();
    
    await this.audioManager.loadBackgroundMusic("../../assets/music/m4.mpeg");
    this.audioManager.playBackgroundMusic();
    // this._createSun(this.scene, this.renderer)
    // this.scene.add(cube)
  }
}