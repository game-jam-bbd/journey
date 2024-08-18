import { MeshNormalMaterial } from 'three/src/materials/MeshNormalMaterial.js'
import { BoxGeometry } from 'three/src/geometries/BoxGeometry.js'
import { Mesh } from 'three/src/objects/Mesh.js'


const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshNormalMaterial()
const cube = new Mesh(geometry, material)

export default cube