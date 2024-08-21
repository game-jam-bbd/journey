import { game } from './loop.js'

 document.body.appendChild(game.renderer.domElement);

 document.getElementById('startButton').addEventListener('click', () => game.start());
 document.getElementById('pauseButton').addEventListener('click', () => game.pause());
 document.getElementById('resumeButton').addEventListener('click', () => game.resume());
 document.getElementById('stopButton').addEventListener('click', () => game.stop());

 // Start the game
 game.start();