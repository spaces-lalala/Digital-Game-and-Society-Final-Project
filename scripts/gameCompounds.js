// 化合物模組 - 管理化合物的合成和使用

// 化合物數據
Game.compounds = {
    "葡萄糖": { formula: { "C": 6, "H": 12, "O": 6 } },
    "蔗糖": { formula: { "C": 12, "H": 22, "O": 11 } },
    "碳盾": { formula: { "C": 3 } },
    "二氧化碳": { formula: { "C": 1, "O": 2 } },
    "醋酸": { formula: { "C": 2, "H": 4, "O": 2 } },
    "一氧化二氮": { formula: { "O": 1, "N": 2 } }
};

// 化合物詳細信息
Game.compoundDetails = {
    "葡萄糖": {
        description: "最基本的醣類單元，易於吸收，適合作為基礎治療物品。",
        effect: "立刻恢復玩家 20點血量",
        elements: "碳（C）×6 氫（H）×12 氧（O）×6",
        properties: "可快速製造，適合緊急情況下使用。為最基礎的治療物品，不具備額外功能。",
        recipe: "6CO₂ + 6H₂O + 光能 → C₆H₁₂O₆ + 6O₂",
        story: [
            "哦，魔法師，你來得正好！我聽說你需要些葡萄糖來治癒？別擔心，老婆婆這裡有辦法！",
            "首先，把你蒐集到的碳、氫、氧元素拿過來。嗯，不錯，數量剛剛好！",
            "接下來，我們需要一些光能和水。我這裡有秘密藥草，可以穩定反應。別看它不起眼，它可是我祖傳的寶貝！",
            "好，現在看著我，將這些元素混合在一起，然後施加一點點魔法力量……哈！看到那道光了嗎？反應正在進行！",
            "完成了！這就是最純淨的葡萄糖。拿去吧，記得小心使用，這可是生命的甘露啊！"
        ]
    },
    "蔗糖": {
        description: "由兩個單醣分子組成，能量密度更高，提供中等程度治療效果。",
        effect: "恢復玩家 40點血量，並在使用後提供 3秒的加速效果（提升移動速度10%）。",
        elements: "單醣×2",
        properties: "製造成本較高，但恢復效果明顯提升，並附帶短暫加速的特殊效果。",
        recipe: "C₆H₁₂O₆ + C₆H₁₂O₆ - H₂O → C₁₂H₂₂O₁₁",
        story: [
            "哦，你需要蔗糖？這可是能量滿滿的好東西！",
            "把兩份單醣拿過來，交給我就行了。這可不是簡單的混合，而是需要一點點魔法的幫助。",
            "現在看好了，我用魔法將兩個單醣分子牽起手來，通過一場特殊的縮合反應...",
            "看，水分子從它們中間分離出來，它們緊緊相連，變成了蔗糖！",
            "完成了！這個蔗糖不僅能恢復你的體力，還能讓你跑得更快，記得用它抓住戰鬥的關鍵時刻哦！"
        ]
    },
    "碳盾": {
        description: "由碳（C）製作而成，輕量易得，適合新手使用。",
        effect: "基礎防禦力 +5",
        elements: "碳（C）×3",
        properties: "可升級至更高等級：\n- 等級1（普通）石墨盾：防禦力 +10\n- 等級2（強化）碳納米管盾：防禦力 +20，減少1點酸性傷害\n- 等級3（精煉）金剛石盾：防禦力 +30，耐火效果",
        story: [
            "哦，年輕人，你需要一面碳盾嗎？別急，我這就幫你製作！",
            "你知道嗎？碳是一種非常特別的元素，它可以變得又輕又強。",
            "先拿來三個碳原子，讓我施展排列魔法，把它們編織成六邊形的網格結構...",
            "看，這種結構既堅固又靈活，像網一樣能擋住攻擊！",
            "好了！這面碳盾完成了，拿去吧，它能很好地保護你！"
        ]
    },
    "二氧化碳": {
        description: "可產生窒息區域的戰術型物品",
        effect: "傷害值：5，生成「窒息區域」，令敵人在該區域內每秒減少2點血量，持續5秒",
        elements: "碳（C）×1，氧（O）×2",
        properties: "可用於戰術性控制區域",
        recipe: "C + O₂ → CO₂",
        story: [
            "啊哈，需要製作二氧化碳？這可是個厲害的戰術工具呢！",
            "快，把一顆碳和兩顆氧拿過來，我來幫你完成反應。",
            "我們需要高溫來讓它們反應，看著我點燃魔法火焰...哦，看到了嗎？它們開始舞動了！",
            "這些碳和氧分子正在跳一支華爾滋，它們緊緊相連，變成了二氧化碳！",
            "完成了！記得小心使用，它可是會讓敵人喘不過氣來的呢！"
        ]
    },
    "醋酸": {
        description: "具有腐蝕性的進攻型物品",
        effect: "傷害值：15，投擲後在地面生成「腐蝕區域」，造成每秒5點傷害，持續3秒",
        elements: "碳（C）×2，氫（H）×4，氧（O）×2",
        properties: "具有持續性傷害效果",
        recipe: "CH₃OH + CO + H₂O → CH₃COOH + H₂",
        story: [
            "需要醋酸是吧？這東西可得小心，腐蝕性很強呢！",
            "先把甲醇、一氧化碳和水拿來，我這裡有特殊的魔法容器，不怕它們反應的腐蝕。",
            "好，把它們放進容器裡，然後加入一點催化劑...噓！別出聲，看著化學反應開始！",
            "瞧，分子們正在重新排列組合，它們變得越來越活潑了！",
            "完成了！這就是醋酸，記住，這可是非常強力的攻擊物品哦！"
        ]
    },
    "一氧化二氮": {
        description: "能快速向指定方向位移的特殊化學品。",
        effect: "傷害值：0，特殊功能：向指定方向位移一段距離。",
        elements: "氮（N）×2，氧（O）×1",
        properties: "用於快速移動，適合戰鬥中的靈活應用。",
        recipe: "NH₄NO₃ → N₂O + 2H₂O",
        story: [
            "啊，年輕人，你需要加速劑嗎？這可是個讓你如風般移動的魔法物品呢！",
            "首先，拿來硝酸銨。我這裡有個特製的魔法坩堝，專門用來處理這種反應。",
            "把硝酸銨放進去，然後我會施展火焰魔法...看到了嗎？這些氣泡冒出來了！",
            "這就是一氧化二氮！它的氣體會像推進器一樣，給你一股強大的衝力！",
            "好了，這加速劑完成了！記住，使用時要注意方向，別一不小心撞到牆哦！"
        ]
    }
};

