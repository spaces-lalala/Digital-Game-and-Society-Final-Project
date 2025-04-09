import { player, damagePlayer } from './player.js';
import { getCanvas } from './render.js';
import { updateInventory } from './ui.js';
import { elementData } from '../data/elements.js';

export const elements = [];
export let collectedElements = {};

export function generateRandomElement() {
    const { canvas } = getCanvas();
    const elementTypes = ["lightblue", "aliceblue", "gray", "black", "green"];
    const elementSymbols = { "lightblue": "H", "aliceblue": "O", "gray": "C", "black": "X", "green": "N" };
    const color = elementTypes[Math.floor(Math.random() * elementTypes.length)];
    
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 15,
        color: color,
        symbol: elementSymbols[color],
    };
}

export function initElementGeneration() {
    // Initialize with some elements
    for (let i = 0; i < 10; i++) {
        elements.push(generateRandomElement());
    }
    
    // Generate new elements over time
    setInterval(() => {
        elements.push(generateRandomElement());
    }, 4000);
}

export function detectCollision() {
    elements.forEach((el, index) => {
        if (
            player.x < el.x + el.size &&
            player.x + player.size > el.x &&
            player.y < el.y + el.size &&
            player.y + player.size > el.y
        ) {
            if (el.color === "black") {
                damagePlayer(20);
            } else {
                if (!collectedElements[el.color]) {
                    collectedElements[el.color] = 0;
                }
                collectedElements[el.color] += 1;
                updateInventory();
            }
            elements.splice(index, 1);
        }
    });
}

export function useElement(color, amount) {
    if (collectedElements[color] >= amount) {
        collectedElements[color] -= amount;
        if (collectedElements[color] <= 0) {
            delete collectedElements[color];
        }
        updateInventory();
        return true;
    }
    return false;
}
