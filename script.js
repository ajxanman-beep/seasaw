// Copy the current page link
document.getElementById('copyBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => alert('🔗 Link copied to clipboard!'))
    .catch(() => alert('❌ Failed to copy link.'));
});

// Load games and enable search
fetch('games.json')
  .then(response => response.json())
  .then(games => {
    const container = document.getElementById('game-buttons');
    const searchInput = document.getElementById('search');

    // Sort alphabetically (case-insensitive)
    games.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base', numeric: true }));

    // Function to display games
    function displayGames(filteredGames) {
      container.innerHTML = '';

      if (filteredGames.length === 0) {
        container.textContent = 'No games found.';
        return;
      }

      filteredGames.forEach(game => {
        const button = document.createElement('button');
        button.textContent = game.label;
        button.className = 'game-btn';
        button.onclick = () => {
          window.location.href = game.path;
        };
        container.appendChild(button);
      });
    }

    // Initial load
    displayGames(games);

    // Filter on search input
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = games.filter(g => g.label.toLowerCase().includes(query));
      displayGames(filtered);
    });
  })
  .catch(error => {
    console.error('Error loading games:', error);
    document.getElementById('game-buttons').textContent = 'Failed to load games.';
  });
