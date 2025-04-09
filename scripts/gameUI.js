// 用戶界面模組 - 管理遊戲的界面元素

// 更新生命值條
Game.updateHealthBar = function() {
    const healthBar = document.getElementById("health-bar");
    healthBar.style.width = `${this.player.health}%`;

    if (this.player.health > 50) {
        healthBar.style.backgroundColor = "#0f0";
    } else if (this.player.health > 20) {
        healthBar.style.backgroundColor = "#ffcc00";
    } else {
        healthBar.style.backgroundColor = "#f00";
    }
    
    // 檢查血量是否歸零
    if (this.player.health <= 0) {
        alert("遊戲結束！血量歸零。");
        location.reload(); // 自動刷新頁面，重新開始遊戲
    }
};

// 更新物品欄
Game.updateInventory = function() {
    const elementsList = document.getElementById("elementsList");
    const craftedList = document.getElementById("craftedList");
    const compoundCount = document.getElementById("compoundCount");

    // 清空當前內容
    elementsList.innerHTML = "";
    craftedList.innerHTML = "";
    compoundCount.textContent = `${this.craftedCompoundsList.length}/${this.maxCompounds}`;

    // 更新收集的元素
    for (const [color, count] of Object.entries(this.collectedElements)) {
        const symbol = this.elementSymbols[color] || "?";

        const elementItem = document.createElement("div");
        elementItem.className = "element-item";
        elementItem.style.display = "flex";
        elementItem.style.justifyContent = "space-between";
        elementItem.style.alignItems = "center";
        elementItem.style.marginBottom = "5px";

        elementItem.innerHTML = `<div>${symbol} x${count}</div>`;
        elementsList.appendChild(elementItem);
    }

    // 更新已製作的化合物
    this.craftedCompoundsList.forEach(compound => {
        const compoundItem = document.createElement("div");
        compoundItem.className = "compound-item";
        compoundItem.style.display = "flex";
        compoundItem.style.justifyContent = "space-between";
        compoundItem.style.alignItems = "center";
        compoundItem.style.marginBottom = "10px";

        // 化合物名稱
        const compoundName = document.createElement("div");
        compoundName.textContent = compound;
        compoundItem.appendChild(compoundName);

        // 按鈕容器
        const buttonGroup = document.createElement("div");
        buttonGroup.style.display = "flex";
        buttonGroup.style.gap = "5px";

        // 使用按鈕
        const useButton = document.createElement("button");
        useButton.textContent = "使用";
        useButton.className = "use-compound";
        useButton.style.backgroundColor = "#4CAF50";
        useButton.style.color = "white";
        useButton.style.border = "none";
        useButton.style.padding = "5px 10px";
        useButton.style.borderRadius = "5px";
        useButton.style.cursor = "pointer";
        
        // 綁定使用按鈕事件
        useButton.addEventListener("click", () => {
            this.useCompound(compound);
        });

        // 刪除按鈕
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "刪除";
        deleteButton.className = "delete-compound";
        deleteButton.style.backgroundColor = "#f44336";
        deleteButton.style.color = "white";
        deleteButton.style.border = "none";
        deleteButton.style.padding = "5px 10px";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.cursor = "pointer";
        
        // 綁定刪除按鈕事件
        deleteButton.addEventListener("click", () => {
            this.craftedCompoundsList = this.craftedCompoundsList.filter(c => c !== compound);
            this.updateInventory();
        });

        // 添加按鈕到容器
        buttonGroup.appendChild(useButton);
        buttonGroup.appendChild(deleteButton);
        compoundItem.appendChild(buttonGroup);
        craftedList.appendChild(compoundItem);
    });
};

// 設置化合按鈕
Game.setupCombineButton = function() {
    const combineButton = document.getElementById("combine-button");
    if (!combineButton) return;
    
    // 創建模態視窗元素（如果不存在）
    if (!document.getElementById("modal-overlay")) {
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
    }
    
    if (!document.getElementById("combine-modal")) {
        const modal = document.createElement("div");
        modal.id = "combine-modal";
        modal.style.display = "none";
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.width = "300px";
        modal.style.background = "white";
        modal.style.borderRadius = "10px";
        modal.style.padding = "20px";
        modal.style.zIndex = "1000";
        
        modal.innerHTML = `
            <h3>化合物製作</h3>
            <div id="current-elements"></div>
            <div id="compound-buttons"></div>
            <button id="close-modal">關閉</button>
        `;
        
        document.body.appendChild(modal);
    }
    
    // 綁定事件
    const modal = document.getElementById("combine-modal");
    const overlay = document.getElementById("modal-overlay");
    const closeBtn = document.getElementById("close-modal");
    
    combineButton.addEventListener("click", () => {
        this.updateCombineModal();
        modal.style.display = "block";
        overlay.style.display = "block";
    });
    
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        overlay.style.display = "none";
    });
    
    overlay.addEventListener("click", () => {
        modal.style.display = "none";
        overlay.style.display = "none";
    });
};

