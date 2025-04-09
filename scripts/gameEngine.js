// 遊戲引擎主文件 - 創建命名空間和基本結構

// 建立全局遊戲命名空間
const Game = {
    // 核心組件
    canvas: null,
    ctx: null,
    player: {
        x: 100,
        y: 100,
        size: 20,
        color: "blue", 
        health: 100,
        speed: 2
    },
    elements: [],
    projectiles: [],
    particles: [],
    collectedElements: {},
    craftedCompoundsList: [],
    keysPressed: {},
    
    // 配置
    maxCompounds: 2,
    elementSymbols: { "lightblue": "H", "aliceblue": "O", "gray": "C", "black": "X", "green": "N" },
    
    // 初始化函數
    init: function() {
        try {
            this.setupCanvas();
            this.setupPlayer();
            this.setupControls();
            this.setupUI();
            this.initElements();
            this.gameLoop();
        } catch (error) {
            console.error("遊戲初始化失敗:", error);
            alert("遊戲載入時發生錯誤，請刷新頁面重試。");
        }
    },
    
    // 畫布設置
    setupCanvas: function() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = document.getElementById("left-panel").offsetWidth;
        this.canvas.height = window.innerHeight;
        
        // 設置畫布點擊事件
        this.canvas.addEventListener("click", (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            this.shootProjectile(mouseX, mouseY);
        });
    },
    
    // 設置玩家
    setupPlayer: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const playerName = urlParams.get('name') || '未命名玩家';
        document.getElementById("player-name").textContent = playerName;
        this.updateHealthBar();
    },
    
    // 設置控制
    setupControls: function() {
        document.addEventListener("keydown", (e) => {
            this.keysPressed[e.key] = true;
        });
        
        document.addEventListener("keyup", (e) => {
            this.keysPressed[e.key] = false;
        });
        
        // 其他控制設置
        this.setupSpeedButton();
        this.setupCombineButton();
        this.setupEncyclopediaButton();
    },
    
    // 遊戲主循環
    gameLoop: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawPlayer();
        this.drawElements();
        this.drawProjectiles();
        this.drawParticles();
        this.detectCollision();
        this.updatePlayerPosition();
        
        requestAnimationFrame(() => this.gameLoop());
    },
    
    // 繪製玩家
    drawPlayer: function() {
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.size, this.player.size);
    },
    
    // 更新玩家位置
    updatePlayerPosition: function() {
        if (this.keysPressed["ArrowUp"] && this.player.y > 0) {
            this.player.y -= this.player.speed;
        }
        if (this.keysPressed["ArrowDown"] && this.player.y + this.player.size < this.canvas.height) {
            this.player.y += this.player.speed;
        }
        if (this.keysPressed["ArrowLeft"] && this.player.x > 0) {
            this.player.x -= this.player.speed;
        }
        if (this.keysPressed["ArrowRight"] && this.player.x + this.player.size < this.canvas.width) {
            this.player.x += this.player.speed;
        }
    },
    
    // 初始化用戶界面
    setupUI: function() {
        this.updateInventory();
    },
    
    // 資源清理函數
    cleanup: function() {
        // 清空不需要的數組
        this.elements = [];
        this.projectiles = [];
        this.particles = [];
        
        // 清除畫布內容
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        // 移除事件監聽器
        if (this.canvas) {
            this.canvas.removeEventListener("click", this.handleCanvasClick);
        }
        
        console.log("遊戲資源已清理");
    }
};

// 當頁面加載完成時初始化遊戲
window.addEventListener('DOMContentLoaded', function() {
    Game.init();
});
