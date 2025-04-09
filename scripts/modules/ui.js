import { player } from './player.js';
import { collectedElements } from './elements.js';
import { craftedCompoundsList, canCraftCompound, craftCompound, useCompound, maxCompounds } from './compounds.js';
import { compoundData, compoundDetails } from '../data/compounds.js';
import { shootProjectile } from './projectiles.js';
import { getCanvas } from './render.js';
import { setPlayerSpeed } from './player.js';

export function setupUserInterface() {
    setupCombineButton();
    setupEncyclopediaButton();
    setupSpeedButton();
    setupCanvasEvents();
    updateInventory();
}

export function updateHealthBar() {
    const healthBar = document.getElementById("health-bar");
    healthBar.style.width = `${player.health}%`;

    if (player.health > 50) {
        healthBar.style.backgroundColor = "#0f0";
    } else if (player.health > 20) {
        healthBar.style.backgroundColor = "#ffcc00";
    } else {
        healthBar.style.backgroundColor = "#f00";
    }
}

export function updateInventory() {
    const elementsList = document.getElementById("elementsList");
    const craftedList = document.getElementById("craftedList");
    const compoundCount = document.getElementById("compoundCount");

    // Clear existing content
    elementsList.innerHTML = "";
    craftedList.innerHTML = "";
    compoundCount.textContent = `${craftedCompoundsList.length}/${maxCompounds}`;

    // Update collected elements
    const elementSymbols = { "lightblue": "H", "aliceblue": "O", "gray": "C", "black": "X", "green": "N" };
    for (const [color, count] of Object.entries(collectedElements)) {
        const symbol = elementSymbols[color] || "?";

        const elementItem = document.createElement("div");
        elementItem.className = "element-item";
        elementItem.style.display = "flex";
        elementItem.style.justifyContent = "space-between";
        elementItem.style.alignItems = "center";
        elementItem.style.marginBottom = "5px";

        elementItem.innerHTML = `<div>${symbol} x${count}</div>`;
        elementsList.appendChild(elementItem);
    }

    // Update crafted compounds
    craftedCompoundsList.forEach(compound => {
        const compoundItem = document.createElement("div");
        compoundItem.className = "compound-item";
        compoundItem.style.display = "flex";
        compoundItem.style.justifyContent = "space-between";
        compoundItem.style.alignItems = "center";
        compoundItem.style.marginBottom = "10px";

        // Compound name
        const compoundName = document.createElement("div");
        compoundName.textContent = compound;
        compoundItem.appendChild(compoundName);

        // Button container
        const buttonGroup = document.createElement("div");
        buttonGroup.style.display = "flex";
        buttonGroup.style.gap = "5px";

        // Use button
        const useButton = document.createElement("button");
        useButton.textContent = "使用";
        useButton.className = "use-compound";
        useButton.style.backgroundColor = "#4CAF50";
        useButton.style.color = "white";
        useButton.style.border = "none";
        useButton.style.padding = "5px 10px";
        useButton.style.borderRadius = "5px";
        useButton.style.cursor = "pointer";
        useButton.addEventListener("click", () => useCompound(compound));

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "刪除";
        deleteButton.className = "delete-compound";
        deleteButton.style.backgroundColor = "#f44336";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.padding = "5px 10px";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.cursor = "pointer";
        deleteButton.addEventListener("click", () => {
            craftedCompoundsList = craftedCompoundsList.filter(c => c !== compound);
            updateInventory();
        });

        // Add buttons to group
        buttonGroup.appendChild(useButton);
        buttonGroup.appendChild(deleteButton);
        compoundItem.appendChild(buttonGroup);
        craftedList.appendChild(compoundItem);
    });
}

function setupCanvasEvents() {
    const canvas = document.getElementById("gameCanvas");
    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        shootProjectile(mouseX, mouseY);
    });
}

function setupCombineButton() {
    const combineButton = document.getElementById("combine-button");
    const modalOverlay = document.getElementById("modal-overlay") || createModalOverlay();
    
    combineButton.addEventListener("click", () => {
        showCombineModal();
    });
}

function createModalOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "modal-overlay";
    overlay.style.display = "none";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "999";
    
    document.body.appendChild(overlay);
    overlay.addEventListener("click", () => {
        document.querySelectorAll(".modal").forEach(modal => {
            modal.style.display = "none";
        });
        overlay.style.display = "none";
    });
    
    return overlay;
}

// More UI functions for combine modal, encyclopedia, etc.
// ...

export function showGrandmaDialog(compound) {
    const stories = compoundDetails[compound].story;
    let currentDialog = 0;

    const dialogBox = document.createElement("div");
    dialogBox.style.cssText = `
        position: fixed;
        bottom: 20%;
        left: 50%;
        transform: translate(-50%, 0);
        background: rgba(255, 255, 255, 0.95);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
        z-index: 1002;
        width: 80%;
        max-width: 600px;
        text-align: center;
        font-family: '微軟正黑體', sans-serif;
    `;

    function updateDialog() {
        if (currentDialog < stories.length) {
            dialogBox.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <img src="./magic-grandma.png" alt="魔法老婆婆" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 15px;">
            <h3 style="margin: 0; color: #4a4a4a;">魔法老婆婆</h3>
        </div>
        <p style="font-size: 16px; line-height: 1.6; margin: 10px 0;">${stories[currentDialog]}</p>
        <button id="next-dialog" style="
            background: #4CAF50;
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        ">繼續</button>
    `;

            document.getElementById("next-dialog").onclick = () => {
                currentDialog++;
                updateDialog();
            };
        } else {
            dialogBox.remove();
            updateInventory();
        }
    }

    document.body.appendChild(dialogBox);
    updateDialog();
}

// Additional UI functions...