// 檢查是否能製作化合物
Game.canCraftCompound = function(compoundName) {
    const formula = this.compounds[compoundName].formula;
    const elementSymbols = this.elementSymbols;
    
    // 檢查是否有所有需要的元素
    for (const [element, required] of Object.entries(formula)) {
        const colorKey = Object.entries(elementSymbols).find(([_, symbol]) => symbol === element)?.[0];
        const available = this.collectedElements[colorKey] || 0;
        
        if (available < required) {
            return false;
        }
    }
    
    return true;
};

// 製作化合物
Game.craftCompound = function(compoundName) {
    if (this.craftedCompoundsList.length >= this.maxCompounds) {
        return false;
    }
    
    if (!this.canCraftCompound(compoundName)) {
        return false;
    }
    
    const formula = this.compounds[compoundName].formula;
    const elementSymbols = this.elementSymbols;
    
    // 消耗元素
    for (const [element, required] of Object.entries(formula)) {
        const colorKey = Object.entries(elementSymbols).find(([_, symbol]) => symbol === element)[0];
        this.useElement(colorKey, required);
    }
    
    // 添加化合物到列表
    this.craftedCompoundsList.push(compoundName);
    
    // 顯示老婆婆對話
    this.showGrandmaDialog(compoundName);
    
    return true;
};

// 使用化合物
Game.useCompound = function(compound) {
    switch (compound) {
        case "二氧化碳":
            this.Co2SkillEffect(this.player.x, this.player.y);
            break;
        case "醋酸":
            this.AcidSkillEffect(this.player.x, this.player.y);
            break;
        case "蔗糖":
            this.player.health = Math.min(100, this.player.health + 40);
            this.updateHealthBar();
            this.createLightEffect(this.player.x, this.player.y);
            break;
        case "葡萄糖":
            this.player.health = Math.min(100, this.player.health + 20);
            this.updateHealthBar();
            this.createLightEffect(this.player.x, this.player.y);
            break;
        case "碳盾":
            this.createIceEffect(this.player.x, this.player.y);
            this.player.health = Math.min(100, this.player.health + 20);
            this.updateHealthBar();
            break;
        case "一氧化二氮":
            this.createIceEffect(this.player.x, this.player.y);
            const boostedSpeed = 6;
            const duration = 3000;
            const originalSpeed = this.player.speed;
            
            this.player.speed = boostedSpeed;
            
            setTimeout(() => {
                this.player.speed = originalSpeed;
            }, duration);
            break;
        default:
            alert("未知的化合物效果");
    }
    
    // 從列表中移除化合物
    this.craftedCompoundsList = this.craftedCompoundsList.filter(c => c !== compound);
    this.updateInventory();
};
