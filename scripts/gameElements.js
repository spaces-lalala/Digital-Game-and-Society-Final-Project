// 元素處理模組 - 管理遊戲中的元素生成、收集和使用

// 生成隨機元素
Game.generateRandomElement = function() {
    const elementTypes = ["lightblue", "aliceblue", "gray", "black", "green"];
    const color = elementTypes[Math.floor(Math.random() * elementTypes.length)];
    
    return {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: 15,
        color: color,
        symbol: this.elementSymbols[color],
    };
};

// 初始化元素生成
Game.initElements = function() {
    // 初始化元素
    for (let i = 0; i < 10; i++) {
        this.elements.push(this.generateRandomElement());
    }
    
    // 設置定時器生成新元素
    setInterval(() => {
        this.elements.push(this.generateRandomElement());
    }, 4000);
};

// 繪製元素
Game.drawElements = function() {
    this.elements.forEach(el => {
        this.ctx.fillStyle = el.color;
        this.ctx.beginPath();
        this.ctx.arc(el.x, el.y, el.size, 0, Math.PI * 2);
        this.ctx.fill();

        // 在元素中心繪製元素符號
        this.ctx.fillStyle = "#000";
        this.ctx.font = "bold 12px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(el.symbol, el.x, el.y);
    });
};

// 碰撞檢測
Game.detectCollision = function() {
    for (let i = this.elements.length - 1; i >= 0; i--) {
        const el = this.elements[i];
        if (
            this.player.x < el.x + el.size &&
            this.player.x + this.player.size > el.x &&
            this.player.y < el.y + el.size &&
            this.player.y + this.player.size > el.y
        ) {
            if (el.color === "black") {
                this.player.health -= 20;
                if (this.player.health < 0) this.player.health = 0;
                this.updateHealthBar();
            } else {
                if (!this.collectedElements[el.color]) {
                    this.collectedElements[el.color] = 0;
                }
                this.collectedElements[el.color] += 1;
                this.updateInventory();
            }
            this.elements.splice(i, 1);
        }
    }
};

// 使用元素
Game.useElement = function(color, amount) {
    if (this.collectedElements[color] >= amount) {
        this.collectedElements[color] -= amount;
        if (this.collectedElements[color] <= 0) {
            delete this.collectedElements[color];
        }
        this.updateInventory();
        return true;
    }
    return false;
};
