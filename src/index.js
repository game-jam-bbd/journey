import { game, animate } from './loop.js'

document.body.appendChild(game.renderer.domElement);

// Start the animation loop
animate();

// Uncomment this line if you want to show the game overlay
// document.getElementById('gameOverlay').style.display = 'block';
