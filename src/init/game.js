import { DirectionalLight } from 'three/src/lights/DirectionalLight.js'
import { MathUtils } from 'three/src/math/MathUtils.js'
import { initializeGame } from './init.js'
import { setupControls, keys } from '../engine/controls.js'
import { createEnemy, createCoin } from '../engine/createObstacle.js'
import * as THREE from 'three';

export default class Game {
  scene;
  camera;
  renderer;
  controls;
  dolphin;
  ocean;
  //audioManager;

  constructor () {
    this.enemies = [];
    this.coins = [];
    this.ships = [];
    this.frames = 0;
    this.score = 0;
    this.spawnRate = 250;
    this.clock = new THREE.Clock();
    this.gameInit = initializeGame();
    this._initializeScene()
    this.isRunning = false;
    this.isPaused = false;
  }

  animate() {
    if (!this.renderer || !this.isRunning || this.isPaused) return;

    this.renderer.render(this.scene, this.camera);

    this.ocean.material.uniforms[ 'time' ].value += 0.006;

    this.camera.position.set(this.dolphin.position.x, this.dolphin.position.y+4, this.dolphin.position.z+8);

    // movement update
    this.dolphin.velocity.x = 0; // for every frame, reset velocity
    this.dolphin.velocity.z = 0;

    if (keys.a.pressed) this.dolphin.velocity.x = -0.1;
    else if (keys.d.pressed) this.dolphin.velocity.x = 0.1;

    if (keys.w.pressed) this.dolphin.velocity.z = -0.09;
    else if (keys.s.pressed) this.dolphin.velocity.z = 0.09;

    if (keys.space.pressed) this.dolphin.velocity.y = -0.75;

    const deltaTime = this.clock.getDelta();
    this.dolphin.update(deltaTime);
    const time = performance.now() * 0.001;

    this.enemies.forEach(enemy => {
        if (enemy.position.z >= 100) {
            this.scene.remove(enemy);
            const index = this.enemies.indexOf(enemy);
            this.enemies.splice(index, 1);
        }
        else {
            enemy.update();
            enemy.rotation.x = time * 0.25;
            enemy.rotation.z = time * 0.51;
            if (this._boxCollision({ box1: this.dolphin, box2: enemy })) {
                console.log("Game over chief!");
                this.stop();
            }
        }
    });

    this.coins.forEach(coin => {
        if (coin.position.z >= 100) {
            coin.removeCoin();
            const index = this.coins.indexOf(coin);
            this.coins.splice(index, 1);
        }
        else {
            coin.update();
            if (this._coinCollision({ box: this.dolphin, coin: coin  })) {
                console.log("Wabamba akfani");
                coin.removeCoin();
                const index = this.coins.indexOf(coin);
                this.incrementScore();
                this.coins.splice(index, 1);
            }
        }
    });

    if (this.frames % this.spawnRate === 0) {
        if (this.spawnRate > 10) this.spawnRate -= 10;

        if (Math.random() > 0.5 && Math.random() < 0.5) {
            const enemy = createEnemy();
            this.scene.add(enemy);
            this.enemies.push(enemy);
        }
        else {
            if(Math.random() > 0.5 && Math.random() < 0.5) {
                const coin = createCoin(this.scene);
                this.coins.push(coin);
            }
        }

    }
    this.frames++;
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.isPaused = false;
      this.clock.start();
      this.renderer.setAnimationLoop(() => this.animate());
      this.createScoreDisplay();
      this.audioManager.playBackgroundMusic();
    }
  }

  pause() {
    if (this.isRunning && !this.isPaused) {
      this.isPaused = true;
      console.log(this.dolphin.mesh);
      console.log(this.enemies[0]);
      this.clock.stop();
    }
  }

  resume() {
    if (this.isRunning && this.isPaused) {
      this.isPaused = false;
      
      this.clock.start();
    }
  }

  stop() {
    this.isRunning = false;
    this.isPaused = false;
    this.clock.stop();
    this.renderer.setAnimationLoop(null);

    this.enemies.forEach(enemy => {
      this.scene.remove(enemy);
    });

    this.coins.forEach(coin => {
      this.scene.remove(coin.mesh);
    });

    this.audioManager.stopBackgroundMusic();

    this.removeScoreDisplay();

    this.enemies = [];
    this.coins = [];
    this.ships = [];
    this.frames = 0;
    this.spawnRate = 250;
    this.score = 0;
    this.clock = new THREE.Clock();
  }

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

  _initializeScene = async () => {
    this.scene = this.gameInit.scene;
    this.camera = this.gameInit.camera;
    this.renderer = this.gameInit.renderer;
    this.controls = this.gameInit.controls;
    this.dolphin = this.gameInit.dolphin;
    this.ocean = this.gameInit.ocean;
    this.audioManager = this.gameInit.audioManager;

    await this.audioManager.loadBackgroundMusic("../../assets/music/m4.mpeg");
    this.audioManager.playBackgroundMusic();

    setupControls();
  }

  createScoreDisplay() {
    this.scoreElement = document.createElement('div');
    this.scoreElement.style.position = 'absolute';
    this.scoreElement.style.top = '10px';
    this.scoreElement.style.right = '10px';
    this.scoreElement.style.fontSize = '24px';
    this.scoreElement.style.color = 'white';
    this.updateScoreDisplay();
    document.body.appendChild(this.scoreElement);
  }

  updateScoreDisplay() {
    if (this.scoreElement) {
      this.scoreElement.textContent = `Score: ${this.score}`;
    }
  }

  removeScoreDisplay() {
    if (this.scoreElement && this.scoreElement.parentNode) {
      this.scoreElement.parentNode.removeChild(this.scoreElement);
    }
  }

  incrementScore() {
    this.score++;
    this.updateScoreDisplay();
  }
}