import Game from './init/Game.js';

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('guiStartButton');
    const guiContainer = document.getElementById('guiContainer');
    const gameContainer = document.getElementById('gameContainer');

    startButton.addEventListener('click', () => {
        guiContainer.style.display = 'none';
        gameContainer.style.display = 'block';

        const game = new Game();
        game.start();

        // Set up game control buttons
        document.getElementById('startButton').addEventListener('click', () => game.start());
        document.getElementById('pauseButton').addEventListener('click', () => game.pause());
        document.getElementById('resumeButton').addEventListener('click', () => game.resume());
        document.getElementById('stopButton').addEventListener('click', () => game.stop());
    });
});
