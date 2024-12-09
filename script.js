const player = { x: 0, y: 0, inventory: [] };
const mapSize = 5;

// 生成地圖
const map = document.querySelector('#map');
function renderMap() {
  map.innerHTML = '';
  for (let y = 0; y < mapSize; y++) {
    for (let x = 0; x < mapSize; x++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (x === player.x && y === player.y) tile.classList.add('player');
      map.appendChild(tile);
    }
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && player.y > 0) player.y--;
  if (e.key === 'ArrowDown' && player.y < mapSize - 1) player.y++;
  if (e.key === 'ArrowLeft' && player.x > 0) player.x--;
  if (e.key === 'ArrowRight' && player.x < mapSize - 1) player.x++;
  renderMap();
});

renderMap();
