import { collectedElements, useElement } from './elements.js';
import { createLightEffect, createIceEffect } from './particles.js';
import { player, healPlayer } from './player.js';
import { updateInventory, showGrandmaDialog } from './ui.js';
import { keysPressed } from './controls.js';
import { compoundData, compoundDetails } from '../data/compounds.js';

export const maxCompounds = 2;
export let craftedCompoundsList = [];

export function canCraftCompound(compoundName) {
    const formula = compoundData[compoundName].formula;
    const elementSymbols = { "lightblue": "H", "aliceblue": "O", "gray": "C", "black": "X", "green": "N" };
    
    // Check if we have all required elements
    for (const [element, required] of Object.entries(formula)) {
        const colorKey = Object.entries(elementSymbols).find(([_, symbol]) => symbol === element)?.[0];
        const available = collectedElements[colorKey] || 0;
        
        if (available < required) {
            return false;
        }
    }
    
    return true;
}

export function craftCompound(compoundName) {
    if (craftedCompoundsList.length >= maxCompounds) {
        return false;
    }
    
    if (!canCraftCompound(compoundName)) {
        return false;
    }
    
    const formula = compoundData[compoundName].formula;
    const elementSymbols = { "lightblue": "H", "aliceblue": "O", "gray": "C", "black": "X", "green": "N" };
    
    // Consume elements
    for (const [element, required] of Object.entries(formula)) {
        const colorKey = Object.entries(elementSymbols).find(([_, symbol]) => symbol === element)[0];
        useElement(colorKey, required);
    }
    
    // Add compound to list
    craftedCompoundsList.push(compoundName);
    return true;
}

export function useCompound(compound) {
    switch (compound) {
        case "二氧化碳":
            Co2SkillEffect(player.x, player.y);
            break;
        case "醋酸":
            AcidSkillEffect(player.x, player.y);
            break;
        case "蔗糖":
            healPlayer(40);
            createLightEffect(player.x, player.y);
            break;
        case "葡萄糖":
            healPlayer(20);
            createLightEffect(player.x, player.y);
            break;
        case "碳盾":
            createIceEffect(player.x, player.y);
            healPlayer(20);
            break;
        case "一氧化二氮":
            createIceEffect(player.x, player.y);
            const boostedSpeed = 6;
            const duration = 3000;

            const speedBoostInterval = setInterval(() => {
                if (keysPressed["ArrowRight"]) player.x += boostedSpeed;
                if (keysPressed["ArrowLeft"]) player.x -= boostedSpeed;
                if (keysPressed["ArrowUp"]) player.y -= boostedSpeed;
                if (keysPressed["ArrowDown"]) player.y += boostedSpeed;
            }, 16);

            setTimeout(() => {
                clearInterval(speedBoostInterval);
            }, duration);
            break;
        default:
            alert("未知的化合物效果");
    }
    
    // Remove compound from list
    craftedCompoundsList = craftedCompoundsList.filter(c => c !== compound);
    updateInventory();
}

// Special effects for compounds
function AcidSkillEffect(x, y) {
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: x + (Math.random() - 0.5) * 80,
            y: y + (Math.random() - 0.5) * 80,
            size: Math.random() * 300 + 4,
            color: `rgba(0, 128, 0, ${Math.random() * 0.8 + 0.5})`,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 80,
            alpha: 1,
        });
    }
}

function Co2SkillEffect(x, y) {
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: x,
            y: y,
            size: Math.random() * 300 + 2,
            color: `rgba(128, 128, 128, ${Math.random() * 0.8 + 0.5})`,
            vx: Math.random() * 8 - 4,
            vy: Math.random() * 8 - 4,
            life: 30,
            alpha: 1,
        });
    }
}
