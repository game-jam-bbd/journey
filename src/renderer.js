import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js'


const renderer = new WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

export default renderer