import { MathUtils } from 'three'
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera.js'


const camera = new PerspectiveCamera(
  75,
  window.innerWidth /window.innerHeight,
  0.1,
  1000
)

camera.position.set(0, 5, -10) 
camera.rotateX(MathUtils.degToRad(45))

export default camera