// 更新化合模態視窗內容
Game.updateCombineModal = function() {
    const currentElements = document.getElementById("current-elements");
    const compoundButtons = document.getElementById("compound-buttons");
    
    // 顯示當前元素
    currentElements.innerHTML = "<h4>擁有的元素:</h4>";
    for (const [color, count] of Object.entries(this.collectedElements)) {
        const symbol = this.elementSymbols[color];
        currentElements.innerHTML += `<p>${symbol}: ${count}</p>`;
    }
    
    // 清空按鈕區域
    compoundButtons.innerHTML = "";
    
    // 動態生成按鈕
    Object.entries(this.compounds).forEach(([name, { formula }]) => {
        const button = document.createElement("button");
        button.textContent = name;
        button.style.margin = "5px";
        button.style.padding = "8px 15px";
        button.style.borderRadius = "5px";
        button.style.border = "none";
        button.style.cursor = "pointer";
        
        // 檢查是否有足夠的元素製作
        let canMake = true;
        const missingElements = [];
        
        Object.entries(formula).forEach(([element, required]) => {
            // 找到對應顏色的元素
            const colorKey = Object.entries(this.elementSymbols).find(([_, symbol]) => symbol === element)?.[0];
            const available = this.collectedElements[colorKey] || 0;
            
            if (available < required) {
                canMake = false;
                missingElements.push(`${element}: 需要${required}個，現有${available}個`);
            }
        });
        
        if (canMake) {
            button.style.backgroundColor = "#4CAF50";
            button.style.color = "white";
            
            // 點擊事件
            button.addEventListener("click", () => {
                this.craftCompound(name);
                
                // 關閉模態視窗
                document.getElementById("combine-modal").style.display = "none";
                document.getElementById("modal-overlay").style.display = "none";
            });
        } else {
            button.style.backgroundColor = "#ccc";
            button.style.color = "white";
            button.title = `無法製作，缺少元素：\n${missingElements.join('\n')}`;
        }
        
        compoundButtons.appendChild(button);
    });
};

// 顯示老婆婆對話
Game.showGrandmaDialog = function(compound) {
    const stories = this.compoundDetails[compound].story;
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

    const updateDialog = () => {
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
            // 對話結束，清除對話框
            dialogBox.remove();
        }
    };

    document.body.appendChild(dialogBox);
    updateDialog();
};

// 設置速度按鈕
Game.setupSpeedButton = function() {
    const speedButton = document.getElementById("speed-button");
    if (!speedButton) return;
    
    // 創建模態視窗元素（如果不存在）
    if (!document.getElementById("speed-modal")) {
        const modal = document.createElement("div");
        modal.id = "speed-modal";
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.padding = "20px";
        modal.style.borderRadius = "10px";
        modal.style.backgroundColor = "white";
        modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        modal.style.display = "none";
        modal.style.zIndex = "1000";
        
        modal.innerHTML = `
            <h3>選擇移動速度</h3>
            <button class="speed-option" data-speed="slow">慢速</button>
            <button class="speed-option" data-speed="medium">中速</button>
            <button class="speed-option" data-speed="fast">快速</button>
        `;
        
        document.body.appendChild(modal);
    }
    
    const overlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("speed-modal");
    
    // 綁定事件
    speedButton.addEventListener("click", () => {
        modal.style.display = "block";
        overlay.style.display = "block";
    });
    
    // 速度選項事件
    document.querySelectorAll(".speed-option").forEach(option => {
        option.addEventListener("click", (e) => {
            const speed = e.target.getAttribute("data-speed");
            switch (speed) {
                case "fast":
                    this.player.speed = 4;
                    break;
                case "medium":
                    this.player.speed = 3;
                    break;
                case "slow":
                    this.player.speed = 2;
                    break;
            }
            modal.style.display = "none";
            overlay.style.display = "none";
        });
    });
};

