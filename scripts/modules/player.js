import { keysPressed } from './controls.js';
import { updateHealthBar } from './ui.js';
import { getCanvas } from './render.js';

export const player = { 
    x: 100, 
    y: 100, 
    size: 20, 
    color: "blue", 
    health: 100,
    speed: 2
};

export function setupPlayer(playerName) {
    document.getElementById("player-name").textContent = playerName;
    updateHealthBar();
}

export function updatePlayerPosition() {
    const { canvas } = getCanvas();
    
    if (keysPressed["ArrowUp"] && player.y > 0) {
        player.y -= player.speed;
    }
    if (keysPressed["ArrowDown"] && player.y + player.size < canvas.height) {
        player.y += player.speed;
    }
    if (keysPressed["ArrowLeft"] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keysPressed["ArrowRight"] && player.x + player.size < canvas.width) {
        player.x += player.speed;
    }
}

export function setPlayerSpeed(speed) {
    player.speed = speed;
}

export function damagePlayer(amount) {
    player.health -= amount;
    if (player.health < 0) player.health = 0;
    updateHealthBar();
    
    if (player.health <= 0) {
        alert("遊戲結束！血量歸零。");
        location.reload();
    }
}

export function healPlayer(amount) {
    player.health = Math.min(100, player.health + amount);
    updateHealthBar();
}
