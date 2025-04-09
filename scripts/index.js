const elements = [
    { symbol: 'H', color: '#64ffda' },
    { symbol: 'O', color: '#00bcd4' },
    { symbol: 'C', color: '#b388ff' },
    { symbol: 'N', color: '#ff80ab' },
    { symbol: 'Fe', color: '#ffd740' }
];

const floatingElements = document.querySelector('.floating-elements');

for (let i = 0; i < 15; i++) {
    const element = elements[Math.floor(Math.random() * elements.length)];
    const div = document.createElement('div');
    div.className = 'element';
    div.setAttribute('data-symbol', element.symbol);
    div.style.backgroundColor = element.color;
    div.style.width = Math.random() * 30 + 30 + 'px';
    div.style.height = div.style.width;
    div.style.left = Math.random() * 100 + 'vw';
    div.style.top = Math.random() * 100 + 'vh';
    div.style.animationDelay = Math.random() * 10 + 's';
    div.style.animationDuration = Math.random() * 10 + 20 + 's';
    floatingElements.appendChild(div);
}

function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.width = Math.random() * 50 + 20 + 'px';
    bubble.style.height = bubble.style.width;
    bubble.style.left = Math.random() * 100 + 'vw';
    floatingElements.appendChild(bubble);

    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}

setInterval(createBubble, 1500);

document.querySelector('form').addEventListener('submit', function(e) {
    const playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        e.preventDefault();
        alert('請輸入玩家名稱！');
        return;
    }
    localStorage.setItem('playerName', playerName);
});