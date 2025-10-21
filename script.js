fetch('games.json')
  .then(response => response.json())
  .then(games => {
    const container = document.getElementById('game-buttons');
    container.innerHTML = '';

    if (games.length === 0) {
      container.textContent = 'No games found.';
      return;
    }

    // ✅ Sort alphabetically (case-insensitive + numeric-aware)
    games.sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: 'base', numeric: true })
    );

    // ✅ Create and display buttons
    games.forEach(game => {
      const button = document.createElement('button');
      button.textContent = game.label;
      button.onclick = () => {
        window.location.href = game.path;
      };
      container.appendChild(button);
    });
  })
  .catch(error => {
    console.error('Error loading games:', error);
    document.getElementById('game-buttons').textContent = 'Failed to load games.';
  });