// 設置圖鑑按鈕
Game.setupEncyclopediaButton = function() {
    // TODO: 實現圖鑑功能
    const encyclopediaButton = document.getElementById("encyclopedia-button");
    if (!encyclopediaButton) return;
    
    // 創建圖鑑模態視窗（如果不存在）
    if (!document.getElementById("encyclopedia-modal")) {
        const modal = document.createElement("div");
        modal.id = "encyclopedia-modal";
        modal.style.display = "none";
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.width = "400px";
        modal.style.background = "white";
        modal.style.borderRadius = "10px";
        modal.style.padding = "20px";
        modal.style.zIndex = "1001";
        
        modal.innerHTML = `
            <h3 id="modal-title">圖鑑</h3>
            <div id="modal-content"></div>
            <div class="encyclopedia-buttons">
                <button id="back-button">返回</button>
                <button id="close-encyclopedia">關閉</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    const overlay = document.getElementById("modal-overlay");
    const modal = document.getElementById("encyclopedia-modal");
    const closeBtn = document.getElementById("close-encyclopedia");
    const backBtn = document.getElementById("back-button");
    
    // 綁定事件
    encyclopediaButton.addEventListener("click", () => {
        this.showEncyclopediaMainMenu();
        modal.style.display = "block";
        overlay.style.display = "block";
    });
    
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        overlay.style.display = "none";
    });
    
    backBtn.addEventListener("click", () => {
        const currentTitle = document.getElementById("modal-title").textContent;
        
        if (currentTitle === "化合物分類" || currentTitle === "元素") {
            this.showEncyclopediaMainMenu();
        } else if (Object.keys(this.encyclopediaData.compoundsData).includes(currentTitle)) {
            this.showCompoundCategories();
        }
    });
};

// 儲存圖鑑數據
Game.encyclopediaData = {
    elementsData: {
        "C": "非金屬元素，可形成多樣的化學鍵，構成有機分子的基礎。",
        "O": "極其活潑，能與大部分元素形成化合物，是地球大氣的主要成分。",
        "H": "最輕且最豐富的元素，可形成水和有機分子。",
        "N": "大氣中含量高，能形成高能量化合物。"
    },
    compoundsData: {
        "一般化合物": [
            {
                name: "二氧化碳（CO₂）",
                damage: 5,
                effect: "生成「窒息區域」，令敵人在該區域內每秒減少2點血量，持續5秒。",
                elements: { "碳（C）": 1, "氧（O）": 2 }
            },
            {
                name: "醋酸（CH₃COOH）",
                damage: 15,
                effect: "生成「腐蝕區域」，每秒10點傷害，持續3秒。",
                elements: { "碳（C）": 2, "氫（H）": 4, "氧（O）": 2 }
            }
        ],
        "治療化合物": [
            {
                name: "葡萄糖（C₆H₁₂O₆）",
                restore: 20,
                effect: "適合作為基礎治療物品。",
                elements: { "碳（C）": 6, "氫（H）": 12, "氧（O）": 6 }
            },
            {
                name: "蔗糖（C₁₂H₂₂O₁₁）",
                restore: 40,
                effect: "提供5秒的加速效果。",
                elements: { "單醣": 2 }
            }
        ],
        "護盾化合物": [
            {
                name: "碳盾",
                defense: 5,
                effect: "適合新手使用。",
                elements: { "碳（C）": 3 }
            }
        ]
    }
};

// 顯示圖鑑主選單
Game.showEncyclopediaMainMenu = function() {
    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");
    const backButton = document.getElementById("back-button");
    
    modalTitle.textContent = "圖鑑";
    backButton.style.display = "none";
    modalContent.innerHTML = `
        <button id="elements-button">元素</button>
        <button id="compounds-button">化合物</button>
    `;
    
    document.getElementById("elements-button").addEventListener("click", () => {
        this.showEncyclopediaElements();
    });
    
    document.getElementById("compounds-button").addEventListener("click", () => {
        this.showCompoundCategories();
    });
};

// 顯示元素列表
Game.showEncyclopediaElements = function() {
    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");
    const backButton = document.getElementById("back-button");
    
    modalTitle.textContent = "元素";
    backButton.style.display = "block";
    modalContent.innerHTML = "<h4>選擇元素查看詳情</h4>";
    
    Object.entries(this.encyclopediaData.elementsData).forEach(([symbol, description]) => {
        const button = document.createElement("button");
        button.textContent = symbol;
        button.style.margin = "5px";
        button.addEventListener("click", () => {
            modalContent.innerHTML = `<h4>${symbol}</h4><p>${description}</p>`;
        });
        modalContent.appendChild(button);
    });
};

// 顯示化合物分類
Game.showCompoundCategories = function() {
    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");
    const backButton = document.getElementById("back-button");
    
    modalTitle.textContent = "化合物分類";
    backButton.style.display = "block";
    modalContent.innerHTML = "";
    
    Object.keys(this.encyclopediaData.compoundsData).forEach(category => {
        const button = document.createElement("button");
        button.textContent = category;
        button.dataset.category = category;
        button.addEventListener("click", () => {
            this.showCompoundDetails(category);
        });
        modalContent.appendChild(button);
    });
};

// 顯示化合物詳細內容
Game.showCompoundDetails = function(category) {
    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");
    
    modalTitle.textContent = category;
    modalContent.innerHTML = "";
    
    this.encyclopediaData.compoundsData[category].forEach(compound => {
        const div = document.createElement("div");
        div.style.marginBottom = "10px";
        div.style.textAlign = "left";
        
        div.innerHTML = `
            <h4>${compound.name}</h4>
            <p>傷害值：${compound.damage || compound.restore || compound.defense || "—"}</p>
            <p>效果：${compound.effect}</p>
            <p>所需元素：${Object.entries(compound.elements)
                .map(([element, count]) => `${element} ×${count}`)
                .join(", ")}</p>
        `;
        
        modalContent.appendChild(div);
    });
};
