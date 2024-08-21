import { OrbitControls } from 'three/examples/jsm/Addons.js'
import Game from './init/Game.js';

const game = new Game();
const controls = new OrbitControls(game.camera, game.renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    
    // Update game logic
    game.animate();
    
    // Update controls
    controls.update();
    
    // Render the scene
    game.renderer.render(game.scene, game.camera);
}

export { game, animate };
