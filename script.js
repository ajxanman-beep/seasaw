// Load games dynamically from games.json
fetch('games.json')
  .then(response => response.json())
  .then(games => {
    const container = document.getElementById('game-buttons');
    const searchInput = document.getElementById('search');

    // Sort alphabetically
    games.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));

    // Function to display games
    function displayGames(filtered) {
      container.innerHTML = '';
      if (filtered.length === 0) {
        container.textContent = 'No games found.';
        return;
      }

      filtered.forEach(game => {
        const button = document.createElement('button');
        button.className = 'game-btn';
        button.textContent = game.label;
        button.onclick = () => window.location.href = game.path;
        container.appendChild(button);
      });
    }

    // Initial load
    displayGames(games);

    // Search filter
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = games.filter(g => g.label.toLowerCase().includes(query));
      displayGames(filtered);
    });
  })
  .catch(err => {
    console.error('Error loading games:', err);
    document.getElementById('game-buttons').textContent = 'Failed to load games.';
  });
