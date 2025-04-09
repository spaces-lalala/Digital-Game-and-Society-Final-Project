import { setupCanvas, gameLoop } from './modules/render.js';
import { setupPlayer } from './modules/player.js';
import { initElementGeneration } from './modules/elements.js';
import { setupUserInterface } from './modules/ui.js';
import { setupControls } from './modules/controls.js';

// Get player name from URL
const urlParams = new URLSearchParams(window.location.search);
const playerName = urlParams.get('name') || '未命名玩家';

// Initialize game components
document.addEventListener('DOMContentLoaded', () => {
    setupCanvas();
    setupPlayer(playerName);
    setupUserInterface();
    setupControls();
    initElementGeneration();
    gameLoop();
});


