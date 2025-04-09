import { player } from './player.js';
import { getCanvas } from './render.js';
import { createFlameEffect, createPoisonEffect, createLightEffect, createIceEffect } from './particles.js';
import { collectedElements, useElement } from './elements.js';

export const projectiles = [];

export function shootProjectile(targetX, targetY) {
    const colors = Object.keys(collectedElements);
    if (colors.length === 0) return;

    const color = colors[0];
    if (!useElement(color, 1)) return;

    const dx = targetX - (player.x + player.size / 2);
    const dy = targetY - (player.y + player.size / 2);
    const length = Math.sqrt(dx * dx + dy * dy);

    projectiles.push({
        x: player.x + player.size / 2,
        y: player.y + player.size / 2,
        size: 10,
        color: color,
        vx: (dx / length) * 5,
        vy: (dy / length) * 5,
    });

    // Add particle effects based on element type
    switch (color) {
        case "lightblue":
            createFlameEffect(player.x + player.size / 2, player.y + player.size / 2);
            break;
        case "aliceblue":
            createPoisonEffect(player.x + player.size / 2, player.y + player.size / 2);
            break;
        case "gray":
            createLightEffect(player.x + player.size / 2, player.y + player.size / 2);
            break;
        case "green":
            createIceEffect(player.x + player.size / 2, player.y + player.size / 2);
            break;
    }
}

export function updateProjectiles() {
    const { canvas, ctx } = getCanvas();
    
    projectiles.forEach((proj, index) => {
        ctx.fillStyle = proj.color;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, proj.size, 0, Math.PI * 2);
        ctx.fill();

        proj.x += proj.vx;
        proj.y += proj.vy;

        if (
            proj.x < 0 || proj.x > canvas.width ||
            proj.y < 0 || proj.y > canvas.height
        ) {
            projectiles.splice(index, 1);
        }
    });
}
