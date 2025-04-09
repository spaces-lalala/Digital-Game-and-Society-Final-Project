import { player, updatePlayerPosition } from './player.js';
import { elements, detectCollision } from './elements.js';
import { projectiles, updateProjectiles } from './projectiles.js';
import { particles, updateParticles } from './particles.js';
import { keysPressed } from './controls.js';

let canvas, ctx;

export function setupCanvas() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = document.getElementById("left-panel").offsetWidth;
    canvas.height = window.innerHeight;
}

export function getCanvas() {
    return { canvas, ctx };
}

export function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

export function drawElements() {
    elements.forEach(el => {
        ctx.fillStyle = el.color;
        ctx.beginPath();
        ctx.arc(el.x, el.y, el.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw the element symbol at the center
        ctx.fillStyle = "#000";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(el.symbol, el.x, el.y);
    });
}

export function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw game elements
    drawPlayer();
    drawElements();
    updateProjectiles();
    updateParticles();
    
    // Game mechanics
    detectCollision();
    updatePlayerPosition();
    
    requestAnimationFrame(gameLoop);
}
