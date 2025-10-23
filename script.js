let allGames = [];

fetch('games.json')
  .then(res => res.json())
  .then(games => {
    allGames = games.sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: 'base', numeric: true })
    );
    displayGames(allGames);
  })
  .catch(() => {
    document.getElementById('game-buttons').textContent = 'Failed to load games.';
  });

function displayGames(games) {
  const container = document.getElementById('game-buttons');
  container.innerHTML = '';

  if (games.length === 0) {
    container.textContent = 'No games found.';
    return;
  }

  games.forEach(game => {
    const btn = document.createElement('button');
    btn.textContent = game.label;
    btn.className = 'game-btn';
    btn.onclick = () => (window.location.href = game.path);
    container.appendChild(btn);
  });
}

// Search bar (non case-sensitive)
document.getElementById('search').addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = allGames.filter(game =>
    game.label.toLowerCase().includes(query)
  );
  displayGames(filtered);
});

// Copy link button
document.getElementById('copyBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => alert('Page link copied!'))
    .catch(() => alert('Failed to copy link.'));
});
