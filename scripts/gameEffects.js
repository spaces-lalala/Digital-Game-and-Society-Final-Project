// 視覺效果模組 - 處理粒子和投射物

// 發射投射物
Game.shootProjectile = function(targetX, targetY) {
    const colors = Object.keys(this.collectedElements);
    if (colors.length === 0) return;

    const color = colors[0];
    if (!this.useElement(color, 1)) return;

    const dx = targetX - (this.player.x + this.player.size / 2);
    const dy = targetY - (this.player.y + this.player.size / 2);
    const length = Math.sqrt(dx * dx + dy * dy);

    this.projectiles.push({
        x: this.player.x + this.player.size / 2,
        y: this.player.y + this.player.size / 2,
        size: 10,
        color: color,
        vx: (dx / length) * 5,
        vy: (dy / length) * 5,
    });

    // 根據元素類型添加粒子效果
    switch (color) {
        case "lightblue":
            this.createFlameEffect(this.player.x + this.player.size / 2, this.player.y + this.player.size / 2);
            break;
        case "aliceblue":
            this.createPoisonEffect(this.player.x + this.player.size / 2, this.player.y + this.player.size / 2);
            break;
        case "gray":
            this.createLightEffect(this.player.x + this.player.size / 2, this.player.y + this.player.size / 2);
            break;
        case "green":
            this.createIceEffect(this.player.x + this.player.size / 2, this.player.y + this.player.size / 2);
            break;
    }
};

// 繪製並更新投射物
Game.drawProjectiles = function() {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const proj = this.projectiles[i];
        
        this.ctx.fillStyle = proj.color;
        this.ctx.beginPath();
        this.ctx.arc(proj.x, proj.y, proj.size, 0, Math.PI * 2);
        this.ctx.fill();

        proj.x += proj.vx;
        proj.y += proj.vy;

        if (
            proj.x < 0 || proj.x > this.canvas.width ||
            proj.y < 0 || proj.y > this.canvas.height
        ) {
            this.projectiles.splice(i, 1);
        }
    }
};

// 火焰效果
Game.createFlameEffect = function(x, y) {
    for (let i = 0; i < 40; i++) {
        this.particles.push({
            x: x,
            y: y,
            size: Math.random() * 8 + 4,
            color: `rgba(255, ${Math.floor(Math.random() * 100 + 100)}, 0, 0.9)`,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 50,
            alpha: 1,
        });
    }
};

// 冰凍效果
Game.createIceEffect = function(x, y) {
    for (let i = 0; i < 30; i++) {
        this.particles.push({
            x: x,
            y: y,
            size: Math.random() * 10 + 5,
            color: `rgba(173, 216, 230, ${Math.random() * 0.9 + 0.3})`,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            life: 60,
            alpha: 1,
        });
    }
};

// 光效果
Game.createLightEffect = function(x, y) {
    for (let i = 0; i < 20; i++) {
        this.particles.push({
            x: x,
            y: y,
            size: Math.random() * 5 + 2,
            color: `rgba(255, 255, 0, ${Math.random() * 0.8 + 0.5})`,
            vx: Math.random() * 8 - 4,
            vy: Math.random() * 8 - 4,
            life: 30,
            alpha: 1,
        });
    }
};

// 毒素效果
Game.createPoisonEffect = function(x, y) {
    for (let i = 0; i < 50; i++) {
        this.particles.push({
            x: x + (Math.random() - 0.5) * 80,
            y: y + (Math.random() - 0.5) * 80,
            size: Math.random() * 5 + 4,
            color: `rgba(0, 128, 0, ${Math.random() * 0.8 + 0.5})`,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 80,
            alpha: 1,
        });
    }
};

// 繪製並更新粒子
Game.drawParticles = function() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
        const particle = this.particles[i];
        
        this.ctx.globalAlpha = particle.alpha;
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.globalAlpha = 1;

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= 0.03;
        particle.size *= 0.95;
        particle.life--;

        if (particle.life <= 0 || particle.alpha <= 0) {
            this.particles.splice(i, 1);
        }
    }
};

// 二氧化碳技能效果
Game.Co2SkillEffect = function(x, y) {
    for (let i = 0; i < 20; i++) {
        this.particles.push({
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
};

// 酸技能效果
Game.AcidSkillEffect = function(x, y) {
    for (let i = 0; i < 50; i++) {
        this.particles.push({
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
};
