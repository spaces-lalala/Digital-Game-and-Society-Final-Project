import { setPlayerSpeed } from './player.js';

export const keysPressed = {};

export function setupControls() {
    // Keyboard controls
    document.addEventListener("keydown", (e) => {
        keysPressed[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
        keysPressed[e.key] = false;
    });
    
    // Speed control
    setupSpeedControls();
}

function setupSpeedControls() {
    const speedButton = document.getElementById("speed-button");
    const speedModal = document.getElementById("speed-modal") || createSpeedModal();
    const speedOverlay = document.getElementById("speed-overlay") || document.getElementById("modal-overlay");
    
    speedButton.addEventListener("click", () => {
        speedModal.style.display = "block";
        speedOverlay.style.display = "block";
    });
    
    speedOverlay.addEventListener("click", () => {
        speedModal.style.display = "none";
        speedOverlay.style.display = "none";
    });
    
    document.querySelectorAll(".speed-option").forEach(option => {
        option.addEventListener("click", (e) => {
            const speed = e.target.getAttribute("data-speed");
            switch (speed) {
                case "fast":
                    setPlayerSpeed(4);
                    break;
                case "medium":
                    setPlayerSpeed(3);
                    break;
                case "slow":
                    setPlayerSpeed(2);
                    break;
            }
            speedModal.style.display = "none";
            speedOverlay.style.display = "none";
        });
    });
}

function createSpeedModal() {
    const modal = document.createElement("div");
    modal.id = "speed-modal";
    modal.className = "modal";
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        display: none;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <h3>選擇移動速度</h3>
        <button class="speed-option" data-speed="slow">慢速</button>
        <button class="speed-option" data-speed="medium">中速</button>
        <button class="speed-option" data-speed="fast">快速</button>
    `;
    
    document.body.appendChild(modal);
    return modal;
}
