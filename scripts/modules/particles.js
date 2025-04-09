import { getCanvas } from './render.js';

export const particles = [];

export function createFlameEffect(x, y) {
    for (let i = 0; i < 40; i++) {
        particles.push({
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
}

export function createIceEffect(x, y) {
    for (let i = 0; i < 30; i++) {
        particles.push({
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
}

export function createLightEffect(x, y) {
    for (let i = 0; i < 20; i++) {
        particles.push({
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
}

export function createPoisonEffect(x, y) {
    for (let i = 0; i < 50; i++) {
        particles.push({
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
}

export function updateParticles() {
    const { ctx } = getCanvas();
    
    particles.forEach((particle, index) => {
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= 0.03;
        particle.size *= 0.95;
        particle.life--;

        if (particle.life <= 0 || particle.alpha <= 0) {
            particles.splice(index, 1);
        }
    });
}
