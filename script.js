<<<<<<< HEAD
let allGames = [];

=======
let allGames = []; // store all games globally

// Load and display all games
>>>>>>> e99202ff9a512a9f8851be0513ef2c3a347fe2a7
fetch('games.json')
  .then(res => res.json())
  .then(games => {
<<<<<<< HEAD
    allGames = games.sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: 'base', numeric: true })
    );
=======
    allGames = games;

    // ✅ Sort alphabetically (case-insensitive + numeric-aware)
    allGames.sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: 'base', numeric: true })
    );

>>>>>>> e99202ff9a512a9f8851be0513ef2c3a347fe2a7
    displayGames(allGames);
  })
  .catch(() => {
    document.getElementById('game-buttons').textContent = 'Failed to load games.';
  });

<<<<<<< HEAD
=======
// Function to render buttons
>>>>>>> e99202ff9a512a9f8851be0513ef2c3a347fe2a7
function displayGames(games) {
  const container = document.getElementById('game-buttons');
  container.innerHTML = '';

  if (games.length === 0) {
    container.textContent = 'No games found.';
    return;
  }

  games.forEach(game => {
<<<<<<< HEAD
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
=======
    const button = document.createElement('button');
    button.textContent = game.label;
    button.onclick = () => (window.location.href = game.path);
    container.appendChild(button);
  });
}

// ✅ Add search filtering
document.getElementById('search').addEventListener('input', event => {
  const query = event.target.value.toLowerCase();
>>>>>>> e99202ff9a512a9f8851be0513ef2c3a347fe2a7
  const filtered = allGames.filter(game =>
    game.label.toLowerCase().includes(query)
  );
  displayGames(filtered);
<<<<<<< HEAD
});

// Copy link button
document.getElementById('copyBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => alert('Page link copied!'))
    .catch(() => alert('Failed to copy link.'));
});
=======
});
>>>>>>> e99202ff9a512a9f8851be0513ef2c3a347fe2a7
