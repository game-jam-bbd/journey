import { Scene } from 'three/src/scenes/Scene.js'
import { GLTFLoader, Sky, Water } from 'three/examples/jsm/Addons.js'
import { DirectionalLight } from 'three/src/lights/DirectionalLight.js'
import { MathUtils } from 'three/src/math/MathUtils.js'

import { PlaneGeometry, PMREMGenerator, RepeatWrapping, TextureLoader, Vector3 } from 'three'


export default class Game {

  constructor ({ scene, camera, renderer }) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    document.addEventListener('keydown', this._keydown.bind(this))
    document.addEventListener('keyup', this._keyup.bind(this))

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

  _updateStatistics () {}

  _endGame () {}

  _createShip (scene) {
    const loader = new GLTFLoader()

    loader.load(
      '/assets/ship.glb',
      glb => {
        this.ship = glb.scene
        this.ship.position.set(0, 0, 0)
        this.ship.scale.set(1, 1, 1)

        scene.add(this.ship)
      }
    )
  }

  _createOcean (scene) {
    // const geometry = new PlaneGeometry(10000, 10000)
    // const water = new Water(
    //   geometry,
    //   {
    //     textureWidth: 512,
    //     textureHeight: 512,
    //   }
    // )
    const waterGeometry = new PlaneGeometry(10000, 10000)
    this.water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new TextureLoader().load('/assets/textures/water.jpg', texture => {
          texture.wrapS = texture.wrapT = RepeatWrapping
        }),
        alpha: 1.0,
        sunDirection: new Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
      }
    )
    this.water.rotation.x =- Math.PI / 2
    scene.add(this.water)
  }

  _createSky (scene, renderer) {
    const sky = new Sky()
    const sun = new Vector3()

		sky.scale.setScalar(10000)
		scene.add(sky)

    sky.material.uniforms['turbidity'].value = 10
    sky.material.uniforms['rayleigh'].value = 2
    sky.material.uniforms['mieCoefficient'].value = 0.005
    sky.material.uniforms['mieDirectionalG'].value = 0.8

    const parameters = {
      elevation: 2,
      azimuth: 180,
    }

    console.log('RENDERER', renderer)
    const pmremGenerator = new PMREMGenerator(renderer)
    const environment = new Scene()
    const phi = MathUtils.degToRad(90 - parameters.elevation)
		const theta = MathUtils.degToRad(parameters.azimuth)

		sun.setFromSphericalCoords(1, phi, theta)

		sky.material.uniforms['sunPosition'].value.copy(sun)
		this.water.material.uniforms['sunDirection'].value.copy(sun).normalize()

		environment.add(sky)
		scene.add(sky)

		scene.environment = pmremGenerator.fromScene(environment).texture
  }

  _createLight (scene) {
    this.light = new DirectionalLight(0xffffff, 1)
    scene.add(this.light)
  }

  _initializeScene () {
    this._createShip(this.scene)
    this._createOcean(this.scene)
    this._createLight(this.scene)
    this._createSky(this.scene, this.renderer)
    // this._createSun(this.scene, this.renderer)
    // this.scene.add(cube)
  }
}