// 遊戲資料載入模組

// 由於我們使用命名空間而非模組，需要在HTML中確保這個檔案在gameEngine.js之後載入
Game.loadData = function() {
    // 這個函數可在Game.init中調用
    this.loadElementData();
};

Game.loadElementData = function() {
    // 使用fetch載入元素數據
    fetch('./data/elements.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('無法載入元素數據');
            }
            return response.json();
        })
        .then(data => {
            this.elementsData = data;
            console.log('元素數據載入成功');
        })
        .catch(error => {
            console.error('載入元素數據失敗:', error);
            // 提供備用數據，確保遊戲仍然可以運行
            this.elementsData = this.getDefaultElementData();
        });
};

Game.getDefaultElementData = function() {
    // 提供基本元素數據作為備用
    return {
        "H": {
            "name": "氫",
            "type": "氣體",
            "attack": 8,
            "defense": 2,
            "special": "易燃",
            "reaction": ["爆炸", "燃燒"]
        },
        "O": {
            "name": "氧",
            "type": "氣體",
            "attack": 5,
            "defense": 3,
            "special": "支持燃燒",
            "reaction": ["水生成", "氧化"]
        },
        "C": {
            "name": "碳",
            "type": "非金屬",
            "attack": 3,
            "defense": 7,
            "special": "多價鍵結",
            "reaction": ["燃燒", "有機化合物"]
        },
        "N": {
            "name": "氮",
            "type": "氣體",
            "attack": 4,
            "defense": 4,
            "special": "穩定分子",
            "reaction": ["氨", "氧化物"]
        }
    };
};
