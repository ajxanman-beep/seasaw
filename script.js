let allGames = []; // store all games globally

// Load and display all games
fetch('games.json')
  .then(response => response.json())
  .then(games => {
    allGames = games;

    // ✅ Sort alphabetically (case-insensitive + numeric-aware)
    allGames.sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: 'base', numeric: true })
    );

    displayGames(allGames);
  })
  .catch(error => {
    console.error('Error loading games:', error);
    document.getElementById('game-buttons').textContent = 'Failed to load games.';
  });

// Function to render buttons
function displayGames(games) {
  const container = document.getElementById('game-buttons');
  container.innerHTML = '';

  if (games.length === 0) {
    container.textContent = 'No games found.';
    return;
  }

  games.forEach(game => {
    const button = document.createElement('button');
    button.textContent = game.label;
    button.onclick = () => (window.location.href = game.path);
    container.appendChild(button);
  });
}

// ✅ Add search filtering
document.getElementById('search').addEventListener('input', event => {
  const query = event.target.value.toLowerCase();
  const filtered = allGames.filter(game =>
    game.label.toLowerCase().includes(query)
  );
  displayGames(filtered);
});