fetch('games.json')
  .then(res => res.json())
  .then(games => {
    // Sort alphabetically (case-insensitive)
    games.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));

    // Then render buttons or links
    const container = document.getElementById('game-list');
    for (const game of games) {
      const btn = document.createElement('button');
      btn.textContent = game.label;
      btn.onclick = () => window.location.href = game.path;
      container.appendChild(btn);
    }
  });
